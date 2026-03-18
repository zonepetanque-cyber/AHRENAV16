// Calendrier complet des concours du département Cher (18) - 2026-2027
// Source : Comité Départemental Pétanque et Jeu Provençal du Cher
// Site : https://www.comiteducherdepetanque-jeuprovencal.com/
// Facebook : https://www.facebook.com/share/1E6UA45pfi/

export interface ConcourCher {
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

export const DEPT_CHER = {
  nom: "Cher",
  code: "18",
  facebook: "https://www.facebook.com/share/1E6UA45pfi/",
  site: "https://www.comiteducherdepetanque-jeuprovencal.com/",
};

const COORDS: Record<string, [number, number]> = {
  "Saint-Florent-sur-Cher": [46.9994, 2.2567],
  "Pigny": [47.1289, 2.3856],
  "Vierzon": [47.2222, 2.0689],
  "Moulon": [47.1333, 2.0167],
  "Bois-d'Yevre": [47.0833, 2.3667],
  "La Chapelle-Saint-Ursin": [47.0408, 2.3369],
  "BACB": [47.0833, 2.3500],
  "Saint-Amand-Montrond": [46.7233, 2.5044],
  "Pigny-Esprit2": [47.1289, 2.3856],
  "Marseilles-lès-Aubigny": [47.0861, 2.8197],
  "Bruère-Allichamps": [46.6797, 2.4875],
  "Villabon": [47.0667, 2.4333],
  "Saint-Doulchard": [47.1022, 2.3619],
  "Chateauneuf-sur-Cher": [46.8597, 2.3233],
  "Charost": [47.0044, 2.1142],
  "Orval": [46.7317, 2.4833],
  "Herry": [47.1578, 2.9339],
  "Jouet-sur-l'Aubois": [47.0833, 2.9167],
  "Cerbois": [47.0167, 2.1833],
  "Torteron": [46.8833, 2.8000],
  "Saint-Germain-du-Puy": [47.0778, 2.4339],
  "Culan": [46.5397, 2.3364],
  "La Guerche-sur-l'Aubois": [46.9578, 2.9469],
  "Aubigny-sur-Nère": [47.4853, 2.4400],
  "Beffes": [47.0167, 2.8667],
  "Meillant": [46.7408, 2.4644],
  "Chateaumeillant": [46.5653, 2.3944],
  "Trouy": [47.0378, 2.3808],
  "Sancoins": [46.8278, 2.9219],
  "Argent-sur-Sauldre": [47.5583, 2.4483],
  "Nohant-Vic": [46.6183, 1.9878],
  "Marmagne": [46.9983, 2.3869],
  "Graçay": [47.1417, 1.8492],
  "Levet": [46.9269, 2.3897],
  "Vallenay": [46.7608, 2.4053],
  "Charly": [47.0167, 2.0833],
  "Lignieres": [46.7583, 2.1739],
  "Avord": [47.0433, 2.6403],
  "Plaimpied-Givaudins": [47.0197, 2.3542],
  "Charost": [47.0044, 2.1142],
  "Clemont": [47.3833, 2.4667],
  "Preuilly": [47.2333, 2.1500],
  "Genouilly": [46.9167, 2.1167],
  "La Chapelle-d'Angillon": [47.3611, 2.4381],
  "Saint-Florent-sur-Cher-SF": [46.9994, 2.2567],
  "Bourges": [47.0833, 2.3997],
  "Chateauroux": [46.8139, 1.6906],
  "Petanque-Berruyere": [47.0833, 2.3500],
};

function ll(ville: string): [number, number] {
  return COORDS[ville] ?? [47.08, 2.40];
}

export const CONCOURS_CHER_2026: ConcourCher[] = [

  // ══════════════ JANVIER 2026 ══════════════
  { id: 1,  date: "2026-01-17", dateFin: "2026-01-18", ville: "Saint-Florent-sur-Cher", lieu: "Esprit 2", format: "DOUBLETTE", categorie: "Coupe de France Provençal", heure: "8h00", type: "SPÉCIAL", lat: ll("Saint-Florent-sur-Cher")[0], lng: ll("Saint-Florent-sur-Cher")[1] },
  { id: 2,  date: "2026-01-24", ville: "Pigny", lieu: "Esprit 2", format: "DOUBLETTE", categorie: "Doublette — Chal FOXY", heure: "14h00", type: "CONCOURS", lat: ll("Pigny")[0], lng: ll("Pigny")[1] },
  { id: 3,  date: "2026-01-31", dateFin: "2026-02-01", ville: "Cher (18)", format: "AUTRE", categorie: "Coupe de France des Clubs — 32è & 16è puis 8è", heure: "8h00", type: "SPÉCIAL", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },

  // ══════════════ FÉVRIER 2026 ══════════════
  { id: 4,  date: "2026-02-04", ville: "Vierzon", lieu: "CB Vierzon — Hall expo", format: "TRIPLETTE", categorie: "Triplette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Vierzon")[0], lng: ll("Vierzon")[1] },
  { id: 5,  date: "2026-02-07", ville: "Moulon", lieu: "Esprit 2", format: "TRIPLETTE", categorie: "Triplette Mixte (2H+1F) — Chal TORRES", heure: "9h00", type: "CONCOURS", lat: ll("Moulon")[0], lng: ll("Moulon")[1] },
  { id: 6,  date: "2026-02-14", ville: "Vierzon", lieu: "CB Vierzon — Hall expo", format: "TRIPLETTE", categorie: "Triplette", heure: "14h00", type: "CONCOURS", lat: ll("Vierzon")[0], lng: ll("Vierzon")[1] },
  { id: 7,  date: "2026-02-20", ville: "Bois-d'Yevre", lieu: "Hall expo", format: "TRIPLETTE", categorie: "Triplette Vétéran 60+ — 1er Régional", heure: "8h30", type: "RÉGIONAL", lat: ll("Bois-d'Yevre")[0], lng: ll("Bois-d'Yevre")[1] },
  { id: 10, date: "2026-02-28", ville: "Vierzon", lieu: "CB Vierzon — Hall expo", format: "TRIPLETTE", categorie: "Triplette + Journée Régionale des Jeunes", heure: "14h00", type: "CONCOURS", lat: ll("Vierzon")[0], lng: ll("Vierzon")[1] },

