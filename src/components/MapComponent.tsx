import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Video } from '../services/youtubeService';
import { NATIONAUX_2026, National } from '../data/nationaux2026';
import { CONCOURS_ALLIER_2026, ConcourAllier, DEPT_ALLIER } from '../data/allier2026';
import { CONCOURS_NIEVRE_2026, ConcourNievre, DEPT_NIEVRE } from '../data/nievre2026';
import { CONCOURS_AIN_2026, ConcourAin, DEPT_AIN } from '../data/ain2026';
import { CONCOURS_AISNE_2026, ConcourAisne, DEPT_AISNE } from '../data/aisne2026';
import { CONCOURS_AHP_2026, ConcourAHP, DEPT_AHP } from '../data/ahp2026';
import { CONCOURS_REGIONAUX_2026, ConcourRegional } from '../data/regionaux2026';
import { CONCOURS_AM_2026, ConcourAM, DEPT_AM } from '../data/am2026';
import { CONCOURS_ARDECHE_2026, ConcourArdeche, DEPT_ARDECHE } from '../data/ardeche2026';
import { Calendar, MapPin, Users, Radio, SlidersHorizontal, X, RotateCcw } from 'lucide-react';

// ══════════════════════════════════════════════════════════
// SYSTÈME D'ICÔNES AHRENA
// Taille : National(52) > Régional(40) > Départemental(28)
// Forme  : National=étoile, Régional=losange, Départ=cercle
// Genre  : 🔵 masculin, 🩷 féminin, 💜 mixte, ⚪ open/vétéran
// ══════════════════════════════════════════════════════════

// Détecte le genre depuis la catégorie
const getGenderDots = (categorie: string): string => {
  const c = categorie.toUpperCase();
  const isFem = c.includes('FÉM') || c.includes('FEM') || c.includes('FÉMININ') || c.includes('FEMININE');
  const isMasc = c.includes('MASC') || c.includes('MASCULIN') || c.includes('HOMME') || c.includes('SENIOR') || c.includes('VÉTÉRAN') || c.includes('VETERAN') || c.includes('PROMO') || c.includes('OPEN') || c.includes('JEUNE');
  const isMixte = c.includes('MIXTE');
  if (isMixte) return '<span style="font-size:9px;line-height:1;letter-spacing:-1px">🔵🩷</span>';
  if (isFem)   return '<span style="font-size:10px;line-height:1">🩷</span>';
  if (isMasc)  return '<span style="font-size:10px;line-height:1">🔵</span>';
  return '';
};

// ── ICÔNE NATIONALE (étoile, 52px) ──────────────────────────
const createNationalIcon = (color: string, categorie: string, pulse = false) => {
  const gender = getGenderDots(categorie);
  const size = 52;
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:${size}px;height:${size}px;filter:drop-shadow(0 3px 6px rgba(0,0,0,0.4));">
      ${pulse ? `<div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.25;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>` : ''}
      <svg viewBox="0 0 52 52" width="${size}" height="${size}">
        <polygon points="26,3 31,19 48,19 35,30 40,47 26,37 12,47 17,30 4,19 21,19" 
          fill="${color}" stroke="white" stroke-width="2.5"/>
      </svg>
      <div style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);white-space:nowrap;">${gender}</div>
    </div>`,
    iconSize: [size, size+8], iconAnchor: [size/2, size/2], popupAnchor: [0, -size/2],
  });
};

// ── ICÔNE RÉGIONALE (losange, 40px) ─────────────────────────
const createRegionalIcon = (color: string, categorie: string, pulse = false) => {
  const gender = getGenderDots(categorie);
  const size = 40;
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:${size}px;height:${size}px;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.35));">
      ${pulse ? `<div style="position:absolute;inset:0;background:${color};opacity:0.2;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;transform:rotate(45deg);"></div>` : ''}
      <svg viewBox="0 0 40 40" width="${size}" height="${size}">
        <polygon points="20,2 38,20 20,38 2,20" 
          fill="${color}" stroke="white" stroke-width="2.5"/>
      </svg>
      <div style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);white-space:nowrap;">${gender}</div>
    </div>`,
    iconSize: [size, size+8], iconAnchor: [size/2, size/2], popupAnchor: [0, -size/2],
  });
};

