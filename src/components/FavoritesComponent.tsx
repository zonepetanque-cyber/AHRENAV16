import React, { useState, useEffect } from 'react';
import { Video } from '../services/youtubeService';
import { Heart, Play } from 'lucide-react';

const FavoritesComponent = ({ onVideoSelect }: { onVideoSelect: (v: Video) => void }) => {
  const [favorites, setFavorites] = useState<Video[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ahrena_favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <Heart size={48} className="text-white/10 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Vos favoris sont vides</h2>
        <p className="text-white/40 text-sm">Cliquez sur le cœur pour sauvegarder vos vidéos préférées.</p>
      </div>
    );
  }

  return (
    <div className="pt-36 pb-12 px-6">
      <h1 className="text-3xl font-black text-white uppercase italic mb-8">Mes Favoris</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {favorites.map((video) => (
          <div 
            key={video.id}
            onClick={() => onVideoSelect(video)}
            className="group cursor-pointer"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-white/20 transition-all mb-2">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <Play fill="white" size={16} className="ml-1" />
                </div>
              </div>
            </div>
            <h3 className="text-white/90 font-medium text-[11px] leading-snug line-clamp-2 group-hover:text-white transition-colors">
              {video.title}
            </h3>
            <p className="text-white/40 text-[9px] mt-1 uppercase tracking-wider">{video.channelName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesComponent;
