import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, RefreshCw, Newspaper, AlertCircle, ChevronRight, Clock } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  link: string;
  date: string;
  excerpt: string;
  image?: string;
  dept: string;
  code: string;
  color: string;
  siteUrl: string;
}

interface NewsResponse {
  items: NewsItem[];
  total: number;
  failedDepts: string[];
  updatedAt: string;
}

const CACHE_KEY = 'ahrena_news_cache';
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2h

const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 60) return `Il y a ${mins} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days === 1) return 'Hier';
    if (days < 7) return `Il y a ${days} jours`;
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
};

const NewsCard = ({ item }: { item: NewsItem }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="flex gap-3 p-3 rounded-xl border border-white/5 hover:border-white/15 hover:bg-white/5 transition-all active:scale-[0.98]">
        {/* Image ou couleur dept */}
        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-zinc-900">
          {item.image && !imgError ? (
            <img
              src={item.image}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: item.color + '22' }}
            >
              <Newspaper size={20} style={{ color: item.color }} />
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          {/* Badge département */}
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{ background: item.color + '22', color: item.color }}
            >
              {item.code === 'MEDIA' ? '📰 ' : ''}{item.dept}
            </span>
            <span className="flex items-center gap-0.5 text-white/25 text-[9px]">
              <Clock size={8} />
              {formatDate(item.date)}
            </span>
          </div>

          <p className="text-white font-semibold text-[12px] leading-snug line-clamp-2 group-hover:text-white/90 mb-0.5">
            {item.title}
          </p>
          {item.excerpt && item.excerpt !== item.title && (
            <p className="text-white/35 text-[10px] leading-snug line-clamp-2">
              {item.excerpt}
            </p>
          )}
        </div>

        <div className="flex-shrink-0 self-center">
          <ChevronRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
        </div>
      </div>
    </a>
  );
};

const NewsComponent = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [failedCount, setFailedCount] = useState(0);
  const [filterCode, setFilterCode] = useState<string | null>(null);
  const [updatedAtStr, setUpdatedAtStr] = useState('');

  const loadNews = useCallback(async (force = false) => {
    // Vérifier le cache local
    if (!force) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setNews(data.items || []);
            setFailedCount((data.failedDepts || []).length);
            setUpdatedAt(data.updatedAt);
            setLoading(false);
            return;
          }
        }
      } catch {}
    }

    try {
      const res = await fetch('/api/news');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data: NewsResponse = await res.json();

      setNews(data.items || []);
      setFailedCount((data.failedDepts || []).length);
      setUpdatedAt(data.updatedAt);
      setError(false);

      // Mettre en cache
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
      } catch {}
    } catch {
      setError(true);
      // Charger depuis cache même expiré
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data } = JSON.parse(cached);
          setNews(data.items || []);
          setFailedCount((data.failedDepts || []).length);
          setUpdatedAt(data.updatedAt);
        }
      } catch {}
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  useEffect(() => {
    if (!updatedAt) return;
    setUpdatedAtStr(formatDate(updatedAt));
    const t = setInterval(() => setUpdatedAtStr(formatDate(updatedAt)), 60000);
    return () => clearInterval(t);
  }, [updatedAt]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadNews(true);
  };

  // Départements disponibles dans les news
  const availableDepts = Array.from(
    new Map(news.map(item => [item.code, { code: item.code, dept: item.dept, color: item.color }])).values()
  ).sort((a, b) => a.code.localeCompare(b.code));

  const filtered = filterCode
    ? news.filter(item => item.code === filterCode)
    : news;

  return (
    <div className="pb-4 min-h-screen">

      {/* Filtre par département — sticky sous le header du modal */}
      <div className="sticky top-[65px] z-40 bg-zinc-950/98 backdrop-blur-md border-b border-white/8">
        <div className="px-4 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {!loading && (
              <span className="text-white/25 text-[10px]">
                {filtered.length} article{filtered.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {updatedAtStr && (
              <span className="text-white/25 text-[9px] flex items-center gap-1">
                <Clock size={8} /> {updatedAtStr}
              </span>
            )}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-40"
            >
              <RefreshCw size={12} className={`text-white/60 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filtre par département */}
        {availableDepts.length > 1 && (
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar px-4 pb-3 pt-1">
            <button
              onClick={() => setFilterCode(null)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wide transition-all
                ${!filterCode ? 'bg-white text-black' : 'bg-zinc-800 text-white/50 hover:text-white hover:bg-zinc-700'}`}
            >
              Tous
            </button>
            {availableDepts.map(d => (
              <button
                key={d.code}
                onClick={() => setFilterCode(filterCode === d.code ? null : d.code)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wide transition-all`}
                style={filterCode === d.code
                  ? { background: d.color, color: '#fff' }
                  : { background: d.color + '20', color: d.color }}
              >
                {d.code === 'FR' ? 'FFPJP' : d.code}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="px-4 py-4 md:max-w-2xl md:mx-auto">

        {/* Erreur réseau */}
        {error && news.length === 0 && (
          <div className="flex items-center gap-3 bg-red-600/10 border border-red-600/20 rounded-xl px-4 py-3 mb-4">
            <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
            <div>
              <p className="text-red-400 text-xs font-bold">Impossible de charger les actualités</p>
              <p className="text-white/40 text-[10px] mt-0.5">Vérifie ta connexion ou réessaie plus tard</p>
            </div>
          </div>
        )}

        {/* Avertissement partiel */}
        {!loading && failedCount > 0 && news.length > 0 && (
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 mb-4">
            <AlertCircle size={12} className="text-amber-400 flex-shrink-0" />
            <p className="text-amber-400/80 text-[10px]">
              {failedCount} site{failedCount > 1 ? 's' : ''} indisponible{failedCount > 1 ? 's' : ''} — affichage partiel
            </p>
          </div>
        )}

        {/* Skeleton loading */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex gap-3 p-3 rounded-xl border border-white/5 animate-pulse">
                <div className="w-16 h-16 rounded-lg bg-zinc-800 flex-shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-2 w-16 bg-zinc-800 rounded" />
                  <div className="h-3 w-full bg-zinc-800 rounded" />
                  <div className="h-3 w-3/4 bg-zinc-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Liste des articles */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-2">
            {filtered.map(item => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Aucun article */}
        {!loading && filtered.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-center px-8">
            <Newspaper size={40} className="text-white/10 mb-3" />
            <p className="text-white/40 text-sm font-bold">Aucune actualité disponible</p>
            <p className="text-white/20 text-xs mt-1">Les sites des comités ne publient peut-être pas de flux RSS</p>
            <button
              onClick={handleRefresh}
              className="mt-4 px-4 py-2 bg-white/10 rounded-xl text-white/60 text-xs hover:bg-white/15 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Liens vers les sites */}
        {!loading && availableDepts.length > 0 && (
          <div className="mt-8 border-t border-white/8 pt-6">
            <p className="text-white/30 text-[10px] uppercase tracking-wider font-bold mb-3 px-1">
              Sites des comités
            </p>
            <div className="grid grid-cols-2 gap-2">
              {availableDepts.map(d => {
                const item = news.find(n => n.code === d.code);
                return (
                  <a
                    key={d.code}
                    href={item?.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-white/8 hover:border-white/20 hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                      <span className="text-white/60 text-[11px] font-bold truncate">{d.dept}</span>
                    </div>
                    <ExternalLink size={10} className="text-white/20 flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}` }} />
    </div>
  );
};

export default NewsComponent;
