import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Send, Lock, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  user_id: string;
  user_email: string;
  content: string;
  created_at: string;
}

interface ChatProps {
  videoId: string;
  isPremium: boolean;
  onBecomeVIP?: () => void;
}

const ChatComponent: React.FC<ChatProps> = ({ videoId, isPremium, onBecomeVIP }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPremium) return;

    // Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('video_id', videoId)
        .order('created_at', { ascending: true })
        .limit(50);

      if (data) setMessages(data);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`chat:${videoId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages',
        filter: `video_id=eq.${videoId}`
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [videoId, isPremium]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !isPremium) return;

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { error } = await supabase.from('chat_messages').insert({
        video_id: videoId,
        user_id: user.id,
        user_email: user.email,
        content: newMessage.trim()
      });

      if (!error) setNewMessage('');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[400px] bg-black border-t border-white/10 relative">
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-[10px] uppercase tracking-widest font-black text-white/60 flex items-center gap-2">
          <MessageSquare size={12} className="text-red-600" />
          Chat en direct
        </h3>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
          <span className="text-[9px] text-white/40 font-bold uppercase tracking-tighter">Live</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar ${!isPremium ? 'blur-sm pointer-events-none select-none opacity-50' : ''}`}
      >
        {messages.length === 0 && isPremium && (
          <div className="text-center py-8">
            <p className="text-white/20 text-xs italic">Soyez le premier à commenter...</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-tight">
              {msg.user_email.split('@')[0]}
            </span>
            <p className="text-sm text-white/90 leading-snug">{msg.content}</p>
          </div>
        ))}
      </div>

      {!isPremium && (
        <div className="absolute inset-x-0 bottom-0 top-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md z-10 p-6 text-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white mb-4 shadow-xl">
            <Lock size={24} />
          </div>
          <h4 className="text-white font-black uppercase italic mb-2">Espace VIP</h4>
          <p className="text-white/60 text-xs mb-6 max-w-[200px]">
            Rejoignez le Club pour discuter en direct avec les passionnés.
          </p>
          <button 
            onClick={onBecomeVIP}
            className="bg-white text-black text-[10px] font-black px-6 py-3 rounded-full uppercase tracking-widest hover:bg-zinc-200 transition-colors"
          >
            Devenir VIP
          </button>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 flex gap-2">
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={!isPremium}
          placeholder={isPremium ? "Votre message..." : "Chat réservé aux VIP"}
          className="flex-1 bg-zinc-900 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:border-red-600 outline-none disabled:opacity-50"
        />
        <button 
          disabled={!isPremium || loading}
          className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
