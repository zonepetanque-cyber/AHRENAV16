// Calendrier complet Creuse (23) - 2026
// Source : Comité Départemental de Pétanque et Jeu Provençal de la Creuse
// Site : https://www.creuse-petanque.fr
// Contact : cd23@petanque.fr — Tel. 06 70 64 68 29
// 4 avenue Louis Laroche - 23000 GUÉRET

export interface ConcourCreuse {
  id: number;
  date: string;
  dateFin?: string;
  ville: string;
  format: string;
  categorie: string;
  heure?: string;
  info?: string;
  arbitre?: string;
  contact?: string;
  lat: number;
  lng: number;
  type: "CONCOURS" | "CHAMPIONNAT" | "RÉGIONAL" | "NATIONAL" | "SPÉCIAL";
}

export const DEPT_CREUSE = {
  nom: "Creuse",
  code: "23",
  facebook: null,
  site: "https://www.creuse-petanque.fr",
};

const COORDS: Record<string, [number, number]> = {
  "Guéret":            [46.1714, 1.8697],
  "La Souterraine":    [46.2369, 1.4869],
  "Aubusson":          [45.9578, 2.1711],
  "Bonnat":            [46.3378, 1.9044],
  "Boussac":           [46.3561, 2.2128],
  "Sardent":           [46.1083, 1.9603],
  "Sainte-Feyre":      [46.1228, 1.8822],
  "Chambon-sur-Voueize": [46.1892, 2.4283],
  "Dun-le-Palestel":   [46.3028, 1.6681],
  "Bétête":            [46.3897, 2.0622],
  "Bourganeuf":        [45.9547, 1.7514],
  "Cheniers":          [46.2306, 1.7831],
  "Sainte-Livrade":    [44.3953, 0.5933],
  "Boule Nobilienne":  [46.6000, 0.1700],
  "Neuvic-sur-l'Isle": [45.1000, 0.4667],
  "Saint-Vaury":       [46.2006, 1.7536],
  "Flayat":            [45.7169, 2.3342],
  "Douai":             [50.3714, 3.0797],
  "Ajaccio":           [41.9192, 8.7386],
  "Blaye-les-Mines":   [44.0197, 2.1525],
  "Nice":              [43.7102, 7.2620],
  "Bergerac":          [44.8500, 0.4833],
  "Saint-Yrieix":      [45.5167, 1.2000],
  "Saint-Florentin":   [47.9997, 3.7308],
};

function ll(ville: string): [number, number] {
  // Chercher correspondance partielle
  for (const [key, coords] of Object.entries(COORDS)) {
    if (ville.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(ville.toLowerCase())) {
      return coords;
    }
  }
  return [46.17, 1.87]; // Guéret par défaut
}

