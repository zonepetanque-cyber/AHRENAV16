// notificationService.ts
import { supabase } from '../lib/supabase';

// Clé VAPID publique — lue depuis les variables d'environnement Vercel
// Ajouter dans Vercel : VITE_VAPID_PUBLIC_KEY
export const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || '';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

export async function subscribeToPush(): Promise<boolean> {
  try {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
    if (!VAPID_PUBLIC_KEY) {
      console.warn('VITE_VAPID_PUBLIC_KEY manquante dans les variables Vercel');
      return false;
    }
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return false;

    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user && subscription) {
      await supabase.from('push_subscriptions').upsert({
        user_id: user.id,
        subscription: JSON.stringify(subscription),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
    }
    return true;
  } catch (err) {
    console.error('Push subscription error:', err);
    return false;
  }
}

export async function unsubscribeFromPush(): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('push_subscriptions').delete().eq('user_id', user.id);
      }
    }
  } catch (err) {
    console.error('Unsubscribe error:', err);
  }
}

export async function isPushEnabled(): Promise<boolean> {
  try {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return !!subscription && Notification.permission === 'granted';
  } catch {
    return false;
  }
}

export async function toggleChannelSubscription(channelName: string, subscribe: boolean): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  if (subscribe) {
    await supabase.from('channel_subscriptions').upsert({
      user_id: user.id,
      channel_name: channelName,
    }, { onConflict: 'user_id,channel_name' });
  } else {
    await supabase.from('channel_subscriptions')
      .delete()
      .eq('user_id', user.id)
      .eq('channel_name', channelName);
  }
}

export async function getChannelSubscriptions(): Promise<string[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase
    .from('channel_subscriptions')
    .select('channel_name')
    .eq('user_id', user.id);
  return data?.map(s => s.channel_name) || [];
}

export function showInAppNotification(title: string, body: string, url?: string) {
  window.dispatchEvent(new CustomEvent('ahrena-notification', {
    detail: { title, body, url }
  }));
}
