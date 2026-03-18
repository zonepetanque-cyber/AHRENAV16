// api/news.ts
// Agrège les flux RSS des comités départementaux côté serveur (pas de CORS).
// Cache 2h sur le CDN Vercel.
//
// Pour activer un futur département : passer active: false → true
// Ordre de tentative pour chaque dept : /feed → /?feed=rss2 → /rss.xml
// (couvre WordPress ET Sportsregions automatiquement)

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface DeptSource {
  filterKeywords?: string[];
  dept: string;
  code: string;
  color: string;
  rssUrls: string[];
  siteUrl: string;
  active: boolean;
}

const c = (code: string): string => ({
  '01': '#8b5cf6', '02': '#06b6d4', '03': '#10b981', '04': '#84cc16',
  '06': '#0066CC', '07': '#f97316', '09': '#e11d48', '10': '#f43f5e',
  '11': '#a855f7', '12': '#f97316', '13': '#ef4444', '14': '#3b82f6',
  '15': '#d97706', '17': '#0891b2', '58': '#ea580c', 'FR': '#dc2626',
} as Record<string,string>)[code] || '#6b7280';

// Construit les 3 URLs RSS standard pour un site donné
const rss = (site: string, extra: string[] = []): string[] => [
  `${site}/feed`,
  `${site}/?feed=rss2`,
  `${site}/rss.xml`,
  ...extra,
];