// ── ICÔNE DÉPARTEMENTALE (cercle, 28px) ─────────────────────
const createDeptIcon = (color: string, categorie: string, pulse = false, size = 28) => {
  const gender = getGenderDots(categorie);
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:${size}px;height:${size+8}px;">
      ${pulse ? `<div style="position:absolute;top:0;left:0;right:0;bottom:8px;border-radius:50%;background:${color};opacity:0.3;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>` : ''}
      <div style="position:absolute;top:0;left:0;right:0;bottom:8px;border-radius:50%;background:${color};border:2px solid rgba(255,255,255,0.9);box-shadow:0 2px 5px rgba(0,0,0,0.3);"></div>
      <div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);white-space:nowrap;">${gender}</div>
    </div>`,
    iconSize: [size, size+8], iconAnchor: [size/2, size/2], popupAnchor: [0, -(size/2+4)],
  });
};

// Compatibilité avec l'ancien système (pour les icônes TODAY/SOON fixes)
const createIcon = (color: string, pulse = false, size = 28, symbol = '') => createDeptIcon(color, symbol || '', pulse, size);
const createFormatIcon = (color: string, _format: string, pulse = false, size = 28) => createDeptIcon(color, '', pulse, size);

// ── Icônes fixes (nationales, status) ────────────────────────
const ICON_NATIONAL      = createIcon('#3b82f6', false, 32, '🏆');
const ICON_NATIONAL_LIVE = createIcon('#dc2626', true,  32, '🔴');
const ICON_NATIONAL_SOON = createIcon('#d97706', false, 32, '⏰');
const ICON_ALLIER        = createIcon('#10b981', false, 24);
const ICON_ALLIER_SOON   = createIcon('#f59e0b', false, 24);
const ICON_ALLIER_TODAY  = createIcon('#ef4444', true,  24);
const ICON_ALLIER_CHAMP  = createIcon('#8b5cf6', false, 24, '🏅');
const ICON_ALLIER_SPEC   = createIcon('#ec4899', false, 24, '⭐');

const ICON_NIEVRE        = createIcon('#f97316', false, 24);

const ICON_AIN           = createIcon('#8b5cf6', false, 24);

const ICON_AISNE         = createIcon('#06b6d4', false, 24);

const ICON_AHP           = createIcon('#84cc16', false, 24);
const ICON_AHP_SOON      = createIcon('#f59e0b', false, 24);
const ICON_AHP_TODAY     = createIcon('#ef4444', true,  24);
const ICON_AHP_CHAMP     = createIcon('#8b5cf6', false, 24, '🏅');
const ICON_AHP_NAT       = createIcon('#dc2626', false, 24, '🏆');
const ICON_AISNE_SOON    = createIcon('#f59e0b', false, 24);
const ICON_AISNE_TODAY   = createIcon('#ef4444', true,  24);
const ICON_AISNE_CHAMP   = createIcon('#8b5cf6', false, 24, '🏅');
const ICON_AISNE_REG     = createIcon('#3b82f6', false, 24, '⭐');
const ICON_AIN_SOON      = createIcon('#f59e0b', false, 24);
const ICON_AIN_TODAY     = createIcon('#ef4444', true,  24);
const ICON_AIN_CHAMP     = createIcon('#06b6d4', false, 24, '🏅');
const ICON_AIN_SPEC      = createIcon('#ec4899', false, 24, '⭐');
const ICON_NIEVRE_SOON   = createIcon('#f59e0b', false, 24);
const ICON_NIEVRE_TODAY  = createIcon('#ef4444', true,  24);
const ICON_NIEVRE_CHAMP  = createIcon('#8b5cf6', false, 24, '🏅');
const ICON_NIEVRE_SPEC   = createIcon('#ec4899', false, 24, '⭐');

const CATEGORIES = ['Tous', 'Sénior', 'Vétéran', 'Féminin', 'Mixte', 'Jeunes', 'Jeu Provençal'];
const FORMATS    = ['Tous', 'Triplette', 'Doublette', 'Tête à tête', 'Individuel', 'Enduro'];
const TYPES      = ['Tous', 'Concours', 'Départemental', 'Régional', 'National', 'International', 'Supra-national', 'Championnat', 'Autre'];
const PERIODES   = ["Toute l'année", "Aujourd'hui", 'Cette semaine', 'Ce mois', '3 prochains mois'];
const COUCHES    = ['Tout afficher', 'Nationaux seulement', 'Allier (03) seulement', 'Nièvre (58) seulement', 'Ain (01) seulement', 'Aisne (02) seulement', 'AHP (04) seulement', 'Alpes-Maritimes (06) seulement', 'Ardèche (07) seulement'];

const DEPT_REGIONS: Record<string, string> = {
  '01':'Auvergne-Rhône-Alpes','03':'Auvergne-Rhône-Alpes','04':'PACA','05':'PACA',
  '06':'PACA','07':'Auvergne-Rhône-Alpes','08':'Grand Est','11':'Occitanie',
  '12':'Occitanie','13':'PACA','15':'Auvergne-Rhône-Alpes','17':'Nouvelle-Aquitaine',
  '18':'Centre-Val de Loire','21':'Bourgogne-Franche-Comté','26':'Auvergne-Rhône-Alpes',
  '29':'Bretagne','30':'Occitanie','31':'Occitanie','32':'Occitanie',
  '33':'Nouvelle-Aquitaine','34':'Occitanie','36':'Centre-Val de Loire',
  '38':'Auvergne-Rhône-Alpes','39':'Bourgogne-Franche-Comté','40':'Nouvelle-Aquitaine',
  '41':'Centre-Val de Loire','42':'Auvergne-Rhône-Alpes','43':'Auvergne-Rhône-Alpes',
  '44':'Pays de la Loire','45':'Centre-Val de Loire','47':'Nouvelle-Aquitaine',
  '48':'Occitanie','49':'Pays de la Loire','50':'Normandie','51':'Grand Est',
  '54':'Grand Est','66':'Occitanie','68':'Grand Est','69':'Auvergne-Rhône-Alpes',
  '71':'Bourgogne-Franche-Comté','74':'Auvergne-Rhône-Alpes','76':'Normandie',
  '81':'Occitanie','83':'PACA','84':'PACA','85':'Pays de la Loire',
  '87':'Nouvelle-Aquitaine','88':'Grand Est','89':'Bourgogne-Franche-Comté',
  '95':'Île-de-France','2A':'Corse','2B':'Corse',
};
const REGIONS = ['Toutes', ...Array.from(new Set(Object.values(DEPT_REGIONS))).sort()];

const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
const isToday    = (d: string, f?: string) => { const n = new Date(); return n >= new Date(d) && n <= new Date(new Date(f || d).setHours(23,59,59)); };
const inDays     = (d: string, days: number) => { const diff = (new Date(d).getTime() - Date.now()) / 86400000; return diff >= 0 && diff <= days; };
// Retourne true si le concours est entièrement passé (date de fin < aujourd'hui)
const isPast     = (fin: string) => new Date(new Date(fin).setHours(23,59,59)) < new Date();

function matchPeriode(p: string, debut: string, fin?: string) {
  if (p === "Toute l'année") return true;
  if (p === "Aujourd'hui") return isToday(debut, fin);
  if (p === 'Cette semaine') return inDays(debut, 7);
  if (p === 'Ce mois') return inDays(debut, 30);
  if (p === '3 prochains mois') return inDays(debut, 90);
  return true;
}
function matchCategorie(cat: string, val: string) { return cat === 'Tous' || val.toUpperCase().includes(cat.toUpperCase()); }
function matchFormat(fmt: string, val: string) {
  if (fmt === 'Tous') return true;
  if (fmt === 'Tête à tête') return val.toUpperCase().includes('TÊTE') || val.toUpperCase().includes('INDIVIDUEL');
  return val.toUpperCase().includes(fmt.toUpperCase());
}
function matchType(type: string, val: string) {
  if (type === 'Tous') return true;
  if (type === 'Concours') return val === 'CONCOURS';
  if (type === 'Championnat') return val === 'CHAMPIONNAT';
  if (type === 'Régional') return val === 'RÉGIONAL';
  if (type === 'National') return val === 'NATIONAL';
  if (type === 'International') return val === 'INTERNATIONAL';
  if (type === 'Supra-national') return val === 'SUPRA-NATIONAL';
  if (type === 'Départemental') return val === 'CONCOURS';
  if (type === 'Autre') return !['CONCOURS','CHAMPIONNAT','RÉGIONAL','NATIONAL','INTERNATIONAL','SUPRA-NATIONAL'].includes(val);
  return true;
}

const CATEGORIE_COLORS: Record<string,string> = {
  'SÉNIOR':'bg-blue-600/20 text-blue-400','FÉMININ':'bg-pink-600/20 text-pink-400',
  'VÉTÉRAN':'bg-amber-600/20 text-amber-400','MIXTE':'bg-purple-600/20 text-purple-400',
  'JEU PROVENÇAL':'bg-emerald-600/20 text-emerald-400',
};
const TYPE_COLORS: Record<string,string> = {
  'CONCOURS':'bg-emerald-600/20 text-emerald-400','CHAMPIONNAT':'bg-purple-600/20 text-purple-400',
  'RÉGIONAL':'bg-cyan-600/20 text-cyan-400','NATIONAL':'bg-red-600/20 text-red-400',
  'SPÉCIAL':'bg-pink-600/20 text-pink-400',
};


// ── Bandeau vérification département ─────────────────────────
const DeptLinks = ({ facebook, site, nom }: { facebook: string; site: string; nom: string }) => (
  <div className="px-3 py-2 bg-amber-950/40 border-t border-amber-500/20 flex items-center gap-2">
    <span className="text-amber-400 text-[9px] font-black uppercase tracking-wider flex-shrink-0">⚠️ Vérifier</span>
    <div className="flex gap-2 ml-auto">
      <a href={facebook} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 text-[9px] font-bold px-2 py-1 rounded border border-blue-600/30 transition-colors"
        onClick={e => e.stopPropagation()}>
        📘 Facebook
      </a>
      <a href={site} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 text-[9px] font-bold px-2 py-1 rounded border border-emerald-600/30 transition-colors"
        onClick={e => e.stopPropagation()}>
        🌐 Site CD{nom}
      </a>
    </div>
  </div>
);

function groupByLoc<T extends {lat:number;lng:number;ville:string}>(items: T[], p=2) {
  const map = new Map<string,T[]>();
  items.forEach(n => { const k=`${n.lat.toFixed(p)},${n.lng.toFixed(p)}`; if(!map.has(k)) map.set(k,[]); map.get(k)!.push(n); });
  return Array.from(map.values()).map(arr => ({lat:arr[0].lat,lng:arr[0].lng,ville:arr[0].ville,items:arr}));
}

// ── Pill ─────────────────────────────────────────────────────
const Pill = ({label,active,onClick}:{label:string;active:boolean;onClick:()=>void}) => (
  <button onClick={onClick} className={`px-3 py-2 rounded-xl text-[12px] font-bold whitespace-nowrap transition-all border ${active ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-900/30' : 'bg-zinc-800/80 text-white/60 border-white/8 hover:border-white/20 hover:text-white/80'}`}>{label}</button>
);

