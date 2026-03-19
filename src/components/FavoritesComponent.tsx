import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Play, Newspaper, Trophy, Trash2, MapPin, Clock, Calendar, ExternalLink } from 'lucide-react';
import { Video } from '../services/youtubeService';
import { getFavorites, removeFav, FavItem, FavVideo, FavArticle, FavConcours } from '../services/favoritesService';

type Tab = 'video' | 'article' | 'concours';

const TABS: { key: Tab; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'video',    label: 'Vidéos',    icon: <Play size={14}/>,      color: '#dc2626' },
  { key: 'article',  label: 'Articles',  icon: <Newspaper size={14}/>, color: '#2563eb' },
  { key: 'concours', label: 'Concours',  icon: <Trophy size={14}/>,    color: '#d97706' },
];

// ── Carte Vidéo ───────────────────────────────────────────────
const VideoCard = ({ item, onPlay, onRemove }: { item: FavVideo; onPlay: (v: any) => void; onRemove: (id: string) => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="group relative bg-zinc-900 border border-white/6 rounded-2xl overflow-hidden hover:border-white/15 transition-all"
  >
    <div className="relative aspect-video cursor-pointer" onClick={() => onPlay({ id: item.videoId, title: item.title, thumbnail: item.thumbnail, channelName: item.channelName })}>
      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"/>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
          <Play fill="white" size={18} className="ml-1"/>
        </div>
      </div>
    </div>
    <div className="p-3">
      <p className="text-white font-bold text-[12px] leading-snug line-clamp-2 mb-1">{item.title}</p>
      <p className="text-white/35 text-[9px] uppercase tracking-wider">{item.channelName}</p>
    </div>
    <button
      onClick={() => onRemove(item.id)}
      className="absolute top-2 right-2 w-7 h-7 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
    >
      <Trash2 size={11} className="text-white"/>
    </button>
  </motion.div>
);

// ── Carte Article ─────────────────────────────────────────────
const ArticleCard = ({ item, onRemove }: { item: FavArticle; onRemove: (id: string) => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 12 }}
    className="group relative bg-zinc-900 border border-white/6 rounded-2xl overflow-hidden hover:border-white/15 transition-all"
  >
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex gap-3 p-3.5">
      <div className="flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden bg-zinc-800">
        {item.image
          ? <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" onError={e => (e.currentTarget.style.display='none')}/>
          : <div className="w-full h-full flex items-center justify-center"><Newspaper size={18} className="text-blue-400/50"/></div>
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-bold text-[12px] leading-snug line-clamp-3 mb-2 group-hover:text-white/80 transition-colors">{item.title}</p>
        <div className="flex items-center gap-2 flex-wrap">
          {item.dept && <span className="text-[9px] font-bold uppercase tracking-wide text-blue-400/70 bg-blue-400/10 px-2 py-0.5 rounded-full">{item.dept}</span>}
          {item.date && <span className="text-white/25 text-[9px]">{item.date}</span>}
        </div>
      </div>
      <ExternalLink size={12} className="flex-shrink-0 text-white/20 group-hover:text-white/50 transition-colors mt-1"/>
    </a>
    <button
      onClick={() => onRemove(item.id)}
      className="absolute top-2 right-2 w-7 h-7 bg-zinc-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 border border-white/10"
    >
      <Trash2 size={11} className="text-white"/>
    </button>
  </motion.div>
);

// ── Carte Concours ────────────────────────────────────────────
const ConcoursCard = ({ item, onRemove }: { item: FavConcours; onRemove: (id: string) => void }) => {
  const color = item.deptColor || '#dc2626';
  const dateStr = item.dateFin && item.dateFin !== item.date
    ? `${new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} → ${new Date(item.dateFin).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`
    : new Date(item.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' });
  const isPast = new Date(item.dateFin || item.date) < new Date();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      className={`group relative bg-zinc-900 border border-white/6 rounded-2xl overflow-hidden hover:border-white/15 transition-all ${isPast ? 'opacity-50' : ''}`}
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            {item.format && (
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded mb-1.5 inline-block"
                style={{ background: color + '20', color }}>
                {item.format}
              </span>
            )}
            <p className="text-white font-bold text-[13px] leading-snug">{item.title}</p>
          </div>
          {isPast && <span className="text-[8px] font-black uppercase text-white/20 bg-white/5 px-2 py-0.5 rounded flex-shrink-0">Passé</span>}
        </div>

        {/* Infos */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-white/50 text-[11px]">
            <MapPin size={10} style={{ color }}/>
            <span className="font-semibold text-white/70">{item.ville}</span>
          </div>
          <div className="flex items-center gap-3 text-white/40 text-[10px]">
            <div className="flex items-center gap-1.5">
              <Calendar size={9}/>
              <span className="capitalize">{dateStr}</span>
            </div>
            {item.heure && (
              <div className="flex items-center gap-1">
                <Clock size={9}/>
                <span>{item.heure}</span>
              </div>
            )}
          </div>
          {item.info && <p className="text-white/25 text-[10px] italic">{item.info}</p>}
        </div>

        {/* Liens comité */}
        {(item.facebook || item.site) && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-white/6">
            {item.facebook && (
              <a href={item.facebook} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-blue-600/12 border border-blue-600/20 text-blue-400 text-[9px] font-bold px-2.5 py-1.5 rounded-xl hover:bg-blue-600/20 transition-colors">
                📘 Facebook CD{item.deptCode}
              </a>
            )}
            {item.site && (
              <a href={item.site} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-emerald-600/12 border border-emerald-600/20 text-emerald-400 text-[9px] font-bold px-2.5 py-1.5 rounded-xl hover:bg-emerald-600/20 transition-colors">
                🌐 Site
              </a>
            )}
          </div>
        )}
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-3 right-3 w-7 h-7 bg-zinc-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 border border-white/10"
      >
        <Trash2 size={11} className="text-white"/>
      </button>
    </motion.div>
  );
};

// ── Composant principal ───────────────────────────────────────
// ── Popup invitation inscription ─────────────────────────────
const AuthRequiredPopup = ({ onClose, onAuth }: { onClose: () => void; onAuth: () => void }) =>
  ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center px-5"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        className="relative w-full max-w-sm bg-zinc-950 border border-white/12 rounded-3xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-1 w-full bg-gradient-to-r from-red-600 to-red-400" />
        <div className="px-6 pt-6 pb-6">
          {/* Icône */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-red-600/15 border-2 border-red-600/30 flex items-center justify-center">
              <Heart size={28} className="text-red-500" fill="rgba(239,68,68,0.3)" />
            </div>
          </div>
          {/* Texte */}
          <h2 className="text-white font-black text-lg text-center mb-2">
            Sauvegardez vos favoris
          </h2>
          <p className="text-white/40 text-[12px] text-center leading-relaxed mb-5">
            Créez un compte gratuit pour sauvegarder vos vidéos, articles et concours préférés, et les retrouver sur tous vos appareils.
          </p>
          {/* Avantages */}
          <div className="bg-white/4 rounded-2xl px-4 py-3 mb-5 space-y-2">
            {[
              '❤️  Favoris synchronisés sur tous vos appareils',
              '📅  Concours et articles sauvegardés',
              '🎥  Retrouvez vos vidéos préférées',
            ].map((item, i) => (
              <p key={i} className="text-white/50 text-[11px]">{item}</p>
            ))}
          </div>
          {/* Boutons */}
          <button
            onClick={() => { onAuth(); onClose(); }}
            className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-[13px] uppercase tracking-wider transition-colors mb-2.5"
          >
            S'inscrire / Se connecter
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl border border-white/10 text-white/35 font-bold text-[11px] uppercase tracking-wider hover:bg-white/5 transition-colors"
          >
            Continuer sans compte
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );

const FavoritesComponent = ({ onVideoSelect, user, onAuthRequired }: {
  onVideoSelect: (v: Video) => void;
  user?: any;
  onAuthRequired?: () => void;
}) => {
  const [tab, setTab] = useState<Tab>('video');
  const [items, setItems] = useState<FavItem[]>([]);
  const [headerH, setHeaderH] = useState(128);

  const reload = useCallback(async () => {
    const items = await getFavorites();
    setItems(items);
  }, []);

  useEffect(() => { reload(); }, [reload]);

  // Écouter les changements de favoris depuis d'autres composants
  useEffect(() => {
    const handler = () => reload();
    window.addEventListener('ahrena_fav_changed', handler);
    return () => window.removeEventListener('ahrena_fav_changed', handler);
  }, [reload]);

  useEffect(() => {
    const measure = () => {
      const h = document.querySelector('header');
      if (h) setHeaderH(h.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const handleRemove = (id: string) => {
    removeFav(id);
    reload();
    window.dispatchEvent(new Event('ahrena_fav_changed'));
  };

  const filtered = items.filter(i => i.category === tab);
  const counts = {
    video:    items.filter(i => i.category === 'video').length,
    article:  items.filter(i => i.category === 'article').length,
    concours: items.filter(i => i.category === 'concours').length,
  };

  // Page entière si non connecté
  if (!user) {
    return (
      <div style={{ paddingTop: `${headerH}px`, height: '100%', overflowY: 'auto' }} className="bg-black text-white flex flex-col items-center justify-center px-6 text-center py-10">
        <div className="w-20 h-20 rounded-3xl bg-red-600/12 border-2 border-red-600/25 flex items-center justify-center mb-5">
          <Heart size={36} className="text-red-500/60" />
        </div>
        <h2 className="text-white font-black text-xl mb-2">Mes Favoris</h2>
        <p className="text-white/35 text-[13px] leading-relaxed mb-6 max-w-xs">
          Sauvegardez vos vidéos, articles et concours préférés et retrouvez-les sur tous vos appareils.
        </p>
        <div className="w-full max-w-xs bg-white/4 border border-white/8 rounded-2xl px-5 py-4 mb-6 space-y-3 text-left">
          {[
            { icon: '🎥', text: 'Vidéos et replays sauvegardés' },
            { icon: '📰', text: 'Articles à lire plus tard' },
            { icon: '📅', text: 'Concours favoris avec liens comité' },
            { icon: '📱', text: 'Synchronisé sur tous vos appareils' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <p className="text-white/50 text-[12px]">{item.text}</p>
            </div>
          ))}
        </div>
        <button
          onClick={onAuthRequired}
          className="w-full max-w-xs py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-widest transition-colors shadow-lg shadow-red-900/30"
        >
          S'inscrire / Se connecter
        </button>
        <p className="text-white/15 text-[10px] mt-3">Gratuit · Aucune carte requise</p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: `${headerH}px`, height: '100%', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }} className="bg-black text-white pb-28">
      <div className="max-w-6xl mx-auto">
        <div className="px-5 pt-5 pb-3">
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tight">Mes Favoris</h1>
          <p className="text-white/30 text-xs mt-0.5">{items.length} élément{items.length > 1 ? 's' : ''} sauvegardé{items.length > 1 ? 's' : ''}</p>
        </div>

        {/* Onglets */}
        <div className="flex gap-2 px-5 mb-5">
          {TABS.map(t => {
            const active = tab === t.key;
            const count = counts[t.key];
            return (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all flex-1 justify-center border"
                style={active
                  ? { background: t.color, borderColor: t.color, color: 'white' }
                  : { background: 'transparent', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
              >
                {t.icon}
                <span>{t.label}</span>
                {count > 0 && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-black"
                    style={active ? { background: 'rgba(255,255,255,0.25)' } : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Contenu */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key={`empty-${tab}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center mb-4 border border-white/5">
                {TABS.find(t => t.key === tab)?.icon && React.cloneElement(
                  TABS.find(t => t.key === tab)!.icon as React.ReactElement,
                  { size: 28, className: 'text-white/15' }
                )}
              </div>
              <p className="text-white/40 font-bold text-sm mb-1">
                {tab === 'video' ? 'Aucune vidéo sauvegardée' : tab === 'article' ? 'Aucun article sauvegardé' : 'Aucun concours sauvegardé'}
              </p>
              <p className="text-white/20 text-xs leading-relaxed">
                {tab === 'video' ? 'Appuyez sur ♥ sur une vidéo pour la retrouver ici.' : tab === 'article' ? 'Appuyez sur ♥ sur un article pour le lire plus tard.' : 'Appuyez sur ♥ sur un concours du calendrier pour le retrouver ici.'}
              </p>
            </motion.div>
          ) : (
            <motion.div key={`list-${tab}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={`px-4 ${
                tab === 'video'
                  ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'
                  : tab === 'concours'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'
                  : 'grid grid-cols-1 md:grid-cols-2 gap-3'
              }`}
            >
              <AnimatePresence>
                {filtered.map(item => {
                  if (item.category === 'video') return <VideoCard key={item.id} item={item as FavVideo} onPlay={onVideoSelect} onRemove={handleRemove}/>;
                  if (item.category === 'article') return <ArticleCard key={item.id} item={item as FavArticle} onRemove={handleRemove}/>;
                  if (item.category === 'concours') return <ConcoursCard key={item.id} item={item as FavConcours} onRemove={handleRemove}/>;
                  return null;
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FavoritesComponent;
