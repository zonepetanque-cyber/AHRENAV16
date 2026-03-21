// Calendrier des concours du département Eure (27) - 2026
// Source : Calendrier FFPJP CD27 2026 (général + vétérans + jeunes)
// Site : https://comite-eure-petanque.fr/index.html
// Facebook : https://www.facebook.com/groups/864146177968582/

export interface ConcourEure {
  id: number;
  date: string;
  dateFin?: string;
  ville: string;
  lieu?: string;
  club: string;
  format: string;
  categorie: string;
  dotation?: string;
  info?: string;
  lat: number;
  lng: number;
  type: "CONCOURS" | "CHAMPIONNAT" | "RÉGIONAL" | "NATIONAL" | "SPÉCIAL";
}

const COORDS: Record<string, [number, number]> = {
  "Serquigny":        [49.0778, 0.7072],
  "Vernon":           [49.0928, 1.4839],
  "ALM":              [49.0167, 1.4000],
  "Louviers":         [49.2167, 1.1667],
  "Pont-Audemer":     [49.3561, 0.5147],
  "Conches":          [48.9589, 0.9289],
  "Gasny":            [49.0922, 1.5219],
  "Fleury-sur-Andelle":[49.3606, 1.3681],
  "PCBI":             [49.1500, 1.1000],
  "Damville":         [48.8631, 0.9786],
  "Gaillon":          [49.1589, 1.3389],
  "Navarre":          [49.1833, 1.1333],
  "St-Marcel":        [49.0989, 1.4739],
  "2A Pétanque":      [49.1000, 1.1500],
  "Gisors":           [49.2806, 1.7767],
  "Le Neubourg":      [49.1478, 0.9083],
  "Ezy-sur-Eure":     [48.8650, 1.4772],
  "Gravigny":         [49.0344, 1.0964],
  "Les Andelys":      [49.2458, 1.5700],
  "Breteuil":         [48.8333, 0.9083],
  "Bourgtheroulde":   [49.3456, 0.8736],
  "Bernay":           [49.0878, 0.5983],
  "Saint-André":      [49.1167, 0.8833],
  "Saint-Michel":     [49.1500, 1.1500],
  "Pétanque Sud":     [49.0500, 1.1000],
  "Aumale":           [49.7700, 1.7500],
};

const c = (ville: string): [number, number] => COORDS[ville] || [49.1000, 1.1000];

export const DEPT_EURE = {
  nom: "Eure",
  code: "27",
  facebook: "https://www.facebook.com/groups/864146177968582/",
  site: "https://comite-eure-petanque.fr/index.html",
};

