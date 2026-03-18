import React, { useState, useEffect } from 'react';
import { Video } from '../services/youtubeService';
import { Radio, Clock, Calendar, Play, Bell, ChevronRight, Tv, Filter } from 'lucide-react';

interface ProgrammeComponentProps {
  videos: Video[];
  onVideoSelect: (v: Video) => void;
}

const CHANNEL_COLORS: Record<string, string> = {
  'Boulistenaute':     'bg-red-600',
  'Sportmag':          'bg-blue-600',
  'Sportmediamat':     'bg-emerald-600',
  'Pétanque Academy':  'bg-purple-600',
  'Groupe Pétanque':   'bg-amber-600',
  'Pétanque TV Europe':'bg-cyan-600',
  'PPF':               'bg-pink-600',
  'FFPJP':             'bg-orange-600',
};

const getChannelColor = (name: string) =>
  CHANNEL_COLORS[name] ?? 'bg-zinc-600';

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const formatDateShort = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

const isToday = (iso: string) => {
  const d = new Date(iso);
  const n = new Date();
  return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
};

const isTomorrow = (iso: string) => {
  const d = new Date(iso);
  const n = new Date();
  n.setDate(n.getDate() + 1);
  return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
};

const isThisWeek = (iso: string) => {
  const d = new Date(iso);
  const n = new Date();
  const diff = (d.getTime() - n.getTime()) / 86400000;
  return diff >= 0 && diff <= 7;
};

// Grouper les vidéos par jour
function groupByDay(videos: Video[]): Record<string, Video[]> {
  const groups: Record<string, Video[]> = {};
  videos.forEach(v => {
    const date = v.scheduledStartTime || v.publishedAt || '';
    if (!date) return;
    const key = new Date(date).toISOString().split('T')[0];
    if (!groups[key]) groups[key] = [];
    groups[key].push(v);
  });
  return groups;
}

