// Calendrier complet Côtes-d'Armor (22) - 2026
// Source : Comité Départemental de Pétanque des Côtes-d'Armor
// Site : https://www.cd22petanque.com/accueil
// Facebook : https://www.facebook.com/groups/815132065842557/
//
// Abréviations :
// CDF = Coupe de France | CDC = Compétition de Clubs
// CRC = Championnat Régional Clubs | CDV = Chpt Dép. Vétéran
// TSF/TSM/TSMx = Triplette Sénior Féminin/Masculin/Mixte
// DSF/DSM/DSMx = Doublette Sénior Féminin/Masculin/Mixte
// ISF/ISM = Individuel Sénior Féminin/Masculin
// TSPromo = Triplette Sénior Promotion | TJProv/DJProv = Jeu Provençal
// BP = Boulodrome de Ploufragan | TV = Triplette Vétéran | DV = Doublette Vétéran
// ras = Résultats avec Saisie | dép = Départ de saison | F = Finale

export interface ConcourCotesdArmor {
  id: number;
  date: string;
  dateFin?: string;
  ville: string;
  format: string;
  categorie: string;
  heure?: string;
  info?: string;
  lat: number;
  lng: number;
  type: "CONCOURS" | "CHAMPIONNAT" | "RÉGIONAL" | "NATIONAL" | "SPÉCIAL";
}

export const DEPT_COTESDARMOR = {
  nom: "Côtes-d'Armor",
  code: "22",
  facebook: "https://www.facebook.com/groups/815132065842557/",
  site: "https://www.cd22petanque.com/accueil",
};

const COORDS: Record<string, [number, number]> = {
  "Ploufragan":         [48.4811, -2.8097],
  "Lannion":            [48.7320, -3.4567],
  "Trégueux":           [48.4944, -2.7694],
  "Lamballe":           [48.4686, -2.5136],
  "Loudéac":            [48.1783, -2.7542],
  "Dinan":              [48.4553, -2.0511],
  "Broons":             [48.3217, -2.2786],
  "Douai":              [50.3714, 3.0797],
  "Pleudihen":          [48.5186, -1.9631],
  "Saint-Julien":       [48.3850, -2.6100],
  "Yffiniac":           [48.4783, -2.6986],
  "Tréguier":           [48.7878, -3.2289],
  "Plérin":             [48.5333, -2.7667],
  "Perros-Guirec":      [48.8003, -3.4436],
  "Plouisy":            [48.5800, -3.1500],
  "Jugon-les-Lacs":     [48.4053, -2.3108],
  "Plestin-les-Grèves": [48.6536, -3.6333],
  "Plourivo":           [48.7536, -3.1044],
  "Binic":              [48.5983, -2.8303],
  "Landerneau":         [48.4519, -4.2519],
  "Étables-sur-Mer":    [48.6167, -2.8333],
  "Lantic":             [48.5667, -2.8667],
  "Brest":              [48.3900, -4.4861],
  "Blaye-les-Mines":    [44.0197, 2.1525],
  "Bergerac":           [44.8500, 0.4833],
  "Nice":               [43.7102, 7.2620],
  "Ajaccio":            [41.9192, 8.7386],
  "Briançon":           [44.8953, 6.6419],
  "Saint-Florentin":    [47.9997, 3.7308],
  "Plouarzel":          [48.4167, -4.7333],
  "Plémet":             [48.1797, -2.6011],
  "Saint-Brieuc":       [48.5144, -2.7656],
  "Korong":             [48.3800, -3.1200],
  "Blaye":              [45.1281, -0.6633],
  "Plouisy":            [48.5800, -3.1500],
  "Ploufragan-BP":      [48.4811, -2.8097],
  "Romillé":            [48.1869, -1.8728],
  "Sainte-Livrade":     [44.3953, 0.5933],
  "Saint-Yrieix":       [45.5167, 1.2000],
  "Vienne":             [45.5236, 4.8742],
  "Plourivo":           [48.7536, -3.1044],
};

function ll(ville: string): [number, number] {
  return COORDS[ville] ?? [48.51, -2.77];
}

