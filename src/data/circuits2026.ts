// Circuits premium pétanque 2026
// Ce fichier centralise les concours Masters de Pétanque et PPF Tour
// Le badge est appliqué automatiquement dans CalendarComponent
// quand une ville+dateDebut correspond à une entrée ci-dessous.

export const CIRCUIT_LOGOS = {
  masters: "https://cdn.shopify.com/s/files/1/0915/3760/4942/files/1774042007475.png?v=1774042096",
  ppf:     "https://cdn.shopify.com/s/files/1/0915/3760/4942/files/logo.png?v=1774042110",
};

export type CircuitBadge = "masters" | "ppf" | "both";

interface CircuitEntry {
  ville: string;       // correspondance sur ville (insensible à la casse)
  dateDebut: string;   // correspondance sur dateDebut (YYYY-MM-DD)
  circuit: "masters" | "ppf";
}

// ── Masters de Pétanque 2026 ──────────────────────────────────
// Source : calendrier officiel Masters de Pétanque 2026
const MASTERS_2026: CircuitEntry[] = [
  { ville: "Cholet",                      dateDebut: "2026-02-07", circuit: "masters" },
  { ville: "Sin-le-Noble",                dateDebut: "2026-02-13", circuit: "masters" },
  { ville: "Draguignan",                  dateDebut: "2026-05-16", circuit: "masters" },
  { ville: "Cannes",                      dateDebut: "2026-05-23", circuit: "masters" },
  { ville: "Pézenas",                     dateDebut: "2026-05-23", circuit: "masters" },
  { ville: "Bourbon-Lancy",               dateDebut: "2026-05-23", circuit: "masters" },
  { ville: "Andrézieux-Bouthéon",         dateDebut: "2026-06-06", circuit: "masters" },
  { ville: "Tinqueux",                    dateDebut: "2026-06-06", circuit: "masters" },
  { ville: "Blangy-sur-Bresle",           dateDebut: "2026-06-13", circuit: "masters" },
  { ville: "Nice",                        dateDebut: "2026-06-13", circuit: "masters" },
  { ville: "Firminy",                     dateDebut: "2026-06-13", circuit: "masters" },
  { ville: "Fréjus",                      dateDebut: "2026-07-03", circuit: "masters" },
  { ville: "Avranches",                   dateDebut: "2026-07-04", circuit: "masters" },
  { ville: "Raon-l'Étape",               dateDebut: "2026-07-04", circuit: "masters" },
  { ville: "Valréas",                     dateDebut: "2026-07-11", circuit: "masters" },
  { ville: "Bourbon-Lancy",               dateDebut: "2026-07-11", circuit: "masters" },
  { ville: "Saint-Bonnet-le-Château",     dateDebut: "2026-07-18", circuit: "masters" },
  { ville: "Golbey",                      dateDebut: "2026-07-18", circuit: "masters" },
  { ville: "Aubenas",                     dateDebut: "2026-07-23", circuit: "masters" },
  { ville: "Saint-Maurice-de-Beynost",    dateDebut: "2026-07-25", circuit: "masters" },
  { ville: "Bergerac",                    dateDebut: "2026-07-25", circuit: "masters" },
  { ville: "Saint-Symphorien-sur-Coise",  dateDebut: "2026-08-01", circuit: "masters" },
  { ville: "Sens",                        dateDebut: "2026-08-01", circuit: "masters" },
  { ville: "Le Puy-en-Velay",             dateDebut: "2026-08-04", circuit: "masters" },
  { ville: "Espalion",                    dateDebut: "2026-08-08", circuit: "masters" },
  { ville: "Saint-Nazaire",               dateDebut: "2026-08-08", circuit: "masters" },
  { ville: "Montpellier",                 dateDebut: "2026-08-12", circuit: "masters" },
  { ville: "Trévoux",                     dateDebut: "2026-08-15", circuit: "masters" },
  { ville: "Bastia",                      dateDebut: "2026-08-22", circuit: "masters" },
  { ville: "Kerlouan",                    dateDebut: "2026-08-22", circuit: "masters" },
  { ville: "Mulhouse",                    dateDebut: "2026-08-22", circuit: "masters" },
  { ville: "Rochefort",                   dateDebut: "2026-08-22", circuit: "masters" },
  { ville: "Auch",                        dateDebut: "2026-08-29", circuit: "masters" },
  { ville: "Bron",                        dateDebut: "2026-08-29", circuit: "masters" },
  { ville: "Saint-Florentin",             dateDebut: "2026-08-29", circuit: "masters" },
  { ville: "La Talaudière",               dateDebut: "2026-09-05", circuit: "masters" },
  { ville: "Charleville-Mézières",        dateDebut: "2026-09-05", circuit: "masters" },
  { ville: "Chalon-sur-Saône",            dateDebut: "2026-09-12", circuit: "masters" },
  { ville: "Île-Rousse",                  dateDebut: "2026-09-19", circuit: "masters" },
  { ville: "Ruoms",                       dateDebut: "2026-09-19", circuit: "masters" },
  { ville: "Laragne-Montéglin",           dateDebut: "2026-09-23", circuit: "masters" },
  { ville: "Ota Porto",                   dateDebut: "2026-09-26", circuit: "masters" },
  { ville: "Bourg-Saint-Andéol",          dateDebut: "2026-09-26", circuit: "masters" },
  { ville: "Nyons",                       dateDebut: "2026-10-03", circuit: "masters" },
  { ville: "Aix-en-Provence",             dateDebut: "2026-10-10", circuit: "masters" },
  { ville: "Vaulx-en-Velin",              dateDebut: "2026-10-10", circuit: "masters" },
  { ville: "Nice",                        dateDebut: "2026-10-17", circuit: "masters" },
  { ville: "Saint-Tropez",               dateDebut: "2026-10-31", circuit: "masters" },
];

