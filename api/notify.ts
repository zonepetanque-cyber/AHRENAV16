// api/notify.ts
// ─────────────────────────────────────────────────────────────────────────────
// Endpoint sécurisé pour envoyer les notifications push
// VÉRIFIE le statut premium côté serveur avant tout envoi
// Appelé par api/live.ts quand un nouveau live est détecté
//
// Sécurité :
// 1. Vérifie NOTIFY_SECRET pour s'assurer que l'appel vient du serveur AHRENA
// 2. Vérifie is_premium dans Supabase pour chaque destinataire
// 3. Vérifie les préférences de canal (channel_subscriptions)
// ─────────────────────────────────────────────────────────────────────────────

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import webpush from 'web-push';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // clé service = accès admin
);

webpush.setVapidDetails(
  'mailto:support@ahrena.com',
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  // ── 1. Vérifier le secret serveur ────────────────────────────
  const secret = req.headers['x-notify-secret'];
  if (secret !== process.env.NOTIFY_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { title, body, url, channelName, icon } = req.body;
  if (!title || !body) return res.status(400).json({ error: 'Missing title/body' });

  try {
    // ── 2. Récupérer UNIQUEMENT les abonnés premium ───────────
    // JOIN entre push_subscriptions et profiles pour filtrer is_premium
    const { data: subscribers, error } = await supabase
      .from('push_subscriptions')
      .select(`
        user_id,
        subscription,
        profiles!inner(is_premium)
      `)
      .eq('profiles.is_premium', true); // ← sécurité serveur : VIP uniquement

    if (error) throw error;
    if (!subscribers || subscribers.length === 0) {
      return res.status(200).json({ sent: 0, message: 'No premium subscribers' });
    }

    // ── 3. Si channelName précisé, filtrer par préférences canal ─
    let targets = subscribers;
    if (channelName) {
      const { data: subs } = await supabase
        .from('channel_subscriptions')
        .select('user_id')
        .eq('channel_name', channelName);

      const subbedUsers = new Set((subs || []).map((s: any) => s.user_id));
      targets = subscribers.filter((s: any) => subbedUsers.has(s.user_id));
    }

    // ── 4. Envoyer les notifications ──────────────────────────
    const payload = JSON.stringify({
      title,
      body,
      icon: icon || 'https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_application_2.jpg?v=1773420195',
      badge: 'https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_application_2.jpg?v=1773420195',
      url: url || '/',
      tag: `live-${Date.now()}`, // évite les doublons
    });

    const results = await Promise.allSettled(
      targets.map(async (sub: any) => {
        const pushSub = JSON.parse(sub.subscription);
        await webpush.sendNotification(pushSub, payload);
      })
    );

    const sent = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    // Nettoyer les subscriptions invalides (token expiré)
    const expiredIndices = results
      .map((r, i) => r.status === 'rejected' ? i : -1)
      .filter(i => i >= 0);

    if (expiredIndices.length > 0) {
      const expiredUserIds = expiredIndices.map(i => targets[i].user_id);
      await supabase
        .from('push_subscriptions')
        .delete()
        .in('user_id', expiredUserIds);
    }

    return res.status(200).json({ sent, failed, total: targets.length });

  } catch (err: any) {
    console.error('[NOTIFY] Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
