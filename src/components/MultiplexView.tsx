import React, { useState } from 'react';
import { X, Maximize2, Plus, Radio, Tv } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Video } from '../services/youtubeService';

interface MultiplexViewProps {
  videos: Video[];
  availableLives: Video[];
  availableVideos: Video[]; // vidéos normales des chaînes
  onRemove: (videoId: string) => void;
  onAdd: (video: Video) => void;
  onClose: () => void;
}

type Tab = 'live' | 'videos';

const MultiplexView: React.FC<MultiplexViewProps> = ({
  videos, availableLives, availableVideos, onRemove, onAdd, onClose
}) => {
  // Ouvrir le picker directement si aucune vidéo (accès via icône header)
  const [showPicker, setShowPicker] = useState(videos.length === 0);
  const [tab, setTab] = useState<Tab>('live');

  const alreadyIds = new Set(videos.map(v => v.id));
  const addableLives  = availableLives.filter(v => !alreadyIds.has(v.id));
  const addableVideos = availableVideos.filter(v => !alreadyIds.has(v.id));
  const canAdd = videos.length < 2 && (addableLives.length > 0 || addableVideos.length > 0);

  const handleAdd = (video: Video) => {
    onAdd(video);
    setShowPicker(false);
  };

  const pickerList = tab === 'live' ? addableLives : addableVideos;

  return (
    <div className="fixed inset-0 z-[80] bg-black flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900">
        <h2 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-2">
          <Maximize2 size={16} className="text-red-600" />
          Mode Multiplex
          <span className="text-white/30 font-normal normal-case tracking-normal text-xs">
            {videos.length}/2 flux
          </span>
        </h2>
        <div className="flex items-center gap-2">
          {canAdd && (
            <button
              onClick={() => setShowPicker(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-full text-white text-xs font-black uppercase tracking-wide transition-colors"
            >
              <Plus size={13} />
              Ajouter
            </button>
          )}
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      {videos.length === 0 ? (
        /* ── Écran vide — invitation à choisir ── */
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
          <div className="w-20 h-20 rounded-3xl bg-red-600/15 border border-red-600/30 flex items-center justify-center">
            <Maximize2 size={32} className="text-red-500" />
          </div>
          <div className="text-center">
            <h3 className="text-white font-black text-lg uppercase tracking-wide mb-2">Mode Multiplex</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Regardez jusqu'à 2 vidéos simultanément.<br/>
              Choisissez vos flux ci-dessous.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={() => { setTab('live'); setShowPicker(true); }}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-red-600/15 border border-red-600/30 hover:bg-red-600/25 transition-colors"
            >
              <Radio size={18} className="text-red-500 flex-shrink-0" />
              <div className="text-left">
                <p className="text-white font-black text-sm uppercase tracking-wide">Ajouter un live</p>
                <p className="text-white/40 text-[11px] mt-0.5">{availableLives.length} live{availableLives.length !== 1 ? 's' : ''} en cours</p>
              </div>
              <Plus size={16} className="text-white/40 ml-auto" />
            </button>
            <button
              onClick={() => { setTab('videos'); setShowPicker(true); }}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Tv size={18} className="text-white/60 flex-shrink-0" />
              <div className="text-left">
                <p className="text-white font-black text-sm uppercase tracking-wide">Ajouter une vidéo</p>
                <p className="text-white/40 text-[11px] mt-0.5">{availableVideos.length} vidéos disponibles</p>
              </div>
              <Plus size={16} className="text-white/40 ml-auto" />
            </button>
          </div>
        </div>
      ) : (
        /* ── Grille vidéos ── */
        <div className={`flex-1 grid ${videos.length > 1 ? 'grid-rows-2' : 'grid-rows-1'} gap-2 p-2`}>
          {videos.map((video) => (
            <div key={video.id} className="relative bg-zinc-900 rounded-lg overflow-hidden border border-white/5">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <button
                onClick={() => onRemove(video.id)}
                className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white backdrop-blur-md hover:bg-black/80 transition-colors"
              >
                <X size={14} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[10px] font-bold text-white uppercase truncate">{video.title}</p>
              </div>
            </div>
          ))}

          {/* Slot vide */}
          {videos.length === 1 && (
            <div
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors ${
                canAdd ? 'border-red-600/40 cursor-pointer hover:border-red-600/70 hover:bg-red-600/5' : 'border-white/10'
              }`}
              onClick={() => canAdd && setShowPicker(true)}
            >
              {canAdd ? (
                <>
                  <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center mb-2">
                    <Plus size={20} className="text-red-500" />
                  </div>
                  <p className="text-xs uppercase tracking-widest font-black text-red-500/70">Ajouter un flux</p>
                </>
              ) : (
                <>
                  <Radio size={20} className="text-white/20 mb-2" />
                  <p className="text-xs uppercase tracking-widest font-black text-white/20">Aucune vidéo disponible</p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Picker */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-black/80 backdrop-blur-md flex items-end"
            onClick={() => setShowPicker(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full bg-zinc-950 border-t border-white/10 rounded-t-2xl p-5"
              onClick={e => e.stopPropagation()}
            >
              {/* Titre + close */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wide">Choisir une vidéo</h3>
                <button onClick={() => setShowPicker(false)} className="p-1.5 bg-white/8 rounded-full">
                  <X size={14} className="text-white/60" />
                </button>
              </div>

              {/* Onglets Lives / Vidéos */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setTab('live')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide transition-colors ${
                    tab === 'live' ? 'bg-red-600 text-white' : 'bg-white/8 text-white/50 hover:bg-white/12'
                  }`}
                >
                  <Radio size={11} />
                  Lives en cours
                  {addableLives.length > 0 && (
                    <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-black ${tab === 'live' ? 'bg-white/20' : 'bg-white/10'}`}>
                      {addableLives.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setTab('videos')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide transition-colors ${
                    tab === 'videos' ? 'bg-white/15 text-white' : 'bg-white/8 text-white/50 hover:bg-white/12'
                  }`}
                >
                  <Tv size={11} />
                  Vidéos
                  {addableVideos.length > 0 && (
                    <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-black ${tab === 'videos' ? 'bg-white/20' : 'bg-white/10'}`}>
                      {addableVideos.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Liste */}
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {pickerList.length === 0 ? (
                  <div className="flex flex-col items-center py-8 text-white/30">
                    {tab === 'live' ? <Radio size={24} className="mb-2" /> : <Tv size={24} className="mb-2" />}
                    <p className="text-xs uppercase tracking-wide font-bold">
                      {tab === 'live' ? 'Aucun live en cours' : 'Aucune vidéo disponible'}
                    </p>
                  </div>
                ) : (
                  pickerList.map(video => (
                    <button
                      key={video.id}
                      onClick={() => handleAdd(video)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 transition-colors text-left"
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-16 h-9 rounded-lg object-cover"
                        />
                        {video.isLive && (
                          <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-bold truncate">{video.title}</p>
                        <p className="text-white/40 text-[10px] mt-0.5">{video.channelName}</p>
                      </div>
                      <Plus size={16} className="text-white/40 flex-shrink-0" />
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiplexView;
