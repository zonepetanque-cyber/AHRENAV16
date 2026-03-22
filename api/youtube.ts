// api/youtube.ts
// ─────────────────────────────────────────────────────────────────────────────
// Ce fichier gère :
//   1. Les lives À VENIR de toutes les chaînes (search par chaîne, cache 24h)
//   2. Les 10 dernières vidéos de chaque chaîne (RSS gratuit, 0 quota)
//   3. Les avatars des chaînes (1 appel channels, cache 24h)
//
// Coût : 9 chaînes × 1 appel upcoming × 100 = 900 unités
//        + 1 appel avatars (~1 unité)
//        = ~901 unités × 1 refresh/jour = ~901 unités/jour ✅
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

// ── 10 dernières vidéos d'une chaîne via RSS (0 quota) ────────────────────────
async function fetchChannelRSS(channelId: string, channelName: string) {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(6000) }
    );
    if (!res.ok) return [];
    const xml = await res.text();
    const ids = [...xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)].map(m => m[1].trim());
    const titles = [...xml.matchAll(/<title>([^<]*)<\/title>/g)].map(m => m[1].trim()).slice(1);
    // On récupère 25 vidéos en tampon — l'app filtrera les blacklistées
    // et affichera toujours les 10 premières non-masquées
    return ids.slice(0, 25).map((id, i) => ({
      id,
      title: titles[i] || 'Vidéo pétanque',
      thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
      channelName,
    }));
  } catch {
    return [];
  }
}

// ── Lives À VENIR par chaîne (search upcoming uniquement) ─────────────────────
async function fetchUpcoming() {
  if (!API_KEY) return [];
  try {
    const channelNameMap: Record<string, string> = {};
    CHANNELS.forEach(ch => { channelNameMap[ch.id] = ch.name; });

    // 1 appel upcoming par chaîne en parallèle
    const results = await Promise.all(
      CHANNELS.map(async (channel) => {
        try {
          const res = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.id}&type=video&eventType=upcoming&maxResults=50&key=${API_KEY}`,
            { signal: AbortSignal.timeout(8000) }
          );
          if (!res.ok) return [];
          const data = await res.json();
          return data.items || [];
        } catch {
          return [];
        }
      })
    );

    const allItems = results.flat();
    if (allItems.length === 0) return [];

    // Dédoublonner
    const uniqueMap = new Map();
    allItems.forEach((item: any) => {
      if (item?.id?.videoId) uniqueMap.set(item.id.videoId, item);
    });

    // 1 seul appel details pour avoir scheduledStartTime et filtrer les dates passées
    const ids = Array.from(uniqueMap.keys()).join(',');
    const resDetails = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${ids}&key=${API_KEY}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!resDetails.ok) return [];
    const details = await resDetails.json();

    const now = Date.now();

    const upcoming = (details.items || [])
      .filter((item: any) => {
        // Garder uniquement les vrais à venir non terminés
        if (item.liveStreamingDetails?.actualEndTime) return false;
        // Accepter aussi les lives qui viennent de démarrer (liveBroadcastContent peut passer à 'live' avec délai RSS)
        if (item.snippet.liveBroadcastContent !== 'upcoming' && item.snippet.liveBroadcastContent !== 'live') return false;
        // Exclure uniquement si l'heure prévue est passée depuis plus de 30 min (tolérance démarrage tardif)
        const scheduledTime = item.liveStreamingDetails?.scheduledStartTime || item.snippet.publishedAt;
        if (scheduledTime && new Date(scheduledTime).getTime() < now - 30 * 60 * 1000) return false;
        return true;
      })
      .map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: `https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`,
        channelName: channelNameMap[item.snippet.channelId] || item.snippet.channelTitle,
        channelId: item.snippet.channelId,
        description: (item.snippet.description || '').slice(0, 300),
        isLive: false,
        isUpcoming: true,
        scheduledStartTime: item.liveStreamingDetails?.scheduledStartTime || item.snippet.publishedAt,
        publishedAt: item.snippet.publishedAt,
      }));

    // Tri chronologique + interleave des chaînes
    const sorted = upcoming.sort((a: any, b: any) => {
      const dateA = new Date(a.scheduledStartTime || 0).getTime();
      const dateB = new Date(b.scheduledStartTime || 0).getTime();
      if (dateA !== dateB) return dateA - dateB;
      return a.channelName.localeCompare(b.channelName);
    });

    const interleaved: any[] = [];
    const usedChannels = new Set<string>();
    const remaining = [...sorted];
    while (remaining.length > 0) {
      const idx = remaining.findIndex(v => !usedChannels.has(v.channelName));
      if (idx === -1) { usedChannels.clear(); continue; }
      interleaved.push(remaining.splice(idx, 1)[0]);
      usedChannels.add(interleaved[interleaved.length - 1].channelName);
    }

    return interleaved;
  } catch {
    return [];
  }
}

// ── Avatars de toutes les chaînes en 1 appel (1 unité) ───────────────────────
async function fetchChannelAvatars(): Promise<Record<string, string>> {
  if (!API_KEY) return {};
  try {
    const ids = CHANNELS.map(ch => ch.id).join(',');
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${ids}&key=${API_KEY}`,
      { signal: AbortSignal.timeout(6000) }
    );
    if (!res.ok) return {};
    const data = await res.json();
    const avatars: Record<string, string> = {};
    (data.items || []).forEach((item: any) => {
      avatars[item.id] = item.snippet?.thumbnails?.default?.url || '';
    });
    return avatars;
  } catch {
    return {};
  }
}

// ── Handler principal ────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Cache 24h — 1 refresh/jour
  // Coût : 9 × 100 (upcoming) + 1 (details) + 1 (avatars) = ~902 unités/jour ✅
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const [upcomingLives, channelAvatars, ...channelResults] = await Promise.all([
      fetchUpcoming(),
      fetchChannelAvatars(),
      ...CHANNELS.map(ch => fetchChannelRSS(ch.id, ch.name)),
    ]);

    const channelVideos: Record<string, any[]> = {};
    CHANNELS.forEach((ch, i) => {
      channelVideos[ch.id] = channelResults[i];
    });

    // Attacher les avatars aux lives à venir
    const upcomingWithAvatars = (upcomingLives as any[]).map(video => ({
      ...video,
      channelAvatar: (channelAvatars as Record<string, string>)[video.channelId || ''] || '',
    }));

    res.status(200).json({
      lives: upcomingWithAvatars,
      channelVideos,
      channelAvatars,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    res.status(500).json({ error: 'Erreur serveur', lives: [], channelVideos: {} });
  }
}
