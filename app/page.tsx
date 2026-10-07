'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Download, 
  Search, 
  ArrowUp,
  MapPin,
  Mail,
  Briefcase,
  FileSpreadsheet,
  Globe2,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Company {
  id: number;
  name: string;
  region: string;
  isSakhalin: boolean;
  isCustom?: boolean;
  sphere: string;
  email: string;
  role: string;
}

interface CompanyState {
  sent: boolean;
  status: 'none' | 'yes' | 'no' | 'noemail';
  channel: 'email' | 'site' | 'hh' | 'tg';
  note: string;
}

const defaultList: Company[] = [
  { id: 1, name: "Солнце Телеком (ООО «Связь»)", region: "Сахалин", isSakhalin: true, sphere: "Интернет-провайдер, телеком", email: "info@solnce-telecom.ru", role: "Техник связи, дежурный инженер, монтажник СКС" },
  { id: 2, name: "ПАО «Ростелеком» (Сахалин)", region: "Сахалин", isSakhalin: true, sphere: "Оператор связи, дата-центры", email: "dfo@rt.ru", role: "Специалист техподдержки, электромеханик" },
  { id: 3, name: "Портал Sakh.com (Сах.ком)", region: "Сахалин", isSakhalin: true, sphere: "ИТ-сервисы, веб-серверы", email: "job@sakh.com", role: "Помощник сисадмина, техподдержка" },
  { id: 4, name: "ООО «Интерра» (ИТ-Аутсорсинг)", region: "Сахалин", isSakhalin: true, sphere: "ИТ-обслуживание организаций, сети", email: "info@interra-sakhalin.ru", role: "Младший сисадмин, помощник инженера" },
  { id: 5, name: "ТрансТелеКом (ТТК-Сахалин)", region: "Сахалин", isSakhalin: true, sphere: "Магистральный оператор связи", email: "post@sakhalin.ttk.ru", role: "Сетевой техник, дежурный оператор" },
  { id: 6, name: "«Сахалинская Энергия» (Sakhalin Energy)", region: "Сахалин", isSakhalin: true, sphere: "Нефтегазовый холдинг, IT/NOC", email: "recruitment@sakhalinenergy.ru", role: "Стажер в отдел IT / Телекоммуникаций" },
  { id: 7, name: "Сахалин-ИнфоТех", region: "Сахалин", isSakhalin: true, sphere: "Системная интеграция, серверы", email: "info@sakhinfotech.ru", role: "Помощник инженера, специалист внедрения" },
  { id: 8, name: "Первый Бит (Южно-Сахалинск)", region: "Сахалин", isSakhalin: true, sphere: "Автоматизация, серверы 1С, сети", email: "yuzhno-sakhalinsk@1cbit.ru", role: "Младший системный администратор" },
  { id: 9, name: "Минцифры Сахалинской области", region: "Сахалин", isSakhalin: true, sphere: "Госсектор, ИТ и связь", email: "it@sakhalin.gov.ru", role: "Стажер отдела инфраструктуры и связи" },
  { id: 10, name: "ГБУ «Сахалинский ИТ-центр» (ИТ-парк)", region: "Сахалин", isSakhalin: true, sphere: "Региональный ИТ-кластер", email: "it-park@sakhalin.gov.ru", role: "Младший системный инженер" },
  { id: 11, name: "Сахалинское морское пароходство (SASCO)", region: "Сахалин", isSakhalin: true, sphere: "Логистика, корпоративная сеть", email: "kadr@sasco.ru", role: "Помощник системного администратора" },
  { id: 12, name: "Аэровокзал Южно-Сахалинск (Аэропорт)", region: "Сахалин", isSakhalin: true, sphere: "Сетевые системы аэропорта", email: "kadr@airportus.ru", role: "Техник по связи и ИТ-оборудованию" },
  { id: 13, name: "СахГУ (Сахалинский госуниверситет)", region: "Сахалин", isSakhalin: true, sphere: "Кампусная сеть, образование", email: "it@sakhgu.ru", role: "Специалист техподдержки лабораторий" },
  { id: 14, name: "АО «Сахалинская нефтяная компания»", region: "Сахалин", isSakhalin: true, sphere: "ТЭК, офисная сеть", email: "info@sakhoil.ru", role: "Помощник системного администратора" },
  { id: 15, name: "ООО «ДальСвязь-Сахалин»", region: "Сахалин", isSakhalin: true, sphere: "Монтаж слаботочных сетей, СКС", email: "dalsvyaz-sakh@mail.ru", role: "Монтажник сетей, техник СКС" },
  { id: 16, name: "ПАО «Сахалинэнерго» (РусГидро)", region: "Сахалин", isSakhalin: true, sphere: "Энергетика, телемеханика, сеть", email: "kanc@sahen.ru", role: "Стажер группы информационных технологий" },
  { id: 17, name: "МТС (Сахалинский филиал)", region: "Сахалин", isSakhalin: true, sphere: "Мобильная и фиксированная связь", email: "job@mts.ru", role: "Специалист эксплуатации фиксированной сети" },
  { id: 18, name: "МегаФон (Сахалинский филиал)", region: "Сахалин", isSakhalin: true, sphere: "Сети связи, оптоволокно", email: "job@megafon.ru", role: "Инженер оборудования связи" },
  { id: 19, name: "Билайн (ВымпелКом, Сахалин)", region: "Сахалин", isSakhalin: true, sphere: "Интернет-провайдер ШПД", email: "job@beeline.ru", role: "Техник подключения, техподдержка" },
  { id: 20, name: "ООО «ИТ-Сервис Сахалин»", region: "Сахалин", isSakhalin: true, sphere: "Обслуживание ПК организаций", email: "service@it-sakh.ru", role: "Сервисный инженер, эникейщик" },
  { id: 21, name: "Администрация г. Южно-Сахалинска", region: "Сахалин", isSakhalin: true, sphere: "Муниципальный отдел информатизации", email: "kadr@yuzhno-sakh.ru", role: "Практикант отдела ИТ и связи" },
  { id: 22, name: "Сеть супермаркетов «Первый Семейный»", region: "Сахалин", isSakhalin: true, sphere: "Ритейл, серверы магазинов", email: "hr@1semeyny.ru", role: "Помощник системного администратора" },
  { id: 23, name: "«Гидрострой» (Сахалинский офис)", region: "Сахалин", isSakhalin: true, sphere: "Крупный холдинг, филиалы", email: "office@gidrostroy.com", role: "Младший сисадмин, специалист Helpdesk" },
  { id: 24, name: "«Газпром газораспределение Сахалин»", region: "Сахалин", isSakhalin: true, sphere: "Сетевая инфраструктура", email: "info@sakhalin-gaz.ru", role: "Специалист технической поддержки" },
  { id: 25, name: "Сахалинская обл. клиническая больница", region: "Сахалин", isSakhalin: true, sphere: "Здравоохранение, масштабная ЛВС", email: "sakh-okb@sakhalin.gov.ru", role: "Младший техник информационных систем" },
  { id: 26, name: "Beget (Бегет)", region: "Удалённо", isSakhalin: false, sphere: "Хостинг-провайдер РФ, веб-серверы", email: "job@beget.com", role: "Инженер техподдержки хостинга (Linux)" },
  { id: 27, name: "FirstVDS / ISPsystem", region: "Удалённо", isSakhalin: false, sphere: "VDS/VPS серверы, KVM", email: "job@firstvds.ru", role: "Инженер техподдержки Linux" },
  { id: 28, name: "Selectel (Селектел)", region: "Удалённо", isSakhalin: false, sphere: "Облачный провайдер, дата-центры", email: "job@selectel.ru", role: "Младший инженер поддержки облака" },
  { id: 29, name: "REG.RU / Рунити", region: "Удалённо", isSakhalin: false, sphere: "Домены, хостинг, серверы", email: "hr@reg.ru", role: "Специалист поддержки и переноса данных" },
  { id: 30, name: "SpaceWeb (СпейсВеб)", region: "Удалённо", isSakhalin: false, sphere: "Хостинг виртуальных серверов", email: "job@sweb.ru", role: "Специалист службы техподдержки" },
  { id: 31, name: "TimeWeb (Таймвеб)", region: "Удалённо", isSakhalin: false, sphere: "Облачный хостинг, VDS/VPS", email: "hr@timeweb.ru", role: "Младший сисадмин, техподдержка" },
  { id: 32, name: "Яндекс (Яндекс 360 / Облако)", region: "Удалённо", isSakhalin: false, sphere: "ИТ-гигант, дата-центры", email: "intern@yandex-team.ru", role: "Стажер отдела поддержки инфраструктуры" },
  { id: 33, name: "VK (VK Cloud)", region: "Удалённо", isSakhalin: false, sphere: "ИТ-холдинг, облачные платформы", email: "internship@vk.team", role: "Младший инженер поддержки облака" },
  { id: 34, name: "«РЕЛЭКС»", region: "Удалённо", isSakhalin: false, sphere: "СУБД, системная интеграция, сети", email: "job@relex.ru", role: "Младший сетевой администратор" },
  { id: 35, name: "Астрал-Софт", region: "Удалённо", isSakhalin: false, sphere: "ЭДО, SaaS-решения", email: "hr@astral.ru", role: "Специалист техподдержки клиентов" },
  { id: 36, name: "СервисКлауд (Scloud)", region: "Удалённо", isSakhalin: false, sphere: "1С в облаке, удаленные столы", email: "hr@scloud.ru", role: "Инженер 1–2 линии техподдержки" },
  { id: 37, name: "Абарус (ABARUS_IT)", region: "Удалённо", isSakhalin: false, sphere: "Сетевые решения, мониторинг", email: "info@nso-it.ru", role: "Младший сетевой инженер / сисадмин" },
  { id: 38, name: "Группа «Астра» (Astra Linux)", region: "Удалённо", isSakhalin: false, sphere: "Разработчик ОС Astra Linux", email: "hr@astra-linux.ru", role: "Специалист сопровождения Linux-систем" },
  { id: 39, name: "РЕД СОФТ (РЕД ОС)", region: "Удалённо", isSakhalin: false, sphere: "Отечественные ОС и СУБД", email: "info@red-soft.ru", role: "Младший специалист поддержки РЕД ОС" },
  { id: 40, name: "Базальт СПО (ALT Linux)", region: "Удалённо", isSakhalin: false, sphere: "Разработчик ALT Linux", email: "job@basealt.ru", role: "Специалист техподдержки пользователей" },
  { id: 41, name: "АЙ ТИ ОНТАЙМ", region: "Удалённо", isSakhalin: false, sphere: "ИТ-аутсорсинг и удаленная поддержка", email: "job@it-ontime.ru", role: "Стажер системного администратора" },
  { id: 42, name: "ИнфраТех", region: "Удалённо", isSakhalin: false, sphere: "Инфраструктурные решения", email: "hr@infratech.ru", role: "Стажер инженера техподдержки" },
  { id: 43, name: "Aston (Астон)", region: "Удалённо", isSakhalin: false, sphere: "ИТ-консалтинг, разработка", email: "cv@astondevs.ru", role: "Стажер DevOps / Системный инженер" },
  { id: 44, name: "ЭлектронТелеком", region: "Удалённо", isSakhalin: false, sphere: "Телекоммуникации, сети", email: "info@el-tel.ru", role: "Специалист техподдержки (сменный график)" },
  { id: 45, name: "Positive Technologies", region: "Удалённо", isSakhalin: false, sphere: "Информационная безопасность, сети", email: "ptstart@ptsecurity.com", role: "Стажер в отдел сетевой безопасности" },
  { id: 46, name: "Лаборатория Касперского", region: "Удалённо", isSakhalin: false, sphere: "Кибербезопасность, инфраструктура", email: "safeboard@kaspersky.com", role: "Стажер службы системного администрирования" },
  { id: 47, name: "Компания «Светелка Хостинг»", region: "Удалённо", isSakhalin: false, sphere: "Хостинг, аренда Linux-серверов", email: "support@svetelka.ru", role: "Дежурный техник техподдержки" },
  { id: 48, name: "Macloud", region: "Удалённо", isSakhalin: false, sphere: "Облачный хостинг серверов", email: "support@macloud.ru", role: "Инженер техподдержки облачной платформы" },
  { id: 49, name: "AUXO (бывш. Atos)", region: "Удалённо", isSakhalin: false, sphere: "Системный интегратор", email: "hr@auxo.ru", role: "Младший инженер удаленной поддержки" },
  { id: 50, name: "КРОК (CROC)", region: "Удалённо", isSakhalin: false, sphere: "Системная интеграция, сети, ЦОД", email: "job@croc.ru", role: "Стажер направления сетевой инфраструктуры" }
];

