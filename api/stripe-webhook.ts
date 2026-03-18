// api/stripe-webhook.ts
// ─────────────────────────────────────────────────────────────────────────────
// Webhook Stripe — active/désactive automatiquement le statut VIP dans Supabase
// quand un paiement est reçu ou qu'un abonnement est annulé.
//
// Variables d'environnement à ajouter dans Vercel :
//   STRIPE_SECRET_KEY          → sk_live_...
//   STRIPE_WEBHOOK_SECRET      → whsec_... (depuis Stripe Dashboard > Webhooks)
//   SUPABASE_URL               → https://xxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY  → clé service role (pas la clé anon !)
//
// Événements à activer dans Stripe Dashboard :
//   - customer.subscription.created
//   - customer.subscription.deleted
//   - invoice.payment_succeeded
//   - invoice.payment_failed
// ─────────────────────────────────────────────────────────────────────────────

import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

// Client Supabase avec la clé service role (accès complet, côté serveur uniquement)
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Désactiver le body parsing automatique de Vercel (nécessaire pour vérifier la signature Stripe)
export const config = {
  api: { bodyParser: false },
};

async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function setUserPremium(userId: string, userEmail: string, isPremium: boolean) {
  if (!userId && !userEmail) return;

  // Chercher l'utilisateur par userId d'abord, puis par email
  let query = supabase.from('profiles').update({ is_premium: isPremium });

  if (userId) {
    await query.eq('id', userId);
  } else if (userEmail) {
    // Chercher l'id via auth.users si on n'a que l'email
    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users?.users?.find(u => u.email === userEmail);
    if (user) {
      await supabase.from('profiles').update({ is_premium: isPremium }).eq('id', user.id);
    }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return res.status(500).json({ error: 'Webhook secret non configuré' });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  try {
    switch (event.type) {

      // ── Abonnement créé ou réactivé → activer VIP ────────────────────────
      case 'customer.subscription.created':
      case 'invoice.payment_succeeded': {
        const obj = event.data.object as any;
        const metadata = obj.metadata || obj.subscription_details?.metadata || {};
        const userId = metadata.userId || '';
        const userEmail = metadata.userEmail || obj.customer_email || '';
        console.log(`✅ Paiement réussi — userId: ${userId}, email: ${userEmail}`);
        await setUserPremium(userId, userEmail, true);
        break;
      }

      // ── Abonnement annulé ou paiement échoué → désactiver VIP ────────────
      case 'customer.subscription.deleted':
      case 'invoice.payment_failed': {
        const obj = event.data.object as any;
        const metadata = obj.metadata || obj.subscription_details?.metadata || {};
        const userId = metadata.userId || '';
        const userEmail = metadata.userEmail || obj.customer_email || '';
        console.log(`❌ Abonnement annulé — userId: ${userId}, email: ${userEmail}`);
        await setUserPremium(userId, userEmail, false);
        break;
      }

      default:
        console.log(`Événement ignoré: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error('Webhook handler error:', err);
    res.status(500).json({ error: err.message });
  }
}
