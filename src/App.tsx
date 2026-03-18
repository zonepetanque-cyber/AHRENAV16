import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Calendar, 
  Users, 
  Tv,
  Heart, 
  X, 
  Info, 
  ChevronRight, 
  ChevronLeft,
  Radio,
  Search,
  User,
  Maximize2,
  ChevronDown,
  Home,
  PictureInPicture2,
  Newspaper
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CHANNELS } from './constants';
import { fetchAllVideos, Video } from './services/youtubeService';
import { supabase } from './lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import ProgrammeComponent from './components/ProgrammeComponent';
import CalendarComponent from './components/CalendarComponent';
import ClubComponent from './components/ClubComponent';
import FavoritesComponent from './components/FavoritesComponent';
import ChatComponent from './components/ChatComponent';
import NewsComponent from './components/NewsComponent';

import MultiplexView from './components/MultiplexView';
import SplashScreen from './components/SplashScreen';
import InstallPWA from './components/InstallPWA';
import LegalComponent from './components/LegalComponent';
import CGUComponent from './components/CGUComponent';
import PrivacyComponent from './components/PrivacyComponent';
import TakedownComponent from './components/TakedownComponent';
import AdminDashboard from './components/AdminDashboard';

// --- Components ---

const Header = ({ onProfileClick, onSearchClick, onNewsClick }: { onProfileClick: () => void, onSearchClick: () => void, onNewsClick: () => void }) => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/95 via-black/50 to-transparent">
    <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between">
    <div className="flex-none">
      <img 
        src="https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_AHRENA.png?v=1773386123" 
        alt="AHRENA Logo" 
        className="h-24 w-auto drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="flex items-center gap-4">
      <button onClick={onNewsClick} className="p-2 text-white/70 hover:text-white transition-colors">
        <Newspaper size={22} />
      </button>
      <button onClick={onSearchClick} className="p-2 text-white/70 hover:text-white transition-colors">
        <Search size={22} />
      </button>
      <button onClick={onProfileClick} className="p-2 text-white/70 hover:text-white transition-colors">
        <User size={22} />
      </button>
    </div>
    </div>
  </header>
);

const Navbar = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/80">
    <div className="mx-auto max-w-[1400px] bg-black/90 backdrop-blur-md border-t border-white/10 px-4 py-2 flex justify-around items-center md:justify-start md:gap-2 md:px-8">
    <NavItem 
      icon={<Home size={24} />} 
      label="Accueil" 
      active={activeTab === 'live'} 
      onClick={() => onTabChange('live')}
    />
    <NavItem 
      icon={<Tv size={24} />} 
      label="Programme" 
      active={activeTab === 'programme'} 
      onClick={() => onTabChange('programme')}
    />
    <NavItem 
      icon={<Calendar size={24} />} 
      label="Calendrier" 
      active={activeTab === 'calendar'} 
      onClick={() => onTabChange('calendar')}
    />
    <NavItem 
      icon={<Users size={24} />} 
      label="Le Club" 
      active={activeTab === 'club'} 
      onClick={() => onTabChange('club')}
    />
    <NavItem 
      icon={<Heart size={24} />} 
      label="Favoris" 
      active={activeTab === 'favorites'} 
      onClick={() => onTabChange('favorites')}
    />
    </div>
  </nav>
);

