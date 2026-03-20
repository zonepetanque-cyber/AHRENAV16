import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  Users, Crown, Ban, Search, AlertTriangle, CheckCircle2, Loader2,
  ShieldAlert, TrendingUp, MessageSquare, Bell, RefreshCw, Trash2,
  UserCheck, UserX, Send, Eye, X
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Stats {
  totalUsers: number;
  vipUsers: number;
  bannedUsers: number;
  newToday: number;
  newThisWeek: number;
  newThisMonth: number;
  activeUsers: number;
  estimatedRevenue: number;
}

interface UserProfile {
  id: string;
  email: string;
  is_premium: boolean;
  is_banned: boolean;
  created_at: string;
  last_sign_in_at?: string;
}

interface ChatMessage {
  id: string;
  user_id: string;
  video_id: string;
  message: string;
  created_at: string;
  profiles?: { email: string };
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', {
  day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
});

const TabButton = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-colors ${
      active ? 'bg-red-600 text-white' : 'bg-zinc-900 text-white/40 hover:text-white'
    }`}
  >
    {children}
  </button>
);

const StatCard = ({ icon, label, value, sub, color }: { icon: React.ReactNode, label: string, value: string | number, sub?: string, color: string }) => (
  <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-4 flex items-center gap-3">
    <div className={`p-2.5 rounded-lg flex-shrink-0 ${color}`}>{icon}</div>
    <div className="min-w-0">
      <p className="text-white/40 text-[9px] uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-white">{typeof value === 'number' ? value.toLocaleString('fr-FR') : value}</p>
      {sub && <p className="text-white/30 text-[9px]">{sub}</p>}
    </div>
  </div>
);

const Toast = ({ result, onClose }: { result: { type: 'success' | 'error', message: string } | null, onClose: () => void }) => {
  if (!result) return null;
  return (
    <div className={`fixed bottom-28 left-4 right-4 z-[200] flex items-center gap-2 p-3 rounded-xl border text-xs font-medium ${
      result.type === 'success' ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' : 'bg-red-500/15 border-red-500/30 text-red-400'
    }`}>
      {result.type === 'success' ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
      <span className="flex-1">{result.message}</span>
      <button onClick={onClose}><X size={14} /></button>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [tab, setTab] = useState<'stats' | 'users' | 'chat' | 'notif' | 'videos'>('stats');
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Users tab
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [banEmail, setBanEmail] = useState('');
  const [banLoading, setBanLoading] = useState(false);

  // Chat tab
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  // Notif tab
  const [notifTitle, setNotifTitle]     = useState('');
  const [notifBody, setNotifBody]       = useState('');
  const [notifUrl, setNotifUrl]         = useState('');
  const [notifSegment, setNotifSegment] = useState<'all' | 'vip' | 'channel'>('all');
  const [notifChannel, setNotifChannel] = useState('');
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifResult, setNotifResult]   = useState<{ recipients?: number; error?: string } | null>(null);
  const [broadcastLoading, setBroadcastLoading] = useState(false);

  // Videos tab
  const [blacklist, setBlacklist] = useState<{id: string; video_id: string; title: string; channel: string}[]>([]);
  const [blacklistLoading, setBlacklistLoading] = useState(false);
  const [channelVideosAdmin, setChannelVideosAdmin] = useState<Record<string, any[]>>({});
  const [channelVideosLoading, setChannelVideosLoading] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterResult, setFilterResult] = useState<string | null>(null);

  const ADMIN_CHANNELS = [
    { id: "UCZeAfPeaRc_es11c0YSOhGg", name: "Boulistenaute" },
    { id: "UCHVNyFEDNOq6q4OkG2YzIQQ", name: "Sportmag" },
    { id: "UCvSPMtEs1EtxC_Ik0KgoClQ", name: "Sportmediamat" },
    { id: "UCQX6vA1lYtP6nv8XROK56pQ", name: "Petanque Academy" },
    { id: "UCpq3CYTOqiW-t2kqrtWZDug", name: "Groupe Pétanque" },
    { id: "UCLNGJZ85f3W1ZZxUBeNdqDg", name: "Pétanque TV Europe" },
    { id: "UCyQAL0ZOE9YLXfkndhlgJMQ", name: "PPF" },
    { id: "UCAcERCZ6CKxXEnwQTiaooBw", name: "FFPJP" },
    { id: "UCs5dyTykvpzwSyL5EsjcXNg", name: "FFSB" },
  ];

  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => { fetchStats(); }, []);
  useEffect(() => { if (tab === 'users') fetchUsers(); }, [tab]);
  useEffect(() => { if (tab === 'chat') fetchMessages(); }, [tab]);
  useEffect(() => {
    if (tab === 'videos') {
      fetchBlacklist();
      fetchChannelVideosAdmin();
    }
  }, [tab]);

  // ── Stats ──────────────────────────────────────────────────────────────────
  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const weekStart = new Date(now.getTime() - 7 * 86400000).toISOString();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const activeStart = new Date(now.getTime() - 7 * 86400000).toISOString();

      const [total, vip, banned, today, week, month, active] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_premium', true),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_banned', true),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', todayStart),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', weekStart),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', monthStart),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('last_sign_in_at', activeStart),
      ]);

      const vipCount = vip.count ?? 0;
      setStats({
        totalUsers: total.count ?? 0,
        vipUsers: vipCount,
        bannedUsers: banned.count ?? 0,
        newToday: today.count ?? 0,
        newThisWeek: week.count ?? 0,
        newThisMonth: month.count ?? 0,
        activeUsers: active.count ?? 0,
        estimatedRevenue: vipCount * 2,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setStatsLoading(false);
    }
  };

  // ── Users ──────────────────────────────────────────────────────────────────
  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const { data } = await supabase
        .from('profiles')
        .select('id, email, is_premium, is_banned, created_at, last_sign_in_at')
        .order('created_at', { ascending: false })
        .limit(50);
      setUsers(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setUsersLoading(false);
    }
  };

  const handleBan = async (email: string, ban: boolean) => {
    setBanLoading(true);
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, is_banned')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (!profile) { showToast('error', `Aucun utilisateur trouvé : ${email}`); return; }

      await supabase.from('profiles').update({ is_banned: ban }).eq('id', profile.id);
      showToast('success', ban ? `${email} a été banni.` : `${email} a été débanni.`);
      setBanEmail('');
      fetchUsers();
      fetchStats();
    } catch (err: any) {
      showToast('error', `Erreur : ${err.message}`);
    } finally {
      setBanLoading(false);
    }
  };

  const handleToggleVIP = async (userId: string, email: string, current: boolean) => {
    try {
      await supabase.from('profiles').update({ is_premium: !current }).eq('id', userId);
      showToast('success', `${email} : VIP ${!current ? 'activé' : 'révoqué'}.`);
      fetchUsers();
      fetchStats();
    } catch (err: any) {
      showToast('error', `Erreur : ${err.message}`);
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (!confirm(`Supprimer définitivement le compte de ${email} ?`)) return;
    try {
      await supabase.from('profiles').delete().eq('id', userId);
      showToast('success', `Compte ${email} supprimé.`);
      fetchUsers();
      fetchStats();
    } catch (err: any) {
      showToast('error', `Erreur : ${err.message}`);
    }
  };

  // ── Chat ───────────────────────────────────────────────────────────────────
  const fetchMessages = async () => {
    setChatLoading(true);
    try {
      const { data } = await supabase
        .from('chat_messages')
        .select('id, user_id, video_id, message, created_at, profiles(email)')
        .order('created_at', { ascending: false })
        .limit(50);
      setMessages(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  const handleDeleteMessage = async (msgId: string) => {
    try {
      await supabase.from('chat_messages').delete().eq('id', msgId);
      showToast('success', 'Message supprimé.');
      fetchMessages();
    } catch (err: any) {
      showToast('error', `Erreur : ${err.message}`);
    }
  };

  // ── Broadcast ──────────────────────────────────────────────────────────────
  // ── Blacklist vidéos ──────────────────────────────────────────
  const fetchBlacklist = async () => {
    setBlacklistLoading(true);
    try {
      const { data } = await supabase.from('video_blacklist').select('*').order('created_at', { ascending: false });
      setBlacklist(data || []);
    } catch (err) { console.error(err); }
    finally { setBlacklistLoading(false); }
  };

  const fetchChannelVideosAdmin = async () => {
    setChannelVideosLoading(true);
    try {
      const res = await fetch('/api/youtube');
      const data = await res.json();
      setChannelVideosAdmin(data.channelVideos || {});
    } catch (err) { showToast('error', 'Impossible de charger les vidéos'); }
    finally { setChannelVideosLoading(false); }
  };

  const handleBlacklistVideo = async (videoId: string, title: string, channel: string) => {
    try {
      await supabase.from('video_blacklist').upsert(
        { video_id: videoId, title, channel },
        { onConflict: 'video_id' }
      );
      showToast('success', `Vidéo masquée du carrousel.`);
      fetchBlacklist();
    } catch (err: any) { showToast('error', err.message); }
  };

  const handleUnblacklist = async (videoId: string, title: string) => {
    try {
      await supabase.from('video_blacklist').delete().eq('video_id', videoId);
      showToast('success', `Vidéo réactivée dans le carrousel.`);
      fetchBlacklist();
    } catch (err: any) { showToast('error', err.message); }
  };

  const handleAutoFilter = async () => {
    setFilterLoading(true);
    setFilterResult(null);
    try {
      const res = await fetch('/api/filter');
      const data = await res.json();
      setFilterResult(data.filtered === 0 ? `✅ ${data.message}` : `🚫 ${data.filtered} vidéo(s) masquée(s)`);
      if (data.filtered > 0) fetchBlacklist();
    } catch (err: any) { setFilterResult(`❌ Erreur : ${err.message}`); }
    finally { setFilterLoading(false); }
  };

  const handleSendNotif = async () => {
    if (!notifTitle.trim() || !notifBody.trim()) {
      showToast('error', 'Titre et message sont requis.');
      return;
    }
    if (notifSegment === 'channel' && !notifChannel) {
      showToast('error', 'Sélectionne une chaîne.');
      return;
    }
    setNotifLoading(true);
    setNotifResult(null);
    try {
      const res = await fetch('/api/send-notif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-notify-secret': import.meta.env.VITE_NOTIFY_SECRET || '',
        },
        body: JSON.stringify({
          title:      notifTitle.trim(),
          body:       notifBody.trim(),
          url:        notifUrl.trim() || '/',
          segment:    notifSegment,
          channelTag: notifSegment === 'channel' ? notifChannel : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        const rawDetail = data.detail
          ? (Array.isArray(data.detail) ? data.detail.join(', ') : JSON.stringify(data.detail))
          : data.error;
        // Traduction de l'erreur OneSignal la plus fréquente
        const friendlyDetail = rawDetail?.includes('not subscribed')
          ? 'Aucun abonné actif — activez d\'abord les notifications depuis Le Club'
          : rawDetail;
        setNotifResult({ error: friendlyDetail });
        showToast('error', `Erreur : ${friendlyDetail}`);
      } else {
        setNotifResult({ recipients: data.recipients ?? 0 });
        showToast('success', `✅ Notification envoyée à ${data.recipients ?? 0} abonné(s).`);
        setNotifTitle('');
        setNotifBody('');
        setNotifUrl('');
      }
    } catch (err: any) {
      showToast('error', `Erreur réseau : ${err.message}`);
      setNotifResult({ error: err.message });
    } finally {
      setNotifLoading(false);
    }
  };

  const filteredUsers = users.filter(u =>
    !userSearch || u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="pt-20 pb-24 min-h-screen">
      {/* Header */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-red-600 p-2 rounded-lg">
            <ShieldAlert size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase italic">Tableau de bord</h1>
            <p className="text-white/30 text-[9px] uppercase tracking-widest">Administration AHRENA</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-6 flex gap-2 overflow-x-auto no-scrollbar">
        <TabButton active={tab === 'stats'} onClick={() => setTab('stats')}>📊 Stats</TabButton>
        <TabButton active={tab === 'users'} onClick={() => setTab('users')}>👥 Users</TabButton>
        <TabButton active={tab === 'chat'} onClick={() => setTab('chat')}>💬 Chat</TabButton>
        <TabButton active={tab === 'notif'} onClick={() => setTab('notif')}>📢 Notif</TabButton>
        <TabButton active={tab === 'videos'} onClick={() => setTab('videos')}>🎬 Vidéos</TabButton>
      </div>

      {/* ── STATS TAB ── */}
      {tab === 'stats' && (
        <div className="px-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={<Users size={18} className="text-white" />} label="Total Utilisateurs" value={statsLoading ? '...' : stats?.totalUsers ?? 0} color="bg-blue-600/20" />
            <StatCard icon={<Crown size={18} className="text-yellow-400" />} label="Membres VIP" value={statsLoading ? '...' : stats?.vipUsers ?? 0} color="bg-yellow-600/20" />
            <StatCard icon={<TrendingUp size={18} className="text-emerald-400" />} label="Revenus estimés" value={statsLoading ? '...' : `${stats?.estimatedRevenue ?? 0}€`} sub="par mois" color="bg-emerald-600/20" />
            <StatCard icon={<Eye size={18} className="text-purple-400" />} label="Actifs 7 jours" value={statsLoading ? '...' : stats?.activeUsers ?? 0} color="bg-purple-600/20" />
          </div>

          <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-4">
            <p className="text-white/40 text-[9px] uppercase tracking-widest mb-3">Nouvelles inscriptions</p>
            <div className="space-y-2">
              {[
                { label: "Aujourd'hui", value: stats?.newToday },
                { label: "Cette semaine", value: stats?.newThisWeek },
                { label: "Ce mois", value: stats?.newThisMonth },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">{item.label}</span>
                  <span className="text-white font-black text-sm">{statsLoading ? '...' : item.value ?? 0}</span>
                </div>
              ))}
            </div>
          </div>

          <StatCard icon={<Ban size={18} className="text-red-500" />} label="Utilisateurs bannis" value={statsLoading ? '...' : stats?.bannedUsers ?? 0} color="bg-red-600/20" />

          <button onClick={fetchStats} className="w-full py-3 text-white/30 hover:text-white/60 text-xs uppercase tracking-widest transition-colors border border-white/5 rounded-xl hover:border-white/10 flex items-center justify-center gap-2">
            <RefreshCw size={12} />
            Rafraîchir
          </button>
        </div>
      )}

      {/* ── USERS TAB ── */}
      {tab === 'users' && (
        <div className="px-5 space-y-4">
          {/* Bannir */}
          <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-4">
            <p className="text-white/40 text-[9px] uppercase tracking-widest mb-3">Action rapide</p>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
              <input
                type="email"
                value={banEmail}
                onChange={e => setBanEmail(e.target.value)}
                placeholder="email@utilisateur.com"
                className="w-full bg-black border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-white placeholder:text-white/20 focus:border-red-600 outline-none text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleBan(banEmail, true)} disabled={banLoading || !banEmail.trim()} className="bg-red-600 text-white font-black py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 disabled:opacity-40">
                {banLoading ? <Loader2 size={12} className="animate-spin" /> : <UserX size={12} />} Bannir
              </button>
              <button onClick={() => handleBan(banEmail, false)} disabled={banLoading || !banEmail.trim()} className="bg-emerald-600 text-white font-black py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 disabled:opacity-40">
                {banLoading ? <Loader2 size={12} className="animate-spin" /> : <UserCheck size={12} />} Débannir
              </button>
            </div>
          </div>

          {/* Liste utilisateurs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/40 text-[9px] uppercase tracking-widest">50 derniers inscrits</p>
              <button onClick={fetchUsers} className="text-white/30 hover:text-white/60 transition-colors"><RefreshCw size={12} /></button>
            </div>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
              <input
                type="text"
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                placeholder="Filtrer par email..."
                className="w-full bg-black border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-white placeholder:text-white/20 focus:border-white/30 outline-none text-xs"
              />
            </div>

            {usersLoading ? (
              <div className="space-y-2">
                {[1,2,3].map(i => <div key={i} className="h-16 bg-zinc-900 rounded-xl animate-pulse" />)}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredUsers.map(user => (
                  <div key={user.id} className={`bg-zinc-900/60 border rounded-xl p-3 ${user.is_banned ? 'border-red-600/30' : 'border-white/5'}`}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <p className="text-white text-xs font-medium truncate">{user.email || 'Email inconnu'}</p>
                        <p className="text-white/30 text-[9px]">{formatDate(user.created_at)}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        {user.is_premium && <span className="bg-yellow-600/20 text-yellow-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">VIP</span>}
                        {user.is_banned && <span className="bg-red-600/20 text-red-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Banni</span>}
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => handleToggleVIP(user.id, user.email, user.is_premium)} className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-lg transition-colors ${user.is_premium ? 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30' : 'bg-zinc-800 text-white/40 hover:text-white/70'}`}>
                        {user.is_premium ? '⭐ Révoquer VIP' : '⭐ Donner VIP'}
                      </button>
                      <button onClick={() => handleBan(user.email, !user.is_banned)} className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-lg transition-colors ${user.is_banned ? 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30' : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'}`}>
                        {user.is_banned ? '✅ Débannir' : '🚫 Bannir'}
                      </button>
                      <button onClick={() => handleDeleteUser(user.id, user.email)} className="p-1.5 bg-zinc-800 text-white/20 hover:text-red-500 rounded-lg transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CHAT TAB ── */}
      {tab === 'chat' && (
        <div className="px-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/40 text-[9px] uppercase tracking-widest">50 derniers messages</p>
            <button onClick={fetchMessages} className="text-white/30 hover:text-white/60 transition-colors"><RefreshCw size={12} /></button>
          </div>

          {chatLoading ? (
            <div className="space-y-2">
              {[1,2,3,4].map(i => <div key={i} className="h-16 bg-zinc-900 rounded-xl animate-pulse" />)}
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-white/20">
              <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-xs">Aucun message dans le chat</p>
            </div>
          ) : (
            <div className="space-y-2">
              {messages.map(msg => (
                <div key={msg.id} className="bg-zinc-900/60 border border-white/5 rounded-xl p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-white/50 text-[9px] mb-1 truncate">{(msg.profiles as any)?.email || msg.user_id.slice(0, 8)+'...'} · {formatDate(msg.created_at)}</p>
                      <p className="text-white text-xs leading-relaxed">{msg.message}</p>
                      <p className="text-white/20 text-[8px] mt-1">Live: {msg.video_id}</p>
                    </div>
                    <button onClick={() => handleDeleteMessage(msg.id)} className="p-1.5 bg-zinc-800 text-white/20 hover:text-red-500 rounded-lg transition-colors flex-shrink-0">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── NOTIF TAB ── */}
      {tab === 'notif' && (
        <div className="px-5 space-y-4">

          {/* Sélecteur de segment */}
          <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-4">
            <p className="text-white/40 text-[9px] uppercase tracking-widest mb-3">Destinataires</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'all',     label: '🌍 Tous',        sub: 'Tous les abonnés' },
                { key: 'vip',     label: '👑 VIP',         sub: 'Tag is_premium' },
                { key: 'channel', label: '📺 Chaîne',      sub: 'Par chaîne' },
              ].map(({ key, label, sub }) => (
                <button
                  key={key}
                  onClick={() => setNotifSegment(key as any)}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-center transition-colors ${
                    notifSegment === key
                      ? 'border-red-600 bg-red-600/10 text-white'
                      : 'border-white/10 bg-black/40 text-white/40 hover:text-white/70'
                  }`}
                >
                  <span className="text-sm font-black">{label}</span>
                  <span className="text-[9px] uppercase tracking-wider">{sub}</span>
                </button>
              ))}
            </div>

            {/* Sélecteur chaîne si segment = channel */}
            {notifSegment === 'channel' && (
              <div className="mt-3">
                <p className="text-white/30 text-[9px] uppercase tracking-widest mb-2">Chaîne ciblée</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { tag: 'boulistenaute',    label: 'Boulistenaute' },
                    { tag: 'sportmag',         label: 'Sportmag' },
                    { tag: 'sportmediamat',    label: 'Sportmediamat' },
                    { tag: 'petanque_academy', label: 'Pétanque Academy' },
                    { tag: 'groupe_petanque',  label: 'Groupe Pétanque' },
                    { tag: 'petanque_tv_europe', label: 'Pétanque TV Europe' },
                    { tag: 'ppf',              label: 'PPF' },
                    { tag: 'ffpjp',            label: 'FFPJP' },
                    { tag: 'ffsb',             label: 'FFSB' },
                  ].map(({ tag, label }) => (
                    <button
                      key={tag}
                      onClick={() => setNotifChannel(tag)}
                      className={`py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wide border transition-colors text-left ${
                        notifChannel === tag
                          ? 'border-red-600 bg-red-600/10 text-white'
                          : 'border-white/10 bg-black/40 text-white/30 hover:text-white/60'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Formulaire */}
          <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Bell size={16} className="text-red-500" />
              <p className="text-white font-black text-sm uppercase">Composer la notification</p>
            </div>

            <div>
              <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">Titre *</p>
              <input
                type="text"
                value={notifTitle}
                onChange={e => setNotifTitle(e.target.value)}
                placeholder="ex: 🔴 Live maintenant — Finale FFPJP"
                maxLength={64}
                className="w-full bg-black border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:border-red-600 outline-none text-sm"
              />
              <p className="text-white/20 text-[9px] text-right mt-1">{notifTitle.length}/64</p>
            </div>

            <div>
              <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">Message *</p>
              <textarea
                value={notifBody}
                onChange={e => setNotifBody(e.target.value)}
                placeholder="ex: La finale nationale est en direct sur AHRENA !"
                rows={3}
                maxLength={178}
                className="w-full bg-black border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:border-red-600 outline-none text-sm resize-none"
              />
              <p className="text-white/20 text-[9px] text-right mt-1">{notifBody.length}/178</p>
            </div>

            <div>
              <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">URL de destination <span className="text-white/15">(optionnel)</span></p>
              <input
                type="text"
                value={notifUrl}
                onChange={e => setNotifUrl(e.target.value)}
                placeholder="/ ou /?video=XXXXXXXXXXX"
                className="w-full bg-black border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:border-white/30 outline-none text-sm"
              />
            </div>

            {/* Résultat du dernier envoi */}
            {notifResult && (
              <div className={`flex items-center gap-2 p-3 rounded-xl text-xs font-medium ${
                notifResult.error
                  ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                  : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              }`}>
                {notifResult.error
                  ? <><AlertTriangle size={13} /> <span>Erreur : {notifResult.error}</span></>
                  : <><CheckCircle2 size={13} /> <span>Envoyé à {notifResult.recipients} abonné(s) OneSignal</span></>
                }
              </div>
            )}

            <button
              onClick={handleSendNotif}
              disabled={notifLoading || !notifTitle.trim() || !notifBody.trim()}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-3.5 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {notifLoading
                ? <><Loader2 size={16} className="animate-spin" /> Envoi en cours...</>
                : <><Send size={16} /> Envoyer via OneSignal</>
              }
            </button>
          </div>

          {/* Info technique */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-2">
            <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">Comment ça marche</p>
            <p className="text-white/25 text-[10px] leading-relaxed">
              Les notifications sont envoyées via l'API REST OneSignal. Seuls les utilisateurs ayant activé les notifications push dans leur navigateur / app les reçoivent.
            </p>
            <p className="text-white/25 text-[10px] leading-relaxed">
              Le segment <span className="text-yellow-400/60">VIP</span> cible les utilisateurs ayant le tag <code className="text-yellow-400/60">is_premium=true</code> dans OneSignal. Ce tag est positionné automatiquement lors de la connexion d'un membre VIP.
            </p>
            <p className="text-white/25 text-[10px] leading-relaxed">
              Le segment <span className="text-blue-400/60">Chaîne</span> cible les utilisateurs ayant activé les alertes pour cette chaîne dans leurs préférences de notification (section Club).
            </p>
          </div>

        </div>
      )}

      {/* ── VIDEOS TAB ── */}
      {tab === 'videos' && (
        <div className="px-5 space-y-4">

          {/* Filtre automatique */}
          <div className="bg-zinc-900/60 border border-emerald-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🔍</span>
              <p className="text-white font-black text-sm uppercase">Filtre automatique</p>
              <span className="bg-emerald-600/20 text-emerald-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Gratuit</span>
            </div>
            <p className="text-white/30 text-[9px] mb-3">Analyse Sportmag & Sportmediamat — masque les vidéos sans mot pétanque dans le titre</p>
            <button onClick={handleAutoFilter} disabled={filterLoading}
              className="w-full bg-emerald-600 text-white font-black py-2.5 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-40 hover:bg-emerald-700 transition-colors text-xs">
              {filterLoading ? <Loader2 size={14} className="animate-spin" /> : '🔍'}
              {filterLoading ? 'Analyse...' : 'Lancer le filtre'}
            </button>
            {filterResult && <p className="mt-2 text-xs text-white/60 text-center">{filterResult}</p>}
            <p className="text-white/20 text-[9px] mt-2 text-center">🕐 Aussi automatique chaque nuit à 3h00</p>
          </div>

          {/* Navigateur de vidéos par chaîne */}
          <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/40 text-[9px] uppercase tracking-widest">Navigateur de vidéos</p>
              <button onClick={fetchChannelVideosAdmin} className="text-white/30 hover:text-white/60 transition-colors">
                <RefreshCw size={12} />
              </button>
            </div>

            {/* Sélecteur de chaîne */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-3">
              <button onClick={() => setSelectedChannel('all')}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all border ${selectedChannel === 'all' ? 'bg-red-600 text-white border-red-500' : 'bg-zinc-800 text-white/50 border-white/10'}`}>
                Toutes
              </button>
              {ADMIN_CHANNELS.map(ch => (
                <button key={ch.id} onClick={() => setSelectedChannel(ch.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all border ${selectedChannel === ch.id ? 'bg-red-600 text-white border-red-500' : 'bg-zinc-800 text-white/50 border-white/10'}`}>
                  {ch.name}
                </button>
              ))}
            </div>

            {/* Liste des vidéos */}
            {channelVideosLoading ? (
              <div className="space-y-2">
                {[1,2,3,4].map(i => <div key={i} className="h-14 bg-zinc-800 rounded-lg animate-pulse" />)}
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {(() => {
                  const blacklistedSet = new Set(blacklist.map(b => b.video_id));
                  const channels = selectedChannel === 'all' ? ADMIN_CHANNELS : ADMIN_CHANNELS.filter(ch => ch.id === selectedChannel);
                  const videos = channels.flatMap(ch => (channelVideosAdmin[ch.id] || []).slice(0, 25));
                  if (videos.length === 0) return <p className="text-white/20 text-xs text-center py-4">Aucune vidéo chargée</p>;
                  return videos.map((v: any) => {
                    const isBlacklisted = blacklistedSet.has(v.id);
                    return (
                      <div key={v.id} className={`flex items-center gap-2 rounded-lg p-2 border transition-all ${isBlacklisted ? 'bg-red-950/30 border-red-600/20 opacity-60' : 'bg-zinc-800/50 border-white/5'}`}>
                        <img src={v.thumbnail} alt="" className="w-14 aspect-video object-cover rounded flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[10px] font-medium leading-snug line-clamp-2">{v.title}</p>
                          <p className="text-white/30 text-[9px]">{v.channelName}</p>
                        </div>
                        {isBlacklisted ? (
                          <button onClick={() => handleUnblacklist(v.id, v.title)}
                            className="flex-shrink-0 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white px-2 py-1 rounded text-[9px] font-black uppercase transition-colors">
                            ✅ Remettre
                          </button>
                        ) : (
                          <button onClick={() => handleBlacklistVideo(v.id, v.title, v.channelName)}
                            className="flex-shrink-0 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-2 py-1 rounded text-[9px] font-black uppercase transition-colors">
                            🚫 Masquer
                          </button>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            )}
          </div>

          {/* Vidéos masquées */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/40 text-[9px] uppercase tracking-widest">Vidéos masquées ({blacklist.length})</p>
              <button onClick={fetchBlacklist} className="text-white/30 hover:text-white/60 transition-colors"><RefreshCw size={12} /></button>
            </div>
            {blacklistLoading ? (
              <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-12 bg-zinc-900 rounded-xl animate-pulse" />)}</div>
            ) : blacklist.length === 0 ? (
              <p className="text-white/20 text-xs text-center py-4">Aucune vidéo masquée</p>
            ) : (
              <div className="space-y-2">
                {blacklist.map(item => (
                  <div key={item.id} className="flex items-center gap-3 bg-zinc-900/60 border border-white/5 rounded-xl p-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[10px] font-medium truncate">{item.title}</p>
                      <p className="text-white/40 text-[9px]">{item.channel}</p>
                    </div>
                    <button onClick={() => handleUnblacklist(item.video_id, item.title)}
                      className="flex-shrink-0 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white px-2 py-1 rounded text-[9px] font-black uppercase transition-colors">
                      Remettre
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <Toast result={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default AdminDashboard;
