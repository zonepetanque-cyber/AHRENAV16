import React, { useState, useMemo } from 'react';
import { Video } from '../services/youtubeService';
import { NATIONAUX_2026, National } from '../data/nationaux2026';
import { CONCOURS_ALLIER_2026, ConcourAllier, DEPT_ALLIER } from '../data/allier2026';
import { CONCOURS_NIEVRE_2026, ConcourNievre, DEPT_NIEVRE } from '../data/nievre2026';
import { CONCOURS_AIN_2026, ConcourAin, DEPT_AIN } from '../data/ain2026';
import { CONCOURS_AISNE_2026, DEPT_AISNE } from '../data/aisne2026';
import { CONCOURS_AHP_2026, DEPT_AHP } from '../data/ahp2026';
import { CONCOURS_REGIONAUX_2026 } from '../data/regionaux2026';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, List, MapPin, Users, Trophy } from 'lucide-react';

// ── Helpers ───────────────────────────────────────────────────
const isoDate = (d: Date) => d.toISOString().split('T')[0];
const today = () => new Date();

const formatShort = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

const formatTime = (d: string) =>
  new Date(d).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAYS_FR   = ['L','M','M','J','V','S','D'];

// ── Liens département par source ─────────────────────────────
const DEPT_LINKS: Record<string, { facebook: string; site: string; code: string } | null> = {
  live:     null,
  national: null,
  allier:   { facebook: DEPT_ALLIER.facebook, site: DEPT_ALLIER.site, code: '03' },
  nievre:   { facebook: DEPT_NIEVRE.facebook, site: DEPT_NIEVRE.site, code: '58' },
  ain:      { facebook: DEPT_AIN.facebook,    site: DEPT_AIN.site,    code: '01' },
  aisne:    { facebook: DEPT_AISNE.facebook,  site: DEPT_AISNE.site,  code: '02' },
  ahp:      { facebook: DEPT_AHP.facebook,    site: DEPT_AHP.site,    code: '04' },
  regional: null,
};

// ── Types unifiés ─────────────────────────────────────────────
type EventSource = 'live' | 'national' | 'allier' | 'nievre' | 'ain' | 'aisne' | 'ahp' | 'regional';

interface UnifiedEvent {
  id: string;
  date: string;
  dateFin?: string;
  title: string;
  subtitle?: string;
  lieu?: string;
  info?: string;
  source: EventSource;
  format?: string;
  categorie?: string;
  video?: Video;
  raw: any;
}

// Couleurs par source
const SOURCE_COLOR: Record<EventSource, string> = {
  live:     '#dc2626',
  national: '#3b82f6',
  allier:   '#10b981',
  nievre:   '#f97316',
  ain:      '#8b5cf6',
  aisne:    '#06b6d4',
  ahp:      '#84cc16',
  regional: '#f59e0b',
};
const SOURCE_LABEL: Record<EventSource, string> = {
  live:     'Direct',
  national: 'National',
  allier:   'Allier (03)',
  nievre:   'Nièvre (58)',
  ain:      'Ain (01)',
  aisne:    'Aisne (02)',
  ahp:      'AHP (04)',
  regional: 'Régionaux',
};

// Icônes format
const FORMAT_ICON: Record<string, string> = {
  'TRIPLETTE': '3️⃣',
  'DOUBLETTE': '2️⃣',
  'TÊTE À TÊTE': '1️⃣',
  'INDIVIDUEL': '1️⃣',
  'ENDURO': '⚡',
  'AUTRE': '🎯',
};

// ── Filtre source ─────────────────────────────────────────────
const FILTERS: { key: EventSource | 'all'; label: string; color: string }[] = [
  { key: 'all',     label: 'Tout',     color: '#ffffff' },
  { key: 'live',    label: 'Directs',  color: '#dc2626' },
  { key: 'national',label: 'Nationaux',color: '#3b82f6' },
  { key: 'allier',  label: 'Allier',   color: '#10b981' },
  { key: 'nievre',  label: 'Nièvre',   color: '#f97316' },
  { key: 'ain',     label: 'Ain',      color: '#8b5cf6' },
  { key: 'aisne',   label: 'Aisne',    color: '#06b6d4' },
  { key: 'ahp',     label: 'AHP',      color: '#84cc16' },
  { key: 'regional',label: 'Régionaux',color: '#f59e0b' },
];

