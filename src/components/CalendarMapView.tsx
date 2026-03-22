import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Types minimaux nécessaires
interface UnifiedEvent {
  id: string; date: string; dateFin?: string; title: string;
  ville?: string; source: string; typeEvent?: string; raw: any;
}

const SOURCE_COLOR: Record<string,string> = {
  allier:'#10b981',nievre:'#ea580c',ain:'#8b5cf6',aisne:'#06b6d4',
  ahp:'#84cc16',am:'#0066CC',ardeche:'#f97316',ariege:'#e11d48',
  aube:'#f43f5e',aude:'#a855f7',aveyron:'#f97316',bdr:'#ef4444',
  calvados:'#3b82f6',cantal:'#d97706',charente_maritime:'#0891b2',
  cher:'#dc2626',correze:'#7e22ce',corse2a:'#e8a020',corse2b:'#9333ea',
  cotedor:'#c2410c',cotesdarmor:'#0369a1',creuse:'#7e22ce',
  dordogne:'#16a34a',doubs:'#6366f1',drome:'#f97316',eure:'#8b5cf6',
  eureetloir:'#10b981',national:'#dc2626',regional:'#dc2626',
  jeunes:'#f59e0b',live:'#ef4444',
};
const SOURCE_LABEL: Record<string,string> = {
  allier:'Allier (03)',nievre:'Nièvre (58)',ain:'Ain (01)',aisne:'Aisne (02)',
  ahp:'AHP (04)',am:'Alpes-Mar. (06)',ardeche:'Ardèche (07)',ariege:'Ariège (09)',
  aube:'Aube (10)',aude:'Aude (11)',aveyron:'Aveyron (12)',bdr:'BDR (13)',
  calvados:'Calvados (14)',cantal:'Cantal (15)',charente_maritime:'Char.-Mar. (17)',
  cher:'Cher (18)',correze:'Corrèze (19)',corse2a:'Corse-2A',corse2b:'Haute-Corse',
  cotedor:"Côte-d'Or (21)",cotesdarmor:"Côtes-d'Armor (22)",creuse:'Creuse (23)',
  dordogne:'Dordogne (24)',doubs:'Doubs (25)',drome:'Drôme (26)',eure:'Eure (27)',
  eureetloir:'Eure-et-Loir (28)',national:'National',regional:'Régional',
  jeunes:'Circuit Jeunes',live:'Live',
};

const FitBounds = ({ pts }: { pts: [number,number][] }) => {
  const map = useMap();
  React.useEffect(() => {
    if (pts.length === 0) return;
    try { map.fitBounds(pts, { padding: [40,40], maxZoom: 10 }); } catch {}
  }, [pts.length]);
  return null;
};

const createIcon = (color: string, type: string) => {
  const size = type === 'NATIONAL' ? 20 : (type === 'RÉGIONAL' || type === 'REGIONAL') ? 16 : 12;
  const shape = type === 'NATIONAL'
    ? `<polygon points="10,1 12,7 19,7 13,12 15,19 10,14 5,19 7,12 1,7 8,7" fill="${color}" stroke="white" stroke-width="1.5"/>`
    : (type === 'RÉGIONAL' || type === 'REGIONAL')
      ? `<rect x="3" y="3" width="14" height="14" transform="rotate(45 10 10)" fill="${color}" stroke="white" stroke-width="1.5"/>`
      : `<circle cx="10" cy="10" r="8" fill="${color}" stroke="white" stroke-width="1.5"/>`;
  return L.divIcon({
    className: '',
    html: `<svg width="${size}" height="${size}" viewBox="0 0 20 20">${shape}</svg>`,
    iconSize: [size, size], iconAnchor: [size/2, size/2], popupAnchor: [0, -size/2],
  });
};

interface MapViewProps {
  events: UnifiedEvent[];
  onSelect: (ev: UnifiedEvent) => void;
}

const CalendarMapView: React.FC<MapViewProps> = ({ events, onSelect }) => {
  const mappable = React.useMemo(() =>
    events.filter(ev => ev.raw?.lat && ev.raw?.lng && !isNaN(Number(ev.raw.lat))),
  [events]);

  const grouped = React.useMemo(() => {
    const map = new Map<string, UnifiedEvent[]>();
    mappable.forEach(ev => {
      const key = `${Number(ev.raw.lat).toFixed(3)},${Number(ev.raw.lng).toFixed(3)}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    });
    return map;
  }, [mappable]);

  const pts: [number,number][] = mappable.map(e => [e.raw.lat, e.raw.lng]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MapContainer center={[46.8, 2.3]} zoom={6} style={{ width: '100%', height: '100%' }} zoomControl={true}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="© CARTO"
        />
        <FitBounds pts={pts} />
        {Array.from(grouped.entries()).map(([key, evs]) => {
          const ev = evs[0];
          const color = SOURCE_COLOR[ev.source] || '#dc2626';
          return (
            <Marker
              key={key}
              position={[ev.raw.lat, ev.raw.lng]}
              icon={createIcon(color, ev.typeEvent || 'CONCOURS')}
              eventHandlers={{ click: () => evs.length === 1 && onSelect(ev) }}
            >
              {evs.length > 1 && (
                <Popup>
                  <div style={{ background: '#18181b', borderRadius: 10, padding: 8, minWidth: 180 }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, margin: '0 0 6px' }}>
                      {evs.length} concours · {ev.ville}
                    </p>
                    {evs.map(e => (
                      <button key={e.id} onClick={() => onSelect(e)}
                        style={{ display: 'block', width: '100%', textAlign: 'left', padding: '4px 0',
                          borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'white', fontSize: 11, fontWeight: 700 }}>
                        {e.title}
                        <span style={{ color: SOURCE_COLOR[e.source], fontSize: 9, marginLeft: 6 }}>{SOURCE_LABEL[e.source]}</span>
                      </button>
                    ))}
                  </div>
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default CalendarMapView;
