// Calendrier des concours du département Eure-et-Loir (28) - 2026
// Source : Calendrier FFPJP CD28 2026 (Open + Vétérans)
// Site : https://cd28-petanque.clubeo.com/
// Facebook : https://www.facebook.com/share/1BCk4BWqEk/

export interface ConcourEureEtLoir {
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
  "Lucé":                [48.4372, 1.4547],
  "Mainvilliers":        [48.4525, 1.4436],
  "Gallardon":           [48.5236, 1.6897],
  "C.B. Vernois":        [48.4500, 1.5500],
  "Ouarville":           [48.3314, 1.8297],
  "Tréon":               [48.5847, 1.3272],
  "Dreux":               [48.7344, 1.3664],
  "Hanches":             [48.5603, 1.5872],
  "Nogent-le-Roi":       [48.6472, 1.5322],
  "Bonneval":            [48.1814, 1.3853],
  "Nogent Pétanque":     [48.5167, 1.6167],
  "Chateauneuf":         [48.5797, 1.4711],
  "Saint-Prest":         [48.5119, 1.3997],
  "Châteaudun":          [48.0742, 1.3378],
  "Arrou":               [48.1053, 1.1353],
  "Senonches":           [48.5572, 1.0397],
  "Cheminots Nogentais": [48.5167, 1.6167],
  "2A Pétanque":         [48.4800, 1.5200],
};

const c = (ville: string): [number, number] => COORDS[ville] || [48.4500, 1.5000];

export const DEPT_EURE_ET_LOIR = {
  nom: "Eure-et-Loir",
  code: "28",
  facebook: "https://www.facebook.com/share/1BCk4BWqEk/",
  site: "https://cd28-petanque.clubeo.com/",
};