const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors px-2 md:flex-row md:gap-2 md:px-4 md:py-2 md:rounded-xl ${active ? 'text-white md:bg-white/10' : 'text-white/40 hover:text-white/70 md:hover:bg-white/5'}`}
  >
    {icon}
    <span className="text-[10px] uppercase tracking-wider font-medium md:text-[11px]">{label}</span>
  </button>
);

const Hero = ({ onPlay, onInfo, heroVideos, onClubClick }: { onPlay: (video: Video) => void, onInfo: (video: Video) => void, heroVideos: Video[], onClubClick: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (heroVideos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroVideos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroVideos.length]);

  const currentVideo = heroVideos[currentSlide];

  // Description : utilise la description YouTube si dispo, sinon le titre
  const getDescription = (video: Video | undefined) => {
    if (!video) return "Suivez en exclusivité les plus grands champions sur les terrains les plus prestigieux de France.";
    if (video.description && video.description.trim().length > 10) {
      return video.description.trim();
    }
    return video.channelName ? `Diffusé par ${video.channelName}` : video.title;
  };

  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-zinc-950">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          {heroVideos.length > 0 ? (
            <motion.img 
              key={currentSlide}
              src={currentVideo?.thumbnail || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80"} 
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80" 
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
          )}
        </AnimatePresence>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>
      
      {/* Foreground Text (Dynamic) */}
      <div className="absolute bottom-24 left-6 right-6 md:left-12 md:right-auto md:max-w-lg flex flex-col gap-4 z-20">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <Radio size={16} className="text-red-600 animate-pulse" />
              <span className="text-white font-bold text-xs tracking-[0.3em] uppercase">
                {currentVideo?.isLive ? 'En Direct' : currentVideo?.isUpcoming ? 'À Venir' : 'Original AHRENA'}
              </span>
            </div>
            
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-black text-[#D4AF37] leading-tight uppercase italic drop-shadow-lg line-clamp-2">
                {currentVideo?.title || "AHRENA"}
              </h1>
              <div className="flex flex-col gap-0.5">
                {currentVideo?.isUpcoming && currentVideo.scheduledStartTime && (
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                    {formatLiveDate(currentVideo.scheduledStartTime)}
                  </p>
                )}
                <p className="text-white/90 text-sm font-medium drop-shadow-md">
                  {currentVideo?.channelName ? `Diffusé par ${currentVideo.channelName}` : 'AHRENA'}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 md:gap-2">
          <button 
            onClick={() => currentVideo && onPlay(currentVideo)}
            className="flex-1 md:flex-none bg-white text-black font-bold py-3 md:py-2 md:px-6 rounded flex items-center justify-center gap-2 hover:bg-white/90 transition-colors text-sm md:text-xs"
          >
            <Play fill="black" size={16} />
            {currentVideo?.isUpcoming ? 'Mettre un rappel' : 'Regarder'}
          </button>
          <button 
            onClick={() => currentVideo && onInfo(currentVideo)}
            className="flex-1 md:flex-none bg-white/20 backdrop-blur-md text-white font-bold py-3 md:py-2 md:px-6 rounded flex items-center justify-center gap-2 hover:bg-white/30 transition-colors text-sm md:text-xs"
          >
            <Info size={16} />
            Plus d'infos
          </button>
        </div>

        <button 
          onClick={onClubClick}
          className="md:max-w-xs p-2.5 bg-red-600/10 backdrop-blur-md rounded-lg border border-red-600/20 flex items-center justify-between hover:bg-red-600/20 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-1 rounded">
              <Users size={12} className="text-white" />
            </div>
            <p className="text-[10px] font-black text-white uppercase tracking-widest">
              Club AHRENA : Multiplex & Chat VIP pour 2€
            </p>
          </div>
          <ChevronRight size={14} className="text-red-600" />
        </button>
      </div>

      {/* Navigation Indicators */}
      {heroVideos.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {heroVideos.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === currentSlide ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface VideoCarouselProps {
  key?: string | number;
  title: string;
  videos: Video[];
  onVideoSelect: (v: Video) => void;
  large?: boolean;
  channelUrl?: string;
  channelAvatar?: string;
  hideTitleBar?: boolean;
}

const formatLiveDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();
  const isTomorrow = new Date(now.getTime() + 86400000).toDateString() === date.toDateString();
  
  const time = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  
  if (isToday) return `Aujourd'hui à ${time}`;
  if (isTomorrow) return `Demain à ${time}`;
  
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).replace(',', ' à');
};

