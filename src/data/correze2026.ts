// Calendrier complet des concours du département Corrèze (19) - 2026
// Source : Comité Départemental de Pétanque de la Corrèze
// Site : https://comite-departemental-de-petanque-de-la-correze.jimdosite.com/
// Facebook : https://www.facebook.com/share/18TKKKpJUR/

export interface ConcourCorreze {
  id: number;
  date: string;
  dateFin?: string;
  ville: string;
  lieu?: string;
  club?: string;
  format: string;
  categorie: string;
  heure?: string;
  info?: string;
  lat: number;
  lng: number;
  type: "CONCOURS" | "CHAMPIONNAT" | "RÉGIONAL" | "NATIONAL" | "SPÉCIAL";
}

export const DEPT_CORREZE = {
  nom: "Corrèze",
  code: "19",
  facebook: "https://www.facebook.com/share/18TKKKpJUR/",
  site: "https://comite-departemental-de-petanque-de-la-correze.jimdosite.com/",
};

const COORDS: Record<string, [number, number]> = {
  "Tulle":             [45.2697, 1.7714],
  "Brive-la-Gaillarde":[45.1589, 1.5322],
  "Ussel":             [45.5483, 2.3097],
  "Uzerche":           [45.4203, 1.5608],
  "Argentat":          [45.0950, 1.9361],
  "Malemort-sur-Corrèze":[45.1706, 1.5581],
  "Chamberet":         [45.5706, 1.7147],
  "Seilhac":           [45.3639, 1.7153],
  "Donzenac":          [45.2278, 1.5228],
  "Voutezac":          [45.2386, 1.5803],
  "Turenne":           [45.0556, 1.5758],
  "Chirac-Bellevue":   [45.3553, 2.0897],
  "Egletons":          [45.4097, 2.0461],
  "Saint-Privat":      [45.1406, 1.8492],
  "Rosiers-d'Egletons":[45.3808, 2.0428],
  "Ussac":             [45.1981, 1.5489],
  "Saint-Exupéry-les-Roches":[45.4842, 2.2117],
  "Merlines":          [45.6281, 2.3514],
  "Gimel-les-Cascades":[45.3519, 1.8342],
  "Varetz":            [45.2178, 1.4847],
  "Bort-les-Orgues":   [45.3972, 2.5028],
  "Altillac":          [45.0000, 1.9500],
  "Vienne":            [45.5236, 4.8742],
  "Ponty":             [45.4300, 2.0800],
  "Gros-Chastang":     [45.2353, 1.9681],
  "Neuvic-sur-Isle":   [45.1283, 0.4644],
  "Aix":               [43.5297, 5.4474],
  "Bergerac":          [44.8500, 0.4833],
  "Condat":            [45.3417, 2.7750],
  "Triouzoune":        [45.4333, 2.4833],
  "Uzerche-GP":        [45.4203, 1.5608],
};

function ll(ville: string): [number, number] {
  return COORDS[ville] ?? [45.27, 1.77];
}

