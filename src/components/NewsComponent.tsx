import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, RefreshCw, Newspaper, AlertCircle, ChevronRight, Clock, ChevronDown, Heart } from 'lucide-react';
import { isFav, toggleFav, FavArticle } from '../services/favoritesService';

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
const CACHE_DURATION = 2 * 60 * 60 * 1000;

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
  } catch { return ''; }
};

// NewsCard
const NewsCard = ({ item, user, onAuthRequired }: { item: NewsItem; user?: any; onAuthRequired?: () => void }) => {
  const [imgError, setImgError] = useState(false);
  const [faved, setFaved] = useState(() => isFav('article-' + item.link));

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Bloquer si non connecté
    if (!user) {
      onAuthRequired?.();
      return;
    }
    const favItem: FavArticle = {
      id: 'article-' + item.link,
      category: 'article',
      title: item.title,
      link: item.link,
      image: item.image,
      dept: item.dept,
      date: item.date,
      addedAt: new Date().toISOString(),
    };
    const added = toggleFav(favItem);
    setFaved(added);
    window.dispatchEvent(new Event('ahrena_fav_changed'));
  };

  return (
    <div className="relative group">
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
      <div className="flex gap-4 p-4 md:p-5 rounded-xl border border-white/5 hover:border-white/15 hover:bg-white/5 transition-all active:scale-[0.98]">
        <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-24 rounded-xl overflow-hidden bg-zinc-900">
          {item.image && !imgError ? (
            <img src={item.image} alt="" referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)} />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: item.color + '22' }}>
              <Newspaper size={24} style={{ color: item.color }} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md"
              style={{ background: item.color + '22', color: item.color }}>
              {item.dept}
            </span>
            <span className="flex items-center gap-1 text-white/30 text-[10px]">
              <Clock size={9} />{formatDate(item.date)}
            </span>
          </div>
          <p className="text-white font-bold text-sm md:text-base leading-snug line-clamp-2 group-hover:text-white/90 mb-1.5">
            {item.title}
          </p>
          {item.excerpt && item.excerpt !== item.title && (
            <p className="text-white/40 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
              {item.excerpt}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 self-center">
          <ChevronRight size={16} className="text-white/20 group-hover:text-white/50 transition-colors" />
        </div>
      </div>
    </a>
    {/* Bouton favori */}
    <button
      onClick={handleFav}
      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10"
      style={faved ? { background: '#dc2626' } : { background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
    >
      <Heart size={13} fill={faved ? 'white' : 'none'} stroke={faved ? 'white' : 'rgba(255,255,255,0.6)'} strokeWidth={2}/>
    </button>
    </div>
  );
};

// Types de filtre
type FilterValue = { type: 'all' } | { type: 'dept'; code: string } | { type: 'media'; dept: string };

// Médias toujours affichés dans le filtre (même sans article RSS disponible)
const KNOWN_MEDIAS: { dept: string; color: string }[] = [
  { dept: 'Boulistenaute',           color: '#e11d48' },
  { dept: 'France 3 Pétanque',       color: '#1d4ed8' },
  { dept: 'France 3 PACA',           color: '#2563eb' },
  { dept: 'RMC Sport',               color: '#e85d04' },
  { dept: 'La Provence',             color: '#b91c1c' },
  { dept: 'Sportmag',                color: '#7c3aed' },
  { dept: 'Boule Provençal',         color: '#0369a1' },
  { dept: 'Midi Libre',              color: '#e8520a' },
  { dept: 'La Montagne',             color: '#2d7d46' },
  { dept: 'Ouest-France',            color: '#0f4c8a' },
  { dept: 'FFSB Sport-Boules',       color: '#059669' },
  { dept: 'PPF Tour',                color: '#b45309' },
  { dept: 'Mondial La Marseillaise', color: '#1e40af' },
  { dept: 'Sport en France',          color: '#0284c7' },
];

// NewsFilter avec accordéons
const NewsFilter = ({ news, filter, setFilter }: {
  news: NewsItem[];
  filter: FilterValue;
  setFilter: (f: FilterValue) => void;
}) => {
  const [openAccordion, setOpenAccordion] = useState<'comites' | 'medias' | null>(null);

  // Fermer en cliquant en dehors
  useEffect(() => {
    if (!openAccordion) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-accordion]')) setOpenAccordion(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openAccordion]);

  const comites = Array.from(
    new Map(
      news.filter(i => i.code !== 'MEDIA' && i.code !== 'FR')
        .map(i => [i.code, { code: i.code, dept: i.dept, color: i.color }])
    ).values()
  ).sort((a, b) => (parseInt(a.code) || 999) - (parseInt(b.code) || 999));

  // Fusionner les médias connus (fixes) avec ceux reçus via RSS
  const mediasFromRSS = new Map(
    news.filter(i => i.code === 'MEDIA' || i.code === 'FR')
      .map(i => [i.dept, { code: i.code, dept: i.dept, color: i.color }])
  );
  const medias = KNOWN_MEDIAS.map(m => ({
    code: 'MEDIA',
    dept: m.dept,
    color: mediasFromRSS.get(m.dept)?.color || m.color,
  }));

  const isComiteActive = filter.type === 'dept';
  const isMediaActive = filter.type === 'media';
  const activeComiteLabel = isComiteActive ? comites.find(c => c.code === (filter as any).code)?.dept ?? null : null;
  const activeMediaLabel = isMediaActive ? (filter as any).dept : null;

  return (
    <div className="max-w-6xl mx-auto px-4 pb-3 pt-1 flex flex-wrap gap-2 items-center">

      {/* TOUS */}
      <button
        onClick={() => { setFilter({ type: 'all' }); setOpenAccordion(null); }}
        className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wide transition-all
          ${filter.type === 'all' ? 'bg-white text-black' : 'bg-zinc-800 text-white/50 hover:text-white hover:bg-zinc-700'}`}
      >
        Tous
      </button>

      {/* Accordéon COMITÉS */}
      <div className="relative" data-accordion>
        <button
          onClick={() => setOpenAccordion(prev => prev === 'comites' ? null : 'comites')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wide transition-all
            ${isComiteActive ? 'bg-[#D4AF37] text-black'
              : openAccordion === 'comites' ? 'bg-zinc-700 text-white'
              : 'bg-zinc-800 text-white/50 hover:text-white hover:bg-zinc-700'}`}
        >
          🏛 {activeComiteLabel ?? 'Comités'}
          <ChevronDown size={12} className={`transition-transform duration-200 ${openAccordion === 'comites' ? 'rotate-180' : ''}`} />
        </button>

        {openAccordion === 'comites' && (
          <div className="absolute left-0 top-[calc(100%+6px)] z-[200] bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[220px] max-h-72 overflow-y-auto">
            <div className="py-1.5">
              {comites.length === 0 ? (
                <p className="text-white/30 text-[10px] px-4 py-3">Aucun comité disponible</p>
              ) : comites.map(d => {
                const active = filter.type === 'dept' && (filter as any).code === d.code;
                return (
                  <button key={d.code}
                    onClick={() => { setFilter(active ? { type: 'all' } : { type: 'dept', code: d.code }); setOpenAccordion(null); }}
                    className={`w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-[11px] font-bold transition-all
                      ${active ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="flex-1">{d.dept}</span>
                    {active && <span className="text-[#D4AF37] text-xs">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Accordéon MÉDIAS */}
      <div className="relative" data-accordion>
        <button
          onClick={() => setOpenAccordion(prev => prev === 'medias' ? null : 'medias')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wide transition-all
            ${isMediaActive ? 'bg-[#e11d48] text-white'
              : openAccordion === 'medias' ? 'bg-zinc-700 text-white'
              : 'bg-zinc-800 text-white/50 hover:text-white hover:bg-zinc-700'}`}
        >
          📰 {activeMediaLabel ?? 'Médias'}
          <ChevronDown size={12} className={`transition-transform duration-200 ${openAccordion === 'medias' ? 'rotate-180' : ''}`} />
        </button>

        {openAccordion === 'medias' && (
          <div className="absolute left-0 top-[calc(100%+6px)] z-[200] bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[220px]">
            <div className="py-1.5">
              {medias.length === 0 ? (
                <p className="text-white/30 text-[10px] px-4 py-3">Aucun média disponible</p>
              ) : medias.map(d => {
                const active = filter.type === 'media' && (filter as any).dept === d.dept;
                return (
                  <button key={d.dept}
                    onClick={() => { setFilter(active ? { type: 'all' } : { type: 'media', dept: d.dept }); setOpenAccordion(null); }}
                    className={`w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-[11px] font-bold transition-all
                      ${active ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="flex-1">{d.dept}</span>
                    {active && <span className="text-[#e11d48] text-xs">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

// NewsComponent principal
const NewsComponent = ({ user, onAuthRequired }: { user?: any; onAuthRequired?: () => void }) => {
  const [headerH, setHeaderH] = useState(128);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterValue>({ type: 'all' });
  const [updatedAtStr, setUpdatedAtStr] = useState('');

  const loadNews = useCallback(async (force = false) => {
    if (!force) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setNews(data.items || []);
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
      setUpdatedAt(data.updatedAt);
      setError(false);
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() })); } catch {}
    } catch {
      setError(true);
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data } = JSON.parse(cached);
          setNews(data.items || []);
              setUpdatedAt(data.updatedAt);
        }
      } catch {}
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadNews(); }, [loadNews]);

  useEffect(() => {
    const measure = () => {
      const h = document.querySelector('header');
      if (h) setHeaderH(h.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (!updatedAt) return;
    setUpdatedAtStr(formatDate(updatedAt));
    const t = setInterval(() => setUpdatedAtStr(formatDate(updatedAt)), 60000);
    return () => clearInterval(t);
  }, [updatedAt]);

  const handleRefresh = () => { setRefreshing(true); loadNews(true); };

  const filtered = (() => {
    if (filter.type === 'all') return news;
    if (filter.type === 'dept') return news.filter(i => i.code === (filter as any).code);
    if (filter.type === 'media') return news.filter(i => i.dept === (filter as any).dept);
    return news;
  })();

  const availableDepts = Array.from(
    new Map(news.map(item => [item.dept, { code: item.code, dept: item.dept, color: item.color }])).values()
  );

  return (
    <div className="flex flex-col" style={{ paddingTop: `${headerH}px`, height: '100%', overflow: 'hidden' }}>

      {/* Barre fixe sous le header — ne scroll pas */}
      <div className="flex-shrink-0 bg-zinc-950 border-b border-white/8 z-40" style={{ overflow: "visible" }}>
        <div className="max-w-6xl mx-auto px-4 pt-2.5 pb-1 flex items-center justify-between gap-2">
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
            <div className="relative group/refresh">
              <button
                disabled
                title="Actualités mises à jour automatiquement toutes les 2h"
                className="p-1.5 rounded-lg bg-white/5 opacity-30 cursor-not-allowed"
              >
                <RefreshCw size={12} className="text-white/60" />
              </button>
              {/* Tooltip */}
              <div className="absolute right-0 top-full mt-2 z-50 pointer-events-none opacity-0 group-hover/refresh:opacity-100 transition-opacity duration-200">
                <div className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white/70 whitespace-nowrap shadow-xl">
                  🕐 Actu. toutes les 2h
                </div>
              </div>
            </div>
          </div>
        </div>
        {news.length > 0 && <NewsFilter news={news} filter={filter} setFilter={setFilter} />}
      </div>

      {/* Zone scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="px-4 py-4 max-w-6xl mx-auto">

        {error && news.length === 0 && (
          <div className="flex items-center gap-3 bg-red-600/10 border border-red-600/20 rounded-xl px-4 py-3 mb-4">
            <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
            <div>
              <p className="text-red-400 text-xs font-bold">Impossible de charger les actualités</p>
              <p className="text-white/40 text-[10px] mt-0.5">Vérifie ta connexion ou réessaie plus tard</p>
            </div>
          </div>
        )}

        {!loading && news.length > 0 && (
          <div className="bg-white/4 border border-white/8 rounded-xl px-4 py-3 mb-4">
            <p className="text-white/70 text-[12px] font-bold mb-1">📢 Vous gérez un site d'actualités pétanque ?</p>
            <p className="text-white/40 text-[11px] leading-relaxed">
              Si vous souhaitez que votre site d'actualités sur la pétanque, le jeu provençal ou le sport-boules apparaisse ici, contactez-nous pour intégrer votre flux :{' '}
              <a href="mailto:support@ahrena.com" className="text-red-400 font-bold underline underline-offset-2">support@ahrena.com</a>
            </p>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex gap-3 p-3 rounded-xl border border-white/5 animate-pulse">
                <div className="w-24 h-24 md:w-32 md:h-24 rounded-xl bg-zinc-800 flex-shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-2 w-16 bg-zinc-800 rounded" />
                  <div className="h-3 w-full bg-zinc-800 rounded" />
                  <div className="h-3 w-3/4 bg-zinc-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map(item => <NewsCard key={item.id} item={item} user={user} onAuthRequired={onAuthRequired} />)}
          </div>
        )}

        {!loading && filtered.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-center px-8">
            <Newspaper size={40} className="text-white/10 mb-3" />
            <p className="text-white/40 text-sm font-bold">Aucune actualité disponible</p>
            <p className="text-white/20 text-xs mt-1">Les sources ne publient peut-être pas de flux RSS</p>
            <button onClick={handleRefresh}
              className="mt-4 px-4 py-2 bg-white/10 rounded-xl text-white/60 text-xs hover:bg-white/15 transition-colors">
              Réessayer
            </button>
          </div>
        )}

        {!loading && availableDepts.length > 0 && (
          <div className="mt-8 border-t border-white/8 pt-6">
            <p className="text-white/30 text-[10px] uppercase tracking-wider font-bold mb-3 px-1">Sites & sources</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableDepts.map(d => {
                const item = news.find(n => n.dept === d.dept);
                return (
                  <a key={d.dept} href={item?.siteUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-white/8 hover:border-white/20 hover:bg-white/5 transition-all">
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
      </div>
    </div>
  );
};

export default NewsComponent;
