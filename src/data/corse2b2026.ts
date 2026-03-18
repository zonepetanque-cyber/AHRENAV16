// Calendrier complet Haute-Corse (2B) - 2026
// Source : Comité Départemental de Pétanque de la Haute-Corse
// Site : https://www.petanqueilerousse.fr/partenaires/comite-departemental-haute-corse-113479
// Facebook : https://www.facebook.com/share/18UJDxozGP/
//
// Légende couleurs :
// CHPT DEPT (vert)  = Championnat Départemental
// CHPT REG (jaune)  = Championnat Régional
// REG (rose)        = Concours Régional
// DEP / DEPT        = Concours Départemental
// CDF (bleu)        = Championnat de France
// INTER (vert clair)= Tournoi International
// CDC JP (rouge)    = Compétition de clubs Jeu Provençal

export interface ConcourCorse2B {
  id: number;
  date: string;
  dateFin?: string;
  ville: string;
  club?: string;
  format: string;
  categorie: string;
  info?: string;
  lat: number;
  lng: number;
  type: "CONCOURS" | "CHAMPIONNAT" | "RÉGIONAL" | "NATIONAL" | "SPÉCIAL";
}

export const DEPT_CORSE2B = {
  nom: "Haute-Corse",
  code: "2B",
  facebook: "https://www.facebook.com/share/18UJDxozGP/",
  site: "https://www.petanqueilerousse.fr/partenaires/comite-departemental-haute-corse-113479",
};

const COORDS: Record<string, [number, number]> = {
  "Bastia":           [42.7008, 9.4503],
  "Borgo":            [42.5517, 9.4303],
  "Corte":            [42.3061, 9.1494],
  "Calvi":            [42.5686, 8.7575],
  "Ile-Rousse":       [42.6311, 8.9378],
  "Porto-Vecchio":    [41.5914, 9.2794],
  "Bonifacio":        [41.3869, 9.1594],
  "Ajaccio":          [41.9192, 8.7386],
  "Ghisonaccia":      [42.0136, 9.4039],
  "Propriano":        [41.6803, 8.9006],
  "Bastelica":        [42.0011, 9.0494],
  "Moltifao":         [42.4222, 9.0972],
  "Sartène":          [41.6244, 8.9731],
  "Prunelli":         [41.9794, 9.3503],
  // Clubs/lieux spécifiques
  "Arinella":         [42.6200, 9.4600],  // commune proche Bastia
  "Pome":             [42.3500, 9.2000],  // Haute-Corse intérieur
  "Casatorra":        [42.5800, 9.4200],
  "APL":              [41.9192, 8.7386],  // APL = Ajaccio
  "San-Martinu":      [41.9000, 9.0500],  // Olmeto region
  "Niolu":            [42.3167, 8.9667],  // Calacuccia
  "Ajaccio-Baleone":  [41.9250, 8.8028],  // aéroport region
  "Spirb":            [42.0011, 9.0494],  // Bastelica
  "Porto":            [42.2667, 8.7000],  // Porto
  "Alcudine":         [41.7256, 9.0381],
};

function ll(club: string): [number, number] {
  return COORDS[club] ?? [42.35, 9.15];
}

