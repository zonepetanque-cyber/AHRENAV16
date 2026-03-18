// Calendrier complet des concours du département Ariège (09) - 2026
// Source : Calendrier officiel CD09 FFPJP 2026
// Site : https://www.petanqueariege.fr/
// Facebook : https://www.facebook.com/share/1AdKVfoKkp/

export interface ConcourAriege {
  id: number;
  date: string;
  dateFin?: string;
  ville: string;
  lieu?: string;
  club: string;
  format: "TRIPLETTE" | "DOUBLETTE" | "TÊTE À TÊTE" | "ENDURO" | "AUTRE";
  categorie: string;
  info?: string;
  heure?: string;
  lat: number;
  lng: number;
  type: "CONCOURS" | "CHAMPIONNAT" | "RÉGIONAL" | "NATIONAL" | "SPÉCIAL";
}

export const DEPT_ARIEGE = {
  nom: "Ariège",
  code: "09",
  facebook: "https://www.facebook.com/share/1AdKVfoKkp/",
  site: "https://www.petanqueariege.fr/",
};

// Coordonnées des villes du département
const COORDS: Record<string, [number, number]> = {
  "Le Mas d'Azil":          [43.0797,  1.3447],
  "Varilhes":               [43.0386,  1.5711],
  "Serres sur Arget":       [42.9961,  1.5186],
  "Pamiers":                [43.1164,  1.6075],
  "Lavelanet":              [42.9297,  1.8461],
  "La Bastide sur l'Hers":  [42.9658,  1.9064],
  "Lezat sur Leze":         [43.2792,  1.3436],
  "Le Vernet d'Ariège":     [43.0986,  1.6247],
  "Laroque d'Olmes":        [42.9494,  1.8672],
  "Milliane Pamiers":       [43.1164,  1.6075],
  "Montgailhard":           [43.0108,  1.5883],
  "Saverdun":               [43.2325,  1.5789],
  "Arignac":                [42.8936,  1.5883],
  "Saint Jean de Verges":   [43.0781,  1.6050],
  "Foix":                   [42.9636,  1.6075],
  "Saint Jean du Falga":    [43.0906,  1.6317],
  "Petanque Appameenne":    [43.1164,  1.6075],
  "Castelnau Durban":       [43.0036,  1.3497],
  "Escosse":                [43.0950,  1.6133],
  "Sainte Croix Volvestre": [43.1742,  1.1808],
  "Belesta":                [42.9211,  1.9272],
  "Le Fossat":              [43.2708,  1.4317],
  "Saint Jean d'Aigues Vives": [42.9381, 1.8533],
  "Verniolle":              [43.0700,  1.6544],
  "Luzenac":                [42.7486,  1.8369],
  "Mercus":                 [42.8722,  1.5811],
  "La Bastide de Besplas":  [43.1975,  1.3522],
  "Mirepoix":               [43.0886,  1.8736],
  "Daumazan sur Arize":     [43.2194,  1.3906],
  "Les Cabannes":           [42.7519,  1.6914],
  "Oust":                   [42.8769,  1.2097],
  "Mazeres":                [43.2186,  1.6861],
  "Capoulet Junac":         [42.8933,  1.5333],
  "Auzat":                  [42.7297,  1.4817],
  "Montesquieu Aventes":    [43.0828,  1.1958],
  "La Tour du Crieu":       [43.0650,  1.6667],
  "Saint Girons":           [42.9831,  1.1453],
  "Castillon en Couserans": [42.9408,  1.0100],
  "Caumont":                [43.0617,  1.1506],
  "Durfort":                [43.2208,  1.4983],
  "Montaut":                [43.2283,  1.5428],
  "Ax les Thermes":         [42.7197,  1.8378],
  "BBP La Bastide sur l'Hers": [42.9658, 1.9064],
  "Le Peyrat":              [42.9658,  1.9064],
  "PHL Le Fossat":          [43.2708,  1.4317],
  "EBS Castelnau Durban":   [43.0036,  1.3497],
  "Boule Verte Barguillere": [42.9961, 1.5186],
  "Benac":                  [43.1000,  0.1167],
};

const ll = (ville: string): [number, number] => COORDS[ville] ?? [42.9636, 1.6075];