// ── Build unified events ──────────────────────────────────────
function buildEvents(videos: Video[]): UnifiedEvent[] {
  const events: UnifiedEvent[] = [];

  // Lives YouTube
  videos.filter(v => v.isUpcoming || v.isLive).forEach(v => {
    events.push({
      id: `live-${v.id}`,
      date: isoDate(new Date(v.scheduledStartTime || v.publishedAt || '')),
      title: v.title,
      subtitle: v.channelName,
      source: 'live',
      video: v,
      raw: v,
    });
  });

  // Nationaux FFPJP
  NATIONAUX_2026.forEach(n => {
    events.push({
      id: `nat-${n.id}`,
      date: n.dateDebut,
      dateFin: n.dateFin,
      title: `${n.categorie} — ${n.format}`,
      subtitle: n.ville + ` (${n.departement})`,
      lieu: n.organisateur,
      info: `${n.limite} équipes · ${n.frais}€`,
      source: 'national',
      format: n.format,
      categorie: n.categorie,
      raw: n,
    });
  });

  // Allier
  CONCOURS_ALLIER_2026.forEach(c => {
    events.push({
      id: `al-${c.id}`,
      date: c.date,
      dateFin: c.dateFin,
      title: c.categorie,
      subtitle: c.ville,
      lieu: c.lieu,
      info: c.info,
      source: 'allier',
      format: c.format,
      raw: c,
    });
  });

  // Régionaux
  CONCOURS_REGIONAUX_2026.forEach(c => {
    events.push({
      id: `reg-${c.id}`,
      date: c.date,
      dateFin: c.dateFin,
      title: c.categorie,
      subtitle: c.ville,
      info: c.info,
      source: 'regional',
      format: c.format,
      raw: c,
    });
  });

  // AHP
  CONCOURS_AHP_2026.forEach(c => {
    events.push({
      id: `ahp-${c.id}`,
      date: c.date,
      dateFin: c.dateFin,
      title: c.categorie,
      subtitle: c.ville,
      info: c.info,
      source: 'ahp',
      format: c.format,
      raw: c,
    });
  });

  // Aisne
  CONCOURS_AISNE_2026.forEach(c => {
    events.push({
      id: `aisne-${c.id}`,
      date: c.date,
      dateFin: c.dateFin,
      title: c.categorie,
      subtitle: c.ville,
      info: c.info,
      source: 'aisne',
      format: c.format,
      raw: c,
    });
  });

  // Ain
  CONCOURS_AIN_2026.forEach(c => {
    events.push({
      id: `ain-${c.id}`,
      date: c.date,
      dateFin: c.dateFin,
      title: c.categorie,
      subtitle: c.ville,
      lieu: c.lieu,
      info: c.info,
      source: 'ain',
      format: c.format,
      raw: c,
    });
  });

  // Nièvre
  CONCOURS_NIEVRE_2026.forEach(c => {
    events.push({
      id: `ni-${c.id}`,
      date: c.date,
      dateFin: c.dateFin,
      title: c.categorie,
      subtitle: c.ville,
      lieu: c.lieu,
      info: c.info,
      source: 'nievre',
      format: c.format,
      raw: c,
    });
  });

  return events;
}

