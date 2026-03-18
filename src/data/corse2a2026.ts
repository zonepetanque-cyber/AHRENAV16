// Calendrier complet Corse-du-Sud (2A) - 2026
// Source : Comité Départemental de Pétanque de la Corse-du-Sud
// Site : https://www.petanque2a.net/
// Facebook : https://www.facebook.com/share/1CSiw6nkwd/
//
// Légende couleurs du calendrier original :
// CD (jaune)       = Championnat Départemental
// CR (cyan)        = Championnat Régional
// CDF (rouge)      = Championnat de France
// Départemental    = Concours départemental
// Régional (rose)  = Concours régional
// International    = Concours International
// CDC/CRC/CNC      = Compétitions de clubs

export interface ConcourCorse2A {
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

export const DEPT_CORSE2A = {
  nom: "Corse-du-Sud",
  code: "2A",
  facebook: "https://www.facebook.com/share/1CSiw6nkwd/",
  site: "https://www.petanque2a.net/",
};

// Clubs et leur localisation en Corse-du-Sud
// ASP = Association Sportive de Pietrosella (région Ajaccio)
// BOS = Boulodrome de l'Oriu Sportif (Ajaccio)
// Machja = club Ajaccio
// Amitié Valinco = Propriano / Golfe de Valinco
// Stade = Ajaccio
// Stade Pianottoli = Pianottoli-Caldarello
// St Georges = Porto-Vecchio
// Falaises = Bonifacio
// Zinsali = région Ajaccio
// Pughjalesa = Prunelli-di-Fiumorbu
// Valinco = Propriano
// San Martinu = Olmeto
// Spirb = région Bastelica
// Amitié = Ajaccio
// Pianottoli = Pianottoli-Caldarello
// Casatorra = Corse-du-Sud (lieu-dit)
// Ajaccio = Ajaccio
// Fium'Orbu = Ghisonaccia (région)
// Alcudina = Serra-di-Scopamène
// Prado = Ajaccio (quartier)
// APL = Ajaccio
// Calvaise = Sartène
// Borgo = Borgo (2B - compétitions inter-régionales)
// Poggiale = Petreto-Bicchisano

const COORDS: Record<string, [number, number]> = {
  "Ajaccio":                  [41.9192, 8.7386],
  "Propriano":                [41.6803, 8.9006],
  "Porto-Vecchio":            [41.5914, 9.2794],
  "Bonifacio":                [41.3869, 9.1594],
  "Pianottoli-Caldarello":    [41.4936, 9.0636],
  "Sartène":                  [41.6244, 8.9731],
  "Olmeto":                   [41.7097, 8.9000],
  "Ghisonaccia":              [42.0136, 9.4039],
  "Serra-di-Scopamène":       [41.7256, 9.0381],
  "Petreto-Bicchisano":       [41.7681, 8.9681],
  "Bastelica":                [42.0011, 9.0494],
  "Prunelli-di-Fiumorbu":     [41.9794, 9.3503],
  "Borgo":                    [42.5517, 9.4303],
  "Zerubia":                  [41.8667, 9.1333],
};

function ll(ville: string): [number, number] {
  return COORDS[ville] ?? [41.92, 8.74];
}

export const CONCOURS_CORSE2A_2026: ConcourCorse2A[] = [

  // ══════════════ FÉVRIER 2026 ══════════════
  { id: 1,  date: "2026-02-07", ville: "Ajaccio", club: "ASP", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 2,  date: "2026-02-08", ville: "Ajaccio", club: "Barake / BOS", format: "AUTRE", categorie: "Concours Départemental + Départemental 2x2", type: "CONCOURS", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 3,  date: "2026-02-14", ville: "Ajaccio", club: "Machja", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 4,  date: "2026-02-15", ville: "Propriano", club: "Amitié Valinco", format: "AUTRE", categorie: "Concours Départemental + Départemental 2x2", type: "CONCOURS", lat: ll("Propriano")[0], lng: ll("Propriano")[1] },
  { id: 5,  date: "2026-02-21", ville: "Ajaccio", club: "ASP", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 6,  date: "2026-02-22", ville: "Ajaccio", club: "ASP", format: "DOUBLETTE", categorie: "CD 2x2 Promotion", type: "CHAMPIONNAT", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 7,  date: "2026-02-28", ville: "Ajaccio", club: "Stade", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },

  // ══════════════ MARS 2026 ══════════════
  { id: 8,  date: "2026-03-01", ville: "Ajaccio", club: "Stade Pianottoli", format: "AUTRE", categorie: "Concours Départemental + Départemental 2x2", type: "CONCOURS", lat: ll("Pianottoli-Caldarello")[0], lng: ll("Pianottoli-Caldarello")[1] },
  { id: 9,  date: "2026-03-07", ville: "Porto-Vecchio", club: "St Georges", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Porto-Vecchio")[0], lng: ll("Porto-Vecchio")[1] },
  { id: 10, date: "2026-03-07", ville: "Bonifacio", club: "Falaises", format: "TRIPLETTE", categorie: "Concours Départemental 3x3", type: "CONCOURS", lat: ll("Bonifacio")[0], lng: ll("Bonifacio")[1] },
  { id: 11, date: "2026-03-08", ville: "Ajaccio", club: "Barake", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 12, date: "2026-03-08", ville: "Ajaccio", club: "Zinsali", format: "DOUBLETTE", categorie: "CD 2x2 Vétéran", type: "CHAMPIONNAT", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 13, date: "2026-03-14", ville: "Ajaccio", club: "Stade", format: "AUTRE", categorie: "CD 1x1 Vétéran", type: "CHAMPIONNAT", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 14, date: "2026-03-15", ville: "Pianottoli-Caldarello", club: "Stade Pianottoli", format: "AUTRE", categorie: "Concours Départemental + CD 1x1 Promotion", type: "CONCOURS", lat: ll("Pianottoli-Caldarello")[0], lng: ll("Pianottoli-Caldarello")[1] },
  { id: 15, date: "2026-03-21", ville: "Bonifacio", club: "Falaises", format: "TRIPLETTE", categorie: "CD 3x3 Promotion", type: "CHAMPIONNAT", lat: ll("Bonifacio")[0], lng: ll("Bonifacio")[1] },
  { id: 16, date: "2026-03-22", ville: "Bonifacio", club: "Falaises / Amitié", format: "TRIPLETTE", categorie: "CD 3x3 Promotion + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Bonifacio")[0], lng: ll("Bonifacio")[1] },
  { id: 17, date: "2026-03-28", ville: "Ajaccio", club: "ASP", format: "AUTRE", categorie: "CD 1x1 Masculin", type: "CHAMPIONNAT", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 18, date: "2026-03-29", ville: "Ajaccio", club: "ASP / Pughjalesa", format: "AUTRE", categorie: "CD 1x1 M / 2x2 F + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },

  // ══════════════ AVRIL 2026 ══════════════
  { id: 19, date: "2026-04-04", ville: "Ajaccio", club: "ASP", format: "TRIPLETTE", categorie: "CD 3x3 Jeu Provençal", type: "CHAMPIONNAT", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 20, date: "2026-04-05", ville: "Ajaccio", club: "ASP", format: "TRIPLETTE", categorie: "CD 3x3 Jeu Provençal + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 21, date: "2026-04-06", ville: "Porto-Vecchio", club: "St Georges", format: "AUTRE", categorie: "Régional Paul Renucci", type: "RÉGIONAL", lat: ll("Porto-Vecchio")[0], lng: ll("Porto-Vecchio")[1] },
  { id: 22, date: "2026-04-11", ville: "Propriano", club: "Valinco", format: "TRIPLETTE", categorie: "CD 3x3 Masculin", type: "CHAMPIONNAT", lat: ll("Propriano")[0], lng: ll("Propriano")[1] },
  { id: 23, date: "2026-04-12", ville: "Propriano", club: "Valinco / Amitié", format: "TRIPLETTE", categorie: "CD 3x3 M / 3x3 F + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Propriano")[0], lng: ll("Propriano")[1] },
  { id: 24, date: "2026-04-18", ville: "Propriano", club: "Valinco", format: "DOUBLETTE", categorie: "CD 2x2 Mixte", type: "CHAMPIONNAT", lat: ll("Propriano")[0], lng: ll("Propriano")[1] },
  { id: 25, date: "2026-04-19", ville: "Propriano", club: "Valinco / ASP", format: "DOUBLETTE", categorie: "CD 2x2 Mixte + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Propriano")[0], lng: ll("Propriano")[1] },
  { id: 26, date: "2026-04-22", ville: "Propriano", club: "Valinco", format: "TRIPLETTE", categorie: "CD 3x3 Vétéran", type: "CHAMPIONNAT", lat: ll("Propriano")[0], lng: ll("Propriano")[1] },
  { id: 27, date: "2026-04-23", ville: "Propriano", club: "Valinco", format: "TRIPLETTE", categorie: "CD 3x3 Vétéran", type: "CHAMPIONNAT", lat: ll("Propriano")[0], lng: ll("Propriano")[1] },
  { id: 28, date: "2026-04-25", ville: "Propriano", club: "Valinco", format: "DOUBLETTE", categorie: "CD 2x2 Homme", type: "CHAMPIONNAT", lat: ll("Propriano")[0], lng: ll("Propriano")[1] },
  { id: 29, date: "2026-04-26", ville: "Propriano", club: "Valinco / ASP", format: "DOUBLETTE", categorie: "CD 2x2 H / 1x1 F + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Propriano")[0], lng: ll("Propriano")[1] },