// ── Accordéon ────────────────────────────────────────────────
const Accordion = ({title,icon,value,count,children,open,onToggle}:{title:string;icon:string;value:string;count?:number;children:React.ReactNode;open:boolean;onToggle:()=>void}) => (
  <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${open ? 'border-white/15 bg-zinc-900/80' : 'border-white/6 bg-zinc-900/40'}`}>
    <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 text-left">
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <div>
          <p className="font-black text-white text-[13px] uppercase tracking-wide">{title}</p>
          {value && value !== 'Tous' && value !== 'Toutes' && value !== "Toute l'année" && value !== 'Tout afficher' && (
            <p className="text-red-400 text-[10px] font-bold mt-0.5">{value}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {count !== undefined && count > 0 && <span className="bg-red-600 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center">{count}</span>}
        <div className={`w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center transition-transform duration-200 ${open?'rotate-180':''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
      </div>
    </button>
    {open && (
      <div className="px-5 pb-5 pt-1">
        <div className="flex flex-wrap gap-2">{children}</div>
      </div>
    )}
  </div>
);

const MapComponent = ({ videos, onVideoSelect }: { videos: Video[], onVideoSelect: (v: Video) => void }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string|null>(null);
  const [periode, setPeriode]     = useState("Toute l'année");
  const [categorie, setCategorie] = useState('Tous');
  const [format, setFormat]       = useState('Tous');
  const [type, setType]           = useState('Tous');
  const [region, setRegion]       = useState('Toutes');
  const [couche, setCouche]       = useState('Tout afficher');

  const toggleAccordion = (key: string) => setOpenAccordion(prev => prev === key ? null : key);

  const activeCount = [periode!=="Toute l'année",categorie!=='Tous',format!=='Tous',type!=='Tous',region!=='Toutes',couche!=='Tout afficher'].filter(Boolean).length;

  const reset = () => { setPeriode("Toute l'année"); setCategorie('Tous'); setFormat('Tous'); setType('Tous'); setRegion('Toutes'); setCouche('Tout afficher'); setOpenAccordion(null); };

  const getNatStatus = (n: National) => {
    if (isToday(n.dateDebut, n.dateFin)) return videos.some(v => v.isLive && v.title.toLowerCase().includes(n.ville.toLowerCase())) ? 'live' : 'today';
    if (inDays(n.dateDebut, 30)) return 'upcoming';
    return 'normal';
  };

  const filteredNat = useMemo(() => couche === 'Allier (03) seulement' ? [] : NATIONAUX_2026.filter(n => {
    if (isPast(n.dateFin)) return false; // Masquer les concours passés
    if (!matchPeriode(periode, n.dateDebut, n.dateFin)) return false;
    if (!matchCategorie(categorie, n.categorie)) return false;
    if (!matchFormat(format, n.format)) return false;
    if (type !== 'Tous' && !matchType(type, 'NATIONAL')) return false;
    if (region !== 'Toutes' && DEPT_REGIONS[n.departement] !== region) return false;
    return true;
  }), [periode, categorie, format, type, region, couche]);

  const filteredAl = useMemo(() => couche === 'Nationaux seulement' || couche === 'Nièvre (58) seulement' ? [] : CONCOURS_ALLIER_2026.filter(c => {
    if (isPast(c.dateFin || c.date)) return false;
    if (!matchPeriode(periode, c.date, c.dateFin)) return false;
    if (!matchCategorie(categorie, c.categorie)) return false;
    if (!matchFormat(format, c.format)) return false;
    if (!matchType(type, c.type)) return false;
    if (region !== 'Toutes' && region !== 'Auvergne-Rhône-Alpes') return false;
    return true;
  }), [periode, categorie, format, type, region, couche]);

  const filteredNi = useMemo(() => couche === 'Nationaux seulement' || couche === 'Allier (03) seulement' || couche === 'Ain (01) seulement' ? [] : CONCOURS_NIEVRE_2026.filter(c => {
    if (isPast(c.dateFin || c.date)) return false;
    if (!matchPeriode(periode, c.date, c.dateFin)) return false;
    if (!matchCategorie(categorie, c.categorie)) return false;
    if (!matchFormat(format, c.format)) return false;
    if (!matchType(type, c.type)) return false;
    if (region !== 'Toutes' && region !== 'Bourgogne-Franche-Comté') return false;
    return true;
  }), [periode, categorie, format, type, region, couche]);

  const filteredAin = useMemo(() => ['Nationaux seulement','Allier (03) seulement','Nièvre (58) seulement','Aisne (02) seulement'].includes(couche) ? [] : CONCOURS_AIN_2026.filter(c => {
    if (isPast(c.dateFin || c.date)) return false;
    if (!matchPeriode(periode, c.date, c.dateFin)) return false;
    if (!matchCategorie(categorie, c.categorie)) return false;
    if (!matchFormat(format, c.format)) return false;
    if (!matchType(type, c.type)) return false;
    if (region !== 'Toutes' && region !== 'Auvergne-Rhône-Alpes') return false;
    return true;
  }), [periode, categorie, format, type, region, couche]);

  const filteredAisne = useMemo(() => ['Nationaux seulement','Allier (03) seulement','Nièvre (58) seulement','Ain (01) seulement','AHP (04) seulement'].includes(couche) ? [] : CONCOURS_AISNE_2026.filter(c => {
    if (isPast(c.dateFin || c.date)) return false;
    if (!matchPeriode(periode, c.date, c.dateFin)) return false;
    if (!matchCategorie(categorie, c.categorie)) return false;
    if (!matchFormat(format, c.format)) return false;
    if (!matchType(type, c.type)) return false;
    if (region !== 'Toutes' && region !== 'Hauts-de-France') return false;
    return true;
  }), [periode, categorie, format, type, region, couche]);

  const filteredAHP = useMemo(() => ['Nationaux seulement','Allier (03) seulement','Nièvre (58) seulement','Ain (01) seulement','Aisne (02) seulement'].includes(couche) ? [] : CONCOURS_AHP_2026.filter(c => {
    if (isPast(c.dateFin || c.date)) return false;
    if (!matchPeriode(periode, c.date, c.dateFin)) return false;
    if (!matchCategorie(categorie, c.categorie)) return false;
    if (!matchFormat(format, c.format)) return false;
    if (!matchType(type, c.type)) return false;
    if (region !== 'Toutes' && region !== 'PACA') return false;
    return true;
  }), [periode, categorie, format, type, region, couche]);

  const filteredReg = useMemo(() => couche === 'Nationaux seulement' ? [] : CONCOURS_REGIONAUX_2026.filter(c => {
    if (isPast(c.dateFin || c.date)) return false;
    if (!matchPeriode(periode, c.date, c.dateFin)) return false;
    if (!matchCategorie(categorie, c.categorie)) return false;
    if (!matchFormat(format, c.format)) return false;
    return true;
  }), [periode, categorie, format, couche]);

  const filteredAM = useMemo(() => ['Nationaux seulement','Allier (03) seulement','Nièvre (58) seulement','Ain (01) seulement','Aisne (02) seulement','AHP (04) seulement'].includes(couche) ? [] : CONCOURS_AM_2026.filter(c => {
    if (isPast(c.dateFin || c.date)) return false;
    if (!matchPeriode(periode, c.date, c.dateFin)) return false;
    if (!matchCategorie(categorie, c.categorie)) return false;
    if (!matchFormat(format, c.format)) return false;
    if (!matchType(type, c.type)) return false;
    if (region !== 'Toutes' && region !== 'PACA') return false;
    return true;
  }), [periode, categorie, format, type, region, couche]);

  const filteredArdeche = useMemo(() => ['Nationaux seulement','Allier (03) seulement','Nièvre (58) seulement','Ain (01) seulement','Aisne (02) seulement','AHP (04) seulement','Alpes-Maritimes (06) seulement'].includes(couche) ? [] : CONCOURS_ARDECHE_2026.filter(c => {
    if (c.annule) return false;
    if (isPast(c.date)) return false;
    if (!matchPeriode(periode, c.date)) return false;
    if (!matchCategorie(categorie, c.categorie)) return false;
    if (!matchFormat(format, c.format)) return false;
    if (!matchType(type, c.type)) return false;
    if (region !== 'Toutes' && region !== 'ARA') return false;
    return true;
  }), [periode, categorie, format, type, region, couche]);

  const total = filteredNat.length + filteredAl.length + filteredNi.length + filteredAin.length + filteredAisne.length + filteredAHP.length + filteredReg.length + filteredAM.length + filteredArdeche.length;

  const natGroups = useMemo(() => groupByLoc(filteredNat as any[]), [filteredNat]);
  const alGroups  = useMemo(() => groupByLoc(filteredAl as any[], 3), [filteredAl]);
  const niGroups  = useMemo(() => groupByLoc(filteredNi as any[], 3), [filteredNi]);
  const ainGroups  = useMemo(() => groupByLoc(filteredAin as any[], 3), [filteredAin]);
  const aisneGroups= useMemo(() => groupByLoc(filteredAisne as any[], 3), [filteredAisne]);
  const ahpGroups  = useMemo(() => groupByLoc(filteredAHP as any[], 3), [filteredAHP]);
  const amGroups   = useMemo(() => groupByLoc(filteredAM as any[], 3), [filteredAM]);
  const ardecheGroups = useMemo(() => groupByLoc(filteredArdeche as any[], 3), [filteredArdeche]);
  const regGroups  = useMemo(() => groupByLoc(filteredReg as any[], 2), [filteredReg]);

  const getNatIcon = (items: National[]) => {
    const s = items.map(getNatStatus);
    const cat = items[0]?.categorie || '';
    const pulse = s.includes('live') || s.includes('today');
    const color = s.includes('live') ? '#dc2626' : s.includes('today')||s.includes('upcoming') ? '#d97706' : '#3b82f6';
    return createNationalIcon(color, cat, pulse);
  };
  const getNatColor = (items: National[]) => {
    const s = items.map(getNatStatus);
    if (s.includes('live')) return 'bg-red-600';
    if (s.includes('today')||s.includes('upcoming')) return 'bg-amber-600';
    return 'bg-blue-600';
  };
  const getAlIcon = (items: ConcourAllier[]) => {
    const cat = items[0]?.categorie || '';
    if (items.some(c => isToday(c.date, c.dateFin))) return ICON_TODAY('#ef4444');
    const t = items.map(i => i.type);
    if (t.some(x => ['NATIONAL','SPÉCIAL'].includes(x))) return createNationalIcon('#10b981', cat);
    if (t.some(x => ['CHAMPIONNAT','RÉGIONAL'].includes(x))) return ICON_CHAMP('#8b5cf6', cat);
    if (items.some(c => inDays(c.date, 30))) return ICON_SOON('#10b981');
    return createDeptIcon('#10b981', cat, false, 28);
  };
  const getNiIcon = (items: ConcourNievre[]) => {
    const cat = items[0]?.categorie || '';
    if (items.some(c => isToday(c.date, c.dateFin))) return ICON_TODAY('#ef4444');
    const t = items.map(i => i.type);
    if (t.some(x => ['NATIONAL','SPÉCIAL'].includes(x))) return createNationalIcon('#f97316', cat);
    if (t.some(x => ['CHAMPIONNAT','RÉGIONAL'].includes(x))) return ICON_CHAMP('#8b5cf6', cat);
    if (items.some(c => inDays(c.date, 30))) return ICON_SOON('#f97316');
    return createDeptIcon('#f97316', cat, false, 28);
  };

  const getAHPIcon = (items: ConcourAHP[]) => {
    const cat = items[0]?.categorie || '';
    if (items.some(c => isToday(c.date, c.dateFin))) return ICON_TODAY('#ef4444');
    const t = items.map(i => i.type);
    if (t.some(x => ['NATIONAL','SPÉCIAL'].includes(x))) return createNationalIcon('#84cc16', cat);
    if (t.some(x => ['CHAMPIONNAT','RÉGIONAL'].includes(x))) return ICON_CHAMP('#8b5cf6', cat);
    if (items.some(c => inDays(c.date, 30))) return ICON_SOON('#84cc16');
    return createDeptIcon('#84cc16', cat, false, 28);
  };

  const getAisneIcon = (items: ConcourAisne[]) => {
    const cat = items[0]?.categorie || '';
    if (items.some(c => isToday(c.date, c.dateFin))) return ICON_TODAY('#ef4444');
    const t = items.map(i => i.type);
    if (t.some(x => ['NATIONAL','SPÉCIAL'].includes(x))) return createNationalIcon('#06b6d4', cat);
    if (t.some(x => ['CHAMPIONNAT','RÉGIONAL'].includes(x))) return ICON_CHAMP('#8b5cf6', cat);
    if (items.some(c => inDays(c.date, 30))) return ICON_SOON('#06b6d4');
    return createDeptIcon('#06b6d4', cat, false, 28);
  };

  const getAinIcon = (items: ConcourAin[]) => {
    const cat = items[0]?.categorie || '';
    if (items.some(c => isToday(c.date, c.dateFin))) return ICON_TODAY('#ef4444');
    const t = items.map(i => i.type);
    if (t.some(x => ['NATIONAL','SPÉCIAL'].includes(x))) return createNationalIcon('#8b5cf6', cat);
    if (t.some(x => ['CHAMPIONNAT','RÉGIONAL'].includes(x))) return ICON_CHAMP('#06b6d4', cat);
    if (items.some(c => inDays(c.date, 30))) return ICON_SOON('#8b5cf6');
    return createDeptIcon('#8b5cf6', cat, false, 28);
  };

  const getAMIcon = (items: ConcourAM[]) => {
    const cat = items[0]?.categorie || '';
    if (items.some(c => isToday(c.date, c.dateFin))) return ICON_TODAY('#ef4444');
    const t = items.map(i => i.type);
    if (t.some(x => ['INTERNATIONAL'].includes(x))) return createNationalIcon('#0066CC', cat);
    if (t.some(x => ['NATIONAL','SPÉCIAL'].includes(x))) return createNationalIcon('#0066CC', cat);
    if (t.some(x => ['CHAMPIONNAT','RÉGIONAL'].includes(x))) return ICON_CHAMP('#3b82f6', cat);
    if (items.some(c => inDays(c.date, 30))) return ICON_SOON('#0066CC');
    return createDeptIcon('#0066CC', cat, false, 28);
  };

  const getArdecheIcon = (items: ConcourArdeche[]) => {
    const cat = items[0]?.categorie || '';
    if (items.some(c => isToday(c.date))) return ICON_TODAY('#ef4444');
    const t = items.map(i => i.type);
    if (t.some(x => ['NATIONAL'].includes(x))) return createNationalIcon('#f97316', cat);
    if (t.some(x => ['CHAMPIONNAT','QUALIFICATIF'].includes(x))) return ICON_CHAMP('#fb923c', cat);
    if (items.some(c => inDays(c.date, 30))) return ICON_SOON('#f97316');
    return createDeptIcon('#f97316', cat, false, 28);
  };

  return (
    <div className="relative" style={{height:'calc(100vh - 56px)'}}>

      {/* Barre du haut */}
      <div className="absolute top-4 left-3 right-3 z-[500] flex items-center justify-between">
        <button onClick={() => setPanelOpen(true)} className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-full shadow-lg hover:border-white/40 transition-all">
          <SlidersHorizontal size={14} className="text-white" />
          <span className="text-xs font-black text-white uppercase tracking-wider">Filtres</span>
          {activeCount > 0 && <span className="bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{activeCount}</span>}
        </button>
        <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-full text-[10px] text-white/60">
          <span className="font-black text-white">{total}</span> résultats
        </div>
      </div>

      {/* Légende */}
      <div className="absolute bottom-8 left-3 z-[500] bg-black/80 backdrop-blur-md rounded-xl border border-white/10 p-3 text-[9px] space-y-1.5">
        {[
          {color:'bg-blue-500',label:'★ Nationaux FFPJP'},
          {color:'bg-amber-500',label:'◆ Régionaux'},
          {color:'bg-emerald-500',label:'● Allier (03)'},
          {color:'bg-orange-500',label:'● Nièvre (58)'},
          {color:'bg-violet-500',label:'● Ain (01)'},
          {color:'bg-cyan-500',label:'● Aisne (02)'},
          {color:'bg-lime-500',label:'● AHP (04)'},
          {color:'bg-red-500 animate-pulse',label:"● Aujourd'hui"},
          {color:'bg-white/20',label:'🔵 Masc  🩷 Fém  🔵🩷 Mixte'},
        ].map((l,i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${l.color}`}/>
            <span className="text-white/50">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Carte */}
      <MapContainer center={[46.5, 2.5]} zoom={6} style={{height:'100%',width:'100%'}} zoomControl={false}>
        <TileLayer attribution='' url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />

        {natGroups.map((g,i) => (
          <Marker key={`nat-${i}`} position={[g.lat, g.lng]} icon={getNatIcon(g.items as National[])}>
            <Popup className="ahrena-popup" maxWidth={280}>
              <div className="bg-zinc-900 text-white rounded-xl overflow-hidden border border-white/10 w-64">
                <div className={`px-4 py-3 ${getNatColor(g.items as National[])}`}>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-white flex-shrink-0"/>
                    <div><p className="font-black text-sm">{g.ville}</p><p className="text-white/80 text-[10px]">{g.items.length} tournoi{g.items.length>1?'s':''} national{g.items.length>1?'aux':''}</p></div>
                  </div>
                </div>
                <div className="divide-y divide-white/5 max-h-60 overflow-y-auto">
                  {(g.items as National[]).map((n,j) => {
                    const ml = videos.find(v=>(v.isLive||v.isUpcoming)&&v.title.toLowerCase().includes(n.ville.toLowerCase()));
                    return (
                      <div key={j} className="p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${CATEGORIE_COLORS[n.categorie]||'bg-zinc-700 text-zinc-300'}`}>{n.categorie}</span>
                          <span className="text-[9px] text-white/30">{n.format}</span>
                        </div>
                        <p className="text-white/70 text-[10px] leading-snug mb-1.5">{n.organisateur}</p>
                        <div className="flex items-center justify-between text-[9px] text-white/40">
                          <div className="flex items-center gap-1"><Calendar size={9}/><span>{formatDate(n.dateDebut)}{n.dateFin!==n.dateDebut?` › ${formatDate(n.dateFin)}`:''}</span></div>
                          <div className="flex items-center gap-1"><Users size={9}/><span>{n.limite}</span><span className="text-white/20">· {n.frais}€</span></div>
                        </div>
                        {ml && <button onClick={()=>onVideoSelect(ml)} className={`mt-2 w-full py-1.5 rounded text-[9px] font-black uppercase flex items-center justify-center gap-1 ${ml.isLive?'bg-red-600':'bg-amber-600'} text-white`}><Radio size={9}/>{ml.isLive?'Voir le direct':'Live à venir'}</button>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {alGroups.map((g,i) => (
          <Marker key={`al-${i}`} position={[g.lat, g.lng]} icon={getAlIcon(g.items as ConcourAllier[])}>
            <Popup className="ahrena-popup" maxWidth={300}>
              <div className="bg-zinc-900 text-white rounded-xl overflow-hidden border border-white/10 w-72">
                <div className="px-4 py-3 bg-emerald-700">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-white flex-shrink-0"/>
                    <div><p className="font-black text-sm">{g.ville}</p><p className="text-white/80 text-[10px]">Allier (03) · {g.items.length} concours</p></div>
                  </div>
                </div>
                <DeptLinks facebook={DEPT_ALLIER.facebook} site={DEPT_ALLIER.site} nom="03" />
                <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                  {(g.items as ConcourAllier[]).slice().sort((a,b)=>a.date.localeCompare(b.date)).map((c,j) => {
                    const ml = videos.find(v=>(v.isLive||v.isUpcoming)&&v.title.toLowerCase().includes(c.ville.toLowerCase()));
                    const tod = isToday(c.date,c.dateFin);
                    const soon = inDays(c.date,30);
                    return (
                      <div key={j} className={`p-3 ${tod?'bg-red-950/30':soon?'bg-amber-950/20':''}`}>
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${TYPE_COLORS[c.type]||'bg-zinc-700 text-zinc-300'}`}>{c.type}</span>
                          <span className="text-[9px] text-white/30">{c.format}</span>
                          {tod && <span className="text-[9px] font-black text-red-400">● Aujourd'hui</span>}
                          {!tod&&soon && <span className="text-[9px] font-black text-amber-400">● Bientôt</span>}
                        </div>
                        <p className="text-white/90 text-[11px] font-semibold leading-snug mb-0.5">{c.categorie}</p>
                        <p className="text-white/50 text-[10px] leading-snug mb-1">{c.club}</p>
                        {c.lieu && <p className="text-white/30 text-[9px] mb-1">📍 {c.lieu}</p>}
                        {c.info && <p className="text-white/30 text-[9px] italic mb-1">{c.info}</p>}
                        <div className="flex items-center gap-1 text-[9px] text-white/40"><Calendar size={9}/><span>{formatDate(c.date)}{c.dateFin&&c.dateFin!==c.date?` › ${formatDate(c.dateFin)}`:''}</span></div>
                        {ml && <button onClick={()=>onVideoSelect(ml)} className={`mt-2 w-full py-1.5 rounded text-[9px] font-black uppercase flex items-center justify-center gap-1 ${ml.isLive?'bg-red-600':'bg-amber-600'} text-white`}><Radio size={9}/>{ml.isLive?'Voir le direct':'Live à venir'}</button>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {niGroups.map((g,i) => (
          <Marker key={`ni-${i}`} position={[g.lat, g.lng]} icon={getNiIcon(g.items as ConcourNievre[])}>
            <Popup className="ahrena-popup" maxWidth={300}>
              <div className="bg-zinc-900 text-white rounded-xl overflow-hidden border border-white/10 w-72">
                <div className="px-4 py-3 bg-orange-700">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-white flex-shrink-0"/>
                    <div><p className="font-black text-sm">{g.ville}</p><p className="text-white/80 text-[10px]">Nièvre (58) · {g.items.length} concours</p></div>
                  </div>
                </div>
                <DeptLinks facebook={DEPT_NIEVRE.facebook} site={DEPT_NIEVRE.site} nom="58" />
                <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                  {(g.items as ConcourNievre[]).slice().sort((a,b)=>a.date.localeCompare(b.date)).map((c,j) => {
                    const ml = videos.find(v=>(v.isLive||v.isUpcoming)&&v.title.toLowerCase().includes(c.ville.toLowerCase()));
                    const tod = isToday(c.date,c.dateFin);
                    const soon = inDays(c.date,30);
                    return (
                      <div key={j} className={`p-3 ${tod?'bg-red-950/30':soon?'bg-amber-950/20':''}`}>
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${TYPE_COLORS[c.type]||'bg-zinc-700 text-zinc-300'}`}>{c.type}</span>
                          <span className="text-[9px] text-white/30">{c.format}</span>
                          {tod && <span className="text-[9px] font-black text-red-400">● Aujourd'hui</span>}
                          {!tod&&soon && <span className="text-[9px] font-black text-amber-400">● Bientôt</span>}
                        </div>
                        <p className="text-white/90 text-[11px] font-semibold leading-snug mb-0.5">{c.categorie}</p>
                        <p className="text-white/50 text-[10px] leading-snug mb-1">{c.club}</p>
                        {c.lieu && <p className="text-white/30 text-[9px] mb-1">📍 {c.lieu}</p>}
                        {c.info && <p className="text-white/30 text-[9px] italic mb-1">{c.info}</p>}
                        <div className="flex items-center gap-1 text-[9px] text-white/40"><Calendar size={9}/><span>{formatDate(c.date)}{c.dateFin&&c.dateFin!==c.date?` › ${formatDate(c.dateFin)}`:''}</span></div>
                        {ml && <button onClick={()=>onVideoSelect(ml)} className={`mt-2 w-full py-1.5 rounded text-[9px] font-black uppercase flex items-center justify-center gap-1 ${ml.isLive?'bg-red-600':'bg-amber-600'} text-white`}><Radio size={9}/>{ml.isLive?'Voir le direct':'Live à venir'}</button>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {ainGroups.map((g,i) => (
          <Marker key={`ain-${i}`} position={[g.lat, g.lng]} icon={getAinIcon(g.items as ConcourAin[])}>
            <Popup className="ahrena-popup" maxWidth={300}>
              <div className="bg-zinc-900 text-white rounded-xl overflow-hidden border border-white/10 w-72">
                <div className="px-4 py-3 bg-violet-700">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-white flex-shrink-0"/>
                    <div><p className="font-black text-sm">{g.ville}</p><p className="text-white/80 text-[10px]">Ain (01) · {g.items.length} concours</p></div>
                  </div>
                </div>
                <DeptLinks facebook={DEPT_AIN.facebook} site={DEPT_AIN.site} nom="01" />
                <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                  {(g.items as ConcourAin[]).slice().sort((a,b)=>a.date.localeCompare(b.date)).map((c,j) => {
                    const ml = videos.find(v=>(v.isLive||v.isUpcoming)&&v.title.toLowerCase().includes(c.ville.toLowerCase()));
                    const tod = isToday(c.date,c.dateFin);
                    const soon = inDays(c.date,30);
                    return (
                      <div key={j} className={`p-3 ${tod?'bg-red-950/30':soon?'bg-amber-950/20':''}`}>
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${TYPE_COLORS[c.type]||'bg-zinc-700 text-zinc-300'}`}>{c.type}</span>
                          <span className="text-[9px] text-white/30">{c.format}</span>
                          {tod && <span className="text-[9px] font-black text-red-400">● Aujourd'hui</span>}
                          {!tod&&soon && <span className="text-[9px] font-black text-amber-400">● Bientôt</span>}
                        </div>
                        <p className="text-white/90 text-[11px] font-semibold leading-snug mb-0.5">{c.categorie}</p>
                        <p className="text-white/50 text-[10px] leading-snug mb-1">{c.club}</p>
                        {c.lieu && <p className="text-white/30 text-[9px] mb-1">📍 {c.lieu}</p>}
                        {c.info && <p className="text-white/30 text-[9px] italic mb-1">{c.info}</p>}
                        <div className="flex items-center gap-1 text-[9px] text-white/40"><Calendar size={9}/><span>{formatDate(c.date)}{c.dateFin&&c.dateFin!==c.date?` › ${formatDate(c.dateFin)}`:''}</span></div>
                        {ml && <button onClick={()=>onVideoSelect(ml)} className={`mt-2 w-full py-1.5 rounded text-[9px] font-black uppercase flex items-center justify-center gap-1 ${ml.isLive?'bg-red-600':'bg-amber-600'} text-white`}><Radio size={9}/>{ml.isLive?'Voir le direct':'Live à venir'}</button>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}


        {aisneGroups.map((g,i) => (
          <Marker key={`aisne-${i}`} position={[g.lat, g.lng]} icon={getAisneIcon(g.items as ConcourAisne[])}>
            <Popup className="ahrena-popup" maxWidth={300}>
              <div className="bg-zinc-900 text-white rounded-xl overflow-hidden border border-white/10 w-72">
                <div className="px-4 py-3 bg-cyan-700">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-white flex-shrink-0"/>
                    <div><p className="font-black text-sm">{g.ville}</p><p className="text-white/80 text-[10px]">Aisne (02) · {g.items.length} concours</p></div>
                  </div>
                </div>
                <DeptLinks facebook={DEPT_AISNE.facebook} site={DEPT_AISNE.site} nom="02" />
                <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                  {(g.items as ConcourAisne[]).slice().sort((a,b)=>a.date.localeCompare(b.date)).map((c,j) => {
                    const ml = videos.find(v=>(v.isLive||v.isUpcoming)&&v.title.toLowerCase().includes(c.ville.toLowerCase()));
                    const tod = isToday(c.date,c.dateFin);
                    const soon = inDays(c.date,30);
                    return (
                      <div key={j} className={`p-3 ${tod?'bg-red-950/30':soon?'bg-amber-950/20':''}`}>
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${TYPE_COLORS[c.type]||'bg-zinc-700 text-zinc-300'}`}>{c.type}</span>
                          <span className="text-[9px] text-white/30">{c.format}</span>
                          {tod && <span className="text-[9px] font-black text-red-400">● Aujourd'hui</span>}
                          {!tod&&soon && <span className="text-[9px] font-black text-amber-400">● Bientôt</span>}
                        </div>
                        <p className="text-white/90 text-[11px] font-semibold leading-snug mb-0.5">{c.categorie}</p>
                        <p className="text-white/50 text-[10px] leading-snug mb-1">{c.club}</p>
                        {c.info && <p className="text-white/30 text-[9px] italic mb-1">{c.info}</p>}
                        <div className="flex items-center gap-1 text-[9px] text-white/40"><Calendar size={9}/><span>{formatDate(c.date)}{c.dateFin&&c.dateFin!==c.date?` › ${formatDate(c.dateFin)}`:''}</span></div>
                        {ml && <button onClick={()=>onVideoSelect(ml)} className={`mt-2 w-full py-1.5 rounded text-[9px] font-black uppercase flex items-center justify-center gap-1 ${ml.isLive?'bg-red-600':'bg-amber-600'} text-white`}><Radio size={9}/>{ml.isLive?'Voir le direct':'Live à venir'}</button>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}


        {ahpGroups.map((g,i) => (
          <Marker key={`ahp-${i}`} position={[g.lat, g.lng]} icon={getAHPIcon(g.items as ConcourAHP[])}>
            <Popup className="ahrena-popup" maxWidth={300}>
              <div className="bg-zinc-900 text-white rounded-xl overflow-hidden border border-white/10 w-72">
                <div className="px-4 py-3 bg-lime-700">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-white flex-shrink-0"/>
                    <div><p className="font-black text-sm">{g.ville}</p><p className="text-white/80 text-[10px]">Alpes-de-Haute-Provence (04) · {g.items.length} concours</p></div>
                  </div>
                </div>
                <DeptLinks facebook={DEPT_AHP.facebook} site={DEPT_AHP.site} nom="04" />
                <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                  {(g.items as ConcourAHP[]).slice().sort((a,b)=>a.date.localeCompare(b.date)).map((c,j) => {
                    const tod = isToday(c.date,c.dateFin);
                    const soon = inDays(c.date,30);
                    return (
                      <div key={j} className={`p-3 ${tod?'bg-red-950/30':soon?'bg-amber-950/20':''}`}>
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${TYPE_COLORS[c.type]||'bg-zinc-700 text-zinc-300'}`}>{c.type}</span>
                          <span className="text-[9px] text-white/30">{c.format}</span>
                          {tod && <span className="text-[9px] font-black text-red-400">● Aujourd'hui</span>}
                          {!tod&&soon && <span className="text-[9px] font-black text-amber-400">● Bientôt</span>}
                        </div>
                        <p className="text-white/90 text-[11px] font-semibold leading-snug mb-0.5">{c.categorie}</p>
                        <p className="text-white/50 text-[10px] leading-snug mb-1">{c.club}</p>
                        {c.info && <p className="text-white/30 text-[9px] italic mb-1">{c.info}</p>}
                        <div className="flex items-center gap-1 text-[9px] text-white/40"><Calendar size={9}/><span>{formatDate(c.date)}{c.dateFin&&c.dateFin!==c.date?` › ${formatDate(c.dateFin)}`:''}</span></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}


        {amGroups.map((g,i) => (
          <Marker key={`am-${i}`} position={[g.lat, g.lng]} icon={getAMIcon(g.items as ConcourAM[])}>
            <Popup className="ahrena-popup" maxWidth={300}>
              <div className="bg-zinc-900 text-white rounded-xl overflow-hidden border border-white/10 w-72">
                <div className="px-4 py-3" style={{background:'#0066CC'}}>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-white flex-shrink-0"/>
                    <div><p className="font-black text-sm">{g.ville}</p><p className="text-white/80 text-[10px]">Alpes-Maritimes (06) · {g.items.length} concours</p></div>
                  </div>
                </div>
                <DeptLinks facebook={DEPT_AM.facebook} site={DEPT_AM.site} nom="06" />
                <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                  {(g.items as ConcourAM[]).slice().sort((a,b)=>a.date.localeCompare(b.date)).map((c,j) => {
                    const tod = isToday(c.date,c.dateFin);
                    const soon = inDays(c.date,30);
                    return (
                      <div key={j} className={`p-3 ${tod?'bg-red-950/30':soon?'bg-amber-950/20':''}`}>
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${TYPE_COLORS[c.type]||'bg-zinc-700 text-zinc-300'}`}>{c.type}</span>
                          <span className="text-[9px] text-white/30">{c.format}</span>
                          {tod && <span className="text-[9px] font-black text-red-400">● Aujourd'hui</span>}
                          {!tod&&soon && <span className="text-[9px] font-black text-amber-400">● Bientôt</span>}
                        </div>
                        <p className="text-white/90 text-[11px] font-semibold leading-snug mb-0.5">{c.intitule}</p>
                        <p className="text-white/50 text-[10px] leading-snug mb-1">{c.club}</p>
                        {c.dotation && <p className="text-amber-400 text-[9px] font-bold mb-1">💰 {c.dotation}</p>}
                        {c.limite && <p className="text-white/30 text-[9px] italic mb-1">Limité à {c.limite} équipes</p>}
                        {c.info && <p className="text-white/30 text-[9px] italic mb-1">{c.info}</p>}
                        <div className="flex items-center gap-1 text-[9px] text-white/40"><Calendar size={9}/><span>{formatDate(c.date)}{c.dateFin&&c.dateFin!==c.date?` › ${formatDate(c.dateFin)}`:''}</span>{c.horaire&&<span>· {c.horaire}</span>}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}


        {ardecheGroups.map((g,i) => (
          <Marker key={`ardeche-${i}`} position={[g.lat, g.lng]} icon={getArdecheIcon(g.items as ConcourArdeche[])}>
            <Popup className="ahrena-popup" maxWidth={300}>
              <div className="bg-zinc-900 text-white rounded-xl overflow-hidden border border-white/10 w-72">
                <div className="px-4 py-3" style={{background:'#c2410c'}}>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-white flex-shrink-0"/>
                    <div><p className="font-black text-sm">{g.ville}</p><p className="text-white/80 text-[10px]">Ardèche (07) · {g.items.length} concours</p></div>
                  </div>
                </div>
                <DeptLinks facebook={DEPT_ARDECHE.facebook} site={DEPT_ARDECHE.site} nom="07" />
                <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                  {(g.items as ConcourArdeche[]).slice().sort((a,b)=>a.date.localeCompare(b.date)).map((c,j) => {
                    const tod = isToday(c.date);
                    const soon = inDays(c.date, 30);
                    return (
                      <div key={j} className={`p-3 ${tod?'bg-red-950/30':soon?'bg-amber-950/20':''}`}>
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${TYPE_COLORS[c.type]||'bg-zinc-700 text-zinc-300'}`}>{c.type}</span>
                          <span className="text-[9px] text-white/30">{c.format}</span>
                          {tod && <span className="text-[9px] font-black text-red-400">● Aujourd'hui</span>}
                          {!tod&&soon && <span className="text-[9px] font-black text-amber-400">● Bientôt</span>}
                        </div>
                        <p className="text-white/90 text-[11px] font-semibold leading-snug mb-0.5">{c.intitule}</p>
                        <p className="text-white/50 text-[10px] leading-snug mb-1">{c.club}</p>
                        {c.dotation && <p className="text-amber-400 text-[9px] font-bold mb-1">💰 {c.dotation}</p>}
                        {c.limite && <p className="text-white/30 text-[9px] italic mb-1">Lim. {c.limite} éq.</p>}
                        {c.info && <p className="text-white/30 text-[9px] italic mb-1">{c.info}</p>}
                        {c.contact && <p className="text-white/30 text-[9px] mb-1">📞 {c.contact}</p>}
                        <div className="flex items-center gap-1 text-[9px] text-white/40"><Calendar size={9}/><span>{formatDate(c.date)}</span>{c.horaire&&<span>· {c.horaire}</span>}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}


        {regGroups.map((g,i) => (
          <Marker key={`reg-${i}`} position={[g.lat, g.lng]} icon={createRegionalIcon('#f59e0b', (g.items[0] as ConcourRegional).categorie, isToday((g.items[0] as ConcourRegional).date, (g.items[0] as ConcourRegional).dateFin))}>
            <Popup className="ahrena-popup" maxWidth={300}>
              <div className="bg-zinc-900 text-white rounded-xl overflow-hidden border border-white/10 w-72">
                <div className="px-4 py-3 bg-amber-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-white flex-shrink-0"/>
                    <div><p className="font-black text-sm">{g.ville}</p><p className="text-white/80 text-[10px]">Régional · {g.items.length} concours</p></div>
                  </div>
                </div>
                <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                  {(g.items as ConcourRegional[]).slice().sort((a,b)=>a.date.localeCompare(b.date)).map((c,j) => {
                    const tod = isToday(c.date,c.dateFin);
                    const soon = inDays(c.date,30);
                    return (
                      <div key={j} className={`p-3 ${tod?'bg-red-950/30':soon?'bg-amber-950/20':''}`}>
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded uppercase bg-amber-600/20 text-amber-400">RÉGIONAL</span>
                          <span className="text-[9px] text-white/30">{c.format}</span>
                          {tod && <span className="text-[9px] font-black text-red-400">● Aujourd'hui</span>}
                          {!tod&&soon && <span className="text-[9px] font-black text-amber-400">● Bientôt</span>}
                        </div>
                        <p className="text-white/90 text-[11px] font-semibold leading-snug mb-0.5">{c.categorie}</p>
                        <p className="text-white/50 text-[10px] leading-snug mb-1">{c.club}</p>
                        {c.info && <p className="text-white/30 text-[9px] italic mb-1">{c.info}</p>}
                        <div className="flex items-center gap-1 text-[9px] text-white/40"><Calendar size={9}/><span>{formatDate(c.date)}{c.dateFin&&c.dateFin!==c.date?` › ${formatDate(c.dateFin)}`:''}</span></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>

      {/* Menu filtres plein écran */}
      <div className={`absolute inset-0 z-[700] bg-zinc-950 transition-all duration-300 ease-out flex flex-col ${panelOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

        {/* Header fixe */}
        <div className="flex-shrink-0 px-5 pt-6 pb-4 border-b border-white/8">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center">
                <SlidersHorizontal size={15} className="text-white"/>
              </div>
              <div>
                <h2 className="font-black text-white text-lg uppercase tracking-wide leading-none">Filtres</h2>
                <p className="text-white/30 text-[10px] mt-0.5">{total} résultat{total>1?'s':''} trouvé{total>1?'s':''}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeCount > 0 && (
                <button onClick={reset} className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white/60 hover:text-white px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wide transition-all">
                  <RotateCcw size={11}/>Reset
                </button>
              )}
              <button onClick={()=>setPanelOpen(false)} className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors">
                <X size={16} className="text-white"/>
              </button>
            </div>
          </div>

          {/* Badges filtres actifs */}
          {activeCount > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {periode !== "Toute l'année" && <span className="bg-red-600/20 text-red-400 text-[10px] font-bold px-2 py-1 rounded-lg border border-red-600/30">{periode}</span>}
              {couche !== 'Tout afficher' && <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-2 py-1 rounded-lg border border-blue-600/30">{couche}</span>}
              {categorie !== 'Tous' && <span className="bg-purple-600/20 text-purple-400 text-[10px] font-bold px-2 py-1 rounded-lg border border-purple-600/30">{categorie}</span>}
              {format !== 'Tous' && <span className="bg-emerald-600/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-lg border border-emerald-600/30">{format}</span>}
              {type !== 'Tous' && <span className="bg-amber-600/20 text-amber-400 text-[10px] font-bold px-2 py-1 rounded-lg border border-amber-600/30">{type}</span>}
              {region !== 'Toutes' && <span className="bg-cyan-600/20 text-cyan-400 text-[10px] font-bold px-2 py-1 rounded-lg border border-cyan-600/30">{region}</span>}
            </div>
          )}
        </div>

        {/* Accordéons scrollables */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">

          <Accordion
            title="Période" icon="📅"
            value={periode} open={openAccordion==='periode'}
            onToggle={()=>toggleAccordion('periode')}
          >
            {PERIODES.map(p=><Pill key={p} label={p} active={periode===p} onClick={()=>setPeriode(p)}/>)}
          </Accordion>

          <Accordion
            title="Affichage carte" icon="🗺"
            value={couche} open={openAccordion==='couche'}
            onToggle={()=>toggleAccordion('couche')}
          >
            {COUCHES.map(c=><Pill key={c} label={c} active={couche===c} onClick={()=>setCouche(c)}/>)}
          </Accordion>

          <Accordion
            title="Catégorie" icon="👤"
            value={categorie} open={openAccordion==='categorie'}
            onToggle={()=>toggleAccordion('categorie')}
          >
            {CATEGORIES.map(c=><Pill key={c} label={c} active={categorie===c} onClick={()=>setCategorie(c)}/>)}
          </Accordion>

          <Accordion
            title="Format" icon="🎯"
            value={format} open={openAccordion==='format'}
            onToggle={()=>toggleAccordion('format')}
          >
            {FORMATS.map(f=><Pill key={f} label={f} active={format===f} onClick={()=>setFormat(f)}/>)}
          </Accordion>

          <Accordion
            title="Type de concours" icon="🏆"
            value={type} open={openAccordion==='type'}
            onToggle={()=>toggleAccordion('type')}
          >
            {TYPES.map(t=><Pill key={t} label={t} active={type===t} onClick={()=>setType(t)}/>)}
          </Accordion>

          <Accordion
            title="Région" icon="📍"
            value={region} open={openAccordion==='region'}
            onToggle={()=>toggleAccordion('region')}
          >
            {REGIONS.map(r=><Pill key={r} label={r} active={region===r} onClick={()=>setRegion(r)}/>)}
          </Accordion>

        </div>

        {/* Bouton voir résultats fixe en bas */}
        <div className="flex-shrink-0 px-4 pb-8 pt-3 border-t border-white/8">
          <button
            onClick={()=>setPanelOpen(false)}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-3 shadow-xl shadow-red-900/30"
          >
            <span>Voir les {total} résultats</span>
            {activeCount > 0 && <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">{activeCount} filtre{activeCount>1?'s':''}</span>}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @keyframes ping{75%,100%{transform:scale(2);opacity:0}}
        .leaflet-control-attribution { display: none !important; }
        .leaflet-control-container .leaflet-bottom { display: none !important; }
        .ahrena-popup .leaflet-popup-content-wrapper{background:transparent!important;padding:0!important;box-shadow:none!important;border-radius:12px!important}
        .ahrena-popup .leaflet-popup-tip{background:#18181b!important}
        .ahrena-popup .leaflet-popup-content{margin:0!important;width:auto!important}
        .leaflet-control-zoom{display:none}
      `}}/>
    </div>
  );
};

export default MapComponent;
