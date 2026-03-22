import React from 'react';
import { X, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Video } from '../services/youtubeService';

interface MultiplexViewProps {
  videos: Video[];
  onRemove: (videoId: string) => void;
  onClose: () => void;
}

const MultiplexView: React.FC<MultiplexViewProps> = ({ videos, onRemove, onClose }) => {
  if (videos.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900">
        <h2 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-2">
          <Maximize2 size={16} className="text-red-600" />
          Mode Multiplex
        </h2>
        <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-white">
          <X size={20} />
        </button>
      </div>

      <div className={`flex-1 grid ${videos.length > 1 ? 'grid-rows-2' : 'grid-rows-1'} gap-2 p-2`}>
        {videos.map((video) => (
          <div key={video.id} className="relative bg-zinc-900 rounded-lg overflow-hidden border border-white/5">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <button 
                onClick={() => onRemove(video.id)}
                className="p-1.5 bg-black/50 rounded-full text-white backdrop-blur-md"
              >
                <X size={14} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-[10px] font-bold text-white uppercase truncate">{video.title}</p>
            </div>
          </div>
        ))}
        {videos.length === 1 && (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-lg text-white/20">
            <p className="text-xs uppercase tracking-widest font-black">Ajoutez un deuxième flux</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiplexView;