export const CONCOURS_COTESDARMOR_2026: ConcourCotesdArmor[] = [

  // ══════════════ JANVIER 2026 ══════════════
  { id: 1,  date: "2026-01-03", ville: "Lannion", format: "AUTRE", categorie: "Départ de saison Doublette Sénior", type: "CONCOURS", lat: ll("Lannion")[0], lng: ll("Lannion")[1] },
  { id: 2,  date: "2026-01-31", dateFin: "2026-02-01", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CDF 32ème + 16ème de finale — Fin CDF 8ème Fin", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },

  // ══════════════ FÉVRIER 2026 ══════════════
  { id: 3,  date: "2026-02-01", ville: "Trégueux", format: "AUTRE", categorie: "CoD22 + Présidents Clubs — 1ère semaine février", type: "SPÉCIAL", lat: ll("Trégueux")[0], lng: ll("Trégueux")[1] },
  { id: 4,  date: "2026-02-08", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "Journée J Yffiniac", type: "SPÉCIAL", lat: ll("Yffiniac")[0], lng: ll("Yffiniac")[1] },
  { id: 5,  date: "2026-02-13", dateFin: "2026-02-14", ville: "Lannion", format: "AUTRE", categorie: "ras 1e+1a — CDF Lannion dép DS / Broons dép IS", type: "SPÉCIAL", lat: ll("Lannion")[0], lng: ll("Lannion")[1] },
  { id: 6,  date: "2026-02-14", ville: "Lamballe", format: "AUTRE", categorie: "Stage féminin — Pleudihen dépDS", type: "CONCOURS", lat: ll("Lamballe")[0], lng: ll("Lamballe")[1] },
  { id: 7,  date: "2026-02-15", dateFin: "2026-02-16", ville: "Loudéac", format: "AUTRE", categorie: "CDF barrage (ou 1°) — 22 IJ Loudéac / Élect Municipales", type: "SPÉCIAL", lat: ll("Loudéac")[0], lng: ll("Loudéac")[1] },
  { id: 8,  date: "2026-02-24", ville: "Lamballe", format: "AUTRE", categorie: "Lamballe ras TV Mx", type: "CONCOURS", lat: ll("Lamballe")[0], lng: ll("Lamballe")[1] },
  { id: 9,  date: "2026-02-28", ville: "Lannion", format: "DOUBLETTE", categorie: "Broons ras TS — Lannion dép TS", type: "CONCOURS", lat: ll("Lannion")[0], lng: ll("Lannion")[1] },

  // ══════════════ MARS 2026 ══════════════
  { id: 10, date: "2026-03-01", ville: "Ploufragan", format: "DOUBLETTE", categorie: "Broons dép DSMx — 22 TSPromo Trégueux", type: "CHAMPIONNAT", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 11, date: "2026-03-07", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CDF 1° — Pleudihen dépDS", type: "SPÉCIAL", lat: ll("Pleudihen")[0], lng: ll("Pleudihen")[1] },
  { id: 12, date: "2026-03-08", ville: "Trégueux", format: "AUTRE", categorie: "CED Trégueux", type: "SPÉCIAL", lat: ll("Trégueux")[0], lng: ll("Trégueux")[1] },
  { id: 13, date: "2026-03-11", ville: "Trégueux", format: "AUTRE", categorie: "CED Trégueux", type: "SPÉCIAL", lat: ll("Trégueux")[0], lng: ll("Trégueux")[1] },
  { id: 14, date: "2026-03-17", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CDC V 1°J — CRC V 1°J", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 15, date: "2026-03-21", dateFin: "2026-03-22", ville: "Ploufragan", format: "TRIPLETTE", categorie: "22 TSPromo Trégueux — Elections municipales", type: "CHAMPIONNAT", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 16, date: "2026-03-24", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CDV 1° — Lamballe", type: "CHAMPIONNAT", lat: ll("Lamballe")[0], lng: ll("Lamballe")[1] },
  { id: 17, date: "2026-03-28", dateFin: "2026-03-29", ville: "Trégueux", format: "AUTRE", categorie: "22 DSF + ISM", type: "CHAMPIONNAT", lat: ll("Trégueux")[0], lng: ll("Trégueux")[1] },

  // ══════════════ AVRIL 2026 ══════════════
  { id: 18, date: "2026-04-04", dateFin: "2026-04-05", ville: "Côtes-d'Armor", format: "TRIPLETTE", categorie: "Chpt Dép. Triplette Jeu Provençal", type: "CHAMPIONNAT", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 19, date: "2026-04-06", ville: "Trégueux", format: "TRIPLETTE", categorie: "Trégueux dép DS+DSF — dép TS highlight", heure: "14h00", type: "CONCOURS", lat: ll("Trégueux")[0], lng: ll("Trégueux")[1] },
  { id: 20, date: "2026-04-06", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "Coupe de France 1er et 2ème tours + Coupe locale", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 21, date: "2026-04-08", ville: "Dinan", format: "AUTRE", categorie: "Dinan ras TV", type: "CONCOURS", lat: ll("Dinan")[0], lng: ll("Dinan")[1] },
  { id: 22, date: "2026-04-11", dateFin: "2026-04-12", ville: "Ploufragan", format: "DOUBLETTE", categorie: "22 TSF+TSM BP Ploufragan", type: "CHAMPIONNAT", lat: ll("Ploufragan-BP")[0], lng: ll("Ploufragan-BP")[1] },
  { id: 23, date: "2026-04-12", ville: "Ploufragan", format: "DOUBLETTE", categorie: "22 TSF+TSM — CDC V+ 2°J / CRC V 2°J", type: "CHAMPIONNAT", lat: ll("Ploufragan-BP")[0], lng: ll("Ploufragan-BP")[1] },
  { id: 24, date: "2026-04-14", dateFin: "2026-04-15", ville: "Ploufragan", format: "TRIPLETTE", categorie: "Br35 TSF+TSM Fougères — Br35 TV Fougères", type: "RÉGIONAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 25, date: "2026-04-16", dateFin: "2026-04-17", ville: "Ploufragan", format: "TRIPLETTE", categorie: "Br35 DSMx Fgères — Br35 TSMx Fougères / Plourivo dép DS", type: "RÉGIONAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 26, date: "2026-04-18", dateFin: "2026-04-19", ville: "Ploufragan", format: "DOUBLETTE", categorie: "22 DSMx Trégueux + 22 DSMx", type: "CHAMPIONNAT", lat: ll("Ploufragan-BP")[0], lng: ll("Ploufragan-BP")[1] },
  { id: 27, date: "2026-04-22", dateFin: "2026-04-23", ville: "Côtes-d'Armor", format: "TRIPLETTE", categorie: "CDC V+ 3°J / CRC V 3°J — Lamballe", type: "SPÉCIAL", lat: ll("Lamballe")[0], lng: ll("Lamballe")[1] },
  { id: 28, date: "2026-04-25", dateFin: "2026-04-26", ville: "Lamballe", format: "AUTRE", categorie: "Br29 TSProm TDPJ — Tréguier dép DS / Broons dép DS", type: "RÉGIONAL", lat: ll("Lamballe")[0], lng: ll("Lamballe")[1] },
  { id: 29, date: "2026-04-24", ville: "Landerneau", format: "AUTRE", categorie: "Br29 ISF+DSM Landerneau", type: "RÉGIONAL", lat: ll("Landerneau")[0], lng: ll("Landerneau")[1] },
  { id: 30, date: "2026-04-25", dateFin: "2026-04-26", ville: "Trégueux", format: "AUTRE", categorie: "Br29 Land DSF + ISM — Colloque éducateurs Yffiniac dép F+M", type: "RÉGIONAL", lat: ll("Trégueux")[0], lng: ll("Trégueux")[1] },

  // ══════════════ MAI 2026 ══════════════
  { id: 31, date: "2026-05-01", ville: "Ploufragan", format: "AUTRE", categorie: "CDC J 22+56 — Ploufragan dép DS", type: "SPÉCIAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 32, date: "2026-05-02", dateFin: "2026-05-03", ville: "Ploufragan", format: "TRIPLETTE", categorie: "22 TSMx BP Ploufragan — 22 TSMx", type: "CHAMPIONNAT", lat: ll("Ploufragan-BP")[0], lng: ll("Ploufragan-BP")[1] },
  { id: 33, date: "2026-05-05", dateFin: "2026-05-06", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CDC V+ 4°J / CRC V 4°J", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 34, date: "2026-05-06", ville: "Ajaccio", format: "DOUBLETTE", categorie: "CDF 2x2 Mixte — Ajaccio", type: "NATIONAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 35, date: "2026-05-08", dateFin: "2026-05-10", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CDF-JP Butoir — 22 TJ Yffiniac", type: "SPÉCIAL", lat: ll("Yffiniac")[0], lng: ll("Yffiniac")[1] },
  { id: 36, date: "2026-05-09", dateFin: "2026-05-10", ville: "Ploufragan", format: "DOUBLETTE", categorie: "22 DJProv Lamballe / TDP Jun Lamballe — 22 DJProv Lamballe", type: "CHAMPIONNAT", lat: ll("Lamballe")[0], lng: ll("Lamballe")[1] },
  { id: 37, date: "2026-05-12", ville: "Ploufragan", format: "DOUBLETTE", categorie: "CDV 2°", type: "CHAMPIONNAT", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 38, date: "2026-05-14", dateFin: "2026-05-15", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CDC V+ 5°J / CRC V 5°J — Chpt France TSF+TSM", type: "NATIONAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 39, date: "2026-05-16", dateFin: "2026-05-17", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "Chpt France DSMx + Chpt France TSF/TSM continue", type: "NATIONAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 40, date: "2026-05-19", ville: "Plouisy", format: "AUTRE", categorie: "Chps Gx ras TV", type: "CONCOURS", lat: ll("Plouisy")[0], lng: ll("Plouisy")[1] },
  { id: 41, date: "2026-05-20", dateFin: "2026-05-21", ville: "Jugon-les-Lacs", format: "TRIPLETTE", categorie: "F TSF TSM — Jugon dép DSMx", type: "NATIONAL", lat: ll("Jugon-les-Lacs")[0], lng: ll("Jugon-les-Lacs")[1] },
  { id: 42, date: "2026-05-23", dateFin: "2026-05-24", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CDC V+ Barrage / CRC V Barrage", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 43, date: "2026-05-26", dateFin: "2026-05-27", ville: "Broons", format: "DOUBLETTE", categorie: "Broons dép DV — 22 ISF+DSM Trégueux / Broons dép TSMx", type: "CHAMPIONNAT", lat: ll("Broons")[0], lng: ll("Broons")[1] },
  { id: 44, date: "2026-05-30", dateFin: "2026-05-31", ville: "Binic", format: "AUTRE", categorie: "Br22 TJ Yffiniac — Lamballe rasTV", type: "RÉGIONAL", lat: ll("Binic")[0], lng: ll("Binic")[1] },

  // ══════════════ JUIN 2026 ══════════════
  { id: 45, date: "2026-06-02", ville: "Ploufragan", format: "DOUBLETTE", categorie: "CDC V+ 6°J / CRC V 6°J", type: "SPÉCIAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 46, date: "2026-06-04", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CoDir", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 47, date: "2026-06-06", ville: "Plestin-les-Grèves", format: "DOUBLETTE", categorie: "CDC V+ 6°J Repli / CRC V JRepli — Plestin LG dép DS", type: "SPÉCIAL", lat: ll("Plestin-les-Grèves")[0], lng: ll("Plestin-les-Grèves")[1] },
  { id: 48, date: "2026-06-07", ville: "Ploufragan", format: "DOUBLETTE", categorie: "CDC V+ 6°J / CRC V 6°J", type: "SPÉCIAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 49, date: "2026-06-09", ville: "Ploufragan", format: "DOUBLETTE", categorie: "CDC V+ 6°J / CRC V 6°J — 22 DJProv Lamballe / TDP Jun Lamballe", type: "SPÉCIAL", lat: ll("Lamballe")[0], lng: ll("Lamballe")[1] },
  { id: 50, date: "2026-06-12", ville: "Binic", format: "AUTRE", categorie: "Binic ras TV", type: "CONCOURS", lat: ll("Binic")[0], lng: ll("Binic")[1] },
  { id: 51, date: "2026-06-13", dateFin: "2026-06-14", ville: "Ploufragan", format: "AUTRE", categorie: "CDC 1ère rencontre 8h30 — CDF 3° + ras1e+1a", type: "SPÉCIAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 52, date: "2026-06-14", ville: "Ploufragan", format: "DOUBLETTE", categorie: "CDC+ J2 / Plestin LG dép DS", type: "SPÉCIAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 53, date: "2026-06-19", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "Chpt France TSM + TSF — St Rémy Individuel", type: "NATIONAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 54, date: "2026-06-20", dateFin: "2026-06-21", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "France TSM + TSF — CDC 2ème rencontre 8h30 + 3ème 14h30", type: "NATIONAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 55, date: "2026-06-20", ville: "Côtes-d'Armor", format: "DOUBLETTE", categorie: "F TSF TSM Jugon — F DSMx Jugon", type: "NATIONAL", lat: ll("Jugon-les-Lacs")[0], lng: ll("Jugon-les-Lacs")[1] },
  { id: 56, date: "2026-06-27", dateFin: "2026-06-28", ville: "Sainte-Livrade", format: "DOUBLETTE", categorie: "France DSM — CDF 2x2 Mixte", type: "NATIONAL", lat: ll("Sainte-Livrade")[0], lng: ll("Sainte-Livrade")[1] },

  // ══════════════ JUILLET 2026 ══════════════
  { id: 57, date: "2026-07-03", dateFin: "2026-07-05", ville: "Côtes-d'Armor", format: "TRIPLETTE", categorie: "France TJProv 81 Blaye / Binic ras DS", type: "NATIONAL", lat: ll("Blaye")[0], lng: ll("Blaye")[1] },
  { id: 58, date: "2026-07-04", dateFin: "2026-07-05", ville: "Ploufragan", format: "TRIPLETTE", categorie: "F TJProv 81 Blaye / BP Ploufragan dép TProm", type: "NATIONAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 59, date: "2026-07-05", dateFin: "2026-07-06", ville: "Lantic", format: "TRIPLETTE", categorie: "F TJProv 81 Blaye Lantic dép DS — CDC 4ème rencontre 8h30 + 5ème 14h30", type: "NATIONAL", lat: ll("Lantic")[0], lng: ll("Lantic")[1] },
  { id: 60, date: "2026-07-10", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "France TDP Junior", type: "NATIONAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 61, date: "2026-07-11", dateFin: "2026-07-12", ville: "Blaye-les-Mines", format: "TRIPLETTE", categorie: "France TJ 81 Blaye LM / Broons D 1a+1j", type: "NATIONAL", lat: ll("Blaye-les-Mines")[0], lng: ll("Blaye-les-Mines")[1] },
  { id: 62, date: "2026-07-12", dateFin: "2026-07-13", ville: "Blaye-les-Mines", format: "TRIPLETTE", categorie: "F TJ 81 Blaye LM / Korong dép DS — CDC 6ème rencontre 8h30 + 7ème 14h30", type: "NATIONAL", lat: ll("Blaye-les-Mines")[0], lng: ll("Blaye-les-Mines")[1] },
  { id: 63, date: "2026-07-18", ville: "Côtes-d'Armor", format: "TRIPLETTE", categorie: "France TSMx — Aignay le Duc 30% Challenge Rémy", type: "NATIONAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 64, date: "2026-07-18", ville: "Nice", format: "TRIPLETTE", categorie: "F TSMx 06 Nice", type: "NATIONAL", lat: ll("Nice")[0], lng: ll("Nice")[1] },
  { id: 65, date: "2026-07-19", ville: "Nice", format: "TRIPLETTE", categorie: "F TSMx 06 Nice — continue", type: "NATIONAL", lat: ll("Nice")[0], lng: ll("Nice")[1] },
  { id: 66, date: "2026-07-25", dateFin: "2026-07-26", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "France DSF + ISM — Broons dép DV", type: "NATIONAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },

  // ══════════════ AOÛT 2026 ══════════════
  { id: 67, date: "2026-08-14", ville: "Binic", format: "AUTRE", categorie: "Binic ras DS", type: "CONCOURS", lat: ll("Binic")[0], lng: ll("Binic")[1] },
  { id: 68, date: "2026-08-15", ville: "Lannion", format: "AUTRE", categorie: "Lannion dép TS", type: "CONCOURS", lat: ll("Lannion")[0], lng: ll("Lannion")[1] },
  { id: 69, date: "2026-08-19", dateFin: "2026-08-20", ville: "Côtes-d'Armor", format: "TRIPLETTE", categorie: "France TV", type: "NATIONAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 70, date: "2026-08-22", dateFin: "2026-08-23", ville: "Côtes-d'Armor", format: "TRIPLETTE", categorie: "France TSPromo — Sainte-Colombe D 30%", type: "NATIONAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 71, date: "2026-08-25", dateFin: "2026-08-26", ville: "Côtes-d'Armor", format: "DOUBLETTE", categorie: "F DSF ISM 24 Berg / Pleudihen dépDS", type: "NATIONAL", lat: ll("Bergerac")[0], lng: ll("Bergerac")[1] },
  { id: 72, date: "2026-08-29", dateFin: "2026-08-30", ville: "Saint-Florentin", format: "AUTRE", categorie: "F ISF DSM 89 St F", type: "NATIONAL", lat: ll("Saint-Florentin")[0], lng: ll("Saint-Florentin")[1] },

  // ══════════════ SEPTEMBRE 2026 ══════════════
  { id: 73, date: "2026-09-01", ville: "Étables-sur-Mer", format: "AUTRE", categorie: "Étables ras TV", type: "CONCOURS", lat: ll("Étables-sur-Mer")[0], lng: ll("Étables-sur-Mer")[1] },
  { id: 74, date: "2026-09-03", dateFin: "2026-09-06", ville: "Vienne", format: "AUTRE", categorie: "France DJP — National Venarey", type: "NATIONAL", lat: ll("Vienne")[0], lng: ll("Vienne")[1] },
  { id: 75, date: "2026-09-05", dateFin: "2026-09-06", ville: "Ploufragan", format: "DOUBLETTE", categorie: "USCVL DMx 50% YOU Khan — National DIJON / Chps Gx ras TS", type: "NATIONAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 76, date: "2026-09-12", dateFin: "2026-09-13", ville: "Ploufragan", format: "AUTRE", categorie: "CRC J — Trégueux rDS+dDF", type: "RÉGIONAL", lat: ll("Trégueux")[0], lng: ll("Trégueux")[1] },
  { id: 77, date: "2026-09-17", dateFin: "2026-09-18", ville: "Yffiniac", format: "AUTRE", categorie: "22 DVF+M Yffiniac — 22 DVF+M Yffiniac", type: "CHAMPIONNAT", lat: ll("Yffiniac")[0], lng: ll("Yffiniac")[1] },
  { id: 78, date: "2026-09-19", dateFin: "2026-09-20", ville: "Ploufragan", format: "AUTRE", categorie: "CRC J Finale — CDV finale", type: "RÉGIONAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 79, date: "2026-09-20", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CDC Journée de réserve", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 80, date: "2026-09-22", dateFin: "2026-09-23", ville: "Ploufragan", format: "DOUBLETTE", categorie: "CDV Finale — CRC DJP Finale", type: "CHAMPIONNAT", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 81, date: "2026-09-24", dateFin: "2026-09-25", ville: "Ploufragan", format: "AUTRE", categorie: "Champs Gx ras TV — +m21+j22 fin cncV", type: "CONCOURS", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 82, date: "2026-09-26", dateFin: "2026-09-27", ville: "Saint-Brieuc", format: "AUTRE", categorie: "National Mixte DIJON — National DIJON", type: "NATIONAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },

  // ══════════════ OCTOBRE 2026 ══════════════
  { id: 83, date: "2026-10-01", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CoDir — Réunion harmonisation calendrier 2027", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 84, date: "2026-10-02", ville: "Ploufragan", format: "AUTRE", categorie: "ChpsGx ras TV", type: "CONCOURS", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 85, date: "2026-10-03", dateFin: "2026-10-04", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CNC 1we — CDC J6 / CRC J4", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 86, date: "2026-10-04", dateFin: "2026-10-05", ville: "Casatorra", format: "DOUBLETTE", categorie: "CNC 1we — CDC J6 / CRC J4 — BPPlouf rég TS", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 87, date: "2026-10-08", dateFin: "2026-10-09", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CDV 1/2 finales", type: "CHAMPIONNAT", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 88, date: "2026-10-09", ville: "Yffiniac", format: "AUTRE", categorie: "+s10+d11 fin cncJP — Yffiniac ras TV", type: "SPÉCIAL", lat: ll("Yffiniac")[0], lng: ll("Yffiniac")[1] },
  { id: 89, date: "2026-10-11", dateFin: "2026-10-12", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "coDir + prés.Clubs (2°dim oct) — CNC 2we", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 90, date: "2026-10-17", dateFin: "2026-10-18", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CNC 2we — CDC J7 / CRC J5", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 91, date: "2026-10-18", dateFin: "2026-10-19", ville: "Ploufragan", format: "AUTRE", categorie: "CNC 2we — CDC J7 / CRC J5 suite", type: "SPÉCIAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 92, date: "2026-10-20", dateFin: "2026-10-22", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "+sa21+di22 cnc / CNC F phase finale — +m21+j22 fin cncJ", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 93, date: "2026-10-25", dateFin: "2026-10-26", ville: "Ploufragan", format: "DOUBLETTE", categorie: "CDC repli ou JFin / CRC repli — +s24+d25 fin cncJ", type: "SPÉCIAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 94, date: "2026-10-27", dateFin: "2026-10-28", ville: "Ploufragan", format: "AUTRE", categorie: "CDC J5 / CRC J3", type: "SPÉCIAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 95, date: "2026-10-31", dateFin: "2026-11-01", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CNC 3we — CNC J.Fin CDC+ / J.Fin CRC+", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },

  // ══════════════ NOVEMBRE 2026 ══════════════
  { id: 96, date: "2026-11-07", dateFin: "2026-11-08", ville: "Ploufragan", format: "TRIPLETTE", categorie: "Br DJ — Br DJ continue", type: "RÉGIONAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 97, date: "2026-11-11", dateFin: "2026-11-12", ville: "Plourivo", format: "AUTRE", categorie: "stage féminin à Plourivo — CDF 2°zone", type: "SPÉCIAL", lat: ll("Plourivo")[0], lng: ll("Plourivo")[1] },
  { id: 98, date: "2026-11-14", ville: "Ploufragan", format: "AUTRE", categorie: "stage féminin à Plourivo — suite", type: "SPÉCIAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },
  { id: 99, date: "2026-11-21", dateFin: "2026-11-22", ville: "Plestin-les-Grèves", format: "AUTRE", categorie: "Congrès22 Ouest — Plestin Les Grèves (4° we nov)", type: "SPÉCIAL", lat: ll("Plestin-les-Grèves")[0], lng: ll("Plestin-les-Grèves")[1] },
  { id: 100, date: "2026-11-28", ville: "Yffiniac", format: "AUTRE", categorie: "CED Yffiniac — CDF 3°zone", type: "SPÉCIAL", lat: ll("Yffiniac")[0], lng: ll("Yffiniac")[1] },

  // ══════════════ DÉCEMBRE 2026 ══════════════
  { id: 101, date: "2026-12-05", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "CDF JP finale +d06 Congrès CRBret 29", type: "SPÉCIAL", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 102, date: "2026-12-12", ville: "Côtes-d'Armor", format: "AUTRE", categorie: "ras 1E+1A", type: "CONCOURS", lat: ll("Saint-Brieuc")[0], lng: ll("Saint-Brieuc")[1] },
  { id: 103, date: "2026-12-13", ville: "Ploufragan", format: "AUTRE", categorie: "CDF 3°zone — +s12 Congrès Nat. ??", type: "SPÉCIAL", lat: ll("Ploufragan")[0], lng: ll("Ploufragan")[1] },

];
