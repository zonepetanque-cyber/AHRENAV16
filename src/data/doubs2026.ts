// Calendrier des concours du département Doubs (25) - 2026
// Source : Calendrier FFPJP CD25 2026
// Site : https://www.ffpjp25.com/
// Facebook : https://www.facebook.com/share/1bbHZhUKFr/

export interface ConcourDoubs {
  id: number;
  date: string;
  dateFin?: string;
  ville: string;
  lieu?: string;
  club: string;
  format: string;
  categorie: string;
  info?: string;
  dotation?: string;
  lat: number;
  lng: number;
  type: "CONCOURS" | "CHAMPIONNAT" | "RÉGIONAL" | "NATIONAL" | "SPÉCIAL";
}

const COORDS: Record<string, [number, number]> = {
  "Besançon":              [47.2378, 6.0241],
  "Rosemont":              [47.2378, 6.0241],
  "Pontarlier":            [46.9042, 6.3542],
  "Sochaux":               [47.5108, 6.8283],
  "Beure":                 [47.2108, 6.0019],
  "Thise":                 [47.2681, 6.0619],
  "Valentigney":           [47.4728, 6.8347],
  "Hérimoncourt":          [47.4408, 6.8736],
  "Montbéliard":           [47.5100, 6.7986],
  "Seloncourt":            [47.4628, 6.8919],
  "Morteau":               [47.0578, 6.6036],
  "Vercel":                [47.1842, 6.3831],
  "Montlebon":             [47.0714, 6.6219],
  "L'Isle-sur-le-Doubs":  [47.4547, 6.5836],
  "Orchamps-Vennes":       [47.1394, 6.5786],
  "Montferrand":           [47.1900, 6.1200],
  "Le Russey":             [47.1008, 6.5578],
  "Etupes":                [47.4928, 6.8086],
  "Saône":                 [47.2042, 5.9808],
  "Pont-de-Roide":         [47.3892, 6.7581],
  "Villers-le-Lac":        [47.0586, 6.6736],
  "Baume-les-Dames":       [47.3503, 6.3614],
  "Valdahon":              [47.1478, 6.3328],
  "Les Fins":              [47.0817, 6.6575],
  "Nancray":               [47.2200, 6.1000],
  "St-Vit":                [47.1869, 5.8178],
  "Pierrefontaine":        [47.1100, 6.5400],
  "PFC":                   [47.3892, 6.7581],
  "Montbéliard":           [47.5100, 6.7986],
};

const c = (ville: string): [number, number] => COORDS[ville] || [47.2378, 6.0241];

export const DEPT_DOUBS = {
  nom: "Doubs",
  code: "25",
  facebook: "https://www.facebook.com/share/1bbHZhUKFr/",
  site: "https://www.ffpjp25.com/",
};

