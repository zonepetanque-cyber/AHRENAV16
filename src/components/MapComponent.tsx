import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Video } from '../services/youtubeService';
import { NATIONAUX_2026, National } from '../data/nationaux2026';
import { CONCOURS_ALLIER_2026, ConcourAllier } from '../data/allier2026';
import { Calendar, MapPin, Users, Radio, SlidersHorizontal, X, RotateCcw } from 'lucide-react';

const createIcon = (color: string, pulse = false, size = 32) => L.divIcon({
  className: '',
  html: `<div style="position:relative;width:${size}px;height:${size}px;">${pulse ? `<div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.3;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>` : ''}<div style="position:absolute;inset:${size/8}px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.5);"></div></div>`,
  iconSize: [size, size], iconAnchor: [size/2, size/2], popupAnchor: [0, -size/2],
});

const ICON_NATIONAL      = createIcon('#3b82f6');
const ICON_NATIONAL_LIVE = createIcon('#dc2626', true);
const ICON_NATIONAL_SOON = createIcon('#d97706');
const ICON_ALLIER        = createIcon('#10b981', false, 24);
const ICON_ALLIER_SOON   = createIcon('#f59e0b', false, 24);
const ICON_ALLIER_TODAY  = createIcon('#ef4444', true, 24);
const ICON_ALLIER_CHAMP  = createIcon('#8b5cf6', false, 24);
const ICON_ALLIER_SPEC   = createIcon('#ec4899', false, 24);

const CATEGORIES = ['Tous', 'Sénior', 'Vétéran', 'Féminin', 'Mixte', 'Jeunes', 'Jeu Provençal'];
const FORMATS    = ['Tous', 'Triplette', 'Doublette', 'Tête à tête', 'Individuel', 'Enduro'];
const TYPES      = ['Tous', 'Concours', 'Départemental', 'Régional', 'National', 'International', 'Supra-national', 'Championnat', 'Autre'];
const PERIODES   = ["Toute l'année", "Aujourd'hui", 'Cette semaine', 'Ce mois', '3 prochains mois'];
const COUCHES    = ['Tout afficher', 'Nationaux seulement', 'Allier (03) seulement'];

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

function groupByLoc<T extends {lat:number;lng:number;ville:string}>(items: T[], p=2) {
  const map = new Map<string,T[]>();
  items.forEach(n => { const k=`${n.lat.toFixed(p)},${n.lng.toFixed(p)}`; if(!map.has(k)) map.set(k,[]); map.get(k)!.push(n); });
  return Array.from(map.values()).map(arr => ({lat:arr[0].lat,lng:arr[0].lng,ville:arr[0].ville,items:arr}));
}

