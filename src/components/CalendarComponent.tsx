import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isFav, toggleFav, FavConcours } from '../services/favoritesService';

import { motion, AnimatePresence } from 'motion/react';
import { Video } from '../services/youtubeService';
import { NATIONAUX_2026, National } from '../data/nationaux2026';
import { CONCOURS_ALLIER_2026, ConcourAllier, DEPT_ALLIER } from '../data/allier2026';
import { CONCOURS_NIEVRE_2026, ConcourNievre, DEPT_NIEVRE } from '../data/nievre2026';
import { CONCOURS_AIN_2026, ConcourAin, DEPT_AIN } from '../data/ain2026';
import { CONCOURS_AISNE_2026, DEPT_AISNE } from '../data/aisne2026';
import { CONCOURS_AHP_2026, DEPT_AHP } from '../data/ahp2026';
import { CONCOURS_REGIONAUX_2026 } from '../data/regionaux2026';
import { CONCOURS_AM_2026, DEPT_AM } from '../data/am2026';
import { CONCOURS_ARDECHE_2026, DEPT_ARDECHE } from '../data/ardeche2026';
import { CONCOURS_ARIEGE_2026, DEPT_ARIEGE } from '../data/ariege2026';
import { CONCOURS_AUBE_2026, DEPT_AUBE } from '../data/aube2026';
import { CONCOURS_AUDE_2026, DEPT_AUDE } from '../data/aude2026';
import { CONCOURS_AVEYRON_2026, DEPT_AVEYRON } from '../data/aveyron2026';
import { CONCOURS_BDR_2026, DEPT_BDR } from '../data/bdr2026';
import { CONCOURS_CALVADOS_2026, DEPT_CALVADOS } from '../data/calvados2026';
import { CONCOURS_JEUNES_2026, SOURCE_JEUNES } from '../data/jeunes2026';
import { CONCOURS_CANTAL_2026, DEPT_CANTAL } from '../data/cantal2026';
import { CONCOURS_CHARENTE_MARITIME_2026, DEPT_CHARENTE_MARITIME } from '../data/charentemaritime2026';
import { CONCOURS_CHER_2026, DEPT_CHER } from '../data/cher2026';
import { CONCOURS_CORREZE_2026, DEPT_CORREZE } from '../data/correze2026';
import { CONCOURS_CORSE2A_2026, DEPT_CORSE2A } from '../data/corse2a2026';
import { CONCOURS_CORSE2B_2026, DEPT_CORSE2B } from '../data/corse2b2026';
import { CONCOURS_COTEDOR_2026, DEPT_COTEDOR } from '../data/cotedor2026';
import { CONCOURS_COTESDARMOR_2026, DEPT_COTESDARMOR } from '../data/cotesdarmor2026';
import { CONCOURS_CREUSE_2026, DEPT_CREUSE } from '../data/creuse2026';
import { CONCOURS_DORDOGNE_2026, DEPT_DORDOGNE } from '../data/dordogne2026';
import {
  Calendar as CalendarIcon, Clock,
  List, MapPin, SlidersHorizontal, X, RotateCcw, Check, Radio, ChevronDown
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
const MONTHS_SHORT = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
const DAYS_FR   = ['L','M','M','J','V','S','D'];

// ── Source meta ───────────────────────────────────────────────
type EventSource = 'live' | 'national' | 'allier' | 'nievre' | 'ain' | 'aisne' | 'ahp' | 'am' | 'ardeche' | 'ariege' | 'aube' | 'aude' | 'aveyron' | 'bdr' | 'calvados' | 'cantal' | 'charente_maritime' | 'cher' | 'correze' | 'corse2a' | 'corse2b' | 'cotedor' | 'cotesdarmor' | 'creuse' | 'dordogne' | 'jeunes' | 'regional';

const SOURCE_COLOR: Record<EventSource, string> = {
  live: '#dc2626', national: '#3b82f6', allier: '#10b981',
  nievre: '#f97316', ain: '#8b5cf6', aisne: '#06b6d4',
  ahp: '#84cc16', am: '#0066CC', ardeche: '#f97316', ariege: '#e11d48',
  aube: '#f43f5e', aude: '#a855f7', aveyron: '#f97316', bdr: '#ef4444', calvados: '#3b82f6', cantal: '#d97706', charente_maritime: '#0891b2', cher: '#dc2626', correze: '#7e22ce', corse2a: '#e8a020', corse2b: '#9333ea', cotedor: '#c2410c', cotesdarmor: '#0369a1', creuse: '#7e22ce', dordogne: '#16a34a', jeunes: '#10b981', regional: '#f59e0b',
};
const SOURCE_LABEL: Record<EventSource, string> = {
  live: 'Direct', national: 'National', allier: 'Allier (03)',
  nievre: 'Nièvre (58)', ain: 'Ain (01)', aisne: 'Aisne (02)',
  ahp: 'Alpes-de-Haute-Provence (04)', am: 'Alpes-Mar. (06)', ardeche: 'Ardèche (07)',
  ariege: 'Ariège (09)', aube: 'Aube (10)', aude: 'Aude (11)', aveyron: 'Aveyron (12)', bdr: 'Bouches-du-Rhône (13)', calvados: 'Calvados (14)', cantal: 'Cantal (15)', charente_maritime: 'Charente-Maritime (17)', cher: 'Cher (18)', correze: 'Corrèze (19)', corse2a: 'Corse-du-Sud (2A)', corse2b: 'Haute-Corse (2B)', cotedor: 'Côte-d\'Or (21)', cotesdarmor: 'Côtes-d\'Armor (22)', creuse: 'Creuse (23)', dordogne: 'Dordogne (24)', jeunes: 'Circuit National Jeunes', regional: 'Régionaux',
};

const DEPT_LINKS: Record<string, { facebook: string; site: string; code: string } | null> = {
  live: null, national: null, regional: null,
  allier:  { facebook: DEPT_ALLIER.facebook,  site: DEPT_ALLIER.site,  code: '03' },
  nievre:  { facebook: DEPT_NIEVRE.facebook,  site: DEPT_NIEVRE.site,  code: '58' },
  ain:     { facebook: DEPT_AIN.facebook,     site: DEPT_AIN.site,     code: '01' },
  aisne:   { facebook: DEPT_AISNE.facebook,   site: DEPT_AISNE.site,   code: '02' },
  ahp:     { facebook: DEPT_AHP.facebook,     site: DEPT_AHP.site,     code: '04' },
  am:      { facebook: DEPT_AM.facebook,      site: DEPT_AM.site,      code: '06' },
  ardeche: { facebook: DEPT_ARDECHE.facebook, site: DEPT_ARDECHE.site, code: '07' },
  ariege:  { facebook: DEPT_ARIEGE.facebook,  site: DEPT_ARIEGE.site,  code: '09' },
  aube:    { facebook: DEPT_AUBE.facebook,    site: DEPT_AUBE.site,    code: '10' },
  aude:    { facebook: DEPT_AUDE.facebook,    site: DEPT_AUDE.site,    code: '11' },
  aveyron: { facebook: DEPT_AVEYRON.facebook, site: DEPT_AVEYRON.site, code: '12' },
  bdr:     { facebook: DEPT_BDR.facebook,     site: DEPT_BDR.site,     code: '13' },
  calvados: { facebook: DEPT_CALVADOS.facebook, site: DEPT_CALVADOS.site, code: '14' },
  cantal:             { facebook: DEPT_CANTAL.facebook,             site: DEPT_CANTAL.site,             code: '15' },
  charente_maritime:  { facebook: DEPT_CHARENTE_MARITIME.facebook,  site: DEPT_CHARENTE_MARITIME.site,  code: '17' },
  cher:               { facebook: DEPT_CHER.facebook,              site: DEPT_CHER.site,              code: '18' },
  correze:            { facebook: DEPT_CORREZE.facebook,           site: DEPT_CORREZE.site,           code: '19' },
  corse2a:            { facebook: DEPT_CORSE2A.facebook,           site: DEPT_CORSE2A.site,           code: '2A' },
  corse2b:            { facebook: DEPT_CORSE2B.facebook,           site: DEPT_CORSE2B.site,           code: '2B' },
  cotedor:            { facebook: DEPT_COTEDOR.facebook,           site: DEPT_COTEDOR.site,           code: '21' },
  cotesdarmor:        { facebook: DEPT_COTESDARMOR.facebook,       site: DEPT_COTESDARMOR.site,       code: '22' },
  creuse:             { facebook: null,                              site: DEPT_CREUSE.site,             code: '23' },
  dordogne:           { facebook: DEPT_DORDOGNE.facebook,           site: null,                         code: '24' },
  jeunes:             { facebook: SOURCE_JEUNES.facebook,            site: SOURCE_JEUNES.site,           code: 'FR' },
};

// ── Départements disponibles pour l'accordéon ─────────────────
// Données brutes des départements — l'expiration est calculée dynamiquement
const DEPT_DATA: { key: EventSource | string; label: string; color: string; lastDate?: string }[] = [
  { key: 'ain',     label: 'Ain (01)',            color: '#8b5cf6' },
  { key: 'aisne',   label: 'Aisne (02)',          color: '#06b6d4' },
  { key: 'allier',  label: 'Allier (03)',         color: '#10b981' },
  { key: 'ahp',     label: 'Alpes-de-Haute-Provence (04)',            color: '#84cc16' },
  { key: 'hpa',     label: 'Hautes-Alpes (05)',   color: '#6b7280' },
  { key: 'am',      label: 'Alpes-Mar. (06)',     color: '#0066CC' },
  { key: 'ardeche', label: 'Ardèche (07)',        color: '#f97316' },
  { key: 'ardennes',label: 'Ardennes (08)',       color: '#6b7280' },
  { key: 'ariege',  label: 'Ariège (09)',         color: '#e11d48' },
  { key: 'aube',    label: 'Aube (10)',           color: '#f43f5e' },
  { key: 'aude',    label: 'Aude (11)',           color: '#a855f7' },
  { key: 'aveyron', label: 'Aveyron (12)',         color: '#f97316' },
  { key: 'bdr',     label: 'Bouches-du-Rhône (13)', color: '#ef4444' },
  { key: 'calvados', label: 'Calvados (14)',          color: '#3b82f6' },
  { key: 'cantal',              label: 'Cantal (15)',              color: '#d97706' },
  { key: 'charente',            label: 'Charente (16)',            color: '#6b7280' },
  { key: 'charente_maritime',   label: 'Charente-Maritime (17)',   color: '#0891b2' },
  { key: 'cher',                label: 'Cher (18)',                color: '#dc2626' },
  { key: 'correze',             label: 'Corrèze (19)',             color: '#7e22ce' },
  { key: 'corse2a',             label: 'Corse-du-Sud (2A)',        color: '#e8a020' },
  { key: 'corse2b',             label: 'Haute-Corse (2B)',         color: '#9333ea' },
  { key: 'cotedor',             label: 'Côte-d\'Or (21)',          color: '#c2410c' },
  { key: 'cotesdarmor',         label: 'Côtes-d\'Armor (22)',      color: '#0369a1' },
  { key: 'creuse',              label: 'Creuse (23)',               color: '#7e22ce' },
  { key: 'dordogne',            label: 'Dordogne (24)',              color: '#16a34a' },
  { key: 'nievre',  label: 'Nièvre (58)',         color: '#ea580c' },
];

// Dernière date connue par département (mise à jour automatiquement à chaque nouveau calendrier)
const DEPT_LAST_DATE: Record<string, string> = {
  ain:               '2027-01-01', // calendrier 2026-2027
  aisne:             '2026-12-31',
  allier:            '2027-02-28',
  ahp:               '2026-11-30',
  am:                '2026-12-31',
  ardeche:           '2026-12-31',
  ariege:            '2026-12-31',
  aube:              '2026-12-31',
  aude:              '2026-12-31',
  aveyron:           '2026-12-31',
  bdr:               '2026-12-31',
  calvados:          '2026-12-31',
  cantal:            '2026-12-31',
  charente_maritime: '2026-12-31',
  cher:              '2027-02-21',
  correze:           '2026-12-19',
  corse2a:           '2026-11-22',
  corse2b:           '2026-11-08',
  cotedor:           '2026-12-20',
  cotesdarmor:       '2026-12-13',
  creuse:            '2026-12-20',
  dordogne:          '2026-09-24',
  nievre:            '2026-12-31',
  national:          '2027-12-31',
  regional:          '2027-12-31',
  jeunes:            '2027-12-31',
};

// Calcule dynamiquement si un département a encore des événements à venir
// Un département devient grisé+barré automatiquement si sa dernière date est passée
const getDeptOptions = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return DEPT_DATA.map(d => {
    const lastDate = DEPT_LAST_DATE[d.key];
    const available = !lastDate || new Date(lastDate) >= today;
    return { ...d, available };
  });
};

