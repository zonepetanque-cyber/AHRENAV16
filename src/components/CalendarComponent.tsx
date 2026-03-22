import React from 'react';
import { Video } from '../services/youtubeService';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

const CalendarComponent = ({ videos, onVideoSelect }: { videos: Video[], onVideoSelect: (v: Video) => void }) => {
  // Les vidéos arrivent déjà triées et entrelacées par chaîne depuis le serveur
  // On filtre juste les à venir, sans re-trier pour préserver l'ordre inter-chaînes
  const upcoming = videos.filter(v => v.isUpcoming || v.isLive);

  const groupedByDate = upcoming.reduce((acc, video) => {
    const date = new Date(video.scheduledStartTime || video.publishedAt || "").toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
    
    let group = acc.find(g => g.date === date);
    if (!group) {
      group = { date, videos: [] };
      acc.push(group);
    }
    group.videos.push(video);
    return acc;
  }, [] as { date: string, videos: Video[] }[]);

  if (upcoming.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <CalendarIcon size={48} className="text-white/10 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Aucun événement prévu</h2>
        <p className="text-white/40 text-sm">Revenez plus tard pour découvrir les prochains directs.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-6">
      <h1 className="text-3xl font-black text-white uppercase italic mb-8">Calendrier des Directs</h1>
      
      <div className="space-y-10">
        {groupedByDate.map((group) => (
          <div key={group.date}>
            <h2 className="text-red-600 font-black text-xs uppercase tracking-[0.2em] mb-4 border-b border-red-600/20 pb-2">
              {group.date}
            </h2>
            <div className="grid gap-4">
              {group.videos.map((video) => (
                <div 
                  key={video.id}
                  onClick={() => onVideoSelect(video)}
                  className="flex gap-4 bg-zinc-900/50 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-all cursor-pointer group"
                >
                  <div className="relative w-32 aspect-video rounded overflow-hidden flex-none">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-blue-400 text-[10px] font-bold uppercase mb-1">
                      <Clock size={10} />
                      {new Date(video.scheduledStartTime || video.publishedAt || "").toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <h3 className="text-white font-bold text-sm line-clamp-2 leading-tight mb-1">{video.title}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      {video.channelAvatar && (
                        <img
                          src={video.channelAvatar}
                          alt={video.channelName}
                          className="w-4 h-4 rounded-full object-cover flex-none"
                          referrerPolicy="no-referrer"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      )}
                      <p className="text-white/40 text-[10px] uppercase tracking-wider truncate">{video.channelName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
