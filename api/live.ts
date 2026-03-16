// api/live.ts
// ─────────────────────────────────────────────────────────────────────────────
// Ce fichier gère uniquement les lives EN COURS de nos chaînes.
//
// Méthode : RSS (0 quota) → récupère les 10 dernières vidéos de chaque chaîne
//           puis 1 seul appel videos API (~1 unité) pour vérifier le statut live
//
// Coût : 0 (RSS) + ~1 unité (videos details) = ~1 unité par refresh
// Cache 5 min = 288 refreshs/jour × 1 = ~288 unités/jour ✅ quasi gratuit
// ─────────────────────────────────────────────────────────────────────────────

import type { VercelRequest, VercelResponse } from '@vercel/node';

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

const API_KEY = process.env.YOUTUBE_API_KEY || '';

// Récupère les 10 dernières vidéos d'une chaîne via RSS (0 quota)
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
      .slice(0, 10);
  } catch {
    return [];
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Cache 5 min — quasi gratuit (RSS = 0 quota + ~1 unité API)
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!API_KEY) return res.status(200).json({ lives: [] });

  try {
    const channelNameMap: Record<string, string> = {};
    CHANNELS.forEach(ch => { channelNameMap[ch.id] = ch.name; });

    // Étape 1 : RSS de toutes les chaînes en parallèle (0 quota)
    const rssResults = await Promise.all(
      CHANNELS.map(async ch => {
        const ids = await getRSSVideoIds(ch.id);
        return ids.map(id => ({ id, channelId: ch.id }));
      })
    );

    const allVideoIds = [...new Set(rssResults.flat().map(v => v.id))];
    if (allVideoIds.length === 0) return res.status(200).json({ lives: [] });

    // Étape 2 : 1 seul appel API pour vérifier le statut live (~1 unité)
    const ids = allVideoIds.join(',');
    const resDetails = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${ids}&key=${API_KEY}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!resDetails.ok) return res.status(200).json({ lives: [] });
    const details = await resDetails.json();

    // Garder uniquement les lives EN COURS non terminés
    const activeLives = (details.items || [])
      .filter((item: any) => {
        if (item.liveStreamingDetails?.actualEndTime) return false;
        return item.snippet.liveBroadcastContent === 'live';
      })
      .map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: `https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`,
        channelName: channelNameMap[item.snippet.channelId] || item.snippet.channelTitle,
        channelId: item.snippet.channelId,
        description: (item.snippet.description || '').slice(0, 300),
        isLive: true,
        isUpcoming: false,
        publishedAt: item.snippet.publishedAt,
      }));

    res.status(200).json({ lives: activeLives });
  } catch {
    res.status(200).json({ lives: [] });
  }
}
