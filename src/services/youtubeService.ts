// src/services/youtubeService.ts
// /api/live    → cache 15 min  : lives EN COURS uniquement (2 appels globaux = 200 unités × 96/jour = 9 600)
// /api/youtube → cache 24h     : lives À VENIR + vidéos chaînes (18 appels × 1/jour = 1 800 unités)
// Total : ~11 400 unités/jour ✅

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelAvatar?: string;
  description?: string;
  isLive?: boolean;
  isUpcoming?: boolean;
  scheduledStartTime?: string;
  publishedAt?: string;
}

let upcomingCache: { data: any; ts: number } | null = null;
let liveCache: { data: Video[]; ts: number } | null = null;
const UPCOMING_CACHE_MS = 15 * 60 * 1000;  // 15 min côté client (à venir)
const LIVE_CACHE_MS = 2 * 60 * 1000;        // 2 min côté client (en cours)

export async function fetchAllVideos(): Promise<{
  lives: Video[];
  channelVideos: Record<string, Video[]>;
}> {
  try {
    const [upcomingData, currentLives] = await Promise.all([
      fetchUpcomingData(),
      fetchCurrentLives(),
    ]);

    // Fusionner : lives EN COURS en premier, puis À VENIR (dédoublonnés)
    const liveIds = new Set(currentLives.map(v => v.id));

    // S'assurer que les lives en cours ont bien isLive: true
    const livesWithFlag = currentLives.map(v => ({ ...v, isLive: true, isUpcoming: false }));

    // Garder uniquement les vrais à venir (isUpcoming: true) non déjà en direct
    const upcomingOnly = (upcomingData.lives || []).filter(
      (v: Video) => !liveIds.has(v.id) && v.isUpcoming === true
    );

    return {
      lives: [...livesWithFlag, ...upcomingOnly],
      channelVideos: upcomingData.channelVideos || {},
    };
  } catch {
    return { lives: [], channelVideos: {} };
  }
}

async function fetchUpcomingData(): Promise<any> {
  if (upcomingCache && Date.now() - upcomingCache.ts < UPCOMING_CACHE_MS) {
    return upcomingCache.data;
  }
  try {
    const res = await fetch('/api/youtube');
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    upcomingCache = { data, ts: Date.now() };
    return data;
  } catch {
    if (upcomingCache) return upcomingCache.data;
    return { lives: [], channelVideos: {} };
  }
}

async function fetchCurrentLives(): Promise<Video[]> {
  if (liveCache && Date.now() - liveCache.ts < LIVE_CACHE_MS) {
    return liveCache.data;
  }
  try {
    const res = await fetch('/api/live');
    if (!res.ok) return [];
    const data = await res.json();
    liveCache = { data: data.lives || [], ts: Date.now() };
    return data.lives || [];
  } catch {
    return [];
  }
}

export async function fetchLiveVideos(): Promise<Video[]> {
  const { lives } = await fetchAllVideos();
  return lives;
}

export async function fetchChannelVideos(channelId: string): Promise<Video[]> {
  const { channelVideos } = await fetchAllVideos();
  return channelVideos?.[channelId] ?? [];
}
