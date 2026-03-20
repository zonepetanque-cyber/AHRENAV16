import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Détecte automatiquement le token dans l'URL (#access_token=...) au retour OAuth
    detectSessionInUrl: true,
    // Persiste la session dans localStorage pour que la PWA s'en souvienne
    persistSession: true,
    // Renouvelle automatiquement le token avant expiration
    autoRefreshToken: true,
    // Clé stable dans localStorage (évite les conflits entre onglets)
    storageKey: 'ahrena-auth-token',
    // Utilise PKCE (plus sûr, requis pour les PWA / apps mobiles)
    flowType: 'pkce',
  },
});