export const CONCOURS_DOUBS_2026: ConcourDoubs[] = [
  // ── JANVIER 2026 ───────────────────────────────────────────
  { id:1,  date:"2026-01-17", ville:"Pontarlier",         lieu:"Boulodrome",   club:"Pontarlier",          format:"TRIPLETTE", categorie:"NH Promotion",   dotation:"600€",  info:"Challenge CREDIT MUTEL - 10H NH sur invitation limité 24 équipes 8h30", lat:c("Pontarlier")[0], lng:c("Pontarlier")[1], type:"CONCOURS" },
  { id:2,  date:"2026-01-24", ville:"Besançon",           lieu:"Rosemont",     club:"Beure/Vesontio",      format:"TRIPLETTE", categorie:"Sénior",         info:"CDC-JP 1ère division match 1 à 14h30", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CHAMPIONNAT" },
  { id:3,  date:"2026-01-25", ville:"Besançon",           lieu:"Rosemont",     club:"Beure/Vesontio",      format:"TRIPLETTE", categorie:"Sénior",         info:"CDC-JP 1ère division match 2 à 8h00, match 3 à 14h30", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CHAMPIONNAT" },
  { id:4,  date:"2026-01-25", ville:"Sochaux",            lieu:"Boulodrome",   club:"Sochaux",             format:"TRIPLETTE", categorie:"Féminin",        info:"Journée des Féminines en triplette", lat:c("Sochaux")[0], lng:c("Sochaux")[1], type:"CONCOURS" },

  // ── FÉVRIER 2026 ───────────────────────────────────────────
  { id:5,  date:"2026-02-06", ville:"Besançon",           lieu:"Rosemont",     club:"Vesontio",            format:"DOUBLETTE", categorie:"Vétéran",        info:"Concours Vétérans 14h00 - 40%", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CONCOURS" },
  { id:6,  date:"2026-02-07", ville:"Pontarlier",         lieu:"Boulodrome",   club:"Pontarlier",          format:"TRIPLETTE", categorie:"NH Honneur-Élite",dotation:"800€", info:"Challenge HYPER U - 10H sur invitation limité 24 équipes 8H30", lat:c("Pontarlier")[0], lng:c("Pontarlier")[1], type:"CONCOURS" },
  { id:7,  date:"2026-02-08", ville:"Besançon",           lieu:"Rosemont",     club:"District de Besançon",format:"DOUBLETTE", categorie:"Mixte",          info:"1 adulte, 1 enfant licencié ou non 14h00 - Lots", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CONCOURS" },
  { id:8,  date:"2026-02-14", ville:"Besançon",           lieu:"Rosemont",     club:"CD25",                format:"TRIPLETTE", categorie:"Jeu Provençal",  info:"Coupe de France JP", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"NATIONAL" },
  { id:9,  date:"2026-02-18", ville:"Pont-de-Roide",      lieu:"Boulodrome",   club:"Pont-de-Roide",       format:"TRIPLETTE", categorie:"Vétéran 50+",    dotation:"500€", info:"Masters Rudipontain - Limité 36 équipes 2 groupes 10h00", lat:c("Pont-de-Roide")[0], lng:c("Pont-de-Roide")[1], type:"CONCOURS" },
  { id:10, date:"2026-02-28", ville:"Besançon",           lieu:"Rosemont",     club:"Thise",               format:"TRIPLETTE", categorie:"Sénior",         info:"CDC-JP 2ème division match 1 à 14h30", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CHAMPIONNAT" },

  // ── MARS 2026 ──────────────────────────────────────────────
  { id:11, date:"2026-03-01", ville:"Besançon",           lieu:"Rosemont",     club:"Thise",               format:"TRIPLETTE", categorie:"Sénior",         info:"CDC-JP 1ère division match 4 à 8h00, match 5 à 14h30", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CHAMPIONNAT" },
  { id:12, date:"2026-03-07", ville:"Pontarlier",         lieu:"Boulodrome",   club:"Pontarlier",          format:"DOUBLETTE", categorie:"Féminin NH",     dotation:"800€", info:"Prix de la JPP - 10H NH limité 24 équipes sur invitation 09h00", lat:c("Pontarlier")[0], lng:c("Pontarlier")[1], type:"CONCOURS" },
  { id:13, date:"2026-03-14", ville:"Besançon",           lieu:"Rosemont",     club:"CD25",                format:"TRIPLETTE", categorie:"Jeu Provençal",  info:"Coupe de France 1er tour départemental", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"NATIONAL" },
  { id:14, date:"2026-03-21", ville:"Beure",              lieu:"Rosemont",     club:"Beure",               format:"TRIPLETTE", categorie:"Senior Promotion",info:"Chpt Dép. Triplette Senior Promotion 14h00", lat:c("Beure")[0], lng:c("Beure")[1], type:"CHAMPIONNAT" },
  { id:15, date:"2026-03-22", ville:"Beure",              lieu:"Rosemont",     club:"Beure",               format:"TRIPLETTE", categorie:"Senior Promotion",info:"Chpt Dép. Triplette Senior Promotion (suite) 10h00", lat:c("Beure")[0], lng:c("Beure")[1], type:"CHAMPIONNAT" },
  { id:16, date:"2026-03-28", ville:"Hérimoncourt",       lieu:"",             club:"Entente Montbéliard", format:"TRIPLETTE", categorie:"Senior Masculin", info:"Chpt Dép. Individuel Senior Masculin 9h00 pré-qualificatif secteur Montbéliard", lat:c("Hérimoncourt")[0], lng:c("Hérimoncourt")[1], type:"CHAMPIONNAT" },
  { id:17, date:"2026-03-28", ville:"Hérimoncourt",       lieu:"",             club:"Entente Montbéliard", format:"DOUBLETTE", categorie:"Senior Féminin",  info:"Chpt Dép. Doublette Senior Féminin 14h00 pré-qualificatif secteur Montbéliard", lat:c("Hérimoncourt")[0], lng:c("Hérimoncourt")[1], type:"CHAMPIONNAT" },
  { id:18, date:"2026-03-28", ville:"Pierrefontaine",     lieu:"",             club:"Entente Orchamps",    format:"TRIPLETTE", categorie:"Senior Masculin", info:"Chpt Dép. Individuel Senior Masculin 9h00 pré-qualificatif secteur Haut Doubs", lat:c("Pierrefontaine")[0], lng:c("Pierrefontaine")[1], type:"CHAMPIONNAT" },
  { id:19, date:"2026-03-28", ville:"Besançon",           lieu:"Rosemont",     club:"Thise",               format:"TRIPLETTE", categorie:"Senior Masculin", info:"Chpt Dép. Individuel Senior Masculin 9h00 pré-qualificatif secteur Besançon", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CHAMPIONNAT" },
  { id:20, date:"2026-03-29", ville:"Besançon",           lieu:"Rosemont",     club:"Thise",               format:"DOUBLETTE", categorie:"Senior",          info:"Chpt Dép. Individuel Senior Masculin + Doublette Senior Féminin (suite) 9h00", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CHAMPIONNAT" },

  // ── AVRIL 2026 ─────────────────────────────────────────────
  { id:21, date:"2026-04-04", ville:"Valentigney",        lieu:"Stade des Longines", club:"Valentigney",   format:"TRIPLETTE", categorie:"Jeu Provençal",  info:"Chpt Dép. Triplette Jeu Provençal 8h30", lat:c("Valentigney")[0], lng:c("Valentigney")[1], type:"CHAMPIONNAT" },
  { id:22, date:"2026-04-11", ville:"St-Vit",             lieu:"Complexe Michel Vautrot", club:"St Vit",   format:"TRIPLETTE", categorie:"Senior",          info:"Chpt Dép. Triplette Senior Masculin + Féminin 14h00", lat:c("St-Vit")[0], lng:c("St-Vit")[1], type:"CHAMPIONNAT" },
  { id:23, date:"2026-04-12", ville:"St-Vit",             lieu:"Complexe Michel Vautrot", club:"St Vit",   format:"TRIPLETTE", categorie:"Senior",          info:"Chpt Dép. Triplette Senior Masculin + Féminin (suite) 9h00", lat:c("St-Vit")[0], lng:c("St-Vit")[1], type:"CHAMPIONNAT" },
  { id:24, date:"2026-04-12", ville:"St-Vit",             lieu:"Complexe Michel Vautrot", club:"St Vit",   format:"TRIPLETTE", categorie:"Jeunes",          info:"Chpt Dép. Triplette Jeunes 10h00", lat:c("St-Vit")[0], lng:c("St-Vit")[1], type:"CHAMPIONNAT" },
  { id:25, date:"2026-04-18", ville:"Villers-le-Lac",     lieu:"",             club:"Villers le Lac",      format:"DOUBLETTE", categorie:"Senior Mixte",    info:"Chpt Dép. Doublette Senior Mixte 14h00", lat:c("Villers-le-Lac")[0], lng:c("Villers-le-Lac")[1], type:"CHAMPIONNAT" },
  { id:26, date:"2026-04-19", ville:"Villers-le-Lac",     lieu:"",             club:"Villers le Lac",      format:"DOUBLETTE", categorie:"Senior Mixte",    info:"Chpt Dép. Doublette Senior Mixte (suite) 9h00", lat:c("Villers-le-Lac")[0], lng:c("Villers-le-Lac")[1], type:"CHAMPIONNAT" },
  { id:27, date:"2026-04-19", ville:"Villers-le-Lac",     lieu:"",             club:"Villers le Lac",      format:"DOUBLETTE", categorie:"Jeunes",          info:"Chpt Dép. Doublette Jeunes 10h00", lat:c("Villers-le-Lac")[0], lng:c("Villers-le-Lac")[1], type:"CHAMPIONNAT" },
  { id:28, date:"2026-04-22", ville:"Seloncourt",         lieu:"Stade Hérimoncourt", club:"Seloncourt",    format:"TRIPLETTE", categorie:"Vétéran",         info:"Chpt Dép. Triplette Vétérans 14h00", lat:c("Seloncourt")[0], lng:c("Seloncourt")[1], type:"CHAMPIONNAT" },
  { id:29, date:"2026-04-23", ville:"Seloncourt",         lieu:"Stade Hérimoncourt", club:"Seloncourt",    format:"TRIPLETTE", categorie:"Vétéran",         info:"Chpt Dép. Triplette Vétérans (suite) 9h00", lat:c("Seloncourt")[0], lng:c("Seloncourt")[1], type:"CHAMPIONNAT" },
  { id:30, date:"2026-04-25", ville:"Thise",              lieu:"Aérodrome",    club:"Thise",               format:"DOUBLETTE", categorie:"Senior Masculin", info:"Chpt Dép. Doublette Senior Masculin 14h00", lat:c("Thise")[0], lng:c("Thise")[1], type:"CHAMPIONNAT" },
  { id:31, date:"2026-04-26", ville:"Thise",              lieu:"Aérodrome",    club:"Thise",               format:"DOUBLETTE", categorie:"Senior Masculin", info:"Chpt Dép. Doublette Senior Masculin (suite) 9h00", lat:c("Thise")[0], lng:c("Thise")[1], type:"CHAMPIONNAT" },
  { id:32, date:"2026-04-26", ville:"Thise",              lieu:"Aérodrome",    club:"Thise",               format:"INDIVIDUEL",categorie:"Senior Féminin",  info:"Chpt Dép. Individuel Senior Féminin 9h00", lat:c("Thise")[0], lng:c("Thise")[1], type:"CHAMPIONNAT" },
  { id:33, date:"2026-04-26", ville:"Thise",              lieu:"Aérodrome",    club:"Thise",               format:"INDIVIDUEL",categorie:"Jeunes",          info:"Chpt Dép. Individuel Jeunes 10h00", lat:c("Thise")[0], lng:c("Thise")[1], type:"CHAMPIONNAT" },

  // ── MAI 2026 ───────────────────────────────────────────────
  { id:34, date:"2026-05-02", ville:"Hérimoncourt",       lieu:"",             club:"Hérimoncourt",        format:"TRIPLETTE", categorie:"Senior Mixte",    info:"Chpt Dép. Triplette Mixte 14h00", lat:c("Hérimoncourt")[0], lng:c("Hérimoncourt")[1], type:"CHAMPIONNAT" },
  { id:35, date:"2026-05-03", ville:"Hérimoncourt",       lieu:"",             club:"Hérimoncourt",        format:"TRIPLETTE", categorie:"Senior Mixte",    info:"Chpt Dép. Triplette Senior Mixte (suite) 9h00", lat:c("Hérimoncourt")[0], lng:c("Hérimoncourt")[1], type:"CHAMPIONNAT" },
  { id:36, date:"2026-05-08", ville:"L'Isle-sur-le-Doubs",lieu:"Boulodrome",   club:"L'Isle-sur-le-Doubs", format:"DOUBLETTE", categorie:"Sénior",         dotation:"50%", info:"Prix Patrick GOSSOT 14h00", lat:c("L'Isle-sur-le-Doubs")[0], lng:c("L'Isle-sur-le-Doubs")[1], type:"CONCOURS" },
  { id:37, date:"2026-05-10", ville:"Beure",              lieu:"Stade",        club:"Beure",               format:"TRIPLETTE", categorie:"Féminin",         info:"Préqualificatif Marathon Féminin BFC Michèle LEGA 10h00 - inscription à l'avance", lat:c("Beure")[0], lng:c("Beure")[1], type:"RÉGIONAL" },
  { id:38, date:"2026-05-14", ville:"Orchamps-Vennes",    lieu:"Boulodrome",   club:"Orchamps-Vennes",     format:"DOUBLETTE", categorie:"Féminin",        dotation:"300€", info:"Trophée des Artisans et Commerçants - 14h00 inscriptions avant le 10/05", lat:c("Orchamps-Vennes")[0], lng:c("Orchamps-Vennes")[1], type:"CONCOURS" },
  { id:39, date:"2026-05-14", ville:"Montferrand",        lieu:"Stade",        club:"Montferrand",         format:"TRIPLETTE", categorie:"Sénior",         dotation:"40%", info:"Coupe de la Municipalité 14h00", lat:c("Montferrand")[0], lng:c("Montferrand")[1], type:"CONCOURS" },
  { id:40, date:"2026-05-15", ville:"Le Russey",          lieu:"Boulodrome",   club:"Le Russey",           format:"DOUBLETTE", categorie:"Sénior",         dotation:"40%", info:"Coupe de la Société 10h00", lat:c("Le Russey")[0], lng:c("Le Russey")[1], type:"CONCOURS" },
  { id:41, date:"2026-05-16", ville:"Besançon",           lieu:"Rosemont",     club:"District Besançon",   format:"DOUBLETTE", categorie:"Mixte",          info:"1 adulte 1 enfant - Lots", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CONCOURS" },
  { id:42, date:"2026-05-19", ville:"Valentigney",        lieu:"Stade des Longines", club:"Valentigney",   format:"TRIPLETTE", categorie:"Vétéran",        dotation:"300€", info:"Challenge Maurice ROY 14h00", lat:c("Valentigney")[0], lng:c("Valentigney")[1], type:"CONCOURS" },
  { id:43, date:"2026-05-21", ville:"Montferrand",        lieu:"Stade",        club:"Montferrand",         format:"TRIPLETTE", categorie:"Vétéran",        dotation:"40%", info:"Challenge de nos anciens disparus 14h00", lat:c("Montferrand")[0], lng:c("Montferrand")[1], type:"CONCOURS" },
  { id:44, date:"2026-05-23", ville:"Vercel",             lieu:"Stade",        club:"Vercel",              format:"DOUBLETTE", categorie:"Sénior",         dotation:"50%", info:"Prix de la Ville 14h00", lat:c("Vercel")[0], lng:c("Vercel")[1], type:"CONCOURS" },
  { id:45, date:"2026-05-25", ville:"Etupes",             lieu:"Boulodrome de la Charme", club:"Etupes",   format:"TRIPLETTE", categorie:"Sénior",         dotation:"1200€", info:"6ème GP de la ville d'Etupes - inscriptions avant le 23/05 début 9h00 limité 128 équipes", lat:c("Etupes")[0], lng:c("Etupes")[1], type:"CONCOURS" },
  { id:46, date:"2026-05-25", ville:"Etupes",             lieu:"Boulodrome de la Charme", club:"Etupes",   format:"TRIPLETTE", categorie:"Sénior",         dotation:"300€", info:"Coupe des Bénévoles 14h00", lat:c("Etupes")[0], lng:c("Etupes")[1], type:"CONCOURS" },
  { id:47, date:"2026-05-30", ville:"Besançon",           lieu:"Rosemont",     club:"Vesontio",            format:"DOUBLETTE", categorie:"Sénior",         dotation:"300€", info:"Concours 14h00", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CONCOURS" },

  // ── JUIN 2026 ──────────────────────────────────────────────
  { id:48, date:"2026-06-04", ville:"Montbéliard",        lieu:"La Banane",    club:"Montbéliard",         format:"TRIPLETTE", categorie:"Vétéran",        dotation:"1000€", info:"Concours Odette TIMO à 9h00", lat:c("Montbéliard")[0], lng:c("Montbéliard")[1], type:"CONCOURS" },
  { id:49, date:"2026-06-06", ville:"Montlebon",          lieu:"Boulodrome",   club:"Montlebon",           format:"DOUBLETTE", categorie:"Sénior",         dotation:"300€", info:"Coupe du Président 10h00", lat:c("Montlebon")[0], lng:c("Montlebon")[1], type:"CONCOURS" },
  { id:50, date:"2026-06-06", ville:"Montferrand",        lieu:"Stade",        club:"Montferrand",         format:"TRIPLETTE", categorie:"Sénior",         dotation:"1000€", info:"Challenge Pierre FOSSAERT 14h00 limité 64 équipes - inscription à l'avance", lat:c("Montferrand")[0], lng:c("Montferrand")[1], type:"CONCOURS" },
  { id:51, date:"2026-06-11", ville:"Besançon",           lieu:"Rosemont",     club:"District Besançon",   format:"DOUBLETTE", categorie:"Vétéran",        dotation:"40%", info:"Doublette Vétérans 14h00", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CONCOURS" },
  { id:52, date:"2026-06-13", ville:"Hérimoncourt",       lieu:"Stade Boulloche", club:"Hérimoncourt",     format:"DOUBLETTE", categorie:"Sénior",         dotation:"250€", info:"Challenge Michel CAPOUTO 14h00", lat:c("Hérimoncourt")[0], lng:c("Hérimoncourt")[1], type:"CONCOURS" },
  { id:53, date:"2026-06-13", ville:"Vercel",             lieu:"Stade",        club:"Vercel",              format:"DOUBLETTE", categorie:"Sénior",         dotation:"50%", info:"Coupe des Artisans Commerçants 14h00", lat:c("Vercel")[0], lng:c("Vercel")[1], type:"CONCOURS" },
  { id:54, date:"2026-06-13", ville:"Thise",              lieu:"Aérodrome",    club:"Thise",               format:"DOUBLETTE", categorie:"Promotion",      dotation:"50%", info:"Doublette Promotion 14h00", lat:c("Thise")[0], lng:c("Thise")[1], type:"CONCOURS" },
  { id:55, date:"2026-06-14", ville:"Pontarlier",         lieu:"Boulodrome",   club:"Pontarlier",          format:"DOUBLETTE", categorie:"Jeunes",         info:"Coupe des Jeunes 9h30 Benjamin+Minime et Cadet+Junior", lat:c("Pontarlier")[0], lng:c("Pontarlier")[1], type:"CONCOURS" },
  { id:56, date:"2026-06-20", ville:"Saône",              lieu:"Stade des Marais", club:"Saône",           format:"TRIPLETTE", categorie:"Sénior",         dotation:"1000€", info:"Prix de la ville de Saône 9h00 limité 52 équipes - inscriptions à l'avance", lat:c("Saône")[0], lng:c("Saône")[1], type:"CONCOURS" },
  { id:57, date:"2026-06-21", ville:"Pontarlier",         lieu:"Boulodrome",   club:"Pontarlier",          format:"DOUBLETTE", categorie:"Sénior",         dotation:"500€", info:"Challenge des Sponsors 9h00 - inscriptions avant le 19/06 12h00", lat:c("Pontarlier")[0], lng:c("Pontarlier")[1], type:"CONCOURS" },
  { id:58, date:"2026-06-23", ville:"Sochaux",            lieu:"Boulodrome",   club:"Sochaux",             format:"TRIPLETTE", categorie:"Vétéran",        dotation:"400€", info:"Grand Prix des Anciens 14h00", lat:c("Sochaux")[0], lng:c("Sochaux")[1], type:"CONCOURS" },
  { id:59, date:"2026-06-24", ville:"Seloncourt",         lieu:"Boulodrome",   club:"Seloncourt",          format:"TRIPLETTE", categorie:"Vétéran",        dotation:"250€", info:"Challenge Norbert CUCUPHAT 14h00", lat:c("Seloncourt")[0], lng:c("Seloncourt")[1], type:"CONCOURS" },
  { id:60, date:"2026-06-27", ville:"L'Isle-sur-le-Doubs",lieu:"Boulodrome",   club:"L'Isle-sur-le-Doubs", format:"TRIPLETTE", categorie:"Sénior",         dotation:"50%", info:"Prix ROSER 14h00", lat:c("L'Isle-sur-le-Doubs")[0], lng:c("L'Isle-sur-le-Doubs")[1], type:"CONCOURS" },
  { id:61, date:"2026-06-27", ville:"Morteau",            lieu:"Boulodrome",   club:"Morteau",             format:"DOUBLETTE", categorie:"Sénior",         dotation:"300€", info:"Prix ROGNON 14h00", lat:c("Morteau")[0], lng:c("Morteau")[1], type:"CONCOURS" },
  { id:62, date:"2026-06-27", ville:"St-Vit",             lieu:"Complexe Sportif", club:"St-Vit",          format:"DOUBLETTE", categorie:"Sénior",         dotation:"1000€", info:"Challenge Léon BARTHOD 9h00 - inscription à l'avance", lat:c("St-Vit")[0], lng:c("St-Vit")[1], type:"CONCOURS" },

  // ── JUILLET 2026 ───────────────────────────────────────────
  { id:63, date:"2026-07-11", ville:"Pontarlier",         lieu:"Boulodrome",   club:"La Chti Pétanque 25", format:"TRIPLETTE", categorie:"NH",             dotation:"1400€", info:"10h de la Chti - 8h30 sur invitation limité 24 équipes", lat:c("Pontarlier")[0], lng:c("Pontarlier")[1], type:"CONCOURS" },
  { id:64, date:"2026-07-11", ville:"PFC",                lieu:"Les Planches", club:"PFC",                 format:"TRIPLETTE", categorie:"Mixte",          dotation:"250€", info:"Challenge Françoise et Guy MOUILLESEAUX 14h00 - inscriptions avant le 09/07 18h00", lat:c("PFC")[0], lng:c("PFC")[1], type:"CONCOURS" },
  { id:65, date:"2026-07-18", ville:"Saône",              lieu:"Complexe sportif", club:"Saône",           format:"TRIPLETTE", categorie:"Sénior",         dotation:"40%", info:"Prix des Partenaires 14h00", lat:c("Saône")[0], lng:c("Saône")[1], type:"CONCOURS" },
  { id:66, date:"2026-07-18", ville:"Pierrefontaine",     lieu:"Boulodrome",   club:"Pierrefontaine",      format:"DOUBLETTE", categorie:"Sénior",         dotation:"40%", info:"Challenge des 2 Vals 14h00", lat:c("Pierrefontaine")[0], lng:c("Pierrefontaine")[1], type:"CONCOURS" },
  { id:67, date:"2026-07-19", ville:"Valentigney",        lieu:"Stade des Longines", club:"Valentigney",   format:"TRIPLETTE", categorie:"Sénior",         dotation:"1200€", info:"Challenge David DEMELAY 9h00 - inscriptions avant le 12/07", lat:c("Valentigney")[0], lng:c("Valentigney")[1], type:"CONCOURS" },
  { id:68, date:"2026-07-19", ville:"Valentigney",        lieu:"Stade des Longines", club:"Valentigney",   format:"DOUBLETTE", categorie:"Féminin",        dotation:"300€", info:"Challenge Nicole DEMELAY 9h00 - inscriptions avant le 12/07", lat:c("Valentigney")[0], lng:c("Valentigney")[1], type:"CONCOURS" },
  { id:69, date:"2026-07-25", ville:"Montbéliard",        lieu:"La Banane",    club:"Montbéliard",         format:"DOUBLETTE", categorie:"Sénior",         dotation:"40%", info:"Concours de la Ville 14h00", lat:c("Montbéliard")[0], lng:c("Montbéliard")[1], type:"CONCOURS" },
  { id:70, date:"2026-07-04", ville:"Pont-de-Roide",      lieu:"Boulodrome",   club:"Pont-de-Roide",       format:"TRIPLETTE", categorie:"Sénior",         dotation:"1000€", info:"50 ans de la Rudipontaine - Triplette Homogène inscriptions à l'avance limité 76 équipes", lat:c("Pont-de-Roide")[0], lng:c("Pont-de-Roide")[1], type:"CONCOURS" },

  // ── AOÛT 2026 ──────────────────────────────────────────────
  { id:71, date:"2026-08-01", ville:"L'Isle-sur-le-Doubs",lieu:"Boulodrome",   club:"L'Isle-sur-le-Doubs", format:"DOUBLETTE", categorie:"Promotion",      dotation:"50%", info:"Coupe NONO - Doublette Promotion 14h00", lat:c("L'Isle-sur-le-Doubs")[0], lng:c("L'Isle-sur-le-Doubs")[1], type:"CONCOURS" },
  { id:72, date:"2026-08-09", ville:"Valdahon",           lieu:"Boulodrome",   club:"Valdahon",            format:"DOUBLETTE", categorie:"Sénior",         dotation:"250€", info:"Mémorial Sylvain LETHIER 14h00", lat:c("Valdahon")[0], lng:c("Valdahon")[1], type:"CONCOURS" },
  { id:73, date:"2026-08-14", ville:"Orchamps-Vennes",    lieu:"Boulodrome",   club:"Orchamps-Vennes",     format:"TRIPLETTE", categorie:"Sénior",         dotation:"1000€", info:"Trophée des Artisans et Commerçants du Jambon à la Broche 9h00 - inscriptions avant le 10/08 limité 96 équipes", lat:c("Orchamps-Vennes")[0], lng:c("Orchamps-Vennes")[1], type:"CONCOURS" },
  { id:74, date:"2026-08-22", ville:"Beure",              lieu:"Au stade",     club:"Beure",               format:"DOUBLETTE", categorie:"Sénior",         dotation:"40%", info:"Prix Patrick PETRAULT 14h00", lat:c("Beure")[0], lng:c("Beure")[1], type:"CONCOURS" },
  { id:75, date:"2026-08-23", ville:"Beure",              lieu:"Au stade",     club:"Beure",               format:"DOUBLETTE", categorie:"Féminin",        dotation:"30%", info:"Coupe des féminines 9h30", lat:c("Beure")[0], lng:c("Beure")[1], type:"CONCOURS" },
  { id:76, date:"2026-08-23", ville:"Baume-les-Dames",    lieu:"Boulodrome",   club:"Baume-les-Dames",     format:"DOUBLETTE", categorie:"Sénior",         dotation:"50%", info:"Concours de la Société 14h00", lat:c("Baume-les-Dames")[0], lng:c("Baume-les-Dames")[1], type:"CONCOURS" },
  { id:77, date:"2026-08-27", ville:"Seloncourt",         lieu:"Boulodrome",   club:"Seloncourt",          format:"TRIPLETTE", categorie:"Vétéran",        dotation:"250€", info:"Concours de la Société 14h00", lat:c("Seloncourt")[0], lng:c("Seloncourt")[1], type:"CONCOURS" },
  { id:78, date:"2026-08-29", ville:"Les Fins",           lieu:"Stade",        club:"Les Fins",            format:"DOUBLETTE", categorie:"Sénior",         dotation:"250€", info:"Prix du Président 10h00", lat:c("Les Fins")[0], lng:c("Les Fins")[1], type:"CONCOURS" },
  { id:79, date:"2026-08-29", ville:"Sochaux",            lieu:"Boulodrome",   club:"Sochaux",             format:"TRIPLETTE", categorie:"Sénior",         dotation:"1000€", info:"Grand Prix des Partenaires 9h00 limité 96 équipes - inscriptions à l'avance", lat:c("Sochaux")[0], lng:c("Sochaux")[1], type:"CONCOURS" },
  { id:80, date:"2026-08-30", ville:"Etupes",             lieu:"Boulodrome de la Charme", club:"Etupes",   format:"TRIPLETTE", categorie:"Mixte",          dotation:"300€", info:"Challenge Serge CHAUVELOT 9h00", lat:c("Etupes")[0], lng:c("Etupes")[1], type:"CONCOURS" },

  // ── SEPTEMBRE 2026 ─────────────────────────────────────────
  { id:81, date:"2026-09-01", ville:"Montlebon",          lieu:"Boulodrome",   club:"Montlebon",           format:"DOUBLETTE", categorie:"Vétéran",        dotation:"40%", info:"Chpt Dép. Doublette Vétérans 8h30", lat:c("Montlebon")[0], lng:c("Montlebon")[1], type:"CHAMPIONNAT" },
  { id:82, date:"2026-09-01", ville:"Montlebon",          lieu:"Boulodrome",   club:"Montlebon",           format:"DOUBLETTE", categorie:"Vétéran",        dotation:"40%", info:"Concours complémentaire Doublette Vétérans 14h00", lat:c("Montlebon")[0], lng:c("Montlebon")[1], type:"CONCOURS" },
  { id:83, date:"2026-09-05", ville:"Seloncourt",         lieu:"Boulodrome",   club:"Seloncourt",          format:"TRIPLETTE", categorie:"Sénior",         dotation:"250€", info:"Concours de la Ville 14h00 limité 38 équipes - inscription à l'avance", lat:c("Seloncourt")[0], lng:c("Seloncourt")[1], type:"CONCOURS" },
  { id:84, date:"2026-09-12", ville:"PFC",                lieu:"Les Planches", club:"PFC",                 format:"DOUBLETTE", categorie:"Sénior",         dotation:"250€", info:"Concours Patrick Vincent 14h00", lat:c("PFC")[0], lng:c("PFC")[1], type:"CONCOURS" },
  { id:85, date:"2026-09-12", ville:"Montlebon",          lieu:"Boulodrome",   club:"Montlebon",           format:"DOUBLETTE", categorie:"Sénior",         dotation:"300€", info:"Coupe NAPPO 10h00", lat:c("Montlebon")[0], lng:c("Montlebon")[1], type:"CONCOURS" },
  { id:86, date:"2026-09-13", ville:"Baume-les-Dames",    lieu:"Boulodrome",   club:"Baume-les-Dames",     format:"DOUBLETTE", categorie:"Mixte",          dotation:"50%", info:"Prix de la Ville - Doublette Mixte 14h00", lat:c("Baume-les-Dames")[0], lng:c("Baume-les-Dames")[1], type:"CONCOURS" },
  { id:87, date:"2026-09-19", ville:"Vercel",             lieu:"Stade",        club:"Vercel",              format:"DOUBLETTE", categorie:"Sénior",         dotation:"50%", info:"Prix du Président 14h00", lat:c("Vercel")[0], lng:c("Vercel")[1], type:"CONCOURS" },
  { id:88, date:"2026-09-22", ville:"Baume-les-Dames",    lieu:"Boulodrome",   club:"Baume-les-Dames",     format:"INDIVIDUEL",categorie:"Vétéran",        info:"Chpt Dép. Ind. Vétérans 8h30", lat:c("Baume-les-Dames")[0], lng:c("Baume-les-Dames")[1], type:"CHAMPIONNAT" },
  { id:89, date:"2026-09-22", ville:"Baume-les-Dames",    lieu:"Boulodrome",   club:"Baume-les-Dames",     format:"DOUBLETTE", categorie:"Vétéran",        dotation:"40%", info:"Concours complémentaire Doublette Vétérans 14h00", lat:c("Baume-les-Dames")[0], lng:c("Baume-les-Dames")[1], type:"CONCOURS" },
  { id:90, date:"2026-09-26", ville:"Thise",              lieu:"Boulodrome",   club:"Thise",               format:"TRIPLETTE", categorie:"Sénior",         dotation:"1000€", info:"Prix des Artisans Commerçants 9h00 - inscription à l'avance", lat:c("Thise")[0], lng:c("Thise")[1], type:"CONCOURS" },

  // ── OCTOBRE 2026 ───────────────────────────────────────────
  { id:91, date:"2026-10-03", ville:"PFC",                lieu:"Les Planches", club:"PFC",                 format:"DOUBLETTE", categorie:"Mixte",          info:"Concours de l'avenir - 1 jeune licencié ou non + 1 adulte", lat:c("PFC")[0], lng:c("PFC")[1], type:"CONCOURS" },
  { id:92, date:"2026-10-09", ville:"Besançon",           lieu:"Rosemont",     club:"District de Besançon",format:"DOUBLETTE", categorie:"Sénior",         dotation:"40%", info:"Coupe du District 14h00", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CONCOURS" },
  { id:93, date:"2026-10-10", ville:"Besançon",           lieu:"Rosemont",     club:"District de Besançon",format:"DOUBLETTE", categorie:"Féminin",        dotation:"60%", info:"Coupe Octobre Rose - Doublette Féminin 14h00", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CONCOURS" },
  { id:94, date:"2026-10-18", ville:"Pontarlier",         lieu:"Boulodrome",   club:"Pontarlier",          format:"TRIPLETTE", categorie:"Sénior",         dotation:"500€", info:"Challenge de la Ville 9h00 - inscriptions avant le 16/10 12h00", lat:c("Pontarlier")[0], lng:c("Pontarlier")[1], type:"CONCOURS" },
  { id:95, date:"2026-10-24", ville:"Pontarlier",         lieu:"Boulodrome",   club:"Pontarlier",          format:"DOUBLETTE", categorie:"Mixte",          info:"Concours Amène ton pote - 1 licencié + 1 non licencié - inscriptions avant le 23/10 19h00", lat:c("Pontarlier")[0], lng:c("Pontarlier")[1], type:"CONCOURS" },
  { id:96, date:"2026-10-24", ville:"Villers-le-Lac",     lieu:"Boulodrome",   club:"Villers-le-Lac",      format:"DOUBLETTE", categorie:"Sénior",         dotation:"250€", info:"Coupe du Saut du Doubs sur invitation limité 24 équipes 9h00", lat:c("Villers-le-Lac")[0], lng:c("Villers-le-Lac")[1], type:"CONCOURS" },
  { id:97, date:"2026-10-24", ville:"Besançon",           lieu:"Rosemont",     club:"Vesontio",            format:"DOUBLETTE", categorie:"Sénior",         dotation:"250€", info:"Challenge Audrey DEQUAIRE 14h00", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CONCOURS" },
  { id:98, date:"2026-10-24", ville:"Besançon",           lieu:"Rosemont",     club:"Vesontio",            format:"DOUBLETTE", categorie:"Féminin",        dotation:"40%", info:"Challenge Audrey DEQUAIRE - Doublette Féminin 14h00", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CONCOURS" },

  // ── NOVEMBRE 2026 ──────────────────────────────────────────
  { id:99,  date:"2026-11-10", ville:"Thise",             lieu:"Rosemont",     club:"Thise",               format:"TRIPLETTE", categorie:"Vétéran",        dotation:"40%", info:"Triplette Vétérans 14h00", lat:c("Thise")[0], lng:c("Thise")[1], type:"CONCOURS" },
  { id:100, date:"2026-11-14", ville:"Besançon",          lieu:"Rosemont",     club:"Vesontio",            format:"TRIPLETTE", categorie:"Sénior",         dotation:"250€", info:"Challenge Antoine SAN JOSE 14h00", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CONCOURS" },
  { id:101, date:"2026-11-14", ville:"Pontarlier",        lieu:"Boulodrome",   club:"Pontarlier",          format:"DOUBLETTE", categorie:"Mixte",          dotation:"300€", info:"Prix de l'OMS - Doublette mixte 14h00 limité 24 équipes - inscriptions à l'avance", lat:c("Pontarlier")[0], lng:c("Pontarlier")[1], type:"CONCOURS" },
  { id:102, date:"2026-11-15", ville:"Pontarlier",        lieu:"Boulodrome",   club:"Pontarlier",          format:"DOUBLETTE", categorie:"Jeunes",         info:"Concours Jeunes 10h00 - 1 adulte licencié + 1 enfant - inscriptions avant le 14/11 12h00", lat:c("Pontarlier")[0], lng:c("Pontarlier")[1], type:"CONCOURS" },
  { id:103, date:"2026-11-16", ville:"Sochaux",           lieu:"Boulodrome",   club:"Sochaux",             format:"TRIPLETTE", categorie:"Vétéran",        dotation:"400€", info:"Challenge Jacques RICARD - Triplette Vétérans Homogène limité 40 équipes - phase finale le 20 novembre 9h00", lat:c("Sochaux")[0], lng:c("Sochaux")[1], type:"CONCOURS" },
  { id:104, date:"2026-11-28", ville:"Beure",             lieu:"Rosemont",     club:"Beure",               format:"DOUBLETTE", categorie:"Mixte",          info:"Prix des Gamins - 1 adulte licencié + 1 enfant limité 48 équipes 14h00 - inscriptions à l'avance", lat:c("Beure")[0], lng:c("Beure")[1], type:"CONCOURS" },

  // ── DÉCEMBRE 2026 ──────────────────────────────────────────
  { id:105, date:"2026-12-03", ville:"Pontarlier",        lieu:"Boulodrome",   club:"Pontarlier",          format:"TRIPLETTE", categorie:"Vétéran NH",     dotation:"600€", info:"Challenge de la VILLE - 10H NH limité 24 équipes sur invitation 8h30", lat:c("Pontarlier")[0], lng:c("Pontarlier")[1], type:"CONCOURS" },
  { id:106, date:"2026-12-05", ville:"Pont-de-Roide",     lieu:"Boulodrome",   club:"Pont-de-Roide",       format:"TRIPLETTE", categorie:"Féminin",        dotation:"300€", info:"Triplette de ces dames - limité 18 équipes", lat:c("Pont-de-Roide")[0], lng:c("Pont-de-Roide")[1], type:"CONCOURS" },
  { id:107, date:"2026-12-05", ville:"Thise",             lieu:"Rosemont",     club:"Thise",               format:"TRIPLETTE", categorie:"Sénior",         dotation:"50%", info:"Coupe St Nicolas 14h00", lat:c("Thise")[0], lng:c("Thise")[1], type:"CONCOURS" },
  { id:108, date:"2026-12-12", ville:"Besançon",          lieu:"Rosemont",     club:"Vesontio",            format:"TRIPLETTE", categorie:"Mixte",          dotation:"250€", info:"Coupe de Noël - Triplette Mixte 14h00", lat:c("Rosemont")[0], lng:c("Rosemont")[1], type:"CONCOURS" },
  { id:109, date:"2026-12-19", ville:"Nancray",           lieu:"Rosemont",     club:"Nancray",             format:"TRIPLETTE", categorie:"Sénior",         dotation:"300€", info:"Coupe de Noël 14h00", lat:c("Nancray")[0], lng:c("Nancray")[1], type:"CONCOURS" },
  { id:110, date:"2026-12-27", ville:"Beure",             lieu:"Rosemont",     club:"Beure",               format:"TRIPLETTE", categorie:"Sénior",         dotation:"40%", info:"Coupe de fin d'année 14h00", lat:c("Beure")[0], lng:c("Beure")[1], type:"CONCOURS" },
  { id:111, date:"2026-12-27", ville:"Pont-de-Roide",     lieu:"Boulodrome",   club:"Pont-de-Roide",       format:"TRIPLETTE", categorie:"Sénior",         dotation:"600€", info:"Masters Bernard PECKER - Triplette Homogène inscriptions avant le 01/12 limité 36 équipes 14h00", lat:c("Pont-de-Roide")[0], lng:c("Pont-de-Roide")[1], type:"CONCOURS" },
];