export const CONCOURS_CORREZE_2026: ConcourCorreze[] = [

  // ══════════════ JANVIER 2026 ══════════════
  { id: 1,  date: "2026-01-03", ville: "Tulle", format: "TRIPLETTE", categorie: "Triplette Mixte — Concours de la Barrussie (mise +25%)", heure: "14h00", type: "CONCOURS", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 2,  date: "2026-01-17", ville: "Tulle", lieu: "Boulodrome de Tulle", format: "TRIPLETTE", categorie: "Triplette Séniors — Challenge Didier CAUX (mise +30%, limité 64 équipes)", heure: "14h00", info: "Inscription SMS 07.50.26.57.35", type: "CONCOURS", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 3,  date: "2026-01-24", ville: "Brive-la-Gaillarde", lieu: "Cyrano Brive", format: "TRIPLETTE", categorie: "Triplette Mixte (mise +25%, limité 64 équipes)", info: "Inscription SMS 06.76.46.17.18", type: "CONCOURS", lat: ll("Brive-la-Gaillarde")[0], lng: ll("Brive-la-Gaillarde")[1] },
  { id: 4,  date: "2026-01-25", ville: "Ussel", lieu: "Boulodrome d'Ussel", format: "TRIPLETTE", categorie: "Triplette Séniors — Challenge Bernard Rougerie (mise 30%, limité 32)", info: "Inscription 06.82.13.39.86", type: "CONCOURS", lat: ll("Ussel")[0], lng: ll("Ussel")[1] },
  { id: 5,  date: "2026-01-25", ville: "Tulle", lieu: "Boulodrome Tulle", format: "TRIPLETTE", categorie: "Triplette Mixte (mise +25%)", heure: "14h30", type: "CONCOURS", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },

  // ══════════════ FÉVRIER 2026 ══════════════
  { id: 6,  date: "2026-02-07", ville: "Tulle", lieu: "Boulodrome Tulle", format: "TRIPLETTE", categorie: "Triplette Masc — Concours de la Barrussie (mise +25%)", type: "CONCOURS", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 7,  date: "2026-02-07", ville: "Brive-la-Gaillarde", lieu: "Boulodrome de Brive", format: "TRIPLETTE", categorie: "Triplette — Concours Pét Vazetzienne 4 parties (mise +25%)", type: "CONCOURS", lat: ll("Brive-la-Gaillarde")[0], lng: ll("Brive-la-Gaillarde")[1] },
  { id: 8,  date: "2026-02-07", ville: "Ussel", lieu: "Boulodrome d'Ussel", format: "TRIPLETTE", categorie: "Triplette Séniors — Challenge Daniel Sourdeix (limité 32)", info: "Inscription 06.71.20.53.25", type: "CONCOURS", lat: ll("Ussel")[0], lng: ll("Ussel")[1] },
  { id: 9,  date: "2026-02-10", ville: "Brive-la-Gaillarde", lieu: "Cyrano Brive", format: "TRIPLETTE", categorie: "Triplette Vétéran — 4 parties", heure: "14h30", type: "CONCOURS", lat: ll("Brive-la-Gaillarde")[0], lng: ll("Brive-la-Gaillarde")[1] },
  { id: 10, date: "2026-02-14", dateFin: "2026-02-15", ville: "Tulle", lieu: "Boulodrome de Tulle", format: "AUTRE", categorie: "CDC Open et Féminin — 1ère rencontre", type: "CHAMPIONNAT", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 11, date: "2026-02-21", dateFin: "2026-02-22", ville: "Tulle", lieu: "Boulodrome de Tulle", format: "AUTRE", categorie: "CDC Open et Féminin — 2ème rencontre", type: "CHAMPIONNAT", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 12, date: "2026-02-28", ville: "Tulle", lieu: "Carreau tulliste", format: "TRIPLETTE", categorie: "Triplette Mixte — Concours de la St-Valentin (mise +25%)", type: "CONCOURS", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },

  // ══════════════ MARS 2026 ══════════════
  { id: 13, date: "2026-03-07", dateFin: "2026-03-08", ville: "Corrèze (19)", format: "TRIPLETTE", categorie: "CHAMP. Dép. Triplette Promotion — Secteurs Brive/Tulle/Ussel + Finale Chamberet", heure: "9h30", type: "CHAMPIONNAT", lat: ll("Chamberet")[0], lng: ll("Chamberet")[1] },
  { id: 14, date: "2026-03-13", ville: "Tulle", lieu: "Boulodrome Tulle", format: "TRIPLETTE", categorie: "Triplette Séniors — Concours ASPTT (mise +25%)", heure: "14h00", type: "CONCOURS", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 15, date: "2026-03-18", dateFin: "2026-03-19", ville: "Corrèze (19)", format: "AUTRE", categorie: "CHAMP. Dép. Individuel Séniors Masc + CHAMP. Dép. Doublette Féminin", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Malemort-sur-Corrèze")[0], lng: ll("Malemort-sur-Corrèze")[1] },
  { id: 16, date: "2026-03-21", dateFin: "2026-03-22", ville: "Corrèze (19)", format: "AUTRE", categorie: "CHAMP. Dép. Triplette Séniors Promotion — secteurs + finale", heure: "14h00", type: "CHAMPIONNAT", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 17, date: "2026-03-25", dateFin: "2026-03-26", ville: "Corrèze (19)", format: "AUTRE", categorie: "CHAMP. Dép. Triplette Séniors Masc + CHAMP. Dép. Doublette Séniors Masc", heure: "14h00", type: "CHAMPIONNAT", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 18, date: "2026-03-28", dateFin: "2026-03-29", ville: "Corrèze (19)", format: "AUTRE", categorie: "CHAMP. Dép. Doublette Séniors Masc + Ind. Fém — finale Comité", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },

  // ══════════════ AVRIL 2026 ══════════════
  { id: 19, date: "2026-04-04", dateFin: "2026-04-05", ville: "Ussac", format: "TRIPLETTE", categorie: "CHAMP. Dép. Triplette Jeu Provençal — secteurs + finale", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Ussac")[0], lng: ll("Ussac")[1] },
  { id: 20, date: "2026-04-08", dateFin: "2026-04-09", ville: "Corrèze (19)", format: "TRIPLETTE", categorie: "CHAMP. Dép. Triplette Séniors Masc + CHAMP. Dép. Triplette Féminin — finale Cyrano", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Brive-la-Gaillarde")[0], lng: ll("Brive-la-Gaillarde")[1] },
  { id: 21, date: "2026-04-11", dateFin: "2026-04-12", ville: "Corrèze (19)", format: "AUTRE", categorie: "CHAMP. Dép. Triplette Séniors Masc (14h) + CHAMP. Dép. Doublette Séniors Masc (14h)", type: "CHAMPIONNAT", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 22, date: "2026-04-15", dateFin: "2026-04-16", ville: "Corrèze (19)", format: "DOUBLETTE", categorie: "CHAMP. Dép. Doublette Séniors Mixte — secteurs + finale PPB", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Brive-la-Gaillarde")[0], lng: ll("Brive-la-Gaillarde")[1] },
  { id: 23, date: "2026-04-18", dateFin: "2026-04-19", ville: "Corrèze (19)", format: "AUTRE", categorie: "CHAMP. Dép. Triplette Vétéran + CHAMP. Dép. Doublette Séniors Masc — finale Malemort", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Malemort-sur-Corrèze")[0], lng: ll("Malemort-sur-Corrèze")[1] },
  { id: 24, date: "2026-04-22", dateFin: "2026-04-23", ville: "Corrèze (19)", format: "AUTRE", categorie: "CHAMP. Dép. Triplette Vétéran (14h) + CHAMP. Dép. Doublette Séniors Mixte (14h)", type: "CHAMPIONNAT", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 25, date: "2026-04-25", dateFin: "2026-04-26", ville: "Uzerche", format: "DOUBLETTE", categorie: "CHAMP. Dép. Doublette Jeune", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Uzerche")[0], lng: ll("Uzerche")[1] },

  // ══════════════ MAI 2026 ══════════════
  { id: 26, date: "2026-05-01", dateFin: "2026-05-02", ville: "Corrèze (19)", format: "TRIPLETTE", categorie: "CHAMP. Dép. Triplette Séniors Mixte (14h) — secteurs + finale Rosiers", type: "CHAMPIONNAT", lat: ll("Rosiers-d'Egletons")[0], lng: ll("Rosiers-d'Egletons")[1] },
  { id: 27, date: "2026-05-08", ville: "Voutezac", format: "TRIPLETTE", categorie: "Triplette Séniors — Concours (mise +25%, limité 32 équipes, poules de 4)", heure: "9h00", type: "CONCOURS", lat: ll("Voutezac")[0], lng: ll("Voutezac")[1] },
  { id: 28, date: "2026-05-09", ville: "Turenne", format: "DOUBLETTE", categorie: "Doublette Séniors — Trophée Collombier (mise +50%)", heure: "14h30", type: "CONCOURS", lat: ll("Turenne")[0], lng: ll("Turenne")[1] },
  { id: 29, date: "2026-05-09", dateFin: "2026-05-10", ville: "Argentat", format: "DOUBLETTE", categorie: "CHAMP. Dép. Doublette Jeu Provençal — secteurs + finale Argentat", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Argentat")[0], lng: ll("Argentat")[1] },
  { id: 30, date: "2026-05-16", ville: "Corrèze (19)", format: "TRIPLETTE", categorie: "CHAMP. Rég. Triplette Mixte / Séniors Masc / Vétéran / Doublette S. Mixte", type: "RÉGIONAL", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 31, date: "2026-05-16", ville: "Brive-la-Gaillarde", lieu: "Cyrano Brive", format: "TRIPLETTE", categorie: "Triplette Mixte — Concours (mise +25%)", heure: "14h30", type: "CONCOURS", lat: ll("Brive-la-Gaillarde")[0], lng: ll("Brive-la-Gaillarde")[1] },
  { id: 32, date: "2026-05-23", ville: "Saint-Exupéry-les-Roches", format: "DOUBLETTE", categorie: "Doublette Séniors — 12h de St Exupéry (limité 64 équipes)", heure: "8h30", type: "CONCOURS", lat: ll("Saint-Exupéry-les-Roches")[0], lng: ll("Saint-Exupéry-les-Roches")[1] },
  { id: 33, date: "2026-05-24", dateFin: "2026-05-25", ville: "Brive-la-Gaillarde", format: "TRIPLETTE", categorie: "Triplette Jeu Provençal — 4ème Grand Prix de la Ville de Brive (indemnités 2200€, limité 32)", heure: "9h00", info: "PCC - Inscription 06.09.20.49.24", type: "CONCOURS", lat: ll("Brive-la-Gaillarde")[0], lng: ll("Brive-la-Gaillarde")[1] },
  { id: 34, date: "2026-05-30", dateFin: "2026-05-31", ville: "Corrèze (19)", format: "TRIPLETTE", categorie: "CHAMP. Rég. Triplette Jeu Provençal — Ussac", type: "RÉGIONAL", lat: ll("Ussac")[0], lng: ll("Ussac")[1] },

  // ══════════════ JUIN 2026 ══════════════
  { id: 35, date: "2026-06-02", ville: "Triouzoune", lieu: "Neuvic", format: "DOUBLETTE", categorie: "Doublette Séniors — Concours de la Pétanque Triouzoune (ABC, mise +25%)", heure: "14h30", type: "CONCOURS", lat: ll("Triouzoune")[0], lng: ll("Triouzoune")[1] },
  { id: 36, date: "2026-06-02", ville: "Corrèze (19)", format: "DOUBLETTE", categorie: "CHAMP. Rég. Doublette Jeu Provençal — Condat/Vienne", type: "RÉGIONAL", lat: ll("Condat")[0], lng: ll("Condat")[1] },
  { id: 37, date: "2026-06-09", ville: "Turenne", format: "DOUBLETTE", categorie: "Doublette Séniors — Trophée J Vallon (mise +50%)", heure: "14h30", type: "CONCOURS", lat: ll("Turenne")[0], lng: ll("Turenne")[1] },
  { id: 38, date: "2026-06-09", ville: "Bort-les-Orgues", format: "DOUBLETTE", categorie: "Doublette Séniors (mise +50%)", type: "CONCOURS", lat: ll("Bort-les-Orgues")[0], lng: ll("Bort-les-Orgues")[1] },
  { id: 39, date: "2026-06-13", ville: "Varetz", format: "TRIPLETTE", categorie: "Triplette Séniors — Prix des Artisans et Commerçants de Varetz (mise +75%)", type: "CONCOURS", lat: ll("Varetz")[0], lng: ll("Varetz")[1] },
  { id: 40, date: "2026-06-13", ville: "Egletons", lieu: "C. Egletons", format: "TRIPLETTE", categorie: "Triplette — Challenge Bernard Robert (mise +25%)", heure: "14h00", info: "Inscription 06.85.05.76.86", type: "CONCOURS", lat: ll("Egletons")[0], lng: ll("Egletons")[1] },
  { id: 41, date: "2026-06-13", ville: "Malemort-sur-Corrèze", format: "DOUBLETTE", categorie: "Doublette Séniors — 1er Challenge de la Boule Malemortoise (mise +50%)", heure: "14h30", type: "CONCOURS", lat: ll("Malemort-sur-Corrèze")[0], lng: ll("Malemort-sur-Corrèze")[1] },
  { id: 42, date: "2026-06-20", ville: "Gros-Chastang", format: "DOUBLETTE", categorie: "Doublette Séniors — Trophée Henri Lachaud (mise +25%, limité 32)", heure: "14h30", info: "Inscription 06.83.83.41.35", type: "CONCOURS", lat: ll("Gros-Chastang")[0], lng: ll("Gros-Chastang")[1] },
  { id: 43, date: "2026-06-20", ville: "Seilhac", format: "DOUBLETTE", categorie: "Doublette Féminin — 12h de la Pétanque Seilhacoise (limité 32)", heure: "8h30", info: "Inscription 06.70.94.27.01", type: "CONCOURS", lat: ll("Seilhac")[0], lng: ll("Seilhac")[1] },

  // ══════════════ JUILLET 2026 ══════════════
  { id: 44, date: "2026-07-01", ville: "Malemort-sur-Corrèze", format: "TRIPLETTE", categorie: "CHAMP. Dép. Triplette Mixte Vétéran", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Malemort-sur-Corrèze")[0], lng: ll("Malemort-sur-Corrèze")[1] },
  { id: 45, date: "2026-07-04", ville: "Voutezac", format: "TRIPLETTE", categorie: "Triplette Séniors — Concours Voutezac (mise +25%, limité 32, poules de 4)", heure: "9h00", type: "CONCOURS", lat: ll("Voutezac")[0], lng: ll("Voutezac")[1] },
  { id: 46, date: "2026-07-04", ville: "Chirac-Bellevue", format: "DOUBLETTE", categorie: "Doublette Séniors — Challenge Jean Juillard 12h (limité 48)", info: "Inscription 06.71.20.53.25", type: "CONCOURS", lat: ll("Chirac-Bellevue")[0], lng: ll("Chirac-Bellevue")[1] },
  { id: 47, date: "2026-07-11", ville: "Argentat", format: "TRIPLETTE", categorie: "Triplette Provençal — Grand Prix de la Ville d'Argentat (mise +100%, limité 32)", heure: "8h30", info: "Inscription 07.50.26.57.35", type: "CONCOURS", lat: ll("Argentat")[0], lng: ll("Argentat")[1] },
  { id: 48, date: "2026-07-14", ville: "Brive-la-Gaillarde", lieu: "Cyrano Brive", format: "DOUBLETTE", categorie: "Doublette Séniors — Prix de la ville de Brive (mise +50%)", heure: "14h30", type: "CONCOURS", lat: ll("Brive-la-Gaillarde")[0], lng: ll("Brive-la-Gaillarde")[1] },
  { id: 49, date: "2026-07-14", ville: "Rosiers-d'Egletons", format: "DOUBLETTE", categorie: "Doublette Séniors — 12h de la Pétanque Rosieroise (mise +190%, limité 64)", heure: "8h30", info: "Inscription 06.14.81.85.55", type: "CONCOURS", lat: ll("Rosiers-d'Egletons")[0], lng: ll("Rosiers-d'Egletons")[1] },
  { id: 50, date: "2026-07-14", ville: "Chamberet", format: "TRIPLETTE", categorie: "Triplette — Grand Prix de la Ville de Chamberet", type: "CONCOURS", lat: ll("Chamberet")[0], lng: ll("Chamberet")[1] },
  { id: 51, date: "2026-07-21", ville: "Chirac-Bellevue", format: "DOUBLETTE", categorie: "Doublette Vétéran (mise +30%)", heure: "14h30", type: "CONCOURS", lat: ll("Chirac-Bellevue")[0], lng: ll("Chirac-Bellevue")[1] },
  { id: 52, date: "2026-07-25", ville: "Saint-Privat", format: "DOUBLETTE", categorie: "Doublette Mixte — 12h de la Pétanque Xaintricoise", heure: "9h00", type: "CONCOURS", lat: ll("Saint-Privat")[0], lng: ll("Saint-Privat")[1] },

  // ══════════════ AOÛT 2026 ══════════════
  { id: 53, date: "2026-08-01", ville: "Donzenac", format: "DOUBLETTE", categorie: "Doublette Séniors — Concours du Cochonnet Gamadou (mise +25%)", heure: "14h30", type: "CONCOURS", lat: ll("Donzenac")[0], lng: ll("Donzenac")[1] },
  { id: 54, date: "2026-08-03", ville: "Rosiers-d'Egletons", lieu: "Ponty", format: "DOUBLETTE", categorie: "Doublette Séniors — Challenge Henri Verdier (mise +50%, limité 64)", info: "Réservation 06.82.13.39.86", type: "CONCOURS", lat: ll("Rosiers-d'Egletons")[0], lng: ll("Rosiers-d'Egletons")[1] },
  { id: 55, date: "2026-08-08", ville: "Seilhac", format: "DOUBLETTE", categorie: "Doublette Séniors — Challenge Thomas Martin (Amicale des arbitres)", type: "CONCOURS", lat: ll("Seilhac")[0], lng: ll("Seilhac")[1] },
  { id: 56, date: "2026-08-15", ville: "Merlines", format: "DOUBLETTE", categorie: "Doublette Séniors — Joyeuses Abeilles (mise +40%)", heure: "14h30", type: "CONCOURS", lat: ll("Merlines")[0], lng: ll("Merlines")[1] },
  { id: 57, date: "2026-08-21", ville: "Gimel-les-Cascades", format: "TRIPLETTE", categorie: "Triplette Provençal — Challenge JP Rhode, Pétanque des Cascades (mise +40%)", heure: "8h30", type: "CONCOURS", lat: ll("Gimel-les-Cascades")[0], lng: ll("Gimel-les-Cascades")[1] },
  { id: 58, date: "2026-08-22", ville: "Merlines", format: "DOUBLETTE", categorie: "Doublette Séniors — 12h Pétanque la Merlinoise (limité 48)", heure: "8h30", info: "Inscription 06.84.35.08.07", type: "CONCOURS", lat: ll("Merlines")[0], lng: ll("Merlines")[1] },
  { id: 59, date: "2026-08-26", dateFin: "2026-08-27", ville: "Corrèze (19)", format: "DOUBLETTE", categorie: "CHAMP. Dép. Doublette Vétéran — secteurs + finale Rosiers", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Rosiers-d'Egletons")[0], lng: ll("Rosiers-d'Egletons")[1] },
  { id: 60, date: "2026-08-29", dateFin: "2026-08-30", ville: "Corrèze (19)", format: "DOUBLETTE", categorie: "CHAMP. Dép. Doublette Promotion — secteurs + finale St Exupéry", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Saint-Exupéry-les-Roches")[0], lng: ll("Saint-Exupéry-les-Roches")[1] },

  // ══════════════ SEPTEMBRE 2026 ══════════════
  { id: 61, date: "2026-09-05", ville: "Tulle", lieu: "Boulodrome Tulle", format: "TRIPLETTE", categorie: "Triplette Séniors — Concours de la Barrussie (mise +25%)", heure: "14h30", type: "CONCOURS", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 62, date: "2026-09-09", ville: "Uzerche", format: "TRIPLETTE", categorie: "Triplette Séniors — Grand Prix de la Ville d'Uzerche (mise +50%)", type: "CONCOURS", lat: ll("Uzerche-GP")[0], lng: ll("Uzerche-GP")[1] },
  { id: 63, date: "2026-09-09", ville: "Turenne", format: "DOUBLETTE", categorie: "Doublette Séniors — Trophée Ville Turenne (mise +50%)", heure: "14h30", type: "CONCOURS", lat: ll("Turenne")[0], lng: ll("Turenne")[1] },
  { id: 64, date: "2026-09-13", ville: "Bort-les-Orgues", format: "DOUBLETTE", categorie: "Doublette Séniors — Concours doublette de la Ste-Croix", type: "CONCOURS", lat: ll("Bort-les-Orgues")[0], lng: ll("Bort-les-Orgues")[1] },
  { id: 65, date: "2026-09-19", ville: "Malemort-sur-Corrèze", format: "DOUBLETTE", categorie: "Doublette Séniors — Prix de la Ville de Malemort (mise +50%)", heure: "14h30", type: "CONCOURS", lat: ll("Malemort-sur-Corrèze")[0], lng: ll("Malemort-sur-Corrèze")[1] },
  { id: 66, date: "2026-09-24", ville: "Tulle", lieu: "Boulodrome Tulle", format: "TRIPLETTE", categorie: "Triplette Séniors — 6ème Challenge Serge Pradel de la Barrussie (mise +25%)", heure: "14h30", type: "CONCOURS", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },

  // ══════════════ OCTOBRE 2026 ══════════════
  { id: 67, date: "2026-10-07", ville: "Tulle", lieu: "Boulodrome Tulle", format: "TRIPLETTE", categorie: "Triplette Séniors — Concours de la Barrussie (mise +25%)", heure: "14h30", type: "CONCOURS", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 68, date: "2026-10-11", ville: "Tulle", lieu: "Carreau tulliste", format: "AUTRE", categorie: "Coupe de la Corrèze — Demi-finale et Finale", type: "SPÉCIAL", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 69, date: "2026-10-14", ville: "Tulle", lieu: "Boulodrome de Tulle", format: "TRIPLETTE", categorie: "Triplette Séniors — Concours ASPTT Tulle (mise +25%)", heure: "14h00", type: "CONCOURS", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 70, date: "2026-10-21", dateFin: "2026-10-22", ville: "Brive-la-Gaillarde", format: "TRIPLETTE", categorie: "Triplette Séniors — Concours Varetz 4 parties (mise +25%)", type: "CONCOURS", lat: ll("Varetz")[0], lng: ll("Varetz")[1] },
  { id: 71, date: "2026-10-21", ville: "Tulle", format: "TRIPLETTE", categorie: "Triplette Mixte — Challenge Michel Brard (mise +30%)", heure: "14h00", type: "CONCOURS", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
  { id: 72, date: "2026-10-31", ville: "Tulle", lieu: "Carreau tulliste", format: "DOUBLETTE", categorie: "Doublette Séniors — Concours pour Elisio et pour le cancer (limité 40)", type: "CONCOURS", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },

  // ══════════════ NOVEMBRE 2026 ══════════════
  { id: 73, date: "2026-11-05", ville: "Brive-la-Gaillarde", lieu: "Cyrano Brive", format: "TRIPLETTE", categorie: "Triplette Séniors (mise +25%)", heure: "14h30", type: "CONCOURS", lat: ll("Brive-la-Gaillarde")[0], lng: ll("Brive-la-Gaillarde")[1] },

  // ══════════════ DÉCEMBRE 2026 ══════════════
  { id: 74, date: "2026-12-19", ville: "Tulle", lieu: "Carreau tulliste", format: "DOUBLETTE", categorie: "Doublette Séniors — 12 Heures Hivernal du Carreau (limité 36)", info: "Sur réservation", type: "CONCOURS", lat: ll("Tulle")[0], lng: ll("Tulle")[1] },
];
