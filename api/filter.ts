// api/filter.ts
// ─────────────────────────────────────────────────────────────────────────────
// Filtrage automatique — logique simple et précise :
//
// • Boulistenaute, FFPJP, FFSB, Pétanque TV Europe, Groupe Pétanque,
//   Pétanque Academy, PPF → 100% pétanque/sport-boules → AUCUN FILTRE
//
// • Sportmag, Sportmediamat → filtre actif :
//   le titre DOIT contenir un mot lié à la pétanque/boules
//   sinon la vidéo est masquée
//
// 100% gratuit — 0 appel API externe
// Cron Vercel : tous les jours à 3h00
// ─────────────────────────────────────────────────────────────────────────────

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

// ── Chaînes exemptées de tout filtre ─────────────────────────────────────────
const NO_FILTER_CHANNELS = [
  'boulistenaute',
  'ffpjp',
  'ffsb',
  'pétanque tv europe',
  'petanque tv europe',
  'groupe pétanque',
  'groupe petanque',
  'petanque academy',
  'pétanque academy',
  'ppf',
];

// ── Chaînes avec filtre actif ─────────────────────────────────────────────────
const FILTERED_CHANNELS = ['sportmag', 'sportmediamat'];

// ── Mots-clés acceptés pour Sportmag & Sportmediamat ─────────────────────────
// Le titre doit contenir au moins un de ces mots pour être affiché
const PETANQUE_KEYWORDS = [
  'pétanque', 'petanque',
  'boule', 'boules', 'bouliste', 'boulodrome',
  'triplette', 'doublette',
  'tête-à-tête', 'tete-a-tete',
  'cochonnet',
  'pointeur', 'tireur',
  'mène',
  'carreau',
  'jeu provençal', 'jeu provencal',
  'sport-boules', 'sport boules',
  'ffpjp', 'ffsb', 'ppf',
  'marseillaise',
  'masters',
];

// ── Normalisation (minuscules + sans accents) ─────────────────────────────────
function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function containsPetanque(title: string): boolean {
  const norm = normalize(title);
  return PETANQUE_KEYWORDS.some(kw => norm.includes(normalize(kw)));
}

// ── Décision pour une vidéo ───────────────────────────────────────────────────
function isVideoRelevant(title: string, channelName: string): boolean {
  const chNorm = normalize(channelName);

  // Chaînes sans filtre → toujours accepté
  if (NO_FILTER_CHANNELS.some(ch => chNorm.includes(normalize(ch)))) {
    return true;
  }

  // Sportmag & Sportmediamat → le titre doit contenir un mot pétanque
  if (FILTERED_CHANNELS.some(ch => chNorm.includes(ch))) {
    return containsPetanque(title);
  }

  // Toute autre chaîne → accepté par défaut
  return true;
}

// ── Récupère les vidéos via RSS (0 quota YouTube) ─────────────────────────────
async function getAllChannelVideos() {
  const CHANNELS = [
    { id: "UCZeAfPeaRc_es11c0YSOhGg", name: "Boulistenaute" },
    { id: "UCHVNyFEDNOq6q4OkG2YzIQQ", name: "Sportmag" },
    { id: "UCvSPMtEs1EtxC_Ik0KgoClQ", name: "Sportmediamat" },
    { id: "UCQX6vA1lYtP6nv8XROK56pQ", name: "Petanque Academy" },
    { id: "UCpq3CYTOqiW-t2kqrtWZDug", name: "Groupe Pétanque" },
    { id: "UCLNGJZ85f3W1ZZxUBeNdqDg", name: "Pétanque TV Europe" },
    { id: "UCyQAL0ZOE9YLXfkndhlgJMQ", name: "PPF" },
    { id: "UCAcERCZ6CKxXEnwQTiaooBw", name: "FFPJP" },
    { id: "UCs5dyTykvpzwSyL5EsjcXNg", name: "FFSB" },
  ];

  const results = await Promise.all(
    CHANNELS.map(async (ch) => {
      try {
        const res = await fetch(
          `https://www.youtube.com/feeds/videos.xml?channel_id=${ch.id}`,
          { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(6000) }
        );
        if (!res.ok) return [];
        const xml = await res.text();
        const ids    = [...xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)].map(m => m[1].trim());
        const titles = [...xml.matchAll(/<title>([^<]*)<\/title>/g)].map(m => m[1].trim()).slice(1);
        return ids.slice(0, 10).map((id, i) => ({
          id,
          title: titles[i] || '',
          channelName: ch.name,
        }));
      } catch {
        return [];
      }
    })
  );

  return results.flat();
}

// ── Handler principal ─────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = req.headers['x-filter-token'] || req.query.token;
  const expectedToken = process.env.FILTER_SECRET_TOKEN || 'ahrena-filter-2026';
  if (token !== expectedToken) return res.status(401).json({ error: 'Non autorisé' });
  if (!SUPABASE_URL || !SUPABASE_KEY) return res.status(500).json({ error: 'Supabase non configuré' });

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  try {
    const allVideos = await getAllChannelVideos();
    if (allVideos.length === 0) return res.status(200).json({ message: 'Aucune vidéo récupérée', filtered: 0 });

    // Récupérer la blacklist existante pour ne pas re-analyser
    const { data: existing } = await supabase.from('video_blacklist').select('video_id');
    const alreadyBlacklisted = new Set((existing || []).map((b: any) => b.video_id));

    // Ne traiter que les nouvelles vidéos
    const toAnalyze = allVideos.filter(v =>
      !alreadyBlacklisted.has(v.id) &&
      v.title.trim() !== '' &&
      FILTERED_CHANNELS.some(ch => normalize(v.channelName).includes(ch))
    );

    if (toAnalyze.length === 0) {
      return res.status(200).json({
        message: 'Aucune nouvelle vidéo à analyser sur Sportmag/Sportmediamat',
        filtered: 0,
      });
    }

    // Filtrer
    const rejected = toAnalyze.filter(v => !isVideoRelevant(v.title, v.channelName));

    if (rejected.length === 0) {
      return res.status(200).json({
        message: `✅ Les ${toAnalyze.length} nouvelles vidéos Sportmag/Sportmediamat parlent toutes de pétanque`,
        analyzed: toAnalyze.length,
        filtered: 0,
      });
    }

    // Insérer dans la blacklist
    await supabase.from('video_blacklist').upsert(
      rejected.map(v => ({ video_id: v.id, title: v.title, channel: v.channelName })),
      { onConflict: 'video_id' }
    );

    return res.status(200).json({
      message: '🚫 Filtrage terminé',
      analyzed: toAnalyze.length,
      filtered: rejected.length,
      blacklisted: rejected.map(v => `${v.channelName} : "${v.title}"`),
    });

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