const DEPT_SOURCES: DeptSource[] = [

  // ── ACTIFS (dans le calendrier) ──────────────────────────────────────────
  { dept: 'Ain (01)',               code: '01', color: c('01'), active: true,  siteUrl: 'https://www.petanque01.fr',         rssUrls: rss('https://www.petanque01.fr') },
  { dept: 'Aisne (02)',             code: '02', color: c('02'), active: true,  siteUrl: 'https://www.petanque02.fr',         rssUrls: rss('https://www.petanque02.fr') },
  { dept: 'Allier (03)',            code: '03', color: c('03'), active: true,  siteUrl: 'https://www.petanque03.fr',         rssUrls: rss('https://www.petanque03.fr') },
  { dept: 'AHP (04)',               code: '04', color: c('04'), active: true,  siteUrl: 'https://www.petanque04.fr',         rssUrls: rss('https://www.petanque04.fr') },
  { dept: 'Alpes-Mar. (06)',        code: '06', color: c('06'), active: true,  siteUrl: 'https://www.ffpjp06.fr',            rssUrls: rss('https://www.ffpjp06.fr', ['https://www.petanque06.fr/feed', 'https://www.petanque06.fr/rss.xml']) },
  { dept: 'Ardèche (07)',           code: '07', color: c('07'), active: true,  siteUrl: 'https://www.petanque07.fr',         rssUrls: rss('https://www.petanque07.fr') },
  { dept: 'Ariège (09)',            code: '09', color: c('09'), active: true,  siteUrl: 'https://petanque09.fr',             rssUrls: rss('https://petanque09.fr') },
  { dept: 'Aube (10)',              code: '10', color: c('10'), active: true,  siteUrl: 'https://www.petanque10.fr',         rssUrls: rss('https://www.petanque10.fr') },
  { dept: 'Aude (11)',              code: '11', color: c('11'), active: true,  siteUrl: 'https://www.petanque-aude.fr',      rssUrls: rss('https://www.petanque-aude.fr') },
  { dept: 'Aveyron (12)',           code: '12', color: c('12'), active: true,  siteUrl: 'https://www.petanque12.fr',         rssUrls: rss('https://www.petanque12.fr') },
  { dept: 'BDR (13)',               code: '13', color: c('13'), active: true,  siteUrl: 'https://www.petanque13.fr',         rssUrls: rss('https://www.petanque13.fr') },
  { dept: 'Calvados (14)',          code: '14', color: c('14'), active: true,  siteUrl: 'https://www.petanque14.fr',         rssUrls: rss('https://www.petanque14.fr') },
  { dept: 'Cantal (15)',            code: '15', color: c('15'), active: true,  siteUrl: 'https://www.petanque-cantal.com',  rssUrls: rss('https://www.petanque-cantal.com') },
  { dept: 'Charente-Maritime (17)', code: '17', color: c('17'), active: true,  siteUrl: 'https://www.ffpjp-cd17.com',        rssUrls: rss('https://www.ffpjp-cd17.com') },
  { dept: 'Nièvre (58)',            code: '58', color: c('58'), active: true,  siteUrl: 'https://www.petanque58.fr',         rssUrls: rss('https://www.petanque58.fr') },
  { dept: 'FFPJP',                  code: 'FR', color: c('FR'), active: true,  siteUrl: 'https://home.ffpjp.org',            rssUrls: rss('https://home.ffpjp.org', ['https://www.ffpjp.fr/feed', 'https://www.ffpjp.fr/rss.xml']) },

  // ── MÉDIAS & SITES SPÉCIALISÉS ───────────────────────────────────────────
  { dept: 'Boulistenaute',    code: 'MEDIA', color: '#e11d48', active: true, siteUrl: 'https://www.boulistenaute.com',       rssUrls: ['https://www.boulistenaute.com/syndication/les-actualites-de-la-petanque-et-du-monde-bouliste/', 'https://www.boulistenaute.com/feed', 'https://www.boulistenaute.com/rss.xml'] },
  { dept: 'Sportmag',         code: 'MEDIA', color: '#7c3aed', active: true, siteUrl: 'https://www.sportmag.fr',              rssUrls: ['https://www.sportmag.fr/category/petanque/feed', 'https://www.sportmag.fr/category/petanque/rss.xml'] },
  { dept: 'Boule Provençal',  code: 'MEDIA', color: '#0369a1', active: true, siteUrl: 'https://bouleprovencal.org',           rssUrls: rss('https://bouleprovencal.org') },
  { dept: 'FFSB Sport-Boules',code: 'MEDIA', color: '#059669', active: true, siteUrl: 'https://www.ffsb.fr',                  rssUrls: rss('https://www.ffsb.fr') },
  { dept: 'France 3 Pétanque',code: 'MEDIA', color: '#1d4ed8', active: true, siteUrl: 'https://france3-regions.franceinfo.fr/sport/petanque', rssUrls: ['https://france3-regions.franceinfo.fr/sport/petanque/rss.xml', 'https://france3-regions.franceinfo.fr/sport/petanque/feed', 'https://france3-regions.franceinfo.fr/rss/sport.xml'] },
  { dept: 'PPF Tour',         code: 'MEDIA', color: '#b45309', active: true, siteUrl: 'https://www.petanquefrancaise.com',    rssUrls: rss('https://www.petanquefrancaise.com') },
  { dept: 'Trophée des Villes',code:'MEDIA', color: '#6d28d9', active: true, siteUrl: 'https://www.tropheedesvilles.fr',      rssUrls: rss('https://www.tropheedesvilles.fr') },
  { dept: 'Ouest-France',     code: 'MEDIA', color: '#0f4c8a', active: true, siteUrl: 'https://www.ouest-france.fr/sport/petanque', rssUrls: ['https://www.ouest-france.fr/sport/petanque/rss', 'https://www.ouest-france.fr/sport/rss', 'https://www.ouest-france.fr/rss/sport.xml'], filterKeywords: ['pétanque','petanque','boules','bouliste'] },
  { dept: 'Midi Libre',       code: 'MEDIA', color: '#e8520a', active: true, siteUrl: 'https://www.midilibre.fr/sport', rssUrls: ['https://www.midilibre.fr/sport/petanque/rss.xml', 'https://www.midilibre.fr/sport/rss.xml', 'https://www.midilibre.fr/rss.xml'], filterKeywords: ['pétanque','petanque','boules','bouliste'] },
  { dept: 'La Montagne',      code: 'MEDIA', color: '#2d7d46', active: true, siteUrl: 'https://www.lamontagne.fr/sport', rssUrls: ['https://www.lamontagne.fr/sport/petanque/rss.xml', 'https://www.lamontagne.fr/sport/rss.xml', 'https://www.lamontagne.fr/rss.xml'], filterKeywords: ['pétanque','petanque','boules','bouliste'] },

  // ── FUTURS (active: false → mettre true quand ajouté au calendrier) ──────
  { dept: 'Charente (16)',          code: '16', color: '#6b7280', active: false, siteUrl: 'https://www.petanque16.fr',                 rssUrls: rss('https://www.petanque16.fr') },
  { dept: 'Cher (18)',              code: '18', color: '#6b7280', active: false, siteUrl: 'https://www.petanque18.fr',                 rssUrls: rss('https://www.petanque18.fr') },
  { dept: 'Corrèze (19)',           code: '19', color: '#6b7280', active: false, siteUrl: 'https://www.petanque19.fr',                 rssUrls: rss('https://www.petanque19.fr') },
  { dept: 'Côte-d\'Or (21)',        code: '21', color: '#6b7280', active: false, siteUrl: 'https://www.petanque21.fr',                 rssUrls: rss('https://www.petanque21.fr') },
  { dept: 'Côtes-d\'Armor (22)',    code: '22', color: '#6b7280', active: false, siteUrl: 'https://www.petanque22.fr',                 rssUrls: rss('https://www.petanque22.fr') },
  { dept: 'Dordogne (24)',          code: '24', color: '#6b7280', active: false, siteUrl: 'https://www.petanque24.fr',                 rssUrls: rss('https://www.petanque24.fr') },
  { dept: 'Drôme (26)',             code: '26', color: '#6b7280', active: false, siteUrl: 'https://www.petanque26.fr',                 rssUrls: rss('https://www.petanque26.fr') },
  { dept: 'Finistère (29)',         code: '29', color: '#6b7280', active: false, siteUrl: 'https://www.petanque-finistere.fr',         rssUrls: rss('https://www.petanque-finistere.fr') },
  { dept: 'Gard (30)',              code: '30', color: '#6b7280', active: false, siteUrl: 'https://www.petanque30.fr',                 rssUrls: rss('https://www.petanque30.fr') },
  { dept: 'Haute-Garonne (31)',     code: '31', color: '#6b7280', active: false, siteUrl: 'https://www.petanque31.fr',                 rssUrls: rss('https://www.petanque31.fr') },
  { dept: 'Gironde (33)',           code: '33', color: '#6b7280', active: false, siteUrl: 'https://www.comitepetanquegironde.fr',      rssUrls: rss('https://www.comitepetanquegironde.fr') },
  { dept: 'Hérault (34)',           code: '34', color: '#6b7280', active: false, siteUrl: 'https://www.petanque34.fr',                 rssUrls: rss('https://www.petanque34.fr') },
  { dept: 'Ille-et-Vilaine (35)',   code: '35', color: '#6b7280', active: false, siteUrl: 'https://www.petanque35.fr',                 rssUrls: rss('https://www.petanque35.fr') },
  { dept: 'Indre-et-Loire (37)',    code: '37', color: '#6b7280', active: false, siteUrl: 'https://www.petanque37.fr',                 rssUrls: rss('https://www.petanque37.fr') },
  { dept: 'Isère (38)',             code: '38', color: '#6b7280', active: false, siteUrl: 'https://www.petanque38.fr',                 rssUrls: rss('https://www.petanque38.fr') },
  { dept: 'Landes (40)',            code: '40', color: '#6b7280', active: false, siteUrl: 'https://www.petanque40.fr',                 rssUrls: rss('https://www.petanque40.fr') },
  { dept: 'Loire (42)',             code: '42', color: '#6b7280', active: false, siteUrl: 'https://www.petanque42.fr',                 rssUrls: rss('https://www.petanque42.fr') },
  { dept: 'Loire-Atl. (44)',        code: '44', color: '#6b7280', active: false, siteUrl: 'https://www.petanque44.fr',                 rssUrls: rss('https://www.petanque44.fr') },
  { dept: 'Lot-et-Garonne (47)',    code: '47', color: '#6b7280', active: false, siteUrl: 'https://www.petanque47.fr',                 rssUrls: rss('https://www.petanque47.fr') },
  { dept: 'Maine-et-Loire (49)',    code: '49', color: '#6b7280', active: false, siteUrl: 'https://www.ffpjp-cd49.com',                rssUrls: rss('https://www.ffpjp-cd49.com') },
  { dept: 'Morbihan (56)',          code: '56', color: '#6b7280', active: false, siteUrl: 'https://www.petanque56.fr',                 rssUrls: rss('https://www.petanque56.fr') },
  { dept: 'Nord (59)',              code: '59', color: '#6b7280', active: false, siteUrl: 'https://www.petanque59.fr',                 rssUrls: rss('https://www.petanque59.fr') },
  { dept: 'Pas-de-Calais (62)',     code: '62', color: '#6b7280', active: false, siteUrl: 'https://www.petanque62.fr',                 rssUrls: rss('https://www.petanque62.fr') },
  { dept: 'Puy-de-Dôme (63)',       code: '63', color: '#6b7280', active: false, siteUrl: 'https://www.petanque63.fr',                 rssUrls: rss('https://www.petanque63.fr') },
  { dept: 'Pyr.-Atl. (64)',         code: '64', color: '#6b7280', active: false, siteUrl: 'https://www.petanque64.fr',                 rssUrls: rss('https://www.petanque64.fr') },
  { dept: 'Hautes-Pyr. (65)',       code: '65', color: '#6b7280', active: false, siteUrl: 'https://www.petanque65.fr',                 rssUrls: rss('https://www.petanque65.fr') },
  { dept: 'Pyr.-Orient. (66)',      code: '66', color: '#6b7280', active: false, siteUrl: 'https://www.petanque66.fr',                 rssUrls: rss('https://www.petanque66.fr') },
  { dept: 'Bas-Rhin (67)',          code: '67', color: '#6b7280', active: false, siteUrl: 'https://www.petanque67.fr',                 rssUrls: rss('https://www.petanque67.fr') },
  { dept: 'Haut-Rhin (68)',         code: '68', color: '#6b7280', active: false, siteUrl: 'https://www.cd68petanque.fr',               rssUrls: rss('https://www.cd68petanque.fr') },
  { dept: 'Rhône (69)',             code: '69', color: '#6b7280', active: false, siteUrl: 'https://www.petanque69.fr',                 rssUrls: rss('https://www.petanque69.fr') },
  { dept: 'Saône-et-Loire (71)',    code: '71', color: '#6b7280', active: false, siteUrl: 'https://www.petanque71.fr',                 rssUrls: rss('https://www.petanque71.fr') },
  { dept: 'Sarthe (72)',            code: '72', color: '#6b7280', active: false, siteUrl: 'https://www.petanque72.fr',                 rssUrls: rss('https://www.petanque72.fr') },
  { dept: 'Savoie (73)',            code: '73', color: '#6b7280', active: false, siteUrl: 'https://www.petanque73.fr',                 rssUrls: rss('https://www.petanque73.fr') },
  { dept: 'Haute-Savoie (74)',      code: '74', color: '#6b7280', active: false, siteUrl: 'https://www.petanque74.fr',                 rssUrls: rss('https://www.petanque74.fr') },
  { dept: 'Seine-Maritime (76)',    code: '76', color: '#6b7280', active: false, siteUrl: 'https://www.petanque76.fr',                 rssUrls: rss('https://www.petanque76.fr') },
  { dept: 'Deux-Sèvres (79)',       code: '79', color: '#6b7280', active: false, siteUrl: 'https://www.petanque79.com',                rssUrls: rss('https://www.petanque79.com') },
  { dept: 'Tarn (81)',              code: '81', color: '#6b7280', active: false, siteUrl: 'https://www.petanque81.fr',                 rssUrls: rss('https://www.petanque81.fr') },
  { dept: 'Var (83)',               code: '83', color: '#6b7280', active: false, siteUrl: 'https://www.petanque83.fr',                 rssUrls: rss('https://www.petanque83.fr') },
  { dept: 'Vaucluse (84)',          code: '84', color: '#6b7280', active: false, siteUrl: 'https://www.petanque84.fr',                 rssUrls: rss('https://www.petanque84.fr') },
  { dept: 'Vendée (85)',            code: '85', color: '#6b7280', active: false, siteUrl: 'https://www.ffpjp-cd85.com',                rssUrls: rss('https://www.ffpjp-cd85.com') },
  { dept: 'Vienne (86)',            code: '86', color: '#6b7280', active: false, siteUrl: 'https://www.petanque86.fr',                 rssUrls: rss('https://www.petanque86.fr') },
  { dept: 'Haute-Vienne (87)',      code: '87', color: '#6b7280', active: false, siteUrl: 'https://www.petanque87.fr',                 rssUrls: rss('https://www.petanque87.fr') },
];

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  date: string;
  excerpt: string;
  image?: string;
  dept: string;
  code: string;
  color: string;
  siteUrl: string;
}