export default function JobTracker() {
  const [companies, setCompanies] = useState<Company[]>(defaultList);
  const [states, setStates] = useState<Record<number, CompanyState>>({});
  const [filter, setFilter] = useState<'all' | 'sakhalin' | 'remote' | 'custom' | 'sent' | 'error'>('all');
  const [search, setSearch] = useState('');
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Форма добавления
  const [newName, setNewName] = useState('');
  const [newRegion, setNewRegion] = useState('Сахалин');
  const [newChannel, setNewChannel] = useState<'email' | 'site' | 'hh' | 'tg'>('email');
  const [newContact, setNewContact] = useState('');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const savedStates = localStorage.getItem('shadcn_job_tracker_states');
    if (savedStates) {
      try { setStates(JSON.parse(savedStates)); } catch (e) {}
    }
    const savedCustom = localStorage.getItem('shadcn_job_tracker_custom');
    if (savedCustom) {
      try {
        const parsed = JSON.parse(savedCustom);
        setCompanies([...defaultList, ...parsed]);
      } catch (e) {}
    }

    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const saveStates = (newStates: Record<number, CompanyState>) => {
    setStates(newStates);
    localStorage.setItem('shadcn_job_tracker_states', JSON.stringify(newStates));
  };

  const toggleSent = (id: number, sent: boolean) => {
    const current = states[id] || { sent: false, status: 'none', channel: 'email', note: '' };
    saveStates({ ...states, [id]: { ...current, sent } });
  };

  const updateStatus = (id: number, status: CompanyState['status']) => {
    const current = states[id] || { sent: false, status: 'none', channel: 'email', note: '' };
    saveStates({ ...states, [id]: { ...current, status, sent: status !== 'none' ? true : current.sent } });
  };

  const updateChannel = (id: number, channel: CompanyState['channel']) => {
    const current = states[id] || { sent: false, status: 'none', channel: 'email', note: '' };
    saveStates({ ...states, [id]: { ...current, channel } });
  };

  const updateNote = (id: number, note: string) => {
    const current = states[id] || { sent: false, status: 'none', channel: 'email', note: '' };
    saveStates({ ...states, [id]: { ...current, note } });
  };

  const handleAddCompany = () => {
    if (!newName.trim()) return;
    const newId = 100 + companies.length + 1;
    const newComp: Company = {
      id: newId,
      name: newName.trim(),
      region: newRegion,
      isSakhalin: newRegion === 'Сахалин',
      isCustom: true,
      sphere: 'Пользовательская запись',
      email: newContact.trim(),
      role: 'Свое резюме'
    };

    const updated = [...companies, newComp];
    setCompanies(updated);
    
    const customOnly = updated.filter(c => c.isCustom);
    localStorage.setItem('shadcn_job_tracker_custom', JSON.stringify(customOnly));

    saveStates({
      ...states,
      [newId]: { sent: true, status: 'none', channel: newChannel, note: newNote.trim() }
    });

    setNewName('');
    setNewContact('');
    setNewNote('');
    setModalOpen(false);
  };

  const exportCSV = () => {
    let csv = "\uFEFF№;Отправлено;Ответ компании;Способ отправки;Заметка;Название компании;Регион;Контакты;Позиция\n";
    companies.forEach(item => {
      const s = states[item.id] || { sent: false, status: 'none', channel: 'email', note: '' };
      const sent = s.sent ? "Да" : "Нет";
      let st = "Ожидание";
      if (s.status === 'yes') st = "Да (Ответили)";
      if (s.status === 'no') st = "Нет (Отказ)";
      if (s.status === 'noemail') st = "Нет такой почты";

      let ch = "Email";
      if (s.channel === 'site') ch = "Сайт";
      if (s.channel === 'hh') ch = "hh.ru";
      if (s.channel === 'tg') ch = "Telegram";

      csv += `${item.id};${sent};${st};"${ch}";"${s.note || ''}";"${item.name}";"${item.region}";"${item.email || ''}";"${item.role || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "companies_tracker_shadcn.csv";
    a.click();
  };

  const filtered = companies.filter(item => {
    const s = states[item.id] || { sent: false, status: 'none', channel: 'email', note: '' };
    if (filter === 'sakhalin' && !item.isSakhalin) return false;
    if (filter === 'remote' && item.isSakhalin) return false;
    if (filter === 'custom' && !item.isCustom) return false;
    if (filter === 'sent' && !s.sent) return false;
    if (filter === 'error' && s.status !== 'noemail') return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.sphere.toLowerCase().includes(q) ||
        s.note.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const countSent = Object.values(states).filter(s => s.sent).length;
  const countYes = Object.values(states).filter(s => s.status === 'yes').length;
  const countNo = Object.values(states).filter(s => s.status === 'no').length;
  const countNoEmail = Object.values(states).filter(s => s.status === 'noemail').length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Липкая верхняя навигация shadcn */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-[1500px] mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-semibold tracking-tight">Career & Practice Tracker</h1>
                <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-muted-foreground bg-muted/50">
                  ui.shadcn.com
                </span>
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Андрей Мелехов | Сетевое и системное администрирование (СПЭТ)
              </p>
            </div>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Добавить компанию
          </button>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Карточки статистики shadcn Card */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-xs font-medium text-muted-foreground uppercase">Всего в базе</h3>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{companies.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Организаций</p>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-xs font-medium text-muted-foreground uppercase">Отправлено</h3>
              <Send className="h-4 w-4 text-sky-400" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-sky-400">{countSent}</div>
              <p className="text-xs text-muted-foreground mt-1">Резюме и писем</p>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-xs font-medium text-muted-foreground uppercase">Одобрено / Ответ</h3>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-emerald-400">{countYes}</div>
              <p className="text-xs text-muted-foreground mt-1">Положительных откликов</p>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-xs font-medium text-muted-foreground uppercase">Отказы</h3>
              <XCircle className="h-4 w-4 text-rose-400" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-rose-400">{countNo}</div>
              <p className="text-xs text-muted-foreground mt-1">Компаний отказали</p>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow col-span-2 sm:col-span-1">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-xs font-medium text-muted-foreground uppercase">Ошибки почты</h3>
              <AlertCircle className="h-4 w-4 text-amber-400" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-amber-400">{countNoEmail}</div>
              <p className="text-xs text-muted-foreground mt-1">Не существует ящика</p>
            </div>
          </div>
        </div>

        {/* Панель фильтров и поиска */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск компании, почты или заметки..."
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {(['all', 'sakhalin', 'remote', 'custom', 'sent', 'error'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                  filter === tab
                    ? "bg-secondary text-secondary-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {tab === 'all' && 'Все (50)'}
                {tab === 'sakhalin' && '📍 Сахалин'}
                {tab === 'remote' && '🌐 Удалёнка'}
                {tab === 'custom' && '⭐ Мои'}
                {tab === 'sent' && '☑️ Отправлено'}
                {tab === 'error' && '⚠️ Ошибки'}
              </button>
            ))}

            <button
              onClick={exportCSV}
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-accent hover:text-accent-foreground gap-1.5 ml-auto cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" /> Экспорт
            </button>
          </div>
        </div>

        {/* Таблица shadcn Table */}
        <div className="rounded-md border bg-card shadow-sm overflow-hidden">
          <div className="relative w-full overflow-auto max-h-[70vh]">
            <table className="w-full caption-bottom text-sm border-collapse">
              <thead className="[&_tr]:border-b sticky top-0 z-20 bg-muted/90 backdrop-blur supports-[backdrop-filter]:bg-muted/70">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs w-10">№</th>
                  <th className="h-10 px-3 text-center align-middle font-medium text-muted-foreground text-xs w-20">Статус</th>
                  <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs w-44">Ответ</th>
                  <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs w-52">Способ / Заметка</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs">Компания</th>
                  <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs">Регион</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs">Email / Контакты</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs">Направление</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0 divide-y divide-border/60">
                {filtered.map(item => {
                  const s = states[item.id] || { sent: false, status: 'none', channel: 'email', note: '' };

                  let rowStyle = 'hover:bg-muted/40 transition-colors';
                  if (s.status === 'yes') rowStyle = 'bg-emerald-950/25 hover:bg-emerald-950/35 border-l-2 border-l-emerald-500';
                  else if (s.status === 'no') rowStyle = 'bg-rose-950/25 hover:bg-rose-950/35 border-l-2 border-l-rose-500';
                  else if (s.status === 'noemail') rowStyle = 'bg-amber-950/25 hover:bg-amber-950/35 border-l-2 border-l-amber-500';
                  else if (s.sent) rowStyle = 'bg-blue-950/15 hover:bg-blue-950/25';

                  return (
                    <tr key={item.id} className={rowStyle}>
                      <td className="p-3 align-middle font-mono text-xs text-muted-foreground">{item.id}</td>
                      <td className="p-3 align-middle text-center">
                        <input
                          type="checkbox"
                          checked={s.sent}
                          onChange={(e) => toggleSent(item.id, e.target.checked)}
                          className="h-4 w-4 rounded border-primary text-primary focus:ring-1 focus:ring-ring cursor-pointer bg-background"
                        />
                      </td>
                      <td className="p-3 align-middle">
                        <select
                          value={s.status}
                          onChange={(e) => updateStatus(item.id, e.target.value as any)}
                          className={cn(
                            "h-8 w-full rounded-md border px-2 py-1 text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer bg-background",
                            s.status === 'yes' && "border-emerald-500 text-emerald-400 bg-emerald-950/40",
                            s.status === 'no' && "border-rose-500 text-rose-400 bg-rose-950/40",
                            s.status === 'noemail' && "border-amber-500 text-amber-400 bg-amber-950/40",
                            s.status === 'none' && "border-input text-muted-foreground"
                          )}
                        >
                          <option value="none">⏳ Ждем ответ</option>
                          <option value="yes">✅ Да (Ответили)</option>
                          <option value="no">❌ Нет (Отказ)</option>
                          <option value="noemail">⚠️ Нет такой почты</option>
                        </select>
                      </td>
                      <td className="p-3 align-middle space-y-1">
                        <select
                          value={s.channel}
                          onChange={(e) => updateChannel(item.id, e.target.value as any)}
                          className="h-7 w-full rounded-md border border-input bg-background px-2 py-0.5 text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                        >
                          <option value="email">📧 На Email</option>
                          <option value="site">🌐 Через сайт</option>
                          <option value="hh">💼 Через hh.ru</option>
                          <option value="tg">✈️ В Telegram</option>
                        </select>
                        <input
                          type="text"
                          value={s.note}
                          onChange={(e) => updateNote(item.id, e.target.value)}
                          placeholder="Заметка..."
                          className="h-7 w-full rounded-md border border-input bg-background px-2 py-0.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring placeholder:text-muted-foreground/60"
                        />
                      </td>
                      <td className="p-4 align-middle font-medium text-foreground">
                        {item.name}
                      </td>
                      <td className="p-3 align-middle">
                        <span className={cn(
                          "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold transition-colors",
                          item.isCustom
                            ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                            : item.isSakhalin
                            ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                            : "border-purple-500/30 bg-purple-500/10 text-purple-400"
                        )}>
                          {item.region}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <code className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-xs text-primary font-medium select-all border border-border/50">
                          {item.email || '—'}
                        </code>
                      </td>
                      <td className="p-4 align-middle text-xs text-muted-foreground">
                        {item.role}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Floating scroll to top */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 cursor-pointer z-50"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Модальное окно shadcn Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-lg border bg-card p-6 shadow-lg text-card-foreground">
            <div className="flex flex-col space-y-1.5 text-left mb-4">
              <h2 className="text-lg font-semibold leading-none tracking-tight">Добавить компанию</h2>
              <p className="text-xs text-muted-foreground">Внесите компанию в свой трекер для отслеживания отклика</p>
            </div>

            <div className="grid gap-3 py-2">
              <div className="grid gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Название компании *</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Яндекс, Банк, Провайдер..."
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Регион</label>
                <select
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="Сахалин">Мой регион (Сахалин)</option>
                  <option value="Удалённо">Удалённо / Другой регион</option>
                </select>
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Способ отклика</label>
                <select
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value as any)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="email">📧 Напрямую на Email</option>
                  <option value="site">🌐 Через сайт компании</option>
                  <option value="hh">💼 Через HeadHunter (hh.ru)</option>
                  <option value="tg">✈️ В Telegram</option>
                </select>
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Контакты (Email или ссылка)</label>
                <input
                  type="text"
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  placeholder="hr@company.ru или ссылка на вакансию"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Заметка</label>
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Отправил через форму / жду ответ"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-xs font-medium shadow-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                Отмена
              </button>
              <button
                onClick={handleAddCompany}
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-xs font-medium shadow hover:bg-primary/90 cursor-pointer"
              >
                Сохранить компанию
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