  // ══════════════ MARS 2026 ══════════════
  { id: 11, date: "2026-03-01", ville: "Cher (18)", format: "AUTRE", categorie: "1ères & 2èmes journées CRC et CDC open & féminin", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },
  { id: 12, date: "2026-03-07", ville: "La Chapelle-Saint-Ursin", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("La Chapelle-Saint-Ursin")[0], lng: ll("La Chapelle-Saint-Ursin")[1] },
  { id: 13, date: "2026-03-08", ville: "Cher (18)", format: "AUTRE", categorie: "1er & 2ème tour Coupe de France + 1er tour Coupe du Cher — Esprit 2", heure: "8h30", type: "SPÉCIAL", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },
  { id: 15, date: "2026-03-15", ville: "Cher (18)", format: "AUTRE", categorie: "3èmes & 4èmes journées CRC open & féminin + CDC open & féminin", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },
  { id: 16, date: "2026-03-21", dateFin: "2026-03-22", ville: "Pigny", lieu: "Esprit 2", format: "TRIPLETTE", categorie: "Triplette Promotion — CHAMP-18", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Pigny")[0], lng: ll("Pigny")[1] },
  { id: 17, date: "2026-03-28", ville: "Saint-Amand-Montrond", format: "TRIPLETTE", categorie: "CHAMP-18 Masc Secteur 1", heure: "14h00", type: "CHAMPIONNAT", lat: ll("Saint-Amand-Montrond")[0], lng: ll("Saint-Amand-Montrond")[1] },
  { id: 18, date: "2026-03-28", ville: "Meillant", format: "TRIPLETTE", categorie: "CHAMP-18 Masc Secteur 2", heure: "14h00", type: "CHAMPIONNAT", lat: ll("Meillant")[0], lng: ll("Meillant")[1] },
  { id: 19, date: "2026-03-28", ville: "Argent-sur-Sauldre", format: "TRIPLETTE", categorie: "CHAMP-18 Masc Secteur 3", heure: "14h00", type: "CHAMPIONNAT", lat: ll("Argent-sur-Sauldre")[0], lng: ll("Argent-sur-Sauldre")[1] },
  { id: 20, date: "2026-03-28", ville: "Trouy", format: "TRIPLETTE", categorie: "CHAMP-18 Masc Secteur 4", heure: "14h00", type: "CHAMPIONNAT", lat: ll("Trouy")[0], lng: ll("Trouy")[1] },
  { id: 21, date: "2026-03-28", ville: "La Chapelle-Saint-Ursin", format: "DOUBLETTE", categorie: "CHAMP-18 Féminin", heure: "14h00", type: "CHAMPIONNAT", lat: ll("La Chapelle-Saint-Ursin")[0], lng: ll("La Chapelle-Saint-Ursin")[1] },
  { id: 22, date: "2026-03-29", ville: "Argent-sur-Sauldre", format: "TRIPLETTE", categorie: "Suite CHAMP-18 Masc + Fém + Jeunes", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Argent-sur-Sauldre")[0], lng: ll("Argent-sur-Sauldre")[1] },

  // ══════════════ AVRIL 2026 ══════════════
  { id: 23, date: "2026-04-01", ville: "Saint-Amand-Montrond", format: "TRIPLETTE", categorie: "Triplette Vétéran 60+ — Chal PEGUY", heure: "14h00", type: "CONCOURS", lat: ll("Saint-Amand-Montrond")[0], lng: ll("Saint-Amand-Montrond")[1] },
  { id: 24, date: "2026-04-04", ville: "Marseilles-lès-Aubigny", format: "TRIPLETTE", categorie: "Triplette Promotion", heure: "14h00", type: "CONCOURS", lat: ll("Marseilles-lès-Aubigny")[0], lng: ll("Marseilles-lès-Aubigny")[1] },
  { id: 25, date: "2026-04-04", dateFin: "2026-04-05", ville: "Bruère-Allichamps", format: "TRIPLETTE", categorie: "CHAMP-18 Jeu Provençal", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Bruère-Allichamps")[0], lng: ll("Bruère-Allichamps")[1] },
  { id: 26, date: "2026-04-06", ville: "Villabon", format: "DOUBLETTE", categorie: "Doublette — Chal HARCHE", heure: "14h00", type: "CONCOURS", lat: ll("Villabon")[0], lng: ll("Villabon")[1] },
  { id: 27, date: "2026-04-08", ville: "Saint-Doulchard", format: "TRIPLETTE", categorie: "Triplette Vétéran 60+ — Chal JC PAUL", heure: "14h00", type: "CONCOURS", lat: ll("Saint-Doulchard")[0], lng: ll("Saint-Doulchard")[1] },
  { id: 28, date: "2026-04-11", dateFin: "2026-04-12", ville: "Bruère-Allichamps", format: "TRIPLETTE", categorie: "CHAMP-18 Séniors Masc & Fém", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Bruère-Allichamps")[0], lng: ll("Bruère-Allichamps")[1] },
  { id: 29, date: "2026-04-15", ville: "Chateauneuf-sur-Cher", format: "TRIPLETTE", categorie: "Triplette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Chateauneuf-sur-Cher")[0], lng: ll("Chateauneuf-sur-Cher")[1] },
  { id: 30, date: "2026-04-18", dateFin: "2026-04-19", ville: "Bruère-Allichamps", format: "DOUBLETTE", categorie: "CHAMP-18 Doublette Mixte + Jeunes", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Bruère-Allichamps")[0], lng: ll("Bruère-Allichamps")[1] },
  { id: 31, date: "2026-04-22", dateFin: "2026-04-23", ville: "Meillant", format: "AUTRE", categorie: "CHAMP-18 Vétérans", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Meillant")[0], lng: ll("Meillant")[1] },
  { id: 32, date: "2026-04-25", ville: "Orval", format: "DOUBLETTE", categorie: "CHAMP-18 Séniors Masc 1&4 — Secteur", heure: "14h00", type: "CHAMPIONNAT", lat: ll("Orval")[0], lng: ll("Orval")[1] },
  { id: 33, date: "2026-04-25", ville: "Sancoins", format: "DOUBLETTE", categorie: "CHAMP-18 Séniors Masc 2&3 — Secteur", heure: "14h00", type: "CHAMPIONNAT", lat: ll("Sancoins")[0], lng: ll("Sancoins")[1] },
  { id: 34, date: "2026-04-25", ville: "Beffes", format: "TRIPLETTE", categorie: "CHAMP-18 Séniors Féminin", heure: "14h00", type: "CHAMPIONNAT", lat: ll("Beffes")[0], lng: ll("Beffes")[1] },
  { id: 35, date: "2026-04-26", ville: "Beffes", format: "AUTRE", categorie: "Suite CHAMP-18 Séniors Masc + Fém + Jeunes", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Beffes")[0], lng: ll("Beffes")[1] },
  { id: 36, date: "2026-04-28", ville: "Charost", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+ — Chal des amis disparus", heure: "14h00", type: "CONCOURS", lat: ll("Charost")[0], lng: ll("Charost")[1] },
  { id: 37, date: "2026-04-30", ville: "Cher (18)", format: "AUTRE", categorie: "1ères & 2èmes journées CRCV & CDCV", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },

  // ══════════════ MAI 2026 ══════════════
  { id: 38, date: "2026-05-02", dateFin: "2026-05-03", ville: "La Guerche-sur-l'Aubois", format: "TRIPLETTE", categorie: "CHAMP-18 Séniors Triplette Mixte", heure: "8h30", type: "CHAMPIONNAT", lat: ll("La Guerche-sur-l'Aubois")[0], lng: ll("La Guerche-sur-l'Aubois")[1] },
  { id: 39, date: "2026-05-06", ville: "Orval", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+ — Chal LOPEZ", heure: "14h00", type: "CONCOURS", lat: ll("Orval")[0], lng: ll("Orval")[1] },
  { id: 40, date: "2026-05-06", ville: "Herry", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Herry")[0], lng: ll("Herry")[1] },
  { id: 41, date: "2026-05-07", ville: "Jouet-sur-l'Aubois", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Jouet-sur-l'Aubois")[0], lng: ll("Jouet-sur-l'Aubois")[1] },
  { id: 42, date: "2026-05-08", dateFin: "2026-05-09", ville: "Bruère-Allichamps", format: "DOUBLETTE", categorie: "CHAMP-18 Jeu Provençal Doublette", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Bruère-Allichamps")[0], lng: ll("Bruère-Allichamps")[1] },
  { id: 43, date: "2026-05-09", ville: "Cerbois", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Cerbois")[0], lng: ll("Cerbois")[1] },
  { id: 44, date: "2026-05-09", ville: "Torteron", format: "DOUBLETTE", categorie: "Doublette Promotion", heure: "14h00", type: "CONCOURS", lat: ll("Torteron")[0], lng: ll("Torteron")[1] },
  { id: 45, date: "2026-05-10", ville: "Saint-Germain-du-Puy", format: "DOUBLETTE", categorie: "Doublette — Chal BLANDIN", heure: "14h00", type: "CONCOURS", lat: ll("Saint-Germain-du-Puy")[0], lng: ll("Saint-Germain-du-Puy")[1] },
  { id: 46, date: "2026-05-13", ville: "Culan", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+ — Chal B MARTINAT", heure: "14h00", type: "CONCOURS", lat: ll("Culan")[0], lng: ll("Culan")[1] },
  { id: 47, date: "2026-05-13", ville: "La Guerche-sur-l'Aubois", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("La Guerche-sur-l'Aubois")[0], lng: ll("La Guerche-sur-l'Aubois")[1] },
  { id: 48, date: "2026-05-14", ville: "Aubigny-sur-Nère", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Aubigny-sur-Nère")[0], lng: ll("Aubigny-sur-Nère")[1] },
  { id: 49, date: "2026-05-14", ville: "Beffes", format: "TRIPLETTE", categorie: "Triplette Mixte", heure: "14h00", type: "CONCOURS", lat: ll("Beffes")[0], lng: ll("Beffes")[1] },
  { id: 50, date: "2026-05-14", dateFin: "2026-05-15", ville: "Cher (18)", format: "AUTRE", categorie: "CHAMP Région Masc, Fém & Vétérans (cd18)", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },
  { id: 51, date: "2026-05-16", ville: "Cuffy", format: "TRIPLETTE", categorie: "Triplette Mixte", heure: "14h00", type: "CONCOURS", lat: ll("Beffes")[0], lng: ll("Beffes")[1] },
  { id: 52, date: "2026-05-16", ville: "Cher (18)", format: "DOUBLETTE", categorie: "CHAMP Région Doublette Mixte (cd18)", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },
  { id: 53, date: "2026-05-17", ville: "Avord", format: "DOUBLETTE", categorie: "Doublette Mixte", heure: "14h00", type: "CONCOURS", lat: ll("Avord")[0], lng: ll("Avord")[1] },
  { id: 54, date: "2026-05-21", ville: "Cher (18)", format: "AUTRE", categorie: "3èmes & 4èmes journées CRCV & CDCV", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },
  { id: 55, date: "2026-05-23", ville: "Trouy", format: "TRIPLETTE", categorie: "Triplette — Chal BLAISE", heure: "14h00", type: "CONCOURS", lat: ll("Trouy")[0], lng: ll("Trouy")[1] },
  { id: 56, date: "2026-05-24", ville: "Sancoins", format: "DOUBLETTE", categorie: "Doublette 50% — Chal C BEAUVAL", heure: "14h00", type: "CONCOURS", lat: ll("Sancoins")[0], lng: ll("Sancoins")[1] },
  { id: 57, date: "2026-05-25", ville: "Villabon", format: "DOUBLETTE", categorie: "Doublette — Chal amis disparus", heure: "14h00", type: "CONCOURS", lat: ll("Villabon")[0], lng: ll("Villabon")[1] },
  { id: 58, date: "2026-05-27", dateFin: "2026-05-28", ville: "Chateauneuf-sur-Cher", format: "AUTRE", categorie: "CHAMP-18 Vétérans Doublette", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Chateauneuf-sur-Cher")[0], lng: ll("Chateauneuf-sur-Cher")[1] },
  { id: 59, date: "2026-05-30", ville: "Saint-Doulchard", format: "TRIPLETTE", categorie: "Triplette Mixte", heure: "14h00", type: "CONCOURS", lat: ll("Saint-Doulchard")[0], lng: ll("Saint-Doulchard")[1] },
  { id: 60, date: "2026-05-30", ville: "Torteron", format: "DOUBLETTE", categorie: "Doublette Promotion", heure: "14h00", type: "CONCOURS", lat: ll("Torteron")[0], lng: ll("Torteron")[1] },
  { id: 61, date: "2026-05-30", dateFin: "2026-05-31", ville: "Cher (18)", format: "TRIPLETTE", categorie: "CHAMP Région Jeu Provençal (cd18)", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },
  { id: 62, date: "2026-05-31", ville: "Aubigny-sur-Nère", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Aubigny-sur-Nère")[0], lng: ll("Aubigny-sur-Nère")[1] },

  // ══════════════ JUIN 2026 ══════════════
  { id: 63, date: "2026-06-04", ville: "Cher (18)", format: "AUTRE", categorie: "5èmes & 6èmes journées CRCV & CDCV", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },
  { id: 65, date: "2026-06-06", ville: "Marmagne", format: "DOUBLETTE", categorie: "Doublette Féminin 50% limité 32", heure: "9h00", type: "CONCOURS", lat: ll("Marmagne")[0], lng: ll("Marmagne")[1] },
  { id: 66, date: "2026-06-09", ville: "Saint-Amand-Montrond", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Saint-Amand-Montrond")[0], lng: ll("Saint-Amand-Montrond")[1] },
  { id: 67, date: "2026-06-10", ville: "Vierzon", lieu: "CB Vierzon — La Genette", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Vierzon")[0], lng: ll("Vierzon")[1] },
  { id: 68, date: "2026-06-13", ville: "Nohant-Vic", format: "TRIPLETTE", categorie: "Triplette Mixte — Chal BORNAND", heure: "14h00", type: "CONCOURS", lat: ll("Nohant-Vic")[0], lng: ll("Nohant-Vic")[1] },
  { id: 69, date: "2026-06-13", ville: "Saint-Amand-Montrond", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Saint-Amand-Montrond")[0], lng: ll("Saint-Amand-Montrond")[1] },
  { id: 70, date: "2026-06-17", ville: "Bourges", lieu: "Pétanque Berruyère — Esprit 2", format: "TRIPLETTE", categorie: "CHAMP-18 Vétérans Tête-à-tête", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },
  { id: 71, date: "2026-06-18", ville: "Chateaumeillant", format: "TRIPLETTE", categorie: "Triplette Vétéran 60+ — 4 Parties", heure: "14h00", type: "CONCOURS", lat: ll("Chateaumeillant")[0], lng: ll("Chateaumeillant")[1] },
  { id: 72, date: "2026-06-20", ville: "Bois-d'Yevre", format: "TRIPLETTE", categorie: "Triplette Mixte — Chal amis disparus", heure: "14h00", type: "CONCOURS", lat: ll("Bois-d'Yevre")[0], lng: ll("Bois-d'Yevre")[1] },
  { id: 73, date: "2026-06-20", ville: "Lignieres", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Lignieres")[0], lng: ll("Lignieres")[1] },
  { id: 74, date: "2026-06-21", ville: "Orval", format: "DOUBLETTE", categorie: "Doublette — Chal E ROGER", heure: "14h00", type: "CONCOURS", lat: ll("Orval")[0], lng: ll("Orval")[1] },
  { id: 75, date: "2026-06-25", ville: "Cher (18)", format: "AUTRE", categorie: "7ème journées + classements CRCV & CDCV", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },
  { id: 77, date: "2026-06-27", ville: "Argent-sur-Sauldre", format: "TRIPLETTE", categorie: "Triplette Mixte 50% — Prix de la ville", heure: "14h30", type: "CONCOURS", lat: ll("Argent-sur-Sauldre")[0], lng: ll("Argent-sur-Sauldre")[1] },
  { id: 78, date: "2026-06-28", ville: "Graçay", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Graçay")[0], lng: ll("Graçay")[1] },
  { id: 79, date: "2026-06-30", ville: "Argent-sur-Sauldre", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+ — Chal Président disparus", heure: "14h00", type: "CONCOURS", lat: ll("Argent-sur-Sauldre")[0], lng: ll("Argent-sur-Sauldre")[1] },

  // ══════════════ JUILLET 2026 ══════════════
  { id: 80, date: "2026-07-01", ville: "Culan", format: "DOUBLETTE", categorie: "Doublette — Chal R RENAUD / Chal FOURNET-FAYARD", heure: "14h00", type: "CONCOURS", lat: ll("Culan")[0], lng: ll("Culan")[1] },
  { id: 81, date: "2026-07-03", ville: "Lignieres", format: "DOUBLETTE", categorie: "Doublette — Nocturne", heure: "20h00", type: "CONCOURS", lat: ll("Lignieres")[0], lng: ll("Lignieres")[1] },
  { id: 82, date: "2026-07-04", ville: "Culan", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Culan")[0], lng: ll("Culan")[1] },
  { id: 83, date: "2026-07-04", ville: "Plaimpied-Givaudins", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Plaimpied-Givaudins")[0], lng: ll("Plaimpied-Givaudins")[1] },
  { id: 84, date: "2026-07-05", ville: "Sancoins", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Sancoins")[0], lng: ll("Sancoins")[1] },
  { id: 85, date: "2026-07-05", ville: "Saint-Germain-du-Puy", format: "DOUBLETTE", categorie: "Doublette — Chal TOMAS", heure: "14h00", type: "CONCOURS", lat: ll("Saint-Germain-du-Puy")[0], lng: ll("Saint-Germain-du-Puy")[1] },
  { id: 86, date: "2026-07-08", ville: "La Chapelle-Saint-Ursin", format: "TRIPLETTE", categorie: "Triplette Vétéran 60+ — Chal QUELLIER", heure: "14h00", type: "CONCOURS", lat: ll("La Chapelle-Saint-Ursin")[0], lng: ll("La Chapelle-Saint-Ursin")[1] },
  { id: 87, date: "2026-07-10", ville: "Beffes", format: "DOUBLETTE", categorie: "Doublette — Semi-nocturne", heure: "17h30", type: "CONCOURS", lat: ll("Beffes")[0], lng: ll("Beffes")[1] },
  { id: 88, date: "2026-07-10", ville: "Lignieres", format: "DOUBLETTE", categorie: "Doublette — Nocturne", heure: "20h00", type: "CONCOURS", lat: ll("Lignieres")[0], lng: ll("Lignieres")[1] },
  { id: 89, date: "2026-07-11", ville: "Beffes", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Beffes")[0], lng: ll("Beffes")[1] },
  { id: 90, date: "2026-07-11", ville: "La Chapelle-d'Angillon", format: "TRIPLETTE", categorie: "Tête-à-tête + Doublette", heure: "8h00", type: "CONCOURS", lat: ll("La Chapelle-d'Angillon")[0], lng: ll("La Chapelle-d'Angillon")[1] },
  { id: 91, date: "2026-07-15", ville: "Lignieres", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Lignieres")[0], lng: ll("Lignieres")[1] },
  { id: 92, date: "2026-07-17", ville: "Jouet-sur-l'Aubois", format: "TRIPLETTE", categorie: "Triplette", heure: "17h30", type: "CONCOURS", lat: ll("Jouet-sur-l'Aubois")[0], lng: ll("Jouet-sur-l'Aubois")[1] },
  { id: 93, date: "2026-07-18", ville: "Argent-sur-Sauldre", format: "AUTRE", categorie: "Tête-à-tête + Doublette 50%", heure: "8h00", type: "CONCOURS", lat: ll("Argent-sur-Sauldre")[0], lng: ll("Argent-sur-Sauldre")[1] },
  { id: 94, date: "2026-07-22", ville: "Graçay", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Graçay")[0], lng: ll("Graçay")[1] },
  { id: 95, date: "2026-07-22", ville: "Culan", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Culan")[0], lng: ll("Culan")[1] },
  { id: 96, date: "2026-07-25", ville: "Bruère-Allichamps", format: "AUTRE", categorie: "Tête-à-tête + Doublette 50% — Chal J BOURLIAUD", heure: "8h00", type: "CONCOURS", lat: ll("Bruère-Allichamps")[0], lng: ll("Bruère-Allichamps")[1] },
  { id: 97, date: "2026-07-26", ville: "Aubigny-sur-Nère", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Aubigny-sur-Nère")[0], lng: ll("Aubigny-sur-Nère")[1] },
  { id: 98, date: "2026-07-29", ville: "Graçay", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Graçay")[0], lng: ll("Graçay")[1] },
  { id: 99, date: "2026-07-29", ville: "La Guerche-sur-l'Aubois", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("La Guerche-sur-l'Aubois")[0], lng: ll("La Guerche-sur-l'Aubois")[1] },

  // ══════════════ AOÛT 2026 ══════════════
  { id: 101, date: "2026-08-02", ville: "Herry", format: "AUTRE", categorie: "Tête-à-tête — Chal Robert FORTUNE + Doublette — Chal Paul SADOC", heure: "8h00", type: "CONCOURS", lat: ll("Herry")[0], lng: ll("Herry")[1] },
  { id: 102, date: "2026-08-05", ville: "Genouilly", format: "DOUBLETTE", categorie: "Doublette + Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Genouilly")[0], lng: ll("Genouilly")[1] },
  { id: 103, date: "2026-08-07", ville: "Sancoins", format: "DOUBLETTE", categorie: "Doublette — Nocturne", heure: "20h00", type: "CONCOURS", lat: ll("Sancoins")[0], lng: ll("Sancoins")[1] },
  { id: 104, date: "2026-08-08", ville: "La Chapelle-d'Angillon", format: "AUTRE", categorie: "Tête-à-tête + Doublette", heure: "8h00", type: "CONCOURS", lat: ll("La Chapelle-d'Angillon")[0], lng: ll("La Chapelle-d'Angillon")[1] },
  { id: 105, date: "2026-08-09", ville: "Herry", format: "DOUBLETTE", categorie: "Doublette — Poule A et B", heure: "9h00", type: "CONCOURS", lat: ll("Herry")[0], lng: ll("Herry")[1] },
  { id: 106, date: "2026-08-12", ville: "Genouilly", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Genouilly")[0], lng: ll("Genouilly")[1] },
  { id: 107, date: "2026-08-13", ville: "Aubigny-sur-Nère", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Aubigny-sur-Nère")[0], lng: ll("Aubigny-sur-Nère")[1] },
  { id: 108, date: "2026-08-15", ville: "Charost", format: "AUTRE", categorie: "Tête-à-tête + Doublette — Jubilé D CHAPUT", heure: "8h30", type: "CONCOURS", lat: ll("Charost")[0], lng: ll("Charost")[1] },
  { id: 109, date: "2026-08-15", ville: "La Guerche-sur-l'Aubois", format: "DOUBLETTE", categorie: "Doublette — Chal DABURON", heure: "14h00", type: "CONCOURS", lat: ll("La Guerche-sur-l'Aubois")[0], lng: ll("La Guerche-sur-l'Aubois")[1] },
  { id: 111, date: "2026-08-25", ville: "Meillant", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Meillant")[0], lng: ll("Meillant")[1] },
  { id: 112, date: "2026-08-26", ville: "Bourges", lieu: "Pétanque Berruyère — Esprit 2", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "9h00", type: "CONCOURS", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },
  { id: 113, date: "2026-08-28", ville: "Sancoins", format: "DOUBLETTE", categorie: "Doublette — Nocturne", heure: "20h00", type: "CONCOURS", lat: ll("Sancoins")[0], lng: ll("Sancoins")[1] },
  { id: 114, date: "2026-08-29", ville: "Bruère-Allichamps", format: "DOUBLETTE", categorie: "Doublette Mixte", heure: "14h00", type: "CONCOURS", lat: ll("Bruère-Allichamps")[0], lng: ll("Bruère-Allichamps")[1] },
  { id: 115, date: "2026-08-30", ville: "Avord", format: "AUTRE", categorie: "Tête-à-tête + Doublette", heure: "8h00", type: "CONCOURS", lat: ll("Avord")[0], lng: ll("Avord")[1] },

  // ══════════════ SEPTEMBRE 2026 ══════════════
  { id: 116, date: "2026-09-02", ville: "Saint-Amand-Montrond", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Saint-Amand-Montrond")[0], lng: ll("Saint-Amand-Montrond")[1] },
  { id: 117, date: "2026-09-02", ville: "Marseilles-lès-Aubigny", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Marseilles-lès-Aubigny")[0], lng: ll("Marseilles-lès-Aubigny")[1] },
  { id: 118, date: "2026-09-05", ville: "Chateaumeillant", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Chateaumeillant")[0], lng: ll("Chateaumeillant")[1] },
  { id: 119, date: "2026-09-05", ville: "Graçay", format: "TRIPLETTE", categorie: "Triplette", heure: "14h00", type: "CONCOURS", lat: ll("Graçay")[0], lng: ll("Graçay")[1] },
  { id: 120, date: "2026-09-06", ville: "Herry", format: "DOUBLETTE", categorie: "Doublette — Prix de la ville", heure: "14h00", type: "CONCOURS", lat: ll("Herry")[0], lng: ll("Herry")[1] },
  { id: 121, date: "2026-09-08", ville: "Meillant", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Meillant")[0], lng: ll("Meillant")[1] },
  { id: 122, date: "2026-09-09", ville: "La Chapelle-d'Angillon", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+ — Chal D.BERTHELOT", heure: "14h00", type: "CONCOURS", lat: ll("La Chapelle-d'Angillon")[0], lng: ll("La Chapelle-d'Angillon")[1] },
  { id: 123, date: "2026-09-09", ville: "Culan", format: "TRIPLETTE", categorie: "Triplette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Culan")[0], lng: ll("Culan")[1] },
  { id: 124, date: "2026-09-12", ville: "Saint-Florent-sur-Cher", format: "AUTRE", categorie: "Tête-à-tête + Doublette — Chal des amis disparus", heure: "8h00", type: "CONCOURS", lat: ll("Saint-Florent-sur-Cher")[0], lng: ll("Saint-Florent-sur-Cher")[1] },
  { id: 125, date: "2026-09-13", ville: "Cher (18)", format: "AUTRE", categorie: "5ème & 6ème journées CRC & CDC", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },
  { id: 126, date: "2026-09-16", ville: "Beffes", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Beffes")[0], lng: ll("Beffes")[1] },
  { id: 127, date: "2026-09-19", ville: "Vierzon", lieu: "CB Vierzon — Chal Gerbot", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Vierzon")[0], lng: ll("Vierzon")[1] },
  { id: 128, date: "2026-09-19", ville: "Orval", format: "DOUBLETTE", categorie: "Doublette — Chal AUGENDRE", heure: "14h00", type: "CONCOURS", lat: ll("Orval")[0], lng: ll("Orval")[1] },
  { id: 129, date: "2026-09-20", ville: "Chateauroux", format: "DOUBLETTE", categorie: "Journée Régionale Féminine (CD36)", heure: "8h00", type: "CHAMPIONNAT", lat: ll("Chateauroux")[0], lng: ll("Chateauroux")[1] },
  { id: 130, date: "2026-09-23", ville: "Plaimpied-Givaudins", format: "TRIPLETTE", categorie: "Triplette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Plaimpied-Givaudins")[0], lng: ll("Plaimpied-Givaudins")[1] },
  { id: 131, date: "2026-09-24", ville: "Saint-Germain-du-Puy", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+ — Chal amis disparus", heure: "14h00", type: "CONCOURS", lat: ll("Saint-Germain-du-Puy")[0], lng: ll("Saint-Germain-du-Puy")[1] },
  { id: 132, date: "2026-09-26", ville: "La Guerche-sur-l'Aubois", format: "TRIPLETTE", categorie: "Triplette Mixte", heure: "14h00", type: "CONCOURS", lat: ll("La Guerche-sur-l'Aubois")[0], lng: ll("La Guerche-sur-l'Aubois")[1] },
  { id: 133, date: "2026-09-26", ville: "Lignieres", format: "DOUBLETTE", categorie: "Doublette — Chal VASSEUR", heure: "14h00", type: "CONCOURS", lat: ll("Lignieres")[0], lng: ll("Lignieres")[1] },
  { id: 134, date: "2026-09-27", ville: "Cher (18)", format: "AUTRE", categorie: "7ème journées CRC & CDC open & féminin + Classements", heure: "8h30", type: "CHAMPIONNAT", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },

  // ══════════════ OCTOBRE 2026 ══════════════
  { id: 136, date: "2026-10-07", ville: "Graçay", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Graçay")[0], lng: ll("Graçay")[1] },
  { id: 137, date: "2026-10-10", ville: "Saint-Amand-Montrond", format: "DOUBLETTE", categorie: "Doublette", heure: "14h00", type: "CONCOURS", lat: ll("Saint-Amand-Montrond")[0], lng: ll("Saint-Amand-Montrond")[1] },
  { id: 138, date: "2026-10-11", ville: "Avord", format: "TRIPLETTE", categorie: "Triplette Promotion", heure: "14h00", type: "CONCOURS", lat: ll("Avord")[0], lng: ll("Avord")[1] },
  { id: 139, date: "2026-10-14", ville: "Vallenay", format: "DOUBLETTE", categorie: "Doublette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Vallenay")[0], lng: ll("Vallenay")[1] },
  { id: 140, date: "2026-10-17", ville: "Vallenay", format: "DOUBLETTE", categorie: "Doublette Mixte — Chal J TAILLANDIER", heure: "14h00", type: "CONCOURS", lat: ll("Vallenay")[0], lng: ll("Vallenay")[1] },
  { id: 141, date: "2026-10-24", dateFin: "2026-10-25", ville: "Pigny", lieu: "Esprit 2", format: "DOUBLETTE", categorie: "Doublette — Coupe de Pigny + Finale Coupe du Cher", heure: "14h00", type: "SPÉCIAL", lat: ll("Pigny")[0], lng: ll("Pigny")[1] },
  { id: 142, date: "2026-10-31", ville: "Chateauneuf-sur-Cher", lieu: "Esprit 2", format: "TRIPLETTE", categorie: "Triplette — Chal GUERIN", heure: "14h00", type: "CONCOURS", lat: ll("Chateauneuf-sur-Cher")[0], lng: ll("Chateauneuf-sur-Cher")[1] },

  // ══════════════ NOVEMBRE 2026 ══════════════
  { id: 143, date: "2026-11-01", ville: "Chateauneuf-sur-Cher", lieu: "Esprit 2", format: "DOUBLETTE", categorie: "Doublette Mixte — Chal PAILLOT", heure: "14h00", type: "CONCOURS", lat: ll("Chateauneuf-sur-Cher")[0], lng: ll("Chateauneuf-sur-Cher")[1] },
  { id: 144, date: "2026-11-07", ville: "Marmagne", lieu: "Esprit 2", format: "TRIPLETTE", categorie: "Triplette — Trophée CHATREIX Poule A&B", heure: "9h00", type: "CONCOURS", lat: ll("Marmagne")[0], lng: ll("Marmagne")[1] },
  { id: 145, date: "2026-11-08", ville: "Marmagne", lieu: "Esprit 2", format: "DOUBLETTE", categorie: "Doublette — Trophée Alezyan ABC", heure: "9h00", type: "CONCOURS", lat: ll("Marmagne")[0], lng: ll("Marmagne")[1] },
  { id: 146, date: "2026-11-14", ville: "Moulon", lieu: "Esprit 2", format: "TRIPLETTE", categorie: "Triplette — Chal LENOIR", heure: "14h00", type: "CONCOURS", lat: ll("Moulon")[0], lng: ll("Moulon")[1] },
  { id: 147, date: "2026-11-15", ville: "Saint-Germain-du-Puy", format: "AUTRE", categorie: "AG CD18", heure: "9h00", type: "SPÉCIAL", lat: ll("Saint-Germain-du-Puy")[0], lng: ll("Saint-Germain-du-Puy")[1] },

  // ══════════════ DÉCEMBRE 2026 ══════════════
  { id: 148, date: "2026-12-06", ville: "Cher (18)", format: "AUTRE", categorie: "AG CRCVL", heure: "8h30", type: "SPÉCIAL", lat: ll("Bourges")[0], lng: ll("Bourges")[1] },

  // ══════════════ JANVIER 2027 ══════════════
  { id: 149, date: "2027-01-23", ville: "Pigny", lieu: "Esprit 2", format: "DOUBLETTE", categorie: "Doublette — Chal FOXY", heure: "14h00", type: "CONCOURS", lat: ll("Pigny")[0], lng: ll("Pigny")[1] },
  { id: 150, date: "2027-01-30", ville: "Vierzon", lieu: "CB Vierzon — Hall expo", format: "TRIPLETTE", categorie: "Triplette", heure: "14h00", type: "CONCOURS", lat: ll("Vierzon")[0], lng: ll("Vierzon")[1] },

  // ══════════════ FÉVRIER 2027 ══════════════
  { id: 151, date: "2027-02-10", ville: "Vierzon", lieu: "CB Vierzon — Hall expo", format: "TRIPLETTE", categorie: "Triplette Vétéran 60+", heure: "14h00", type: "CONCOURS", lat: ll("Vierzon")[0], lng: ll("Vierzon")[1] },
  { id: 152, date: "2027-02-19", ville: "Bois-d'Yevre", lieu: "Hall expo", format: "TRIPLETTE", categorie: "Triplette Vétéran 60+ — 2ème Régional", heure: "8h30", type: "RÉGIONAL", lat: ll("Bois-d'Yevre")[0], lng: ll("Bois-d'Yevre")[1] },
];