const DEPT_OPTIONS = getDeptOptions();

// ── Géolocalisation — bounding boxes des départements disponibles ─
// [latMin, latMax, lngMin, lngMax]
const DEPT_BBOX: Record<string, [number, number, number, number]> = {
  ain:               [45.61, 46.53, 4.77,  5.92],
  aisne:             [49.17, 50.07, 3.07,  4.26],
  allier:            [45.97, 46.80, 2.52,  3.99],
  ahp:               [43.71, 44.69, 5.67,  6.94],
  am:                [43.47, 44.36, 6.62,  7.72],
  ardeche:           [44.24, 45.37, 3.86,  4.89],
  ariege:            [42.57, 43.30, 0.91,  2.07],
  aube:              [47.81, 48.78, 3.41,  4.82],
  aude:              [42.65, 43.60, 1.68,  3.24],
  aveyron:           [43.55, 44.92, 1.85,  3.40],
  bdr:               [43.16, 43.97, 4.63,  5.81],
  calvados:          [48.73, 49.37, -0.86, 0.48],
  cantal:            [44.63, 45.50, 2.07,  3.36],
  charente_maritime: [45.08, 46.36, -1.49, 0.07],
  cher:              [46.53, 47.62, 1.78,  3.07],
  correze:           [44.87, 45.77, 1.37,  2.60],
  corse2a:           [41.33, 42.38, 8.53,  9.41],
  corse2b:           [41.90, 43.03, 8.54,  9.57],
  cotedor:           [46.90, 48.01, 4.05,  5.54],
  cotesdarmor:       [48.10, 48.90, -3.70, -1.90],
  creuse:            [45.70, 46.50, 1.40,  2.50],
  dordogne:          [44.62, 45.65, 0.21,  1.47],
  nievre:            [46.56, 47.58, 3.07,  4.10],
};

// Retourne la clé du département qui contient la position GPS (disponible ou non)
const getDeptFromCoords = (lat: number, lng: number): { key: string; available: boolean } | null => {
  for (const [key, [latMin, latMax, lngMin, lngMax]] of Object.entries(DEPT_BBOX)) {
    if (lat >= latMin && lat <= latMax && lng >= lngMin && lng <= lngMax) {
      const dept = DEPT_OPTIONS.find(d => d.key === key);
      if (dept) return { key, available: dept.available };
    }
  }
  return null;
};


// ── Carte des départements limitrophes ────────────────────────
// Pour chaque dept disponible, liste ses voisins (clés de DEPT_DATA)
const LIMITROPHES: Record<string, string[]> = {
  ain:               ['isere', 'savoie', 'hte_savoie', 'jura', 'bresse', 'rhone', 'am'],
  aisne:             ['ardennes', 'marne', 'seine_marne', 'oise', 'somme', 'nord', 'pas_calais'],
  allier:            ['nievre', 'cher', 'creuse', 'puy_dome', 'loire', 'saone_loire'],
  ahp:               ['hpa', 'am', 'var', 'vaucluse', 'hte_alpes', 'bdr'],
  am:                ['ahp', 'var', 'bdr'],
  ardeche:           ['loire', 'hte_loire', 'lozere', 'gard', 'herault', 'drome', 'isere'],
  ariege:            ['hte_garonne', 'hte_pyrenees', 'aude', 'pyrenees_orientales'],
  aube:              ['marne', 'haute_marne', 'cote_or', 'yonne', 'seine_marne'],
  aude:              ['ariege', 'herault', 'gard', 'pyrenees_orientales', 'tarn', 'hte_garonne'],
  aveyron:           ['lozere', 'gard', 'herault', 'hte_garonne', 'tarn', 'tarn_garonne', 'lot', 'cantal'],
  bdr:               ['ahp', 'am', 'var', 'vaucluse'],
  calvados:          ['manche', 'orne', 'eure'],
  cantal:            ['aveyron', 'lozere', 'hte_loire', 'puy_dome', 'allier', 'creuse', 'correze'],
  charente_maritime: ['charente', 'deux_sevres', 'vendee', 'gironde'],
  cher:              ['allier', 'nievre', 'yonne', 'loiret', 'loir_cher', 'indre', 'creuse'],
  correze:           ['cantal', 'aveyron', 'lot', 'dordogne', 'creuse', 'hte_vienne'],
  dordogne:          ['correze', 'charente_maritime', 'charente', 'lot_et_garonne', 'lot', 'creuse', 'hte_vienne'],
  corse2a:           ['corse2b'],
  corse2b:           ['corse2a'],
  cotedor:           ['aube', 'yonne', 'nievre', 'saone_loire', 'jura', 'hte_saone'],
  nievre:            ['cher', 'allier', 'saone_loire', 'cotedor', 'yonne', 'loiret'],
};

// Retourne les clés des limitrophes disponibles dans l'appli
const getLimitrophes = (activeSources: Set<string>): string[] => {
  const available = new Set(DEPT_OPTIONS.filter(d => d.available).map(d => d.key));
  const result = new Set<string>();
  activeSources.forEach(src => {
    (LIMITROPHES[src] || []).forEach(neighbor => {
      if (available.has(neighbor) && !activeSources.has(neighbor)) {
        result.add(neighbor);
      }
    });
  });
  return Array.from(result);
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
  month: { month: number; year: number } | null; // null = tous
}

const FORMATIONS = ['Tête-à-Tête', 'Doublette', 'Triplette', 'Doublette mixte', 'Triplette mixte', 'En équipe (CDC, CRC, CNC)'];
const JOUEURS    = ['Jeune', 'Benjamins', 'Minimes', 'Cadets', 'Juniors', 'Sénior', 'Vétéran', 'Masculin', 'Féminin', 'Promotion', 'Jeu Provençal'];
const CAT_TYPES  = ['Départemental', 'Régional', 'National', 'Championnat', 'Circuit National Jeunes', 'Autres (mondial, coupes, tir…)'];

