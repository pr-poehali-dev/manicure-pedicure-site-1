import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const CHAT_URL = 'https://functions.poehali.dev/3a8f9ca2-2f90-4bf4-9c80-756c66c9f6ec';

type Msg = { from: 'bot' | 'user'; text: string };

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [messages, setMessages] = useState<Msg[]>([
    { from: 'bot', text: 'Здравствуйте! Это студия MIRÉLLE. Напишите ваш вопрос или пожелание — мастер свяжется с вами в ближайшее время.' },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!form.message.trim() || loading) return;
    setLoading(true);
    setMessages((m) => [...m, { from: 'user', text: form.message }]);

    try {
      const res = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('fail');
      setSent(true);
      setMessages((m) => [
        ...m,
        { from: 'bot', text: 'Спасибо! Ваше сообщение принято. Мы свяжемся с вами в течение 15 минут.' },
      ]);
      setForm({ name: '', phone: '', message: '' });
    } catch {
      setMessages((m) => [
        ...m,
        { from: 'bot', text: 'Не удалось отправить. Попробуйте ещё раз или позвоните нам: +7 (495) 123-45-67.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[60] w-16 h-16 rounded-full gold-gradient gold-glow flex items-center justify-center text-noir hover:scale-105 transition-transform"
        aria-label="Открыть чат"
      >
        <Icon name={open ? 'X' : 'MessageCircle'} size={26} />
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-28 right-6 z-[60] w-[calc(100vw-3rem)] max-w-sm transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <div className="bg-card border border-gold/30 shadow-2xl flex flex-col h-[28rem]">
          {/* Header */}
          <div className="gold-gradient text-noir px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-noir/20 flex items-center justify-center">
              <Icon name="Sparkles" size={20} />
            </div>
            <div>
              <p className="font-display text-lg leading-none">MIRÉLLE</p>
              <p className="text-xs opacity-80">Онлайн · ответим быстро</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-gold text-noir rounded-l-xl rounded-tr-xl'
                      : 'bg-secondary text-foreground/90 rounded-r-xl rounded-tl-xl'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          {!sent && (
            <div className="border-t border-border/40 p-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Имя"
                  className="bg-background border-border/60 rounded-none h-9 text-sm focus-visible:ring-gold"
                />
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Телефон"
                  className="bg-background border-border/60 rounded-none h-9 text-sm focus-visible:ring-gold"
                />
              </div>
              <div className="flex gap-2">
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Ваше сообщение..."
                  rows={1}
                  className="bg-background border-border/60 rounded-none resize-none text-sm focus-visible:ring-gold min-h-9"
                />
                <Button
                  onClick={send}
                  disabled={loading || !form.message.trim()}
                  className="bg-gold hover:bg-gold-light text-noir rounded-none h-auto px-3 shrink-0"
                >
                  <Icon name={loading ? 'Loader2' : 'Send'} size={18} className={loading ? 'animate-spin' : ''} />
                </Button>
              </div>
            </div>
          )}
          {sent && (
            <div className="border-t border-border/40 p-3">
              <Button
                onClick={() => setSent(false)}
                variant="outline"
                className="w-full border-gold/50 text-gold hover:bg-gold/10 hover:text-gold rounded-none bg-transparent text-sm"
              >
                Написать ещё
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
