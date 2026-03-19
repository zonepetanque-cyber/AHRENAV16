// ── Service Notifications AHRENA via OneSignal ──────────────────

const getOS = (): any => (window as any).OneSignal;

// Helper pour attendre que OneSignal soit prêt
const waitForOS = (): Promise<any> => {
  return new Promise((resolve) => {
    const OS = (window as any).OneSignal;
    if (OS) { resolve(OS); return; }
    const deferred = (window as any).OneSignalDeferred || [];
    deferred.push((OS: any) => resolve(OS));
    (window as any).OneSignalDeferred = deferred;
  });
};

// ── Abonnement ──────────────────────────────────────────────────
export async function subscribeToPush(): Promise<boolean> {
  try {
    const OS = await waitForOS();
    if (!OS) return false;
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return false;
    await OS.User.PushSubscription.optIn();
    return true;
  } catch (err) {
    console.error('OneSignal subscribe error:', err);
    return false;
  }
}

export async function unsubscribeFromPush(): Promise<void> {
  try {
    const OS = await waitForOS();
    if (!OS) return;
    await OS.User.PushSubscription.optOut();
  } catch (err) {
    console.error('OneSignal unsubscribe error:', err);
  }
}

export async function isPushEnabled(): Promise<boolean> {
  try {
    const OS = await waitForOS();
    if (!OS) return false;
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

// ── Tags par chaîne ─────────────────────────────────────────────
export async function toggleChannelSubscription(channelName: string, subscribe: boolean): Promise<void> {
  try {
    const OS = await waitForOS();
    if (!OS) return;
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
    if (!OS) return [];
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
    if (!OS) return;
    await OS.login(userId);
    await setVIPTag(isPremium);
  } catch (err) {
    console.error('OneSignal linkUser error:', err);
  }
}

export async function unlinkUserFromOneSignal(): Promise<void> {
  try {
    const OS = await waitForOS();
    if (!OS) return;
    await OS.logout();
  } catch {}
}

// ── Notification in-app ─────────────────────────────────────────
export function showInAppNotification(title: string, body: string, url?: string) {
  window.dispatchEvent(new CustomEvent('ahrena-notification', {
    detail: { title, body, url }
  }));
}