const ProgrammeComponent = ({ videos, onVideoSelect }: ProgrammeComponentProps) => {
  const [filter, setFilter] = useState<'tous' | 'cette-semaine'>('tous');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // Filtrer les lives en cours et à venir
  const liveNow = videos.filter(v => v.isLive);
  const upcoming = videos
    .filter(v => v.isUpcoming && v.scheduledStartTime)
    .filter(v => filter === 'tous' || isThisWeek(v.scheduledStartTime!))
    .sort((a, b) =>
      new Date(a.scheduledStartTime!).getTime() - new Date(b.scheduledStartTime!).getTime()
    );

  const [headerH, setHeaderH] = useState(128);
  useEffect(() => {
    const measure = () => {
      const h = document.querySelector('header');
      if (h) setHeaderH(h.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const grouped = groupByDay(upcoming);
  const sortedDays = Object.keys(grouped).sort();

  return (
    <div style={{ paddingTop: `${headerH}px` }} className="min-h-screen bg-black text-white pb-28">

      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center">
              <Tv size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-black text-white text-xl uppercase italic leading-none">Programme</h1>
              <p className="text-white/30 text-[10px] uppercase tracking-widest mt-0.5">Guide TV Web Pétanque</p>
            </div>
          </div>
          {/* Filtre rapide */}
          <div className="flex bg-zinc-900 rounded-xl p-1 gap-1">
            <button
              onClick={() => setFilter('tous')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${filter === 'tous' ? 'bg-red-600 text-white' : 'text-white/40 hover:text-white/70'}`}
            >Tout</button>
            <button
              onClick={() => setFilter('cette-semaine')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${filter === 'cette-semaine' ? 'bg-red-600 text-white' : 'text-white/40 hover:text-white/70'}`}
            >7 jours</button>
          </div>
        </div>
      </div>

      {/* Compteur */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-4 text-[11px] text-white/30">
          {liveNow.length > 0 && (
            <span className="flex items-center gap-1.5 text-red-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>
              {liveNow.length} en direct
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar size={11}/>
            {upcoming.length} à venir
          </span>
        </div>
      </div>

      {/* ── SECTION EN DIRECT ── */}
      {liveNow.length > 0 && (
        <div className="px-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400">En Direct Maintenant</span>
          </div>
          <div className="space-y-3">
            {liveNow.map(v => (
              <button
                key={v.id}
                onClick={() => onVideoSelect(v)}
                className="w-full flex items-center gap-4 bg-red-600/10 border border-red-600/30 rounded-2xl p-3 hover:bg-red-600/20 transition-all group text-left"
              >
                <div className="relative flex-shrink-0 w-28 aspect-video rounded-xl overflow-hidden">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" referrerPolicy="no-referrer"/>
                  <div className="absolute inset-0 bg-red-600/40 flex items-center justify-center">
                    <Radio size={20} className="text-white animate-pulse"/>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full text-white ${getChannelColor(v.channelName)}`}>
                      {v.channelName}
                    </span>
                    <span className="text-[9px] font-black text-red-400 uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block"/>LIVE
                    </span>
                  </div>
                  <p className="text-white font-bold text-[13px] leading-snug line-clamp-2">{v.title}</p>
                </div>
                <ChevronRight size={18} className="text-white/30 group-hover:text-white/70 flex-shrink-0 transition-colors"/>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── PROGRAMME PAR JOUR ── */}
      {sortedDays.length === 0 ? (
        <div className="px-5 py-16 flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center">
            <Tv size={28} className="text-white/20"/>
          </div>
          <p className="text-white/30 text-sm font-bold uppercase tracking-wider">Aucun programme annoncé</p>
          <p className="text-white/20 text-xs">Les prochains lives apparaîtront ici dès leur annonce sur YouTube</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedDays.map(day => {
            const dayVideos = grouped[day].sort((a, b) =>
              new Date(a.scheduledStartTime!).getTime() - new Date(b.scheduledStartTime!).getTime()
            );
            const date = new Date(day);
            const todayFlag = isToday(day + 'T12:00:00');
            const tomorrowFlag = isTomorrow(day + 'T12:00:00');


            return (
              <div key={day}>
                {/* Bandeau jour */}
                <div className={`mx-5 mb-3 px-4 py-2.5 rounded-xl flex items-center justify-between ${todayFlag ? 'bg-red-600' : tomorrowFlag ? 'bg-zinc-700' : 'bg-zinc-900'}`}>
                  <div className="flex items-center gap-2">
                    {todayFlag && <span className="w-2 h-2 rounded-full bg-white animate-pulse"/>}
                    <span className="font-black text-white text-[13px] uppercase tracking-wide">
                      {todayFlag ? "Aujourd'hui" : tomorrowFlag ? 'Demain' : formatDate(day + 'T12:00:00')}
                    </span>
                  </div>
                  <span className="text-white/60 text-[11px] font-bold">
                    {todayFlag || tomorrowFlag ? formatDate(day + 'T12:00:00') : formatDateShort(day + 'T12:00:00')}
                  </span>
                </div>

                {/* Émissions du jour */}
                <div className="px-5 space-y-2">
                  {dayVideos.map(v => {
                    const time = v.scheduledStartTime ? formatTime(v.scheduledStartTime) : '';
                    const isPast = v.scheduledStartTime ? new Date(v.scheduledStartTime) < now : false;

                    return (
                      <button
                        key={v.id}
                        onClick={() => onVideoSelect(v)}
                        className={`w-full flex items-center gap-3 rounded-2xl p-3 transition-all group text-left ${isPast ? 'opacity-40' : 'hover:bg-white/5'} border border-white/5 hover:border-white/15`}
                      >
                        {/* Heure */}
                        <div className="flex-shrink-0 w-14 text-center">
                          <p className={`font-black text-lg leading-none ${todayFlag && !isPast ? 'text-red-400' : 'text-white/70'}`}>{time}</p>
                          <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-1.5 ${todayFlag && !isPast ? 'bg-red-500' : 'bg-white/20'}`}/>
                        </div>

                        {/* Séparateur vertical */}
                        <div className={`flex-shrink-0 w-px self-stretch ${todayFlag && !isPast ? 'bg-red-600/40' : 'bg-white/10'}`}/>

                        {/* Thumbnail */}
                        <div className="flex-shrink-0 w-24 aspect-video rounded-lg overflow-hidden bg-zinc-900">
                          <img
                            src={v.thumbnail}
                            alt={v.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Infos */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full text-white ${getChannelColor(v.channelName)}`}>
                              {v.channelName}
                            </span>
                          </div>
                          <p className="text-white font-bold text-[12px] leading-snug line-clamp-2">{v.title}</p>
                        </div>

                        {/* Icône action */}
                        <div className="flex-shrink-0">
                          {isPast ? (
                            <Play size={16} className="text-white/20"/>
                          ) : (
                            <Bell size={16} className="text-white/20 group-hover:text-amber-400 transition-colors"/>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer info */}
      <div className="px-5 pt-8 pb-4 text-center">
        <p className="text-white/20 text-[10px]">Les horaires sont donnés à titre indicatif · Heure locale</p>
      </div>
    </div>
  );
};

export default ProgrammeComponent;