function parseRSS(xml: string, source: DeptSource): NewsItem[] {
  const items: NewsItem[] = [];
  const isAtom = xml.includes('<feed');
  const itemRegex = isAtom ? /<entry>([\s\S]*?)<\/entry>/g : /<item>([\s\S]*?)<\/item>/g;

  const getTag = (block: string, tag: string): string => {
    const cdata = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'));
    if (cdata) return cdata[1].trim();
    const normal = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
    if (normal) return normal[1].trim();
    const href = block.match(new RegExp(`<${tag}[^>]*href="([^"]*)"`, 'i'));
    if (href) return href[1].trim();
    return '';
  };

  const stripHtml = (html: string) =>
    html.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();

  const extractImage = (block: string): string | undefined => {
    const patterns = [
      /<enclosure[^>]+url="([^"]+\.(jpg|jpeg|png|webp)[^"]*)"/i,
      /<media:content[^>]+url="([^"]+)"/i,
      /<media:thumbnail[^>]+url="([^"]+)"/i,
      /<img[^>]+src="([^"]+\.(jpg|jpeg|png|webp)[^"]*)"/i,
    ];
    for (const p of patterns) { const m = block.match(p); if (m) return m[1]; }
    return undefined;
  };

  const keywords = source.filterKeywords;
  // Pour les flux filtrés, on scanne plus d'articles pour en trouver assez
  const maxScan = keywords ? 60 : 5;
  const maxKeep = 5;

  let match, scanned = 0, count = 0;
  while ((match = itemRegex.exec(xml)) !== null && scanned < maxScan && count < maxKeep) {
    scanned++;
    const block = match[1];
    const title = stripHtml(getTag(block, 'title'));
    if (!title) continue;
    const dateRaw = getTag(block, 'pubDate') || getTag(block, 'published') || getTag(block, 'updated');
    const descRaw = getTag(block, 'description') || getTag(block, 'summary') || getTag(block, 'content');
    const excerpt = stripHtml(descRaw).slice(0, 200).trim();

    // Filtre par mots-clés si défini
    if (keywords) {
      const haystack = (title + ' ' + excerpt).toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const needles = keywords.map(k => k.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
      if (!needles.some(k => haystack.includes(k))) continue;
    }

    const link = getTag(block, 'link') || getTag(block, 'guid');
    const image = extractImage(block);
    let date = new Date().toISOString();
    try { if (dateRaw) date = new Date(dateRaw).toISOString(); } catch {}
    items.push({
      id: `${source.code}-${count}-${Date.now()}`,
      title, link: link || source.siteUrl, date,
      excerpt: excerpt || title, image,
      dept: source.dept, code: source.code,
      color: source.color, siteUrl: source.siteUrl,
    });
    count++;
  }
  return items;
}

