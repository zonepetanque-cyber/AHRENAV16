// api/live.ts
// ─────────────────────────────────────────────────────────────────────────────
// Détecte les lives EN COURS à partir de la liste des lives À VENIR.
//
// Stratégie zéro-quota supplémentaire :
//   1. Lire le cache Vercel de /api/youtube pour récupérer les IDs des lives
//      à venir (déjà connus, 0 unité)
//   2. 1 seul appel videos?id=... (~1 unité) pour vérifier lequel a basculé
//      en liveBroadcastContent === 'live'
//
// Coût : ~1 unité par appel × 288 appels/jour (cache 5 min) = 288 u/jour
// + /api/youtube : 902 u/jour
// TOTAL : ~1 190 u/jour ✅ (11.9% du quota gratuit de 10 000 u/jour)
//
// Logique de bascule :
//   - Un live "à venir" passe en "en cours" dès que liveBroadcastContent === 'live'
//   - Il disparaît dès que actualEndTime est renseigné (terminé)
//   - Si aucun live à venir connu → fallback RSS (15 vidéos, 0 quota) pour
//     ne pas rater un live non annoncé
// ─────────────────────────────────────────────────────────────────────────────

import type { VercelRequest, VercelResponse } from '@vercel/node';

const API_KEY = process.env.YOUTUBE_API_KEY || '';
const YOUTUBE_API_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/youtube`
  : 'http://localhost:3000/api/youtube';

const CHANNELS = [
  { id: "UCZeAfPeaRc_es11c0YSOhGg", name: "Boulistenaute" },
  { id: "UCHVNyFEDNOq6q4OkG2YzIQQ", name: "Sportmag" },
  { id: "UCvSPMtEs1EtxC_Ik0KgoClQ", name: "Sportmediamat" },
  { id: "UCQX6vA1lYtP6nv8XROK56pQ", name: "Petanque Academy" },
  { id: "UCpq3CYTOqiW-t2kqrtWZDug", name: "Groupe Pétanque" },
  { id: "UCLNGJZ85f3W1ZZxUBeNdqDg", name: "Pétanque TV Europe" },
  { id: "UCyQAL0ZOE9YLXfkndhlgJMQ", name: "PPF" },
  { id: "UCAcERCZ6CKxXEnwQTiaooBw", name: "FFPJP" },
  { id: "UCs5dyTykvpzwSyL5EsjcXNg", name: "FFSB" },
];

// Récupère les 15 dernières vidéos d'une chaîne via RSS (0 quota)
// Utilisé en fallback si aucun live à venir n'est connu
async function getRSSVideoIds(channelId: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)]
      .map(m => m[1].trim())
      .slice(0, 15); // 15 au lieu de 10 pour couvrir les chaînes actives
  } catch {
    return [];
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Cache 5 min — coût total ~1 unité par appel
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!API_KEY) return res.status(200).json({ lives: [] });

  try {
    const channelNameMap: Record<string, string> = {};
    CHANNELS.forEach(ch => { channelNameMap[ch.id] = ch.name; });

    // ── Étape 1 : Récupérer les IDs des lives à venir depuis /api/youtube ──
    // Vercel sert cette réponse depuis son CDN (0 appel API YouTube supplémentaire)
    let upcomingIds: string[] = [];
    let upcomingMap: Record<string, any> = {};

    try {
      const upcomingRes = await fetch(YOUTUBE_API_URL, {
        signal: AbortSignal.timeout(5000),
        headers: { 'Cache-Control': 'no-cache' }, // forcer lecture du cache Vercel, pas revalider
      });
      if (upcomingRes.ok) {
        const upcomingData = await upcomingRes.json();
        const upcomingLives = upcomingData.lives || [];
        upcomingIds = upcomingLives.map((v: any) => v.id);
        upcomingLives.forEach((v: any) => { upcomingMap[v.id] = v; });
      }
    } catch {
      // Si /api/youtube inaccessible, on continue avec le fallback RSS
    }

    // ── Étape 2 : Si aucun live à venir connu → fallback RSS (0 quota) ──
    // Couvre les lives non annoncés à l'avance (rares mais possibles)
    let idsToCheck = upcomingIds;

    if (idsToCheck.length === 0) {
      const rssResults = await Promise.all(
        CHANNELS.map(ch => getRSSVideoIds(ch.id))
      );
      idsToCheck = [...new Set(rssResults.flat())];
    }

    if (idsToCheck.length === 0) return res.status(200).json({ lives: [] });

    // ── Étape 3 : 1 seul appel videos?id= pour vérifier les statuts (~1 unité) ──
    // Vercel limite les URLs à ~8 000 chars — on batch par 50 IDs max
    const batches: string[][] = [];
    for (let i = 0; i < idsToCheck.length; i += 50) {
      batches.push(idsToCheck.slice(i, i + 50));
    }

    const detailsResults = await Promise.all(
      batches.map(batch =>
        fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${batch.join(',')}&key=${API_KEY}`,
          { signal: AbortSignal.timeout(8000) }
        ).then(r => r.ok ? r.json() : { items: [] }).catch(() => ({ items: [] }))
      )
    );

    const allItems = detailsResults.flatMap(d => d.items || []);

    // ── Étape 4 : Garder uniquement les lives EN COURS non terminés ──
    const activeLives = allItems
      .filter((item: any) => {
        if (item.liveStreamingDetails?.actualEndTime) return false; // terminé → exclure
        return item.snippet.liveBroadcastContent === 'live';
      })
      .map((item: any) => {
        // Enrichir avec les métadonnées déjà connues depuis /api/youtube si dispo
        const known = upcomingMap[item.id];
        return {
          id: item.id,
          title: item.snippet.title,
          thumbnail: `https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`,
          channelName: channelNameMap[item.snippet.channelId] || item.snippet.channelTitle,
          channelId: item.snippet.channelId,
          channelAvatar: known?.channelAvatar || '',
          description: (item.snippet.description || '').slice(0, 300),
          isLive: true,
          isUpcoming: false,
          publishedAt: item.snippet.publishedAt,
          scheduledStartTime: item.liveStreamingDetails?.scheduledStartTime,
        };
      });

    // ── Notifier si un nouveau live vient de démarrer ────────────────────
    if (activeLives.length > 0 && process.env.NOTIFY_SECRET) {
      try {
        const CACHE_KEY = 'ahrena_live_ids';
        const previousIds: Set<string> = (global as any)[CACHE_KEY] || new Set();
        const newLives = activeLives.filter((l: any) => !previousIds.has(l.id));
        (global as any)[CACHE_KEY] = new Set(activeLives.map((l: any) => l.id));

        for (const live of newLives) {
          const notifyUrl = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/send-notif`
            : 'http://localhost:3000/api/send-notif';
          fetch(notifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-notify-secret': process.env.NOTIFY_SECRET! },
            body: JSON.stringify({
              title: `🔴 Live maintenant sur AHRENA`,
              body: live.title,
              url: `/?video=${live.id}`,
              segment: 'all',
              channelTag: live.channelName,
            }),
          }).catch(() => {});
        }
      } catch {}
    }

    res.status(200).json({ lives: activeLives });
  } catch {
    res.status(200).json({ lives: [] });
  }
}