const VideoCarousel = ({ title, videos, onVideoSelect, large = false, channelUrl, channelAvatar, hideTitleBar = false }: VideoCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  if (videos.length === 0) return null;

  const cardWidth = large ? 175 : 120;
  const scrollAmount = cardWidth * 3 + 16 * 3; // 3 cartes + gaps

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const onScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 10);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const TitleContent = () => (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      {channelAvatar && (
        <img
          src={channelAvatar}
          alt=""
          referrerPolicy="no-referrer"
          className="w-9 h-9 rounded-full border-2 border-white/10 flex-shrink-0 object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      )}
      <span className={`truncate ${large ? 'text-2xl' : 'text-xl'}`}>{title}</span>
      {channelUrl && <ChevronRight size={20} className="text-white/40 group-hover:text-white/80 transition-colors flex-shrink-0 ml-auto" />}
    </div>
  );

  return (
    <div className={`${large ? "py-6" : "py-4"} group/carousel`}>
      {!hideTitleBar && channelUrl && (
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 font-bold text-white mb-3 flex items-center justify-between group cursor-pointer"
        >
          <TitleContent />
        </a>
      )}
      {!hideTitleBar && !channelUrl && (
        <h2 className="px-6 font-bold text-white mb-3 flex items-center justify-between">
          <TitleContent />
        </h2>
      )}

      {/* Wrapper relatif pour positionner les flèches */}
      <div className="relative overflow-visible">

        {/* Flèche gauche — desktop uniquement */}
        <button
          onClick={() => scroll('left')}
          className={`
            hidden sm:flex
            absolute left-0 top-0 z-20
            items-center justify-center
            w-12 aspect-video
            bg-gradient-to-r from-black via-black/80 to-transparent
            text-white transition-all duration-200
            ${showLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
          aria-label="Défiler à gauche"
        >
          <div className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-colors shadow-lg">
            <ChevronLeft size={18} className="text-white" />
          </div>
        </button>

        {/* Flèche droite — desktop uniquement */}
        <button
          onClick={() => scroll('right')}
          className={`
            hidden sm:flex
            absolute right-0 top-0 z-20
            items-center justify-center
            w-12 aspect-video
            bg-gradient-to-l from-black via-black/80 to-transparent
            text-white transition-all duration-200
            ${showRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
          aria-label="Défiler à droite"
        >
          <div className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-colors shadow-lg">
            <ChevronRight size={18} className="text-white" />
          </div>
        </button>

        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto px-6 pb-10 no-scrollbar snap-x snap-mandatory scroll-smooth"
        >
        {videos.map((video) => (
          <div 
            key={video.id} 
            className={`flex-none snap-start group cursor-pointer ${large ? 'w-72 sm:w-[300px] md:w-[calc((100vw-6rem)/4.5)]' : 'w-44 sm:w-[160px] md:w-[calc((100vw-6rem)/4.5)]'}`}
            onClick={() => onVideoSelect(video)}
          >
            <div className={`relative aspect-video rounded-md overflow-hidden bg-zinc-900 mb-2 border border-white/5 group-hover:border-white/20 transition-all ${large ? 'shadow-lg shadow-red-900/10' : ''}`}>
              {/* Fallback Logo */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_AHRENA.png?v=1773386123" 
                  alt="" 
                  className="w-20 h-auto grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = '0';
                }}
              />
              
              {/* Brand Overlay Logo */}
              <div className="absolute bottom-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_AHRENA.png?v=1773386123" 
                  alt="" 
                  className="h-4 w-auto drop-shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>
              {video.isLive && (
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-black px-2 py-1 rounded-sm shadow-lg animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  EN DIRECT
                </div>
              )}
              {video.isUpcoming && (
                <div className="absolute top-3 left-3 z-20 flex flex-col items-start gap-1">
                  <div className="bg-blue-600 text-white text-[11px] font-black px-2 py-1 rounded-sm flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    À VENIR
                  </div>
                  {(video.scheduledStartTime || video.publishedAt) && (
                    <div className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm border border-white/10">
                      {formatLiveDate(video.scheduledStartTime || video.publishedAt)}
                    </div>
                  )}
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
            <h3 className={`text-white/90 font-medium leading-snug line-clamp-2 group-hover:text-white transition-colors ${large ? 'text-sm' : 'text-[11px]'}`} style={{minHeight: '2.5em'}}>
              {video.title}
            </h3>
            {large && video.channelName && (
              <p className="text-white/40 text-[10px] mt-1 uppercase tracking-wider">{video.channelName}</p>
            )}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

const VideoModal = ({ video, onClose, isPremium, onMinimize, onAddToMultiplex, onBecomeVIP }: { 
  video: Video | null, 
  onClose: () => void, 
  isPremium: boolean,
  onMinimize: (video: Video) => void,
  onAddToMultiplex: (video: Video) => void,
  onBecomeVIP: () => void
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPipGuide, setShowPipGuide] = useState(false);
  const [pipDismissed, setPipDismissed] = useState(() => localStorage.getItem('ahrena_pip_dismissed') === '1');

  const handlePipClick = () => {
    setShowPipGuide(true);
  };

  const dismissPipGuide = () => {
    setShowPipGuide(false);
    setPipDismissed(true);
    localStorage.setItem('ahrena_pip_dismissed', '1');
  };

  // Bloquer le scroll de la page en arrière-plan quand la modal est ouverte
  useEffect(() => {
    if (video) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [video]);

  useEffect(() => {
    if (video) {
      const saved = localStorage.getItem('ahrena_favorites');
      if (saved) {
        const favs = JSON.parse(saved);
        setIsFavorite(favs.some((f: Video) => f.id === video.id));
      }
    }
  }, [video]);

  const toggleFavorite = () => {
    if (!video) return;
    const saved = localStorage.getItem('ahrena_favorites');
    let favs = saved ? JSON.parse(saved) : [];
    
    if (isFavorite) {
      favs = favs.filter((f: Video) => f.id !== video.id);
    } else {
      favs.push(video);
    }
    
    localStorage.setItem('ahrena_favorites', JSON.stringify(favs));
    setIsFavorite(!isFavorite);
  };

  return (
    <AnimatePresence>
      {video && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <div className="min-h-full flex flex-col">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl mx-auto bg-zinc-900 shadow-2xl border-x border-white/10 flex-1"
            >
              {/* Boutons d'action — collés en haut à droite */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                {isPremium && (
                  <>
                    <button 
                      onClick={() => video && onAddToMultiplex(video)}
                      className="p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                      title="Ajouter au Multiplex"
                    >
                      <Maximize2 size={20} />
                    </button>
                    <button 
                      onClick={() => video && onMinimize(video)}
                      className="p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                    >
                      <ChevronDown size={20} />
                    </button>
                  </>
                )}
                <button 
                  onClick={toggleFavorite}
                  className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-red-600 text-white' : 'bg-black/50 hover:bg-black/80 text-white'}`}
                >
                  <Heart size={20} fill={isFavorite ? "white" : "none"} />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Vidéo — ratio 16:9 fixe, toujours visible en haut */}
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {/* Bouton PiP — affiché en bas à gauche du player */}
                {!pipDismissed && (
                  <button
                    onClick={handlePipClick}
                    className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm border border-white/20 px-2.5 py-1.5 rounded-full text-[10px] font-bold text-white/80 hover:text-white hover:border-white/40 transition-all z-10"
                  >
                    <PictureInPicture2 size={12} />
                    Mini-écran
                  </button>
                )}
              </div>

              {/* Guide PiP — overlay d'instructions */}
              <AnimatePresence>
                {showPipGuide && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center px-6"
                    onClick={dismissPipGuide}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-zinc-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full"
                      onClick={e => e.stopPropagation()}
                    >
                      {/* Icône */}
                      <div className="w-14 h-14 bg-red-600/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <PictureInPicture2 size={28} className="text-red-500" />
                      </div>

                      <h3 className="text-white font-black text-lg text-center mb-1">Mini-écran (PiP)</h3>
                      <p className="text-white/40 text-xs text-center mb-5">Continuez à regarder en naviguant</p>

                      {/* Étapes */}
                      <div className="space-y-3 mb-6">
                        {[
                          { num: '1', icon: '⛶', text: "Appuyez sur l'icône plein écran dans le lecteur YouTube" },
                          { num: '2', icon: '📱', text: 'La vidéo passe en plein écran sur votre téléphone' },
                          { num: '3', icon: '⬇️', text: 'Faites glisser vers le bas ou appuyez sur le bouton PiP de votre téléphone' },
                          { num: '4', icon: '✅', text: 'La vidéo flotte en mini-écran pendant que vous naviguez' },
                        ].map((step, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 text-[10px] font-black text-white">
                              {step.num}
                            </div>
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-lg">{step.icon}</span>
                              <p className="text-white/70 text-xs leading-snug">{step.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Boutons */}
                      <button
                        onClick={dismissPipGuide}
                        className="w-full bg-red-600 text-white font-black py-3 rounded-xl text-sm uppercase tracking-wider hover:bg-red-700 transition-colors"
                      >
                        J'ai compris
                      </button>
                      <button
                        onClick={() => setShowPipGuide(false)}
                        className="w-full mt-2 text-white/30 text-xs py-2 hover:text-white/60 transition-colors"
                      >
                        Me rappeler plus tard
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Infos + Chat — scrollable en dessous de la vidéo */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-500 font-bold text-sm">98% Match</span>
                  <span className="text-white/40 text-sm">2026</span>
                  <span className="border border-white/40 text-white/40 text-[10px] px-1 rounded">HD</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-1 leading-snug">{video.title}</h2>
                <p className="text-white/60 text-sm mb-4">
                  Diffusé par <span className="text-white font-medium">{video.channelName}</span>
                </p>

                {video.isLive && (
                  <ChatComponent videoId={video.id} isPremium={isPremium} onBecomeVIP={onBecomeVIP} />
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

const Skeleton = () => (
  <div className="py-4">
    <div className="px-6 mb-3">
      <div className="h-6 w-48 bg-zinc-900 rounded animate-pulse" />
    </div>
    <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex-none w-44 sm:w-[120px]">
          <div className="aspect-video rounded-md bg-zinc-900 border border-white/5 animate-pulse mb-2" />
          <div className="h-3 w-full bg-zinc-900 rounded animate-pulse mb-1" />
          <div className="h-3 w-2/3 bg-zinc-900 rounded animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('live');
  const [showNews, setShowNews] = useState(false);
  const [showNewsPopup, setShowNewsPopup] = useState(false);
  const [popupNews, setPopupNews] = useState<any[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'cancelled' | null>(null);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);

  // Détection mise à jour Service Worker
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    // Écouter le message SW_UPDATED envoyé par le SW lors de l'activation
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SW_UPDATED') {
        setShowUpdateBanner(true);
      }
    };
    navigator.serviceWorker.addEventListener('message', handleMessage);

    // Vérifier aussi si un nouveau SW est en attente au chargement
    navigator.serviceWorker.ready.then(reg => {
      if (reg.waiting) {
        setShowUpdateBanner(true);
      }
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setShowUpdateBanner(true);
          }
        });
      });
    });

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleUpdate = () => {
    if (!('serviceWorker' in navigator)) return;
    // Recharger dès que le nouveau SW prend le contrôle
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    }, { once: true });
    navigator.serviceWorker.ready.then(reg => {
      if (reg.waiting) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      } else {
        window.location.reload();
      }
    });
    setShowUpdateBanner(false);
  };

  // Détecter le retour depuis Stripe Checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    const payment = params.get('payment');
    if (tab === 'club') {
      setActiveTab('club');
      if (payment === 'success') setPaymentStatus('success');
      if (payment === 'cancelled') setPaymentStatus('cancelled');
      // Nettoyer l'URL
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Vérifie si le popup doit s'afficher aujourd'hui
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastSeen = localStorage.getItem('ahrena_news_popup_date');
    if (lastSeen === today) return;

    const timer = setTimeout(async () => {
      try {
        const cached = localStorage.getItem('ahrena_news_cache');
        let items = [];
        if (cached) {
          const { data } = JSON.parse(cached);
          items = (data.items || []).slice(0, 5);
        } else {
          const res = await fetch('/api/news');
          if (res.ok) {
            const data = await res.json();
            items = (data.items || []).slice(0, 5);
            localStorage.setItem('ahrena_news_cache', JSON.stringify({ data, timestamp: Date.now() }));
          }
        }
        if (items.length > 0) {
          setPopupNews(items);
          setShowNewsPopup(true);
          localStorage.setItem('ahrena_news_popup_date', today);
        }
      } catch {}
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  const [liveVideos, setLiveVideos] = useState<Video[]>([]);
  const [channelVideos, setChannelVideos] = useState<{ [key: string]: Video[] }>({});
  const [blacklistedIds, setBlacklistedIds] = useState<Set<string>>(new Set());

  // Charger la blacklist depuis Supabase au démarrage
  useEffect(() => {
    const loadBlacklist = async () => {
      try {
        const { supabase } = await import('./lib/supabase');
        const { data } = await supabase.from('video_blacklist').select('video_id');
        if (data) setBlacklistedIds(new Set(data.map((d: any) => d.video_id)));
      } catch {}
    };
    loadBlacklist();
  }, []);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [infoVideo, setInfoVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [miniPlayerVideo, setMiniPlayerVideo] = useState<Video | null>(null);
  const [multiplexVideos, setMultiplexVideos] = useState<Video[]>([]);
  const [showMultiplex, setShowMultiplex] = useState(false);
  const touchStart = useRef(0);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllVideos();
      setLiveVideos(data.lives || []);
      setChannelVideos(data.channelVideos || {});
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();

    // Check auth state
    try {
      // Récupère la session courante (gère aussi le retour OAuth via hash #access_token)
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);

        // Nettoie le hash OAuth de l'URL après que Supabase l'a traité
        // Évite que Chrome garde une URL avec #access_token visible
        if (window.location.hash && window.location.hash.includes('access_token')) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }).catch(err => {
        console.error("Supabase session error:", err);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);

        // Au SIGNED_IN via OAuth, nettoie l'URL et ferme le modal auth
        if (event === 'SIGNED_IN') {
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error("Supabase not initialized:", error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      // Fetch profile for premium status
      const fetchProfile = async () => {
        try {
          const { data } = await supabase
            .from('profiles')
            .select('is_premium')
            .eq('id', user.id)
            .single();
          
          if (data) setIsPremium(data.is_premium);
        } catch (error) {
          console.error("Supabase profile fetch error:", error);
        }
      };
      fetchProfile();
    } else {
      setIsPremium(false);
    }
  }, [user]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      touchStart.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart.current > 0) {
      const touchY = e.touches[0].clientY;
      const diff = touchY - touchStart.current;
      if (diff > 100 && !refreshing) {
        setRefreshing(true);
        loadData();
      }
    }
  };

  const handleTouchEnd = () => {
    touchStart.current = 0;
  };

  const handleHeroPlay = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleHeroInfo = (video: Video) => {
    setInfoVideo(video);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'live':
        const allVideos = Object.values(channelVideos).flat().sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
        const heroVideos = [...liveVideos, ...allVideos].slice(0, 5);

        // Tri déjà effectué côté serveur — on utilise liveVideos directement
        const sortedLiveVideos = liveVideos;

        return (
          <>
            <Hero 
              onPlay={handleHeroPlay}
              onInfo={handleHeroInfo}
              heroVideos={heroVideos} 
              onClubClick={() => setActiveTab('club')}
            />

            <main className="relative z-10 -mt-12 md:max-w-[1400px] md:mx-auto">
              {/* ── Carrousel LIVES EN COURS ── */}
              {loading ? (
                <Skeleton />
              ) : (() => {
                const enCours = sortedLiveVideos.filter((v: any) => v.isLive === true);
                const aVenir = sortedLiveVideos.filter((v: any) => v.isUpcoming === true);
                return (
                  <>
                    {/* Section En Direct */}
                    <div className="px-6 pt-6 pb-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        <h2 className="text-xs font-black text-white uppercase tracking-[0.2em]">En Direct</h2>
                      </div>
                      {enCours.length > 0 ? (
                        <VideoCarousel
                          title=""
                          videos={enCours}
                          onVideoSelect={setSelectedVideo}
                          large={true}
                          hideTitleBar={true}
                        />
                      ) : (
                        <div className="flex items-center gap-3 bg-zinc-900/40 border border-white/5 rounded-xl px-5 py-4 mb-4">
                          <div className="w-2 h-2 rounded-full bg-white/20 flex-shrink-0" />
                          <p className="text-white/30 text-sm italic">Pas de lives en cours en ce moment</p>
                        </div>
                      )}
                    </div>

                    {/* Section Prochains Lives — toujours affichée */}
                    <div className="px-6 pb-4">
                      <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        Prochains Lives
                      </h2>
                      {aVenir.length > 0 ? (
                        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth -mx-6 px-6">
                          {aVenir.map((video: any) => (
                            <div
                              key={video.id}
                              className="flex-none w-72 snap-start cursor-pointer group"
                              onClick={() => setSelectedVideo(video)}
                            >
                              <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 mb-2 border border-white/10 shadow-lg">
                                <img
                                  src={video.thumbnail}
                                  alt={video.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                                  🔵 À venir
                                </div>
                                {video.scheduledStartTime && (
                                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 text-[10px] text-white text-center">
                                    {new Date(video.scheduledStartTime).toLocaleDateString('fr-FR', {
                                      weekday: 'short', day: 'numeric', month: 'short',
                                      hour: '2-digit', minute: '2-digit'
                                    })}
                                  </div>
                                )}
                                {video.channelAvatar && (
                                  <img src={video.channelAvatar} alt="" className="absolute top-2 right-2 w-7 h-7 rounded-full border-2 border-white/40" />
                                )}
                              </div>
                              <p className="text-white text-xs font-medium line-clamp-2 leading-snug">{video.title}</p>
                              <p className="text-white/40 text-[10px] mt-0.5">{video.channelName}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 bg-zinc-900/40 border border-white/5 rounded-xl px-5 py-4">
                          <span className="text-blue-500/50">🔵</span>
                          <p className="text-white/30 text-sm italic">Aucun live programmé pour le moment</p>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}

              {loading ? (
                <>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </>
              ) : (
                CHANNELS.map((channel) => (
                  <VideoCarousel 
                    key={channel.id}
                    title={channel.name}
                    videos={(channelVideos[channel.id] || []).filter(v => !blacklistedIds.has(v.id)).slice(0, 10)}
                    onVideoSelect={setSelectedVideo}
                    channelUrl={channel.url}
                    channelAvatar={channel.avatar}
                  />
                ))
              )}
            </main>
          </>
        );
      case 'programme':
        return <ProgrammeComponent videos={liveVideos} onVideoSelect={setSelectedVideo} />;
      case 'calendar':
        return <CalendarComponent videos={liveVideos} onVideoSelect={setSelectedVideo} />;
      case 'club':
        return <ClubComponent onTabChange={setActiveTab} />;
      case 'favorites':
        return <FavoritesComponent onVideoSelect={setSelectedVideo} />;
      case 'admin_disabled':
        return null;
      case 'legal':
        return <LegalComponent onTabChange={setActiveTab} />;
      case 'cgu':
        return <CGUComponent />;
      case 'privacy':
        return <PrivacyComponent />;
      case 'takedown':
        return <TakedownComponent />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-white selection:text-black">
      <div
        className="relative w-full bg-black text-white pb-36"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <Header onProfileClick={() => setActiveTab('club')} onSearchClick={() => {}} onNewsClick={() => setShowNews(true)} />

      {/* Bannière mise à jour disponible */}
      <AnimatePresence>
        {showUpdateBanner && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between gap-3 px-4 py-3 bg-[#D4AF37] shadow-lg"
          >
            <p className="text-black font-bold text-xs flex items-center gap-2">
              🆕 Nouvelle version disponible !
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleUpdate}
                className="bg-black text-[#D4AF37] font-black text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
              >
                Mettre à jour
              </button>
              <button
                onClick={() => setShowUpdateBanner(false)}
                className="p-1 text-black/50 hover:text-black transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {refreshing && (
        <div className="fixed top-20 left-0 right-0 z-[60] flex justify-center">
          <div className="bg-red-600 text-white text-[10px] font-black px-4 py-1 rounded-full shadow-lg animate-bounce">
            ACTUALISATION...
          </div>
        </div>
      )}

      <div className={activeTab !== 'live' ? 'md:max-w-[1400px] md:mx-auto' : ''}>
        {renderContent()}
      </div>

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Bannière retour paiement Stripe */}
      <AnimatePresence>
        {paymentStatus && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-20 left-4 right-4 z-[80] md:max-w-md md:mx-auto rounded-xl px-4 py-3 flex items-center justify-between gap-3 shadow-xl border ${
              paymentStatus === 'success'
                ? 'bg-emerald-600/90 border-emerald-500 text-white'
                : 'bg-zinc-800/90 border-white/15 text-white/70'
            }`}
          >
            <span className="text-sm font-bold">
              {paymentStatus === 'success'
                ? '🎉 Bienvenue au Club AHRENA ! Votre accès VIP est activé.'
                : '↩️ Paiement annulé. Vous pouvez réessayer quand vous voulez.'}
            </span>
            <button onClick={() => setPaymentStatus(null)} className="flex-shrink-0 opacity-70 hover:opacity-100">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Panneau Plus d'infos */}
      <AnimatePresence>
        {infoVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-end"
            onClick={() => setInfoVideo(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-full bg-zinc-900 rounded-t-2xl border-t border-white/10 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full">
                <img
                  src={infoVideo.thumbnail}
                  alt={infoVideo.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                <button
                  onClick={() => setInfoVideo(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white"
                >
                  <X size={20} />
                </button>
                {infoVideo.isLive && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-black px-2 py-1 rounded-sm animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    EN DIRECT
                  </div>
                )}
                {infoVideo.isUpcoming && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-blue-600 text-white text-[11px] font-black px-2 py-1 rounded-sm">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    À VENIR
                  </div>
                )}
              </div>

              {/* Infos */}
              <div className="p-5 pb-8">
                <h2 className="text-xl font-black text-white uppercase italic leading-tight mb-1">{infoVideo.title}</h2>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-3">
                  {infoVideo.channelName}
                  {infoVideo.isUpcoming && infoVideo.scheduledStartTime && (
                    <span className="text-blue-400 ml-2">· {formatLiveDate(infoVideo.scheduledStartTime)}</span>
                  )}
                </p>
                {infoVideo.description && infoVideo.description.trim().length > 10 && (
                  <p className="text-white/70 text-sm leading-relaxed mb-5">{infoVideo.description}</p>
                )}
                <button
                  onClick={() => { setInfoVideo(null); setSelectedVideo(infoVideo); }}
                  className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <Play fill="black" size={18} />
                  {infoVideo.isUpcoming ? 'Mettre un rappel' : 'Regarder maintenant'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <VideoModal 
        video={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
        isPremium={isPremium}
        onMinimize={(video) => {
          setMiniPlayerVideo(video);
          setSelectedVideo(null);
        }}
        onAddToMultiplex={(video) => {
          if (multiplexVideos.length < 2) {
            setMultiplexVideos(prev => [...prev, video]);
            setShowMultiplex(true);
            setSelectedVideo(null);
          } else {
            alert("Multiplex limité à 2 flux simultanés.");
          }
        }}
        onBecomeVIP={() => {
          setSelectedVideo(null);
          setActiveTab('club');
        }}
      />

      {/* Modal Actualités — déclenché par la loupe */}
      <AnimatePresence>
        {showNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm overflow-y-auto"
          >
            {/* Header du modal */}
            <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-white/10">
              <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Newspaper size={18} className="text-white/60" />
                  <h2 className="text-white font-black text-sm uppercase tracking-[0.2em]">Actualités Pétanque</h2>
                </div>
                <button
                  onClick={() => setShowNews(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
            </div>

            <NewsComponent />
          </motion.div>
        )}
      </AnimatePresence>

      {showMultiplex && (
        <MultiplexView 
          videos={multiplexVideos}
          onRemove={(id) => setMultiplexVideos(prev => prev.filter(v => v.id !== id))}
          onClose={() => setShowMultiplex(false)}
        />
      )}

      {/* Mini Player */}
      {miniPlayerVideo && isPremium && !selectedVideo && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-24 right-4 w-48 aspect-video bg-zinc-900 rounded-lg overflow-hidden shadow-2xl border border-white/10 z-40"
          onClick={() => setSelectedVideo(miniPlayerVideo)}
        >
          <iframe
            src={`https://www.youtube.com/embed/${miniPlayerVideo.id}?autoplay=1&mute=1`}
            className="w-full h-full pointer-events-none"
          />
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setMiniPlayerVideo(null);
            }}
            className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white"
          >
            <X size={12} />
          </button>
        </motion.div>
      )}

      {/* Global CSS for no-scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Pop-up quotidien actualités */}
      <AnimatePresence>
        {showNewsPopup && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-24 left-4 right-4 z-[90] md:max-w-md md:left-auto md:right-6"
          >
            <div className="bg-zinc-900 border border-white/15 rounded-2xl shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white font-black text-xs uppercase tracking-[0.15em]">
                    Actus du jour
                  </span>
                </div>
                <button
                  onClick={() => setShowNewsPopup(false)}
                  className="p-1 text-white/30 hover:text-white/70 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Articles avec image à gauche */}
              <div className="divide-y divide-white/5">
                {popupNews.map((item: any, i: number) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors group"
                    onClick={() => setShowNewsPopup(false)}
                  >
                    {/* Image */}
                    <div className="flex-shrink-0 w-16 h-14 rounded-lg overflow-hidden bg-zinc-800">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: item.color + '22' }}>
                          <Newspaper size={16} style={{ color: item.color }} />
                        </div>
                      )}
                    </div>

                    {/* Texte */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white/90 text-[12px] font-bold leading-snug line-clamp-2 group-hover:text-white transition-colors">
                        {item.title}
                      </p>
                      <p className="text-white/35 text-[9px] mt-1 uppercase tracking-wide font-medium">
                        {item.dept}
                      </p>
                    </div>

                    <ChevronRight size={12} className="text-white/20 group-hover:text-white/50 flex-shrink-0 transition-colors" />
                  </a>
                ))}
              </div>

              {/* Bouton Voir tout */}
              <div className="px-4 py-3 border-t border-white/8">
                <button
                  onClick={() => { setShowNewsPopup(false); setShowNews(true); }}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-black text-[11px] uppercase tracking-wider py-2.5 rounded-xl transition-colors"
                >
                  <Newspaper size={12} />
                  Voir toutes les actualités
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InstallPWA />
      </div>
    </div>
  );
}