const Pill = ({label,active,onClick}:{label:string;active:boolean;onClick:()=>void}) => (
  <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border ${active ? 'bg-red-600 text-white border-red-500' : 'bg-zinc-900 text-white/60 border-white/10 hover:border-white/30'}`}>{label}</button>
);

const Section = ({title,children}:{title:string;children:React.ReactNode}) => (
  <div className="mb-5">
    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{title}</p>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const MapComponent = ({ videos, onVideoSelect }: { videos: Video[], onVideoSelect: (v: Video) => void }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [periode, setPeriode]     = useState("Toute l'année");
  const [categorie, setCategorie] = useState('Tous');
  const [format, setFormat]       = useState('Tous');
  const [type, setType]           = useState('Tous');
  const [region, setRegion]       = useState('Toutes');
  const [couche, setCouche]       = useState('Tout afficher');

  const activeCount = [periode!=="Toute l'année",categorie!=='Tous',format!=='Tous',type!=='Tous',region!=='Toutes',couche!=='Tout afficher'].filter(Boolean).length;

  const reset = () => { setPeriode("Toute l'année"); setCategorie('Tous'); setFormat('Tous'); setType('Tous'); setRegion('Toutes'); setCouche('Tout afficher'); };

  const getNatStatus = (n: National) => {
    if (isToday(n.dateDebut, n.dateFin)) return videos.some(v => v.isLive && v.title.toLowerCase().includes(n.ville.toLowerCase())) ? 'live' : 'today';
    if (inDays(n.dateDebut, 30)) return 'upcoming';
    return 'normal';
  };

  const filteredNat = useMemo(() => couche === 'Allier (03) seulement' ? [] : NATIONAUX_2026.filter(n => {
    if (!matchPeriode(periode, n.dateDebut, n.dateFin)) return false;
    if (!matchCategorie(categorie, n.categorie)) return false;
    if (!matchFormat(format, n.format)) return false;
    if (type !== 'Tous' && !matchType(type, 'NATIONAL')) return false;
    if (region !== 'Toutes' && DEPT_REGIONS[n.departement] !== region) return false;
    return true;
  }), [periode, categorie, format, type, region, couche]);

  const filteredAl = useMemo(() => couche === 'Nationaux seulement' ? [] : CONCOURS_ALLIER_2026.filter(c => {
    if (!matchPeriode(periode, c.date, c.dateFin)) return false;
    if (!matchCategorie(categorie, c.categorie)) return false;
    if (!matchFormat(format, c.format)) return false;
    if (!matchType(type, c.type)) return false;
    if (region !== 'Toutes' && region !== 'Auvergne-Rhône-Alpes') return false;
    return true;
  }), [periode, categorie, format, type, region, couche]);

  const total = filteredNat.length + filteredAl.length;

  const natGroups = useMemo(() => groupByLoc(filteredNat as any[]), [filteredNat]);
  const alGroups  = useMemo(() => groupByLoc(filteredAl as any[], 3), [filteredAl]);

  const getNatIcon = (items: National[]) => {
    const s = items.map(getNatStatus);
    if (s.includes('live')) return ICON_NATIONAL_LIVE;
    if (s.includes('today')||s.includes('upcoming')) return ICON_NATIONAL_SOON;
    return ICON_NATIONAL;
  };
  const getNatColor = (items: National[]) => {
    const s = items.map(getNatStatus);
    if (s.includes('live')) return 'bg-red-600';
    if (s.includes('today')||s.includes('upcoming')) return 'bg-amber-600';
    return 'bg-blue-600';
  };
  const getAlIcon = (items: ConcourAllier[]) => {
    if (items.some(c => isToday(c.date, c.dateFin))) return ICON_ALLIER_TODAY;
    if (items.some(c => inDays(c.date, 30))) return ICON_ALLIER_SOON;
    const t = items.map(i => i.type);
    if (t.some(x => ['NATIONAL','SPÉCIAL','INTERNATIONAL'].includes(x))) return ICON_ALLIER_SPEC;
    if (t.some(x => ['CHAMPIONNAT','RÉGIONAL'].includes(x))) return ICON_ALLIER_CHAMP;
    return ICON_ALLIER;
  };

  return (
    <div className="relative" style={{height:'calc(100vh - 120px)'}}>

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
          {color:'bg-blue-500',label:'Nationaux FFPJP'},
          {color:'bg-emerald-500',label:'Concours Allier (03)'},
          {color:'bg-purple-500',label:'Championnats / Régionaux'},
          {color:'bg-pink-500',label:'Nationaux / Spéciaux'},
          {color:'bg-amber-500',label:'Dans les 30 jours'},
          {color:'bg-red-500 animate-pulse',label:"Aujourd'hui / Live"},
        ].map((l,i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${l.color}`}/>
            <span className="text-white/50">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Carte */}
      <MapContainer center={[46.5, 2.5]} zoom={6} style={{height:'100%',width:'100%'}} zoomControl={false}>
        <TileLayer attribution='&copy; OpenStreetMap contributors &copy; CARTO' url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

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
      </MapContainer>

      {/* Overlay */}
      {panelOpen && <div className="absolute inset-0 bg-black/50 z-[600] backdrop-blur-sm" onClick={()=>setPanelOpen(false)}/>}

      {/* Panneau coulissant */}
      <div className={`absolute left-0 right-0 bottom-0 z-[700] bg-zinc-950 border-t border-white/10 rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${panelOpen?'translate-y-0':'translate-y-full'}`} style={{maxHeight:'82vh',overflowY:'auto'}}>

        {/* Poignée */}
        <div className="flex justify-center pt-3 pb-1 sticky top-0 bg-zinc-950 z-10">
          <div className="w-10 h-1 bg-white/20 rounded-full"/>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 sticky top-6 bg-zinc-950 z-10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-red-500"/>
            <span className="font-black text-white uppercase tracking-wider text-sm">Filtres</span>
            {activeCount > 0 && <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{activeCount} actif{activeCount>1?'s':''}</span>}
          </div>
          <div className="flex items-center gap-3">
            {activeCount > 0 && (
              <button onClick={reset} className="flex items-center gap-1 text-white/40 hover:text-white text-[10px] uppercase tracking-wider font-bold transition-colors">
                <RotateCcw size={11}/>Réinitialiser
              </button>
            )}
            <button onClick={()=>setPanelOpen(false)} className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
              <X size={14} className="text-white"/>
            </button>
          </div>
        </div>

        {/* Filtres */}
        <div className="px-5 pt-5 pb-8">

          {/* Compteur résultats */}
          <div className="mb-5 p-3 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-between">
            <span className="text-white/40 text-xs">Résultats correspondants</span>
            <span className="font-black text-white text-2xl">{total}</span>
          </div>

          <Section title="📅 Période">
            {PERIODES.map(p=><Pill key={p} label={p} active={periode===p} onClick={()=>setPeriode(p)}/>)}
          </Section>

          <Section title="🗺 Affichage">
            {COUCHES.map(c=><Pill key={c} label={c} active={couche===c} onClick={()=>setCouche(c)}/>)}
          </Section>

          <Section title="👤 Catégorie">
            {CATEGORIES.map(c=><Pill key={c} label={c} active={categorie===c} onClick={()=>setCategorie(c)}/>)}
          </Section>

          <Section title="🎯 Format">
            {FORMATS.map(f=><Pill key={f} label={f} active={format===f} onClick={()=>setFormat(f)}/>)}
          </Section>

          <Section title="🏆 Type de concours">
            {TYPES.map(t=><Pill key={t} label={t} active={type===t} onClick={()=>setType(t)}/>)}
          </Section>

          <Section title="📍 Région">
            {REGIONS.map(r=><Pill key={r} label={r} active={region===r} onClick={()=>setRegion(r)}/>)}
          </Section>

          <button onClick={()=>setPanelOpen(false)} className="w-full mt-2 bg-red-600 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-sm hover:bg-red-700 transition-colors">
            Voir les {total} résultats
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @keyframes ping{75%,100%{transform:scale(2);opacity:0}}
        .ahrena-popup .leaflet-popup-content-wrapper{background:transparent!important;padding:0!important;box-shadow:none!important;border-radius:12px!important}
        .ahrena-popup .leaflet-popup-tip{background:#18181b!important}
        .ahrena-popup .leaflet-popup-content{margin:0!important;width:auto!important}
        .leaflet-control-zoom{display:none}
      `}}/>
    </div>
  );
};

export default MapComponent;