const makeDefaultFilters = (): AdvancedFilters => ({
  officiel: true, ouvert: true,
  formations: new Set(), joueurs: new Set(), categories: new Set(),
  sources: new Set(['all']),
  month: null,
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
    title: c.intitule || c.categorie, ville: c.ville, lieu: c.lieu, club: c.club, info: c.info,
    heure: c.heure,
    source: src, format: c.format, categorie: c.categorie, typeEvent: c.type, raw: c,
  }));

  addDept(CONCOURS_ALLIER_2026 as any[], 'allier');
  addDept(CONCOURS_NIEVRE_2026 as any[], 'nievre');
  addDept(CONCOURS_AIN_2026    as any[], 'ain');
  addDept(CONCOURS_AISNE_2026  as any[], 'aisne');
  addDept(CONCOURS_AHP_2026    as any[], 'ahp');
  addDept(CONCOURS_AM_2026     as any[], 'am');
  addDept(CONCOURS_ARDECHE_2026 as any[], 'ardeche');
  addDept(CONCOURS_ARIEGE_2026  as any[], 'ariege');
  addDept(CONCOURS_AUBE_2026    as any[], 'aube');
  addDept(CONCOURS_AUDE_2026    as any[], 'aude');
  addDept(CONCOURS_AVEYRON_2026 as any[], 'aveyron');
  addDept(CONCOURS_BDR_2026     as any[], 'bdr');
  addDept(CONCOURS_CALVADOS_2026 as any[], 'calvados');
  addDept(CONCOURS_CANTAL_2026            as any[], 'cantal');
  addDept(CONCOURS_CHARENTE_MARITIME_2026 as any[], 'charente_maritime');
    addDept(CONCOURS_CHER_2026 as any[], 'cher');
    addDept(CONCOURS_CORREZE_2026 as any[], 'correze');
    addDept(CONCOURS_CORSE2A_2026 as any[], 'corse2a');
    addDept(CONCOURS_CORSE2B_2026 as any[], 'corse2b');
    addDept(CONCOURS_COTEDOR_2026 as any[], 'cotedor');
    addDept(CONCOURS_COTESDARMOR_2026 as any[], 'cotesdarmor');
    addDept(CONCOURS_CREUSE_2026 as any[], 'creuse');
    addDept(CONCOURS_DORDOGNE_2026 as any[], 'dordogne');
  addDept(CONCOURS_JEUNES_2026            as any[], 'jeunes');

  CONCOURS_REGIONAUX_2026.forEach(c => events.push({
    id: `reg-${c.id}`, date: c.date, dateFin: (c as any).dateFin,
    title: c.categorie, ville: (c as any).ville, info: (c as any).info,
    source: 'regional', format: (c as any).format, categorie: c.categorie, typeEvent: 'RÉGIONAL', raw: c,
  }));

  return events.filter(ev => isUpcoming(ev.date, ev.dateFin));
}

