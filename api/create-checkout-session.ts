// api/create-checkout-session.ts
// ─────────────────────────────────────────────────────────────────────────────
// Crée une session Stripe Checkout pour l'abonnement VIP AHRENA (2€/mois)
//
// Variables d'environnement à ajouter dans Vercel :
//   STRIPE_SECRET_KEY        → sk_live_... (ou sk_test_... en dev)
//   NEXT_PUBLIC_SITE_URL     → https://votre-app.vercel.app
// ─────────────────────────────────────────────────────────────────────────────

import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahrenav-16.vercel.app';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Clé Stripe non configurée' });
  }

  try {
    // Récupérer l'userId depuis le body si disponible (pour le metadata)
    const { userId, userEmail } = req.body || {};

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Club AHRENA VIP',
              description: 'Accès au multiplex, chat en direct et toutes les fonctionnalités premium',
              images: ['https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_AHRENA.png?v=1773386123'],
            },
            unit_amount: 200, // 2,00 €
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      // Pré-remplir l'email si connu
      ...(userEmail ? { customer_email: userEmail } : {}),
      // Metadata pour retrouver l'utilisateur dans le webhook
      metadata: {
        userId: userId || '',
        userEmail: userEmail || '',
      },
      subscription_data: {
        metadata: {
          userId: userId || '',
          userEmail: userEmail || '',
        },
      },
      success_url: `${SITE_URL}/?tab=club&payment=success`,
      cancel_url: `${SITE_URL}/?tab=club&payment=cancelled`,
      locale: 'fr',
    });

    res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message || 'Erreur lors de la création de la session' });
  }
}
