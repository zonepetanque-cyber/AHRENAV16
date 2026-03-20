// api/send-notif.ts
// ─────────────────────────────────────────────────────────────────────────────
// Endpoint sécurisé pour envoyer des notifications push via l'API REST OneSignal
//
// Segments supportés :
//   - "all"     → tous les abonnés OneSignal
//   - "vip"     → tag is_premium = true
//   - "channel" → tag channel_<channelTag> = true  (ex: channel_boulistenaute)
//
// Sécurité : vérifie NOTIFY_SECRET pour s'assurer que l'appel vient du serveur
// (tableau de bord admin → appel direct côté client OK si clé = variable VITE_)
// ─────────────────────────────────────────────────────────────────────────────

import type { VercelRequest, VercelResponse } from '@vercel/node';

const ONESIGNAL_APP_ID   = process.env.ONESIGNAL_APP_ID   || '';
const ONESIGNAL_REST_KEY = process.env.ONESIGNAL_REST_API_KEY || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-notify-secret');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  // ── Vérification du secret ────────────────────────────────────────────────
  const secret = req.headers['x-notify-secret'];
  if (!process.env.NOTIFY_SECRET || secret !== process.env.NOTIFY_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!ONESIGNAL_APP_ID || !ONESIGNAL_REST_KEY) {
    const missing = [];
    if (!ONESIGNAL_APP_ID)   missing.push('ONESIGNAL_APP_ID');
    if (!ONESIGNAL_REST_KEY) missing.push('ONESIGNAL_REST_API_KEY');
    return res.status(500).json({ error: `Variables Vercel manquantes : ${missing.join(', ')}` });
  }

  const { title, body, url, segment, channelTag, icon } = req.body as {
    title:       string;
    body:        string;
    url?:        string;
    segment?:    'all' | 'vip' | 'channel';
    channelTag?: string;   // ex: "boulistenaute" → tag channel_boulistenaute
    icon?:       string;
  };

  if (!title?.trim() || !body?.trim()) {
    return res.status(400).json({ error: 'title et body sont requis' });
  }

  // ── Construction du filtre OneSignal ─────────────────────────────────────
  let filters: any[] | undefined;
  let included_segments: string[] | undefined;

  if (segment === 'all' || !segment) {
    included_segments = ['Total Subscriptions'];  // segment natif OneSignal v16+
  } else if (segment === 'vip') {
    filters = [{ field: 'tag', key: 'is_premium', relation: '=', value: 'true' }];
  } else if (segment === 'channel' && channelTag) {
    const tag = `channel_${channelTag.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    filters = [{ field: 'tag', key: tag, relation: '=', value: 'true' }];
  } else {
    included_segments = ['Total Subscriptions'];
  }

  // ── Payload OneSignal ─────────────────────────────────────────────────────
  const payload: Record<string, any> = {
    app_id: ONESIGNAL_APP_ID,
    headings:  { en: title, fr: title },
    contents:  { en: body,  fr: body  },
    url:  url || '/',
    web_icon: icon || 'https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_application_2.jpg?v=1773420195',
    chrome_web_icon: icon || 'https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_application_2.jpg?v=1773420195',
    firefox_icon: icon || 'https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_application_2.jpg?v=1773420195',
    ...(included_segments ? { included_segments } : {}),
    ...(filters           ? { filters }            : {}),
  };

  try {
    const osRes = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Basic ${ONESIGNAL_REST_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const osData = await osRes.json();

    if (!osRes.ok || osData.errors) {
      console.error('[send-notif] OneSignal error:', osData);
      return res.status(502).json({
        error:  'OneSignal a retourné une erreur',
        detail: osData.errors || osData,
      });
    }

    return res.status(200).json({
      success:    true,
      recipients: osData.recipients ?? 0,
      id:         osData.id,
    });

  } catch (err: any) {
    console.error('[send-notif] Fetch error:', err);
    return res.status(500).json({ error: err.message });
  }
}
