// ── Service Favoris AHRENA ──────────────────────────────────────
// Stratégie : localStorage (hors connexion) + Supabase (si connecté)
// - Non connecté  → localStorage uniquement
// - Connecté      → Supabase (source de vérité) + localStorage (cache)
// - Au login      → fusion locale → Supabase (sans perte)

import { supabase } from '../lib/supabase';

export type FavCategory = 'video' | 'article' | 'concours';

export interface FavVideo {
  id: string; category: 'video';
  title: string; thumbnail: string; channelName: string; videoId: string; addedAt: string;
}
export interface FavArticle {
  id: string; category: 'article';
  title: string; link: string; image?: string; dept?: string; source?: string; date?: string; addedAt: string;
}
export interface FavConcours {
  id: string; category: 'concours';
  title: string; ville: string; date: string; dateFin?: string;
  format?: string; heure?: string; info?: string;
  dept?: string; deptCode?: string; deptColor?: string;
  facebook?: string; site?: string; addedAt: string;
}
export type FavItem = FavVideo | FavArticle | FavConcours;

// ── Clés localStorage ───────────────────────────────────────────
const STORAGE_KEY   = 'ahrena_favorites';
const VERSION_KEY   = 'ahrena_favorites_version';
const BACKUP_KEY    = 'ahrena_favorites_backup';
const BACKUP_TS_KEY = 'ahrena_favorites_backup_ts';
const CURRENT_VERSION = 2;

// ── Migration v1 → v2 ──────────────────────────────────────────
const migrateV1 = (items: any[]): FavItem[] =>
  items.map((item: any) => {
    if (item.category) return item as FavItem;
    return {
      id: 'video-' + (item.id || item.videoId || Math.random()),
      category: 'video' as const,
      title: item.title || '',
      thumbnail: item.thumbnail || '',
      channelName: item.channelName || '',
      videoId: item.id || item.videoId || '',
      addedAt: item.addedAt || new Date().toISOString(),
    };
  });

// ── localStorage ────────────────────────────────────────────────
const readLocal = (): FavItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const items = JSON.parse(raw);
    if (!Array.isArray(items)) return [];
    const version = parseInt(localStorage.getItem(VERSION_KEY) || '1');
    if (version < CURRENT_VERSION) {
      const migrated = migrateV1(items);
      writeLocal(migrated);
      return migrated;
    }
    return items as FavItem[];
  } catch {
    try {
      const backup = localStorage.getItem(BACKUP_KEY);
      return backup ? JSON.parse(backup) : [];
    } catch { return []; }
  }
};

const writeLocal = (items: FavItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    localStorage.setItem(VERSION_KEY, String(CURRENT_VERSION));
    // Backup quotidien
    const lastTs = localStorage.getItem(BACKUP_TS_KEY);
    if (!lastTs || Date.now() - parseInt(lastTs) > 86400000) {
      localStorage.setItem(BACKUP_KEY, JSON.stringify(items));
      localStorage.setItem(BACKUP_TS_KEY, String(Date.now()));
    }
  } catch (e: any) {
    if (e?.name === 'QuotaExceededError') {
      const trimmed = items.sort((a, b) =>
        new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      ).slice(0, 50);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed)); } catch {}
    }
  }
};

// ── Supabase ────────────────────────────────────────────────────
const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
};

const readRemote = async (): Promise<FavItem[]> => {
  try {
    const user = await getUser();
    if (!user) return [];
    const { data, error } = await supabase
      .from('favorites')
      .select('data')
      .eq('user_id', user.id)
      .order('added_at', { ascending: false });
    if (error) throw error;
    return (data || []).map((row: any) => row.data as FavItem);
  } catch (err) {
    console.warn('[AHRENA] Lecture Supabase échouée, fallback local', err);
    return [];
  }
};

const upsertRemote = async (item: FavItem): Promise<void> => {
  try {
    const user = await getUser();
    if (!user) return;
    await supabase.from('favorites').upsert({
      user_id: user.id,
      item_id: item.id,
      category: item.category,
      data: item,
      added_at: item.addedAt,
    }, { onConflict: 'user_id,item_id' });
  } catch (err) {
    console.warn('[AHRENA] Upsert Supabase échoué', err);
  }
};

const deleteRemote = async (itemId: string): Promise<void> => {
  try {
    const user = await getUser();
    if (!user) return;
    await supabase.from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('item_id', itemId);
  } catch (err) {
    console.warn('[AHRENA] Suppression Supabase échouée', err);
  }
};

// ── Fusion locale → Supabase au login ──────────────────────────
// Appelée depuis App.tsx quand l'utilisateur se connecte
export const syncLocalToSupabase = async (): Promise<void> => {
  try {
    const user = await getUser();
    if (!user) return;

    const local = readLocal();
    if (local.length === 0) return;

    // Vérifier ce qui existe déjà dans Supabase
    const { data: existing } = await supabase
      .from('favorites')
      .select('item_id')
      .eq('user_id', user.id);

    const existingIds = new Set((existing || []).map((r: any) => r.item_id));

    // Upserter uniquement les favoris locaux qui ne sont pas encore en remote
    const toSync = local.filter(item => !existingIds.has(item.id));
    if (toSync.length === 0) return;

    const rows = toSync.map(item => ({
      user_id: user.id,
      item_id: item.id,
      category: item.category,
      data: item,
      added_at: item.addedAt,
    }));

    await supabase.from('favorites').upsert(rows, { onConflict: 'user_id,item_id' });
    console.info(`[AHRENA] ${toSync.length} favoris locaux synchronisés avec Supabase`);
  } catch (err) {
    console.warn('[AHRENA] Sync local→Supabase échouée', err);
  }
};

// ── API publique ────────────────────────────────────────────────
// getFavorites — async si connecté (Supabase), sync si non connecté (local)
export const getFavorites = async (): Promise<FavItem[]> => {
  const user = await getUser();
  if (user) {
    const remote = await readRemote();
    if (remote.length > 0) {
      // Mettre à jour le cache local
      writeLocal(remote);
      return remote;
    }
  }
  return readLocal();
};

// Version synchrone pour isFav (utilise le cache local)
export const getFavoritesSync = (): FavItem[] => readLocal();

export const isFav = (id: string): boolean =>
  getFavoritesSync().some(f => f.id === id);

export const addFav = async (item: FavItem): Promise<void> => {
  // 1. Local immédiat (UX fluide)
  const local = readLocal().filter(f => f.id !== item.id);
  writeLocal([item, ...local]);
  // 2. Remote en arrière-plan
  upsertRemote(item); // fire & forget
};

export const removeFav = async (id: string): Promise<void> => {
  writeLocal(readLocal().filter(f => f.id !== id));
  deleteRemote(id); // fire & forget
};

export const toggleFav = async (item: FavItem): Promise<boolean> => {
  if (isFav(item.id)) {
    await removeFav(item.id);
    return false;
  }
  await addFav(item);
  return true;
};

// Stats pour admin
export const getFavoritesStats = () => {
  const items = getFavoritesSync();
  return {
    count: items.length,
    version: parseInt(localStorage.getItem(VERSION_KEY) || '1'),
    currentVersion: CURRENT_VERSION,
    hasBackup: !!localStorage.getItem(BACKUP_KEY),
    byCategory: {
      video:    items.filter(f => f.category === 'video').length,
      article:  items.filter(f => f.category === 'article').length,
      concours: items.filter(f => f.category === 'concours').length,
    }
  };
};
