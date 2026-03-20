// ── Service Notifications AHRENA via OneSignal v16 ──────────────

// Attend que OneSignal v16 soit initialisé (SDK page script async)
const waitForOS = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('OneSignal timeout')), 8000);

    // Cas 1 : déjà initialisé et prêt
    const existing = (window as any).OneSignal;
    if (existing?.User?.PushSubscription !== undefined) {
      clearTimeout(timeout);
      resolve(existing);
      return;
    }

    // Cas 2 : attendre via OneSignalDeferred (pattern officiel SDK v16)
    (window as any).OneSignalDeferred = (window as any).OneSignalDeferred || [];
    (window as any).OneSignalDeferred.push((OS: any) => {
      clearTimeout(timeout);
      resolve(OS);
    });
  });
};

// ── Abonnement ──────────────────────────────────────────────────
export async function subscribeToPush(): Promise<boolean> {
  try {
    const OS = await waitForOS();

    // Demander la permission navigateur
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return false;

    // Opt-in OneSignal
    await OS.User.PushSubscription.optIn();

    // Laisser le temps à OneSignal de confirmer l'état (async interne)
    await new Promise(r => setTimeout(r, 1500));

    // Lire l'état réel
    const optedIn = OS.User?.PushSubscription?.optedIn === true;
    return optedIn;
  } catch (err) {
    console.error('OneSignal subscribe error:', err);
    return false;
  }
}

export async function unsubscribeFromPush(): Promise<void> {
  try {
    const OS = await waitForOS();
    await OS.User.PushSubscription.optOut();
    await new Promise(r => setTimeout(r, 800));
  } catch (err) {
    console.error('OneSignal unsubscribe error:', err);
  }
}

export async function isPushEnabled(): Promise<boolean> {
  try {
    const OS = await waitForOS();
    const permission = (window as any).Notification?.permission === 'granted';
    const optedIn = OS.User?.PushSubscription?.optedIn === true;
    return permission && optedIn;
  } catch {
    return false;
  }
}

// ── Tags VIP ────────────────────────────────────────────────────
export async function setVIPTag(isPremium: boolean): Promise<void> {
  try {
    const OS = await waitForOS();
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

// ── Tags par chaîne ─────────────────────────────────────────────
export async function toggleChannelSubscription(channelName: string, subscribe: boolean): Promise<void> {
  try {
    const OS = await waitForOS();
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
    const OS = await waitForOS();
    const tags = await OS.User.getTags();
    return Object.entries(tags || {})
      .filter(([key, val]) => key.startsWith('channel_') && val === 'true')
      .map(([key]) => {
        const name = key.replace('channel_', '');
        return name.charAt(0).toUpperCase() + name.slice(1);
      });
  } catch {
    return [];
  }
}

// ── Lier l'utilisateur Supabase à OneSignal ─────────────────────
export async function linkUserToOneSignal(userId: string, isPremium: boolean): Promise<void> {
  try {
    const OS = await waitForOS();
    await OS.login(userId);
    await setVIPTag(isPremium);
  } catch (err) {
    console.error('OneSignal linkUser error:', err);
  }
}

export async function unlinkUserFromOneSignal(): Promise<void> {
  try {
    const OS = await waitForOS();
    await OS.logout();
  } catch {}
}

// ── Notification in-app ─────────────────────────────────────────
export function showInAppNotification(title: string, body: string, url?: string) {
  window.dispatchEvent(new CustomEvent('ahrena-notification', {
    detail: { title, body, url }
  }));
}