export const CONCOURS_CREUSE_2026: ConcourCreuse[] = [

  // ══════════════ JANVIER 2026 ══════════════
  { id: 1,  date: "2026-01-07", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 2,  date: "2026-01-11", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Mixte", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "OLLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 3,  date: "2026-01-14", ville: "La Souterraine", format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.02.52.61.92", arbitre: "MOULAI", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 4,  date: "2026-01-18", ville: "La Souterraine", format: "TRIPLETTE",  categorie: "Concours Mixte", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.02.52.61.92", arbitre: "CANTHE", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 5,  date: "2026-01-21", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 6,  date: "2026-01-25", ville: "Bonnat",         format: "TRIPLETTE",  categorie: "Concours Triplette", heure: "AM", info: "4 parties", contact: "06.07.86.11.62", arbitre: "PETITJEAN", type: "CONCOURS", lat: ll("Bonnat")[0], lng: ll("Bonnat")[1] },

  // ══════════════ FÉVRIER 2026 ══════════════
  { id: 7,  date: "2026-02-01", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Mixte", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 8,  date: "2026-02-04", ville: "La Souterraine", format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.02.52.61.92", arbitre: "MOULAI", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 9,  date: "2026-02-08", ville: "La Souterraine", format: "DOUBLETTE",  categorie: "Concours A.B.C", heure: "AM", contact: "06.77.54.02.68", arbitre: "MOULAI", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 10, date: "2026-02-11", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 11, date: "2026-02-15", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Mixte", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 12, date: "2026-02-18", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "OLLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 13, date: "2026-02-22", ville: "Bonnat",         format: "TRIPLETTE",  categorie: "Concours Triplette", heure: "AM", info: "4 parties", contact: "06.07.86.11.62", arbitre: "PETITJEAN", type: "CONCOURS", lat: ll("Bonnat")[0], lng: ll("Bonnat")[1] },
  { id: 14, date: "2026-02-25", ville: "La Souterraine", format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.02.52.61.92", arbitre: "MOULAI", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },

  // ══════════════ MARS 2026 ══════════════
  { id: 15, date: "2026-03-01", ville: "La Souterraine", format: "TRIPLETTE",  categorie: "Concours Mixte", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.02.52.61.92", arbitre: "MOULAI", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 16, date: "2026-03-04", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 17, date: "2026-03-07", ville: "La Souterraine", format: "TRIPLETTE",  categorie: "Journée du droit des femmes — Concours Féminin", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.02.52.61.92", arbitre: "MOULAI", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 18, date: "2026-03-11", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 19, date: "2026-03-15", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Mixte", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 20, date: "2026-03-18", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "OLLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },

  // Championnats départementaux mars
  { id: 21, date: "2026-03-21", dateFin: "2026-03-22", ville: "Aubusson", format: "TRIPLETTE", categorie: "Champ. Dép. Triplette Promotion — 1/8 de finale", heure: "8h00", info: "Inscriptions avant le 13/03/2026", contact: "06.82.99.63.93", type: "CHAMPIONNAT", lat: ll("Aubusson")[0], lng: ll("Aubusson")[1] },
  { id: 22, date: "2026-03-28", dateFin: "2026-03-29", ville: "Saint-Vaury", format: "TÊTE À TÊTE", categorie: "Champ. Dép. T à T Masculin + Doublette Féminin", heure: "8h00", info: "TàT Masc 8h / Dou Fém 14h — Inscriptions avant le 20/03/2026", contact: "06.03.36.10.88", type: "CHAMPIONNAT", lat: ll("Saint-Vaury")[0], lng: ll("Saint-Vaury")[1] },
  { id: 23, date: "2026-03-29", ville: "Saint-Vaury",   format: "TÊTE À TÊTE", categorie: "Champ. Dép. T à T Masculin (1/8) + Doublette Féminin (1/4) + Tête à Tête Jeunes", heure: "8h00", info: "TàT Masc 8h / Dou Fém 10h / Jeunes inscriptions 9h30", contact: "06.03.36.10.88", type: "CHAMPIONNAT", lat: ll("Saint-Vaury")[0], lng: ll("Saint-Vaury")[1] },

  // ══════════════ AVRIL 2026 ══════════════
  { id: 24, date: "2026-04-06", ville: "Chambon-sur-Voueize", format: "DOUBLETTE", categorie: "Concours Doublette", heure: "AM", contact: "06.28.37.60.84", arbitre: "ROUSSILLAT", type: "CONCOURS", lat: ll("Chambon-sur-Voueize")[0], lng: ll("Chambon-sur-Voueize")[1] },
  { id: 25, date: "2026-04-11", dateFin: "2026-04-12", ville: "Sardent", format: "TRIPLETTE", categorie: "Champ. Dép. Triplette Masculin + Triplette Féminin", heure: "8h00", info: "Trip Masc 8h / Trip Fém 14h — Inscriptions avant le 03/04/2026", contact: "06.52.70.90.43", type: "CHAMPIONNAT", lat: ll("Sardent")[0], lng: ll("Sardent")[1] },
  { id: 26, date: "2026-04-12", ville: "Sardent",        format: "TRIPLETTE", categorie: "Champ. Dép. Triplette Masculin (1/8) + Triplette Féminin (1/4)", heure: "8h00", info: "Trip Masc 8h / Trip Fém 10h", contact: "06.52.70.90.43", type: "CHAMPIONNAT", lat: ll("Sardent")[0], lng: ll("Sardent")[1] },
  { id: 27, date: "2026-04-18", dateFin: "2026-04-19", ville: "Sainte-Feyre", format: "DOUBLETTE MIXTE", categorie: "Champ. Dép. Doublette Mixte", heure: "8h00", info: "Inscriptions avant le 10/04/2026", contact: "06.41.88.94.41", type: "CHAMPIONNAT", lat: ll("Sainte-Feyre")[0], lng: ll("Sainte-Feyre")[1] },
  { id: 28, date: "2026-04-19", ville: "Sainte-Feyre",  format: "DOUBLETTE MIXTE", categorie: "Champ. Dép. Doublette Mixte (1/8)", heure: "8h00", contact: "06.41.88.94.41", type: "CHAMPIONNAT", lat: ll("Sainte-Feyre")[0], lng: ll("Sainte-Feyre")[1] },
  { id: 29, date: "2026-04-22", dateFin: "2026-04-23", ville: "Boussac", format: "TRIPLETTE", categorie: "Champ. Dép. Triplette Vétérans", heure: "14h00", info: "Inscriptions avant le 10/04/2026", contact: "06.70.45.48.07", type: "CHAMPIONNAT", lat: ll("Boussac")[0], lng: ll("Boussac")[1] },
  { id: 30, date: "2026-04-25", dateFin: "2026-04-26", ville: "La Souterraine", format: "DOUBLETTE", categorie: "Champ. Dép. Doublette Masculin + Tête à Tête Féminin", heure: "8h00", info: "Dou Masc 8h / TàT Fém 14h — Inscriptions avant le 17/04/2026", contact: "06.65.45.20.01", type: "CHAMPIONNAT", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 31, date: "2026-04-26", ville: "La Souterraine", format: "DOUBLETTE", categorie: "Champ. Dép. Doublette Masculin (1/8) + TàT Féminin (1/4) + Doublette Jeunes", heure: "8h00", info: "Dou Masc 8h / TàT Fém 10h / Jeunes inscriptions 9h30", contact: "06.65.45.20.01", type: "CHAMPIONNAT", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },

  // ══════════════ MAI 2026 ══════════════
  { id: 32, date: "2026-05-01", ville: "Boussac",        format: "TRIPLETTE", categorie: "Champ. Dép. Triplette Jeunes — début du championnat", heure: "9h00", info: "Inscriptions avant le 24/04/2026", contact: "06.70.45.48.07", type: "CHAMPIONNAT", lat: ll("Boussac")[0], lng: ll("Boussac")[1] },
  { id: 33, date: "2026-05-02", dateFin: "2026-05-03", ville: "Bonnat", format: "TRIPLETTE MIXTE", categorie: "Champ. Dép. Triplette Mixte", heure: "8h00", info: "Inscriptions avant le 24/04/2026", contact: "06.07.86.11.62", type: "CHAMPIONNAT", lat: ll("Bonnat")[0], lng: ll("Bonnat")[1] },
  { id: 34, date: "2026-05-14", dateFin: "2026-05-17", ville: "Sainte-Livrade", format: "TRIPLETTE", categorie: "Champ. Régional Triplette Masc + Fém + Vétérans + Doublette Mixte + Triplette Mixte", info: "Qualifiés dep. 12/04 (Trip M/F), 23/04 (Vét), 19/04 (Dou Mi), 03/05 (Trip Mi)", type: "RÉGIONAL", lat: ll("Sainte-Livrade")[0], lng: ll("Sainte-Livrade")[1] },
  { id: 35, date: "2026-05-23", dateFin: "2026-05-25", ville: "Boule Nobilienne", format: "TRIPLETTE", categorie: "Champ. Régional Triplette Promotion + Dou Masc + TàT Fém + TàT Masc + Dou Fém", info: "Qualifiés dep. 22/03 (Trip Prom), 26/04 (Dou M / TàT F), 29/03 (TàT M / Dou F)", type: "RÉGIONAL", lat: ll("Boule Nobilienne")[0], lng: ll("Boule Nobilienne")[1] },
  { id: 36, date: "2026-05-29", dateFin: "2026-05-30", ville: "La Souterraine", format: "DOUBLETTE", categorie: "Grand Prix de La Souterraine — Concours A.B.C — Mises + 1000€", heure: "Samedi", info: "Basé sur 64 équipes", contact: "06.02.52.61.92", arbitre: "CANTHE / MOULAI", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 37, date: "2026-05-30", dateFin: "2026-05-31", ville: "Neuvic-sur-l'Isle", format: "TRIPLETTE", categorie: "Champ. Régional Triplette Jeunes", info: "Qualifiés département", type: "RÉGIONAL", lat: ll("Neuvic-sur-l'Isle")[0], lng: ll("Neuvic-sur-l'Isle")[1] },

  // ══════════════ JUIN 2026 ══════════════
  { id: 38, date: "2026-06-06", ville: "Bonnat",         format: "DOUBLETTE", categorie: "Challenge Philippe Moreau — Concours A.B.C", heure: "AM", contact: "06.07.86.11.62", arbitre: "PETITJEAN / SALAGNAC", type: "CONCOURS", lat: ll("Bonnat")[0], lng: ll("Bonnat")[1] },
  { id: 39, date: "2026-06-13", ville: "Aubusson",       format: "DOUBLETTE", categorie: "Concours Doublette", heure: "AM", contact: "06.82.99.63.93", arbitre: "BOUDIN", type: "CONCOURS", lat: ll("Aubusson")[0], lng: ll("Aubusson")[1] },
  { id: 40, date: "2026-06-14", ville: "Creuse",         format: "AUTRE",     categorie: "Champ. Régional Tir de Précision Jeunes", info: "Joueurs qualifiés le 12/04", type: "RÉGIONAL", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 41, date: "2026-06-14", ville: "Guéret",         format: "DOUBLETTE MIXTE", categorie: "Challenge Gyslaine DELARBRE — Concours A.B.C", heure: "AM", contact: "06.70.64.68.29", arbitre: "OLLE / MARTIN", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 42, date: "2026-06-17", ville: "Bétête",         format: "DOUBLETTE", categorie: "Trophée Daniel BOUEDEC — Concours Vétérans (60 ans et +)", heure: "AM", info: "4 parties d'1 heure", contact: "06.73.01.69.32", arbitre: "BOIS", type: "CONCOURS", lat: ll("Bétête")[0], lng: ll("Bétête")[1] },
  { id: 43, date: "2026-06-20", ville: "Bourganeuf",     format: "DOUBLETTE", categorie: "Concours A.B.C", heure: "AM", contact: "06.50.90.90.46", arbitre: "PASTOR", type: "CONCOURS", lat: ll("Bourganeuf")[0], lng: ll("Bourganeuf")[1] },
  { id: 44, date: "2026-06-27", ville: "Cheniers",       format: "DOUBLETTE", categorie: "Concours Doublette", heure: "AM", contact: "06.38.21.47.82", arbitre: "VAUCIEUX", type: "CONCOURS", lat: ll("Cheniers")[0], lng: ll("Cheniers")[1] },
  { id: 45, date: "2026-06-28", ville: "Guéret",         format: "DOUBLETTE", categorie: "Challenge Guy ALASNIER — Concours A.B.C", heure: "AM", contact: "06.70.64.68.29", arbitre: "OLLE / MARTIN", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },

  // ══════════════ JUILLET 2026 ══════════════
  { id: 46, date: "2026-07-11", ville: "Sainte-Feyre",   format: "DOUBLETTE", categorie: "Concours A.B.C — Mises + 40%", heure: "18h", info: "Soirée Nationale", contact: "06.41.88.94.41", arbitre: "GOUTTELARD", type: "CONCOURS", lat: ll("Sainte-Feyre")[0], lng: ll("Sainte-Feyre")[1] },
  { id: 47, date: "2026-07-17", ville: "Boussac",        format: "DOUBLETTE", categorie: "Concours Vétérans (60 ans et +)", heure: "AM", contact: "06.70.45.48.07", arbitre: "BOIS", type: "CONCOURS", lat: ll("Boussac")[0], lng: ll("Boussac")[1] },
  { id: 48, date: "2026-07-18", ville: "Boussac",        format: "DOUBLETTE MIXTE", categorie: "Concours Doublette Mixte", heure: "AM", contact: "06.70.45.48.07", arbitre: "CABRERA", type: "CONCOURS", lat: ll("Boussac")[0], lng: ll("Boussac")[1] },
  { id: 49, date: "2026-07-19", ville: "Boussac",        format: "DOUBLETTE", categorie: "Challenge André Cholin — Mises + 50%", heure: "AM", contact: "06.70.45.48.07", arbitre: "BOIS", type: "CONCOURS", lat: ll("Boussac")[0], lng: ll("Boussac")[1] },

  // Championnats de France (accueillis ou participation)
  { id: 50, date: "2026-06-20", dateFin: "2026-06-21", ville: "Douai", format: "TRIPLETTE", categorie: "Championnat de France Triplettes Masculin et Féminin", type: "NATIONAL", lat: ll("Douai")[0], lng: ll("Douai")[1] },
  { id: 51, date: "2026-06-27", dateFin: "2026-06-28", ville: "Ajaccio", format: "DOUBLETTE MIXTE", categorie: "Championnat de France Doublettes Mixtes", type: "NATIONAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 52, date: "2026-07-11", dateFin: "2026-07-12", ville: "Blaye-les-Mines", format: "TRIPLETTE", categorie: "Championnat de France Triplettes Jeunes", type: "NATIONAL", lat: ll("Blaye-les-Mines")[0], lng: ll("Blaye-les-Mines")[1] },
  { id: 53, date: "2026-07-18", dateFin: "2026-07-19", ville: "Nice", format: "TRIPLETTE MIXTE", categorie: "Championnat de France Triplettes Mixtes", type: "NATIONAL", lat: ll("Nice")[0], lng: ll("Nice")[1] },
  { id: 54, date: "2026-07-25", dateFin: "2026-07-26", ville: "Bergerac", format: "DOUBLETTE", categorie: "Championnat de France Doublettes Féminin + Tête à Tête Masculin", type: "NATIONAL", lat: ll("Bergerac")[0], lng: ll("Bergerac")[1] },
  { id: 55, date: "2026-08-19", dateFin: "2026-08-20", ville: "Saint-Yrieix", format: "TRIPLETTE", categorie: "Championnat de France Triplettes Vétérans + Triplettes Promotion", type: "NATIONAL", lat: ll("Saint-Yrieix")[0], lng: ll("Saint-Yrieix")[1] },
  { id: 56, date: "2026-08-29", dateFin: "2026-08-30", ville: "Saint-Florentin", format: "DOUBLETTE", categorie: "Championnat de France Doublettes Masculin + Tête à Tête Féminin", type: "NATIONAL", lat: ll("Saint-Florentin")[0], lng: ll("Saint-Florentin")[1] },

  // ══════════════ AOÛT 2026 ══════════════
  { id: 57, date: "2026-08-11", ville: "Guéret",         format: "TRIPLETTE", categorie: "Grand Prix Vétérans — Challenge Raoul PARFOURU — Concours A.B.C", heure: "9h00", info: "Boulodrome Michel OLLE — Vétérans 60 ans et +", contact: "06.70.64.68.29", arbitre: "OLLE / MARTIN", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 58, date: "2026-08-16", ville: "Dun-le-Palestel", format: "DOUBLETTE", categorie: "Grand Prix de la Ville — Trophée NINO TOLDO — Mises + 400€", heure: "14h00", info: "Basé sur 64 équipes", contact: "07.61.39.32.58", arbitre: "JOUHANNET / DEBROSSE", type: "CONCOURS", lat: ll("Dun-le-Palestel")[0], lng: ll("Dun-le-Palestel")[1] },
  { id: 59, date: "2026-08-18", ville: "Bétête",         format: "DOUBLETTE", categorie: "Mémorial Frédéric BOARETTO — Concours Vétérans (60 ans et +)", heure: "AM", info: "4 parties", contact: "06.73.01.69.32", arbitre: "BOIS", type: "CONCOURS", lat: ll("Bétête")[0], lng: ll("Bétête")[1] },
  { id: 60, date: "2026-08-22", ville: "Cheniers",       format: "DOUBLETTE", categorie: "Concours — 4 parties", heure: "AM", contact: "06.38.21.47.82", arbitre: "VAUCIEUX", type: "CONCOURS", lat: ll("Cheniers")[0], lng: ll("Cheniers")[1] },
  { id: 61, date: "2026-08-23", ville: "Boussac",        format: "TRIPLETTE", categorie: "National Jeunes", info: "Concours national", contact: "06.70.45.48.07", type: "NATIONAL", lat: ll("Boussac")[0], lng: ll("Boussac")[1] },
  { id: 62, date: "2026-08-24", ville: "Sardent",        format: "TRIPLETTE", categorie: "Trophée BEBERT", heure: "AM", contact: "06.52.70.90.43", arbitre: "GALLON", type: "CONCOURS", lat: ll("Sardent")[0], lng: ll("Sardent")[1] },
  { id: 63, date: "2026-08-30", ville: "Boussac",        format: "DOUBLETTE", categorie: "Concours Féminin", heure: "AM", contact: "06.70.45.48.07", arbitre: "BOIS", type: "CONCOURS", lat: ll("Boussac")[0], lng: ll("Boussac")[1] },

  // ══════════════ SEPTEMBRE 2026 ══════════════
  { id: 64, date: "2026-09-06", ville: "Sainte-Feyre",   format: "TRIPLETTE MIXTE", categorie: "Trophée Christiane GUINOT — Concours A.B.C", heure: "14h00", contact: "06.41.88.94.41", arbitre: "PERIGAUD", type: "CONCOURS", lat: ll("Sainte-Feyre")[0], lng: ll("Sainte-Feyre")[1] },

  // ══════════════ OCTOBRE 2026 ══════════════
  { id: 65, date: "2026-10-10", ville: "La Souterraine", format: "TRIPLETTE",  categorie: "Concours Triplette", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.02.52.61.92", arbitre: "MOULAI", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 66, date: "2026-10-14", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 67, date: "2026-10-18", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Mixte — Octobre Rose", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 68, date: "2026-10-28", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },

  // ══════════════ NOVEMBRE 2026 ══════════════
  { id: 69, date: "2026-11-01", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Mixte", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 70, date: "2026-11-04", ville: "La Souterraine", format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.02.52.61.92", arbitre: "MOULAI", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 71, date: "2026-11-08", ville: "La Souterraine", format: "TRIPLETTE",  categorie: "Concours A.B.C", heure: "AM", info: "Limité 32 équipes", contact: "06.02.52.61.92", arbitre: "MOULAI", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 72, date: "2026-11-11", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 73, date: "2026-11-15", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Mixte", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 74, date: "2026-11-21", ville: "Saint-Vaury",    format: "AUTRE",      categorie: "Assemblée Générale du Comité de la Creuse 2026", type: "SPÉCIAL", lat: ll("Saint-Vaury")[0], lng: ll("Saint-Vaury")[1] },
  { id: 75, date: "2026-11-25", ville: "La Souterraine", format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.02.52.61.92", arbitre: "MOULAI", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 76, date: "2026-11-29", ville: "La Souterraine", format: "TRIPLETTE",  categorie: "Concours Mixte", heure: "AM", info: "Limité 32 équipes", contact: "06.02.52.61.92", arbitre: "MOULAI", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },

  // ══════════════ DÉCEMBRE 2026 ══════════════
  { id: 77, date: "2026-12-02", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.02.52.61.92", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 78, date: "2026-12-06", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Mixte", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "OLLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 79, date: "2026-12-09", ville: "La Souterraine", format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.02.52.61.92", arbitre: "MOULAI", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 80, date: "2026-12-13", ville: "La Souterraine", format: "DOUBLETTE",  categorie: "Concours A.B.C", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.02.52.61.92", arbitre: "CANTHE", type: "CONCOURS", lat: ll("La Souterraine")[0], lng: ll("La Souterraine")[1] },
  { id: 81, date: "2026-12-16", ville: "Guéret",         format: "TRIPLETTE",  categorie: "Concours Vétérans (60 ans et +)", heure: "AM", info: "Limité 32 équipes, 4 parties", contact: "06.75.31.98.99", arbitre: "LAMARDELLE", type: "CONCOURS", lat: ll("Guéret")[0], lng: ll("Guéret")[1] },
  { id: 82, date: "2026-12-20", ville: "Bonnat",         format: "TRIPLETTE",  categorie: "Concours Triplette", heure: "AM", info: "4 parties", contact: "06.07.86.11.62", arbitre: "PETITJEAN", type: "CONCOURS", lat: ll("Bonnat")[0], lng: ll("Bonnat")[1] },
];
