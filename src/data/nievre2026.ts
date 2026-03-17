// Calendrier complet des concours du département Nièvre (58) - 2026
// Extrait du Calendrier FFPJP CD58 2026 - Comité de Pétanque de la Nièvre

export type TypeFormat = "TRIPLETTE" | "DOUBLETTE" | "TÊTE À TÊTE" | "ENDURO" | "AUTRE";

export interface ConcourNievre {
  id: number;
  date: string;
  dateFin?: string;
  ville: string;
  lieu?: string;
  club: string;
  format: TypeFormat;
  categorie: string;
  info?: string;
  lat: number;
  lng: number;
  type: "CONCOURS" | "CHAMPIONNAT" | "RÉGIONAL" | "NATIONAL" | "SPÉCIAL";
}

const COORDS: Record<string, [number, number]> = {
  "Nevers": [46.9897, 3.1572],
  "Cosne-sur-Loire": [47.4097, 2.9261],
  "Clamecy": [47.4614, 3.5181],
  "La Charité-sur-Loire": [47.1764, 3.0147],
  "Decize": [46.8344, 3.4622],
  "La Machine": [46.8931, 3.4631],
  "Imphy": [46.9197, 3.2669],
  "Fourchambault": [47.0103, 3.1019],
  "Varennes-Vauzelles": [47.0119, 3.1461],
  "Challuy": [46.9525, 3.1231],
  "Marzy": [46.9914, 3.0906],
  "Coulanges-lès-Nevers": [46.9556, 3.1042],
  "Garchizy": [47.0072, 3.0881],
  "Guerigny": [47.0903, 3.1736],
  "Pougues-les-Eaux": [47.0717, 3.1006],
  "Saint-Pierre-le-Moutier": [46.7853, 3.1186],
  "Corbigny": [47.2558, 3.6839],
  "Donzy": [47.3822, 3.1272],
  "Premery": [47.1742, 3.3294],
  "Varzy": [47.3608, 3.3828],
  "La Ferté-Loupière": [47.8903, 3.1667],
  "Saint-Amand-en-Puisaye": [47.5278, 3.0706],
  "Raveau": [47.2414, 3.0314],
  "Neuvy-sur-Loire": [47.5311, 2.8894],
  "Garchy": [47.2878, 3.0086],
  "Saint-Éloi": [46.8931, 3.1906],
  "Saint-Honoré-les-Bains": [46.9028, 3.8536],
  "Cercy-la-Tour": [46.8597, 3.6417],
  "Luzy": [46.7872, 3.9683],
  "Millay": [46.8153, 4.0214],
  "Champvert": [46.8378, 3.5097],
  "Chatillon-en-Bazois": [47.0533, 3.6642],
  "Dornes": [46.7633, 3.3247],
  "Alligny-Cosne": [47.3806, 3.0628],
  "Ciez": [47.4358, 3.1672],
  "Saint-Benin-d'Azy": [46.9972, 3.3828],
  "Mesves-sur-Loire": [47.3397, 2.8864],
  "Fours": [46.8267, 3.6944],
  "Asav": [46.9897, 3.1572],
  "Luthenay-Uxeloup": [46.9806, 3.4231],
  "Cours": [47.4703, 3.0536],
  "Clamecy_boulodrome": [47.4614, 3.5181],
  "Gimouille": [47.0369, 3.0392],
  "Pouilly-sur-Loire": [47.2872, 2.9525],
};

function latLng(ville: string): [number, number] {
  return COORDS[ville] ?? [47.0, 3.15];
}

export const DEPT_NIEVRE = {
  nom: "Nièvre",
  code: "58",
  facebook: "https://www.facebook.com/share/1DXxdnV7P8/",
  site: "https://www.comite-petanque-nievre.fr/",
};