export const CONCOURS_EURE_ET_LOIR_2026: ConcourEureEtLoir[] = [

  // ══ FÉVRIER 2026 — OPEN ═══════════════════════════════════
  { id:1,  date:"2026-02-21", ville:"Mainvilliers",      club:"Mainvilliers",       format:"TRIPLETTE", categorie:"Jeu Provençal", info:"1er et 2ème tours Coupe de France Provençal",    lat:c("Mainvilliers")[0],     lng:c("Mainvilliers")[1],     type:"NATIONAL"     },
  { id:2,  date:"2026-02-28", ville:"Gallardon",         club:"Gallardon",          format:"TRIPLETTE", categorie:"Sénior",        info:"Trophée de la Ville - TS + Jeunes",              lat:c("Gallardon")[0],        lng:c("Gallardon")[1],        type:"CONCOURS"     },

  // ══ MARS 2026 — OPEN ══════════════════════════════════════
  { id:3,  date:"2026-03-07", ville:"C.B. Vernois",      club:"C.B. Vernois",       format:"TRIPLETTE", categorie:"Mixte",         info:"Souvenir Christel TROGER - T. Mixte",            lat:c("C.B. Vernois")[0],     lng:c("C.B. Vernois")[1],     type:"CONCOURS"     },
  { id:4,  date:"2026-03-08", ville:"CD28",              club:"CD28",               format:"TRIPLETTE", categorie:"Jeu Provençal", info:"3ème tour Coupe de France Provençal",             lat:48.4500,                  lng:1.5000,                   type:"NATIONAL"     },
  { id:5,  date:"2026-03-14", ville:"Ouarville",         club:"Ouarville",          format:"INDIVIDUEL",categorie:"Jeunes",        info:"14h00 - Chpt. Tête-à-tête Jeunes + DS",          lat:c("Ouarville")[0],        lng:c("Ouarville")[1],        type:"CHAMPIONNAT"  },
  { id:6,  date:"2026-03-21", ville:"Tréon",             club:"Tréon",              format:"TRIPLETTE", categorie:"Promotion",     info:"14h00 - Chpt. TS Promotion",                     lat:c("Tréon")[0],            lng:c("Tréon")[1],            type:"CHAMPIONNAT"  },
  { id:7,  date:"2026-03-22", ville:"Tréon",             club:"Tréon",              format:"TRIPLETTE", categorie:"Promotion",     info:"8h00 - Chpt. TS Promotion (suite) + Chpt. Tripl. Jeunes", lat:c("Tréon")[0],   lng:c("Tréon")[1],            type:"CHAMPIONNAT"  },
  { id:8,  date:"2026-03-28", ville:"Dreux",             club:"Dreux",              format:"INDIVIDUEL",categorie:"Sénior",        info:"14h00 - Chpt. TTS",                              lat:c("Dreux")[0],            lng:c("Dreux")[1],            type:"CHAMPIONNAT"  },
  { id:9,  date:"2026-03-29", ville:"Dreux",             club:"Dreux",              format:"INDIVIDUEL",categorie:"Sénior",        info:"8h00 - Chpt. TTS + Chpt. DF",                    lat:c("Dreux")[0],            lng:c("Dreux")[1],            type:"CHAMPIONNAT"  },

  // ══ AVRIL 2026 — OPEN ═════════════════════════════════════
  { id:10, date:"2026-04-04", ville:"Mainvilliers",      club:"Comité à Mainvilliers", format:"TRIPLETTE", categorie:"Jeu Provençal", info:"8h00 - Chpt. Triplette Provençal",            lat:c("Mainvilliers")[0],     lng:c("Mainvilliers")[1],     type:"CHAMPIONNAT"  },
  { id:11, date:"2026-04-05", ville:"Mainvilliers",      club:"Comité à Mainvilliers", format:"TRIPLETTE", categorie:"Jeu Provençal", info:"8h00 - Chpt. Triplette Provençal (suite)",    lat:c("Mainvilliers")[0],     lng:c("Mainvilliers")[1],     type:"CHAMPIONNAT"  },
  { id:12, date:"2026-04-06", ville:"Cheminots Nogentais",club:"Cheminots Nogentais",format:"DOUBLETTE", categorie:"Sénior",        info:"DS - Lundi de Pâques",                           lat:c("Cheminots Nogentais")[0],lng:c("Cheminots Nogentais")[1],type:"CONCOURS"   },
  { id:13, date:"2026-04-11", ville:"Hanches",           club:"Hanches",            format:"TRIPLETTE", categorie:"Sénior",        info:"14h00 - Chpt. TS",                               lat:c("Hanches")[0],          lng:c("Hanches")[1],          type:"CHAMPIONNAT"  },
  { id:14, date:"2026-04-12", ville:"Hanches",           club:"Hanches",            format:"TRIPLETTE", categorie:"Sénior",        info:"8h00 - Chpt. TS + Chpt. TF",                    lat:c("Hanches")[0],          lng:c("Hanches")[1],          type:"CHAMPIONNAT"  },
  { id:15, date:"2026-04-14", ville:"Saint-Prest",       club:"Saint-Prest",        format:"TRIPLETTE", categorie:"Vétéran",       info:"TV",                                             lat:c("Saint-Prest")[0],      lng:c("Saint-Prest")[1],      type:"CONCOURS"     },
  { id:16, date:"2026-04-15", ville:"Senonches",         club:"Senonches",          format:"DOUBLETTE", categorie:"Vétéran",       info:"DV",                                             lat:c("Senonches")[0],        lng:c("Senonches")[1],        type:"CONCOURS"     },
  { id:17, date:"2026-04-18", ville:"Lucé",              club:"Lucé",               format:"DOUBLETTE", categorie:"Mixte",         info:"14h00 - Chpt. D. Mixte",                         lat:c("Lucé")[0],             lng:c("Lucé")[1],             type:"CHAMPIONNAT"  },
  { id:18, date:"2026-04-19", ville:"Lucé",              club:"Lucé",               format:"DOUBLETTE", categorie:"Mixte",         info:"8h00 - Chpt. D. Mixte (suite)",                  lat:c("Lucé")[0],             lng:c("Lucé")[1],             type:"CHAMPIONNAT"  },
  { id:19, date:"2026-04-22", ville:"Lucé",              club:"Lucé",               format:"TRIPLETTE", categorie:"Vétéran",       info:"8h00 - Chpt. TV",                                lat:c("Lucé")[0],             lng:c("Lucé")[1],             type:"CHAMPIONNAT"  },
  { id:20, date:"2026-04-25", ville:"Dreux",             club:"Dreux",              format:"DOUBLETTE", categorie:"Sénior",        info:"9h30 - Chpt. DS",                                lat:c("Dreux")[0],            lng:c("Dreux")[1],            type:"CHAMPIONNAT"  },
  { id:21, date:"2026-04-26", ville:"Dreux",             club:"Dreux",              format:"DOUBLETTE", categorie:"Sénior",        info:"8h00 - Chpt. DS + Chpt. TTF + Tir de précision Junior 14h", lat:c("Dreux")[0], lng:c("Dreux")[1],           type:"CHAMPIONNAT"  },
  { id:22, date:"2026-04-28", ville:"Arrou",             club:"Arrou",              format:"DOUBLETTE", categorie:"Vétéran",       info:"DV - Mardi",                                     lat:c("Arrou")[0],            lng:c("Arrou")[1],            type:"CONCOURS"     },

  // ══ MAI 2026 — OPEN ═══════════════════════════════════════
  { id:23, date:"2026-05-01", ville:"Nogent-le-Roi",     club:"Nogent-le-Roi",      format:"DOUBLETTE", categorie:"Sénior",        info:"DS - Vendredi",                                  lat:c("Nogent-le-Roi")[0],    lng:c("Nogent-le-Roi")[1],    type:"CONCOURS"     },
  { id:24, date:"2026-05-02", ville:"Hanches",           club:"Hanches",            format:"TRIPLETTE", categorie:"Mixte",         info:"14h00 - Chpt. T. Mixte",                         lat:c("Hanches")[0],          lng:c("Hanches")[1],          type:"CHAMPIONNAT"  },
  { id:25, date:"2026-05-03", ville:"Hanches",           club:"Hanches",            format:"TRIPLETTE", categorie:"Mixte",         info:"8h00 - Chpt. T. Mixte (suite)",                  lat:c("Hanches")[0],          lng:c("Hanches")[1],          type:"CHAMPIONNAT"  },
  { id:26, date:"2026-05-06", ville:"Gallardon",         club:"Gallardon",          format:"DOUBLETTE", categorie:"Vétéran",       info:"DV - Mercredi",                                  lat:c("Gallardon")[0],        lng:c("Gallardon")[1],        type:"CONCOURS"     },
  { id:27, date:"2026-05-09", ville:"Mainvilliers",      club:"Mainvilliers",       format:"DOUBLETTE", categorie:"Jeu Provençal", info:"8h00 - Chpt. Doublette Provençal",               lat:c("Mainvilliers")[0],     lng:c("Mainvilliers")[1],     type:"CHAMPIONNAT"  },
  { id:28, date:"2026-05-10", ville:"Mainvilliers",      club:"Mainvilliers",       format:"DOUBLETTE", categorie:"Jeu Provençal", info:"8h00 - Chpt. Doublette Provençal + Chpt. Doubl. Jeunes", lat:c("Mainvilliers")[0], lng:c("Mainvilliers")[1],  type:"CHAMPIONNAT"  },
  { id:29, date:"2026-05-13", ville:"Châteauneuf",       club:"Châteauneuf",        format:"TRIPLETTE", categorie:"Vétéran",       info:"Souvenir Antonio FERNANDES - TV",                lat:c("Chateauneuf")[0],      lng:c("Chateauneuf")[1],      type:"CONCOURS"     },
  { id:30, date:"2026-05-16", ville:"Saint-Prest",       club:"Saint-Prest",        format:"DOUBLETTE", categorie:"Sénior",        info:"DS - Samedi",                                    lat:c("Saint-Prest")[0],      lng:c("Saint-Prest")[1],      type:"CONCOURS"     },
  { id:31, date:"2026-05-17", ville:"Bonneval",          club:"Bonneval",           format:"TRIPLETTE", categorie:"Sénior",        info:"TS + Jeunes",                                    lat:c("Bonneval")[0],         lng:c("Bonneval")[1],         type:"CONCOURS"     },
  { id:32, date:"2026-05-19", ville:"Châteaudun",        club:"Châteaudun",         format:"DOUBLETTE", categorie:"Vétéran",       info:"DV - Mardi",                                     lat:c("Châteaudun")[0],       lng:c("Châteaudun")[1],       type:"CONCOURS"     },
  { id:33, date:"2026-05-23", ville:"Nogent Pétanque",   club:"Nogent Pétanque",    format:"DOUBLETTE", categorie:"Sénior",        info:"DS - Samedi",                                    lat:c("Nogent Pétanque")[0],  lng:c("Nogent Pétanque")[1],  type:"CONCOURS"     },
  { id:34, date:"2026-05-24", ville:"Hanches",           club:"Comité à Hanches",   format:"DOUBLETTE", categorie:"Sénior",        info:"Ligue DS - TTF - (28)",                          lat:c("Hanches")[0],          lng:c("Hanches")[1],          type:"RÉGIONAL"     },
  { id:35, date:"2026-05-25", ville:"Hanches",           club:"Comité à Hanches",   format:"TRIPLETTE", categorie:"Sénior",        info:"Ligue TTS - DF - (28)",                          lat:c("Hanches")[0],          lng:c("Hanches")[1],          type:"RÉGIONAL"     },
  { id:36, date:"2026-05-27", ville:"Nogent-le-Roi",     club:"Nogent-le-Roi",      format:"TRIPLETTE", categorie:"Vétéran",       info:"TV - Mercredi",                                  lat:c("Nogent-le-Roi")[0],    lng:c("Nogent-le-Roi")[1],    type:"CONCOURS"     },
  { id:37, date:"2026-05-30", ville:"Châteaudun",        club:"Châteaudun",         format:"DOUBLETTE", categorie:"Sénior",        info:"DS - Samedi",                                    lat:c("Châteaudun")[0],       lng:c("Châteaudun")[1],       type:"CONCOURS"     },

  // ══ JUIN 2026 — OPEN ══════════════════════════════════════
  { id:38, date:"2026-06-02", ville:"Gallardon",         club:"Gallardon",          format:"DOUBLETTE", categorie:"Vétéran",       info:"DV - Mardi",                                     lat:c("Gallardon")[0],        lng:c("Gallardon")[1],        type:"CONCOURS"     },
  { id:39, date:"2026-06-06", ville:"Arrou",             club:"Arrou",              format:"DOUBLETTE", categorie:"Sénior",        info:"DS + DF",                                        lat:c("Arrou")[0],            lng:c("Arrou")[1],            type:"CONCOURS"     },
  { id:40, date:"2026-06-07", ville:"Dreux",             club:"Dreux",              format:"TRIPLETTE", categorie:"Promotion",     info:"8h00 - Chpt. TTS Promo + TTF Promo",             lat:c("Dreux")[0],            lng:c("Dreux")[1],            type:"CHAMPIONNAT"  },
  { id:41, date:"2026-06-09", ville:"Hanches",           club:"Hanches",            format:"DOUBLETTE", categorie:"Vétéran",       info:"DV - Souvenir Robert DUMAST - Mardi",            lat:c("Hanches")[0],          lng:c("Hanches")[1],          type:"CONCOURS"     },
  { id:42, date:"2026-06-11", ville:"Tréon",             club:"Tréon",              format:"DOUBLETTE", categorie:"Vétéran",       info:"8h00 - Chpt. DV",                                lat:c("Tréon")[0],            lng:c("Tréon")[1],            type:"CHAMPIONNAT"  },
  { id:43, date:"2026-06-17", ville:"Cheminots Nogentais",club:"Cheminots Nogentais",format:"DOUBLETTE",categorie:"Vétéran",       info:"DV - Mercredi",                                  lat:c("Cheminots Nogentais")[0],lng:c("Cheminots Nogentais")[1],type:"CONCOURS"   },
  { id:44, date:"2026-06-20", ville:"Châteauneuf",       club:"Châteauneuf",        format:"DOUBLETTE", categorie:"Sénior",        info:"Souvenir De Andrade Francisco - DS",             lat:c("Chateauneuf")[0],      lng:c("Chateauneuf")[1],      type:"CONCOURS"     },
  { id:45, date:"2026-06-21", ville:"Hanches",           club:"Hanches",            format:"DOUBLETTE", categorie:"Sénior",        info:"Challenge Patrick DEGAS - DS",                   lat:c("Hanches")[0],          lng:c("Hanches")[1],          type:"CONCOURS"     },
  { id:46, date:"2026-06-27", ville:"Saint-Prest",       club:"Saint-Prest",        format:"DOUBLETTE", categorie:"Sénior",        info:"DS",                                             lat:c("Saint-Prest")[0],      lng:c("Saint-Prest")[1],      type:"CONCOURS"     },

  // ══ JUILLET 2026 ══════════════════════════════════════════
  { id:47, date:"2026-07-08", ville:"Châteauneuf",       club:"Châteauneuf",        format:"TRIPLETTE", categorie:"Vétéran",       info:"Souvenir Francisco De Andrade - TV - Mercredi",  lat:c("Chateauneuf")[0],      lng:c("Chateauneuf")[1],      type:"CONCOURS"     },
  { id:48, date:"2026-07-11", ville:"Nogent-le-Roi",     club:"Nogent-le-Roi",      format:"DOUBLETTE", categorie:"Mixte",         info:"D. Mixte - Samedi",                              lat:c("Nogent-le-Roi")[0],    lng:c("Nogent-le-Roi")[1],    type:"CONCOURS"     },

  // ══ SEPTEMBRE 2026 ════════════════════════════════════════
  { id:49, date:"2026-09-02", ville:"Châteauneuf",       club:"Châteauneuf",        format:"TRIPLETTE", categorie:"Vétéran Mixte", info:"T. Mixte Vétéran - Mercredi",                    lat:c("Chateauneuf")[0],      lng:c("Chateauneuf")[1],      type:"CONCOURS"     },
  { id:50, date:"2026-09-05", ville:"Mainvilliers",      club:"Mainvilliers",       format:"DOUBLETTE", categorie:"Promotion",     info:"8h00 - Chpt. DoubL Promo + DS + Jeunes",         lat:c("Mainvilliers")[0],     lng:c("Mainvilliers")[1],     type:"CHAMPIONNAT"  },
  { id:51, date:"2026-09-06", ville:"Dreux",             club:"Comité à Dreux",     format:"DOUBLETTE", categorie:"Sénior",        info:"COUPE DES CLUBS",                                lat:c("Dreux")[0],            lng:c("Dreux")[1],            type:"CONCOURS"     },
  { id:52, date:"2026-09-09", ville:"Châteaudun",        club:"Châteaudun",         format:"DOUBLETTE", categorie:"Vétéran",       info:"DV - Mercredi",                                  lat:c("Châteaudun")[0],       lng:c("Châteaudun")[1],       type:"CONCOURS"     },
  { id:53, date:"2026-09-12", ville:"Senonches",         club:"Senonches",          format:"DOUBLETTE", categorie:"Sénior",        info:"DS - Samedi",                                    lat:c("Senonches")[0],        lng:c("Senonches")[1],        type:"CONCOURS"     },
  { id:54, date:"2026-09-16", ville:"Nogent Pétanque",   club:"Nogent Pétanque",    format:"DOUBLETTE", categorie:"Vétéran",       info:"DV - Mercredi",                                  lat:c("Nogent Pétanque")[0],  lng:c("Nogent Pétanque")[1],  type:"CONCOURS"     },
  { id:55, date:"2026-09-23", ville:"Lucé",              club:"Lucé",               format:"INDIVIDUEL",categorie:"Vétéran",       info:"8h00 - Chpt. Tête-à-Tête Vétéran",               lat:c("Lucé")[0],             lng:c("Lucé")[1],             type:"CHAMPIONNAT"  },
  { id:56, date:"2026-09-24", ville:"Dreux",             club:"Dreux",              format:"DOUBLETTE", categorie:"Vétéran",       info:"Souvenir Hervé Piquet - DV - Jeudi",             lat:c("Dreux")[0],            lng:c("Dreux")[1],            type:"CONCOURS"     },
  { id:57, date:"2026-09-30", ville:"Arrou",             club:"Arrou",              format:"DOUBLETTE", categorie:"Vétéran",       info:"DV - Mercredi",                                  lat:c("Arrou")[0],            lng:c("Arrou")[1],            type:"CONCOURS"     },

  // ══ OCTOBRE 2026 ══════════════════════════════════════════
  { id:58, date:"2026-10-10", ville:"C.B. Vernois",      club:"C.B. Vernois",       format:"DOUBLETTE", categorie:"Sénior",        info:"CONCOURS DES DIRIGEANTS",                        lat:c("C.B. Vernois")[0],     lng:c("C.B. Vernois")[1],     type:"CONCOURS"     },
  { id:59, date:"2026-10-21", ville:"Lucé",              club:"Lucé",               format:"TRIPLETTE", categorie:"Vétéran",       info:"TV - Mercredi",                                  lat:c("Lucé")[0],             lng:c("Lucé")[1],             type:"CONCOURS"     },

  // ══ DÉCEMBRE 2026 ═════════════════════════════════════════
  { id:60, date:"2026-12-05", ville:"Mainvilliers",      club:"Mainvilliers",       format:"TRIPLETTE", categorie:"Sénior",        info:"Coupe de Noël TS + DF",                          lat:c("Mainvilliers")[0],     lng:c("Mainvilliers")[1],     type:"CONCOURS"     },
];
