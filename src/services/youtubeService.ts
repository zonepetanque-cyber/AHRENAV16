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
const UPCOMING_CACHE_MS = 5 * 60 * 1000;   // 5 min côté client (était 1h — trop long pour détecter un live qui démarre)
const LIVE_CACHE_MS = 2 * 60 * 1000;        // 2 min côté client

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

    // Forcer isLive: true sur les lives en cours
    const livesWithFlag = currentLives.map(v => ({ ...v, isLive: true, isUpcoming: false }));

    // Garder uniquement les vrais à venir non déjà en direct
    const upcomingOnly = (upcomingData.lives || []).filter(
      (v: Video) => !liveIds.has(v.id) && v.isUpcoming === true
    );

    // Si un live en cours était dans le cache upcoming, l'invalider
    // pour qu'au prochain appel il soit rechargé depuis l'API
    const liveWasInUpcoming = (upcomingData.lives || []).some(
      (v: Video) => liveIds.has(v.id)
    );
    if (liveWasInUpcoming) {
      upcomingCache = null;
    }

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
