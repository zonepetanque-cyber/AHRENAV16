// Calendrier des concours du département Calvados (14) - 2026
// Source : https://petanquecalvados.kalisport.com/
// Facebook : https://www.facebook.com/share/17EuNHSq3G/
// Version PDF au 28/01/2026

export interface ConcourCalvados {
  id: number;
  date: string;
  dateFin?: string;
  ville: string;
  club?: string;
  format: "TRIPLETTE" | "DOUBLETTE" | "TÊTE À TÊTE" | "ENDURO" | "AUTRE";
  categorie: string;
  info?: string;
  heure?: string;
  lat: number;
  lng: number;
  type: "CONCOURS" | "CHAMPIONNAT" | "RÉGIONAL" | "NATIONAL" | "SPÉCIAL";
}

export const DEPT_CALVADOS = {
  nom: "Calvados",
  code: "14",
  facebook: "https://www.facebook.com/share/17EuNHSq3G/",
  site: "https://petanquecalvados.kalisport.com/",
};

const COORDS: Record<string, [number, number]> = {
  "Mondeville":           [49.1811,  -0.3283],
  "Deauville":            [49.3583,   0.0731],
  "Livarot":              [49.0053,   0.1522],
  "Mézidon":              [49.0867,  -0.0683],
  "Troarn":               [49.1833,  -0.1833],
  "Pont-l'Évêque":        [49.2928,   0.1892],
  "Le Home-Varaville":    [49.2653,  -0.1944],
  "Bayeux":               [49.2742,  -0.7033],
  "Vac":                  [49.2953,  -0.2183],
  "Tilly-sur-Seulles":    [49.1700,  -0.6200],
  "Condé-en-Normandie":   [48.8508,  -0.5472],
  "Orbec":                [49.0239,   0.4069],
  "Orbec-la-Vespière":    [49.0200,   0.4100],
  "Cormelles-le-Royal":   [49.1594,  -0.3358],
  "Cabourg":              [49.2858,  -0.1253],
  "Luc-sur-Mer":          [49.3253,  -0.3628],
  "Falaise":              [48.8978,  -0.2006],
  "Vire":                 [48.8367,  -0.8886],
  "St-Pierre-en-Auge":    [49.0100,   0.0300],
  "Houlgate":             [49.2994,  -0.0789],
  "Ouistreham":           [49.2806,  -0.2597],
  "Le Molay-Littry":      [49.2361,  -0.8764],
  "Courseulles-sur-Mer":  [49.3344,  -0.4592],
  "Argences":             [49.1219,  -0.2239],
  "Sainteny":             [49.2028,  -1.3078],
  "Potigny":              [48.9806,  -0.2319],
  "Tilly-sur-Seulles":    [49.1700,  -0.6200],
  "Pont-d'Ouilly":        [48.8692,  -0.4000],
  "Trouville-sur-Mer":    [49.3656,   0.0808],
  "Trévière":             [49.2167,  -0.9500],
  "Honfleur":             [49.4186,   0.2319],
  "St-Vigor-le-Grand":    [49.2769,  -0.7456],
  "Hérouville-St-Clair":  [49.2072,  -0.3283],
  "Avranches":            [48.6858,  -1.3567],
  "Blangy-sur-Bresle":    [49.9344,   1.6306],
};

const ll = (ville: string): [number, number] => COORDS[ville] ?? [49.1811, -0.3283];

