// Service Notifications AHRENA via OneSignal v16

// Attend que OneSignal soit initialise et pret (User disponible)
const waitForOS = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 10000;

    const check = () => {
      const OS = (window as any).OneSignal;
      if (OS?.User !== undefined) {
        resolve(OS);
        return;
      }
      if (Date.now() > deadline) {
        reject(new Error('OneSignal timeout'));
        return;
      }
      setTimeout(check, 150);
    };

    check();
  });
};

// Abonnement push
export async function subscribeToPush(): Promise<boolean> {
  try {
    // Demander la permission navigateur d'abord
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return false;

    // Attendre OneSignal
    const OS = await waitForOS();

    // Opt-in
    await OS.User.PushSubscription.optIn();

    // Attendre le token (preuve que le player est cree cote OneSignal)
    const deadline = Date.now() + 12000;
    while (Date.now() < deadline) {
      await new Promise(r => setTimeout(r, 500));
      if (OS.User?.PushSubscription?.token) return true;
      if (OS.User?.PushSubscription?.optedIn === true) return true;
    }

    return false;
  } catch (err) {
    console.error('[OneSignal] subscribe error:', err);
    return false;
  }
}

export async function unsubscribeFromPush(): Promise<void> {
  try {
    const OS = await waitForOS();
    await OS.User.PushSubscription.optOut();
    // Attendre confirmation
    await new Promise(r => setTimeout(r, 1000));
  } catch (err) {
    console.error('[OneSignal] unsubscribe error:', err);
  }
}

export async function isPushEnabled(): Promise<boolean> {
  try {
    if ((window as any).Notification?.permission !== 'granted') return false;
    const OS = await waitForOS();
    if (OS.User?.PushSubscription?.token) return true;
    return OS.User?.PushSubscription?.optedIn === true;
  } catch {
    return false;
  }
}

// Tags VIP
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
    console.error('[OneSignal] setVIPTag error:', err);
  }
}

// Tags par chaine
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
    console.error('[OneSignal] toggleChannel error:', err);
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

// Lier utilisateur Supabase a OneSignal
export async function linkUserToOneSignal(userId: string, isPremium: boolean): Promise<void> {
  try {
    const OS = await waitForOS();
    await OS.login(userId);
    await setVIPTag(isPremium);
  } catch (err) {
    console.error('[OneSignal] linkUser error:', err);
  }
}

export async function unlinkUserFromOneSignal(): Promise<void> {
  try {
    const OS = await waitForOS();
    await OS.logout();
  } catch {}
}

// Notification in-app
export function showInAppNotification(title: string, body: string, url?: string) {
  window.dispatchEvent(new CustomEvent('ahrena-notification', {
    detail: { title, body, url }
  }));
}
