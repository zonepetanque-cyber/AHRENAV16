// Calendrier complet Côte-d'Or (21) - 2026
// Source : Comité Départemental de Pétanque de la Côte-d'Or
// Site : https://wp.cd21petanque.com/
// Facebook : https://www.facebook.com/groups/7911819642241756/
//
// Légende :
// BFC = Championnat Régional Bourgogne-Franche-Comté
// France = Championnat de France
// CDC = Compétition de clubs
// National = Concours National
// DEP / Concours local = Concours départemental
// T = Triplette, D = Doublette, DMX = Doublette Mixte, TMX = Triplette Mixte
// DV/TV = Doublette/Triplette Vétéran, TS = Triplette Sénior
// TSF/TSM = Triplette Sénior Féminin/Masculin, ISF/ISM = Individuel Sénior Féminin/Masculin
// DSF/DSM = Doublette Sénior Féminin/Masculin, TJP = Triplette Jeu Provençal
// DJP = Doublette Jeu Provençal, TSP = Triplette Sénior Promotion
// TDP = Tir de Précision

export interface ConcourCoteDOr {
  id: number;
  date: string;
  dateFin?: string;
  ville: string;
  lieu?: string;
  format: string;
  categorie: string;
  heure?: string;
  info?: string;
  lat: number;
  lng: number;
  type: "CONCOURS" | "CHAMPIONNAT" | "RÉGIONAL" | "NATIONAL" | "SPÉCIAL";
}

export const DEPT_COTEDOR = {
  nom: "Côte-d'Or",
  code: "21",
  facebook: "https://www.facebook.com/groups/7911819642241756/",
  site: "https://wp.cd21petanque.com/",
};

const COORDS: Record<string, [number, number]> = {
  "Dijon":              [47.3220, 5.0415],
  "Beaune":             [47.0258, 4.8394],
  "Montbard":           [47.6228, 4.3381],
  "Semur-en-Auxois":    [47.4958, 4.3353],
  "Saulieu":            [47.2822, 4.2339],
  "Longvic":            [47.2914, 5.0667],
  "Clenay":             [47.3931, 5.0892],
  "Fenay":              [47.2386, 5.0811],
  "Marsannay-la-Côte":  [47.2622, 5.0194],
  "Genlis":             [47.2442, 5.2242],
  "Fontaine-lès-Dijon": [47.3481, 4.9875],
  "Neuilly-lès-Dijon":  [47.3056, 5.1019],
  "Is-sur-Tille":       [47.5203, 5.1008],
  "Pontailler-sur-Saône":[47.3039, 5.4022],
  "Comblanchien":       [47.1244, 4.8483],
  "Nolay":              [46.9522, 4.6344],
  "Saint-Rémy":         [47.0800, 4.7500],
  "Pagny-le-Château":   [47.0497, 5.1344],
  "Aignay-le-Duc":      [47.6703, 4.7189],
  "Sainte-Colombe-sur-Seine": [47.7711, 4.7056],
  "Précy-sous-Thil":    [47.3994, 4.3306],
  "Venarey-les-Laumes": [47.5447, 4.4569],
  "Châtillon-sur-Seine":[47.8578, 4.5736],
  "Savouges":           [47.2150, 5.1000],
  "Le Lac":             [47.2800, 5.0500],
  "Drapeau":            [47.3000, 5.0600],
  "Gresilles":          [47.3300, 5.0550],
  "ASPTT Dijon":        [47.3220, 5.0415],
  "USCVL":              [47.3220, 5.0415],
};

function ll(ville: string): [number, number] {
  return COORDS[ville] ?? [47.32, 5.04];
}