// ── Carte événement (list) ────────────────────────────────────
const EventCard = ({ ev, onVideoSelect }: { ev: UnifiedEvent; onVideoSelect: (v: Video) => void }) => {
  const color = SOURCE_COLOR[ev.source];
  const icon  = ev.format ? (FORMAT_ICON[ev.format] || '🎯') : '📺';

  return (
    <div
      className="flex gap-3 bg-zinc-900/60 rounded-xl p-3 border border-white/5 active:scale-[0.98] transition-transform cursor-pointer"
      style={{ borderLeft: `3px solid ${color}` }}
      onClick={() => ev.video && onVideoSelect(ev.video)}
    >
      {/* Icône format */}
      <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-lg"
        style={{ background: color + '22' }}>
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
          <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ background: color + '22', color }}>
            {SOURCE_LABEL[ev.source]}
          </span>
          {ev.format && (
            <span className="text-[9px] text-white/30 uppercase">{ev.format}</span>
          )}
        </div>

        <p className="text-white font-bold text-[13px] leading-snug mb-0.5 truncate">{ev.title}</p>

        {ev.subtitle && (
          <p className="text-white/50 text-[11px] flex items-center gap-1 truncate">
            <MapPin size={9} className="flex-shrink-0" />{ev.subtitle}
          </p>
        )}
        {ev.lieu && (
          <p className="text-white/30 text-[10px] truncate">{ev.lieu}</p>
        )}
        {ev.info && (
          <p className="text-white/25 text-[9px] italic truncate">{ev.info}</p>
        )}

        <div className="flex items-center gap-1 mt-1 text-[9px] text-white/40">
          <Clock size={9} />
          <span>
            {ev.source === 'live'
              ? formatTime(ev.raw.scheduledStartTime || ev.raw.publishedAt || '')
              : formatShort(ev.date)
            }
            {ev.dateFin && ev.dateFin !== ev.date ? ` › ${formatShort(ev.dateFin)}` : ''}
          </span>
        </div>
      </div>

      {ev.video && (
        <div className="flex-shrink-0 self-center">
          <div className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: color }}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="white"><polygon points="2,1 7,4 2,7"/></svg>
          </div>
        </div>
      )}
      {DEPT_LINKS[ev.source] && (
        <div className="col-span-full mt-2 pt-2 border-t border-amber-500/15 flex items-center gap-2 flex-wrap w-full">
          <span className="text-amber-400/70 text-[9px] font-bold uppercase tracking-wider">⚠️ Vérifier annulation</span>
          <div className="flex gap-1.5 ml-auto">
            <a href={DEPT_LINKS[ev.source]!.facebook} target="_blank" rel="noopener noreferrer"
              className="bg-blue-600/15 hover:bg-blue-600/30 text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded border border-blue-600/25 transition-colors"
              onClick={e => e.stopPropagation()}>
              📘 Facebook CD{DEPT_LINKS[ev.source]!.code}
            </a>
            <a href={DEPT_LINKS[ev.source]!.site} target="_blank" rel="noopener noreferrer"
              className="bg-emerald-600/15 hover:bg-emerald-600/30 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-600/25 transition-colors"
              onClick={e => e.stopPropagation()}>
              🌐 Site officiel
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Vue LISTE ─────────────────────────────────────────────────
const ListView = ({ events, onVideoSelect }: { events: UnifiedEvent[]; onVideoSelect: (v: Video) => void }) => {
  const grouped = useMemo(() => {
    const map = new Map<string, UnifiedEvent[]>();
    [...events]
      .sort((a, b) => a.date.localeCompare(b.date))
      .forEach(ev => {
        if (!map.has(ev.date)) map.set(ev.date, []);
        map.get(ev.date)!.push(ev);
      });
    return Array.from(map.entries());
  }, [events]);

  if (grouped.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CalendarIcon size={40} className="text-white/10 mb-3" />
        <p className="text-white/40 text-sm">Aucun événement pour cette sélection</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 pb-6">
      {grouped.map(([date, evs]) => {
        const d = new Date(date);
        const isToday = isoDate(today()) === date;
        return (
          <div key={date}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex flex-col items-center justify-center text-center
                ${isToday ? 'bg-red-600' : 'bg-zinc-800'}`}>
                <span className="text-[9px] font-bold text-white/60 uppercase leading-none">
                  {MONTHS_FR[d.getMonth()].slice(0,3)}
                </span>
                <span className="text-base font-black text-white leading-none">{d.getDate()}</span>
              </div>
              <div>
                <p className={`font-black text-xs uppercase tracking-wider ${isToday ? 'text-red-500' : 'text-white/50'}`}>
                  {isToday ? "Aujourd'hui" : d.toLocaleDateString('fr-FR', { weekday: 'long' })}
                </p>
                <p className="text-white/25 text-[10px]">{evs.length} événement{evs.length > 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="space-y-2">
              {evs.map(ev => <EventCard key={ev.id} ev={ev} onVideoSelect={onVideoSelect} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Vue MENSUELLE ─────────────────────────────────────────────
const MonthView = ({ events, onVideoSelect }: { events: UnifiedEvent[]; onVideoSelect: (v: Video) => void }) => {
  const [year, setYear]   = useState(today().getFullYear());
  const [month, setMonth] = useState(today().getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); setSelected(null); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); setSelected(null); };

  // Jours du mois
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7; // Lundi = 0
  const totalDays = lastDay.getDate();

  // Index événements par date
  const evByDate = useMemo(() => {
    const map = new Map<string, UnifiedEvent[]>();
    events.forEach(ev => {
      // Pour les événements multi-jours, on les met sur chaque jour
      const start = new Date(ev.date);
      const end   = ev.dateFin ? new Date(ev.dateFin) : start;
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const k = isoDate(new Date(d));
        if (!map.has(k)) map.set(k, []);
        // Éviter les doublons
        if (!map.get(k)!.find(e => e.id === ev.id)) {
          map.get(k)!.push(ev);
        }
      }
    });
    return map;
  }, [events]);

  const todayStr = isoDate(today());

  const selectedEvents = selected ? (evByDate.get(selected) || []) : [];

  return (
    <div className="px-4 pb-6">
      {/* Header mois */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth}
          className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-zinc-700 transition-colors">
          <ChevronLeft size={16} />
        </button>
        <h2 className="text-white font-black text-lg uppercase tracking-wide">
          {MONTHS_FR[month]} {year}
        </h2>
        <button onClick={nextMonth}
          className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-zinc-700 transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_FR.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-black text-white/30 uppercase py-1">{d}</div>
        ))}
      </div>

      {/* Grille jours */}
      <div className="grid grid-cols-7 gap-y-1">
        {/* Cases vides avant le 1er */}
        {Array.from({ length: startDow }).map((_, i) => (
          <div key={`e-${i}`} />
        ))}

        {/* Jours du mois */}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day  = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
          const dayEvs  = evByDate.get(dateStr) || [];
          const isToday = dateStr === todayStr;
          const isSel   = dateStr === selected;
          const hasPast = dayEvs.length > 0 && new Date(dateStr) < today() && !isToday;

          // Couleurs des points (max 3)
          const dots = [...new Set(dayEvs.map(e => SOURCE_COLOR[e.source]))].slice(0, 3);

          return (
            <div
              key={dateStr}
              onClick={() => setSelected(isSel ? null : (dayEvs.length > 0 ? dateStr : null))}
              className={`relative flex flex-col items-center py-1 rounded-lg transition-all cursor-pointer
                ${isSel ? 'bg-red-600/30 ring-1 ring-red-500' : dayEvs.length > 0 ? 'hover:bg-white/5' : ''}
                ${isToday ? 'ring-1 ring-white/40' : ''}
                ${hasPast ? 'opacity-40' : ''}
              `}
            >
              <span className={`text-[12px] font-bold leading-none mb-0.5
                ${isToday ? 'text-red-400' : isSel ? 'text-white' : dayEvs.length > 0 ? 'text-white' : 'text-white/30'}`}>
                {day}
              </span>
              {/* Points colorés */}
              <div className="flex gap-0.5 h-1.5">
                {dots.map((color, di) => (
                  <div key={di} className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Panneau événements du jour sélectionné */}
      {selected && selectedEvents.length > 0 && (
        <div className="mt-4">
          <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3">
            {new Date(selected).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            {' · '}{selectedEvents.length} événement{selectedEvents.length > 1 ? 's' : ''}
          </p>
          <div className="space-y-2">
            {selectedEvents.map(ev => <EventCard key={ev.id} ev={ev} onVideoSelect={onVideoSelect} />)}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Composant principal ───────────────────────────────────────
const CalendarComponent = ({ videos, onVideoSelect }: { videos: Video[]; onVideoSelect: (v: Video) => void }) => {
  const [view, setView]     = useState<'month' | 'list'>('month');
  const [filter, setFilter] = useState<EventSource | 'all'>('all');

  const allEvents = useMemo(() => buildEvents(videos), [videos]);

  const filteredEvents = useMemo(() =>
    filter === 'all' ? allEvents : allEvents.filter(e => e.source === filter),
    [allEvents, filter]
  );

  return (
    <div className="pt-20 pb-4 min-h-screen">
      {/* Header */}
      <div className="px-4 mb-4">
        <h1 className="text-2xl font-black text-white uppercase italic mb-1">Calendrier</h1>
        <p className="text-white/30 text-xs">{filteredEvents.length} événements · {new Date().getFullYear()}</p>
      </div>

      {/* Barre controls */}
      <div className="px-4 mb-4 space-y-3">
        {/* Toggle vue */}
        <div className="flex gap-2 bg-zinc-900 p-1 rounded-xl w-fit">
          <button
            onClick={() => setView('month')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wide transition-all
              ${view === 'month' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
          >
            <CalendarIcon size={12} /> Mensuel
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wide transition-all
              ${view === 'list' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
          >
            <List size={12} /> Agenda
          </button>
        </div>

        {/* Filtres source */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as any)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wide transition-all border
                ${filter === f.key
                  ? 'text-black border-transparent'
                  : 'bg-transparent text-white/40 border-white/10 hover:text-white hover:border-white/30'
                }`}
              style={filter === f.key ? { background: f.color } : {}}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Légende formats */}
      <div className="px-4 mb-4 flex gap-3 overflow-x-auto no-scrollbar">
        {Object.entries(FORMAT_ICON).slice(0, 5).map(([fmt, icon]) => (
          <div key={fmt} className="flex-shrink-0 flex items-center gap-1 text-[9px] text-white/30">
            <span>{icon}</span><span className="uppercase">{fmt}</span>
          </div>
        ))}
      </div>

      {/* Vues */}
      {view === 'month'
        ? <MonthView events={filteredEvents} onVideoSelect={onVideoSelect} />
        : <ListView  events={filteredEvents} onVideoSelect={onVideoSelect} />
      }
    </div>
  );
};

export default CalendarComponent;
