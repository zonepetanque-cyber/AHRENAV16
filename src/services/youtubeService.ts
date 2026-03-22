// src/services/youtubeService.ts
// ─────────────────────────────────────────────────────────────────────────────
// Architecture quota-optimisée :
//
//  /api/youtube  → cache Vercel 24h  : lives À VENIR + vidéos chaînes + avatars
//                  Coût : ~902 u × 1/jour = 902 u/jour
//
//  /api/live     → cache Vercel 5min : lives EN COURS (vérifie les à venir)
//                  Coût : ~1 u × 288/jour = 288 u/jour
//
//  TOTAL : ~1 190 u/jour ✅  (11.9% du quota gratuit de 10 000 u/jour)
//
// Côté client :
//  - À VENIR   : rechargé 1x/jour (cache 24h en mémoire)
//  - EN COURS  : polling toutes les 5 min pour détecter les bascules
// ─────────────────────────────────────────────────────────────────────────────

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelId?: string;
  channelAvatar?: string;
  description?: string;
  isLive?: boolean;
  isUpcoming?: boolean;
  scheduledStartTime?: string;
  publishedAt?: string;
}

// ── Caches en mémoire côté client ─────────────────────────────────────────
let upcomingCache: { data: any; ts: number } | null = null;
let liveCache:     { data: Video[]; ts: number } | null = null;

const UPCOMING_CACHE_MS = 24 * 60 * 60 * 1000; // 24h — aligné sur le cache Vercel
const LIVE_CACHE_MS     =  5 * 60 * 1000;       //  5 min — polling live

// ── Fetch À VENIR (1x/jour) ───────────────────────────────────────────────
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
    if (upcomingCache) return upcomingCache.data; // fallback cache expiré
    return { lives: [], channelVideos: {}, channelAvatars: {} };
  }
}

// ── Fetch EN COURS (toutes les 5 min) ────────────────────────────────────
async function fetchCurrentLives(): Promise<Video[]> {
  if (liveCache && Date.now() - liveCache.ts < LIVE_CACHE_MS) {
    return liveCache.data;
  }
  try {
    const res = await fetch('/api/live');
    if (!res.ok) return liveCache?.data || [];
    const data = await res.json();
    liveCache = { data: data.lives || [], ts: Date.now() };
    return data.lives || [];
  } catch {
    return liveCache?.data || [];
  }
}

// ── API principale ────────────────────────────────────────────────────────
export async function fetchAllVideos(): Promise<{
  lives: Video[];
  channelVideos: Record<string, Video[]>;
}> {
  try {
    const [upcomingData, currentLives] = await Promise.all([
      fetchUpcomingData(),
      fetchCurrentLives(),
    ]);

    const liveIds = new Set(currentLives.map(v => v.id));

    // Lives EN COURS — isLive: true, isUpcoming: false
    const livesWithFlag = currentLives.map(v => ({ ...v, isLive: true, isUpcoming: false }));

    // Lives À VENIR — exclure ceux déjà passés en direct
    const upcomingOnly = (upcomingData.lives || []).filter(
      (v: Video) => !liveIds.has(v.id) && v.isUpcoming === true
    );

    // Si un à venir a basculé en live → invalider le cache upcoming
    // pour qu'il soit rechargé au prochain refresh et disparaisse de "à venir"
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

// ── Helpers ───────────────────────────────────────────────────────────────
export async function fetchLiveVideos(): Promise<Video[]> {
  const { lives } = await fetchAllVideos();
  return lives;
}

export async function fetchChannelVideos(channelId: string): Promise<Video[]> {
  const { channelVideos } = await fetchAllVideos();
  return channelVideos?.[channelId] ?? [];
}

// Forcer un refresh immédiat du cache live (appelé après pull-to-refresh)
export function invalidateLiveCache() {
  liveCache = null;
}

// Forcer un refresh immédiat du cache upcoming (ex: après mise à jour admin)
export function invalidateUpcomingCache() {
  upcomingCache = null;
}
