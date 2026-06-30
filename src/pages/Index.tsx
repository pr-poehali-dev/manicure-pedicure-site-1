import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ChatWidget from '@/components/ChatWidget';

const HERO_IMG = 'https://cdn.poehali.dev/projects/1da769f2-cb50-4ea8-bc29-6e60180ba62b/files/ec0f8e24-52a8-44d0-a17a-745cf70d673f.jpg';
const INTERIOR_IMG = 'https://cdn.poehali.dev/projects/1da769f2-cb50-4ea8-bc29-6e60180ba62b/files/32478934-e414-4728-89b5-e304746d5014.jpg';
const ART_IMG = 'https://cdn.poehali.dev/projects/1da769f2-cb50-4ea8-bc29-6e60180ba62b/files/ce1bcd76-4096-4b41-9423-4cf29dd54ce7.jpg';

const NAV = [
  { id: 'services', label: 'Услуги' },
  { id: 'portfolio', label: 'Портфолио' },
  { id: 'about', label: 'О нас' },
  { id: 'masters', label: 'Мастера' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' },
];

const SERVICES = [
  { icon: 'Sparkles', title: 'Классический маникюр', desc: 'Безупречная форма, питание и блеск', price: '2 500 ₽' },
  { icon: 'Gem', title: 'Аппаратный маникюр', desc: 'Деликатная обработка премиум-класса', price: '3 200 ₽' },
  { icon: 'Brush', title: 'Дизайн ногтей', desc: 'Авторские рисунки и золотая фольга', price: 'от 1 500 ₽' },
  { icon: 'Flower2', title: 'СПА-педикюр', desc: 'Ритуал ухода с ароматерапией', price: '4 000 ₽' },
  { icon: 'Crown', title: 'Покрытие гель-лак', desc: 'Стойкость до 4-х недель', price: '2 800 ₽' },
  { icon: 'Heart', title: 'Парадиз для рук', desc: 'Парафинотерапия и массаж', price: '1 800 ₽' },
];

const MASTERS = [
  { name: 'Виктория Лебедева', role: 'Топ-мастер · 12 лет', specialty: 'Сложный дизайн, наращивание' },
  { name: 'Алина Морозова', role: 'Мастер · 8 лет', specialty: 'Аппаратный маникюр, уход' },
  { name: 'Екатерина Соколова', role: 'СПА-мастер · 10 лет', specialty: 'Педикюр, парафинотерапия' },
];

const PORTFOLIO = [ART_IMG, HERO_IMG, INTERIOR_IMG, ART_IMG, HERO_IMG, INTERIOR_IMG];

const REVIEWS = [
  { name: 'Мария А.', text: 'Лучшая студия в городе. Атмосфера роскоши и внимание к каждой детали. Маникюр держится идеально.', rating: 5 },
  { name: 'Ольга К.', text: 'Виктория — настоящая волшебница. Золотой дизайн вызывает восхищение у всех вокруг!', rating: 5 },
  { name: 'Дарья С.', text: 'Приятно, когда тебя встречают как королеву. СПА-педикюр — это отдельный вид удовольствия.', rating: 5 },
];

const Index = () => {
  const [form, setForm] = useState({ name: '', phone: '', service: '', master: '', date: '', time: '' });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container flex items-center justify-between h-20">
          <button onClick={() => scrollTo('hero')} className="font-display text-2xl tracking-[0.3em] text-gold">
            MIRÉLLE
          </button>
          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-xs uppercase tracking-[0.2em] text-foreground/70 hover:text-gold transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Button
            onClick={() => scrollTo('booking')}
            className="bg-gold hover:bg-gold-light text-noir font-medium tracking-wider rounded-none px-6"
          >
            Записаться
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Маникюр" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p className="animate-fade-up text-gold tracking-luxe text-xs uppercase mb-6" style={{ animationDelay: '0.1s' }}>
              Премиальная студия красоты
            </p>
            <h1 className="animate-fade-up font-display text-6xl md:text-8xl leading-[0.95] mb-8" style={{ animationDelay: '0.25s' }}>
              Искусство<br />
              <span className="gold-text-gradient italic">безупречных</span><br />
              рук
            </h1>
            <p className="animate-fade-up text-foreground/70 text-lg max-w-md mb-10 leading-relaxed" style={{ animationDelay: '0.4s' }}>
              Где каждая деталь продумана до совершенства. Маникюр и педикюр уровня люкс в атмосфере абсолютного комфорта.
            </p>
            <div className="animate-fade-up flex flex-wrap gap-4" style={{ animationDelay: '0.55s' }}>
              <Button
                onClick={() => scrollTo('booking')}
                className="bg-gold hover:bg-gold-light text-noir font-medium tracking-wider rounded-none px-8 h-12 gold-glow"
              >
                Записаться онлайн
              </Button>
              <Button
                onClick={() => scrollTo('services')}
                variant="outline"
                className="border-gold/50 text-gold hover:bg-gold/10 hover:text-gold rounded-none px-8 h-12 tracking-wider bg-transparent"
              >
                Наши услуги
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/60 animate-float">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 relative">
        <div className="container">
          <SectionTitle sub="Прайс-лист" title="Услуги студии" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40 mt-16">
            {SERVICES.map((s) => (
              <div key={s.title} className="group bg-card p-10 hover:bg-secondary transition-colors duration-500">
                <div className="flex items-center justify-center w-14 h-14 border border-gold/40 rounded-full mb-6 text-gold group-hover:bg-gold group-hover:text-noir transition-all duration-500">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="font-display text-2xl mb-2">{s.title}</h3>
                <p className="text-foreground/60 text-sm mb-5 leading-relaxed">{s.desc}</p>
                <div className="flex items-center justify-between border-t border-border/40 pt-4">
                  <span className="text-gold font-display text-xl">{s.price}</span>
                  <button onClick={() => scrollTo('booking')} className="text-xs uppercase tracking-widest text-foreground/50 hover:text-gold transition-colors">
                    Записаться →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-28 bg-noir/40">
        <div className="container">
          <SectionTitle sub="Галерея работ" title="Портфолио" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16">
            {PORTFOLIO.map((img, i) => (
              <div key={i} className="group relative overflow-hidden aspect-square">
                <img src={img} alt={`Работа ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/40 transition-colors duration-500 flex items-center justify-center">
                  <Icon name="Plus" size={32} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={INTERIOR_IMG} alt="Интерьер" className="w-full aspect-[4/5] object-cover" />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-gold text-noir p-8 max-w-[200px]">
              <p className="font-display text-5xl leading-none">15</p>
              <p className="text-xs uppercase tracking-widest mt-2">лет безупречной репутации</p>
            </div>
          </div>
          <div>
            <SectionTitle sub="О студии" title="Роскошь в деталях" align="left" />
            <p className="text-foreground/70 leading-relaxed mt-8 mb-6">
              MIRÉLLE — это пространство, где красота встречается с искусством. Мы создали студию для тех, кто ценит безупречный сервис, премиальные материалы и индивидуальный подход.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-10">
              Только сертифицированные бренды, стерильность медицинского уровня и мастера, влюблённые в своё дело.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { icon: 'Award', t: 'Премиум-материалы', d: 'Лучшие мировые бренды' },
                { icon: 'ShieldCheck', t: 'Стерильность', d: 'Медицинский стандарт' },
                { icon: 'Users', t: 'Топ-мастера', d: 'Опыт от 8 лет' },
                { icon: 'Coffee', t: 'Атмосфера', d: 'Комплимент от студии' },
              ].map((f) => (
                <div key={f.t} className="flex gap-4">
                  <Icon name={f.icon} size={22} className="text-gold shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-sm">{f.t}</p>
                    <p className="text-foreground/50 text-xs">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MASTERS */}
      <section id="masters" className="py-28 bg-noir/40">
        <div className="container">
          <SectionTitle sub="Команда" title="Наши мастера" />
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {MASTERS.map((m) => (
              <div key={m.name} className="group text-center">
                <div className="relative mx-auto w-44 h-44 mb-6">
                  <div className="absolute inset-0 rounded-full border border-gold/40 group-hover:border-gold transition-colors duration-500" />
                  <div className="absolute inset-2 rounded-full gold-gradient flex items-center justify-center">
                    <span className="font-display text-5xl text-noir">{m.name.charAt(0)}</span>
                  </div>
                </div>
                <h3 className="font-display text-2xl">{m.name}</h3>
                <p className="text-gold text-xs uppercase tracking-widest mt-2">{m.role}</p>
                <p className="text-foreground/50 text-sm mt-3">{m.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28">
        <div className="container">
          <SectionTitle sub="Впечатления" title="Отзывы клиентов" />
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-card border border-border/40 p-8 relative">
                <Icon name="Quote" size={40} className="text-gold/20 absolute top-6 right-6" />
                <div className="flex gap-1 mb-5 text-gold">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-current" />
                  ))}
                </div>
                <p className="text-foreground/70 leading-relaxed mb-6 relative z-10">«{r.text}»</p>
                <p className="font-display text-xl text-gold">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-28 bg-noir/40 relative">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <SectionTitle sub="Онлайн-запись" title="Запишитесь к мастеру" />
            <div className="bg-card border border-gold/20 p-8 md:p-12 mt-12">
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Ваше имя">
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Анна"
                    className="bg-background border-border/60 rounded-none h-12 focus-visible:ring-gold"
                  />
                </Field>
                <Field label="Телефон">
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="bg-background border-border/60 rounded-none h-12 focus-visible:ring-gold"
                  />
                </Field>
                <Field label="Услуга">
                  <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                    <SelectTrigger className="bg-background border-border/60 rounded-none h-12 focus:ring-gold">
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((s) => (
                        <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Мастер">
                  <Select value={form.master} onValueChange={(v) => setForm({ ...form, master: v })}>
                    <SelectTrigger className="bg-background border-border/60 rounded-none h-12 focus:ring-gold">
                      <SelectValue placeholder="Выберите мастера" />
                    </SelectTrigger>
                    <SelectContent>
                      {MASTERS.map((m) => (
                        <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Дата">
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="bg-background border-border/60 rounded-none h-12 focus-visible:ring-gold"
                  />
                </Field>
                <Field label="Время">
                  <Select value={form.time} onValueChange={(v) => setForm({ ...form, time: v })}>
                    <SelectTrigger className="bg-background border-border/60 rounded-none h-12 focus:ring-gold">
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent>
                      {['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'].map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Button className="w-full mt-8 bg-gold hover:bg-gold-light text-noir font-medium tracking-wider rounded-none h-14 text-base gold-glow">
                Подтвердить запись
              </Button>
              <p className="text-center text-foreground/40 text-xs mt-4">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS / FOOTER */}
      <footer id="contacts" className="pt-28 pb-12 border-t border-border/40">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <p className="font-display text-3xl tracking-[0.3em] text-gold mb-4">MIRÉLLE</p>
              <p className="text-foreground/60 max-w-sm leading-relaxed">
                Премиальная студия маникюра и педикюра. Создаём красоту с заботой о каждой детали.
              </p>
              <div className="flex gap-4 mt-6">
                {['Instagram', 'Send', 'Phone'].map((ic) => (
                  <a key={ic} href="#" className="w-10 h-10 border border-gold/40 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-noir transition-all">
                    <Icon name={ic} size={18} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-5">Контакты</p>
              <ul className="space-y-3 text-foreground/60 text-sm">
                <li className="flex gap-3"><Icon name="MapPin" size={16} className="text-gold shrink-0" /> ул. Тверская, 12, Москва</li>
                <li className="flex gap-3"><Icon name="Phone" size={16} className="text-gold shrink-0" /> +7 (495) 123-45-67</li>
                <li className="flex gap-3"><Icon name="Mail" size={16} className="text-gold shrink-0" /> hello@mirelle.ru</li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-5">Часы работы</p>
              <ul className="space-y-3 text-foreground/60 text-sm">
                <li className="flex justify-between"><span>Пн — Пт</span><span>10:00 — 21:00</span></li>
                <li className="flex justify-between"><span>Сб — Вс</span><span>11:00 — 20:00</span></li>
              </ul>
            </div>
          </div>
          <div className="shimmer-line h-px w-full mb-8" />
          <p className="text-center text-foreground/40 text-xs tracking-wider">
            © 2026 MIRÉLLE Studio. Все права защищены.
          </p>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

const SectionTitle = ({ sub, title, align = 'center' }: { sub: string; title: string; align?: 'center' | 'left' }) => (
  <div className={align === 'center' ? 'text-center' : 'text-left'}>
    <p className="text-gold tracking-luxe text-xs uppercase mb-4">{sub}</p>
    <h2 className="font-display text-5xl md:text-6xl">{title}</h2>
    {align === 'center' && (
      <div className="flex items-center justify-center gap-3 mt-6">
        <span className="h-px w-12 bg-gold/40" />
        <Icon name="Sparkle" size={14} className="text-gold" />
        <span className="h-px w-12 bg-gold/40" />
      </div>
    )}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-3">{label}</label>
    {children}
  </div>
);

export default Index;