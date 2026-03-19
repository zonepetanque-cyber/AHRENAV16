// ── Service Notifications AHRENA via OneSignal ──────────────────
// OneSignal gère tout : SW, tokens, envoi
// On utilise leurs tags pour filtrer les VIP côté dashboard

const getOS = (): any => (window as any).OneSignal;

// ── Abonnement aux notifications ────────────────────────────────
export async function subscribeToPush(): Promise<boolean> {
  try {
    const OS = getOS();
    if (!OS) return false;
    await OS.Notifications.requestPermission();
    return OS.Notifications.permission === true;
  } catch (err) {
    console.error('OneSignal subscribe error:', err);
    return false;
  }
}

export async function unsubscribeFromPush(): Promise<void> {
  try {
    const OS = getOS();
    if (!OS) return;
    await OS.User.PushSubscription.optOut();
  } catch (err) {
    console.error('OneSignal unsubscribe error:', err);
  }
}

export async function isPushEnabled(): Promise<boolean> {
  try {
    const OS = getOS();
    if (!OS) return false;
    return OS.Notifications.permission === true && OS.User.PushSubscription.optedIn === true;
  } catch {
    return false;
  }
}

// ── Tags VIP — clé pour filtrer les notifs dans le dashboard ────
// Appelé quand l'utilisateur devient VIP (paiement Stripe validé)
export async function setVIPTag(isPremium: boolean): Promise<void> {
  try {
    const OS = getOS();
    if (!OS) return;
    if (isPremium) {
      await OS.User.addTag('is_premium', 'true');
      await OS.User.addTag('plan', 'vip');
    } else {
      await OS.User.removeTag('is_premium');
      await OS.User.removeTag('plan');
    }
  } catch (err) {
    console.error('OneSignal setVIPTag error:', err);
  }
}

// ── Tags par chaîne — pour les notifs ciblées ───────────────────
export async function toggleChannelSubscription(channelName: string, subscribe: boolean): Promise<void> {
  try {
    const OS = getOS();
    if (!OS) return;
    // Normaliser le nom (ex: "Boulistenaute" → "channel_boulistenaute")
    const tag = 'channel_' + channelName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    if (subscribe) {
      await OS.User.addTag(tag, 'true');
    } else {
      await OS.User.removeTag(tag);
    }
  } catch (err) {
    console.error('OneSignal toggleChannel error:', err);
  }
}

export async function getChannelSubscriptions(): Promise<string[]> {
  try {
    const OS = getOS();
    if (!OS) return [];
    const tags = await OS.User.getTags();
    return Object.entries(tags || {})
      .filter(([key, val]) => key.startsWith('channel_') && val === 'true')
      .map(([key]) => {
        // Reconvertir "channel_boulistenaute" → "Boulistenaute"
        const name = key.replace('channel_', '');
        return name.charAt(0).toUpperCase() + name.slice(1);
      });
  } catch {
    return [];
  }
}

// ── Lier l'utilisateur Supabase à OneSignal ─────────────────────
// Appelé après le login pour associer l'ID Supabase au profil OneSignal
export async function linkUserToOneSignal(userId: string, isPremium: boolean): Promise<void> {
  try {
    const OS = getOS();
    if (!OS) return;
    // Lier l'External ID (ID Supabase) au profil OneSignal
    await OS.login(userId);
    // Appliquer les tags VIP
    await setVIPTag(isPremium);
  } catch (err) {
    console.error('OneSignal linkUser error:', err);
  }
}

export async function unlinkUserFromOneSignal(): Promise<void> {
  try {
    const OS = getOS();
    if (!OS) return;
    await OS.logout();
  } catch {}
}

// ── Notification in-app (inchangée) ─────────────────────────────
export function showInAppNotification(title: string, body: string, url?: string) {
  window.dispatchEvent(new CustomEvent('ahrena-notification', {
    detail: { title, body, url }
  }));
}