export const CONCOURS_CALVADOS_2026: ConcourCalvados[] = [

  // ── FÉVRIER 2026 ─────────────────────────────────────────────
  { id: 1,  date: "2026-02-07", dateFin: "2026-02-08", ville: "St-Pierre-les-Elbeuf", format: "DOUBLETTE",   categorie: "Mixte",       info: "National Doublettes Mixtes",                                   heure: "09:00", lat: 49.2833, lng: 1.0333,  type: "NATIONAL" },
  { id: 2,  date: "2026-02-14", dateFin: "2026-02-15", ville: "St-Pierre-les-Elbeuf", format: "TRIPLETTE",   categorie: "Open",        info: "National Triplettes Open",                                     heure: "09:00", lat: 49.2833, lng: 1.0333,  type: "NATIONAL" },

  // ── MARS 2026 ────────────────────────────────────────────────
  { id: 3,  date: "2026-03-14", ville: "Vac",                    format: "TRIPLETTE",   categorie: "Masculin",    info: "Championnat Départemental Triplette Masculin",                 heure: "09:00", lat: ll("Vac")[0],              lng: ll("Vac")[1],              type: "CHAMPIONNAT" },
  { id: 4,  date: "2026-03-14", ville: "Vac",                    format: "DOUBLETTE",   categorie: "Féminin",     info: "Championnat Départemental Doublette Féminin",                  heure: "09:00", lat: ll("Vac")[0],              lng: ll("Vac")[1],              type: "CHAMPIONNAT" },
  { id: 5,  date: "2026-03-15", ville: "Deauville",              format: "TRIPLETTE",   categorie: "Jeu Provençal",info: "Coupe de France JP 1er et 2ème Tour sur 1 site",              heure: "09:00", lat: ll("Deauville")[0],        lng: ll("Deauville")[1],        type: "SPÉCIAL" },
  { id: 6,  date: "2026-03-15", ville: "Livarot",                format: "TRIPLETTE",   categorie: "Seniors",     info: "Challenge Souvenirs 70 ans – Triplette Sénior",                heure: "14:00", lat: ll("Livarot")[0],          lng: ll("Livarot")[1],          type: "CONCOURS" },
  { id: 7,  date: "2026-03-15", ville: "Livarot",                format: "TRIPLETTE",   categorie: "Féminin",     info: "Challenge Souvenirs 70 ans – Triplette Féminin",               heure: "14:00", lat: ll("Livarot")[0],          lng: ll("Livarot")[1],          type: "CONCOURS" },
  { id: 8,  date: "2026-03-21", ville: "St-Pierre-en-Auge",      format: "TRIPLETTE",   categorie: "Promotion",   info: "Sélection Triplette Promotion EST",                            heure: "14:00", lat: ll("St-Pierre-en-Auge")[0], lng: ll("St-Pierre-en-Auge")[1], type: "CONCOURS" },
  { id: 9,  date: "2026-03-21", ville: "Calvados",               format: "TRIPLETTE",   categorie: "Promotion",   info: "Sélection Triplette Promotion OUEST",                          heure: "14:00", lat: ll("Mondeville")[0],       lng: ll("Mondeville")[1],       type: "CONCOURS" },
  { id: 10, date: "2026-03-22", ville: "Mézidon",                format: "TRIPLETTE",   categorie: "Promotion",   info: "Championnat Triplette Promotion",                              heure: "10:00", lat: ll("Mézidon")[0],          lng: ll("Mézidon")[1],          type: "CHAMPIONNAT" },
  { id: 11, date: "2026-03-22", ville: "Mézidon",                format: "TRIPLETTE",   categorie: "Jeunes",      info: "Championnats Triplette Jeunes",                                heure: "10:00", lat: ll("Mézidon")[0],          lng: ll("Mézidon")[1],          type: "CHAMPIONNAT" },
  { id: 12, date: "2026-03-27", ville: "Troarn",                 format: "TRIPLETTE",   categorie: "Vétéran",     info: "Grand Prix Jean Pierre KERGAL – Triplette Vétérans",           heure: "09:00", lat: ll("Troarn")[0],           lng: ll("Troarn")[1],           type: "CONCOURS" },
  { id: 13, date: "2026-03-28", ville: "Deauville",              format: "TÊTE À TÊTE", categorie: "Seniors",     info: "Championnat Tête à Tête Sénior",                               heure: "14:00", lat: ll("Deauville")[0],        lng: ll("Deauville")[1],        type: "CHAMPIONNAT" },
  { id: 14, date: "2026-03-29", ville: "Deauville",              format: "TÊTE À TÊTE", categorie: "Seniors",     info: "Championnat Tête à Tête Sénior reprise en 32ème",              heure: "09:00", lat: ll("Deauville")[0],        lng: ll("Deauville")[1],        type: "CHAMPIONNAT" },
  { id: 15, date: "2026-03-29", ville: "Deauville",              format: "DOUBLETTE",   categorie: "Féminin",     info: "Championnat Doublette Féminin",                                heure: "09:00", lat: ll("Deauville")[0],        lng: ll("Deauville")[1],        type: "CHAMPIONNAT" },
  { id: 16, date: "2026-03-29", ville: "Deauville",              format: "DOUBLETTE",   categorie: "Seniors",     info: "Concours Départemental Doublette Séniors",                    heure: "09:00", lat: ll("Deauville")[0],        lng: ll("Deauville")[1],        type: "CONCOURS" },

  // ── AVRIL 2026 ───────────────────────────────────────────────
  { id: 17, date: "2026-04-02", ville: "Vire",                   format: "TRIPLETTE",   categorie: "Vétéran",     info: "1er Grand Prix Vétérans de la Ville de Vire",                 heure: "09:00", lat: ll("Vire")[0],             lng: ll("Vire")[1],             type: "CONCOURS" },
  { id: 18, date: "2026-04-04", dateFin: "2026-04-05", ville: "Pont-l'Évêque", format: "TRIPLETTE", categorie: "Jeu Provençal", info: "Championnat Triplette Jeu Provençal",                 heure: "08:30", lat: ll("Pont-l'Évêque")[0],    lng: ll("Pont-l'Évêque")[1],    type: "CHAMPIONNAT" },
  { id: 19, date: "2026-04-05", ville: "Pont-l'Évêque",          format: "AUTRE",       categorie: "Jeunes",      info: "Championnat Tir de Précision Juniors",                         heure: "09:00", lat: ll("Pont-l'Évêque")[0],    lng: ll("Pont-l'Évêque")[1],    type: "CHAMPIONNAT" },
  { id: 20, date: "2026-04-06", ville: "Deauville",              format: "TRIPLETTE",   categorie: "Jeu Provençal",info: "Coupe de France JP 3ème et 4ème Tour sur 1 site",             heure: "09:00", lat: ll("Deauville")[0],        lng: ll("Deauville")[1],        type: "SPÉCIAL" },
  { id: 21, date: "2026-04-11", ville: "Livarot",                format: "TRIPLETTE",   categorie: "Seniors",     info: "Sélection Triplette Sénior EST",                              heure: "14:00", lat: ll("Livarot")[0],          lng: ll("Livarot")[1],          type: "CONCOURS" },
  { id: 22, date: "2026-04-11", ville: "Luc-sur-Mer",            format: "TRIPLETTE",   categorie: "Seniors",     info: "Sélection Triplette Sénior OUEST",                             heure: "14:00", lat: ll("Luc-sur-Mer")[0],      lng: ll("Luc-sur-Mer")[1],      type: "CONCOURS" },
  { id: 23, date: "2026-04-12", ville: "Mondeville",             format: "TRIPLETTE",   categorie: "Seniors",     info: "Championnat Triplette Sénior",                                 heure: "09:00", lat: ll("Mondeville")[0],       lng: ll("Mondeville")[1],       type: "CHAMPIONNAT" },
  { id: 24, date: "2026-04-12", ville: "Mondeville",             format: "TRIPLETTE",   categorie: "Féminin",     info: "Championnat Triplette Féminin",                                heure: "09:00", lat: ll("Mondeville")[0],       lng: ll("Mondeville")[1],       type: "CHAMPIONNAT" },
  { id: 25, date: "2026-04-18", ville: "Trouville-sur-Mer",      format: "DOUBLETTE",   categorie: "Mixte",       info: "Sélection Doublette Mixtes EST",                              heure: "14:00", lat: ll("Trouville-sur-Mer")[0], lng: ll("Trouville-sur-Mer")[1], type: "CONCOURS" },
  { id: 26, date: "2026-04-18", ville: "Le Molay-Littry",        format: "DOUBLETTE",   categorie: "Mixte",       info: "Sélection Doublette Mixtes OUEST",                             heure: "14:00", lat: ll("Le Molay-Littry")[0],   lng: ll("Le Molay-Littry")[1],   type: "CONCOURS" },
  { id: 27, date: "2026-04-19", ville: "Le Home-Varaville",      format: "DOUBLETTE",   categorie: "Mixte",       info: "Championnat Doublette Mixtes",                                 heure: "09:00", lat: ll("Le Home-Varaville")[0], lng: ll("Le Home-Varaville")[1], type: "CHAMPIONNAT" },
  { id: 28, date: "2026-04-19", ville: "Le Home-Varaville",      format: "TÊTE À TÊTE", categorie: "Jeunes",      info: "Championnat Honorifique Tête à Tête Jeunes",                  heure: "09:00", lat: ll("Le Home-Varaville")[0], lng: ll("Le Home-Varaville")[1], type: "CHAMPIONNAT" },
  { id: 29, date: "2026-04-22", ville: "Cabourg",                format: "TRIPLETTE",   categorie: "Vétéran",     info: "Sélection Triplette Vétéran EST",                             heure: "14:00", lat: ll("Cabourg")[0],          lng: ll("Cabourg")[1],          type: "CONCOURS" },
  { id: 30, date: "2026-04-22", ville: "Vire",                   format: "TRIPLETTE",   categorie: "Vétéran",     info: "Sélection Triplette Vétéran OUEST",                            heure: "14:00", lat: ll("Vire")[0],             lng: ll("Vire")[1],             type: "CONCOURS" },
  { id: 31, date: "2026-04-23", ville: "Bayeux",                 format: "TRIPLETTE",   categorie: "Vétéran",     info: "Championnat Triplette Vétéran",                                heure: "09:00", lat: ll("Bayeux")[0],           lng: ll("Bayeux")[1],           type: "CHAMPIONNAT" },
  { id: 32, date: "2026-04-25", ville: "Deauville",              format: "DOUBLETTE",   categorie: "Seniors",     info: "Sélection Doublette Sénior EST",                              heure: "14:00", lat: ll("Deauville")[0],        lng: ll("Deauville")[1],        type: "CONCOURS" },
  { id: 33, date: "2026-04-25", ville: "Le Molay-Littry",        format: "DOUBLETTE",   categorie: "Seniors",     info: "Sélection Doublette Sénior OUEST",                             heure: "14:00", lat: ll("Le Molay-Littry")[0],   lng: ll("Le Molay-Littry")[1],   type: "CONCOURS" },
  { id: 34, date: "2026-04-26", ville: "Vac",                    format: "DOUBLETTE",   categorie: "Seniors",     info: "Championnat Doublette Sénior",                                 heure: "09:00", lat: ll("Vac")[0],              lng: ll("Vac")[1],              type: "CHAMPIONNAT" },
  { id: 35, date: "2026-04-26", ville: "Vac",                    format: "TÊTE À TÊTE", categorie: "Féminin",     info: "Championnat Tête à Tête Féminin",                              heure: "09:00", lat: ll("Vac")[0],              lng: ll("Vac")[1],              type: "CHAMPIONNAT" },

  // ── MAI 2026 ─────────────────────────────────────────────────
  { id: 36, date: "2026-05-01", ville: "Condé-en-Normandie",     format: "DOUBLETTE",   categorie: "Seniors",     info: "Grand Prix NAUDIN Doublette Sénior",                          heure: "09:00", lat: ll("Condé-en-Normandie")[0], lng: ll("Condé-en-Normandie")[1], type: "CONCOURS" },
  { id: 37, date: "2026-05-01", ville: "Condé-en-Normandie",     format: "DOUBLETTE",   categorie: "Féminin",     info: "Grand Prix NAUDIN Doublette Féminin",                          heure: "14:00", lat: ll("Condé-en-Normandie")[0], lng: ll("Condé-en-Normandie")[1], type: "CONCOURS" },
  { id: 38, date: "2026-05-02", ville: "Orbec",                  format: "TRIPLETTE",   categorie: "Mixte",       info: "Sélection Triplette Mixtes EST",                              heure: "14:00", lat: ll("Orbec")[0],            lng: ll("Orbec")[1],            type: "CONCOURS" },
  { id: 39, date: "2026-05-02", ville: "Cormelles-le-Royal",     format: "TRIPLETTE",   categorie: "Mixte",       info: "Sélection Triplette Mixtes OUEST",                             heure: "14:00", lat: ll("Cormelles-le-Royal")[0], lng: ll("Cormelles-le-Royal")[1], type: "CONCOURS" },
  { id: 40, date: "2026-05-03", ville: "Tilly-sur-Seulles",      format: "TRIPLETTE",   categorie: "Mixte",       info: "Championnat Triplette Mixtes",                                 heure: "09:00", lat: ll("Tilly-sur-Seulles")[0], lng: ll("Tilly-sur-Seulles")[1], type: "CHAMPIONNAT" },
  { id: 41, date: "2026-05-03", ville: "Tilly-sur-Seulles",      format: "DOUBLETTE",   categorie: "Jeunes",      info: "Championnat Honorifique Doublette Jeunes",                    heure: "09:00", lat: ll("Tilly-sur-Seulles")[0], lng: ll("Tilly-sur-Seulles")[1], type: "CHAMPIONNAT" },
  { id: 42, date: "2026-05-08", ville: "Cabourg",                format: "TRIPLETTE",   categorie: "Pétanque",    info: "Coupe de France 1er et 2ème Tour sur 2 sites",                heure: "09:00", lat: ll("Cabourg")[0],          lng: ll("Cabourg")[1],          type: "SPÉCIAL" },
  { id: 43, date: "2026-05-09", dateFin: "2026-05-10", ville: "Pont-l'Évêque", format: "DOUBLETTE", categorie: "Jeu Provençal", info: "Championnat Doublette Jeu Provençal",              heure: "08:30", lat: ll("Pont-l'Évêque")[0],    lng: ll("Pont-l'Évêque")[1],    type: "CHAMPIONNAT" },
  { id: 44, date: "2026-05-10", ville: "Pont-l'Évêque",          format: "AUTRE",       categorie: "Jeunes",      info: "Concours Jeunes à la mêlée",                                  heure: "09:00", lat: ll("Pont-l'Évêque")[0],    lng: ll("Pont-l'Évêque")[1],    type: "CONCOURS" },
  { id: 45, date: "2026-05-16", ville: "Cabourg",                format: "DOUBLETTE",   categorie: "Mixte",       info: "Challenge Alain BURGAUD",                                      heure: "09:00", lat: ll("Cabourg")[0],          lng: ll("Cabourg")[1],          type: "CONCOURS" },
  { id: 46, date: "2026-05-21", ville: "Cormelles-le-Royal",     format: "TRIPLETTE",   categorie: "Vétéran",     info: "GP Ville de Cormelles le Royal Vétérans",                     heure: "09:30", lat: ll("Cormelles-le-Royal")[0], lng: ll("Cormelles-le-Royal")[1], type: "CONCOURS" },
  { id: 47, date: "2026-05-23", ville: "Vire",                   format: "TRIPLETTE",   categorie: "Seniors",     info: "8ème GP de la Ville de VIRE Triplette Sénior",                heure: "09:00", lat: ll("Vire")[0],             lng: ll("Vire")[1],             type: "CONCOURS" },
  { id: 48, date: "2026-05-23", ville: "Vire",                   format: "DOUBLETTE",   categorie: "Féminin",     info: "8ème GP de la Ville de VIRE Doublette Féminin",               heure: "14:00", lat: ll("Vire")[0],             lng: ll("Vire")[1],             type: "CONCOURS" },
  { id: 49, date: "2026-05-25", ville: "Bayeux",                 format: "DOUBLETTE",   categorie: "Seniors",     info: "GP de la Ville de Bayeux Doublette Sénior",                   heure: "14:00", lat: ll("Bayeux")[0],           lng: ll("Bayeux")[1],           type: "CONCOURS" },
  { id: 50, date: "2026-05-25", ville: "Bayeux",                 format: "DOUBLETTE",   categorie: "Féminin",     info: "GP de la Ville de Bayeux Doublette Féminin",                  heure: "14:00", lat: ll("Bayeux")[0],           lng: ll("Bayeux")[1],           type: "CONCOURS" },
  { id: 51, date: "2026-05-28", ville: "Argences",               format: "DOUBLETTE",   categorie: "Vétéran",     info: "Championnat Honorifique Doublette Vétéran",                   heure: "09:00", lat: ll("Argences")[0],         lng: ll("Argences")[1],         type: "CHAMPIONNAT" },
  { id: 52, date: "2026-05-30", ville: "Mondeville",             format: "TRIPLETTE",   categorie: "Seniors",     info: "Challenge PEREZ Triplette Sénior",                             heure: "09:00", lat: ll("Mondeville")[0],       lng: ll("Mondeville")[1],       type: "CONCOURS" },
  { id: 53, date: "2026-05-30", ville: "Mondeville",             format: "TRIPLETTE",   categorie: "Féminin",     info: "Challenge PEREZ Triplette Féminin",                            heure: "14:00", lat: ll("Mondeville")[0],       lng: ll("Mondeville")[1],       type: "CONCOURS" },
  { id: 54, date: "2026-05-30", ville: "Orbec-la-Vespière",      format: "TRIPLETTE",   categorie: "Seniors",     info: "Grand Prix d'Orbec limité 84 équipes – Triplette Sénior",     heure: "09:00", lat: ll("Orbec-la-Vespière")[0], lng: ll("Orbec-la-Vespière")[1], type: "CONCOURS" },
  { id: 55, date: "2026-05-30", dateFin: "2026-05-31", ville: "Falaise", format: "TRIPLETTE", categorie: "Jeu Provençal", info: "Championnat Régional TJP – CD14",                    heure: "09:00", lat: ll("Falaise")[0],          lng: ll("Falaise")[1],          type: "RÉGIONAL" },
  { id: 56, date: "2026-05-31", ville: "Orbec-la-Vespière",      format: "TRIPLETTE",   categorie: "Mixte",       info: "Grand Prix d'Orbec limité 84 équipes – Triplette Mixte",      heure: "09:00", lat: ll("Orbec-la-Vespière")[0], lng: ll("Orbec-la-Vespière")[1], type: "CONCOURS" },

  // ── JUIN 2026 ────────────────────────────────────────────────
  { id: 57, date: "2026-06-06", ville: "St-Pierre-en-Auge",      format: "TRIPLETTE",   categorie: "Open",        info: "Grand Prix Crédit Agricole Triplette",                        heure: "10:00", lat: ll("St-Pierre-en-Auge")[0], lng: ll("St-Pierre-en-Auge")[1], type: "CONCOURS" },
  { id: 58, date: "2026-06-07", ville: "Deauville",              format: "TRIPLETTE",   categorie: "Pétanque",    info: "Coupe de France 3ème et 4ème Tour sur 1 site",                heure: "09:00", lat: ll("Deauville")[0],        lng: ll("Deauville")[1],        type: "SPÉCIAL" },
  { id: 59, date: "2026-06-11", ville: "St-Pierre-en-Auge",      format: "TÊTE À TÊTE", categorie: "Vétéran",     info: "Championnat Honorifique Tête à Tête Vétéran",                 heure: "09:00", lat: ll("St-Pierre-en-Auge")[0], lng: ll("St-Pierre-en-Auge")[1], type: "CHAMPIONNAT" },
  { id: 60, date: "2026-06-11", ville: "St-Pierre-en-Auge",      format: "DOUBLETTE",   categorie: "Vétéran",     info: "Championnat Honorifique Doublette Vétéranes",                 heure: "09:00", lat: ll("St-Pierre-en-Auge")[0], lng: ll("St-Pierre-en-Auge")[1], type: "CHAMPIONNAT" },
  { id: 61, date: "2026-06-13", ville: "St-Pierre-en-Auge",      format: "AUTRE",       categorie: "Open",        info: "Coupe de CD14 1er et 2ème Tour sur 1 site",                   heure: "09:00", lat: ll("St-Pierre-en-Auge")[0], lng: ll("St-Pierre-en-Auge")[1], type: "SPÉCIAL" },
  { id: 62, date: "2026-06-13", dateFin: "2026-06-14", ville: "Blangy-sur-Bresle", format: "TRIPLETTE", categorie: "Open",  info: "National Triplettes Open et Féminin",                heure: "09:00", lat: ll("Blangy-sur-Bresle")[0], lng: ll("Blangy-sur-Bresle")[1], type: "NATIONAL" },
  { id: 63, date: "2026-06-20", ville: "Le Home-Varaville",      format: "TRIPLETTE",   categorie: "Open",        info: "Grand Prix du Home Varaville Triplette",                      heure: "09:00", lat: ll("Le Home-Varaville")[0], lng: ll("Le Home-Varaville")[1], type: "CONCOURS" },
  { id: 64, date: "2026-06-21", ville: "Livarot",                format: "AUTRE",       categorie: "Open",        info: "Coupe de CD14 3ème et 4ème Tour",                             heure: "09:00", lat: ll("Livarot")[0],          lng: ll("Livarot")[1],          type: "SPÉCIAL" },
  { id: 65, date: "2026-06-25", ville: "Ouistreham",             format: "TRIPLETTE",   categorie: "Vétéran",     info: "OUISTREHAMAISE Triplette Vétéran",                             heure: "09:00", lat: ll("Ouistreham")[0],       lng: ll("Ouistreham")[1],       type: "CONCOURS" },
  { id: 66, date: "2026-06-27", ville: "Ouistreham",             format: "TRIPLETTE",   categorie: "Seniors",     info: "OUISTREHAMAISE Triplette Sénior",                              heure: "09:00", lat: ll("Ouistreham")[0],       lng: ll("Ouistreham")[1],       type: "CONCOURS" },
  { id: 67, date: "2026-06-28", ville: "Ouistreham",             format: "DOUBLETTE",   categorie: "Seniors",     info: "OUISTREHAMAISE Doublette Sénior",                              heure: "09:00", lat: ll("Ouistreham")[0],       lng: ll("Ouistreham")[1],       type: "CONCOURS" },
  { id: 68, date: "2026-06-28", ville: "Ouistreham",             format: "DOUBLETTE",   categorie: "Féminin",     info: "OUISTREHAMAISE Doublette Féminin",                             heure: "09:00", lat: ll("Ouistreham")[0],       lng: ll("Ouistreham")[1],       type: "CONCOURS" },

  // ── JUILLET 2026 ─────────────────────────────────────────────
  { id: 69, date: "2026-07-02", dateFin: "2026-07-03", ville: "Avranches", format: "TRIPLETTE", categorie: "Vétéran", info: "National Vétérans d'Avranches",                            heure: "09:00", lat: ll("Avranches")[0],        lng: ll("Avranches")[1],        type: "NATIONAL" },
  { id: 70, date: "2026-07-04", dateFin: "2026-07-05", ville: "Avranches", format: "TRIPLETTE", categorie: "Open",   info: "National Triplette Open et Doublette Féminin",              heure: "09:00", lat: ll("Avranches")[0],        lng: ll("Avranches")[1],        type: "NATIONAL" },

  // ── AOÛT 2026 ────────────────────────────────────────────────
  { id: 71, date: "2026-08-22", ville: "St-Pierre-en-Auge",      format: "TRIPLETTE",   categorie: "Open",        info: "Challenge MORGAN Triplette",                                  heure: "10:00", lat: ll("St-Pierre-en-Auge")[0], lng: ll("St-Pierre-en-Auge")[1], type: "CONCOURS" },
  { id: 72, date: "2026-08-28", ville: "Courseulles-sur-Mer",    format: "DOUBLETTE",   categorie: "Vétéran",     info: "Championnat Honorifique Doublette Mixte Vétéran",             heure: "09:00", lat: ll("Courseulles-sur-Mer")[0], lng: ll("Courseulles-sur-Mer")[1], type: "CHAMPIONNAT" },

  // ── SEPTEMBRE 2026 ───────────────────────────────────────────
  { id: 73, date: "2026-09-04", ville: "Le Molay-Littry",        format: "TRIPLETTE",   categorie: "Vétéran",     info: "Grand Prix du Comité du Calvados Triplette Vétéran",          heure: "09:00", lat: ll("Le Molay-Littry")[0],   lng: ll("Le Molay-Littry")[1],   type: "CONCOURS" },
  { id: 74, date: "2026-09-05", ville: "Le Molay-Littry",        format: "TRIPLETTE",   categorie: "Mixte",       info: "Grand Prix du Comité du Calvados Triplette Mixte",            heure: "09:00", lat: ll("Le Molay-Littry")[0],   lng: ll("Le Molay-Littry")[1],   type: "CONCOURS" },
  { id: 75, date: "2026-09-12", ville: "Houlgate",               format: "TRIPLETTE",   categorie: "Seniors",     info: "Challenge MARINEUR Triplette Sénior Houlgate",                heure: "09:00", lat: ll("Houlgate")[0],         lng: ll("Houlgate")[1],         type: "CONCOURS" },
  { id: 76, date: "2026-09-17", ville: "Trévière",               format: "TRIPLETTE",   categorie: "Vétéran",     info: "Championnat Honorifique Triplette Mixte Vétéran",             heure: "09:00", lat: ll("Trévière")[0],         lng: ll("Trévière")[1],         type: "CHAMPIONNAT" },
  { id: 77, date: "2026-09-19", ville: "Luc-sur-Mer",            format: "AUTRE",       categorie: "Open",        info: "Challenge MOREAU",                                             heure: "09:00", lat: ll("Luc-sur-Mer")[0],      lng: ll("Luc-sur-Mer")[1],      type: "CONCOURS" },

  // ── OCTOBRE 2026 ─────────────────────────────────────────────
  { id: 78, date: "2026-10-03", ville: "Cormelles-le-Royal",     format: "TRIPLETTE",   categorie: "Mixte",       info: "Cormelles Triplette 2 Séniors + 1 Jeune",                    heure: "09:00", lat: ll("Cormelles-le-Royal")[0], lng: ll("Cormelles-le-Royal")[1], type: "CONCOURS" },
  { id: 79, date: "2026-10-03", ville: "Calvados",               format: "DOUBLETTE",   categorie: "Jeunes",      info: "GP du Comité Doublette Jeunes",                               heure: "09:00", lat: ll("Mondeville")[0],       lng: ll("Mondeville")[1],       type: "CONCOURS" },
  { id: 80, date: "2026-10-10", ville: "Mondeville",             format: "DOUBLETTE",   categorie: "Seniors",     info: "Challenge DROUIN Doublette Sénior",                           heure: "14:00", lat: ll("Mondeville")[0],       lng: ll("Mondeville")[1],       type: "CONCOURS" },
  { id: 81, date: "2026-10-11", ville: "Mézidon",                format: "TRIPLETTE",   categorie: "Féminin",     info: "Triplette Féminin",                                            heure: "14:00", lat: ll("Mézidon")[0],          lng: ll("Mézidon")[1],          type: "CONCOURS" },
  { id: 82, date: "2026-10-11", ville: "Mézidon",                format: "AUTRE",       categorie: "Open",        info: "Coupe de CD14 Demi-Finale et Finale",                         heure: "14:00", lat: ll("Mézidon")[0],          lng: ll("Mézidon")[1],          type: "SPÉCIAL" },
  { id: 83, date: "2026-10-15", ville: "Cormelles-le-Royal",     format: "AUTRE",       categorie: "Vétéran",     info: "1/2 Finale et Finale Coupe du Calvados Vétérans",             heure: "09:00", lat: ll("Cormelles-le-Royal")[0], lng: ll("Cormelles-le-Royal")[1], type: "SPÉCIAL" },
  { id: 84, date: "2026-10-17", ville: "Troarn",                 format: "TRIPLETTE",   categorie: "Mixte",       info: "Challenge POUTEAU 2 Séniors + 1 Vétéran",                    heure: "09:00", lat: ll("Troarn")[0],           lng: ll("Troarn")[1],           type: "CONCOURS" },
];