export const CONCOURS_EURE_2026: ConcourEure[] = [

  // ══ JANVIER 2026 ══════════════════════════════════════════
  { id:1,  date:"2026-01-24", dateFin:"2026-01-25", ville:"Serquigny",  club:"Serquigny",    format:"TRIPLETTE", categorie:"Sénior",   info:"Challenge M. NOEL - Matin",                  lat:c("Serquigny")[0],  lng:c("Serquigny")[1],  type:"CONCOURS" },
  { id:2,  date:"2026-01-30", ville:"Vernon",       club:"Vernon",       format:"TRIPLETTE", categorie:"Vétéran", info:"Challenge Gilbert LE MOEL - Vétérans",        lat:c("Vernon")[0],     lng:c("Vernon")[1],     type:"CONCOURS" },
  { id:3,  date:"2026-01-31", ville:"Vernon",       club:"Vernon",       format:"TRIPLETTE", categorie:"Mixte",   info:"Challenge Gilbert LE MOEL - Mixte",           lat:c("Vernon")[0],     lng:c("Vernon")[1],     type:"CONCOURS" },

  // ══ FÉVRIER 2026 ══════════════════════════════════════════
  { id:4,  date:"2026-02-01", ville:"ALM",          club:"ALM",          format:"TRIPLETTE", categorie:"Jeu Provençal", info:"Concours provençal limité 16 équipes 8h", lat:c("ALM")[0],        lng:c("ALM")[1],        type:"CONCOURS" },
  { id:5,  date:"2026-02-14", ville:"CD27",         club:"CD27",         format:"TRIPLETTE", categorie:"Jeu Provençal", info:"Coupe de France Provençal",              lat:49.1000,            lng:1.1000,             type:"NATIONAL" },
  { id:6,  date:"2026-02-15", ville:"CD27",         club:"CD27",         format:"TRIPLETTE", categorie:"Jeu Provençal", info:"Coupe de France Provençal (suite)",       lat:49.1000,            lng:1.1000,             type:"NATIONAL" },
  { id:7,  date:"2026-02-21", ville:"Louviers",     club:"Louviers",     format:"TRIPLETTE", categorie:"Mixte",   info:"Concours Mixte 9h",                           lat:c("Louviers")[0],   lng:c("Louviers")[1],   type:"CONCOURS" },
  { id:8,  date:"2026-02-25", ville:"ALM",          club:"ALM",          format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("ALM")[0],        lng:c("ALM")[1],        type:"CONCOURS" },
  { id:9,  date:"2026-02-28", ville:"Pont-Audemer", club:"Pont-Audemer", format:"DOUBLETTE", categorie:"Sénior",  info:"Concours TC 2EN1 14h",                        lat:c("Pont-Audemer")[0],lng:c("Pont-Audemer")[1],type:"CONCOURS" },

  // ══ MARS 2026 ═════════════════════════════════════════════
  { id:10, date:"2026-03-01", ville:"CD27",         club:"CD27",         format:"DOUBLETTE", categorie:"Jeu Provençal", info:"Concours Provençal",                     lat:49.1000,            lng:1.1000,             type:"CONCOURS" },
  { id:11, date:"2026-03-05", ville:"Ezy-sur-Eure", club:"Ezy-sur-Eure", format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans - Jeudi",                            lat:c("Ezy-sur-Eure")[0],lng:c("Ezy-sur-Eure")[1],type:"CONCOURS" },
  { id:12, date:"2026-03-07", ville:"Conches",      club:"Conches",      format:"DOUBLETTE", categorie:"Féminin", info:"Concours Féminin 9h",                         lat:c("Conches")[0],    lng:c("Conches")[1],    type:"CONCOURS" },
  { id:13, date:"2026-03-11", ville:"Gasny",        club:"Gasny",        format:"DOUBLETTE", categorie:"Vétéran", info:"Jet du But 10 heures",                        lat:c("Gasny")[0],      lng:c("Gasny")[1],      type:"CONCOURS" },
  { id:14, date:"2026-03-14", ville:"Gasny",        club:"Gasny",        format:"TRIPLETTE", categorie:"Sénior",  info:"Challenge PICOLLO 10H",                       lat:c("Gasny")[0],      lng:c("Gasny")[1],      type:"CONCOURS" },
  { id:15, date:"2026-03-15", ville:"Fleury-sur-Andelle", club:"Fleury", format:"TRIPLETTE", categorie:"Mixte",   info:"Concours Mixte 14h",                          lat:c("Fleury-sur-Andelle")[0],lng:c("Fleury-sur-Andelle")[1],type:"CONCOURS" },
  { id:16, date:"2026-03-18", ville:"Pont-Audemer", club:"Pont-Audemer", format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("Pont-Audemer")[0],lng:c("Pont-Audemer")[1],type:"CONCOURS" },
  { id:17, date:"2026-03-25", ville:"Breteuil",     club:"Breteuil",     format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("Breteuil")[0],   lng:c("Breteuil")[1],   type:"CONCOURS" },
  { id:18, date:"2026-03-29", ville:"Pétanque Sud", club:"Pétanque Sud", format:"INDIVIDUEL",categorie:"Jeunes",  info:"Championnat Départemental Jeunes - Tête à tête", lat:c("Pétanque Sud")[0],lng:c("Pétanque Sud")[1],type:"CHAMPIONNAT" },

  // ══ AVRIL 2026 ════════════════════════════════════════════
  { id:19, date:"2026-04-01", ville:"Serquigny",    club:"Serquigny",    format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("Serquigny")[0],  lng:c("Serquigny")[1],  type:"CONCOURS" },
  { id:20, date:"2026-04-04", ville:"Gasny",        club:"Gasny",        format:"TRIPLETTE", categorie:"Jeu Provençal", info:"Championnat Départemental - Triplette Provençal", lat:c("Gasny")[0], lng:c("Gasny")[1], type:"CHAMPIONNAT" },
  { id:21, date:"2026-04-05", ville:"Gasny",        club:"Gasny",        format:"TRIPLETTE", categorie:"Jeu Provençal", info:"Championnat Départemental - Triplette Provençal (suite)", lat:c("Gasny")[0], lng:c("Gasny")[1], type:"CHAMPIONNAT" },
  { id:22, date:"2026-04-08", ville:"Louviers",     club:"Louviers",     format:"TRIPLETTE", categorie:"Vétéran", info:"Challenge PUREN",                             lat:c("Louviers")[0],   lng:c("Louviers")[1],   type:"CONCOURS" },
  { id:23, date:"2026-04-11", ville:"Vernon",       lieu:"Boulodrome",   club:"Vernon",       format:"TRIPLETTE", categorie:"Sénior",  info:"Championnat Départemental Jeunes - Triplette", lat:c("Vernon")[0], lng:c("Vernon")[1], type:"CHAMPIONNAT" },
  { id:24, date:"2026-04-11", ville:"Vernon",       lieu:"Boulodrome",   club:"Vernon",       format:"TRIPLETTE", categorie:"Masculin", info:"Championnat Départemental - Triplette Hommes", lat:c("Vernon")[0], lng:c("Vernon")[1], type:"CHAMPIONNAT" },
  { id:25, date:"2026-04-12", ville:"Vernon",       lieu:"Boulodrome",   club:"Vernon",       format:"TRIPLETTE", categorie:"Féminin", info:"Championnat Départemental - Triplette Femmes", lat:c("Vernon")[0], lng:c("Vernon")[1], type:"CHAMPIONNAT" },
  { id:26, date:"2026-04-15", ville:"Gisors",       club:"Gisors",       format:"DOUBLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("Gisors")[0],     lng:c("Gisors")[1],     type:"CONCOURS" },
  { id:27, date:"2026-04-18", ville:"Damville",     club:"Damville",     format:"DOUBLETTE", categorie:"Mixte",   info:"Championnat Départemental - Doublette Mixte", lat:c("Damville")[0],   lng:c("Damville")[1],   type:"CHAMPIONNAT" },
  { id:28, date:"2026-04-19", ville:"Damville",     club:"Damville",     format:"DOUBLETTE", categorie:"Mixte",   info:"Championnat Départemental - Doublette Mixte (suite)", lat:c("Damville")[0], lng:c("Damville")[1], type:"CHAMPIONNAT" },
  { id:29, date:"2026-04-21", ville:"PCBI",         lieu:"Boulodrome",   club:"PCBI",         format:"TRIPLETTE", categorie:"Promotion", info:"Championnat Départemental - Triplette Promotion", lat:c("PCBI")[0], lng:c("PCBI")[1], type:"CHAMPIONNAT" },
  { id:30, date:"2026-04-22", ville:"Breteuil",     club:"Breteuil",     format:"TRIPLETTE", categorie:"Vétéran", info:"Championnat de l\'Eure Vétérans",              lat:c("Breteuil")[0],   lng:c("Breteuil")[1],   type:"CHAMPIONNAT" },
  { id:31, date:"2026-04-22", ville:"PCBI",         lieu:"Boulodrome",   club:"PCBI",         format:"TRIPLETTE", categorie:"Promotion", info:"Championnat Départemental - Triplette Promotion (suite)", lat:c("PCBI")[0], lng:c("PCBI")[1], type:"CHAMPIONNAT" },
  { id:32, date:"2026-04-23", ville:"Breteuil",     club:"Breteuil",     format:"TRIPLETTE", categorie:"Vétéran", info:"Suite Championnat Vétérans",                  lat:c("Breteuil")[0],   lng:c("Breteuil")[1],   type:"CHAMPIONNAT" },
  { id:33, date:"2026-04-25", ville:"Gaillon",      club:"Gaillon",      format:"DOUBLETTE", categorie:"Masculin", info:"Championnat Départemental - Doublette Hommes", lat:c("Gaillon")[0],  lng:c("Gaillon")[1],    type:"CHAMPIONNAT" },
  { id:34, date:"2026-04-25", ville:"Gaillon",      club:"Gaillon",      format:"INDIVIDUEL",categorie:"Féminin", info:"Championnat Départemental - Tête à tête Féminin", lat:c("Gaillon")[0], lng:c("Gaillon")[1],   type:"CHAMPIONNAT" },
  { id:35, date:"2026-04-26", ville:"Gaillon",      club:"Gaillon",      format:"DOUBLETTE", categorie:"Masculin", info:"Championnat Départemental - Doublette Hommes (suite)", lat:c("Gaillon")[0], lng:c("Gaillon")[1], type:"CHAMPIONNAT" },
  { id:36, date:"2026-04-28", ville:"Vernon",       lieu:"Boulodrome",   club:"Vernon",       format:"INDIVIDUEL",categorie:"Masculin", info:"Championnat Départemental - Tête à tête Hommes", lat:c("Vernon")[0], lng:c("Vernon")[1], type:"CHAMPIONNAT" },
  { id:37, date:"2026-04-28", ville:"Vernon",       lieu:"Boulodrome",   club:"Vernon",       format:"DOUBLETTE", categorie:"Féminin", info:"Championnat Départemental - Doublette Féminin", lat:c("Vernon")[0], lng:c("Vernon")[1], type:"CHAMPIONNAT" },
  { id:38, date:"2026-04-29", ville:"Bourgtheroulde",club:"Bourgtheroulde",format:"TRIPLETTE",categorie:"Vétéran", info:"Vétérans",                                   lat:c("Bourgtheroulde")[0],lng:c("Bourgtheroulde")[1],type:"CONCOURS" },
  { id:39, date:"2026-04-29", ville:"Vernon",       lieu:"Boulodrome",   club:"Vernon",       format:"INDIVIDUEL",categorie:"Masculin", info:"Championnat Départemental - Tête à tête Hommes (suite)", lat:c("Vernon")[0], lng:c("Vernon")[1], type:"CHAMPIONNAT" },

  // ══ MAI 2026 ══════════════════════════════════════════════
  { id:40, date:"2026-05-02", ville:"Navarre",      club:"Navarre",      format:"TRIPLETTE", categorie:"Mixte",   info:"Championnat Départemental - Triplette Mixte", lat:c("Navarre")[0],    lng:c("Navarre")[1],    type:"CHAMPIONNAT" },
  { id:41, date:"2026-05-03", ville:"Navarre",      club:"Navarre",      format:"TRIPLETTE", categorie:"Mixte",   info:"Championnat Départemental - Triplette Mixte (suite)", lat:c("Navarre")[0], lng:c("Navarre")[1], type:"CHAMPIONNAT" },
  { id:42, date:"2026-05-09", ville:"Pont-Audemer", club:"Pont-Audemer", format:"DOUBLETTE", categorie:"Jeu Provençal", info:"Championnat Départemental - Doublette Provençal", lat:c("Pont-Audemer")[0], lng:c("Pont-Audemer")[1], type:"CHAMPIONNAT" },
  { id:43, date:"2026-05-09", ville:"CD27",         club:"CD27",         format:"INDIVIDUEL",categorie:"Jeunes",  info:"Championnat Départemental Junior - Tir de Précision", lat:49.1000, lng:1.1000, type:"CHAMPIONNAT" },
  { id:44, date:"2026-05-10", ville:"Pont-Audemer", club:"Pont-Audemer", format:"DOUBLETTE", categorie:"Jeu Provençal", info:"Championnat Départemental - Doublette Provençal (suite)", lat:c("Pont-Audemer")[0], lng:c("Pont-Audemer")[1], type:"CHAMPIONNAT" },
  { id:45, date:"2026-05-13", ville:"Le Neubourg",  club:"Le Neubourg",  format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("Le Neubourg")[0],lng:c("Le Neubourg")[1], type:"CONCOURS" },
  { id:46, date:"2026-05-14", ville:"CD14",         club:"CD14",         format:"INDIVIDUEL",categorie:"Jeunes",  info:"Championnat Régional - Tir de Précision - St Pierre en Auge (14)", lat:49.1000, lng:1.1000, type:"RÉGIONAL" },
  { id:47, date:"2026-05-16", ville:"St-Marcel",    club:"St-Marcel",    format:"TRIPLETTE", categorie:"Mixte",   info:"Concours Mixte 14h",                          lat:c("St-Marcel")[0],  lng:c("St-Marcel")[1],  type:"CONCOURS" },
  { id:48, date:"2026-05-17", ville:"ALM",          club:"ALM",          format:"TRIPLETTE", categorie:"Promotion",info:"Concours Promotion 10h",                     lat:c("ALM")[0],        lng:c("ALM")[1],        type:"CONCOURS" },
  { id:49, date:"2026-05-20", ville:"Gaillon",      club:"Gaillon",      format:"TRIPLETTE", categorie:"Vétéran", info:"Challenge GUY JISTA",                         lat:c("Gaillon")[0],    lng:c("Gaillon")[1],    type:"CONCOURS" },
  { id:50, date:"2026-05-23", ville:"2A Pétanque",  club:"2A Pétanque",  format:"DOUBLETTE", categorie:"Mixte",   info:"Concours TC 9H",                              lat:c("2A Pétanque")[0],lng:c("2A Pétanque")[1],type:"CONCOURS" },
  { id:51, date:"2026-05-23", ville:"CD27",         club:"CD27",         format:"TRIPLETTE", categorie:"Jeunes",  info:"Championnat Régional - Triplette Jeunes",      lat:49.1000,            lng:1.1000,             type:"RÉGIONAL" },
  { id:52, date:"2026-05-27", ville:"Bernay",       club:"Bernay",       format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("Bernay")[0],     lng:c("Bernay")[1],     type:"CONCOURS" },
  { id:53, date:"2026-05-30", ville:"Aumale",       club:"Aumale",       format:"TRIPLETTE", categorie:"Jeunes",  info:"National Jeunes - Aumale",                    lat:c("Aumale")[0],     lng:c("Aumale")[1],     type:"NATIONAL" },

  // ══ JUIN 2026 ═════════════════════════════════════════════
  { id:54, date:"2026-06-06", ville:"Damville",     club:"Damville",     format:"TRIPLETTE", categorie:"Sénior",  info:"Concours TC",                                 lat:c("Damville")[0],   lng:c("Damville")[1],   type:"CONCOURS" },
  { id:55, date:"2026-06-07", ville:"Le Neubourg",  club:"Le Neubourg",  format:"TRIPLETTE", categorie:"Mixte",   info:"Concours Mixte 14h",                          lat:c("Le Neubourg")[0],lng:c("Le Neubourg")[1], type:"CONCOURS" },
  { id:56, date:"2026-06-10", ville:"Gaillon",      club:"Gaillon",      format:"DOUBLETTE", categorie:"Vétéran", info:"Championnat de l\'Eure Vétérans - Doublette",  lat:c("Gaillon")[0],    lng:c("Gaillon")[1],    type:"CHAMPIONNAT" },
  { id:57, date:"2026-06-11", ville:"Gaillon",      club:"Gaillon",      format:"DOUBLETTE", categorie:"Vétéran", info:"Suite Championnat Vétérans - Doublette",       lat:c("Gaillon")[0],    lng:c("Gaillon")[1],    type:"CHAMPIONNAT" },
  { id:58, date:"2026-06-17", ville:"Gaillon",      club:"Gaillon",      format:"INDIVIDUEL",categorie:"Vétéran Masculin", info:"Championnat de l\'Eure Vétérans - Tête à tête Hommes", lat:c("Gaillon")[0], lng:c("Gaillon")[1], type:"CHAMPIONNAT" },
  { id:59, date:"2026-06-18", ville:"Gaillon",      club:"Gaillon",      format:"INDIVIDUEL",categorie:"Vétéran Féminin", info:"Championnat de l\'Eure Vétérans - Tête à tête Femmes", lat:c("Gaillon")[0], lng:c("Gaillon")[1], type:"CHAMPIONNAT" },
  { id:60, date:"2026-06-20", ville:"2A Pétanque",  club:"2A Pétanque",  format:"DOUBLETTE", categorie:"Sénior",  info:"Concours TC 10h",                             lat:c("2A Pétanque")[0],lng:c("2A Pétanque")[1],type:"CONCOURS" },
  { id:61, date:"2026-06-24", ville:"Navarre",      club:"Navarre",      format:"DOUBLETTE", categorie:"Vétéran", info:"Challenge NOGAREDE",                          lat:c("Navarre")[0],    lng:c("Navarre")[1],    type:"CONCOURS" },
  { id:62, date:"2026-06-26", ville:"Avranches",    club:"Avranches",    format:"TRIPLETTE", categorie:"Jeunes",  info:"National Jeunes - Avranches",                 lat:48.6833,            lng:-1.3556,            type:"NATIONAL" },
  { id:63, date:"2026-06-27", ville:"St-Marcel",    club:"St-Marcel",    format:"TRIPLETTE", categorie:"Sénior",  info:"Concours TC 14h",                             lat:c("St-Marcel")[0],  lng:c("St-Marcel")[1],  type:"CONCOURS" },
  { id:64, date:"2026-06-28", ville:"Gisors",       club:"Gisors",       format:"DOUBLETTE", categorie:"Sénior",  info:"Concours TC 14h",                             lat:c("Gisors")[0],     lng:c("Gisors")[1],     type:"CONCOURS" },
  { id:65, date:"2026-06-30", ville:"Gisors",       club:"Gisors",       format:"TRIPLETTE", categorie:"Sénior",  info:"Challenge Georges Bourgeois 9h",               lat:c("Gisors")[0],     lng:c("Gisors")[1],     type:"CONCOURS" },
  { id:66, date:"2026-06-31", ville:"Navarre",      club:"Navarre",      format:"DOUBLETTE", categorie:"Féminin", info:"Concours TC 14h - Doublette Femmes",           lat:c("Navarre")[0],    lng:c("Navarre")[1],    type:"CONCOURS" },

  // ══ JUILLET 2026 ══════════════════════════════════════════
  { id:67, date:"2026-07-01", ville:"Saint-André",  club:"Saint-André",  format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("Saint-André")[0],lng:c("Saint-André")[1],type:"CONCOURS" },
  { id:68, date:"2026-07-04", ville:"Gasny",        club:"Gasny",        format:"TRIPLETTE", categorie:"Jeu Provençal", info:"Concours Provençal - Matin",             lat:c("Gasny")[0],      lng:c("Gasny")[1],      type:"CONCOURS" },
  { id:69, date:"2026-07-05", ville:"Gasny",        club:"Gasny",        format:"TRIPLETTE", categorie:"Jeu Provençal", info:"Concours Provençal - Matin (suite)",     lat:c("Gasny")[0],      lng:c("Gasny")[1],      type:"CONCOURS" },
  { id:70, date:"2026-07-05", ville:"Ezy-sur-Eure", club:"Ezy-sur-Eure", format:"TRIPLETTE", categorie:"Mixte",   info:"Concours Mixte 14h",                          lat:c("Ezy-sur-Eure")[0],lng:c("Ezy-sur-Eure")[1],type:"CONCOURS" },
  { id:71, date:"2026-07-08", ville:"Gravigny",     club:"Gravigny",     format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("Gravigny")[0],   lng:c("Gravigny")[1],   type:"CONCOURS" },
  { id:72, date:"2026-07-11", ville:"ALM",          club:"ALM",          format:"TRIPLETTE", categorie:"Sénior",  info:"Concours TC 10h",                             lat:c("ALM")[0],        lng:c("ALM")[1],        type:"CONCOURS" },
  { id:73, date:"2026-07-12", ville:"Gravigny",     club:"Gravigny",     format:"TRIPLETTE", categorie:"Sénior",  info:"Concours TC 14h",                             lat:c("Gravigny")[0],   lng:c("Gravigny")[1],   type:"CONCOURS" },
  { id:74, date:"2026-07-13", ville:"Gisors",       club:"Gisors",       format:"INDIVIDUEL",categorie:"Sénior",  info:"Concours TC 9H - Tête à tête",                lat:c("Gisors")[0],     lng:c("Gisors")[1],     type:"CONCOURS" },
  { id:75, date:"2026-07-13", ville:"Gisors",       club:"Gisors",       format:"DOUBLETTE", categorie:"Mixte",   info:"Concours TC 14h - Doublette Mixte",            lat:c("Gisors")[0],     lng:c("Gisors")[1],     type:"CONCOURS" },
  { id:76, date:"2026-07-14", ville:"Gaillon",      club:"Gaillon",      format:"TRIPLETTE", categorie:"Sénior",  info:"Challenge Pascal Frichot",                    lat:c("Gaillon")[0],    lng:c("Gaillon")[1],    type:"CONCOURS" },
  { id:77, date:"2026-07-15", ville:"Gasny",        club:"Gasny",        format:"DOUBLETTE", categorie:"Vétéran", info:"Jet du But 10 heures",                        lat:c("Gasny")[0],      lng:c("Gasny")[1],      type:"CONCOURS" },
  { id:78, date:"2026-07-18", ville:"Gisors",       club:"Gisors",       format:"TRIPLETTE", categorie:"Sénior",  info:"Concours TC 14h",                             lat:c("Gisors")[0],     lng:c("Gisors")[1],     type:"CONCOURS" },
  { id:79, date:"2026-07-19", ville:"Serquigny",    club:"Serquigny",    format:"DOUBLETTE", categorie:"Sénior",  info:"Concours TC 10h",                             lat:c("Serquigny")[0],  lng:c("Serquigny")[1],  type:"CONCOURS" },
  { id:80, date:"2026-07-22", ville:"Navarre",      club:"Navarre",      format:"DOUBLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("Navarre")[0],    lng:c("Navarre")[1],    type:"CONCOURS" },
  { id:81, date:"2026-07-26", ville:"Les Andelys",  club:"Les Andelys",  format:"DOUBLETTE", categorie:"Mixte",   info:"Concours Mixte 14h",                          lat:c("Les Andelys")[0],lng:c("Les Andelys")[1],type:"CONCOURS" },
  { id:82, date:"2026-07-27", ville:"St-Marcel",    club:"St-Marcel",    format:"DOUBLETTE", categorie:"Mixte",   info:"Navarre - Concours Mixte 14h",                lat:c("Navarre")[0],    lng:c("Navarre")[1],    type:"CONCOURS" },

  // ══ AOÛT 2026 ═════════════════════════════════════════════
  { id:83, date:"2026-08-01", ville:"CD27",         club:"CD27",         format:"TRIPLETTE", categorie:"Jeu Provençal", info:"Concours Provençal",                     lat:49.1000,            lng:1.1000,             type:"CONCOURS" },
  { id:84, date:"2026-08-02", ville:"CD27",         club:"CD27",         format:"TRIPLETTE", categorie:"Jeu Provençal", info:"Concours Provençal (suite)",              lat:49.1000,            lng:1.1000,             type:"CONCOURS" },
  { id:85, date:"2026-08-05", ville:"Saint-Michel", club:"Saint-Michel", format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans - Terrain de Gravigny",               lat:c("Saint-Michel")[0],lng:c("Saint-Michel")[1],type:"CONCOURS" },
  { id:86, date:"2026-08-22", ville:"Ezy-sur-Eure", club:"Ezy-sur-Eure", format:"DOUBLETTE", categorie:"Sénior",  info:"Challenge Klimeck",                           lat:c("Ezy-sur-Eure")[0],lng:c("Ezy-sur-Eure")[1],type:"CONCOURS" },
  { id:87, date:"2026-08-26", ville:"Pétanque Sud", club:"Pétanque Sud", format:"DOUBLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("Pétanque Sud")[0],lng:c("Pétanque Sud")[1],type:"CONCOURS" },

  // ══ SEPTEMBRE 2026 ════════════════════════════════════════
  { id:88, date:"2026-09-02", ville:"2A Pétanque",  club:"2A Pétanque",  format:"DOUBLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("2A Pétanque")[0],lng:c("2A Pétanque")[1],type:"CONCOURS" },
  { id:89, date:"2026-09-05", ville:"Ezy-sur-Eure", club:"Ezy-sur-Eure", format:"TRIPLETTE", categorie:"Mixte",   info:"Concours Mixte 14h",                          lat:c("Ezy-sur-Eure")[0],lng:c("Ezy-sur-Eure")[1],type:"CONCOURS" },
  { id:90, date:"2026-09-09", ville:"Saint-Marcel", club:"Saint-Marcel", format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("St-Marcel")[0],  lng:c("St-Marcel")[1],  type:"CONCOURS" },
  { id:91, date:"2026-09-12", ville:"Gravigny",     club:"Gravigny",     format:"TRIPLETTE", categorie:"Sénior",  info:"Concours TC 14h",                             lat:c("Gravigny")[0],   lng:c("Gravigny")[1],   type:"CONCOURS" },
  { id:92, date:"2026-09-16", ville:"Gisors",       club:"Gisors",       format:"DOUBLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("Gisors")[0],     lng:c("Gisors")[1],     type:"CONCOURS" },
  { id:93, date:"2026-09-17", ville:"CD27",         club:"CD27",         format:"TRIPLETTE", categorie:"Mixte",   info:"Trophée 276 - Jeudi",                         lat:49.1000,            lng:1.1000,             type:"CONCOURS" },
  { id:94, date:"2026-09-19", ville:"CD27",         club:"CD27",         format:"JEUNES",    categorie:"Jeunes",  info:"Détection Jeunes",                            lat:49.1000,            lng:1.1000,             type:"CONCOURS" },
  { id:95, date:"2026-09-19", ville:"Pont-Audemer", club:"Pont-Audemer", format:"TRIPLETTE", categorie:"Jeu Provençal", info:"Concours Provençal limité 16 équipes",   lat:c("Pont-Audemer")[0],lng:c("Pont-Audemer")[1],type:"CONCOURS" },
  { id:96, date:"2026-09-23", ville:"ALM",          club:"ALM",          format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("ALM")[0],        lng:c("ALM")[1],        type:"CONCOURS" },
  { id:97, date:"2026-09-26", ville:"CD50",         club:"CD50",         format:"TRIPLETTE", categorie:"Jeunes",  info:"CRC Jeunes - CD50",                           lat:49.1000,            lng:1.1000,             type:"RÉGIONAL" },
  { id:98, date:"2026-09-30", ville:"Saint-André",  club:"Saint-André",  format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("Saint-André")[0],lng:c("Saint-André")[1],type:"CONCOURS" },

  // ══ OCTOBRE 2026 ══════════════════════════════════════════
  { id:99,  date:"2026-10-03", ville:"Gasny",       lieu:"Boulodrome",   club:"Gasny",        format:"TRIPLETTE", categorie:"Sénior",  info:"Challenge du Souvenir - Matin", lat:c("Gasny")[0], lng:c("Gasny")[1],  type:"CONCOURS" },
  { id:100, date:"2026-10-03", ville:"Gasny",       club:"Gasny",        format:"DOUBLETTE", categorie:"Promotion",info:"Concours Promotion 10H",                     lat:c("Gasny")[0],      lng:c("Gasny")[1],      type:"CONCOURS" },
  { id:101, date:"2026-10-10", ville:"Pont-Audemer",club:"Pont-Audemer", format:"TRIPLETTE", categorie:"Jeu Provençal", info:"Concours Provençal limité 16 équipes",   lat:c("Pont-Audemer")[0],lng:c("Pont-Audemer")[1],type:"CONCOURS" },
  { id:102, date:"2026-10-14", ville:"Gravigny",    club:"Gravigny",     format:"DOUBLETTE", categorie:"Vétéran Mixte", info:"Vétérans Mixte",                         lat:c("Gravigny")[0],   lng:c("Gravigny")[1],   type:"CONCOURS" },
  { id:103, date:"2026-10-15", ville:"CD27",        club:"CD27",         format:"DOUBLETTE", categorie:"Vétéran", info:"Trophée 276 - Jeudi",                         lat:49.1000,            lng:1.1000,             type:"CONCOURS" },
  { id:104, date:"2026-10-17", ville:"Louviers",    club:"Louviers",     format:"DOUBLETTE", categorie:"Sénior",  info:"Concours TC 10h",                             lat:c("Louviers")[0],   lng:c("Louviers")[1],   type:"CONCOURS" },
  { id:105, date:"2026-10-21", ville:"Saint-Marcel",club:"Saint-Marcel", format:"DOUBLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("St-Marcel")[0],  lng:c("St-Marcel")[1],  type:"CONCOURS" },
  { id:106, date:"2026-10-24", ville:"CD27",        club:"CD27",         format:"TRIPLETTE", categorie:"Jeunes",  info:"CNC Jeunes",                                  lat:49.1000,            lng:1.1000,             type:"NATIONAL" },
  { id:107, date:"2026-10-28", ville:"Navarre",     club:"Navarre",      format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans",                                    lat:c("Navarre")[0],    lng:c("Navarre")[1],    type:"CONCOURS" },
  { id:108, date:"2026-10-31", ville:"PCBI",        lieu:"Boulodrome",   club:"PCBI",         format:"TRIPLETTE", categorie:"Sénior",  info:"Concours TC 2EN1 14h",    lat:c("PCBI")[0],       lng:c("PCBI")[1],       type:"CONCOURS" },

  // ══ NOVEMBRE 2026 ═════════════════════════════════════════
  { id:109, date:"2026-11-04", ville:"Saint-Michel",club:"Saint-Michel", format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans - Terrain de Navarre",                lat:c("Navarre")[0],    lng:c("Navarre")[1],    type:"CONCOURS" },
  { id:110, date:"2026-11-12", ville:"Ezy-sur-Eure",club:"Ezy-sur-Eure", format:"TRIPLETTE", categorie:"Vétéran", info:"Vétérans - Jeudi",                            lat:c("Ezy-sur-Eure")[0],lng:c("Ezy-sur-Eure")[1],type:"CONCOURS" },

  // ══ DÉCEMBRE 2026 ═════════════════════════════════════════
  { id:111, date:"2026-12-03", ville:"CD27",        club:"CD27",         format:"TRIPLETTE", categorie:"Vétéran", info:"Trophée 276 - Jeudi",                         lat:49.1000,            lng:1.1000,             type:"CONCOURS" },
  { id:112, date:"2026-12-06", ville:"CD27",        lieu:"Boulodrome",   club:"CD27",         format:"DOUBLETTE", categorie:"Jeunes",  info:"Coupe de Noël Jeunes & Femmes - Matin", lat:49.1000, lng:1.1000, type:"CONCOURS" },
  { id:113, date:"2026-12-06", ville:"CD27",        lieu:"Boulodrome",   club:"CD27",         format:"DOUBLETTE", categorie:"Féminin", info:"Coupe de Noël Femmes - Matin",          lat:49.1000, lng:1.1000, type:"CONCOURS" },
];