// ── PPF Tour 2026 ─────────────────────────────────────────────
// Source : calendrier officiel PPF Tour 2026 (Masculin + Féminin + Vétérans)
const PPF_2026: CircuitEntry[] = [
  // Circuit Masculin
  { ville: "Rumilly",                     dateDebut: "2026-05-23", circuit: "ppf" },
  { ville: "Les Vans",                    dateDebut: "2026-05-30", circuit: "ppf" },
  { ville: "Blangy-sur-Bresle",           dateDebut: "2026-06-13", circuit: "ppf" },
  { ville: "Nice",                        dateDebut: "2026-06-13", circuit: "ppf" },
  { ville: "Marseille",                   dateDebut: "2026-07-05", circuit: "ppf" },
  { ville: "Valréas",                     dateDebut: "2026-07-11", circuit: "ppf" },
  { ville: "Espalion",                    dateDebut: "2026-08-08", circuit: "ppf" },
  { ville: "Trévoux",                     dateDebut: "2026-08-15", circuit: "ppf" },
  { ville: "Bastia",                      dateDebut: "2026-08-22", circuit: "ppf" },
  { ville: "Kerlouan",                    dateDebut: "2026-08-22", circuit: "ppf" },
  { ville: "Auch",                        dateDebut: "2026-08-29", circuit: "ppf" },
  { ville: "La Talaudière",               dateDebut: "2026-09-05", circuit: "ppf" },
  { ville: "Carcassonne",                 dateDebut: "2026-09-12", circuit: "ppf" },
  { ville: "Île-Rousse",                  dateDebut: "2026-09-19", circuit: "ppf" },
  { ville: "Ruoms",                       dateDebut: "2026-09-19", circuit: "ppf" },
  { ville: "Ajaccio",                     dateDebut: "2026-09-22", circuit: "ppf" },
  { ville: "Ota Porto",                   dateDebut: "2026-09-26", circuit: "ppf" },
  { ville: "Chusclan",                    dateDebut: "2026-10-07", circuit: "ppf" },
  { ville: "Saint-Tropez",               dateDebut: "2026-10-31", circuit: "ppf" },
  // Circuit Féminin
  { ville: "Rumilly",                     dateDebut: "2026-05-23", circuit: "ppf" },
  { ville: "Blangy-sur-Bresle",           dateDebut: "2026-06-13", circuit: "ppf" },
  { ville: "Espalion",                    dateDebut: "2026-08-09", circuit: "ppf" },
  { ville: "Bastia",                      dateDebut: "2026-08-22", circuit: "ppf" },
  { ville: "Auch",                        dateDebut: "2026-08-29", circuit: "ppf" },
  { ville: "La Talaudière",               dateDebut: "2026-09-05", circuit: "ppf" },
  { ville: "Carcassonne",                 dateDebut: "2026-09-12", circuit: "ppf" },
  { ville: "Île-Rousse",                  dateDebut: "2026-09-19", circuit: "ppf" },
  { ville: "Ruoms",                       dateDebut: "2026-09-19", circuit: "ppf" },
  { ville: "Ota Porto",                   dateDebut: "2026-09-26", circuit: "ppf" },
  { ville: "Saint-Tropez",               dateDebut: "2026-10-31", circuit: "ppf" },
  // Circuit Vétérans
  { ville: "Les Vans",                    dateDebut: "2026-05-29", circuit: "ppf" },
  { ville: "Nice",                        dateDebut: "2026-06-12", circuit: "ppf" },
  { ville: "Valréas",                     dateDebut: "2026-07-07", circuit: "ppf" },
  { ville: "Espalion",                    dateDebut: "2026-08-07", circuit: "ppf" },
  { ville: "Auch",                        dateDebut: "2026-08-27", circuit: "ppf" },
  { ville: "Carcassonne",                 dateDebut: "2026-09-10", circuit: "ppf" },
  { ville: "Ruoms",                       dateDebut: "2026-09-17", circuit: "ppf" },
  { ville: "Ajaccio",                     dateDebut: "2026-09-22", circuit: "ppf" },
  { ville: "Chusclan",                    dateDebut: "2026-10-07", circuit: "ppf" },
];

// ── Index de lookup : "ville|dateDebut" → badge ───────────────
// Construit une Map pour une recherche O(1)
const _buildIndex = (): Map<string, CircuitBadge> => {
  const map = new Map<string, CircuitBadge>();

  const add = (entry: CircuitEntry) => {
    const key = entry.ville.toLowerCase() + "|" + entry.dateDebut;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, entry.circuit);
    } else if (existing !== entry.circuit) {
      map.set(key, "both");
    }
  };

  MASTERS_2026.forEach(add);
  PPF_2026.forEach(add);
  return map;
};

const CIRCUIT_INDEX = _buildIndex();

/**
 * Retourne le badge circuit d'un concours, ou undefined si aucun.
 * Utilisé automatiquement dans CalendarComponent lors du mapping
 * de n'importe quel concours (national, départemental, etc.)
 *
 * @param ville    - ville du concours
 * @param dateDebut - date de début au format YYYY-MM-DD
 */
export function getCircuitBadge(ville: string, dateDebut: string): CircuitBadge | undefined {
  return CIRCUIT_INDEX.get(ville.toLowerCase() + "|" + dateDebut);
}

export { MASTERS_2026, PPF_2026 };