export const CONCOURS_COTEDOR_2026: ConcourCoteDOr[] = [

  // ══════════════ JANVIER 2026 ══════════════
  { id: 1,  date: "2026-01-10", ville: "Le Lac", format: "TRIPLETTE", categorie: "Triplette 30% — Challenge Jean Claude CAVATZ", heure: "10h00", type: "CONCOURS", lat: ll("Le Lac")[0], lng: ll("Le Lac")[1] },
  { id: 2,  date: "2026-01-10", ville: "Saulieu", format: "DOUBLETTE", categorie: "Doublette 30%", heure: "10h00", type: "CONCOURS", lat: ll("Saulieu")[0], lng: ll("Saulieu")[1] },
  { id: 3,  date: "2026-01-11", ville: "Le Lac", format: "TRIPLETTE", categorie: "Triplette Mixte 30% — Challenge Paulette BEHAEGHEL", heure: "10h00", type: "CONCOURS", lat: ll("Le Lac")[0], lng: ll("Le Lac")[1] },
  { id: 4,  date: "2026-01-14", ville: "Saulieu", format: "DOUBLETTE", categorie: "Doublette Vétéran 4 Parties", heure: "14h00", type: "CONCOURS", lat: ll("Saulieu")[0], lng: ll("Saulieu")[1] },
  { id: 5,  date: "2026-01-17", ville: "Clenay", format: "TRIPLETTE", categorie: "Triplette 30%", heure: "10h00", lieu: "Boulodrome Dijon", type: "CONCOURS", lat: ll("Clenay")[0], lng: ll("Clenay")[1] },
  { id: 6,  date: "2026-01-18", ville: "Clenay", format: "TRIPLETTE", categorie: "Triplette Mixte 30%", heure: "10h00", lieu: "Boulodrome Dijon", type: "CONCOURS", lat: ll("Clenay")[0], lng: ll("Clenay")[1] },
  { id: 7,  date: "2026-01-24", dateFin: "2026-01-25", ville: "Côte-d'Or", format: "AUTRE", categorie: "Coupe de France Jeu Provençal", type: "SPÉCIAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 8,  date: "2026-01-24", ville: "Saulieu", format: "DOUBLETTE", categorie: "Doublette 30% — Challenge Paulette JAMROZ", heure: "10h00", type: "CONCOURS", lat: ll("Saulieu")[0], lng: ll("Saulieu")[1] },
  { id: 9,  date: "2026-01-30", ville: "Drapeau", format: "TRIPLETTE", categorie: "Triplette Vétéran", type: "CONCOURS", lat: ll("Drapeau")[0], lng: ll("Drapeau")[1] },
  { id: 10, date: "2026-01-31", ville: "Drapeau", format: "TRIPLETTE", categorie: "Concours Régional — Triplette", type: "RÉGIONAL", lat: ll("Drapeau")[0], lng: ll("Drapeau")[1] },

  // ══════════════ FÉVRIER 2026 ══════════════
  { id: 11, date: "2026-02-01", ville: "Drapeau", format: "DOUBLETTE", categorie: "Concours Régional + Doublette Mixte", type: "RÉGIONAL", lat: ll("Drapeau")[0], lng: ll("Drapeau")[1] },
  { id: 12, date: "2026-02-06", ville: "Marsannay-la-Côte", format: "AUTRE", categorie: "Mucoviscidose — 4 parties 19h", heure: "19h00", type: "CONCOURS", lat: ll("Marsannay-la-Côte")[0], lng: ll("Marsannay-la-Côte")[1] },
  { id: 13, date: "2026-02-07", ville: "Gresilles", format: "TRIPLETTE", categorie: "Triplette 40%", heure: "14h00", type: "CONCOURS", lat: ll("Gresilles")[0], lng: ll("Gresilles")[1] },
  { id: 14, date: "2026-02-07", ville: "Saulieu", format: "DOUBLETTE", categorie: "Doublette 30%", heure: "10h00", type: "CONCOURS", lat: ll("Saulieu")[0], lng: ll("Saulieu")[1] },
  { id: 15, date: "2026-02-08", ville: "Gresilles", format: "TRIPLETTE", categorie: "Triplette Mixte 30%", heure: "10h00", type: "CONCOURS", lat: ll("Gresilles")[0], lng: ll("Gresilles")[1] },
  { id: 16, date: "2026-02-10", ville: "Genlis", format: "TRIPLETTE", categorie: "Triplette — Challenge Battini", lieu: "Boulodrome", type: "CONCOURS", lat: ll("Genlis")[0], lng: ll("Genlis")[1] },
  { id: 17, date: "2026-02-14", dateFin: "2026-02-15", ville: "Dijon", format: "DOUBLETTE", categorie: "Marathon Féminin", lieu: "Boulodrome Dijon", type: "CONCOURS", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 18, date: "2026-02-21", ville: "Dijon", format: "AUTRE", categorie: "CDC Jeu Provençal", lieu: "Boulodrome Dijon", type: "SPÉCIAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 19, date: "2026-02-21", ville: "Saulieu", format: "DOUBLETTE", categorie: "Doublette 30% — Challenge Gino DE ZAN et Denis CALLABRE", heure: "10h00", type: "CONCOURS", lat: ll("Saulieu")[0], lng: ll("Saulieu")[1] },
  { id: 20, date: "2026-02-28", ville: "Saulieu", format: "DOUBLETTE", categorie: "Doublette Mixte 30%", heure: "10h00", type: "CONCOURS", lat: ll("Saulieu")[0], lng: ll("Saulieu")[1] },

  // ══════════════ MARS 2026 ══════════════
  { id: 21, date: "2026-03-07", ville: "Pontailler-sur-Saône", format: "DOUBLETTE", categorie: "Doublette 30% — Challenge Robert Edouard dit Mimile", type: "CONCOURS", lat: ll("Pontailler-sur-Saône")[0], lng: ll("Pontailler-sur-Saône")[1] },
  { id: 22, date: "2026-03-07", ville: "Dijon", format: "AUTRE", categorie: "Championnat Individuel Jeune", lieu: "Boulodrome", type: "CHAMPIONNAT", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 23, date: "2026-03-07", ville: "Châtillon-sur-Seine", format: "TRIPLETTE", categorie: "Triplette 30% — Boulodrome Fernand GRAPIN", type: "CONCOURS", lat: ll("Châtillon-sur-Seine")[0], lng: ll("Châtillon-sur-Seine")[1] },
  { id: 24, date: "2026-03-08", ville: "Dijon", format: "DOUBLETTE", categorie: "Championnat Doublette Jeune", lieu: "Boulodrome", type: "CHAMPIONNAT", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 25, date: "2026-03-14", ville: "Beaune", format: "TRIPLETTE", categorie: "Triplette 30% — Challenge Chabrost", heure: "10h00", type: "CONCOURS", lat: ll("Beaune")[0], lng: ll("Beaune")[1] },
  { id: 26, date: "2026-03-14", ville: "Dijon", format: "AUTRE", categorie: "USCVL Doublette Mixte et Individuel 40%", type: "CONCOURS", lat: ll("USCVL")[0], lng: ll("USCVL")[1] },
  { id: 27, date: "2026-03-21", dateFin: "2026-03-22", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "Championnat Dép. Triplette Sénior Promotion", type: "CHAMPIONNAT", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 28, date: "2026-03-28", dateFin: "2026-03-29", ville: "Côte-d'Or", format: "AUTRE", categorie: "Championnat Dép. Doublette Sénior Féminin + Individuel Sénior Masculin", type: "CHAMPIONNAT", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },

  // ══════════════ AVRIL 2026 ══════════════
  { id: 29, date: "2026-04-04", dateFin: "2026-04-05", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "Championnat Dép. Triplette Jeu Provençal", type: "CHAMPIONNAT", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 30, date: "2026-04-06", ville: "Côte-d'Or", format: "AUTRE", categorie: "Coupe de France 1er et 2ème tour + 1er tour Coupe de Côte-d'Or", type: "SPÉCIAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 31, date: "2026-04-11", dateFin: "2026-04-12", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "Championnat Dép. Triplette Sénior Féminin + Triplette Sénior Masculin", type: "CHAMPIONNAT", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 32, date: "2026-04-14", ville: "Fontaine-lès-Dijon", format: "DOUBLETTE", categorie: "Doublette Vétéran", heure: "14h30", type: "CONCOURS", lat: ll("Fontaine-lès-Dijon")[0], lng: ll("Fontaine-lès-Dijon")[1] },
  { id: 33, date: "2026-04-17", ville: "Fenay", format: "TRIPLETTE", categorie: "Triplette Vétéran 40%", heure: "9h00", type: "CONCOURS", lat: ll("Fenay")[0], lng: ll("Fenay")[1] },
  { id: 34, date: "2026-04-18", dateFin: "2026-04-19", ville: "Côte-d'Or", format: "AUTRE", categorie: "Championnat Dép. Doublette Sénior Mixte + Triplette Jeunes", type: "CHAMPIONNAT", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 35, date: "2026-04-22", dateFin: "2026-04-23", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "Championnat Dép. Triplette Vétérans", type: "CHAMPIONNAT", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 36, date: "2026-04-25", dateFin: "2026-04-26", ville: "Côte-d'Or", format: "AUTRE", categorie: "Championnat Dép. Individuel Sénior Féminin + Doublette Sénior Masculin", type: "CHAMPIONNAT", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 37, date: "2026-04-25", ville: "Longvic", format: "TRIPLETTE", categorie: "Triplette A/B/C 30% — Challenge Casa", type: "CONCOURS", lat: ll("Longvic")[0], lng: ll("Longvic")[1] },
  { id: 38, date: "2026-04-28", ville: "Neuilly-lès-Dijon", format: "DOUBLETTE", categorie: "Doublette Vétéran 4 Parties", heure: "14h00", type: "CONCOURS", lat: ll("Neuilly-lès-Dijon")[0], lng: ll("Neuilly-lès-Dijon")[1] },

  // ══════════════ MAI 2026 ══════════════
  { id: 39, date: "2026-05-01", ville: "Côte-d'Or", format: "AUTRE", categorie: "Coupe de France 3ème tour + Coupe de Côte-d'Or 2ème et 3ème tours", type: "SPÉCIAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 40, date: "2026-05-02", dateFin: "2026-05-03", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "Championnat Dép. Triplette Sénior Mixte", type: "CHAMPIONNAT", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 41, date: "2026-05-09", dateFin: "2026-05-10", ville: "Côte-d'Or", format: "DOUBLETTE", categorie: "Championnat Dép. Doublette Jeu Provençal", type: "CHAMPIONNAT", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 42, date: "2026-05-09", ville: "Neuilly-lès-Dijon", format: "DOUBLETTE", categorie: "Doublette 30% A/B/C", heure: "10h00", type: "CONCOURS", lat: ll("Neuilly-lès-Dijon")[0], lng: ll("Neuilly-lès-Dijon")[1] },
  { id: 43, date: "2026-05-13", ville: "Savouges", format: "DOUBLETTE", categorie: "Doublette 30%", heure: "19h00", type: "CONCOURS", lat: ll("Savouges")[0], lng: ll("Savouges")[1] },
  { id: 44, date: "2026-05-14", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "BFC Triplette Jeunes", type: "RÉGIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 45, date: "2026-05-15", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "BFC Triplette Vétéran", type: "RÉGIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 46, date: "2026-05-16", ville: "Montbard", format: "DOUBLETTE", categorie: "Doublette 40% — Challenge Hélène CORCIN", type: "CONCOURS", lat: ll("Montbard")[0], lng: ll("Montbard")[1] },
  { id: 47, date: "2026-05-16", dateFin: "2026-05-17", ville: "Côte-d'Or", format: "DOUBLETTE", categorie: "BFC Doublette Sénior Mixte", type: "RÉGIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 48, date: "2026-05-23", ville: "Semur-en-Auxois", format: "DOUBLETTE", categorie: "Doublette 30%", type: "CONCOURS", lat: ll("Semur-en-Auxois")[0], lng: ll("Semur-en-Auxois")[1] },
  { id: 49, date: "2026-05-23", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "BFC Triplette Sénior Promotion", type: "RÉGIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 50, date: "2026-05-24", ville: "Comblanchien", format: "DOUBLETTE", categorie: "Doublette 30% — Challenge CIGIS", heure: "10h00", type: "CONCOURS", lat: ll("Comblanchien")[0], lng: ll("Comblanchien")[1] },
  { id: 51, date: "2026-05-24", ville: "Côte-d'Or", format: "AUTRE", categorie: "BFC Doublette Sénior Masculin + Individuel Sénior Féminin + Tir Jeunes", type: "RÉGIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 52, date: "2026-05-25", ville: "Côte-d'Or", format: "AUTRE", categorie: "BFC Doublette Sénior Féminin + Individuel Sénior Masculin", type: "RÉGIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 53, date: "2026-05-30", ville: "Nolay", format: "DOUBLETTE", categorie: "Doublette 50% — Challenge Claudette LEBAULT", type: "CONCOURS", lat: ll("Nolay")[0], lng: ll("Nolay")[1] },
  { id: 54, date: "2026-05-30", ville: "Comblanchien", format: "DOUBLETTE", categorie: "Doublette 30% + Challenge Tintin — St Rémy", type: "CONCOURS", lat: ll("Comblanchien")[0], lng: ll("Comblanchien")[1] },
  { id: 55, date: "2026-05-30", dateFin: "2026-05-31", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "BFC Triplette Jeu Provençal", type: "RÉGIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },

  // ══════════════ JUIN 2026 ══════════════
  { id: 56, date: "2026-06-02", ville: "Dijon", format: "TRIPLETTE", categorie: "Triplette Vétéran 60% — limité 64 équipes", heure: "9h00", lieu: "ASPTT Dijon", type: "CONCOURS", lat: ll("ASPTT Dijon")[0], lng: ll("ASPTT Dijon")[1] },
  { id: 57, date: "2026-06-06", ville: "Pagny-le-Château", format: "DOUBLETTE", categorie: "Doublette 50% — Challenge Pascal BOS PP/AB — limité 64", heure: "14h00", type: "CONCOURS", lat: ll("Pagny-le-Château")[0], lng: ll("Pagny-le-Château")[1] },
  { id: 58, date: "2026-06-06", ville: "Dijon", format: "DOUBLETTE", categorie: "USCVL Doublette 40% — Challenge Didier REMOND", type: "CONCOURS", lat: ll("USCVL")[0], lng: ll("USCVL")[1] },
  { id: 59, date: "2026-06-06", dateFin: "2026-06-07", ville: "Côte-d'Or", format: "DOUBLETTE", categorie: "BFC Doublette Jeu Provençal", type: "RÉGIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 60, date: "2026-06-07", ville: "Marsannay-la-Côte", format: "DOUBLETTE", categorie: "Doublette 40% — Challenge Jérôme DURIER", type: "CONCOURS", lat: ll("Marsannay-la-Côte")[0], lng: ll("Marsannay-la-Côte")[1] },
  { id: 61, date: "2026-06-12", ville: "Marsannay-la-Côte", format: "TRIPLETTE", categorie: "Triplette Vétéran 40% — Challenge Daniel HENRY", heure: "10h00", type: "CONCOURS", lat: ll("Marsannay-la-Côte")[0], lng: ll("Marsannay-la-Côte")[1] },
  { id: 62, date: "2026-06-13", ville: "Longvic", format: "TRIPLETTE", categorie: "Triplette 30% — Challenge Alain BOSSU A/B/C", type: "CONCOURS", lat: ll("Longvic")[0], lng: ll("Longvic")[1] },
  { id: 63, date: "2026-06-13", ville: "Aignay-le-Duc", format: "DOUBLETTE", categorie: "Doublette 30%", heure: "10h00", type: "CONCOURS", lat: ll("Aignay-le-Duc")[0], lng: ll("Aignay-le-Duc")[1] },
  { id: 64, date: "2026-06-20", ville: "Fenay", format: "DOUBLETTE", categorie: "Doublette mises +1100€ — limité 200 équipes par poules", heure: "9h00", type: "CONCOURS", lat: ll("Fenay")[0], lng: ll("Fenay")[1] },
  { id: 65, date: "2026-06-20", ville: "Fenay", format: "DOUBLETTE", categorie: "Doublette Féminin 40% par poule + Individuel 30% — St Rémy", heure: "9h00", type: "CONCOURS", lat: ll("Fenay")[0], lng: ll("Fenay")[1] },
  { id: 66, date: "2026-06-20", dateFin: "2026-06-21", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "France Triplette Sénior Masculin + Féminin", type: "NATIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 67, date: "2026-06-26", ville: "Précy-sous-Thil", format: "DOUBLETTE", categorie: "Doublette 40% — Challenge STRADI", heure: "19h00", type: "CONCOURS", lat: ll("Précy-sous-Thil")[0], lng: ll("Précy-sous-Thil")[1] },
  { id: 68, date: "2026-06-27", ville: "Sainte-Colombe-sur-Seine", format: "DOUBLETTE", categorie: "Grand Prix Doublette +750€ — limité 128 équipes", heure: "10h00", type: "CONCOURS", lat: ll("Sainte-Colombe-sur-Seine")[0], lng: ll("Sainte-Colombe-sur-Seine")[1] },
  { id: 69, date: "2026-06-27", dateFin: "2026-06-28", ville: "Côte-d'Or", format: "DOUBLETTE", categorie: "France Doublette Sénior Masculin", type: "NATIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 70, date: "2026-06-28", ville: "Longvic", format: "DOUBLETTE", categorie: "Doublette 30% A/B/C", type: "CONCOURS", lat: ll("Longvic")[0], lng: ll("Longvic")[1] },

  // ══════════════ JUILLET 2026 ══════════════
  { id: 71, date: "2026-07-03", dateFin: "2026-07-05", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "France Triplette Jeu Provençal", type: "NATIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 72, date: "2026-07-04", ville: "Beaune", format: "TRIPLETTE", categorie: "Triplette 30% — Challenge Titi Pranovi", heure: "10h00", type: "CONCOURS", lat: ll("Beaune")[0], lng: ll("Beaune")[1] },
  { id: 73, date: "2026-07-04", ville: "Semur-en-Auxois", format: "DOUBLETTE", categorie: "Doublette 30%", type: "CONCOURS", lat: ll("Semur-en-Auxois")[0], lng: ll("Semur-en-Auxois")[1] },
  { id: 74, date: "2026-07-10", ville: "Côte-d'Or", format: "AUTRE", categorie: "France Tir de Précision Junior", type: "NATIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 75, date: "2026-07-11", dateFin: "2026-07-12", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "France Triplette Jeunes", type: "NATIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 76, date: "2026-07-11", ville: "Montbard", format: "DOUBLETTE", categorie: "Doublette 40% — Challenge Georges CORCIN", type: "CONCOURS", lat: ll("Montbard")[0], lng: ll("Montbard")[1] },
  { id: 77, date: "2026-07-18", dateFin: "2026-07-19", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "France Triplette Sénior Mixte", type: "NATIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 78, date: "2026-07-18", ville: "Clenay", format: "DOUBLETTE", categorie: "Doublette 35% A/B/C", type: "CONCOURS", lat: ll("Clenay")[0], lng: ll("Clenay")[1] },
  { id: 79, date: "2026-07-18", ville: "Aignay-le-Duc", format: "TRIPLETTE", categorie: "Triplette 30% — Challenge Rémy DELERY", heure: "10h00", type: "CONCOURS", lat: ll("Aignay-le-Duc")[0], lng: ll("Aignay-le-Duc")[1] },
  { id: 80, date: "2026-07-25", dateFin: "2026-07-26", ville: "Côte-d'Or", format: "AUTRE", categorie: "France Doublette Sénior Féminin + Individuel Sénior Masculin", type: "NATIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 81, date: "2026-07-25", ville: "Saint-Rémy", format: "DOUBLETTE", categorie: "Doublette 30% — Challenge Nious", type: "CONCOURS", lat: ll("Saint-Rémy")[0], lng: ll("Saint-Rémy")[1] },

  // ══════════════ AOÛT 2026 ══════════════
  { id: 82, date: "2026-08-01", ville: "Saint-Rémy", format: "DOUBLETTE", categorie: "Doublette 30%", type: "CONCOURS", lat: ll("Saint-Rémy")[0], lng: ll("Saint-Rémy")[1] },
  { id: 83, date: "2026-08-08", ville: "Sainte-Colombe-sur-Seine", format: "DOUBLETTE", categorie: "Doublette 30%", type: "CONCOURS", lat: ll("Sainte-Colombe-sur-Seine")[0], lng: ll("Sainte-Colombe-sur-Seine")[1] },
  { id: 84, date: "2026-08-15", ville: "Montbard", format: "DOUBLETTE", categorie: "Prix de la Ville — Doublette mises +1000€", heure: "10h00", type: "CONCOURS", lat: ll("Montbard")[0], lng: ll("Montbard")[1] },
  { id: 85, date: "2026-08-19", dateFin: "2026-08-20", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "France Triplette Vétéran", type: "NATIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 86, date: "2026-08-22", dateFin: "2026-08-23", ville: "Côte-d'Or", format: "TRIPLETTE", categorie: "France Triplette Sénior Promotion", type: "NATIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 87, date: "2026-08-22", ville: "Beaune", format: "DOUBLETTE", categorie: "Doublette 30% — Challenge René Barlet", heure: "10h00", type: "CONCOURS", lat: ll("Beaune")[0], lng: ll("Beaune")[1] },
  { id: 88, date: "2026-08-29", dateFin: "2026-08-30", ville: "Côte-d'Or", format: "AUTRE", categorie: "France Individuel Sénior Féminin + Doublette Sénior Masculin", type: "NATIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },

  // ══════════════ SEPTEMBRE 2026 ══════════════
  { id: 89, date: "2026-09-04", dateFin: "2026-09-06", ville: "Venarey-les-Laumes", format: "AUTRE", categorie: "National Venarey", type: "NATIONAL", lat: ll("Venarey-les-Laumes")[0], lng: ll("Venarey-les-Laumes")[1] },
  { id: 90, date: "2026-09-04", dateFin: "2026-09-06", ville: "Côte-d'Or", format: "DOUBLETTE", categorie: "France Doublette Jeu Provençal", type: "NATIONAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 91, date: "2026-09-05", ville: "Dijon", format: "DOUBLETTE", categorie: "USCVL Doublette Mixte 50%", heure: "16h00", type: "CONCOURS", lat: ll("USCVL")[0], lng: ll("USCVL")[1] },
  { id: 92, date: "2026-09-12", ville: "Pontailler-sur-Saône", format: "DOUBLETTE", categorie: "Doublette 30%", type: "CONCOURS", lat: ll("Pontailler-sur-Saône")[0], lng: ll("Pontailler-sur-Saône")[1] },
  { id: 93, date: "2026-09-12", ville: "Châtillon-sur-Seine", format: "DOUBLETTE", categorie: "Doublette 30% — Boulodrome Fernand GRAPIN", type: "CONCOURS", lat: ll("Châtillon-sur-Seine")[0], lng: ll("Châtillon-sur-Seine")[1] },
  { id: 94, date: "2026-09-19", ville: "Marsannay-la-Côte", format: "TRIPLETTE", categorie: "Triplette Mixte 30%", type: "CONCOURS", lat: ll("Marsannay-la-Côte")[0], lng: ll("Marsannay-la-Côte")[1] },
  { id: 95, date: "2026-09-19", ville: "Sainte-Colombe-sur-Seine", format: "DOUBLETTE", categorie: "Doublette 30% — Challenge JP SERRÉ", type: "CONCOURS", lat: ll("Sainte-Colombe-sur-Seine")[0], lng: ll("Sainte-Colombe-sur-Seine")[1] },
  { id: 96, date: "2026-09-25", ville: "Dijon", format: "DOUBLETTE", categorie: "Grand Prix Jean Charles Doublette", type: "CONCOURS", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },

  // ══════════════ OCTOBRE 2026 ══════════════
  { id: 99,  date: "2026-10-03", ville: "Saint-Rémy", format: "DOUBLETTE", categorie: "Doublette 30%", type: "CONCOURS", lat: ll("Saint-Rémy")[0], lng: ll("Saint-Rémy")[1] },
  { id: 100, date: "2026-10-10", ville: "Dijon", format: "AUTRE", categorie: "Challenge Comité", type: "SPÉCIAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 101, date: "2026-10-11", ville: "Dijon", format: "DOUBLETTE", categorie: "Marathon Féminin", type: "CONCOURS", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 102, date: "2026-10-24", dateFin: "2026-10-25", ville: "Côte-d'Or", format: "AUTRE", categorie: "Grand Prix Jeu Provençal", type: "CONCOURS", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },

  // ══════════════ NOVEMBRE 2026 ══════════════
  { id: 103, date: "2026-11-14", dateFin: "2026-11-15", ville: "Côte-d'Or", format: "AUTRE", categorie: "Phases finales CDC", type: "SPÉCIAL", lat: ll("Dijon")[0], lng: ll("Dijon")[1] },
  { id: 104, date: "2026-11-21", ville: "Dijon", format: "TRIPLETTE", categorie: "Triplette ASPTT 40%", heure: "10h00", lieu: "ASPTT Dijon", type: "CONCOURS", lat: ll("ASPTT Dijon")[0], lng: ll("ASPTT Dijon")[1] },
  { id: 105, date: "2026-11-22", ville: "Dijon", format: "TRIPLETTE", categorie: "Triplette Mixte ASPTT 30%", heure: "10h00", lieu: "ASPTT Dijon", type: "CONCOURS", lat: ll("ASPTT Dijon")[0], lng: ll("ASPTT Dijon")[1] },

  // ══════════════ DÉCEMBRE 2026 ══════════════
  { id: 106, date: "2026-12-05", ville: "Gresilles", format: "TRIPLETTE", categorie: "Triplette 40%", heure: "14h00", type: "CONCOURS", lat: ll("Gresilles")[0], lng: ll("Gresilles")[1] },
  { id: 107, date: "2026-12-06", ville: "Gresilles", format: "TRIPLETTE", categorie: "Triplette Mixte 30%", heure: "10h00", type: "CONCOURS", lat: ll("Gresilles")[0], lng: ll("Gresilles")[1] },
  { id: 108, date: "2026-12-11", ville: "Drapeau", format: "TRIPLETTE", categorie: "Triplette Vétéran 40%", heure: "14h00", type: "CONCOURS", lat: ll("Drapeau")[0], lng: ll("Drapeau")[1] },
  { id: 109, date: "2026-12-12", ville: "Drapeau", format: "TRIPLETTE", categorie: "Triplette Sénior 50% — Challenge Daniel DUPONT", type: "CONCOURS", lat: ll("Drapeau")[0], lng: ll("Drapeau")[1] },
  { id: 110, date: "2026-12-13", ville: "Drapeau", format: "TRIPLETTE", categorie: "Triplette Mixte 40% — Challenge Eric VAUZELLE", type: "CONCOURS", lat: ll("Drapeau")[0], lng: ll("Drapeau")[1] },
  { id: 111, date: "2026-12-19", ville: "Le Lac", format: "TRIPLETTE", categorie: "Triplette 30%", heure: "10h00", type: "CONCOURS", lat: ll("Le Lac")[0], lng: ll("Le Lac")[1] },
  { id: 112, date: "2026-12-20", ville: "Le Lac", format: "TRIPLETTE", categorie: "Triplette Mixte 40%", heure: "10h00", type: "CONCOURS", lat: ll("Le Lac")[0], lng: ll("Le Lac")[1] },
];
