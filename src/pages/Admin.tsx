import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const ADMIN_URL = 'https://functions.poehali.dev/6b8403a5-0a4e-407b-a958-5e6b65ff6284';

type Request = {
  id: number;
  name: string;
  phone: string;
  message: string;
  status: 'new' | 'in_progress' | 'done';
  created_at: string;
};

const STATUS_CONFIG = {
  new: { label: 'Новая', color: 'text-gold border-gold/50 bg-gold/10' },
  in_progress: { label: 'В работе', color: 'text-blue-400 border-blue-400/50 bg-blue-400/10' },
  done: { label: 'Выполнена', color: 'text-green-400 border-green-400/50 bg-green-400/10' },
};

const Admin = () => {
  const [items, setItems] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'in_progress' | 'done'>('all');
  const [updating, setUpdating] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(ADMIN_URL);
      const data = await res.json();
      setItems(data.requests || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: number, status: Request['status']) => {
    setUpdating(id);
    try {
      await fetch(ADMIN_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } finally {
      setUpdating(null);
    }
  };

  const filtered = filter === 'all' ? items : items.filter((r) => r.status === filter);
  const counts = {
    all: items.length,
    new: items.filter((r) => r.status === 'new').length,
    in_progress: items.filter((r) => r.status === 'in_progress').length,
    done: items.filter((r) => r.status === 'done').length,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/40 bg-card">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="/" className="font-display text-xl tracking-[0.25em] text-gold">MIRÉLLE</a>
            <span className="text-border/60">·</span>
            <span className="text-xs uppercase tracking-widest text-foreground/50">Заявки из чата</span>
          </div>
          <Button
            onClick={load}
            variant="outline"
            className="border-gold/40 text-gold hover:bg-gold/10 hover:text-gold rounded-none bg-transparent h-9 text-xs tracking-wider"
          >
            <Icon name="RefreshCw" size={14} className="mr-2" />
            Обновить
          </Button>
        </div>
      </header>

      <div className="container py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { key: 'all', label: 'Всего', icon: 'Inbox' },
            { key: 'new', label: 'Новые', icon: 'Sparkles' },
            { key: 'in_progress', label: 'В работе', icon: 'Clock' },
            { key: 'done', label: 'Выполнены', icon: 'CheckCircle' },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setFilter(s.key as typeof filter)}
              className={`bg-card border p-5 text-left transition-all duration-200 rounded-none ${
                filter === s.key ? 'border-gold/60 gold-glow' : 'border-border/40 hover:border-gold/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest text-foreground/50">{s.label}</span>
                <Icon name={s.icon} size={16} className="text-gold/60" />
              </div>
              <p className="font-display text-4xl text-gold">{counts[s.key as keyof typeof counts]}</p>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card border border-border/40">
          <div className="border-b border-border/40 px-6 py-4 flex items-center justify-between">
            <h2 className="font-display text-2xl">
              {filter === 'all' ? 'Все заявки' : STATUS_CONFIG[filter as keyof typeof STATUS_CONFIG]?.label}
            </h2>
            {loading && <Icon name="Loader2" size={18} className="text-gold animate-spin" />}
          </div>

          {filtered.length === 0 && !loading && (
            <div className="py-20 text-center text-foreground/40">
              <Icon name="Inbox" size={40} className="mx-auto mb-4 opacity-40" />
              <p>Заявок пока нет</p>
            </div>
          )}

          {filtered.map((r, i) => (
            <div
              key={r.id}
              className={`px-6 py-5 flex flex-col md:flex-row md:items-start gap-4 ${
                i < filtered.length - 1 ? 'border-b border-border/40' : ''
              }`}
            >
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-display text-lg">{r.name || 'Без имени'}</span>
                  {r.phone && (
                    <a href={`tel:${r.phone}`} className="text-gold text-sm hover:underline flex items-center gap-1">
                      <Icon name="Phone" size={13} />
                      {r.phone}
                    </a>
                  )}
                  <span className="text-foreground/40 text-xs ml-auto">{r.created_at}</span>
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed">{r.message}</p>
              </div>

              {/* Status controls */}
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs border px-3 py-1 rounded-full font-medium ${STATUS_CONFIG[r.status].color}`}>
                  {STATUS_CONFIG[r.status].label}
                </span>
                <div className="relative group">
                  <button className="w-8 h-8 flex items-center justify-center border border-border/40 hover:border-gold/40 text-foreground/50 hover:text-gold transition-colors rounded-none">
                    {updating === r.id
                      ? <Icon name="Loader2" size={14} className="animate-spin" />
                      : <Icon name="ChevronDown" size={14} />
                    }
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-36 bg-card border border-border/60 shadow-xl z-10 hidden group-hover:block">
                    {(Object.entries(STATUS_CONFIG) as [Request['status'], typeof STATUS_CONFIG['new']][]).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => updateStatus(r.id, key)}
                        className={`w-full text-left px-4 py-2.5 text-xs hover:bg-secondary transition-colors ${
                          r.status === key ? 'text-gold' : 'text-foreground/70'
                        }`}
                      >
                        {val.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