export const CONCOURS_CORSE2B_2026: ConcourCorse2B[] = [

  // ══════════════ FÉVRIER 2026 ══════════════
  { id: 1,  date: "2026-02-28", ville: "Ajaccio", club: "Arinella", format: "DOUBLETTE", categorie: "Concours Départemental 2x2", type: "CONCOURS", lat: ll("Arinella")[0], lng: ll("Arinella")[1] },

  // ══════════════ MARS 2026 ══════════════
  { id: 2,  date: "2026-03-01", ville: "Haute-Corse", format: "AUTRE", categorie: "CDC Jeu Provençal", type: "SPÉCIAL", lat: ll("Bastia")[0], lng: ll("Bastia")[1] },
  { id: 3,  date: "2026-03-07", dateFin: "2026-03-08", ville: "Borgo", format: "AUTRE", categorie: "CDC Jeu Provençal", type: "SPÉCIAL", lat: ll("Borgo")[0], lng: ll("Borgo")[1] },
  { id: 4,  date: "2026-03-14", ville: "Ghisonaccia", club: "Fiumorbu", format: "TRIPLETTE", categorie: "Concours Départemental 3x3", type: "CONCOURS", lat: ll("Ghisonaccia")[0], lng: ll("Ghisonaccia")[1] },
  { id: 5,  date: "2026-03-15", ville: "Calvi", format: "TRIPLETTE", categorie: "Concours Départemental 3x3", type: "CONCOURS", lat: ll("Calvi")[0], lng: ll("Calvi")[1] },
  { id: 6,  date: "2026-03-21", dateFin: "2026-03-22", ville: "Pome", format: "TRIPLETTE", categorie: "CHPT DEPT 3x3 Promotion", type: "CHAMPIONNAT", lat: ll("Pome")[0], lng: ll("Pome")[1] },
  { id: 7,  date: "2026-03-22", ville: "Pome", format: "TRIPLETTE", categorie: "Concours Départemental 3x3", type: "CONCOURS", lat: ll("Pome")[0], lng: ll("Pome")[1] },
  { id: 8,  date: "2026-03-28", dateFin: "2026-03-29", ville: "Casatorra", format: "AUTRE", categorie: "CHPT DEPT Individuel Masculin + Doublette Féminin", type: "CHAMPIONNAT", lat: ll("Casatorra")[0], lng: ll("Casatorra")[1] },
  { id: 9,  date: "2026-03-29", ville: "Casatorra", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Casatorra")[0], lng: ll("Casatorra")[1] },

  // ══════════════ AVRIL 2026 ══════════════
  { id: 10, date: "2026-04-04", dateFin: "2026-04-05", ville: "Ajaccio", club: "Arinella", format: "TRIPLETTE", categorie: "CHPT DEPT 3x3 Jeu Provençal", type: "CHAMPIONNAT", lat: ll("Arinella")[0], lng: ll("Arinella")[1] },
  { id: 11, date: "2026-04-05", ville: "Haute-Corse", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Bastia")[0], lng: ll("Bastia")[1] },
  { id: 12, date: "2026-04-06", ville: "Porto-Vecchio", club: "St Georges", format: "TRIPLETTE", categorie: "Concours Régional 3x3 — Renucci", type: "RÉGIONAL", lat: ll("Porto-Vecchio")[0], lng: ll("Porto-Vecchio")[1] },
  { id: 13, date: "2026-04-11", ville: "Ajaccio", club: "APL", format: "TRIPLETTE", categorie: "CHPT DEPT 3x3 Séniors", type: "CHAMPIONNAT", lat: ll("APL")[0], lng: ll("APL")[1] },
  { id: 14, date: "2026-04-12", ville: "Ajaccio", club: "APL", format: "TRIPLETTE", categorie: "CHPT DEPT 3x3 Féminin + Concours Départemental", type: "CHAMPIONNAT", lat: ll("APL")[0], lng: ll("APL")[1] },
  { id: 15, date: "2026-04-18", ville: "Ajaccio", club: "APL / Belle Epoque", format: "TRIPLETTE", categorie: "Concours Départemental 3x3 Filippini", type: "CONCOURS", lat: ll("APL")[0], lng: ll("APL")[1] },
  { id: 16, date: "2026-04-19", ville: "Ajaccio", club: "Prado", format: "DOUBLETTE", categorie: "CHPT DEPT 2x2 Mixte", type: "CHAMPIONNAT", lat: ll("Bastia")[0], lng: ll("Bastia")[1] },
  { id: 17, date: "2026-04-22", dateFin: "2026-04-23", ville: "Ajaccio", club: "Arinella", format: "TRIPLETTE", categorie: "CHPT DEPT 3x3 Vétérans", type: "CHAMPIONNAT", lat: ll("Arinella")[0], lng: ll("Arinella")[1] },
  { id: 18, date: "2026-04-25", ville: "Borgo", format: "DOUBLETTE", categorie: "CHPT DEPT 2x2 Séniors", type: "CHAMPIONNAT", lat: ll("Borgo")[0], lng: ll("Borgo")[1] },
  { id: 19, date: "2026-04-26", ville: "Borgo", format: "AUTRE", categorie: "CHPT DEPT 1x1 Féminin + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Borgo")[0], lng: ll("Borgo")[1] },

  // ══════════════ MAI 2026 ══════════════
  { id: 20, date: "2026-05-01", ville: "San-Martinu", format: "TRIPLETTE", categorie: "Concours Régional 3x3", type: "RÉGIONAL", lat: ll("San-Martinu")[0], lng: ll("San-Martinu")[1] },
  { id: 21, date: "2026-05-02", ville: "San-Martinu", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("San-Martinu")[0], lng: ll("San-Martinu")[1] },
  { id: 22, date: "2026-05-03", ville: "San-Martinu", format: "TRIPLETTE", categorie: "CHPT DEPT 3x3 Mixte", type: "CHAMPIONNAT", lat: ll("San-Martinu")[0], lng: ll("San-Martinu")[1] },
  { id: 23, date: "2026-05-08", ville: "Ile-Rousse", format: "TRIPLETTE", categorie: "Concours Régional 3x3", type: "RÉGIONAL", lat: ll("Ile-Rousse")[0], lng: ll("Ile-Rousse")[1] },
  { id: 24, date: "2026-05-09", dateFin: "2026-05-10", ville: "Ile-Rousse", format: "DOUBLETTE", categorie: "CHPT DEPT 2x2 Jeu Provençal", type: "CHAMPIONNAT", lat: ll("Ile-Rousse")[0], lng: ll("Ile-Rousse")[1] },
  { id: 25, date: "2026-05-10", ville: "Ile-Rousse", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Ile-Rousse")[0], lng: ll("Ile-Rousse")[1] },
  { id: 26, date: "2026-05-10", ville: "Ajaccio-Baleone", format: "TRIPLETTE", categorie: "Concours Régional 3x3 VALTOP", type: "RÉGIONAL", lat: ll("Ajaccio-Baleone")[0], lng: ll("Ajaccio-Baleone")[1] },
  { id: 27, date: "2026-05-14", ville: "Haute-Corse", format: "TRIPLETTE", categorie: "CHPT REG 3x3 Masc et Fém + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Bastia")[0], lng: ll("Bastia")[1] },
  { id: 28, date: "2026-05-15", ville: "Haute-Corse", format: "TRIPLETTE", categorie: "CHPT REG 3x3 Vétérans + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Bastia")[0], lng: ll("Bastia")[1] },
  { id: 29, date: "2026-05-16", ville: "Ajaccio", club: "Arinella / APL", format: "AUTRE", categorie: "CHPT REG 2x2 Mixte + CHPT REG 3x3 Jeunes", type: "CHAMPIONNAT", lat: ll("Arinella")[0], lng: ll("Arinella")[1] },
  { id: 30, date: "2026-05-17", ville: "Borgo", format: "TRIPLETTE", categorie: "CHPT REG 3x3 Mixte + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Borgo")[0], lng: ll("Borgo")[1] },
  { id: 31, date: "2026-05-23", ville: "Corte", format: "TRIPLETTE", categorie: "CHPT REG 3x3 Promotion + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Corte")[0], lng: ll("Corte")[1] },
  { id: 32, date: "2026-05-24", ville: "Corte", format: "AUTRE", categorie: "CHPT REG 2x2/1x1 Dou Masc / Ind Fém + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Corte")[0], lng: ll("Corte")[1] },
  { id: 33, date: "2026-05-25", ville: "Corte", format: "AUTRE", categorie: "CHPT REG 1x1/2x2 Ind Masc / Dou Fém + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Corte")[0], lng: ll("Corte")[1] },
  { id: 34, date: "2026-05-30", ville: "Haute-Corse", format: "TRIPLETTE", categorie: "CHPT REG 3x3 Jeu Provençal + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Bastia")[0], lng: ll("Bastia")[1] },
  { id: 35, date: "2026-05-31", ville: "Porto-Vecchio", format: "TRIPLETTE", categorie: "Concours Régional 3x3 G. Cesari + Concours Départemental", type: "RÉGIONAL", lat: ll("Porto-Vecchio")[0], lng: ll("Porto-Vecchio")[1] },

  // ══════════════ JUIN 2026 ══════════════
  { id: 36, date: "2026-06-06", ville: "Haute-Corse", format: "DOUBLETTE", categorie: "CHPT REG 2x2 Jeu Provençal + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Bastia")[0], lng: ll("Bastia")[1] },
  { id: 37, date: "2026-06-07", ville: "Propriano", format: "TRIPLETTE", categorie: "Concours Régional 3x3 Peretti", type: "RÉGIONAL", lat: ll("Propriano")[0], lng: ll("Propriano")[1] },
  { id: 38, date: "2026-06-07", ville: "Pome", format: "TRIPLETTE", categorie: "Concours Départemental 3x3 Santolini", type: "CONCOURS", lat: ll("Pome")[0], lng: ll("Pome")[1] },
  { id: 39, date: "2026-06-12", ville: "Ajaccio", club: "Arinella", format: "DOUBLETTE", categorie: "Concours Départemental 2x2 Mixte Agostini Bri", type: "CONCOURS", lat: ll("Arinella")[0], lng: ll("Arinella")[1] },
  { id: 40, date: "2026-06-13", dateFin: "2026-06-14", ville: "Ajaccio", club: "Amitié AJA", format: "TRIPLETTE", categorie: "Concours Régional 3x3 Colombani", type: "RÉGIONAL", lat: ll("Bastia")[0], lng: ll("Bastia")[1] },
  { id: 41, date: "2026-06-14", ville: "Niolu", format: "DOUBLETTE", categorie: "Concours Départemental 2x2", type: "CONCOURS", lat: ll("Niolu")[0], lng: ll("Niolu")[1] },
  { id: 42, date: "2026-06-20", dateFin: "2026-06-21", ville: "Casatorra", format: "TRIPLETTE", categorie: "Concours Régional 3x3 GP des Commerçants", type: "RÉGIONAL", lat: ll("Casatorra")[0], lng: ll("Casatorra")[1] },
  { id: 43, date: "2026-06-27", dateFin: "2026-06-28", ville: "Ajaccio", format: "DOUBLETTE", categorie: "Championnat de France CDF 2x2 Mixte", type: "NATIONAL", lat: ll("APL")[0], lng: ll("APL")[1] },

  // ══════════════ JUILLET 2026 ══════════════
  { id: 44, date: "2026-07-04", dateFin: "2026-07-05", ville: "Ghisonaccia", club: "Fiumorbu", format: "TRIPLETTE", categorie: "Concours Régional 3x3", type: "RÉGIONAL", lat: ll("Ghisonaccia")[0], lng: ll("Ghisonaccia")[1] },
  { id: 45, date: "2026-07-11", dateFin: "2026-07-13", ville: "Bastia", club: "Stade", format: "AUTRE", categorie: "Concours Régional 3x3", type: "RÉGIONAL", lat: ll("Bastia")[0], lng: ll("Bastia")[1] },
  { id: 46, date: "2026-07-14", ville: "Bastia", club: "Stade", format: "TRIPLETTE", categorie: "Concours Régional 3x3 Vanucci + Concours Départemental", type: "RÉGIONAL", lat: ll("Bastia")[0], lng: ll("Bastia")[1] },
  { id: 47, date: "2026-07-18", ville: "Alcudine", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Alcudine")[0], lng: ll("Alcudine")[1] },
  { id: 48, date: "2026-07-19", ville: "Alcudine", format: "TRIPLETTE", categorie: "Concours Régional 3x3", type: "RÉGIONAL", lat: ll("Alcudine")[0], lng: ll("Alcudine")[1] },
  { id: 49, date: "2026-07-25", dateFin: "2026-07-26", ville: "Porto-Vecchio", format: "TRIPLETTE", categorie: "Concours Régional 3x3 Biancarelli", type: "RÉGIONAL", lat: ll("Porto-Vecchio")[0], lng: ll("Porto-Vecchio")[1] },
  { id: 50, date: "2026-07-26", ville: "Borgo", format: "TRIPLETTE", categorie: "Concours Départemental 3x3 Passoni", type: "CONCOURS", lat: ll("Borgo")[0], lng: ll("Borgo")[1] },

  // ══════════════ AOÛT 2026 ══════════════
  { id: 51, date: "2026-08-22", dateFin: "2026-08-23", ville: "Ajaccio", club: "Prado", format: "TRIPLETTE", categorie: "Tournoi International 3x3", type: "SPÉCIAL", lat: ll("Bastia")[0], lng: ll("Bastia")[1] },
  { id: 52, date: "2026-08-28", ville: "Haute-Corse", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Bastia")[0], lng: ll("Bastia")[1] },
  { id: 53, date: "2026-08-29", dateFin: "2026-08-30", ville: "Sartène", format: "TRIPLETTE", categorie: "Concours Régional 3x3", type: "RÉGIONAL", lat: ll("Sartène")[0], lng: ll("Sartène")[1] },

  // ══════════════ SEPTEMBRE 2026 ══════════════
  { id: 54, date: "2026-09-04", ville: "Moltifao", format: "DOUBLETTE", categorie: "Concours Départemental 2x2 Vétérans", type: "CONCOURS", lat: ll("Moltifao")[0], lng: ll("Moltifao")[1] },
  { id: 55, date: "2026-09-05", dateFin: "2026-09-06", ville: "Moltifao", format: "AUTRE", categorie: "Concours Régional Jeunes / 3x3 M. Griffoni", type: "RÉGIONAL", lat: ll("Moltifao")[0], lng: ll("Moltifao")[1] },
  { id: 56, date: "2026-09-12", ville: "Calvi", format: "DOUBLETTE", categorie: "Concours 2x2 Jeunes", type: "CONCOURS", lat: ll("Calvi")[0], lng: ll("Calvi")[1] },
  { id: 57, date: "2026-09-13", ville: "Calvi", format: "TRIPLETTE", categorie: "Concours Régional 3x3 Notre Dame de la Serra", type: "RÉGIONAL", lat: ll("Calvi")[0], lng: ll("Calvi")[1] },
  { id: 58, date: "2026-09-19", dateFin: "2026-09-20", ville: "Bastelica", club: "Spirb", format: "TRIPLETTE", categorie: "Tournoi International 3x3 Pascal Paoli", type: "SPÉCIAL", lat: ll("Spirb")[0], lng: ll("Spirb")[1] },
  { id: 59, date: "2026-09-26", dateFin: "2026-09-27", ville: "Porto", format: "TRIPLETTE", categorie: "Tournoi International 3x3", type: "SPÉCIAL", lat: ll("Porto")[0], lng: ll("Porto")[1] },

  // ══════════════ OCTOBRE 2026 ══════════════
  { id: 60, date: "2026-10-03", ville: "Bonifacio", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Bonifacio")[0], lng: ll("Bonifacio")[1] },
  { id: 61, date: "2026-10-04", ville: "Bonifacio", format: "TRIPLETTE", categorie: "Concours Régional 3x3", type: "RÉGIONAL", lat: ll("Bonifacio")[0], lng: ll("Bonifacio")[1] },
  { id: 62, date: "2026-10-04", ville: "Casatorra", format: "DOUBLETTE", categorie: "Concours Départemental 2x2", type: "CONCOURS", lat: ll("Casatorra")[0], lng: ll("Casatorra")[1] },
  { id: 63, date: "2026-10-09", ville: "Borgo", format: "TRIPLETTE", categorie: "Concours Départemental 3x3 Vétéran", type: "CONCOURS", lat: ll("Borgo")[0], lng: ll("Borgo")[1] },
  { id: 64, date: "2026-10-10", ville: "Borgo", format: "TRIPLETTE", categorie: "Concours Régional 3x3 P. Natali", type: "RÉGIONAL", lat: ll("Borgo")[0], lng: ll("Borgo")[1] },
  { id: 65, date: "2026-10-11", ville: "Borgo", format: "TRIPLETTE", categorie: "Concours Régional 3x3 + Concours Départemental", type: "RÉGIONAL", lat: ll("Borgo")[0], lng: ll("Borgo")[1] },

  // ══════════════ NOVEMBRE 2026 ══════════════
  { id: 66, date: "2026-11-06", ville: "Borgo", format: "AUTRE", categorie: "Concours Départemental Vétéran", type: "CONCOURS", lat: ll("Borgo")[0], lng: ll("Borgo")[1] },
  { id: 67, date: "2026-11-07", dateFin: "2026-11-08", ville: "Borgo", format: "TRIPLETTE", categorie: "Concours Régional 3x3 Morachini + Concours Départemental", type: "RÉGIONAL", lat: ll("Borgo")[0], lng: ll("Borgo")[1] },
];
