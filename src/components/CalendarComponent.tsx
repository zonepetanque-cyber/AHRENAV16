import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Video } from '../services/youtubeService';
import { NATIONAUX_2026, National } from '../data/nationaux2026';
import { CONCOURS_ALLIER_2026, ConcourAllier, DEPT_ALLIER } from '../data/allier2026';
import { CONCOURS_NIEVRE_2026, ConcourNievre, DEPT_NIEVRE } from '../data/nievre2026';
import { CONCOURS_AIN_2026, ConcourAin, DEPT_AIN } from '../data/ain2026';
import { CONCOURS_AISNE_2026, DEPT_AISNE } from '../data/aisne2026';
import { CONCOURS_AHP_2026, DEPT_AHP } from '../data/ahp2026';
import { CONCOURS_REGIONAUX_2026 } from '../data/regionaux2026';
import {
  Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight,
  List, MapPin, SlidersHorizontal, X, RotateCcw, Check, Radio
} from 'lucide-react';

// ── Helpers ───────────────────────────────────────────────────
const isoDate = (d: Date) => d.toISOString().split('T')[0];
const today = () => new Date();
const formatShort = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
const formatFull  = (d: string) => new Date(d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
const formatTime  = (d: string) => new Date(d).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
const isPast = (date: string, dateFin?: string) => new Date((dateFin || date) + 'T23:59:59') < today();
const isUpcoming = (date: string, dateFin?: string) => !isPast(date, dateFin);

const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAYS_FR   = ['L','M','M','J','V','S','D'];

// ── Source meta ───────────────────────────────────────────────
type EventSource = 'live' | 'national' | 'allier' | 'nievre' | 'ain' | 'aisne' | 'ahp' | 'regional';

const SOURCE_COLOR: Record<EventSource, string> = {
  live: '#dc2626', national: '#3b82f6', allier: '#10b981',
  nievre: '#f97316', ain: '#8b5cf6', aisne: '#06b6d4',
  ahp: '#84cc16', regional: '#f59e0b',
};
const SOURCE_LABEL: Record<EventSource, string> = {
  live: 'Direct', national: 'National', allier: 'Allier (03)',
  nievre: 'Nièvre (58)', ain: 'Ain (01)', aisne: 'Aisne (02)',
  ahp: 'AHP (04)', regional: 'Régionaux',
};
const DEPT_LINKS: Record<string, { facebook: string; site: string; code: string } | null> = {
  live: null, national: null, regional: null,
  allier: { facebook: DEPT_ALLIER.facebook, site: DEPT_ALLIER.site, code: '03' },
  nievre: { facebook: DEPT_NIEVRE.facebook, site: DEPT_NIEVRE.site, code: '58' },
  ain:    { facebook: DEPT_AIN.facebook,    site: DEPT_AIN.site,    code: '01' },
  aisne:  { facebook: DEPT_AISNE.facebook,  site: DEPT_AISNE.site,  code: '02' },
  ahp:    { facebook: DEPT_AHP.facebook,    site: DEPT_AHP.site,    code: '04' },
};

// ── Type unifié ───────────────────────────────────────────────
interface UnifiedEvent {
  id: string;
  date: string;
  dateFin?: string;
  heure?: string;
  title: string;
  ville?: string;
  lieu?: string;
  club?: string;
  info?: string;
  source: EventSource;
  format?: string;
  categorie?: string;
  typeEvent?: string;
  video?: Video;
  raw: any;
}

// ── Filtres avancés ───────────────────────────────────────────
interface AdvancedFilters {
  officiel: boolean;
  ouvert: boolean;
  formations: Set<string>;
  joueurs: Set<string>;
  categories: Set<string>;
  sources: Set<string>;
}

const FORMATIONS = ['Tête-à-Tête', 'Doublette', 'Triplette', 'Doublette mixte', 'Triplette mixte', 'En équipe (CDC, CRC, CNC)'];
const JOUEURS    = ['Jeune', 'Sénior', 'Vétéran', 'Masculin', 'Féminin', 'Promotion', 'Jeu Provençal'];
const CAT_TYPES  = ['Départemental', 'Régional', 'National', 'Championnat', 'Autres (mondial, coupes, tir…)'];
const SOURCES_LIST: { key: EventSource; label: string }[] = [
  { key: 'live',     label: 'Directs YouTube' },
  { key: 'national', label: 'Nationaux FFPJP' },
  { key: 'regional', label: 'Régionaux' },
  { key: 'allier',   label: 'Allier (03)' },
  { key: 'nievre',   label: 'Nièvre (58)' },
  { key: 'ain',      label: 'Ain (01)' },
  { key: 'aisne',    label: 'Aisne (02)' },
  { key: 'ahp',      label: 'AHP (04)' },
];

const makeDefaultFilters = (): AdvancedFilters => ({
  officiel: true, ouvert: true,
  formations: new Set(), joueurs: new Set(), categories: new Set(), sources: new Set(['all']),
});

// ── Build events ──────────────────────────────────────────────
function buildEvents(videos: Video[]): UnifiedEvent[] {
  const events: UnifiedEvent[] = [];

  videos.filter(v => v.isUpcoming || v.isLive).forEach(v => {
    events.push({
      id: `live-${v.id}`,
      date: isoDate(new Date(v.scheduledStartTime || v.publishedAt || '')),
      heure: v.scheduledStartTime ? formatTime(v.scheduledStartTime) : undefined,
      title: v.title, ville: v.channelName,
      source: 'live', typeEvent: 'CONCOURS', video: v, raw: v,
    });
  });

  NATIONAUX_2026.forEach(n => events.push({
    id: `nat-${n.id}`, date: n.dateDebut, dateFin: n.dateFin,
    title: `${n.categorie} — ${n.format}`, ville: n.ville,
    lieu: n.organisateur, info: `${n.limite} équipes · ${n.frais}€`,
    source: 'national', format: n.format, categorie: n.categorie, typeEvent: 'NATIONAL', raw: n,
  }));

  const addDept = (arr: any[], src: EventSource) => arr.forEach(c => events.push({
    id: `${src}-${c.id}`, date: c.date, dateFin: c.dateFin,
    title: c.categorie, ville: c.ville, lieu: c.lieu, club: c.club, info: c.info,
    heure: c.heure,
    source: src, format: c.format, categorie: c.categorie, typeEvent: c.type, raw: c,
  }));

  addDept(CONCOURS_ALLIER_2026 as any[], 'allier');
  addDept(CONCOURS_NIEVRE_2026 as any[], 'nievre');
  addDept(CONCOURS_AIN_2026    as any[], 'ain');
  addDept(CONCOURS_AISNE_2026  as any[], 'aisne');
  addDept(CONCOURS_AHP_2026    as any[], 'ahp');

  CONCOURS_REGIONAUX_2026.forEach(c => events.push({
    id: `reg-${c.id}`, date: c.date, dateFin: (c as any).dateFin,
    title: c.categorie, ville: (c as any).ville, info: (c as any).info,
    source: 'regional', format: (c as any).format, categorie: c.categorie, typeEvent: 'RÉGIONAL', raw: c,
  }));

  // Ne retourner que les événements à venir (aujourd'hui inclus)
  return events.filter(ev => isUpcoming(ev.date, ev.dateFin));
}

// ── Appliquer filtres ─────────────────────────────────────────
function applyFilters(events: UnifiedEvent[], f: AdvancedFilters): UnifiedEvent[] {
  return events.filter(ev => {
    if (!f.sources.has('all') && !f.sources.has(ev.source)) return false;

    if (f.formations.size > 0) {
      const c = ((ev.format || '') + ' ' + (ev.categorie || '')).toLowerCase();
      const ok =
        (f.formations.has('Tête-à-Tête') && (c.includes('tête') || c.includes('individuel'))) ||
        (f.formations.has('Doublette') && c.includes('doublette') && !c.includes('mixte')) ||
        (f.formations.has('Triplette') && c.includes('triplette') && !c.includes('mixte')) ||
        (f.formations.has('Doublette mixte') && c.includes('doublette') && c.includes('mixte')) ||
        (f.formations.has('Triplette mixte') && c.includes('triplette') && c.includes('mixte')) ||
        (f.formations.has('En équipe (CDC, CRC, CNC)') && (c.includes('cdc')||c.includes('crc')||c.includes('cnc')||c.includes('équipe')));
      if (!ok) return false;
    }

    if (f.joueurs.size > 0) {
      const c = (ev.categorie || '').toLowerCase();
      const ok =
        (f.joueurs.has('Jeune') && c.includes('jeune')) ||
        (f.joueurs.has('Sénior') && (c.includes('sénior')||c.includes('senior'))) ||
        (f.joueurs.has('Vétéran') && (c.includes('vétéran')||c.includes('veteran'))) ||
        (f.joueurs.has('Masculin') && (c.includes('masculin')||c.includes('homme'))) ||
        (f.joueurs.has('Féminin') && (c.includes('féminin')||c.includes('feminin')||c.includes('fem'))) ||
        (f.joueurs.has('Promotion') && c.includes('promo')) ||
        (f.joueurs.has('Jeu Provençal') && (c.includes('provençal')||c.includes('provencal')));
      if (!ok) return false;
    }

    if (f.categories.size > 0) {
      const t = (ev.typeEvent || '').toLowerCase();
      const ok =
        (f.categories.has('Départemental') && t === 'concours') ||
        (f.categories.has('Régional') && t === 'régional') ||
        (f.categories.has('National') && t === 'national') ||
        (f.categories.has('Championnat') && t === 'championnat') ||
        (f.categories.has('Autres (mondial, coupes, tir…)') && t === 'spécial');
      if (!ok) return false;
    }

    return true;
  });
}

// ── Checkbox ──────────────────────────────────────────────────
const Checkbox = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
  <button onClick={onChange} className="flex items-center gap-2.5 py-1.5 text-left group w-full">
    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-all
      ${checked ? 'bg-red-600 border-red-600' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
      {checked && <Check size={12} className="text-white" strokeWidth={3}/>}
    </div>
    <span className={`text-[12px] uppercase tracking-wide transition-colors ${checked ? 'text-white font-bold' : 'text-white/50 group-hover:text-white/80'}`}>{label}</span>
  </button>
);

// ── EventCard ─────────────────────────────────────────────────
const FORMAT_ICON: Record<string, string> = {
  'TRIPLETTE': '3️⃣', 'DOUBLETTE': '2️⃣', 'TÊTE À TÊTE': '1️⃣',
  'INDIVIDUEL': '1️⃣', 'ENDURO': '⚡', 'AUTRE': '🎯',
};

const EventCard = ({ ev, onVideoSelect }: { ev: UnifiedEvent; onVideoSelect: (v: Video) => void }) => {
  const color = SOURCE_COLOR[ev.source];
  const past  = isPast(ev.date, ev.dateFin);
  const icon  = ev.format ? (FORMAT_ICON[ev.format] || '🎯') : (ev.source === 'live' ? '📺' : '🎯');

  return (
    <div
      className={`rounded-xl border border-white/5 overflow-hidden transition-all
        hover:border-white/15
        ${ev.video ? 'cursor-pointer active:scale-[0.98]' : ''}`}
      style={{ borderLeft: `3px solid ${color}` }}
      onClick={() => ev.video && onVideoSelect(ev.video)}
    >
      <div className="flex gap-3 p-3">
        {/* Icône */}
        <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-base"
          style={{ background: color + '20' }}>
          {ev.source === 'live' && ev.video?.isLive
            ? <Radio size={16} className="animate-pulse" style={{ color }}/>
            : <span>{icon}</span>}
        </div>

        <div className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{ background: color + '22', color }}>
              {SOURCE_LABEL[ev.source]}
            </span>
            {ev.typeEvent && ev.typeEvent !== 'CONCOURS' && (
              <span className="text-[9px] text-white/30 uppercase font-bold">{ev.typeEvent}</span>
            )}
            {ev.format && <span className="text-[9px] text-white/20 uppercase">{ev.format}</span>}
          </div>

          {/* Titre */}
          <p className="text-white font-bold text-[13px] leading-snug mb-1.5">{ev.title}</p>

          {/* Ville */}
          {ev.ville && (
            <div className="flex items-center gap-1 text-white/60 text-[11px] mb-0.5">
              <MapPin size={9} className="flex-shrink-0 text-white/30"/>
              <span className="font-semibold">{ev.ville}</span>
              {ev.lieu && <span className="text-white/30">· {ev.lieu}</span>}
            </div>
          )}

          {/* Club */}
          {ev.club && ev.club !== ev.ville && (
            <p className="text-white/30 text-[10px] mb-0.5 truncate">🏟 {ev.club}</p>
          )}

          {/* Info */}
          {ev.info && <p className="text-white/25 text-[10px] italic mb-1">{ev.info}</p>}

          {/* Date + heure */}
          <div className="flex items-center gap-3 mt-1.5 text-[10px] text-white/40">
            <div className="flex items-center gap-1">
              <CalendarIcon size={9}/>
              <span>
                {formatShort(ev.date)}
                {ev.dateFin && ev.dateFin !== ev.date ? ` → ${formatShort(ev.dateFin)}` : ''}
              </span>
            </div>
            {ev.heure && (
              <div className="flex items-center gap-1">
                <Clock size={9}/>
                <span>{ev.heure}</span>
              </div>
            )}
          </div>
        </div>

        {ev.video && (
          <div className="flex-shrink-0 self-center">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: color }}>
              <svg width="9" height="9" viewBox="0 0 8 8" fill="white"><polygon points="2,1 7,4 2,7"/></svg>
            </div>
          </div>
        )}
      </div>

      {/* Liens vérif */}
      {DEPT_LINKS[ev.source] && !past && (
        <div className="px-3 pb-2.5 flex items-center gap-2 flex-wrap border-t border-white/5">
          <span className="text-amber-400/60 text-[9px] font-bold">⚠️ Vérifier annulation</span>
          <div className="flex gap-1.5 ml-auto">
            <a href={DEPT_LINKS[ev.source]!.facebook} target="_blank" rel="noopener noreferrer"
              className="bg-blue-600/15 text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded border border-blue-600/20"
              onClick={e => e.stopPropagation()}>📘 FB CD{DEPT_LINKS[ev.source]!.code}</a>
            <a href={DEPT_LINKS[ev.source]!.site} target="_blank" rel="noopener noreferrer"
              className="bg-emerald-600/15 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-600/20"
              onClick={e => e.stopPropagation()}>🌐 Site</a>
          </div>
        </div>
      )}
    </div>
  );
};