export const CONCOURS_ARIEGE_2026: ConcourAriege[] = [

  // ── JANVIER 2026 ──────────────────────────────────────────────
  { id: 1,  date: "2026-01-03", ville: "Le Mas d'Azil", lieu: "Boulodrome couvert", club: "Petanque du Mas d'Azil", format: "TRIPLETTE", categorie: "Open", info: "Challenge Gilbert Campagne – 8 équipes qualifiées – limité 48 équipes – 14h – T 25%", heure: "14:00", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },
  { id: 2,  date: "2026-01-10", ville: "Le Mas d'Azil", lieu: "Boulodrome couvert", club: "Petanque du Mas d'Azil", format: "TRIPLETTE", categorie: "Open", info: "Challenge Gilbert Campagne – FINALE – 14h – T 25%", heure: "14:00", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },
  { id: 3,  date: "2026-01-24", ville: "Le Mas d'Azil", lieu: "Boulodrome couvert", club: "Petanque du Mas d'Azil", format: "TRIPLETTE", categorie: "Open A B C", info: "14h30 – T 25%", heure: "14:30", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },
  { id: 4,  date: "2026-01-29", ville: "Serres sur Arget", club: "Boule Verte de la Barguillere", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "Limité 24 équipes – 4 équipes qualifiées", lat: ll("Serres sur Arget")[0], lng: ll("Serres sur Arget")[1], type: "CONCOURS" },

  // ── FÉVRIER 2026 ──────────────────────────────────────────────
  { id: 5,  date: "2026-02-05", ville: "Serres sur Arget", club: "Boule Verte de la Barguillere", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "Limité 24 équipes – 4 équipes qualifiées", lat: ll("Serres sur Arget")[0], lng: ll("Serres sur Arget")[1], type: "CONCOURS" },
  { id: 6,  date: "2026-02-07", ville: "Le Mas d'Azil", lieu: "Boulodrome couvert", club: "Petanque du Mas d'Azil", format: "TRIPLETTE", categorie: "Open A B C", info: "14h30 – T 25%", heure: "14:30", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },
  { id: 7,  date: "2026-02-07", ville: "Varilhes", club: "Boule Amicale Varilhoise", format: "TRIPLETTE", categorie: "Open", info: "Concours d'hiver – 8 équipes qualifiées", lat: ll("Varilhes")[0], lng: ll("Varilhes")[1], type: "CONCOURS" },
  { id: 8,  date: "2026-02-12", ville: "Serres sur Arget", club: "Boule Verte de la Barguillere", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "Limité 24 équipes – 4 équipes qualifiées", lat: ll("Serres sur Arget")[0], lng: ll("Serres sur Arget")[1], type: "CONCOURS" },
  { id: 9,  date: "2026-02-14", ville: "Varilhes", club: "Boule Amicale Varilhoise", format: "TRIPLETTE", categorie: "Open", info: "Concours d'hiver – 8 équipes qualifiées", lat: ll("Varilhes")[0], lng: ll("Varilhes")[1], type: "CONCOURS" },
  { id: 10, date: "2026-02-19", ville: "Serres sur Arget", club: "Boule Verte de la Barguillere", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "Limité 24 équipes – 4 équipes qualifiées", lat: ll("Serres sur Arget")[0], lng: ll("Serres sur Arget")[1], type: "CONCOURS" },
  { id: 11, date: "2026-02-21", ville: "Le Mas d'Azil", lieu: "Boulodrome couvert", club: "Petanque du Mas d'Azil", format: "TRIPLETTE", categorie: "Mixte A B C", info: "14h30 – TM 25%", heure: "14:30", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },
  { id: 12, date: "2026-02-21", ville: "Varilhes", club: "Boule Amicale Varilhoise", format: "TRIPLETTE", categorie: "Open", info: "Concours d'hiver – 8 équipes qualifiées", lat: ll("Varilhes")[0], lng: ll("Varilhes")[1], type: "CONCOURS" },
  { id: 13, date: "2026-02-22", ville: "Pamiers", club: "Milliane Petanque", format: "TRIPLETTE", categorie: "Jeunes", info: "Lots en nature", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CONCOURS" },
  { id: 14, date: "2026-02-26", ville: "Serres sur Arget", club: "Boule Verte de la Barguillere", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "FINALE – 9h30 – 500€ + reliquat – invitation des vainqueurs l'année suivante", heure: "09:30", lat: ll("Serres sur Arget")[0], lng: ll("Serres sur Arget")[1], type: "CONCOURS" },
  { id: 15, date: "2026-02-28", ville: "Varilhes", club: "Boule Amicale Varilhoise", format: "TRIPLETTE", categorie: "Open", info: "Concours d'hiver – 8 équipes qualifiées", lat: ll("Varilhes")[0], lng: ll("Varilhes")[1], type: "CONCOURS" },

  // ── MARS 2026 ─────────────────────────────────────────────────
  { id: 16, date: "2026-03-01", ville: "Varilhes", club: "Boule Amicale Varilhoise", format: "TRIPLETTE", categorie: "Open", info: "Concours d'hiver FINALE – 10h – T 750€ + 50% des mises", heure: "10:00", lat: ll("Varilhes")[0], lng: ll("Varilhes")[1], type: "CONCOURS" },
  { id: 17, date: "2026-03-07", ville: "Pamiers", club: "Milliane Petanque", format: "DOUBLETTE", categorie: "Mixte", info: "DM 150€", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CONCOURS" },
  { id: 18, date: "2026-03-08", ville: "Le Vernet d'Ariège", club: "Association Sportive Vernetoise", format: "DOUBLETTE", categorie: "Mixte", info: "Concours A B – DM 150€", lat: ll("Le Vernet d'Ariège")[0], lng: ll("Le Vernet d'Ariège")[1], type: "CONCOURS" },
  { id: 19, date: "2026-03-10", ville: "Lavelanet", club: "Stade Lavelanet Petanque Club", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "Concours Super U – 14h – 8 équipes qualifiées", heure: "14:00", lat: ll("Lavelanet")[0], lng: ll("Lavelanet")[1], type: "CONCOURS" },
  { id: 20, date: "2026-03-14", ville: "La Bastide sur l'Hers", club: "Boule Bastidienne Peyrataise", format: "DOUBLETTE", categorie: "Open", info: "14h30 – D 190€", heure: "14:30", lat: ll("La Bastide sur l'Hers")[0], lng: ll("La Bastide sur l'Hers")[1], type: "CONCOURS" },
  { id: 21, date: "2026-03-14", ville: "Lezat sur Leze", club: "Boule Lezatoise Petanque", format: "TRIPLETTE", categorie: "Open A B", info: "14h30 – T 300€", heure: "14:30", lat: ll("Lezat sur Leze")[0], lng: ll("Lezat sur Leze")[1], type: "CONCOURS" },
  { id: 22, date: "2026-03-14", ville: "Serres sur Arget", club: "Boule Verte de la Barguillere", format: "DOUBLETTE", categorie: "Mixte", info: "DM 150€", lat: ll("Serres sur Arget")[0], lng: ll("Serres sur Arget")[1], type: "CONCOURS" },
  { id: 23, date: "2026-03-15", ville: "Laroque d'Olmes", club: "Joyeuse Petanque Laroque d'Olmes", format: "DOUBLETTE", categorie: "Open", info: "14h30 – 4 parties – D 200€", heure: "14:30", lat: ll("Laroque d'Olmes")[0], lng: ll("Laroque d'Olmes")[1], type: "CONCOURS" },
  { id: 24, date: "2026-03-15", ville: "Pamiers", club: "Milliane Petanque", format: "TRIPLETTE", categorie: "Promotion", info: "Réservé Promotion – T 150€", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CONCOURS" },
  { id: 25, date: "2026-03-17", ville: "Lavelanet", club: "Stade Lavelanet Petanque Club", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "Concours Super U – 14h – 8 équipes qualifiées", heure: "14:00", lat: ll("Lavelanet")[0], lng: ll("Lavelanet")[1], type: "CONCOURS" },
  { id: 26, date: "2026-03-19", ville: "Serres sur Arget", club: "Boule Verte de la Barguillere", format: "DOUBLETTE", categorie: "Vétéran A B", info: "14h30 – DV 150€", heure: "14:30", lat: ll("Serres sur Arget")[0], lng: ll("Serres sur Arget")[1], type: "CONCOURS" },
  { id: 27, date: "2026-03-22", ville: "Pamiers", club: "Petanque Appameenne", format: "DOUBLETTE", categorie: "Open A B", info: "Challenge Fuffo – 14h – D 300€", heure: "14:00", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CONCOURS" },
  { id: 28, date: "2026-03-24", ville: "Lavelanet", club: "Stade Lavelanet Petanque Club", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "Concours Super U – 14h – 8 équipes qualifiées", heure: "14:00", lat: ll("Lavelanet")[0], lng: ll("Lavelanet")[1], type: "CONCOURS" },
  { id: 29, date: "2026-03-27", ville: "Montgailhard", club: "Joyeux Petanqueurs de Montgailhard", format: "DOUBLETTE", categorie: "Vétéran", info: "Par poules – DV Mises + 25% – complémentaire gratuit perdants de poules", lat: ll("Montgailhard")[0], lng: ll("Montgailhard")[1], type: "CONCOURS" },
  { id: 30, date: "2026-03-31", ville: "Lavelanet", club: "Stade Lavelanet Petanque Club", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "Concours Super U – 14h – 8 équipes qualifiées", heure: "14:00", lat: ll("Lavelanet")[0], lng: ll("Lavelanet")[1], type: "CONCOURS" },

  // ── AVRIL 2026 ────────────────────────────────────────────────
  { id: 31, date: "2026-04-04", ville: "Le Mas d'Azil", club: "Petanque du Mas d'Azil", format: "TRIPLETTE", categorie: "Open 4 parties", info: "9h – TT 25%", heure: "09:00", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },
  { id: 32, date: "2026-04-04", ville: "Le Mas d'Azil", club: "Petanque du Mas d'Azil", format: "DOUBLETTE", categorie: "Open A B", info: "14h – D 25%", heure: "14:00", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },
  { id: 33, date: "2026-04-04", ville: "Saint Jean de Verges", club: "Entente Sportive Saint Jean de Verges", format: "DOUBLETTE", categorie: "Féminin", info: "4 parties – 14h30 – DF 200€", heure: "14:30", lat: ll("Saint Jean de Verges")[0], lng: ll("Saint Jean de Verges")[1], type: "CONCOURS" },
  { id: 34, date: "2026-04-07", ville: "Lavelanet", club: "Stade Lavelanet Petanque Club", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "Super U FINALE – 9h30 – par poules – TV 800€ + reliquat – complémentaire TV 200€", heure: "09:30", lat: ll("Lavelanet")[0], lng: ll("Lavelanet")[1], type: "CONCOURS" },
  { id: 35, date: "2026-04-09", ville: "Pamiers", club: "Milliane Petanque", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "TV 150€", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CONCOURS" },
  { id: 36, date: "2026-04-12", ville: "Laroque d'Olmes", club: "Joyeuse Petanque Laroque d'Olmes", format: "DOUBLETTE", categorie: "Open", info: "14h30 – 4 parties – D 200€", heure: "14:30", lat: ll("Laroque d'Olmes")[0], lng: ll("Laroque d'Olmes")[1], type: "CONCOURS" },
  { id: 37, date: "2026-04-15", ville: "Saverdun", club: "Union Athletique de Saverdun", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "Par poules – 14h30 – TV 300€", heure: "14:30", lat: ll("Saverdun")[0], lng: ll("Saverdun")[1], type: "CONCOURS" },
  { id: 38, date: "2026-04-26", ville: "Saint Jean du Falga", club: "Saint Jean du Falga Petanque", format: "DOUBLETTE", categorie: "Open", info: "4 parties – D 250€", lat: ll("Saint Jean du Falga")[0], lng: ll("Saint Jean du Falga")[1], type: "CONCOURS" },
  { id: 39, date: "2026-04-26", ville: "Pamiers", club: "Petanque Appameenne", format: "TRIPLETTE", categorie: "Open", info: "14h30 – T 300€", heure: "14:30", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CONCOURS" },

  // ── MAI 2026 ──────────────────────────────────────────────────
  { id: 40, date: "2026-05-03", ville: "Le Vernet d'Ariège", club: "Association Sportive Vernetoise", format: "TRIPLETTE", categorie: "Open A B", info: "T 150€", lat: ll("Le Vernet d'Ariège")[0], lng: ll("Le Vernet d'Ariège")[1], type: "CONCOURS" },
  { id: 41, date: "2026-05-07", ville: "Castelnau Durban", club: "Entente Bouliste Seronnaise", format: "DOUBLETTE", categorie: "Vétéran", info: "14h30 – 4 parties – DV 150€", heure: "14:30", lat: ll("Castelnau Durban")[0], lng: ll("Castelnau Durban")[1], type: "CONCOURS" },
  { id: 42, date: "2026-05-08", ville: "Escosse", club: "Escosse Petanque", format: "DOUBLETTE", categorie: "Open", info: "Par poules – D 200€ – complémentaire gratuit D 100€", lat: ll("Escosse")[0], lng: ll("Escosse")[1], type: "CONCOURS" },
  { id: 43, date: "2026-05-09", ville: "Castelnau Durban", club: "Entente Bouliste Seronnaise", format: "TRIPLETTE", categorie: "Open A B", info: "Challenge Jojo Almeida – 14h30 – T 150€", heure: "14:30", lat: ll("Castelnau Durban")[0], lng: ll("Castelnau Durban")[1], type: "CONCOURS" },
  { id: 44, date: "2026-05-14", ville: "Montgailhard", club: "Joyeux Petanqueurs de Montgailhard", format: "TRIPLETTE", categorie: "Open", info: "Par poules – T 50% + mises – complémentaire gratuit perdants de poules", lat: ll("Montgailhard")[0], lng: ll("Montgailhard")[1], type: "CONCOURS" },
  { id: 45, date: "2026-05-15", ville: "Sainte Croix Volvestre", club: "Sainte Croix Petanque", format: "DOUBLETTE", categorie: "Open", info: "4 parties – 14h30 – D 150€", heure: "14:30", lat: ll("Sainte Croix Volvestre")[0], lng: ll("Sainte Croix Volvestre")[1], type: "CONCOURS" },
  { id: 46, date: "2026-05-16", ville: "Pamiers", club: "Milliane Petanque", format: "TRIPLETTE", categorie: "Open", info: "T 150€", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CONCOURS" },
  { id: 47, date: "2026-05-16", ville: "Pamiers", club: "Milliane Petanque", format: "TRIPLETTE", categorie: "Féminin", info: "TF 150€", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CONCOURS" },
  { id: 48, date: "2026-05-23", ville: "Laroque d'Olmes", club: "Joyeuse Petanque Laroque d'Olmes", format: "DOUBLETTE", categorie: "Open A", info: "14h30 – D 200€ – Concours B 100€", heure: "14:30", lat: ll("Laroque d'Olmes")[0], lng: ll("Laroque d'Olmes")[1], type: "CONCOURS" },
  { id: 49, date: "2026-05-23", ville: "Le Fossat", club: "Petanque Haute Leze", format: "TRIPLETTE", categorie: "Open A B", info: "9h – TT 150€ / 14h30 – D 300€", heure: "09:00", lat: ll("Le Fossat")[0], lng: ll("Le Fossat")[1], type: "CONCOURS" },
  { id: 50, date: "2026-05-25", ville: "Belesta", club: "Amicale Bouliste de Belesta", format: "TRIPLETTE", categorie: "Open", info: "Patronné Super U Lavelanet – 14h30 – T 200€", heure: "14:30", lat: ll("Belesta")[0], lng: ll("Belesta")[1], type: "CONCOURS" },
  { id: 51, date: "2026-05-25", ville: "Saint Jean de Verges", club: "Entente Sportive Saint Jean de Verges", format: "DOUBLETTE", categorie: "Open", info: "Concours de Pentecote – par poules – 10h – D 400€ – complémentaire D 150€", heure: "10:00", lat: ll("Saint Jean de Verges")[0], lng: ll("Saint Jean de Verges")[1], type: "CONCOURS" },
  { id: 52, date: "2026-05-30", ville: "Les Cabannes", club: "USC Les Cabannes", format: "DOUBLETTE", categorie: "Open A B", info: "D 250€", lat: ll("Les Cabannes")[0], lng: ll("Les Cabannes")[1], type: "CONCOURS" },
  { id: 53, date: "2026-05-30", ville: "Serres sur Arget", club: "Boule Verte de la Barguillere", format: "TRIPLETTE", categorie: "Open", info: "Challenge des Grenouilles – 9h – TT 150€ / 14h – D 250€", heure: "09:00", lat: ll("Serres sur Arget")[0], lng: ll("Serres sur Arget")[1], type: "CONCOURS" },
  { id: 54, date: "2026-05-30", ville: "Saint Jean du Falga", club: "Saint Jean du Falga Petanque", format: "TRIPLETTE", categorie: "Mixte", info: "4 parties – TM 200€", lat: ll("Saint Jean du Falga")[0], lng: ll("Saint Jean du Falga")[1], type: "CONCOURS" },
  { id: 55, date: "2026-05-31", ville: "Arignac", club: "Joyeuse Petanque Arignacoise", format: "DOUBLETTE", categorie: "Open", info: "Challenge Elias – 4 parties – D 200€", lat: ll("Arignac")[0], lng: ll("Arignac")[1], type: "CONCOURS" },
  { id: 56, date: "2026-05-31", ville: "Lezat sur Leze", club: "Boule Lezatoise Petanque", format: "DOUBLETTE", categorie: "Open", info: "14h30 – par poules – D 250€", heure: "14:30", lat: ll("Lezat sur Leze")[0], lng: ll("Lezat sur Leze")[1], type: "CONCOURS" },
  { id: 57, date: "2026-05-31", ville: "La Tour du Crieu", club: "Petanque La Tour du Crieu", format: "DOUBLETTE", categorie: "Mixte", info: "Par poules – 14h30 – DM 300€ – complémentaire DM 100€", heure: "14:30", lat: ll("La Tour du Crieu")[0], lng: ll("La Tour du Crieu")[1], type: "CONCOURS" },

  // ── JUIN 2026 ─────────────────────────────────────────────────
  { id: 58, date: "2026-06-06", ville: "Saint Jean d'Aigues Vives", club: "Petanque Club Saint Jean d'Aigues Vives", format: "DOUBLETTE", categorie: "Open", info: "31e concours – patronné AXA Assurances – par poules non stop – D 750€ – complémentaire D 200€", lat: ll("Saint Jean d'Aigues Vives")[0], lng: ll("Saint Jean d'Aigues Vives")[1], type: "CONCOURS" },
  { id: 59, date: "2026-06-06", ville: "Mercus", club: "Petanque Mercusienne", format: "DOUBLETTE", categorie: "Open", info: "Challenge Michel Amiel – par poules – D 200€ – complémentaire D 100€", lat: ll("Mercus")[0], lng: ll("Mercus")[1], type: "CONCOURS" },
  { id: 60, date: "2026-06-06", ville: "Montesquieu Aventes", club: "Cochonnet Avantesien", format: "TRIPLETTE", categorie: "Open", info: "14h30 – T 150€", heure: "14:30", lat: ll("Montesquieu Aventes")[0], lng: ll("Montesquieu Aventes")[1], type: "CONCOURS" },
  { id: 61, date: "2026-06-07", ville: "Lavelanet", club: "Stade Lavelanet Petanque Club", format: "TRIPLETTE", categorie: "Open A B", info: "Concours Carrefour Market – 9h – TT 100€ / 14h – D 200€", heure: "09:00", lat: ll("Lavelanet")[0], lng: ll("Lavelanet")[1], type: "CONCOURS" },
  { id: 62, date: "2026-06-07", ville: "Pamiers", club: "Milliane Petanque", format: "TRIPLETTE", categorie: "Jeu Provençal", info: "Limité 32 équipes – TJP 300€", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CONCOURS" },
  { id: 63, date: "2026-06-07", ville: "Castillon en Couserans", club: "Club Olympique Castillonnais", format: "TRIPLETTE", categorie: "Open A B", info: "Au camping – 9h – TAT 150€ / 14h30 – D 200€", heure: "09:00", lat: ll("Castillon en Couserans")[0], lng: ll("Castillon en Couserans")[1], type: "CONCOURS" },
  { id: 64, date: "2026-06-13", ville: "Arignac", club: "Joyeuse Petanque Arignacoise", format: "TRIPLETTE", categorie: "Open", info: "Challenge Da Cunha – par poules – T 150€ – complémentaire T 60€", lat: ll("Arignac")[0], lng: ll("Arignac")[1], type: "CONCOURS" },
  { id: 65, date: "2026-06-13", ville: "Saint Jean d'Aigues Vives", club: "Petanque Club Saint Jean d'Aigues Vives", format: "DOUBLETTE", categorie: "Open", info: "9h – 4 parties – TT 150€ / 14h30 – par poules non stop – D 300€", heure: "09:00", lat: ll("Saint Jean d'Aigues Vives")[0], lng: ll("Saint Jean d'Aigues Vives")[1], type: "CONCOURS" },
  { id: 66, date: "2026-06-13", ville: "Verniolle", club: "Petanque Verniollaise", format: "TRIPLETTE", categorie: "Open", info: "9h – TT 150€ / 14h30 – T 250€", heure: "09:00", lat: ll("Verniolle")[0], lng: ll("Verniolle")[1], type: "CONCOURS" },
  { id: 67, date: "2026-06-14", ville: "Laroque d'Olmes", club: "Joyeuse Petanque Laroque d'Olmes", format: "DOUBLETTE", categorie: "Mixte", info: "14h30 – 4 parties – DM 200€", heure: "14:30", lat: ll("Laroque d'Olmes")[0], lng: ll("Laroque d'Olmes")[1], type: "CONCOURS" },
  { id: 68, date: "2026-06-18", ville: "Varilhes", club: "Boule Amicale Varilhoise", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "TV 50%", lat: ll("Varilhes")[0], lng: ll("Varilhes")[1], type: "CONCOURS" },
  { id: 69, date: "2026-06-20", ville: "Luzenac", club: "Amicale Luzenacienne Petanque", format: "DOUBLETTE", categorie: "Open", info: "Challenge Pierre Labiste – par poules – D 300€ – complémentaire D 100€", lat: ll("Luzenac")[0], lng: ll("Luzenac")[1], type: "CONCOURS" },
  { id: 70, date: "2026-06-20", ville: "Saverdun", club: "Union Athletique de Saverdun", format: "DOUBLETTE", categorie: "Open", info: "9h – TT 200€ / 14h30 – par poules – D 400€", heure: "09:00", lat: ll("Saverdun")[0], lng: ll("Saverdun")[1], type: "CONCOURS" },
  { id: 71, date: "2026-06-21", ville: "Lavelanet", club: "Stade Lavelanet Petanque Club", format: "TRIPLETTE", categorie: "Open A B", info: "Challenge Antoine Santoro Nestenn – T 400€", lat: ll("Lavelanet")[0], lng: ll("Lavelanet")[1], type: "CONCOURS" },
  { id: 72, date: "2026-06-21", ville: "Saint Jean du Falga", club: "Saint Jean du Falga Petanque", format: "DOUBLETTE", categorie: "Open", info: "Fête de Saint Jean – D 300€", lat: ll("Saint Jean du Falga")[0], lng: ll("Saint Jean du Falga")[1], type: "CONCOURS" },
  { id: 73, date: "2026-06-26", ville: "Caumont", club: "ASBB Caumont", format: "DOUBLETTE", categorie: "Open A B", info: "19h30 – D 200€", heure: "19:30", lat: ll("Caumont")[0], lng: ll("Caumont")[1], type: "CONCOURS" },
  { id: 74, date: "2026-06-27", ville: "Auzat", club: "Petanque Auzat Montcalm Vicdessos", format: "DOUBLETTE", categorie: "Open", info: "À Vicdessos – par poules – D 200€ – complémentaire D 100€", lat: ll("Auzat")[0], lng: ll("Auzat")[1], type: "CONCOURS" },
  { id: 75, date: "2026-06-27", ville: "La Bastide sur l'Hers", club: "Boule Bastidienne Peyrataise", format: "DOUBLETTE", categorie: "Mixte", info: "14h30 – DM 190€", heure: "14:30", lat: ll("La Bastide sur l'Hers")[0], lng: ll("La Bastide sur l'Hers")[1], type: "CONCOURS" },
  { id: 76, date: "2026-06-27", ville: "La Bastide de Besplas", club: "La Boule de Besplas", format: "DOUBLETTE", categorie: "Open", info: "Challenge des Anciens Pétanqueurs – 9h – TT 150€ / 14h30 – D 350€", heure: "09:00", lat: ll("La Bastide de Besplas")[0], lng: ll("La Bastide de Besplas")[1], type: "CONCOURS" },
  { id: 77, date: "2026-06-27", ville: "Saverdun", club: "Union Athletique de Saverdun", format: "TRIPLETTE", categorie: "Mixte", info: "14h30 – par poules – TM 400€", heure: "14:30", lat: ll("Saverdun")[0], lng: ll("Saverdun")[1], type: "CONCOURS" },
  { id: 78, date: "2026-06-28", ville: "Belesta", club: "Amicale Bouliste de Belesta", format: "DOUBLETTE", categorie: "Féminin", info: "14h – 4 parties – DF 200€", heure: "14:00", lat: ll("Belesta")[0], lng: ll("Belesta")[1], type: "CONCOURS" },

  // ── JUILLET 2026 ──────────────────────────────────────────────
  { id: 79, date: "2026-07-02", ville: "Castelnau Durban", club: "Entente Bouliste Seronnaise", format: "DOUBLETTE", categorie: "Vétéran", info: "14h30 – 4 parties – DV 150€", heure: "14:30", lat: ll("Castelnau Durban")[0], lng: ll("Castelnau Durban")[1], type: "CONCOURS" },
  { id: 80, date: "2026-07-04", ville: "Arignac", club: "Joyeuse Petanque Arignacoise", format: "DOUBLETTE", categorie: "Open", info: "Challenge Dejean – par poules – D 150€ – complémentaire D 60€", lat: ll("Arignac")[0], lng: ll("Arignac")[1], type: "CONCOURS" },
  { id: 81, date: "2026-07-04", ville: "La Bastide sur l'Hers", club: "Boule Bastidienne Peyrataise", format: "DOUBLETTE", categorie: "Open", info: "Au Peyrat – 14h30 – D 190€", heure: "14:30", lat: ll("La Bastide sur l'Hers")[0], lng: ll("La Bastide sur l'Hers")[1], type: "CONCOURS" },
  { id: 82, date: "2026-07-04", ville: "Le Vernet d'Ariège", club: "Association Sportive Vernetoise", format: "DOUBLETTE", categorie: "Open", info: "4 parties – D 150€", lat: ll("Le Vernet d'Ariège")[0], lng: ll("Le Vernet d'Ariège")[1], type: "CONCOURS" },
  { id: 83, date: "2026-07-04", ville: "Saint Jean du Falga", club: "Saint Jean du Falga Petanque", format: "AUTRE", categorie: "Open", info: "La Saint Jeantaise – 8 parties – 1000€", lat: ll("Saint Jean du Falga")[0], lng: ll("Saint Jean du Falga")[1], type: "CONCOURS" },
  { id: 84, date: "2026-07-05", ville: "Belesta", club: "Amicale Bouliste de Belesta", format: "DOUBLETTE", categorie: "Open", info: "Patronné Carrefour Belesta – 4 parties – D 150€", lat: ll("Belesta")[0], lng: ll("Belesta")[1], type: "CONCOURS" },
  { id: 85, date: "2026-07-05", ville: "Durfort", club: "Durfort camping le bourdieu", format: "DOUBLETTE", categorie: "Open", info: "Souvenir Roger Buffa – 4 parties – D 250€ + mises", lat: ll("Durfort")[0], lng: ll("Durfort")[1], type: "CONCOURS" },
  { id: 86, date: "2026-07-05", ville: "Mercus", club: "Petanque Mercusienne", format: "DOUBLETTE", categorie: "Féminin", info: "4 parties – DF 100€", lat: ll("Mercus")[0], lng: ll("Mercus")[1], type: "CONCOURS" },
  { id: 87, date: "2026-07-11", ville: "Mirepoix", club: "Petanque Mirapicienne", format: "TRIPLETTE", categorie: "Open A B", info: "Challenge Philippe Nelkin – patronné SMTP Saint Martin – 14h30 – T 300€", heure: "14:30", lat: ll("Mirepoix")[0], lng: ll("Mirepoix")[1], type: "CONCOURS" },
  { id: 88, date: "2026-07-11", ville: "Daumazan sur Arize", club: "US Arize Daumazan", format: "DOUBLETTE", categorie: "Open A B", info: "9h – TT 150€ / 14h30 – D 300€", heure: "09:00", lat: ll("Daumazan sur Arize")[0], lng: ll("Daumazan sur Arize")[1], type: "CONCOURS" },
  { id: 89, date: "2026-07-11", ville: "Oust", club: "Petanque du Haut Salat", format: "TRIPLETTE", categorie: "Open A B", info: "Challenge Patrice Ponsolle – 9h – TT 150€", heure: "09:00", lat: ll("Oust")[0], lng: ll("Oust")[1], type: "CONCOURS" },
  { id: 90, date: "2026-07-11", ville: "Oust", club: "Petanque du Haut Salat", format: "DOUBLETTE", categorie: "Open A B", info: "Challenge Roland Jauze – 14h30 – D 200€", heure: "14:30", lat: ll("Oust")[0], lng: ll("Oust")[1], type: "CONCOURS" },
  { id: 91, date: "2026-07-12", ville: "La Tour du Crieu", club: "Petanque La Tour du Crieu", format: "DOUBLETTE", categorie: "Open", info: "Challenge Michel Alesina – FINALE – 10h – D 400€ + reliquat", heure: "10:00", lat: ll("La Tour du Crieu")[0], lng: ll("La Tour du Crieu")[1], type: "CONCOURS" },
  { id: 92, date: "2026-07-14", ville: "La Bastide sur l'Hers", club: "Boule Bastidienne Peyrataise", format: "DOUBLETTE", categorie: "Open", info: "14h30 – D 600€ – complémentaire D 190€", heure: "14:30", lat: ll("La Bastide sur l'Hers")[0], lng: ll("La Bastide sur l'Hers")[1], type: "CONCOURS" },
  { id: 93, date: "2026-07-16", ville: "Saint Girons", club: "Petanque Club Saint Girons Couserans", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "Concours régional – 9h – limité 128 équipes – TV 1050€ – inscription HELLOASSO", heure: "09:00", lat: ll("Saint Girons")[0], lng: ll("Saint Girons")[1], type: "RÉGIONAL" },
  { id: 94, date: "2026-07-16", ville: "Saint Girons", club: "Petanque Club Saint Girons Couserans", format: "TÊTE À TÊTE", categorie: "Vétéran", info: "15h – TV 400€", heure: "15:00", lat: ll("Saint Girons")[0], lng: ll("Saint Girons")[1], type: "CONCOURS" },
  { id: 95, date: "2026-07-16", ville: "Durfort", club: "Durfort camping le bourdieu", format: "DOUBLETTE", categorie: "Open", info: "4 parties – D 140€ + mises", lat: ll("Durfort")[0], lng: ll("Durfort")[1], type: "CONCOURS" },
  { id: 96, date: "2026-07-17", ville: "Foix", lieu: "Labarre", club: "Joyeuse Petanque Foix", format: "DOUBLETTE", categorie: "Open", info: "Trophée Pinpin – 4 parties – jet du but 18h30 – D 200€ – restauration sur place", heure: "18:30", lat: ll("Foix")[0], lng: ll("Foix")[1], type: "CONCOURS" },
  { id: 97, date: "2026-07-17", ville: "Saint Girons", club: "Petanque Club Saint Girons Couserans", format: "DOUBLETTE", categorie: "Open A B", info: "14h30 – D 250€", heure: "14:30", lat: ll("Saint Girons")[0], lng: ll("Saint Girons")[1], type: "CONCOURS" },
  { id: 98, date: "2026-07-18", ville: "Saint Girons", club: "Petanque Club Saint Girons Couserans", format: "TRIPLETTE", categorie: "Mixte", info: "Régional – limité 128 équipes – TM 1800€ – inscription HELLOASSO", lat: ll("Saint Girons")[0], lng: ll("Saint Girons")[1], type: "RÉGIONAL" },
  { id: 99, date: "2026-07-18", ville: "Saint Girons", club: "Petanque Club Saint Girons Couserans", format: "TRIPLETTE", categorie: "Mixte", info: "15h – TM 400€", heure: "15:00", lat: ll("Saint Girons")[0], lng: ll("Saint Girons")[1], type: "CONCOURS" },
  { id: 100, date: "2026-07-19", ville: "Saint Jean de Verges", club: "Entente Sportive Saint Jean de Verges", format: "DOUBLETTE", categorie: "Promotion", info: "Réservé Promotion – Concours A D 200€ / Concours B D 120€ / Concours C D 60€", lat: ll("Saint Jean de Verges")[0], lng: ll("Saint Jean de Verges")[1], type: "CONCOURS" },
  { id: 101, date: "2026-07-19", ville: "Castelnau Durban", club: "Entente Bouliste Seronnaise", format: "DOUBLETTE", categorie: "Mixte", info: "14h30 – DM 150€", heure: "14:30", lat: ll("Castelnau Durban")[0], lng: ll("Castelnau Durban")[1], type: "CONCOURS" },
  { id: 102, date: "2026-07-23", ville: "Durfort", club: "Durfort camping le bourdieu", format: "DOUBLETTE", categorie: "Open", info: "4 parties – D 140€ + mises", lat: ll("Durfort")[0], lng: ll("Durfort")[1], type: "CONCOURS" },
  { id: 103, date: "2026-07-25", ville: "Mazeres", club: "Petanque Mazerienne", format: "TRIPLETTE", categorie: "Mixte", info: "Par poules non stop – TM 300€ – complémentaire TM 100€", lat: ll("Mazeres")[0], lng: ll("Mazeres")[1], type: "CONCOURS" },
  { id: 104, date: "2026-07-25", ville: "Oust", club: "Petanque du Haut Salat", format: "DOUBLETTE", categorie: "Open", info: "Challenge Jean Jacques Cancel dit Jacou – 14h30 – D 150€", heure: "14:30", lat: ll("Oust")[0], lng: ll("Oust")[1], type: "CONCOURS" },
  { id: 105, date: "2026-07-26", ville: "Capoulet Junac", club: "La Boule de Caju", format: "DOUBLETTE", categorie: "Open", info: "Challenge Voivenel – D 200€", lat: ll("Capoulet Junac")[0], lng: ll("Capoulet Junac")[1], type: "CONCOURS" },
  { id: 106, date: "2026-07-26", ville: "Oust", club: "Petanque du Haut Salat", format: "DOUBLETTE", categorie: "Open", info: "Challenge Jean Claude Navas dit Maka – 14h30 – D 150€", heure: "14:30", lat: ll("Oust")[0], lng: ll("Oust")[1], type: "CONCOURS" },
  { id: 107, date: "2026-07-27", ville: "Saint Girons", club: "Petanque Club Saint Girons Couserans", format: "DOUBLETTE", categorie: "Open", info: "14h30 – Square Balague – Fête de Saint Girons – par poules – D 400€ – complémentaire D 100€", heure: "14:30", lat: ll("Saint Girons")[0], lng: ll("Saint Girons")[1], type: "CONCOURS" },
  { id: 108, date: "2026-07-29", ville: "Mazeres", club: "Petanque Mazerienne", format: "TRIPLETTE", categorie: "Promotion", info: "Par poules non stop – réservé Promotion – T 300€ – complémentaire T 100€", lat: ll("Mazeres")[0], lng: ll("Mazeres")[1], type: "CONCOURS" },
  { id: 109, date: "2026-07-30", ville: "Durfort", club: "Durfort camping le bourdieu", format: "DOUBLETTE", categorie: "Open", info: "4 parties – D 140€ + mises", lat: ll("Durfort")[0], lng: ll("Durfort")[1], type: "CONCOURS" },

  // ── AOÛT 2026 ─────────────────────────────────────────────────
  { id: 110, date: "2026-08-01", ville: "Arignac", club: "Joyeuse Petanque Arignacoise", format: "DOUBLETTE", categorie: "Mixte", info: "Par poules – DM 150€ – complémentaire DM 60€", lat: ll("Arignac")[0], lng: ll("Arignac")[1], type: "CONCOURS" },
  { id: 111, date: "2026-08-01", ville: "Lezat sur Leze", club: "Boule Lezatoise Petanque", format: "DOUBLETTE", categorie: "Open", info: "14h30 – par poules – D 200€", heure: "14:30", lat: ll("Lezat sur Leze")[0], lng: ll("Lezat sur Leze")[1], type: "CONCOURS" },
  { id: 112, date: "2026-08-02", ville: "Belesta", club: "Amicale Bouliste de Belesta", format: "DOUBLETTE", categorie: "Promotion", info: "Patronné Palais Cathare – réservé Promotion – 14h30 – D 150€", heure: "14:30", lat: ll("Belesta")[0], lng: ll("Belesta")[1], type: "CONCOURS" },
  { id: 113, date: "2026-08-03", ville: "La Bastide sur l'Hers", club: "Boule Bastidienne Peyrataise", format: "TRIPLETTE", categorie: "Open", info: "14h30 – T 190€", heure: "14:30", lat: ll("La Bastide sur l'Hers")[0], lng: ll("La Bastide sur l'Hers")[1], type: "CONCOURS" },
  { id: 114, date: "2026-08-04", ville: "Serres sur Arget", lieu: "Benac", club: "Boule Verte de la Barguillere", format: "DOUBLETTE", categorie: "Open A B", info: "Challenge Auriac – 14h30 – D 250€", heure: "14:30", lat: ll("Serres sur Arget")[0], lng: ll("Serres sur Arget")[1], type: "CONCOURS" },
  { id: 115, date: "2026-08-05", ville: "Ax les Thermes", club: "Petanque Axeenne", format: "DOUBLETTE", categorie: "Open", info: "Concours A non stop – 14h30 – D 500€ / Concours B – D 150€", heure: "14:30", lat: ll("Ax les Thermes")[0], lng: ll("Ax les Thermes")[1], type: "CONCOURS" },
  { id: 116, date: "2026-08-06", ville: "Durfort", club: "Durfort camping le bourdieu", format: "DOUBLETTE", categorie: "Open", info: "4 parties – D 140€ + mises", lat: ll("Durfort")[0], lng: ll("Durfort")[1], type: "CONCOURS" },
  { id: 117, date: "2026-08-07", ville: "Saint Girons", club: "Petanque Club Saint Girons Couserans", format: "DOUBLETTE", categorie: "Open", info: "19h – 4 parties – D 150€", heure: "19:00", lat: ll("Saint Girons")[0], lng: ll("Saint Girons")[1], type: "CONCOURS" },
  { id: 118, date: "2026-08-08", ville: "Mirepoix", club: "Petanque Mirapicienne", format: "TRIPLETTE", categorie: "Open", info: "En poule – 14h30 – pas de consolante – T 200€", heure: "14:30", lat: ll("Mirepoix")[0], lng: ll("Mirepoix")[1], type: "CONCOURS" },
  { id: 119, date: "2026-08-09", ville: "Daumazan sur Arize", club: "US Arize Daumazan", format: "DOUBLETTE", categorie: "Open A B", info: "9h – TT 150€ / 14h30 – D 300€ – repas sur réservation", heure: "09:00", lat: ll("Daumazan sur Arize")[0], lng: ll("Daumazan sur Arize")[1], type: "CONCOURS" },
  { id: 120, date: "2026-08-09", ville: "Montaut", club: "Amicale Bouliste Montaut Crieu", format: "DOUBLETTE", categorie: "Open", info: "Par poules – D 200€", lat: ll("Montaut")[0], lng: ll("Montaut")[1], type: "CONCOURS" },
  { id: 121, date: "2026-08-10", ville: "Mercus", club: "Petanque Mercusienne", format: "TRIPLETTE", categorie: "Open", info: "Par poules – T 200€ – complémentaire T 100€", lat: ll("Mercus")[0], lng: ll("Mercus")[1], type: "CONCOURS" },
  { id: 122, date: "2026-08-11", ville: "Montgailhard", club: "Joyeux Petanqueurs de Montgailhard", format: "TRIPLETTE", categorie: "Promotion", info: "9h réservé Promotion – par poules – TT 25% / 14h30 – D 25% – complémentaires gratuits", heure: "09:00", lat: ll("Montgailhard")[0], lng: ll("Montgailhard")[1], type: "CONCOURS" },
  { id: 123, date: "2026-08-13", ville: "Durfort", club: "Durfort camping le bourdieu", format: "DOUBLETTE", categorie: "Open", info: "4 parties – D 140€ + mises", lat: ll("Durfort")[0], lng: ll("Durfort")[1], type: "CONCOURS" },
  { id: 124, date: "2026-08-15", ville: "Auzat", club: "Petanque Auzat Montcalm Vicdessos", format: "TRIPLETTE", categorie: "Open", info: "Par poules – T 200€ – complémentaire T 100€", lat: ll("Auzat")[0], lng: ll("Auzat")[1], type: "CONCOURS" },
  { id: 125, date: "2026-08-15", ville: "Varilhes", club: "Boule Amicale Varilhoise", format: "AUTRE", categorie: "Open", info: "450€", lat: ll("Varilhes")[0], lng: ll("Varilhes")[1], type: "CONCOURS" },
  { id: 126, date: "2026-08-15", ville: "Montesquieu Aventes", club: "Cochonnet Avantesien", format: "TRIPLETTE", categorie: "Open", info: "9h – TT 120€ / 14h30 – D 150€", heure: "09:00", lat: ll("Montesquieu Aventes")[0], lng: ll("Montesquieu Aventes")[1], type: "CONCOURS" },
  { id: 127, date: "2026-08-16", ville: "Saint Jean de Verges", club: "Entente Sportive Saint Jean de Verges", format: "DOUBLETTE", categorie: "Open", info: "9h – 4 parties – TT 200€ / 14h30 – 4 parties – D 200€", heure: "09:00", lat: ll("Saint Jean de Verges")[0], lng: ll("Saint Jean de Verges")[1], type: "CONCOURS" },
  { id: 128, date: "2026-08-18", ville: "Saint Girons", club: "Petanque Club Saint Girons Couserans", format: "TRIPLETTE", categorie: "Open", info: "14h30 – Champs de Mars – T 700€ – complémentaire payant 12€ – T 150€ – arrêt 20h-22h", heure: "14:30", lat: ll("Saint Girons")[0], lng: ll("Saint Girons")[1], type: "CONCOURS" },
  { id: 129, date: "2026-08-19", ville: "Saint Girons", club: "Petanque Club Saint Girons Couserans", format: "DOUBLETTE", categorie: "Open", info: "14h30 – Champs de Mars – D 500€ – complémentaire payant 10€ – D 150€ – arrêt 20h-22h", heure: "14:30", lat: ll("Saint Girons")[0], lng: ll("Saint Girons")[1], type: "CONCOURS" },
  { id: 130, date: "2026-08-21", ville: "Saint Jean d'Aigues Vives", club: "Petanque Club Saint Jean d'Aigues Vives", format: "DOUBLETTE", categorie: "Open", info: "21e concours Super U – 14h30 – D 350€ – complémentaire D 150€", heure: "14:30", lat: ll("Saint Jean d'Aigues Vives")[0], lng: ll("Saint Jean d'Aigues Vives")[1], type: "CONCOURS" },
  { id: 131, date: "2026-08-21", ville: "Caumont", club: "ASBB Caumont", format: "DOUBLETTE", categorie: "Open", info: "19h30 – D 300€", heure: "19:30", lat: ll("Caumont")[0], lng: ll("Caumont")[1], type: "CONCOURS" },
  { id: 132, date: "2026-08-22", ville: "Foix", lieu: "Labarre", club: "Joyeuse Petanque Foix", format: "TRIPLETTE", categorie: "Open", info: "9h – Challenge Saurat – 4 parties – TT 150€ – restauration sur place", heure: "09:00", lat: ll("Foix")[0], lng: ll("Foix")[1], type: "CONCOURS" },
  { id: 133, date: "2026-08-22", ville: "Arignac", club: "Joyeuse Petanque Arignacoise", format: "DOUBLETTE", categorie: "Promotion", info: "Challenge Vidal – réservé Promotion – par poules – D 150€ – complémentaire D 60€", lat: ll("Arignac")[0], lng: ll("Arignac")[1], type: "CONCOURS" },
  { id: 134, date: "2026-08-22", ville: "Foix", lieu: "Labarre", club: "Joyeuse Petanque Foix", format: "DOUBLETTE", categorie: "Open A B", info: "Challenge Belmonte – 14h30 – D 200€", heure: "14:30", lat: ll("Foix")[0], lng: ll("Foix")[1], type: "CONCOURS" },
  { id: 135, date: "2026-08-23", ville: "Lavelanet", club: "Stade Lavelanet Petanque Club", format: "TRIPLETTE", categorie: "Mixte A B", info: "TM 300€", lat: ll("Lavelanet")[0], lng: ll("Lavelanet")[1], type: "CONCOURS" },
  { id: 136, date: "2026-08-24", ville: "Le Fossat", club: "Petanque Haute Leze", format: "TRIPLETTE", categorie: "Open A B", info: "T 250€", lat: ll("Le Fossat")[0], lng: ll("Le Fossat")[1], type: "CONCOURS" },
  { id: 137, date: "2026-08-29", ville: "La Bastide sur l'Hers", club: "Boule Bastidienne Peyrataise", format: "DOUBLETTE", categorie: "Open", info: "14h30 – D 350€", heure: "14:30", lat: ll("La Bastide sur l'Hers")[0], lng: ll("La Bastide sur l'Hers")[1], type: "CONCOURS" },
  { id: 138, date: "2026-08-29", ville: "Pamiers", club: "Milliane Petanque", format: "TRIPLETTE", categorie: "Open", info: "Fête de Pamiers – T 300€", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CONCOURS" },
  { id: 139, date: "2026-08-30", ville: "Belesta", club: "Amicale Bouliste de Belesta", format: "DOUBLETTE", categorie: "Open", info: "Patronné Palais Cathare – 14h30 – 4 parties – D 150€", heure: "14:30", lat: ll("Belesta")[0], lng: ll("Belesta")[1], type: "CONCOURS" },
  { id: 140, date: "2026-08-30", ville: "Pamiers", club: "Petanque Appameenne", format: "TRIPLETTE", categorie: "Open", info: "14h – T 400€", heure: "14:00", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CONCOURS" },
  { id: 141, date: "2026-08-31", ville: "Pamiers", club: "Milliane Petanque", format: "DOUBLETTE", categorie: "Open", info: "Fête de Pamiers – D 300€", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CONCOURS" },

  // ── SEPTEMBRE 2026 ────────────────────────────────────────────
  { id: 142, date: "2026-09-01", ville: "Saint Jean du Falga", club: "Saint Jean du Falga Petanque", format: "DOUBLETTE", categorie: "Vétéran", info: "4 parties – DV 200€", lat: ll("Saint Jean du Falga")[0], lng: ll("Saint Jean du Falga")[1], type: "CONCOURS" },
  { id: 143, date: "2026-09-04", ville: "Montgailhard", club: "Joyeux Petanqueurs de Montgailhard", format: "DOUBLETTE", categorie: "Vétéran", info: "14h30 – par poules – DV 25% – complémentaire gratuit perdants de poules", heure: "14:30", lat: ll("Montgailhard")[0], lng: ll("Montgailhard")[1], type: "CONCOURS" },
  { id: 144, date: "2026-09-05", ville: "Les Cabannes", club: "USC Les Cabannes", format: "TRIPLETTE", categorie: "Open A B", info: "Challenge Canal – T 250€", lat: ll("Les Cabannes")[0], lng: ll("Les Cabannes")[1], type: "CONCOURS" },
  { id: 145, date: "2026-09-05", ville: "Foix", lieu: "Labarre", club: "Joyeuse Petanque Foix", format: "TRIPLETTE", categorie: "Mixte", info: "Grand Prix Fête de Foix – 9h30 – par poules – TM 500€ – complémentaire 14h30 TM 250€ – restauration gratuite", heure: "09:30", lat: ll("Foix")[0], lng: ll("Foix")[1], type: "CONCOURS" },
  { id: 146, date: "2026-09-05", ville: "Le Vernet d'Ariège", club: "Association Sportive Vernetoise", format: "DOUBLETTE", categorie: "Open", info: "3 parties – D 150€", lat: ll("Le Vernet d'Ariège")[0], lng: ll("Le Vernet d'Ariège")[1], type: "CONCOURS" },
  { id: 147, date: "2026-09-05", ville: "Castillon en Couserans", club: "Club Olympique Castillonnais", format: "DOUBLETTE", categorie: "Open", info: "Au camping – 10h – par poules – D 500€ – complémentaire 150€ – arrêt 12h-14h", heure: "10:00", lat: ll("Castillon en Couserans")[0], lng: ll("Castillon en Couserans")[1], type: "CONCOURS" },
  { id: 148, date: "2026-09-06", ville: "Capoulet Junac", club: "La Boule de Caju", format: "TRIPLETTE", categorie: "Open", info: "Challenge Caju – TT 150€", lat: ll("Capoulet Junac")[0], lng: ll("Capoulet Junac")[1], type: "CONCOURS" },
  { id: 149, date: "2026-09-12", ville: "Lezat sur Leze", club: "Boule Lezatoise Petanque", format: "TRIPLETTE", categorie: "Open", info: "14h30 – Challenge Zentelin Fort – par poules – T 300€", heure: "14:30", lat: ll("Lezat sur Leze")[0], lng: ll("Lezat sur Leze")[1], type: "CONCOURS" },
  { id: 150, date: "2026-09-12", ville: "Varilhes", club: "Boule Amicale Varilhoise", format: "DOUBLETTE", categorie: "Open", info: "14h30 – Challenge Jeannou – D 50%", heure: "14:30", lat: ll("Varilhes")[0], lng: ll("Varilhes")[1], type: "CONCOURS" },
  { id: 151, date: "2026-09-12", ville: "Montesquieu Aventes", club: "Cochonnet Avantesien", format: "DOUBLETTE", categorie: "Open", info: "Challenge Michel Moga – 14h30 – D 150€", heure: "14:30", lat: ll("Montesquieu Aventes")[0], lng: ll("Montesquieu Aventes")[1], type: "CONCOURS" },
  { id: 152, date: "2026-09-15", ville: "Saint Jean de Verges", club: "Entente Sportive Saint Jean de Verges", format: "DOUBLETTE", categorie: "Vétéran", info: "4 parties – 14h30 – DV 200€", heure: "14:30", lat: ll("Saint Jean de Verges")[0], lng: ll("Saint Jean de Verges")[1], type: "CONCOURS" },
  { id: 153, date: "2026-09-18", ville: "Saint Girons", club: "Petanque Club Saint Girons Couserans", format: "DOUBLETTE", categorie: "Open", info: "19h – 4 parties – D 150€", heure: "19:00", lat: ll("Saint Girons")[0], lng: ll("Saint Girons")[1], type: "CONCOURS" },
  { id: 154, date: "2026-09-19", ville: "Mirepoix", club: "Petanque Mirapicienne", format: "DOUBLETTE", categorie: "Open A B", info: "9h – TT 150€ / 14h30 – patronné Super U Mirepoix – T 400€", heure: "09:00", lat: ll("Mirepoix")[0], lng: ll("Mirepoix")[1], type: "CONCOURS" },
  { id: 155, date: "2026-09-19", ville: "La Bastide de Besplas", club: "La Boule de Besplas", format: "DOUBLETTE", categorie: "Mixte A B", info: "DM 200€", lat: ll("La Bastide de Besplas")[0], lng: ll("La Bastide de Besplas")[1], type: "CONCOURS" },
  { id: 156, date: "2026-09-19", ville: "Serres sur Arget", club: "Boule Verte de la Barguillere", format: "AUTRE", categorie: "Open", info: "Challenge du Souvenir – 10h – par poules – 250€ – complémentaire 150€", heure: "10:00", lat: ll("Serres sur Arget")[0], lng: ll("Serres sur Arget")[1], type: "CONCOURS" },
  { id: 157, date: "2026-09-19", ville: "Mazeres", club: "Petanque Mazerienne", format: "TRIPLETTE", categorie: "Mixte", info: "14h30 – par poules non stop – TM 300€ + mises / Concours B 100€", heure: "14:30", lat: ll("Mazeres")[0], lng: ll("Mazeres")[1], type: "CONCOURS" },
  { id: 158, date: "2026-09-20", ville: "Foix", lieu: "Labarre", club: "Joyeuse Petanque Foix", format: "DOUBLETTE", categorie: "Mixte A B", info: "Challenge Rodrigues – 14h30 – DM 200€", heure: "14:30", lat: ll("Foix")[0], lng: ll("Foix")[1], type: "CONCOURS" },
  { id: 159, date: "2026-09-27", ville: "Montgailhard", club: "Joyeux Petanqueurs de Montgailhard", format: "TRIPLETTE", categorie: "Open", info: "14h30 – par poules – T 25% – complémentaire perdants de poules", heure: "14:30", lat: ll("Montgailhard")[0], lng: ll("Montgailhard")[1], type: "CONCOURS" },

  // ── OCTOBRE 2026 ──────────────────────────────────────────────
  { id: 160, date: "2026-10-03", ville: "Les Cabannes", club: "USC Les Cabannes", format: "DOUBLETTE", categorie: "Open A B", info: "Challenge Charles Girabet – D 250€", lat: ll("Les Cabannes")[0], lng: ll("Les Cabannes")[1], type: "CONCOURS" },
  { id: 161, date: "2026-10-21", ville: "Serres sur Arget", club: "Boule Verte de la Barguillere", format: "DOUBLETTE", categorie: "Vétéran A B", info: "14h – DV 150€", heure: "14:00", lat: ll("Serres sur Arget")[0], lng: ll("Serres sur Arget")[1], type: "CONCOURS" },
  { id: 162, date: "2026-10-31", ville: "Le Mas d'Azil", lieu: "Boulodrome couvert", club: "Petanque du Mas d'Azil", format: "TRIPLETTE", categorie: "Open A B C", info: "14h30 – T 25%", heure: "14:30", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },

  // ── NOVEMBRE 2026 ─────────────────────────────────────────────
  { id: 163, date: "2026-11-08", ville: "La Tour du Crieu", club: "Petanque La Tour du Crieu", format: "TRIPLETTE", categorie: "Promotion", info: "Réservé Promotion – par poules – 14h30 – T 200€", heure: "14:30", lat: ll("La Tour du Crieu")[0], lng: ll("La Tour du Crieu")[1], type: "CONCOURS" },
  { id: 164, date: "2026-11-21", ville: "Le Mas d'Azil", lieu: "Boulodrome couvert", club: "Petanque du Mas d'Azil", format: "TRIPLETTE", categorie: "Open A B C", info: "14h30 – T 25%", heure: "14:30", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },
  { id: 165, date: "2026-11-22", ville: "Pamiers", club: "Milliane Petanque", format: "DOUBLETTE", categorie: "Open", info: "4 parties – D 150€", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CONCOURS" },

  // ── DÉCEMBRE 2026 ─────────────────────────────────────────────
  { id: 166, date: "2026-12-05", ville: "Le Mas d'Azil", lieu: "Boulodrome couvert", club: "Petanque du Mas d'Azil", format: "TRIPLETTE", categorie: "Open", info: "Challenge Gilbert Campagne – 8 équipes qualifiées – limité 48 équipes – 14h – T 25%", heure: "14:00", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },
  { id: 167, date: "2026-12-12", ville: "Le Mas d'Azil", lieu: "Boulodrome couvert", club: "Petanque du Mas d'Azil", format: "TRIPLETTE", categorie: "Open", info: "Challenge Gilbert Campagne – 8 équipes qualifiées – limité 48 équipes – 14h – T 25%", heure: "14:00", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },
  { id: 168, date: "2026-12-19", ville: "Le Mas d'Azil", lieu: "Boulodrome couvert", club: "Petanque du Mas d'Azil", format: "TRIPLETTE", categorie: "Open", info: "Challenge Gilbert Campagne – 8 équipes qualifiées – limité 48 équipes – 14h – T 25%", heure: "14:00", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },
  { id: 169, date: "2026-12-26", ville: "Le Mas d'Azil", lieu: "Boulodrome couvert", club: "Petanque du Mas d'Azil", format: "TRIPLETTE", categorie: "Open", info: "Challenge Gilbert Campagne – 8 équipes qualifiées – limité 48 équipes – 14h – T 25%", heure: "14:00", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },

  // ── JANVIER 2027 ──────────────────────────────────────────────
  { id: 170, date: "2027-01-09", ville: "Le Mas d'Azil", lieu: "Boulodrome couvert", club: "Petanque du Mas d'Azil", format: "TRIPLETTE", categorie: "Open", info: "Challenge Gilbert Campagne – FINALE – 14h – T 25%", heure: "14:00", lat: ll("Le Mas d'Azil")[0], lng: ll("Le Mas d'Azil")[1], type: "CONCOURS" },

  // ── CHAMPIONNATS DÉPARTEMENTAUX 2026 ──────────────────────────
  { id: 200, date: "2026-03-01", ville: "Pamiers", club: "Milliane Petanque", format: "AUTRE", categorie: "Jeunes", info: "Rassemblement des Jeunes – inscriptions avant 22 Fév.", lat: ll("Pamiers")[0], lng: ll("Pamiers")[1], type: "CHAMPIONNAT" },
  { id: 201, date: "2026-03-21", dateFin: "2026-03-22", ville: "Lavelanet", club: "Stade Lavelanet Petanque Club", format: "TRIPLETTE", categorie: "Promotion", info: "Champ. Départ. Triplettes Promotion – inscriptions avant 8 Mars", lat: ll("Lavelanet")[0], lng: ll("Lavelanet")[1], type: "CHAMPIONNAT" },
  { id: 202, date: "2026-03-28", dateFin: "2026-03-29", ville: "Lezat sur Leze", club: "Boule Lezatoise Petanque", format: "TÊTE À TÊTE", categorie: "Masculin", info: "Champ. Départ. Individuel Masculin FINALE – inscriptions avant 15 Mars", lat: ll("Lezat sur Leze")[0], lng: ll("Lezat sur Leze")[1], type: "CHAMPIONNAT" },
  { id: 203, date: "2026-03-28", dateFin: "2026-03-29", ville: "Lezat sur Leze", club: "Boule Lezatoise Petanque", format: "DOUBLETTE", categorie: "Féminin", info: "Champ. Départ. Doublettes Féminin – Samedi 14h – inscriptions avant 15 Mars", heure: "14:00", lat: ll("Lezat sur Leze")[0], lng: ll("Lezat sur Leze")[1], type: "CHAMPIONNAT" },
  { id: 204, date: "2026-04-04", dateFin: "2026-04-06", ville: "La Tour du Crieu", club: "Petanque La Tour du Crieu", format: "TRIPLETTE", categorie: "Jeu Provençal", info: "Champ. Départ. Triplettes JP – jet du but 9h – inscriptions avant 22 Mars", heure: "09:00", lat: ll("La Tour du Crieu")[0], lng: ll("La Tour du Crieu")[1], type: "CHAMPIONNAT" },
  { id: 205, date: "2026-04-11", dateFin: "2026-04-12", ville: "Saverdun", club: "Union Athletique de Saverdun", format: "TRIPLETTE", categorie: "Féminin", info: "Champ. Départ. Triplettes Féminin – inscriptions avant 29 Mars", lat: ll("Saverdun")[0], lng: ll("Saverdun")[1], type: "CHAMPIONNAT" },
  { id: 206, date: "2026-04-11", dateFin: "2026-04-12", ville: "Saverdun", club: "Union Athletique de Saverdun", format: "TRIPLETTE", categorie: "Masculin", info: "Champ. Départ. Triplettes Masculin FINALE – inscriptions avant 29 Mars", lat: ll("Saverdun")[0], lng: ll("Saverdun")[1], type: "CHAMPIONNAT" },
  { id: 207, date: "2026-04-18", dateFin: "2026-04-19", ville: "Lavelanet", club: "Stade Lavelanet Petanque Club", format: "DOUBLETTE", categorie: "Mixte", info: "Champ. Départ. Doublettes Mixtes FINALE – inscriptions avant 5 Avril", lat: ll("Lavelanet")[0], lng: ll("Lavelanet")[1], type: "CHAMPIONNAT" },
  { id: 208, date: "2026-04-22", dateFin: "2026-04-23", ville: "Saverdun", club: "Union Athletique de Saverdun", format: "TRIPLETTE", categorie: "Vétéran", info: "Champ. Départ. Triplettes Vétérans – inscriptions avant 8 Avril", lat: ll("Saverdun")[0], lng: ll("Saverdun")[1], type: "CHAMPIONNAT" },
  { id: 209, date: "2026-04-25", dateFin: "2026-04-26", ville: "Saint Girons", club: "Petanque Club Saint Girons Couserans", format: "TÊTE À TÊTE", categorie: "Féminin", info: "Champ. Départ. Individuel Féminin – inscriptions avant 12 Avril", lat: ll("Saint Girons")[0], lng: ll("Saint Girons")[1], type: "CHAMPIONNAT" },
  { id: 210, date: "2026-04-25", dateFin: "2026-04-26", ville: "Saint Girons", club: "Petanque Club Saint Girons Couserans", format: "DOUBLETTE", categorie: "Masculin", info: "Champ. Départ. Doublettes Masculin – inscriptions avant 12 Avril", lat: ll("Saint Girons")[0], lng: ll("Saint Girons")[1], type: "CHAMPIONNAT" },
  { id: 211, date: "2026-05-01", ville: "La Bastide de Besplas", club: "La Boule de Besplas", format: "DOUBLETTE", categorie: "Jeunes", info: "Champ. Départ. Doublettes Jeunes – inscriptions avant 19 Avril", lat: ll("La Bastide de Besplas")[0], lng: ll("La Bastide de Besplas")[1], type: "CHAMPIONNAT" },
  { id: 212, date: "2026-05-02", dateFin: "2026-05-03", ville: "Lezat sur Leze", club: "Boule Lezatoise Petanque", format: "TRIPLETTE", categorie: "Mixte", info: "Champ. Départ. Triplettes Mixtes FINALE – inscriptions avant 19 Avril", lat: ll("Lezat sur Leze")[0], lng: ll("Lezat sur Leze")[1], type: "CHAMPIONNAT" },
  { id: 213, date: "2026-05-03", ville: "Lezat sur Leze", club: "Boule Lezatoise Petanque", format: "TÊTE À TÊTE", categorie: "Jeunes", info: "Champ. Départ. Tir de Précision Cadets/Juniors – inscriptions avant 19 Avril", lat: ll("Lezat sur Leze")[0], lng: ll("Lezat sur Leze")[1], type: "CHAMPIONNAT" },
  { id: 214, date: "2026-05-08", dateFin: "2026-05-10", ville: "La Tour du Crieu", club: "Petanque La Tour du Crieu", format: "DOUBLETTE", categorie: "Jeu Provençal", info: "Champ. Départ. Doublettes JP – inscriptions avant 26 Avril", lat: ll("La Tour du Crieu")[0], lng: ll("La Tour du Crieu")[1], type: "CHAMPIONNAT" },
  { id: 215, date: "2026-05-10", ville: "Saint Girons", club: "Petanque Club Saint Girons Couserans", format: "TRIPLETTE", categorie: "Jeunes", info: "Champ. Départ. Triplettes Jeunes – inscriptions avant 26 Avril", lat: ll("Saint Girons")[0], lng: ll("Saint Girons")[1], type: "CHAMPIONNAT" },
  { id: 216, date: "2026-06-25", dateFin: "2026-06-26", ville: "Foix", lieu: "Labarre", club: "Joyeuse Petanque Foix", format: "DOUBLETTE", categorie: "Vétéran", info: "Trophée Doublettes Vétérans – inscriptions avant 14 Juin", lat: ll("Foix")[0], lng: ll("Foix")[1], type: "CHAMPIONNAT" },
];
