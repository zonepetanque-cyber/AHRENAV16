// Service Notifications AHRENA via OneSignal v16

// Attend que OneSignal v16 soit initialise
// Strategie robuste : polling sur window.OneSignal.User
const waitForOS = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('OneSignal timeout')), 10000);

    const done = (OS: any) => {
      clearTimeout(timeout);
      resolve(OS);
    };

    // Cas 1 : OneSignal deja present et initialise
    const existing = (window as any).OneSignal;
    if (existing?.User !== undefined) {
      done(existing);
      return;
    }

    // Cas 2 : Polling toutes les 100ms jusqu'a ce que OneSignal.User soit dispo
    let attempts = 0;
    const poll = setInterval(() => {
      attempts++;
      const OS = (window as any).OneSignal;
      if (OS?.User !== undefined) {
        clearInterval(poll);
        done(OS);
        return;
      }
      // Apres 5s de polling, on essaie via OneSignalDeferred
      if (attempts > 50) {
        clearInterval(poll);
        (window as any).OneSignalDeferred = (window as any).OneSignalDeferred || [];
        (window as any).OneSignalDeferred.push((OS: any) => done(OS));
      }
    }, 100);
  });
};

// Abonnement
export async function subscribeToPush(): Promise<boolean> {
  try {
    const OS = await waitForOS();

    // Demander la permission navigateur
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return false;

    // Opt-in OneSignal
    await OS.User.PushSubscription.optIn();

    // Attendre que le token soit disponible (player cree cote serveur)
    // Polling jusqu'a 12s
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 800));
      const token = OS.User?.PushSubscription?.token;
      if (token) return true;
      if (OS.User?.PushSubscription?.optedIn === true) return true;
    }

    // Dernier recours : permission accordee = considerer comme abonne
    return (window as any).Notification?.permission === 'granted';
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
    // Verification primaire : permission navigateur
    if ((window as any).Notification?.permission !== 'granted') return false;

    const OS = await waitForOS();

    // Token = preuve qu'un player existe cote OneSignal
    const token = OS.User?.PushSubscription?.token;
    if (token) return true;

    // Fallback : optedIn
    return OS.User?.PushSubscription?.optedIn === true;
  } catch {
    // Si OneSignal timeout mais permission accordee, on considere actif
    return (window as any).Notification?.permission === 'granted';
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
    console.error('OneSignal setVIPTag error:', err);
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

// Lier l'utilisateur Supabase a OneSignal
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

// Notification in-app
export function showInAppNotification(title: string, body: string, url?: string) {
  window.dispatchEvent(new CustomEvent('ahrena-notification', {
    detail: { title, body, url }
  }));
}