  // ══════════════ MAI 2026 ══════════════
  { id: 30, date: "2026-05-01", ville: "Olmeto", club: "San Martinu / Stade", format: "TRIPLETTE", categorie: "Concours Régional 3x3 + Concours Départemental", type: "RÉGIONAL", lat: ll("Olmeto")[0], lng: ll("Olmeto")[1] },
  { id: 31, date: "2026-05-02", ville: "Porto-Vecchio", club: "St Georges", format: "TRIPLETTE", categorie: "CD 3x3 Mixte", type: "CHAMPIONNAT", lat: ll("Porto-Vecchio")[0], lng: ll("Porto-Vecchio")[1] },
  { id: 32, date: "2026-05-03", ville: "Porto-Vecchio", club: "St Georges", format: "TRIPLETTE", categorie: "CD 3x3 Mixte + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Porto-Vecchio")[0], lng: ll("Porto-Vecchio")[1] },
  { id: 33, date: "2026-05-08", ville: "Bastelica", club: "Spirb", format: "TRIPLETTE", categorie: "Concours Régional 3x3", type: "RÉGIONAL", lat: ll("Bastelica")[0], lng: ll("Bastelica")[1] },
  { id: 34, date: "2026-05-09", ville: "Ajaccio", club: "Amitié", format: "DOUBLETTE", categorie: "CD 2x2 Jeu Provençal", type: "CHAMPIONNAT", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 35, date: "2026-05-10", ville: "Ajaccio", club: "Amitié / Pianottoli", format: "DOUBLETTE", categorie: "CD 2x2 JP + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 36, date: "2026-05-14", ville: "Ajaccio", club: "ASP", format: "TRIPLETTE", categorie: "CR 3x3 H / 3x3 F", type: "CHAMPIONNAT", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 37, date: "2026-05-15", ville: "Ajaccio", club: "Amitié", format: "TRIPLETTE", categorie: "CR 3x3 Vétéran", type: "CHAMPIONNAT", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 38, date: "2026-05-16", ville: "Porto-Vecchio", club: "St Georges", format: "DOUBLETTE", categorie: "CR 2x2 Mixte", type: "CHAMPIONNAT", lat: ll("Porto-Vecchio")[0], lng: ll("Porto-Vecchio")[1] },
  { id: 39, date: "2026-05-17", ville: "Ajaccio", club: "Amitié / Pughjalesa", format: "TRIPLETTE", categorie: "CR 3x3 Mixte + Concours Départemental 3x3", type: "CHAMPIONNAT", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 40, date: "2026-05-23", ville: "Prunelli-di-Fiumorbu", club: "2B / Amitié", format: "TRIPLETTE", categorie: "CR 3x3 Promotion + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Prunelli-di-Fiumorbu")[0], lng: ll("Prunelli-di-Fiumorbu")[1] },
  { id: 41, date: "2026-05-24", ville: "Prunelli-di-Fiumorbu", club: "2B / Amitié", format: "DOUBLETTE", categorie: "CR 2x2 H / 1x1 F + Concours Départemental", type: "CHAMPIONNAT", lat: ll("Prunelli-di-Fiumorbu")[0], lng: ll("Prunelli-di-Fiumorbu")[1] },
  { id: 42, date: "2026-05-25", ville: "Prunelli-di-Fiumorbu", club: "2B / Amitié", format: "AUTRE", categorie: "CR 1x1 H / 2x2 F + Régional VALTOP", type: "CHAMPIONNAT", lat: ll("Prunelli-di-Fiumorbu")[0], lng: ll("Prunelli-di-Fiumorbu")[1] },
  { id: 43, date: "2026-05-30", ville: "Ajaccio", club: "2B / ASP / Zinsali", format: "TRIPLETTE", categorie: "CR 3x3 JP + Concours Départemental 2x2", type: "CHAMPIONNAT", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 44, date: "2026-05-31", ville: "Ajaccio", club: "2B / Zinsali", format: "TRIPLETTE", categorie: "CR 3x3 JP + Régional G.CESARI", type: "RÉGIONAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },

  // ══════════════ JUIN 2026 ══════════════
  { id: 45, date: "2026-06-06", ville: "Propriano", club: "2B / Valinco", format: "DOUBLETTE", categorie: "CR 2x2 JP + Régional 2x2", type: "RÉGIONAL", lat: ll("Propriano")[0], lng: ll("Propriano")[1] },
  { id: 46, date: "2026-06-07", ville: "Propriano", club: "2B / Valinco", format: "DOUBLETTE", categorie: "CR 2x2 JP + Régional PERETTI", type: "RÉGIONAL", lat: ll("Propriano")[0], lng: ll("Propriano")[1] },
  { id: 47, date: "2026-06-13", dateFin: "2026-06-14", ville: "Ajaccio", club: "Amitié", format: "TRIPLETTE", categorie: "Régional COLOMBANI", type: "RÉGIONAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 48, date: "2026-06-20", dateFin: "2026-06-21", ville: "Ajaccio", club: "Casatorra", format: "TRIPLETTE", categorie: "Concours Régional 3x3", type: "RÉGIONAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 49, date: "2026-06-27", dateFin: "2026-06-28", ville: "Ajaccio", format: "DOUBLETTE", categorie: "Championnat de France 2x2 Mixte — CDF 2x2 Mixte", type: "NATIONAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },

  // ══════════════ JUILLET 2026 ══════════════
  { id: 50, date: "2026-07-04", dateFin: "2026-07-05", ville: "Ghisonaccia", club: "Fium'Orbu", format: "TRIPLETTE", categorie: "Concours Régional 3x3", type: "RÉGIONAL", lat: ll("Ghisonaccia")[0], lng: ll("Ghisonaccia")[1] },
  { id: 51, date: "2026-07-11", dateFin: "2026-07-12", ville: "Ajaccio", club: "Stade", format: "DOUBLETTE", categorie: "Concours Régional Panunzi 2x2", type: "RÉGIONAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 52, date: "2026-07-14", ville: "Ajaccio", club: "Stade", format: "TRIPLETTE", categorie: "Concours Régional Vanucci 3x3", type: "RÉGIONAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 53, date: "2026-07-15", ville: "Ajaccio", club: "Stade", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 54, date: "2026-07-18", ville: "Serra-di-Scopamène", club: "Alcudina", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Serra-di-Scopamène")[0], lng: ll("Serra-di-Scopamène")[1] },
  { id: 55, date: "2026-07-19", ville: "Serra-di-Scopamène", club: "Alcudina", format: "TRIPLETTE", categorie: "Concours Régional 3x3", type: "RÉGIONAL", lat: ll("Serra-di-Scopamène")[0], lng: ll("Serra-di-Scopamène")[1] },
  { id: 56, date: "2026-07-25", ville: "Ajaccio", club: "Zinsali", format: "AUTRE", categorie: "Concours Régional", type: "RÉGIONAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 57, date: "2026-07-26", ville: "Ajaccio", club: "Zinsali", format: "TRIPLETTE", categorie: "Concours Régional Biancarelli", type: "RÉGIONAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },

  // ══════════════ AOÛT 2026 ══════════════
  { id: 58, date: "2026-08-01", ville: "Propriano", club: "Valinco", format: "TRIPLETTE", categorie: "Concours Régional Boschetti", type: "RÉGIONAL", lat: ll("Propriano")[0], lng: ll("Propriano")[1] },
  { id: 59, date: "2026-08-09", ville: "Bonifacio", club: "Falaises", format: "TRIPLETTE", categorie: "Concours Départemental 3x3 + Zerubia", type: "CONCOURS", lat: ll("Bonifacio")[0], lng: ll("Bonifacio")[1] },
  { id: 60, date: "2026-08-16", ville: "Petreto-Bicchisano", club: "Poggiale", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Petreto-Bicchisano")[0], lng: ll("Petreto-Bicchisano")[1] },
  { id: 61, date: "2026-08-22", dateFin: "2026-08-23", ville: "Ajaccio", club: "Prado", format: "AUTRE", categorie: "Tournoi International LAMPERTI", type: "SPÉCIAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 62, date: "2026-08-29", ville: "Ajaccio", club: "BOS", format: "AUTRE", categorie: "Concours Féminin / Jeunes", type: "CONCOURS", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 63, date: "2026-08-30", ville: "Ajaccio", club: "BOS", format: "TRIPLETTE", categorie: "Concours Régional 3x3", type: "RÉGIONAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },

  // ══════════════ SEPTEMBRE 2026 ══════════════
  { id: 64, date: "2026-09-05", ville: "Ajaccio", club: "APL / Alcudina", format: "AUTRE", categorie: "Concours Jeunes / Féminin + Concours Départemental", type: "CONCOURS", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 65, date: "2026-09-06", ville: "Ajaccio", club: "APL / Machja / Alcudina", format: "TRIPLETTE", categorie: "Régional GRIFFONI + Concours Départemental", type: "RÉGIONAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 66, date: "2026-09-12", ville: "Sartène", club: "Calvaise / Stade", format: "TRIPLETTE", categorie: "Concours Régional 3x3 + Concours Départemental", type: "RÉGIONAL", lat: ll("Sartène")[0], lng: ll("Sartène")[1] },
  { id: 67, date: "2026-09-13", ville: "Sartène", club: "Calvaise / Stade / Pianottoli", format: "TRIPLETTE", categorie: "Concours Régional 3x3 + Concours Départemental", type: "RÉGIONAL", lat: ll("Sartène")[0], lng: ll("Sartène")[1] },
  { id: 68, date: "2026-09-19", dateFin: "2026-09-20", ville: "Bastelica", club: "Spirb", format: "AUTRE", categorie: "Tournoi International Pascal PAOLI", type: "SPÉCIAL", lat: ll("Bastelica")[0], lng: ll("Bastelica")[1] },
  { id: 69, date: "2026-09-23", dateFin: "2026-09-24", ville: "Ajaccio", club: "ASP", format: "TRIPLETTE", categorie: "Concours Régional Vétéran", type: "RÉGIONAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 70, date: "2026-09-26", dateFin: "2026-09-27", ville: "Ajaccio", club: "ASP", format: "AUTRE", categorie: "Tournoi International A Purtulese", type: "SPÉCIAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },

  // ══════════════ OCTOBRE 2026 ══════════════
  { id: 71, date: "2026-10-10", ville: "Borgo", club: "Borgo / ASP", format: "TRIPLETTE", categorie: "Concours Régional 3x3 + Concours Départemental", type: "RÉGIONAL", lat: ll("Borgo")[0], lng: ll("Borgo")[1] },
  { id: 72, date: "2026-10-11", ville: "Borgo", club: "Borgo / ASP / BOS", format: "TRIPLETTE", categorie: "Concours Régional 3x3 + Concours Départemental", type: "RÉGIONAL", lat: ll("Borgo")[0], lng: ll("Borgo")[1] },
  { id: 73, date: "2026-10-24", ville: "Bonifacio", club: "Falaises", format: "AUTRE", categorie: "Concours Départemental", type: "CONCOURS", lat: ll("Bonifacio")[0], lng: ll("Bonifacio")[1] },
  { id: 74, date: "2026-10-25", ville: "Bonifacio", club: "Falaises", format: "TRIPLETTE", categorie: "Concours Régional Sparlotu", type: "RÉGIONAL", lat: ll("Bonifacio")[0], lng: ll("Bonifacio")[1] },

  // ══════════════ NOVEMBRE 2026 ══════════════
  { id: 75, date: "2026-11-07", dateFin: "2026-11-08", ville: "Borgo", club: "Borgo", format: "TRIPLETTE", categorie: "Concours Régional 3x3", type: "RÉGIONAL", lat: ll("Borgo")[0], lng: ll("Borgo")[1] },
  { id: 76, date: "2026-11-15", ville: "Ajaccio", club: "Zinsali", format: "TRIPLETTE", categorie: "Concours Départemental 3x3 Mixte", type: "CONCOURS", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
  { id: 77, date: "2026-11-22", ville: "Corse-du-Sud", format: "AUTRE", categorie: "Finale Coupe de Corse", type: "SPÉCIAL", lat: ll("Ajaccio")[0], lng: ll("Ajaccio")[1] },
];