async function fetchFeed(source: DeptSource): Promise<NewsItem[]> {
  for (const rssUrl of source.rssUrls) {
    try {
      const res = await fetch(rssUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AHRENA-NewsAggregator/1.0)', 'Accept': 'application/rss+xml, application/xml, text/xml, */*' },
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) continue;
      const xml = await res.text();
      if (!xml.includes('<rss') && !xml.includes('<feed') && !xml.includes('<channel')) continue;
      const items = parseRSS(xml, source);
      if (items.length > 0) return items;
    } catch { continue; }
  }
  return [];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 's-maxage=7200, stale-while-revalidate=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const activeSources = DEPT_SOURCES.filter(s => s.active);

  try {
    const results = await Promise.allSettled(activeSources.map(s => fetchFeed(s)));
    const allItems: NewsItem[] = [];
    const failedDepts: string[] = [];

    results.forEach((result, i) => {
      if (result.status === 'fulfilled' && result.value.length > 0) allItems.push(...result.value);
      else failedDepts.push(activeSources[i].dept);
    });

    allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    res.status(200).json({ items: allItems, total: allItems.length, failedDepts, updatedAt: new Date().toISOString() });
  } catch {
    res.status(500).json({ error: 'Erreur serveur', items: [], total: 0 });
  }
}