export const CONCOURS_NIEVRE_2026: ConcourNievre[] = [

  // ══════════════ JANVIER 2026 ══════════════
  { id: 1, date: "2026-01-04", ville: "Coulanges-lès-Nevers", club: "Coulanges Pétanque", format: "AUTRE", categorie: "Concours Privé", lat: latLng("Coulanges-lès-Nevers")[0], lng: latLng("Coulanges-lès-Nevers")[1], type: "CONCOURS" },
  { id: 2, date: "2026-01-10", ville: "Nevers", lieu: "Boulodrome", club: "CD58", format: "AUTRE", categorie: "Coupe d'hiver 14h", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CONCOURS" },
  { id: 3, date: "2026-01-17", ville: "Nevers", lieu: "Boulodrome", club: "CD58", format: "AUTRE", categorie: "Coupe d'hiver 14h", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CONCOURS" },
  { id: 4, date: "2026-01-18", ville: "Nevers", lieu: "Boulodrome", club: "CD58", format: "AUTRE", categorie: "Coupe d'hiver 14h", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CONCOURS" },
  { id: 5, date: "2026-01-24", ville: "Nevers", lieu: "Boulodrome", club: "CD58", format: "AUTRE", categorie: "Coupe d'hiver 14h", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CONCOURS" },
  { id: 6, date: "2026-01-25", ville: "Nevers", lieu: "Boulodrome", club: "CD58", format: "AUTRE", categorie: "Coupe d'hiver 14h", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CONCOURS" },
  { id: 7, date: "2026-01-31", ville: "Nevers", lieu: "Boulodrome", club: "CD58", format: "AUTRE", categorie: "Coupe d'hiver 14h", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CONCOURS" },

  // ══════════════ FÉVRIER 2026 ══════════════
  { id: 10, date: "2026-02-01", ville: "Nevers", lieu: "Boulodrome", club: "CD58", format: "AUTRE", categorie: "Coupe d'hiver 14h", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CONCOURS" },
  { id: 11, date: "2026-02-07", ville: "Nevers", lieu: "Boulodrome", club: "CD58", format: "AUTRE", categorie: "Coupe d'hiver 14h", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CONCOURS" },
  { id: 12, date: "2026-02-08", ville: "Nevers", lieu: "Boulodrome", club: "CD58", format: "AUTRE", categorie: "Finale Coupe d'hiver 8h30", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "SPÉCIAL" },
  { id: 13, date: "2026-02-14", ville: "Nevers", lieu: "Boulodrome", club: "CD58", format: "AUTRE", categorie: "CDC Jeu Provençal", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CHAMPIONNAT" },
  { id: 14, date: "2026-02-15", ville: "Nevers", lieu: "Boulodrome", club: "CD58", format: "AUTRE", categorie: "CDC Jeu Provençal", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CHAMPIONNAT" },
  { id: 15, date: "2026-02-28", ville: "La Charité-sur-Loire", club: "La Charité Pétanque", format: "TRIPLETTE", categorie: "Challenge Robert Maujonnet - Triplette", lat: latLng("La Charité-sur-Loire")[0], lng: latLng("La Charité-sur-Loire")[1], type: "SPÉCIAL" },

  // ══════════════ MARS 2026 ══════════════
  { id: 20, date: "2026-03-01", ville: "Nevers", lieu: "Boulodrome", club: "CD58", format: "DOUBLETTE", categorie: "Journée de la Femme - Doublette", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "SPÉCIAL" },
  { id: 21, date: "2026-03-01", ville: "Alligny-Cosne", club: "Alligny-Cosne Pétanque", format: "TRIPLETTE", categorie: "Triplette Mixte", lat: latLng("Alligny-Cosne")[0], lng: latLng("Alligny-Cosne")[1], type: "CONCOURS" },
  { id: 22, date: "2026-03-01", ville: "Decize", club: "Decize Pétanque", format: "TRIPLETTE", categorie: "Triplette Promotion", lat: latLng("Decize")[0], lng: latLng("Decize")[1], type: "CONCOURS" },
  { id: 23, date: "2026-03-05", ville: "Ciez", club: "Pétanque de Ciez", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Ciez")[0], lng: latLng("Ciez")[1], type: "CONCOURS" },
  { id: 24, date: "2026-03-07", ville: "Luthenay-Uxeloup", club: "Pétanque Luthenay", format: "TRIPLETTE", categorie: "Triplette", lat: latLng("Luthenay-Uxeloup")[0], lng: latLng("Luthenay-Uxeloup")[1], type: "CONCOURS" },
  { id: 25, date: "2026-03-07", ville: "Pouilly-sur-Loire", club: "Pouilly Pétanque", format: "TRIPLETTE", categorie: "Triplette", lat: latLng("Pouilly-sur-Loire")[0], lng: latLng("Pouilly-sur-Loire")[1], type: "CONCOURS" },
  { id: 26, date: "2026-03-08", ville: "La Machine", club: "La Machine Pétanque", format: "TRIPLETTE", categorie: "Triplette", lat: latLng("La Machine")[0], lng: latLng("La Machine")[1], type: "CONCOURS" },
  { id: 27, date: "2026-03-08", ville: "Corbigny", club: "Corbigny Pétanque", format: "TRIPLETTE", categorie: "Triplette Promotion", lat: latLng("Corbigny")[0], lng: latLng("Corbigny")[1], type: "CONCOURS" },
  { id: 28, date: "2026-03-12", ville: "Saint-Pierre-le-Moutier", club: "Saint-Pierroise Pétanque", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Saint-Pierre-le-Moutier")[0], lng: latLng("Saint-Pierre-le-Moutier")[1], type: "CONCOURS" },
  { id: 29, date: "2026-03-14", ville: "Chatillon-en-Bazois", club: "ACP Chatillon", format: "TRIPLETTE", categorie: "Triplette", lat: latLng("Chatillon-en-Bazois")[0], lng: latLng("Chatillon-en-Bazois")[1], type: "CONCOURS" },
  { id: 30, date: "2026-03-14", ville: "Chatillon-en-Bazois", club: "ACP Chatillon", format: "TRIPLETTE", categorie: "Triplette + 25%", info: "14h30", lat: latLng("Chatillon-en-Bazois")[0], lng: latLng("Chatillon-en-Bazois")[1], type: "CONCOURS" },
  { id: 31, date: "2026-03-19", ville: "Guerigny", club: "Guerigny Pétanque", format: "TRIPLETTE", categorie: "Triplette Vétéran", lat: latLng("Guerigny")[0], lng: latLng("Guerigny")[1], type: "CONCOURS" },
  { id: 32, date: "2026-03-21", ville: "Marzy", club: "CD58 - Championnat", format: "TRIPLETTE", categorie: "Chpt CD Triplette Promotion", lat: latLng("Marzy")[0], lng: latLng("Marzy")[1], type: "CHAMPIONNAT" },
  { id: 33, date: "2026-03-22", ville: "Marzy", club: "CD58 - Championnat", format: "TRIPLETTE", categorie: "Finale Chpt CD Triplette Promotion", lat: latLng("Marzy")[0], lng: latLng("Marzy")[1], type: "CHAMPIONNAT" },
  { id: 34, date: "2026-03-22", ville: "Coulanges-lès-Nevers", club: "Coulanges Pétanque", format: "TRIPLETTE", categorie: "Souvenir A. Blé - Triplette", lat: latLng("Coulanges-lès-Nevers")[0], lng: latLng("Coulanges-lès-Nevers")[1], type: "SPÉCIAL" },
  { id: 35, date: "2026-03-26", ville: "Millay", club: "Millay Pétanque", format: "TRIPLETTE", categorie: "Triplette Vétéran", lat: latLng("Millay")[0], lng: latLng("Millay")[1], type: "CONCOURS" },
  { id: 36, date: "2026-03-28", ville: "Nevers", club: "CD58 - Championnat Doublette Féminin", format: "DOUBLETTE", categorie: "Chpt CD Doublette Féminin", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CHAMPIONNAT" },
  { id: 37, date: "2026-03-28", ville: "Premery", club: "CD58 - Championnat Individuel Masculin Nord", format: "TÊTE À TÊTE", categorie: "Chpt CD Individuel Masculin - Nord", lat: latLng("Premery")[0], lng: latLng("Premery")[1], type: "CHAMPIONNAT" },
  { id: 38, date: "2026-03-28", ville: "Imphy", club: "CD58 - Championnat Individuel Masculin Sud", format: "TÊTE À TÊTE", categorie: "Chpt CD Individuel Masculin - Sud", lat: latLng("Imphy")[0], lng: latLng("Imphy")[1], type: "CHAMPIONNAT" },
  { id: 39, date: "2026-03-29", ville: "Nevers", club: "CD58 - Finale Championnat", format: "DOUBLETTE", categorie: "Finale Chpt CD Doublette Féminin", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CHAMPIONNAT" },
  { id: 40, date: "2026-03-29", ville: "Cercy-la-Tour", club: "Cercy Pétanque", format: "TRIPLETTE", categorie: "Triplette", lat: latLng("Cercy-la-Tour")[0], lng: latLng("Cercy-la-Tour")[1], type: "CONCOURS" },

  // ══════════════ AVRIL 2026 ══════════════
  { id: 50, date: "2026-04-02", ville: "Marzy", club: "Marzy Pétanque", format: "TRIPLETTE", categorie: "Triplette Vétéran", lat: latLng("Marzy")[0], lng: latLng("Marzy")[1], type: "CONCOURS" },
  { id: 51, date: "2026-04-04", ville: "Nevers", club: "CD58 - Triplette Jeu Provençal", format: "TRIPLETTE", categorie: "Chpt CD Triplette Jeu Provençal", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CHAMPIONNAT" },
  { id: 52, date: "2026-04-04", ville: "Challuy", club: "Challuy-Sermoise Pétanque", format: "TRIPLETTE", categorie: "Triplette Jeunes", lat: latLng("Challuy")[0], lng: latLng("Challuy")[1], type: "CONCOURS" },
  { id: 53, date: "2026-04-04", ville: "Millay", club: "Millay Pétanque", format: "TRIPLETTE", categorie: "Triplette", lat: latLng("Millay")[0], lng: latLng("Millay")[1], type: "CONCOURS" },
  { id: 54, date: "2026-04-05", ville: "Nevers", club: "CD58 - Finale Jeu Provençal", format: "TRIPLETTE", categorie: "Finale Chpt CD Triplette Jeu Provençal", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CHAMPIONNAT" },
  { id: 55, date: "2026-04-09", ville: "Pougues-les-Eaux", club: "Pétillante Pétanque Pouguoise", format: "TRIPLETTE", categorie: "Triplette Vétéran", info: "14h", lat: latLng("Pougues-les-Eaux")[0], lng: latLng("Pougues-les-Eaux")[1], type: "CONCOURS" },
  { id: 56, date: "2026-04-11", ville: "Marzy", club: "CD58 - Championnat Triplette Séniors Masculin", format: "TRIPLETTE", categorie: "Chpt CD Triplette Séniors Masculin", lat: latLng("Marzy")[0], lng: latLng("Marzy")[1], type: "CHAMPIONNAT" },
  { id: 57, date: "2026-04-11", ville: "Guerigny", club: "CD58 - Championnat Triplette Séniors Féminin", format: "TRIPLETTE", categorie: "Chpt CD Triplette Séniors Féminin", lat: latLng("Guerigny")[0], lng: latLng("Guerigny")[1], type: "CHAMPIONNAT" },
  { id: 58, date: "2026-04-12", ville: "Marzy", club: "CD58 - Finale Triplette Séniors Masculin", format: "TRIPLETTE", categorie: "Finale Chpt CD Triplette Séniors Masculin", lat: latLng("Marzy")[0], lng: latLng("Marzy")[1], type: "CHAMPIONNAT" },
  { id: 59, date: "2026-04-16", ville: "Chatillon-en-Bazois", club: "ACP Chatillon", format: "TRIPLETTE", categorie: "Triplette Vétéran", info: "Doublettes vétérans + 25% - 14h", lat: latLng("Chatillon-en-Bazois")[0], lng: latLng("Chatillon-en-Bazois")[1], type: "CONCOURS" },
  { id: 60, date: "2026-04-18", ville: "Guerigny", club: "CD58 - Doublette Séniors Mixte Nord", format: "DOUBLETTE", categorie: "Chpt CD Doublette Séniors Mixte - Nord", lat: latLng("Guerigny")[0], lng: latLng("Guerigny")[1], type: "CHAMPIONNAT" },
  { id: 61, date: "2026-04-18", ville: "Decize", club: "CD58 - Doublette Séniors Mixte Sud", format: "DOUBLETTE", categorie: "Chpt CD Doublette Séniors Mixte - Sud", lat: latLng("Decize")[0], lng: latLng("Decize")[1], type: "CHAMPIONNAT" },
  { id: 62, date: "2026-04-19", ville: "Champvert", club: "CD58 - Finale Doublette Séniors Mixte", format: "DOUBLETTE", categorie: "Finale Chpt CD Doublette Séniors Mixte", lat: latLng("Champvert")[0], lng: latLng("Champvert")[1], type: "CHAMPIONNAT" },
  { id: 63, date: "2026-04-22", ville: "Marzy", club: "CD58 - Championnat Triplette Vétérans", format: "TRIPLETTE", categorie: "Chpt CD Triplette Vétérans", lat: latLng("Marzy")[0], lng: latLng("Marzy")[1], type: "CHAMPIONNAT" },
  { id: 64, date: "2026-04-23", ville: "Marzy", club: "CD58 - Finale Triplette Vétérans", format: "TRIPLETTE", categorie: "Finale Chpt CD Triplette Vétérans", lat: latLng("Marzy")[0], lng: latLng("Marzy")[1], type: "CHAMPIONNAT" },
  { id: 65, date: "2026-04-25", ville: "Cosne-sur-Loire", club: "CD58 - Doublette Séniors Masculin Nord", format: "DOUBLETTE", categorie: "Chpt CD Doublette Séniors Masculin - Nord", lat: latLng("Cosne-sur-Loire")[0], lng: latLng("Cosne-sur-Loire")[1], type: "CHAMPIONNAT" },
  { id: 66, date: "2026-04-25", ville: "Decize", club: "CD58 - Doublette Séniors Masculin Sud", format: "DOUBLETTE", categorie: "Chpt CD Doublette Séniors Masculin - Sud", lat: latLng("Decize")[0], lng: latLng("Decize")[1], type: "CHAMPIONNAT" },
  { id: 67, date: "2026-04-25", ville: "Coulanges-lès-Nevers", club: "CD58 - Individuel Féminin", format: "TÊTE À TÊTE", categorie: "Chpt CD Individuel Féminin", lat: latLng("Coulanges-lès-Nevers")[0], lng: latLng("Coulanges-lès-Nevers")[1], type: "CHAMPIONNAT" },
  { id: 68, date: "2026-04-26", ville: "Coulanges-lès-Nevers", club: "CD58 - Finale Doublette Séniors Masculin", format: "DOUBLETTE", categorie: "Finale Chpt CD Doublette Séniors Masculin", lat: latLng("Coulanges-lès-Nevers")[0], lng: latLng("Coulanges-lès-Nevers")[1], type: "CHAMPIONNAT" },
  { id: 69, date: "2026-04-30", ville: "Cours", club: "Cours Pétanque", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Cours")[0], lng: latLng("Cours")[1], type: "CONCOURS" },

  // ══════════════ MAI 2026 ══════════════
  { id: 70, date: "2026-05-01", ville: "Marzy", club: "ASGU Pétanque Urzy", format: "TRIPLETTE", categorie: "Challenge Jacky Leguevelle - Triplette", info: "Terrain Pétanque Urzy", lat: latLng("Marzy")[0], lng: latLng("Marzy")[1], type: "SPÉCIAL" },
  { id: 71, date: "2026-05-02", ville: "Fours", club: "CD58 - Triplette Séniors Mixte", format: "TRIPLETTE", categorie: "Chpt CD Triplette Séniors Mixte", lat: latLng("Fours")[0], lng: latLng("Fours")[1], type: "CHAMPIONNAT" },
  { id: 72, date: "2026-05-03", ville: "Fours", club: "CD58 - Finale Triplette Séniors Mixte", format: "TRIPLETTE", categorie: "Finale Chpt CD Triplette Séniors Mixte", lat: latLng("Fours")[0], lng: latLng("Fours")[1], type: "CHAMPIONNAT" },
  { id: 73, date: "2026-05-07", ville: "Corbigny", club: "Corbigny Pétanque", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Corbigny")[0], lng: latLng("Corbigny")[1], type: "CONCOURS" },
  { id: 74, date: "2026-05-08", ville: "Saint-Amand-en-Puisaye", club: "Pétanque St-Amand", format: "TRIPLETTE", categorie: "En mémoire de F. Lenormand - Triplette", lat: latLng("Saint-Amand-en-Puisaye")[0], lng: latLng("Saint-Amand-en-Puisaye")[1], type: "SPÉCIAL" },
  { id: 75, date: "2026-05-09", ville: "Decize", club: "Decize Pétanque", format: "DOUBLETTE", categorie: "Doublette Mixte", lat: latLng("Decize")[0], lng: latLng("Decize")[1], type: "CONCOURS" },
  { id: 76, date: "2026-05-14", ville: "Millay", club: "Millay Pétanque", format: "DOUBLETTE", categorie: "Doublette", lat: latLng("Millay")[0], lng: latLng("Millay")[1], type: "CONCOURS" },
  { id: 77, date: "2026-05-16", ville: "Champvert", club: "Champvert Pétanque", format: "TRIPLETTE", categorie: "Triplette Mixte", lat: latLng("Champvert")[0], lng: latLng("Champvert")[1], type: "CONCOURS" },
  { id: 78, date: "2026-05-16", ville: "La Charité-sur-Loire", club: "La Charité Pétanque", format: "DOUBLETTE", categorie: "Doublette Provençal", lat: latLng("La Charité-sur-Loire")[0], lng: latLng("La Charité-sur-Loire")[1], type: "CONCOURS" },
  { id: 79, date: "2026-05-17", ville: "Coulanges-lès-Nevers", club: "Coulanges Pétanque", format: "DOUBLETTE", categorie: "Doublette Provençal", lat: latLng("Coulanges-lès-Nevers")[0], lng: latLng("Coulanges-lès-Nevers")[1], type: "CONCOURS" },
  { id: 80, date: "2026-05-21", ville: "Saint-Amand-en-Puisaye", club: "Pétanque St-Amand", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Saint-Amand-en-Puisaye")[0], lng: latLng("Saint-Amand-en-Puisaye")[1], type: "CONCOURS" },
  { id: 81, date: "2026-05-23", ville: "Donzy", club: "ES Donzy Pétanque", format: "TRIPLETTE", categorie: "Triplette", lat: latLng("Donzy")[0], lng: latLng("Donzy")[1], type: "CONCOURS" },
  { id: 82, date: "2026-05-23", ville: "Dornes", club: "Dornes Pétanque", format: "TRIPLETTE", categorie: "Triplette", lat: latLng("Dornes")[0], lng: latLng("Dornes")[1], type: "CONCOURS" },
  { id: 83, date: "2026-05-25", ville: "Imphy", club: "SC Imphy Pétanque", format: "TRIPLETTE", categorie: "Challenge Jérémy Blondeau - Triplette", info: "Limité 128 équipes, 3 concours ABC - lundi 25 mai", lat: latLng("Imphy")[0], lng: latLng("Imphy")[1], type: "SPÉCIAL" },
  { id: 84, date: "2026-05-28", ville: "Saint-Honoré-les-Bains", club: "Pétanque St-Honoré", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Saint-Honoré-les-Bains")[0], lng: latLng("Saint-Honoré-les-Bains")[1], type: "CONCOURS" },
  { id: 85, date: "2026-05-30", ville: "Guerigny", club: "Guerigny Pétanque", format: "TRIPLETTE", categorie: "Triplette", lat: latLng("Guerigny")[0], lng: latLng("Guerigny")[1], type: "CONCOURS" },
  { id: 86, date: "2026-05-30", ville: "Ciez", club: "Pétanque de Ciez", format: "TRIPLETTE", categorie: "Triplette", lat: latLng("Ciez")[0], lng: latLng("Ciez")[1], type: "CONCOURS" },
  { id: 87, date: "2026-05-31", ville: "Coulanges-lès-Nevers", club: "Coulanges Pétanque", format: "TRIPLETTE", categorie: "Triplette Mixte par poules 8h30", info: "20ème Grand Prix de la Municipalité - USC Coulanges", lat: latLng("Coulanges-lès-Nevers")[0], lng: latLng("Coulanges-lès-Nevers")[1], type: "SPÉCIAL" },

  // ══════════════ JUIN 2026 ══════════════
  { id: 90, date: "2026-06-04", ville: "Cosne-sur-Loire", club: "Cosne Pétanque", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Cosne-sur-Loire")[0], lng: latLng("Cosne-sur-Loire")[1], type: "CONCOURS" },
  { id: 91, date: "2026-06-06", ville: "Pougues-les-Eaux", club: "Pougues Pétanque", format: "TRIPLETTE", categorie: "Triplette Mixte", lat: latLng("Pougues-les-Eaux")[0], lng: latLng("Pougues-les-Eaux")[1], type: "CONCOURS" },
  { id: 92, date: "2026-06-06", ville: "Alligny-Cosne", club: "Alligny-Cosne Pétanque", format: "DOUBLETTE", categorie: "Doublette - 20 ans club", lat: latLng("Alligny-Cosne")[0], lng: latLng("Alligny-Cosne")[1], type: "CONCOURS" },
  { id: 93, date: "2026-06-07", ville: "Saint-Éloi", club: "Amicale Pétanque Éligeoise", format: "TRIPLETTE", categorie: "Triplette Mixte", lat: latLng("Saint-Éloi")[0], lng: latLng("Saint-Éloi")[1], type: "CONCOURS" },
  { id: 94, date: "2026-06-11", ville: "Saint-Éloi", club: "Amicale Pétanque Éligeoise", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Saint-Éloi")[0], lng: latLng("Saint-Éloi")[1], type: "CONCOURS" },
  { id: 95, date: "2026-06-13", ville: "Marzy", club: "CD58 - Challenge Sandrine Tarbes", format: "TRIPLETTE", categorie: "Challenge Sandrine Tarbes - Triplette", lat: latLng("Marzy")[0], lng: latLng("Marzy")[1], type: "SPÉCIAL" },
  { id: 96, date: "2026-06-14", ville: "Fours", club: "Fours Pétanque", format: "TRIPLETTE", categorie: "Triplette", lat: latLng("Fours")[0], lng: latLng("Fours")[1], type: "CONCOURS" },
  { id: 97, date: "2026-06-14", ville: "Nevers", club: "ASPTT Nevers Pétanque", format: "TRIPLETTE", categorie: "Triplette Promotion", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CONCOURS" },
  { id: 98, date: "2026-06-18", ville: "Raveau", club: "Raveau Pétanque", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Raveau")[0], lng: latLng("Raveau")[1], type: "CONCOURS" },
  { id: 99, date: "2026-06-20", ville: "Chatillon-en-Bazois", club: "ACP Chatillon - 2ème Régional", format: "TRIPLETTE", categorie: "2ème Régional de Château-Chinon - Triplette", info: "Limité 128 triplettes - Parrainé par Stéphane Robineau - Mises +2250€", lat: latLng("Chatillon-en-Bazois")[0], lng: latLng("Chatillon-en-Bazois")[1], type: "RÉGIONAL" },
  { id: 100, date: "2026-06-21", ville: "Neuvy-sur-Loire", club: "Pétanque Neuvy", format: "TRIPLETTE", categorie: "Triplette Mixte", lat: latLng("Neuvy-sur-Loire")[0], lng: latLng("Neuvy-sur-Loire")[1], type: "CONCOURS" },
  { id: 101, date: "2026-06-21", ville: "Imphy", club: "SC Imphy Pétanque", format: "DOUBLETTE", categorie: "Challenge René Muse - Doublette", info: "3 concours ABC - Lancement bouchon 14h", lat: latLng("Imphy")[0], lng: latLng("Imphy")[1], type: "SPÉCIAL" },
  { id: 102, date: "2026-06-25", ville: "Cercy-la-Tour", club: "Cercy Pétanque", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Cercy-la-Tour")[0], lng: latLng("Cercy-la-Tour")[1], type: "CONCOURS" },
  { id: 103, date: "2026-06-26", ville: "Cours", club: "Cours Pétanque", format: "TRIPLETTE", categorie: "Challenge Jean-Luc Hance - Nocturne", lat: latLng("Cours")[0], lng: latLng("Cours")[1], type: "SPÉCIAL" },

  // ══════════════ JUILLET 2026 ══════════════
  { id: 110, date: "2026-07-02", ville: "Pouilly-sur-Loire", club: "Pouilly Pétanque", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Pouilly-sur-Loire")[0], lng: latLng("Pouilly-sur-Loire")[1], type: "CONCOURS" },
  { id: 111, date: "2026-07-04", ville: "Premery", club: "Premery Pétanque", format: "TRIPLETTE", categorie: "Triplette Mixte", lat: latLng("Premery")[0], lng: latLng("Premery")[1], type: "CONCOURS" },
  { id: 112, date: "2026-07-04", ville: "Luthenay-Uxeloup", club: "Pétanque Luthenay", format: "DOUBLETTE", categorie: "Doublette", lat: latLng("Luthenay-Uxeloup")[0], lng: latLng("Luthenay-Uxeloup")[1], type: "CONCOURS" },
  { id: 113, date: "2026-07-05", ville: "Marzy", club: "Marzy Pétanque", format: "DOUBLETTE", categorie: "Doublette Féminin", lat: latLng("Marzy")[0], lng: latLng("Marzy")[1], type: "CONCOURS" },
  { id: 114, date: "2026-07-05", ville: "Marzy", club: "CD58 - Régional Jeunes", format: "TRIPLETTE", categorie: "Régional Jeunes - Triplette", lat: latLng("Marzy")[0], lng: latLng("Marzy")[1], type: "RÉGIONAL" },
  { id: 115, date: "2026-07-09", ville: "Decize", club: "Decize Pétanque", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Decize")[0], lng: latLng("Decize")[1], type: "CONCOURS" },
  { id: 116, date: "2026-07-10", ville: "Dornes", club: "Dornes Pétanque", format: "DOUBLETTE", categorie: "Doublette Nocturne", lat: latLng("Dornes")[0], lng: latLng("Dornes")[1], type: "CONCOURS" },
  { id: 117, date: "2026-07-11", ville: "Cosne-sur-Loire", club: "Cosne Pétanque", format: "TRIPLETTE", categorie: "Triplette", lat: latLng("Cosne-sur-Loire")[0], lng: latLng("Cosne-sur-Loire")[1], type: "CONCOURS" },
  { id: 118, date: "2026-07-12", ville: "Nevers", club: "ASPTT Nevers Pétanque", format: "DOUBLETTE", categorie: "Doublette Promotion", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CONCOURS" },
  { id: 119, date: "2026-07-12", ville: "Nevers", club: "ASPTT Nevers Pétanque", format: "DOUBLETTE", categorie: "Doublette Promotion", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CONCOURS" },
  { id: 120, date: "2026-07-14", ville: "Pougues-les-Eaux", club: "Pougues Pétanque", format: "DOUBLETTE", categorie: "Doublette Mixte", lat: latLng("Pougues-les-Eaux")[0], lng: latLng("Pougues-les-Eaux")[1], type: "CONCOURS" },
  { id: 121, date: "2026-07-18", ville: "Challuy", club: "Challuy-Sermoise Pétanque", format: "DOUBLETTE", categorie: "Doublette Mixte", info: "13h30", lat: latLng("Challuy")[0], lng: latLng("Challuy")[1], type: "CONCOURS" },
  { id: 122, date: "2026-07-23", ville: "Premery", club: "Premery Pétanque", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Premery")[0], lng: latLng("Premery")[1], type: "CONCOURS" },
  { id: 123, date: "2026-07-26", ville: "Saint-Pierre-le-Moutier", club: "Saint-Pierroise Pétanque", format: "DOUBLETTE", categorie: "Doublette toutes catégories", info: "Début inscriptions 13h, jet du but 14h", lat: latLng("Saint-Pierre-le-Moutier")[0], lng: latLng("Saint-Pierre-le-Moutier")[1], type: "CONCOURS" },

  // ══════════════ AOÛT 2026 ══════════════
  { id: 130, date: "2026-08-02", ville: "Nevers", club: "ASPTT Nevers Pétanque", format: "TRIPLETTE", categorie: "Triplette Mixte", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CONCOURS" },
  { id: 131, date: "2026-08-27", ville: "Decize", club: "Decize Pétanque", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Decize")[0], lng: latLng("Decize")[1], type: "CONCOURS" },
  { id: 132, date: "2026-08-30", ville: "Pougues-les-Eaux", club: "Pougues Pétanque", format: "TRIPLETTE", categorie: "Triplette Promotion", lat: latLng("Pougues-les-Eaux")[0], lng: latLng("Pougues-les-Eaux")[1], type: "CONCOURS" },

  // ══════════════ SEPTEMBRE 2026 ══════════════
  { id: 140, date: "2026-09-10", ville: "Imphy", club: "SC Imphy Pétanque", format: "DOUBLETTE", categorie: "Concours Vétérans - Doublette", info: "Stade Louis Masson - 3 concours ABC", lat: latLng("Imphy")[0], lng: latLng("Imphy")[1], type: "CONCOURS" },
  { id: 141, date: "2026-09-19", ville: "Saint-Pierre-le-Moutier", club: "Saint-Pierroise Pétanque", format: "TRIPLETTE", categorie: "Triplette toutes catégories", info: "Début inscriptions 13h, jet du but 14h", lat: latLng("Saint-Pierre-le-Moutier")[0], lng: latLng("Saint-Pierre-le-Moutier")[1], type: "CONCOURS" },
  { id: 142, date: "2026-09-20", ville: "Corbigny", club: "Corbigny Pétanque", format: "DOUBLETTE", categorie: "Doublette Mixte", lat: latLng("Corbigny")[0], lng: latLng("Corbigny")[1], type: "CONCOURS" },

  // ══════════════ OCTOBRE 2026 ══════════════
  { id: 150, date: "2026-10-08", ville: "Champvert", club: "Champvert Pétanque", format: "DOUBLETTE", categorie: "Challenge JF Piat - Doublette Vétéran", lat: latLng("Champvert")[0], lng: latLng("Champvert")[1], type: "SPÉCIAL" },
  { id: 151, date: "2026-10-10", ville: "Donzy", club: "ES Donzy Pétanque", format: "DOUBLETTE", categorie: "Doublette", lat: latLng("Donzy")[0], lng: latLng("Donzy")[1], type: "CONCOURS" },
  { id: 152, date: "2026-10-15", ville: "Pougues-les-Eaux", club: "Pougues Pétanque", format: "DOUBLETTE", categorie: "Doublette Vétéran", lat: latLng("Pougues-les-Eaux")[0], lng: latLng("Pougues-les-Eaux")[1], type: "CONCOURS" },
  { id: 153, date: "2026-10-24", ville: "Mesves-sur-Loire", club: "Pétanque Mesves", format: "TRIPLETTE", categorie: "Challenge TJP", lat: latLng("Mesves-sur-Loire")[0], lng: latLng("Mesves-sur-Loire")[1], type: "SPÉCIAL" },
  { id: 154, date: "2026-10-24", ville: "La Machine", club: "La Machine Pétanque", format: "DOUBLETTE", categorie: "Doublette", lat: latLng("La Machine")[0], lng: latLng("La Machine")[1], type: "CONCOURS" },
  { id: 155, date: "2026-10-25", ville: "Nevers", lieu: "Boulodrome", club: "CD58 - Journée de la Rose", format: "DOUBLETTE", categorie: "Journée de la Rose - Boulodrome", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "SPÉCIAL" },

  // ══════════════ NOVEMBRE 2026 ══════════════
  { id: 160, date: "2026-11-01", ville: "Nevers", lieu: "Boulodrome", club: "CD58 - Marathon Féminin", format: "TRIPLETTE", categorie: "Marathon Féminin - Boulodrome", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "SPÉCIAL" },
  { id: 161, date: "2026-11-14", ville: "Nevers", lieu: "Boulodrome", club: "ASAV Boulodrome", format: "TRIPLETTE", categorie: "Triplette - Boulodrome", lat: latLng("Nevers")[0], lng: latLng("Nevers")[1], type: "CONCOURS" },
];