// ── ListView ──────────────────────────────────────────────────
const ListView = ({ events, onVideoSelect }: { events: UnifiedEvent[]; onVideoSelect: (v: Video) => void }) => {
  const grouped = useMemo(() => {
    const map = new Map<string, UnifiedEvent[]>();
    [...events].sort((a, b) => a.date.localeCompare(b.date))
      .forEach(ev => { if (!map.has(ev.date)) map.set(ev.date, []); map.get(ev.date)!.push(ev); });
    return Array.from(map.entries());
  }, [events]);

  if (grouped.length === 0) return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-8">
      <CalendarIcon size={40} className="text-white/10 mb-3"/>
      <p className="text-white/40 text-sm font-bold">Aucun événement trouvé</p>
      <p className="text-white/20 text-xs mt-1">Modifie les filtres pour voir plus de résultats</p>
    </div>
  );

  return (
    <div className="space-y-6 px-4 pb-6">
      {grouped.map(([date, evs]) => {
        const d = new Date(date);
        const isToday = isoDate(today()) === date;
        const past = isPast(date);
        return (
          <div key={date}>
            <div className="flex items-center gap-3 mb-2.5">
              <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex flex-col items-center justify-center
                ${isToday ? 'bg-red-600' : 'bg-zinc-800'}`}>
                <span className="text-[9px] font-bold text-white/60 uppercase leading-none">{MONTHS_FR[d.getMonth()].slice(0,3)}</span>
                <span className="text-base font-black text-white leading-none">{d.getDate()}</span>
              </div>
              <div>
                <p className={`font-black text-xs uppercase tracking-wider ${isToday ? 'text-red-400' : 'text-white/60'}`}>
                  {isToday ? "Aujourd'hui" : d.toLocaleDateString('fr-FR', { weekday: 'long' })}
                </p>
                <p className="text-white/25 text-[10px]">{evs.length} événement{evs.length > 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="space-y-2">
              {evs.map(ev => <EventCard key={ev.id} ev={ev} onVideoSelect={onVideoSelect}/>)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── MonthView ─────────────────────────────────────────────────
const MonthView = ({ events, onVideoSelect }: { events: UnifiedEvent[]; onVideoSelect: (v: Video) => void }) => {
  const [year, setYear]   = useState(today().getFullYear());
  const [month, setMonth] = useState(today().getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  const prev = () => { if (month === 0) { setMonth(11); setYear(y=>y-1); } else setMonth(m=>m-1); setSelected(null); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y=>y+1); } else setMonth(m=>m+1); setSelected(null); };

  const totalDays = new Date(year, month+1, 0).getDate();
  const startDow  = (new Date(year, month, 1).getDay() + 6) % 7;

  const evByDate = useMemo(() => {
    const map = new Map<string, UnifiedEvent[]>();
    events.forEach(ev => {
      const start = new Date(ev.date);
      const end   = ev.dateFin ? new Date(ev.dateFin) : start;
      for (let d = new Date(start); d <= end; d.setDate(d.getDate()+1)) {
        const k = isoDate(new Date(d));
        if (!map.has(k)) map.set(k, []);
        if (!map.get(k)!.find(e => e.id === ev.id)) map.get(k)!.push(ev);
      }
    });
    return map;
  }, [events]);

  const todayStr = isoDate(today());
  const selectedEvents = selected ? (evByDate.get(selected) || []) : [];

  return (
    <div className="px-4 pb-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-zinc-700 transition-colors"><ChevronLeft size={16}/></button>
        <h2 className="text-white font-black text-lg uppercase tracking-wide">{MONTHS_FR[month]} {year}</h2>
        <button onClick={next} className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-zinc-700 transition-colors"><ChevronRight size={16}/></button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAYS_FR.map((d,i) => <div key={i} className="text-center text-[10px] font-black text-white/30 uppercase py-1">{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({length:startDow}).map((_,i) => <div key={`e-${i}`}/>)}
        {Array.from({length:totalDays}).map((_,i) => {
          const day = i+1;
          const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
          const dayEvs  = evByDate.get(dateStr) || [];
          const isToday = dateStr === todayStr;
          const isSel   = dateStr === selected;
          const past    = dateStr < todayStr && !isToday;
          const dots    = [...new Set(dayEvs.map(e => SOURCE_COLOR[e.source]))].slice(0,3);
          return (
            <div key={dateStr}
              onClick={() => dayEvs.length > 0 && setSelected(isSel ? null : dateStr)}
              className={`relative flex flex-col items-center py-1 rounded-lg transition-all
                ${dayEvs.length > 0 ? 'cursor-pointer' : ''}
                ${isSel ? 'bg-red-600/30 ring-1 ring-red-500' : dayEvs.length > 0 ? 'hover:bg-white/5' : ''}
                ${isToday ? 'ring-1 ring-white/40' : ''}
                ${past && dayEvs.length > 0 ? 'opacity-40' : ''}`}>
              <span className={`text-[12px] font-bold leading-none mb-0.5
                ${isToday?'text-red-400':isSel?'text-white':dayEvs.length>0?'text-white':'text-white/25'}`}>{day}</span>
              <div className="flex gap-0.5 h-1.5">
                {dots.map((color,di) => <div key={di} className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:color}}/>)}
              </div>
            </div>
          );
        })}
      </div>

      {selected && selectedEvents.length > 0 && (
        <div className="mt-5">
          <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3">
            {formatFull(selected)} · {selectedEvents.length} événement{selectedEvents.length>1?'s':''}
          </p>
          <div className="space-y-2">
            {selectedEvents.map(ev => <EventCard key={ev.id} ev={ev} onVideoSelect={onVideoSelect}/>)}
          </div>
        </div>
      )}
    </div>
  );
};

// ── FilterPanel ───────────────────────────────────────────────
const FilterPanel = ({ filters, onChange, onClose }: {
  filters: AdvancedFilters; onChange: (f: AdvancedFilters) => void; onClose: () => void;
}) => {
  const cloneFilters = (f: AdvancedFilters): AdvancedFilters => ({
    ...f,
    formations: new Set(f.formations),
    joueurs: new Set(f.joueurs),
    categories: new Set(f.categories),
    sources: new Set(f.sources),
  });

  const [local, setLocal] = useState<AdvancedFilters>(cloneFilters(filters));

  const toggleSet = (prev: Set<string>, key: string): Set<string> => {
    const next = new Set(prev);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  };

  const toggleSource = (key: string) => {
    if (key === 'all') { setLocal(l => ({...l, sources: new Set(['all'])})); return; }
    const next = new Set(local.sources);
    next.delete('all');
    if (next.has(key)) next.delete(key); else next.add(key);
    if (next.size === 0) next.add('all');
    setLocal(l => ({...l, sources: next}));
  };

  const checkAll = () => setLocal({
    officiel: true, ouvert: true,
    formations: new Set(FORMATIONS), joueurs: new Set(JOUEURS),
    categories: new Set(CAT_TYPES), sources: new Set(['all']),
  });
  const reset = () => setLocal(makeDefaultFilters());

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px flex-1 bg-white/10" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 px-2">{title}</p>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      {children}
    </div>
  );

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-end md:items-center md:justify-center" onClick={onClose}>
      <div
        className="w-full md:max-w-lg bg-zinc-950 border border-white/10 rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-1.5 rounded-lg">
              <SlidersHorizontal size={14} className="text-white" />
            </div>
            <h2 className="text-white font-black text-sm uppercase tracking-[0.2em]">Filtres</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
          >
            <X size={14} className="text-white/60" />
          </button>
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          <Section title="Département / source">
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
              <Checkbox checked={local.sources.has('all')} onChange={() => toggleSource('all')} label="Tous"/>
              {SOURCES_LIST.map(s => (
                <Checkbox key={s.key} checked={local.sources.has(s.key)} onChange={() => toggleSource(s.key)} label={s.label}/>
              ))}
            </div>
          </Section>

          <Section title="Type">
            <div className="flex gap-6">
              <Checkbox checked={local.officiel} onChange={() => setLocal(l => ({...l, officiel: !l.officiel}))} label="Officiel"/>
              <Checkbox checked={local.ouvert} onChange={() => setLocal(l => ({...l, ouvert: !l.ouvert}))} label="Ouvert à tous"/>
            </div>
          </Section>

          <Section title="Formation">
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
              {FORMATIONS.map(f => (
                <Checkbox key={f} checked={local.formations.has(f)}
                  onChange={() => setLocal(l => ({...l, formations: toggleSet(l.formations, f)}))}
                  label={f}/>
              ))}
            </div>
          </Section>

          <Section title="Type de joueur">
            <div className="grid grid-cols-3 gap-x-2 gap-y-0.5">
              {JOUEURS.map(j => (
                <Checkbox key={j} checked={local.joueurs.has(j)}
                  onChange={() => setLocal(l => ({...l, joueurs: toggleSet(l.joueurs, j)}))}
                  label={j}/>
              ))}
            </div>
          </Section>

          <Section title="Catégorie de concours">
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
              {CAT_TYPES.map(c => (
                <Checkbox key={c} checked={local.categories.has(c)}
                  onChange={() => setLocal(l => ({...l, categories: toggleSet(l.categories, c)}))}
                  label={c}/>
              ))}
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/8 space-y-3 bg-zinc-950">
          <button
            onClick={() => { onChange(local); onClose(); }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3.5 rounded-xl uppercase tracking-[0.15em] text-sm transition-colors"
          >
            Appliquer les filtres
          </button>
          <div className="flex justify-center gap-8">
            <button onClick={checkAll} className="text-white/30 hover:text-white/60 text-xs uppercase tracking-wider font-bold transition-colors">
              Tout cocher
            </button>
            <button onClick={reset} className="text-white/30 hover:text-white/60 text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1">
              <RotateCcw size={10} /> Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </div>
  , document.body);
};

// ── Composant principal ───────────────────────────────────────
const CalendarComponent = ({ videos, onVideoSelect }: { videos: Video[]; onVideoSelect: (v: Video) => void }) => {
  const [view, setView]           = useState<'month' | 'list'>('month');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters]     = useState<AdvancedFilters>(makeDefaultFilters());
  const [todayKey, setTodayKey]   = useState(isoDate(new Date()));

  // Recalcul automatique chaque jour à minuit
  useEffect(() => {
    const msUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      return midnight.getTime() - now.getTime();
    };
    const scheduleRefresh = () => {
      const t = setTimeout(() => {
        setTodayKey(isoDate(new Date()));
        scheduleRefresh();
      }, msUntilMidnight());
      return t;
    };
    const timer = scheduleRefresh();
    return () => clearTimeout(timer);
  }, []);

  const allEvents      = useMemo(() => buildEvents(videos), [videos, todayKey]);
  const filteredEvents = useMemo(() => applyFilters(allEvents, filters), [allEvents, filters]);

  const activeCount = [
    !filters.sources.has('all'),
    filters.formations.size > 0,
    filters.joueurs.size > 0,
    filters.categories.size > 0,
  ].filter(Boolean).length;

  return (
    <div className="pt-28 pb-4 min-h-screen">

      {/* Barre de contrôle sticky — bien en dessous du header */}
      <div className="sticky top-28 z-40 bg-zinc-950/98 backdrop-blur-md border-b border-white/8">
        <div className="px-4 py-2.5 max-w-[1400px] mx-auto flex items-center justify-between gap-3">

          {/* Toggle vue + compteur */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-zinc-900 p-1 rounded-xl">
              <button onClick={() => setView('month')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${view === 'month' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}>
                <CalendarIcon size={11}/> Mensuel
              </button>
              <button onClick={() => setView('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${view === 'list' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}>
                <List size={11}/> Agenda
              </button>
            </div>
            <span className="text-white/25 text-xs hidden sm:block">{filteredEvents.length} événements</span>
          </div>

          {/* Bouton Filtres — toujours accessible */}
          <button onClick={() => setShowFilters(true)}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border transition-all
              ${activeCount > 0 ? 'bg-blue-600 border-blue-500 text-white' : 'bg-zinc-800 border-white/15 text-white/70 hover:border-white/30 hover:text-white'}`}>
            <SlidersHorizontal size={13}/>
            <span className="text-[11px] font-black uppercase tracking-wide">Filtres</span>
            {activeCount > 0 && (
              <span className="bg-white text-blue-600 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{activeCount}</span>
            )}
          </button>
        </div>

        {/* Badges filtres actifs */}
        {activeCount > 0 && (
          <div className="px-4 pb-2 max-w-[1400px] mx-auto flex items-center gap-2 flex-wrap">
            {!filters.sources.has('all') && [...filters.sources].map(s => (
              <span key={s} className="bg-blue-600/20 text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-blue-600/30">
                {SOURCE_LABEL[s as EventSource]}
              </span>
            ))}
            {[...filters.formations, ...filters.joueurs, ...filters.categories].map(tag => (
              <span key={tag} className="bg-purple-600/20 text-purple-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-purple-600/30">{tag}</span>
            ))}
            <button onClick={() => setFilters(makeDefaultFilters())}
              className="flex items-center gap-1 text-white/30 hover:text-white text-[10px] font-bold transition-colors">
              <RotateCcw size={10}/>Reset
            </button>
          </div>
        )}
      </div>

      {/* Légende formats */}
      <div className="px-4 pt-3 mb-2 flex gap-3 overflow-x-auto no-scrollbar max-w-[1400px] mx-auto">
        {[['3️⃣','Triplette'],['2️⃣','Doublette'],['1️⃣','T-à-T'],['⚡','Enduro'],['🎯','Autre']].map(([icon,label]) => (
          <div key={label as string} className="flex-shrink-0 flex items-center gap-1 text-[9px] text-white/25">
            <span>{icon}</span><span className="uppercase">{label}</span>
          </div>
        ))}
      </div>

      {/* Vue */}
      {view === 'month'
        ? <MonthView events={filteredEvents} onVideoSelect={onVideoSelect}/>
        : <ListView  events={filteredEvents} onVideoSelect={onVideoSelect}/>
      }

      {/* Panneau filtres */}
      {showFilters && (
        <FilterPanel filters={filters} onChange={setFilters} onClose={() => setShowFilters(false)}/>
      )}
    </div>
  );
};

export default CalendarComponent;