// ── Appliquer filtres ─────────────────────────────────────────
function applyFilters(events: UnifiedEvent[], f: AdvancedFilters): UnifiedEvent[] {
  return events.filter(ev => {
    // Filtre source/département
    // Sources vides = aucun dept sélectionné → afficher quand même national/régional/live
    if (f.sources.size > 0) {
      const alwaysOn = new Set(['national', 'regional', 'jeunes', 'live']);
      if (!alwaysOn.has(ev.source) && !f.sources.has(ev.source)) return false;
    } else {
      // Aucun dept sélectionné → rien du tout
      return false;
    }

    // Filtre mois
    if (f.month !== null) {
      const d = new Date(ev.date);
      if (d.getMonth() !== f.month.month || d.getFullYear() !== f.month.year) return false;
    }

    if (f.formations.size > 0) {
      const c = ((ev.format || '') + ' ' + (ev.categorie || '')).toLowerCase();
      const ok =
        (f.formations.has('Tête-à-Tête') && (c.includes('tête') || c.includes('individuel') || c.includes('tàt') || c.includes('tat'))) ||
        (f.formations.has('Doublette') && c.includes('doublette') && !c.includes('mixte')) ||
        (f.formations.has('Triplette') && c.includes('triplette') && !c.includes('mixte')) ||
        (f.formations.has('Doublette mixte') && c.includes('doublette') && c.includes('mixte')) ||
        (f.formations.has('Triplette mixte') && c.includes('triplette') && c.includes('mixte')) ||
        (f.formations.has('En équipe (CDC, CRC, CNC)') && (c.includes('cdc')||c.includes('crc')||c.includes('cnc')||c.includes('équipe')));
      if (!ok) return false;
    }

    if (f.joueurs.size > 0) {
      const c = ((ev.categorie || '') + ' ' + (ev.title || '')).toLowerCase();
      const ok =
        (f.joueurs.has('Jeune') && (c.includes('jeune') || c.includes('minime') || c.includes('cadet') || c.includes('benjamin') || c.includes('junior'))) ||
        (f.joueurs.has('Benjamins') && c.includes('benjamin')) ||
        (f.joueurs.has('Minimes') && c.includes('minime')) ||
        (f.joueurs.has('Cadets') && c.includes('cadet')) ||
        (f.joueurs.has('Juniors') && (c.includes('junior') || c.includes('juniors'))) ||
        (f.joueurs.has('Sénior') && (c.includes('sénior')||c.includes('senior'))) ||
        (f.joueurs.has('Vétéran') && (c.includes('vétéran')||c.includes('veteran')||c.includes('vét'))) ||
        (f.joueurs.has('Masculin') && (c.includes('masculin')||c.includes('homme')||c.includes('masc'))) ||
        (f.joueurs.has('Féminin') && (c.includes('féminin')||c.includes('feminin')||c.includes('fem')||c.includes('dame'))) ||
        (f.joueurs.has('Promotion') && (c.includes('promo')||c.includes('tprom')||c.includes('dprom'))) ||
        (f.joueurs.has('Jeu Provençal') && (c.includes('provençal')||c.includes('provencal')||c.includes('prov')));
      if (!ok) return false;
    }

    if (f.categories.size > 0) {
      const t = (ev.typeEvent || '').toLowerCase();
      const ok =
        (f.categories.has('Départemental') && t === 'concours') ||
        (f.categories.has('Régional') && t === 'régional') ||
        (f.categories.has('National') && t === 'national') ||
        (f.categories.has('Championnat') && (t === 'championnat' || t === 'qualificatif')) ||
        (f.categories.has('Circuit National Jeunes') && ev.source === 'jeunes') ||
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


// ── GeoPrompt — popup de détection département ────────────────
const MAX_DEPTS = 7; // limite max de départements sélectionnables simultanément

const GeoPrompt = ({ deptKey, deptAvailable = true, onConfirm, onDecline }: {
  deptKey: string | null;
  deptAvailable?: boolean;
  onConfirm: () => void;
  onDecline: () => void;
}) => {
  const dept = deptKey ? DEPT_OPTIONS.find(d => d.key === deptKey) : null;
  const color = (!deptKey || !dept) ? '#dc2626' : !deptAvailable ? '#6b7280' : (SOURCE_COLOR[deptKey] || '#dc2626');
  const limitrophes = (deptKey && deptAvailable) ? getLimitrophes(new Set([deptKey])) : [];
  const limitropheLabels = limitrophes
    .map(k => DEPT_OPTIONS.find(d => d.key === k)?.label?.split(' (')[0])
    .filter(Boolean).slice(0, 3);

  const isManualMode = !deptKey || !dept;
  const isUnavailable = deptKey && dept && !deptAvailable; // dept détecté mais pas dans l'app

  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[400] flex items-center justify-center px-5"
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="relative w-full max-w-sm bg-zinc-950 border border-white/12 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Bande colorée en haut */}
          <div className="h-1 w-full" style={{ background: color }} />

          <div className="px-6 pt-6 pb-5">
            {/* Icône */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: color + '20', border: `2px solid ${color}40` }}>
                {isManualMode ? (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M3 12h18M3 18h18"/>
                  </svg>
                ) : (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                )}
              </div>
            </div>

            {isManualMode ? (
              /* ── Mode sélection manuelle ── */
              <>
                <p className="text-white/50 text-[11px] uppercase tracking-widest font-bold text-center mb-2">
                  Bienvenue sur AHRENA
                </p>
                <h2 className="text-white font-black text-lg text-center mb-2">
                  Choisissez votre département
                </h2>
                <p className="text-white/35 text-[12px] text-center mb-5 leading-relaxed">
                  Sélectionnez jusqu'à <span className="text-white/60 font-bold">{MAX_DEPTS} départements</span> pour afficher les concours près de chez vous.
                </p>
                <button
                  onClick={onDecline}
                  className="w-full py-4 rounded-2xl font-black text-[13px] uppercase tracking-wider text-white transition-colors"
                  style={{ background: color }}
                >
                  Choisir mon département
                </button>
              </>

            ) : isUnavailable ? (
              /* ── Mode département détecté mais non disponible ── */
              <>
                <p className="text-white/50 text-[11px] uppercase tracking-widest font-bold text-center mb-1">
                  Votre position détectée
                </p>
                <h2 className="text-white font-black text-xl text-center mb-2">
                  {dept!.label.split(' (')[0]}
                </h2>

                {/* Message indisponible */}
                <div className="bg-zinc-800 border border-white/10 rounded-2xl px-4 py-4 mb-5">
                  <p className="text-white/70 text-[12px] text-center leading-relaxed mb-1">
                    😕 Désolé, le calendrier de ce département n'est pas encore disponible dans AHRENA.
                  </p>
                  <p className="text-white/35 text-[11px] text-center leading-relaxed">
                    Vous pouvez nous l'envoyer pour qu'il soit intégré dans la prochaine mise à jour !
                  </p>
                </div>

                {/* Bouton envoyer le calendrier */}
                <a
                  href={`mailto:support@ahrena.com?subject=Calendrier%20p%C3%A9tanque%20${encodeURIComponent(dept!.label)}&body=Bonjour%2C%0A%0AJe%20souhaite%20vous%20envoyer%20le%20calendrier%20p%C3%A9tanque%20du%20d%C3%A9partement%20${encodeURIComponent(dept!.label)}.%0A%0ALien%20URL%20du%20calendrier%20%3A%20%0APDF%20ou%20images%20en%20pi%C3%A8ce%20jointe%0ASource%20(site%2C%20Facebook%2C%20autre)%20%3A%20%0A%0AMerci%20!`}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-black text-[12px] uppercase tracking-wider text-white mb-3 transition-colors"
                  style={{ background: '#dc2626' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  📅 Envoyer notre calendrier
                </a>

                <p className="text-white/20 text-[9px] text-center mb-4">
                  Envoyez-nous le lien URL, le PDF ou des captures d'écran du calendrier de votre comité départemental. Merci !
                </p>

                <button
                  onClick={onDecline}
                  className="w-full py-3 rounded-2xl border border-white/10 text-white/40 font-bold text-[11px] uppercase tracking-wider hover:bg-white/5 transition-colors"
                >
                  Choisir un autre département
                </button>
              </>

            ) : (
              /* ── Mode confirmation géo ── */
              <>
                <p className="text-white/50 text-[11px] uppercase tracking-widest font-bold text-center mb-1">
                  Votre position détectée
                </p>
                <h2 className="text-white font-black text-xl text-center mb-1">
                  {dept!.label.split(' (')[0]}
                </h2>
                <p className="text-white/30 text-xs text-center mb-5">
                  Êtes-vous bien dans ce département ?
                </p>

                {limitropheLabels.length > 0 && (
                  <div className="bg-amber-400/8 border border-amber-400/20 rounded-xl px-3 py-2.5 mb-5 flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
                    </svg>
                    <p className="text-amber-300/70 text-[10px] flex-1">
                      Les limitrophes seront aussi inclus :
                      <span className="font-bold text-amber-300/90"> {limitropheLabels.join(', ')}{limitrophes.length > 3 ? '…' : ''}</span>
                    </p>
                  </div>
                )}

                <div className="flex gap-2.5">
                  <button
                    onClick={onDecline}
                    className="flex-1 py-3.5 rounded-2xl border border-white/12 text-white/50 font-bold text-[12px] uppercase tracking-wider hover:bg-white/5 transition-colors"
                  >
                    Non
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-[2] py-3.5 rounded-2xl font-black text-[13px] uppercase tracking-wider text-white transition-colors"
                    style={{ background: color }}
                  >
                    Oui, c'est le mien
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

// ── EventDetailSheet ──────────────────────────────────────────
const TYPE_LABEL: Record<string, string> = {
  CONCOURS:    'Concours',
  CHAMPIONNAT: 'Championnat',
  RÉGIONAL:    'Régional',
  NATIONAL:    'National',
  SPÉCIAL:     'Spécial',
};

const TYPE_COLOR: Record<string, string> = {
  CONCOURS:    '#6b7280',
  CHAMPIONNAT: '#2563eb',
  RÉGIONAL:    '#7c3aed',
  NATIONAL:    '#dc2626',
  SPÉCIAL:     '#d97706',
};

const FORMAT_LABEL: Record<string, { icon: string; label: string }> = {
  'TRIPLETTE':   { icon: '⚽⚽⚽', label: 'Triplette' },
  'DOUBLETTE':   { icon: '⚽⚽',   label: 'Doublette' },
  'TÊTE À TÊTE': { icon: '⚽',    label: 'Tête à Tête' },
  'INDIVIDUEL':  { icon: '⚽',    label: 'Individuel' },
  'ENDURO':      { icon: '⚡',    label: 'Enduro' },
  'AUTRE':       { icon: '🎯',    label: 'Autre' },
};

const EventDetailSheet = ({ ev, onClose, onVideoSelect, user, onAuthRequired }: {
  ev: UnifiedEvent | null;
  onClose: () => void;
  onVideoSelect: (v: Video) => void;
  user?: any;
  onAuthRequired?: () => void;
}) => {
  const [faved, setFaved] = useState(false);

  useEffect(() => {
    if (ev) setFaved(isFav('concours-' + ev.id));
  }, [ev?.id]);

  // Rendu portal toujours monté — AnimatePresence gère l'animation
  if (typeof document === 'undefined') return null;
  if (!ev) return ReactDOM.createPortal(<></>, document.body);

  const color = SOURCE_COLOR[ev.source] || '#dc2626';
  const typeColor = TYPE_COLOR[ev.typeEvent || 'CONCOURS'] || '#6b7280';
  const fmt = FORMAT_LABEL[ev.format || 'AUTRE'] || FORMAT_LABEL['AUTRE'];
  const dept = DEPT_LINKS[ev.source];
  const past = isPast(ev.date, ev.dateFin);
  const multiDay = ev.dateFin && ev.dateFin !== ev.date;

  // Construire les joueurs selon le format
  const players = ev.format === 'TRIPLETTE' ? 3 : ev.format === 'DOUBLETTE' ? 2 : 1;

  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {ev ? (
        <motion.div
          key={ev.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* ── Header coloré ── */}
            <div className="relative px-5 pt-5 pb-4" style={{ background: `linear-gradient(135deg, ${color}22 0%, transparent 60%)`, borderBottom: `1px solid ${color}30` }}>
              {/* Handle */}
              <div className="flex justify-center mb-3">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Type badge + fermer */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: typeColor + '25', color: typeColor, border: `1px solid ${typeColor}40` }}>
                  {TYPE_LABEL[ev.typeEvent || 'CONCOURS']}
                </span>
                <div className="flex items-center gap-2">
                  {/* Bouton favori */}
                  <button
                    onClick={() => {
                      if (!user) { onAuthRequired?.(); return; }
                      const favItem: FavConcours = {
                        id: 'concours-' + ev.id,
                        category: 'concours',
                        title: ev.title,
                        ville: ev.ville || '',
                        date: ev.date,
                        dateFin: ev.dateFin,
                        format: ev.format,
                        heure: ev.heure,
                        info: ev.info,
                        dept: SOURCE_LABEL[ev.source],
                        deptCode: dept?.code,
                        deptColor: color,
                        facebook: dept?.facebook,
                        site: dept?.site,
                        addedAt: new Date().toISOString(),
                      };
                      const added = toggleFav(favItem);
                      setFaved(added);
                      window.dispatchEvent(new Event('ahrena_fav_changed'));
                    }}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                    style={faved ? { background: '#dc2626' } : { background: 'rgba(255,255,255,0.08)' }}
                  >
                    <Heart size={12} fill={faved ? 'white' : 'none'} stroke={faved ? 'white' : 'rgba(255,255,255,0.6)'} strokeWidth={2}/>
                  </button>
                  <button onClick={onClose}
                    className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors">
                    <X size={13} className="text-white/60" />
                  </button>
                </div>
              </div>

              {/* Icônes joueurs + Format */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: players }).map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: color + '30', border: `2px solid ${color}50` }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill={color}>
                        <circle cx="12" cy="7" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                      </svg>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white font-black text-base uppercase tracking-wide leading-tight">
                    {fmt.label}
                  </p>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider">
                    {SOURCE_LABEL[ev.source]}
                  </p>
                </div>
              </div>

              {/* Titre catégorie */}
              <p className="text-white font-bold text-sm leading-snug">{ev.title}</p>
            </div>

            {/* ── Corps ── */}
            <div className="px-5 py-4 space-y-3">

              {/* Ville + Lieu */}
              <div className="flex items-start gap-3 bg-white/4 rounded-2xl px-4 py-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + '20' }}>
                  <MapPin size={16} style={{ color }} />
                </div>
                <div>
                  <p className="text-white font-black text-sm">{ev.ville}</p>
                  {ev.lieu && <p className="text-white/40 text-[11px] mt-0.5">{ev.lieu}</p>}
                  {ev.club && ev.club !== ev.ville && (
                    <p className="text-white/30 text-[10px] mt-0.5">🏟 {ev.club}</p>
                  )}
                </div>
              </div>

              {/* Date + Heure */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2.5 bg-white/4 rounded-2xl px-3.5 py-3">
                  <CalendarIcon size={15} className="text-white/40 flex-shrink-0" />
                  <div>
                    <p className="text-white/40 text-[9px] uppercase font-bold tracking-wider">Date</p>
                    <p className="text-white font-bold text-[12px]">
                      {formatShort(ev.date)}
                      {multiDay && <span className="text-white/40"> → {formatShort(ev.dateFin!)}</span>}
                    </p>
                    <p className="text-white/30 text-[10px] capitalize">
                      {new Date(ev.date).toLocaleDateString('fr-FR', { weekday: 'long' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/4 rounded-2xl px-3.5 py-3">
                  <Clock size={15} className="text-white/40 flex-shrink-0" />
                  <div>
                    <p className="text-white/40 text-[9px] uppercase font-bold tracking-wider">Heure</p>
                    <p className="text-white font-bold text-[12px]">
                      {ev.heure || 'Non précisée'}
                    </p>
                    {multiDay && <p className="text-white/30 text-[10px]">{ev.dateFin ? Math.ceil((new Date(ev.dateFin).getTime() - new Date(ev.date).getTime()) / 86400000) + ' jour(s)' : ''}</p>}
                  </div>
                </div>
              </div>

              {/* Info complémentaire */}
              {ev.info && (
                <div className="flex items-start gap-2.5 bg-amber-500/8 border border-amber-500/20 rounded-2xl px-4 py-3">
                  <span className="text-amber-400 text-base flex-shrink-0 mt-0.5">ℹ️</span>
                  <p className="text-amber-300/80 text-[11px] leading-relaxed">{ev.info}</p>
                </div>
              )}

              {/* Avertissement annulation */}
              {!past && dept && (
                <div className="flex items-center gap-2 bg-red-600/8 border border-red-600/20 rounded-2xl px-4 py-2.5">
                  <span className="text-[13px]">⚠️</span>
                  <p className="text-white/40 text-[10px] flex-1">Vérifier les annulations auprès du comité</p>
                </div>
              )}

              {/* Liens comité */}
              {dept && (
                <div className="grid grid-cols-2 gap-2">
                  {dept.facebook && (
                  <a href={dept.facebook} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-600/15 border border-blue-600/25 rounded-2xl py-3 text-blue-400 font-bold text-[11px] hover:bg-blue-600/25 transition-colors active:scale-95">
                    <span className="text-base">📘</span>
                    Facebook CD{dept.code}
                  </a>
                  )}
                  {dept.site && (
                  <a href={dept.site} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-600/15 border border-emerald-600/25 rounded-2xl py-3 text-emerald-400 font-bold text-[11px] hover:bg-emerald-600/25 transition-colors active:scale-95">
                    <span className="text-base">🌐</span>
                    Site officiel
                  </a>
                  )}
                </div>
              )}

              {/* Bouton live si vidéo */}
              {ev.video && (
                <button
                  onClick={() => { onClose(); onVideoSelect(ev.video!); }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider text-white transition-colors"
                  style={{ background: color }}>
                  <Radio size={14} className="animate-pulse" />
                  Regarder le Direct
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};

// ── EventCard ─────────────────────────────────────────────────
const FORMAT_ICON: Record<string, string> = {
  'TRIPLETTE': '3️⃣', 'DOUBLETTE': '2️⃣', 'TÊTE À TÊTE': '1️⃣',
  'INDIVIDUEL': '1️⃣', 'ENDURO': '⚡', 'AUTRE': '🎯',
};

const EventCard = ({ ev, onVideoSelect, onSelect }: { ev: UnifiedEvent; onVideoSelect: (v: Video) => void; onSelect?: (ev: UnifiedEvent) => void }) => {
  const color = SOURCE_COLOR[ev.source];
  const past  = isPast(ev.date, ev.dateFin);
  const icon  = ev.format ? (FORMAT_ICON[ev.format] || '🎯') : (ev.source === 'live' ? '📺' : '🎯');

  return (
    <div
      className="rounded-xl border border-white/5 overflow-hidden transition-all hover:border-white/15 cursor-pointer active:scale-[0.98]"
      style={{ borderLeft: `3px solid ${color}` }}
      onClick={() => onSelect ? onSelect(ev) : ev.video && onVideoSelect(ev.video)}
    >
      <div className="flex gap-3 p-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-base"
          style={{ background: color + '20' }}>
          {ev.source === 'live' && ev.video?.isLive
            ? <Radio size={16} className="animate-pulse" style={{ color }}/>
            : <span>{icon}</span>}
        </div>

        <div className="flex-1 min-w-0">
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

          <p className="text-white font-bold text-[13px] leading-snug mb-1.5">{ev.title}</p>

          {ev.ville && (
            <div className="flex items-center gap-1 text-white/60 text-[11px] mb-0.5">
              <MapPin size={9} className="flex-shrink-0 text-white/30"/>
              <span className="font-semibold">{ev.ville}</span>
              {ev.lieu && <span className="text-white/30">· {ev.lieu}</span>}
            </div>
          )}
          {ev.club && ev.club !== ev.ville && (
            <p className="text-white/30 text-[10px] mb-0.5 truncate">🏟 {ev.club}</p>
          )}
          {ev.info && <p className="text-white/25 text-[10px] italic mb-1">{ev.info}</p>}

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

        <div className="flex-shrink-0 self-center">
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/8">
            <svg width="7" height="7" viewBox="0 0 8 8" fill="rgba(255,255,255,0.4)"><polygon points="2,1 7,4 2,7"/></svg>
          </div>
        </div>
      </div>

      {DEPT_LINKS[ev.source] && !past && (
        <div className="px-3 pb-2.5 flex items-center gap-2 flex-wrap border-t border-white/5">
          <span className="text-amber-400/60 text-[9px] font-bold">⚠️ Vérifier annulation</span>
          <div className="flex gap-1.5 ml-auto">
            {DEPT_LINKS[ev.source]!.facebook && (
              <a href={DEPT_LINKS[ev.source]!.facebook} target="_blank" rel="noopener noreferrer"
                className="bg-blue-600/15 text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded border border-blue-600/20"
                onClick={e => e.stopPropagation()}>📘 FB CD{DEPT_LINKS[ev.source]!.code}</a>
            )}
            {DEPT_LINKS[ev.source]!.site && (
              <a href={DEPT_LINKS[ev.source]!.site} target="_blank" rel="noopener noreferrer"
                className="bg-emerald-600/15 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-600/20"
                onClick={e => e.stopPropagation()}>🌐 Site</a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ── ListView ──────────────────────────────────────────────────
const ListView = ({ events, onVideoSelect, user, onAuthRequired }: { events: UnifiedEvent[]; onVideoSelect: (v: Video) => void; user?: any; onAuthRequired?: () => void }) => {
  const [detailEv, setDetailEv] = useState<UnifiedEvent | null>(null);
  const grouped = useMemo(() => {
    const map = new Map<string, UnifiedEvent[]>();
    [...events].sort((a, b) => a.date.localeCompare(b.date))
      .forEach(ev => { if (!map.has(ev.date)) map.set(ev.date, []); map.get(ev.date)!.push(ev); });
    return Array.from(map.entries());
  }, [events]);

  const noSources = events.length === 0 && Array.from(events).length === 0;

  if (grouped.length === 0) return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-8">
      <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4">
        <MapPin size={28} className="text-white/20"/>
      </div>
      <p className="text-white font-black text-base mb-1">Choisissez votre département</p>
      <p className="text-white/35 text-xs leading-relaxed mb-5">
        Sélectionnez jusqu'à 7 départements pour afficher les concours près de chez vous.
      </p>
      <button
        onClick={() => document.getElementById('dept-selector-btn')?.click()}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-[12px] uppercase tracking-widest px-5 py-3 rounded-2xl transition-colors"
      >
        <MapPin size={14}/>
        Choisir un département
      </button>
    </div>
  );

  return (
    <>
    <EventDetailSheet ev={detailEv} onClose={() => setDetailEv(null)} onVideoSelect={onVideoSelect} user={user} onAuthRequired={onAuthRequired} />
    <div className="space-y-6 px-4 pb-6">
      {grouped.map(([date, evs]) => {
        const d = new Date(date);
        const isToday = isoDate(today()) === date;
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
              {evs.map(ev => <EventCard key={ev.id} ev={ev} onVideoSelect={onVideoSelect} onSelect={setDetailEv}/>)}
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};

// ── Grille d'un mois ─────────────────────────────────────────
const MonthGrid = ({
  year, month, evByDate, todayStr, selected, onSelectDate
}: {
  year: number; month: number;
  evByDate: Map<string, UnifiedEvent[]>;
  todayStr: string; selected: string | null;
  onSelectDate: (d: string) => void;
}) => {
  const totalDays = new Date(year, month + 1, 0).getDate();
  const startDow  = (new Date(year, month, 1).getDay() + 6) % 7;
  return (
    <div className="grid grid-cols-7 gap-y-1">
      {Array.from({ length: startDow }).map((_, i) => <div key={`e-${i}`} />)}
      {Array.from({ length: totalDays }).map((_, i) => {
        const day = i + 1;
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvs = evByDate.get(dateStr) || [];
        const isToday = dateStr === todayStr;
        const isSel   = dateStr === selected;
        const past    = dateStr < todayStr && !isToday;
        const dots    = [...new Set(dayEvs.map(e => SOURCE_COLOR[e.source]))].slice(0, 3);
        return (
          <div key={dateStr}
            onClick={() => dayEvs.length > 0 && onSelectDate(isSel ? '' : dateStr)}
            className={`relative flex flex-col items-center py-1 rounded-lg transition-colors
              ${dayEvs.length > 0 ? 'cursor-pointer' : ''}
              ${isSel ? 'bg-red-600/30 ring-1 ring-red-500' : dayEvs.length > 0 ? 'hover:bg-white/5' : ''}
              ${isToday ? 'ring-1 ring-white/40' : ''}
              ${past && dayEvs.length > 0 ? 'opacity-40' : ''}`}>
            <span className={`text-[12px] font-bold leading-none mb-0.5
              ${isToday ? 'text-red-400' : isSel ? 'text-white' : dayEvs.length > 0 ? 'text-white' : 'text-white/25'}`}>
              {day}
            </span>
            <div className="flex gap-0.5 h-1.5">
              {dots.map((color, di) => (
                <div key={di} className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── MonthView — scroll-snap CSS natif, sans saut ──────────────
const MonthView = ({ events, allEvents, onVideoSelect, forcedMonth, user, onAuthRequired }: {
  events: UnifiedEvent[]; allEvents: UnifiedEvent[]; onVideoSelect: (v: Video) => void; forcedMonth: { month: number; year: number } | null; user?: any; onAuthRequired?: () => void;
}) => {
  const todayDate = today();
  const minYear   = todayDate.getFullYear();
  const minMonth  = todayDate.getMonth();

  const addMonths = (y: number, m: number, delta: number) => {
    const d = new Date(y, m + delta, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  };

  const evByDate = useMemo(() => {
    const map = new Map<string, UnifiedEvent[]>();
    events.forEach(ev => {
      const start = new Date(ev.date);
      const end   = ev.dateFin ? new Date(ev.dateFin) : start;
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const k = isoDate(new Date(d));
        if (!map.has(k)) map.set(k, []);
        if (!map.get(k)!.find(e => e.id === ev.id)) map.get(k)!.push(ev);
      }
    });
    return map;
  }, [events]);

  // Dernier mois qui a des événements
  const maxIdx = useMemo(() => {
    let max = 0;
    evByDate.forEach((_, dateStr) => {
      const d = new Date(dateStr);
      const diff = (d.getFullYear() - minYear) * 12 + (d.getMonth() - minMonth);
      if (diff > max) max = diff;
    });
    return max;
  }, [evByDate, minYear, minMonth]);

  const [idx, setIdx]       = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [detailEv, setDetailEv] = useState<UnifiedEvent | null>(null);
  const scrollRef   = React.useRef<HTMLDivElement>(null);
  const isScrolling = React.useRef(false);

  const current = addMonths(minYear, minMonth, idx);
  const isAtMin = idx === 0;
  const isAtMax = idx >= maxIdx;

  // Sync filtre mois externe (strip → calendrier)
  useEffect(() => {
    if (forcedMonth !== null) {
      const newIdx = (forcedMonth.year - minYear) * 12 + (forcedMonth.month - minMonth);
      const clamped = Math.max(0, Math.min(newIdx, maxIdx));
      setIdx(clamped);
      setSelected(null);
    }
  }, [forcedMonth]);

  // Scroller vers idx sans déclencher onScroll en retour
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    isScrolling.current = true;
    el.scrollTo({ left: el.offsetWidth * idx, behavior: 'smooth' });
    // Libérer après la fin probable de l'animation smooth (~400ms)
    const t = setTimeout(() => { isScrolling.current = false; }, 450);
    return () => clearTimeout(t);
  }, [idx]);

  // Détecter quand l'utilisateur a scrollé manuellement et s'est arrêté sur un snap
  const scrollTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const onScroll = () => {
    if (isScrolling.current) return; // scroll programmatique → ignorer
    const el = scrollRef.current;
    if (!el) return;
    // Debounce : on attend que le scroll-snap soit fini avant de lire la position
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const newIdx = Math.round(el.scrollLeft / el.offsetWidth);
      const clamped = Math.max(0, Math.min(newIdx, maxIdx));
      if (clamped !== idx) {
        isScrolling.current = true; // on va corriger si hors limites
        if (newIdx > maxIdx) {
          // L'utilisateur a scrollé au-delà du max → ramener
          el.scrollTo({ left: el.offsetWidth * maxIdx, behavior: 'smooth' });
          setTimeout(() => { isScrolling.current = false; }, 450);
        } else {
          isScrolling.current = false;
        }
        setIdx(clamped);
        setSelected(null);
      }
    }, 80);
  };

  const todayStr = isoDate(todayDate);
  const selectedEvents = selected ? (evByDate.get(selected) || []) : [];
  const months = Array.from({ length: maxIdx + 1 }, (_, i) => addMonths(minYear, minMonth, i));

  return (
    <div className="pb-6">
      {/* Titre du mois */}
      <div className="flex items-center justify-center mb-4 px-4">
        <h2 className="text-white font-black text-lg uppercase tracking-wide">
          {MONTHS_FR[current.month]} {current.year}
        </h2>
      </div>

      {/* Jours fixes */}
      <div className="grid grid-cols-7 mb-1 px-4">
        {DAYS_FR.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-black text-white/30 uppercase py-1">{d}</div>
        ))}
      </div>

      {/* Scroll-snap natif */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {months.map((m, i) => (
          <div
            key={i}
            style={{
              minWidth: '100%',
              scrollSnapAlign: 'start',
              padding: '0 16px',
              boxSizing: 'border-box',
            }}
          >
            <MonthGrid
              year={m.year} month={m.month}
              evByDate={evByDate} todayStr={todayStr}
              selected={selected} onSelectDate={setSelected}
            />
          </div>
        ))}
      </div>

      {/* Bottom sheet événements du jour */}
      <AnimatePresence>
        {selected && selectedEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4"
            onClick={() => setSelected(null)}
          >
            {/* Fond semi-transparent */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl max-h-[80vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 pb-3 pt-1 flex-shrink-0">
                <div>
                  <p className="text-white font-black text-sm uppercase tracking-wide">
                    {formatFull(selected)}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {selectedEvents.length} événement{selectedEvents.length > 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
                >
                  <X size={14} className="text-white/60" />
                </button>
              </div>

              {/* Liste scrollable */}
              <div className="overflow-y-auto px-4 pb-6 space-y-2 flex-1">
                {selectedEvents.map(ev => (
                  <EventCard key={ev.id} ev={ev} onVideoSelect={(v) => { setSelected(null); onVideoSelect(v); }} onSelect={(e) => { setSelected(null); setDetailEv(e); }} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <EventDetailSheet ev={detailEv} onClose={() => setDetailEv(null)} onVideoSelect={onVideoSelect} user={user} onAuthRequired={onAuthRequired} />
    </div>
  );
};

// ── DeptBottomSheet ───────────────────────────────────────────
const DeptAccordion = ({ sources, onChange }: {
  sources: Set<string>;
  onChange: (sources: Set<string>) => void;
}) => {
  const [open, setOpen] = useState(false);

  const MAX_DEPTS = 7;
  const ALWAYS_ON = new Set(['national', 'regional', 'jeunes', 'live']); // ne comptent pas dans la limite

  const toggleSource = (key: string) => {
    if (key === 'all') { onChange(new Set()); return; }
    const next = new Set(sources);
    if (next.has(key)) {
      next.delete(key);
    } else {
      // Compter seulement les vrais depts (pas les sources permanentes)
      const deptCount = Array.from(next).filter(k => !ALWAYS_ON.has(k)).length;
      if (!ALWAYS_ON.has(key) && deptCount >= MAX_DEPTS) return; // limite atteinte
      next.add(key);
    }
    onChange(next);
  };

  const reset = () => onChange(new Set());

  const isAll = sources.size === 0;
  const activeCount = isAll ? 0 : Array.from(sources).filter(k => !ALWAYS_ON.has(k)).length;
  const availableDepts = DEPT_OPTIONS.filter(d => d.available);
  const limitReached = activeCount >= MAX_DEPTS;
  const activeLabel = isAll
    ? 'Choisir un département'
    : activeCount === 1
      ? availableDepts.find(d => sources.has(d.key))?.label?.split(' (')[0] || '1 département'
      : `${activeCount}/${MAX_DEPTS} départements`;

  // Bloquer le scroll du body quand le sheet est ouvert
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Bouton déclencheur */}
      <button
        id="dept-selector-btn"
        onClick={() => setOpen(true)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all
          ${activeCount > 0
            ? 'bg-red-600/20 border-red-500/60 text-white'
            : 'bg-zinc-800 border-white/15 text-white/70 hover:border-white/30 hover:text-white'}`}
      >
        <MapPin size={13} className="flex-shrink-0"/>
        <span className="text-[11px] font-black uppercase tracking-wide whitespace-nowrap">{activeLabel}</span>
        {activeCount > 0 && (
          <span className="bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0">
            {activeCount}
          </span>
        )}
        <ChevronDown size={12} className="flex-shrink-0"/>
      </button>

      {/* Bottom Sheet Portal */}
      {open && ReactDOM.createPortal(
        <div className="fixed inset-0 z-[200] flex flex-col justify-end">

          {/* Backdrop flouté */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Sheet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 mx-3 mb-3 bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden flex flex-col"
            style={{ maxHeight: 'calc(100vh - 80px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/8 flex-shrink-0">
              <div>
                <h3 className="text-white font-black text-base uppercase tracking-wider">Départements</h3>
                <p className="text-white/30 text-[11px] mt-0.5">
                  {activeCount === 0 ? 'Tous affichés' : `${activeCount} sélectionné${activeCount > 1 ? 's' : ''}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Reset */}
                {activeCount > 0 && (
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/8 border border-white/10 text-white/60 hover:text-white hover:bg-white/15 transition-all"
                  >
                    <RotateCcw size={11}/>
                    <span className="text-[10px] font-black uppercase tracking-wide">Réinitialiser</span>
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all"
                >
                  <X size={14}/>
                </button>
              </div>
            </div>

            {/* Option "Tous" */}
            <button
              onClick={() => { reset(); setOpen(false); }}
              className={`w-full flex items-center gap-4 px-5 py-4 border-b border-white/5 flex-shrink-0 transition-all
                ${isAll ? 'bg-red-600/10' : 'hover:bg-white/4'}`}
            >
              {/* Checkbox style */}
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                ${isAll ? 'bg-red-600 border-red-600' : 'border-white/25'}`}>
                {isAll && <Check size={12} className="text-white" strokeWidth={3}/>}
              </div>
              <div className="flex items-center gap-2 flex-1">
                <div className="w-3 h-3 rounded-full bg-white/40"/>
                <span className={`text-sm font-black uppercase tracking-wide ${isAll ? 'text-white' : 'text-white/50'}`}>
                  Tous les départements
                </span>
              </div>
              {isAll && <span className="text-red-500 text-[10px] font-black uppercase tracking-wider">Actif</span>}
            </button>

            {/* Liste scrollable */}
            <div className="overflow-y-auto flex-1 py-2">
              {DEPT_OPTIONS.map(dept => {
                const active = !isAll && sources.has(dept.key);

                if (!dept.available) {
                  return (
                    <div key={dept.key}
                      className="relative flex items-center gap-3 px-4 py-3 cursor-not-allowed overflow-hidden mx-2 my-0.5 rounded-lg"
                      style={{
                        background: `repeating-linear-gradient(
                          135deg,
                          #3f3f46 0px, #3f3f46 1px,
                          #27272a 1px, #27272a 9px
                        )`,
                      }}>
                      {/* Checkbox barrée non cochable */}
                      <div className="w-5 h-5 rounded-md border-2 border-zinc-600 flex items-center justify-center flex-shrink-0 bg-zinc-800 relative z-10">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <line x1="1" y1="1" x2="9" y2="9" stroke="#71717a" strokeWidth="2" strokeLinecap="round"/>
                          <line x1="9" y1="1" x2="1" y2="9" stroke="#71717a" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 relative z-10" style={{ background: dept.color, opacity: 0.4 }}/>
                      {/* Texte barré avec line-through natif + couleur rouge */}
                      <div className="flex-1 relative z-10 min-w-0">
                        <span className="text-[13px] font-bold text-zinc-500"
                          style={{ textDecoration: 'line-through', textDecorationColor: '#ef4444', textDecorationThickness: '2px' }}>
                          {dept.label}
                        </span>
                      </div>
                      <span className="text-[8px] font-black uppercase text-zinc-500 border border-zinc-600 px-2 py-0.5 rounded flex-shrink-0 relative z-10 tracking-wider bg-zinc-800">
                        Bientôt
                      </span>
                    </div>
                  );
                }

                return (
                  <button
                    key={dept.key}
                    onClick={() => toggleSource(dept.key)}
                    disabled={limitReached && !active}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 transition-all
                      ${active ? 'bg-red-600/8' : limitReached ? 'opacity-35 cursor-not-allowed' : 'hover:bg-white/4'}`}
                  >
                    {/* Checkbox */}
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                      ${active ? 'bg-red-600 border-red-600' : 'border-white/25'}`}>
                      {active && <Check size={12} className="text-white" strokeWidth={3}/>}
                    </div>
                    {/* Dot couleur */}
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: dept.color }}/>
                    {/* Label */}
                    <span className={`text-sm font-bold flex-1 text-left transition-colors
                      ${active ? 'text-white' : 'text-white/55'}`}>
                      {dept.label}
                    </span>
                    {active && (
                      <span className="text-red-500 text-[10px] font-black uppercase tracking-wider">✓</span>
                    )}
                  </button>
                );
              })}

              {/* Légende bas */}
              <div className="flex items-center gap-2 px-5 py-3 mt-1 border-t border-white/5">
                <div className="w-3 h-3 rounded-full bg-zinc-600 opacity-30 flex-shrink-0"/>
                <span className="text-[10px] text-white/20 italic">Calendrier non encore intégré</span>
              </div>
            </div>

            {/* Bouton Appliquer */}
            <div className="px-5 pt-3 pb-5 border-t border-white/8 flex-shrink-0 space-y-2.5">

              {/* Bouton INCLURE LES LIMITROPHES — visible seulement si des depts sont sélectionnés */}
              {activeCount > 0 && (() => {
                const limitrophes = getLimitrophes(sources);
                if (limitrophes.length === 0) return null;
                return (
                  <button
                    onClick={() => {
                      const next = new Set(sources);
                      limitrophes.forEach(k => next.add(k));
                      onChange(next);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all border"
                    style={{
                      background: 'linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(245,158,11,0.08) 100%)',
                      borderColor: 'rgba(251,191,36,0.35)',
                      color: '#fbbf24',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
                    </svg>
                    Inclure les limitrophes
                    <span className="ml-1 bg-amber-400/20 text-amber-300 text-[9px] px-2 py-0.5 rounded-full font-black">
                      +{limitrophes.length} dept{limitrophes.length > 1 ? 's' : ''}
                    </span>
                  </button>
                );
              })()}

              {/* Indicateur limite */}
              {limitReached && (
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 rounded-xl px-3 py-2.5">
                  <span className="text-amber-400 text-sm">⚠️</span>
                  <p className="text-amber-300/80 text-[10px] flex-1">
                    Limite de <span className="font-black">{MAX_DEPTS} départements</span> atteinte. Décochez-en un pour en ajouter un autre.
                  </p>
                </div>
              )}

              <button
                onClick={() => setOpen(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl transition-colors shadow-lg shadow-red-900/30"
              >
                Voir les résultats
                {activeCount > 0 && (
                  <span className="ml-2 bg-white/20 text-white text-[11px] px-2 py-0.5 rounded-full">
                    {activeCount}/{MAX_DEPTS}
                  </span>
                )}
              </button>

              {/* Bouton envoi calendrier */}
              <a
                href="mailto:support@ahrena.com?subject=Calendrier%20p%C3%A9tanque%20d%C3%A9partemental&body=Bonjour%2C%0A%0AJe%20souhaite%20vous%20envoyer%20le%20calendrier%20p%C3%A9tanque%20de%20mon%20d%C3%A9partement%20pour%20qu%27il%20soit%20int%C3%A9gr%C3%A9%20dans%20AHRENA.%0A%0AD%C3%A9partement%20%3A%20%0ASource%20(site%2C%20PDF%2C%20Facebook)%20%3A%20%0A%0AMerci%20!"
                className="w-full flex items-center justify-center gap-2.5 bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 hover:border-white/20 text-white/60 hover:text-white/90 font-bold text-[11px] uppercase tracking-wider py-3 rounded-2xl transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                📅 Envoyer le calendrier de mon département
              </a>
              <p className="text-center text-white/20 text-[9px]">
                Votre calendrier sera intégré dans la prochaine mise à jour
              </p>
            </div>

          </motion.div>
        </div>,
        document.body
      )}
    </>
  );
};

// ── MonthStrip — filtre par mois ──────────────────────────────
const MonthStrip = ({ selectedMonth, onChange, availableMonths }: {
  selectedMonth: { month: number; year: number } | null;
  onChange: (m: { month: number; year: number } | null) => void;
  availableMonths: { month: number; year: number }[];
}) => {
  const now = today();
  const currentMonth = now.getMonth();
  const currentYear  = now.getFullYear();

  // Utiliser uniquement les mois qui ont des événements
  const months = availableMonths.map(m => ({
    ...m,
    label: MONTHS_SHORT[m.month],
  }));

  return (
    <div className="flex gap-1.5 overflow-x-auto no-scrollbar px-4 pb-2 pt-1">
      {/* Tous */}
      <button
        onClick={() => onChange(null)}
        className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wide transition-all
          ${selectedMonth === null
            ? 'bg-white text-black'
            : 'bg-zinc-800 text-white/50 hover:text-white hover:bg-zinc-700'}`}
      >
        Tous
      </button>

      {months.map(({ month, year, label }) => {
        const active = selectedMonth?.month === month && selectedMonth?.year === year;
        const isCurrent = month === currentMonth && year === currentYear;
        return (
          <button
            key={`${month}-${year}`}
            onClick={() => onChange(active ? null : { month, year })}
            className={`flex-shrink-0 flex flex-col items-center px-3 py-1 rounded-lg transition-all
              ${active
                ? 'bg-red-600 text-white'
                : isCurrent
                  ? 'bg-zinc-700 text-white ring-1 ring-white/30'
                  : 'bg-zinc-800/80 text-white/40 hover:text-white hover:bg-zinc-700'}`}
          >
            <span className="text-[11px] font-black uppercase">{label}</span>
            {isCurrent && !active && <span className="text-[7px] text-red-400 font-bold leading-none">●</span>}
          </button>
        );
      })}
    </div>
  );
};

// ── FilterPanel (sans section Département) ────────────────────
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

  const reset = () => setLocal({ ...makeDefaultFilters(), sources: new Set(filters.sources), month: filters.month });

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

  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-1.5 rounded-lg">
              <SlidersHorizontal size={14} className="text-white" />
            </div>
            <h2 className="text-white font-black text-sm uppercase tracking-[0.2em]">Filtres avancés</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors">
            <X size={14} className="text-white/60" />
          </button>
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

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
              {/* Tout — se décoche dès qu'on choisit une catégorie */}
              <Checkbox
                checked={local.categories.size === 0}
                onChange={() => setLocal(l => ({ ...l, categories: new Set() }))}
                label="Tout"
              />
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
            onClick={() => { onChange({ ...local, sources: filters.sources, month: filters.month }); onClose(); }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3.5 rounded-xl uppercase tracking-[0.15em] text-sm transition-colors"
          >
            Appliquer les filtres
          </button>
          <div className="flex justify-center">
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
const CalendarComponent = ({ videos, onVideoSelect, user, onAuthRequired }: { videos: Video[]; onVideoSelect: (v: Video) => void; user?: any; onAuthRequired?: () => void }) => {
  const [view, setView]           = useState<'month' | 'list'>('month');
  const [showFilters, setShowFilters] = useState(false);
  // Par défaut : aucun département sélectionné — l'utilisateur doit choisir
  const [filters, setFilters]     = useState<AdvancedFilters>({
    ...makeDefaultFilters(),
    sources: new Set(), // vide = aucun dept sélectionné
  });
  const [todayKey, setTodayKey]   = useState(isoDate(new Date()));

  // ── Géolocalisation ──
  const [geoDeptKey, setGeoDeptKey]         = useState<string | null>(null);
  const [geoDeptAvailable, setGeoDeptAvailable] = useState(true);
  const [geoPrompt, setGeoPrompt]           = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      // Pas de géoloc dispo → demander une seule fois manuellement
      const asked = localStorage.getItem('ahrena_geo_asked');
      if (!asked) {
        setGeoPrompt(true);
        setGeoDeptKey(null);
        localStorage.setItem('ahrena_geo_asked', '1');
      }
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const result = getDeptFromCoords(pos.coords.latitude, pos.coords.longitude);
        const currentKey = result?.key ?? null;
        const lastKey = localStorage.getItem('ahrena_last_dept');

        if (!lastKey) {
          // Premier lancement — toujours afficher le popup
          setGeoDeptKey(currentKey);
          setGeoDeptAvailable(result?.available ?? false);
          setGeoPrompt(true);
          if (currentKey) localStorage.setItem('ahrena_last_dept', currentKey);
        } else if (currentKey && currentKey !== lastKey) {
          // Changement de département détecté
          setGeoDeptKey(currentKey);
          setGeoDeptAvailable(result?.available ?? false);
          setGeoPrompt(true);
          localStorage.setItem('ahrena_last_dept', currentKey);
        }
        // Même département qu'avant → rien, pas de popup
      },
      () => {
        // Refus géoloc → demander manuellement une seule fois
        const asked = localStorage.getItem('ahrena_geo_asked');
        if (!asked) {
          setGeoPrompt(true);
          setGeoDeptKey(null);
          setGeoDeptAvailable(false);
          localStorage.setItem('ahrena_geo_asked', '1');
        }
      },
      { timeout: 6000, maximumAge: 300000 }
    );
  }, []);

  const handleGeoConfirm = () => {
    if (!geoDeptKey) return;
    // Activer le département détecté + ses limitrophes
    const next = new Set([geoDeptKey, ...getLimitrophes(new Set([geoDeptKey]))]);
    setFilters(f => ({ ...f, sources: next }));
    // Mémoriser ce dept comme "connu" pour ne plus redemander
    localStorage.setItem('ahrena_last_dept', geoDeptKey);
    setGeoPrompt(false);
  };

  const handleGeoDecline = () => {
    setGeoPrompt(false);
    // Ouvrir directement le sélecteur de département
    setTimeout(() => {
      document.getElementById('dept-selector-btn')?.click();
    }, 300);
  };

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

  const activeAdvanced = [
    filters.formations.size > 0,
    filters.joueurs.size > 0,
    filters.categories.size > 0,
  ].filter(Boolean).length;

  const updateSources = (sources: Set<string>) => setFilters(f => ({ ...f, sources }));
  const updateMonth   = (month: { month: number; year: number } | null) => setFilters(f => ({ ...f, month }));

  // Mois disponibles (ayant au moins 1 événement), triés, à partir du mois courant
  const availableMonths = useMemo(() => {
    const now = new Date();
    const minY = now.getFullYear();
    const minM = now.getMonth();
    const seen = new Set<string>();
    const result: { month: number; year: number }[] = [];
    allEvents.forEach(ev => {
      const d = new Date(ev.date);
      const y = d.getFullYear();
      const m = d.getMonth();
      if (y < minY || (y === minY && m < minM)) return; // ignorer passés
      const key = `${y}-${m}`;
      if (!seen.has(key)) { seen.add(key); result.push({ year: y, month: m }); }
    });
    result.sort((a, b) => a.year !== b.year ? a.year - b.year : a.month - b.month);
    return result;
  }, [allEvents]);

  // Mesure dynamique de la hauteur du header pour s'y coller exactement
  const [headerH, setHeaderH] = React.useState(128);
  React.useEffect(() => {
    const measure = () => {
      const h = document.querySelector('header');
      if (h) setHeaderH(h.getBoundingClientRect().height);
    };
    measure();
    // Re-mesure si le header change de taille (orientation, resize)
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div className="flex flex-col" style={{ paddingTop: `${headerH}px`, height: '100%', overflow: 'hidden' }}>

      {/* Barre de contrôle — fixe sous le header */}
      <div className="flex-shrink-0 bg-zinc-950/98 backdrop-blur-md border-b border-white/8 z-40">

        {/* Ligne 1 : vue + dept + filtres */}
        <div className="px-4 py-2.5 flex items-center justify-between gap-2">

          {/* Toggle vue */}
          <div className="flex gap-1 bg-zinc-900 p-1 rounded-xl flex-shrink-0">
            <button onClick={() => setView('month')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${view === 'month' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}>
              <CalendarIcon size={11}/> <span className="hidden sm:inline">Mensuel</span>
            </button>
            <button onClick={() => setView('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${view === 'list' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}>
              <List size={11}/> <span className="hidden sm:inline">Agenda</span>
            </button>
          </div>

          {/* Accordéon département */}
          <div className="flex-1 flex justify-center">
            <DeptAccordion sources={filters.sources} onChange={updateSources}/>
          </div>

          {/* Filtres avancés */}
          <button onClick={() => setShowFilters(true)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all
              ${activeAdvanced > 0 ? 'bg-red-600 border-red-500 text-white' : 'bg-zinc-800 border-white/15 text-white/70 hover:border-white/30 hover:text-white'}`}>
            <SlidersHorizontal size={13}/>
            <span className="text-[11px] font-black uppercase tracking-wide hidden sm:inline">Filtres</span>
            {activeAdvanced > 0 && (
              <span className="bg-white text-red-600 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{activeAdvanced}</span>
            )}
          </button>
        </div>

        {/* Ligne 2 : strip mois */}
        <MonthStrip selectedMonth={filters.month} onChange={updateMonth} availableMonths={availableMonths}/>

        {/* Tags actifs */}
        {activeAdvanced > 0 && (
          <div className="px-4 pb-2 flex items-center gap-2 flex-wrap">
            {[...filters.formations, ...filters.joueurs, ...filters.categories].map(tag => (
              <span key={tag} className="bg-white/10 text-white/50 text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/15">{tag}</span>
            ))}
            <button onClick={() => setFilters(f => ({ ...f, formations: new Set(), joueurs: new Set(), categories: new Set() }))}
              className="flex items-center gap-1 text-white/30 hover:text-white text-[10px] font-bold transition-colors">
              <RotateCcw size={10}/>Reset
            </button>
          </div>
        )}

        {/* Compteur */}
        <div className="px-4 pb-1.5">
          <span className="text-white/25 text-[10px]">{filteredEvents.length} événements</span>
        </div>
      </div>

      {/* Popup géolocalisation */}
      {geoPrompt && (
        <GeoPrompt
          deptKey={geoDeptKey}
          deptAvailable={geoDeptAvailable}
          onConfirm={handleGeoConfirm}
          onDecline={handleGeoDecline}
        />
      )}

      {/* Zone scrollable — prend tout l'espace restant */}
      <div className="flex-1 overflow-y-auto overscroll-contain pb-36">
        {view === 'month'
          ? <MonthView events={filteredEvents} allEvents={allEvents} onVideoSelect={onVideoSelect} forcedMonth={filters.month} user={user} onAuthRequired={onAuthRequired}/>
          : <ListView  events={filteredEvents} onVideoSelect={onVideoSelect} user={user} onAuthRequired={onAuthRequired}/>
        }
      </div>

      {showFilters && (
        <FilterPanel filters={filters} onChange={setFilters} onClose={() => setShowFilters(false)}/>
      )}
    </div>
  );
};

export default CalendarComponent;
