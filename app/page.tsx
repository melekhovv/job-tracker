'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Plus, 
  Download, 
  Search, 
  ArrowUp,
  MapPin,
  Globe,
  Mail,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

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

  // Загрузка состояния из localStorage
  useEffect(() => {
    const savedStates = localStorage.getItem('next_job_tracker_states');
    if (savedStates) {
      try { setStates(JSON.parse(savedStates)); } catch (e) {}
    }
    const savedCustom = localStorage.getItem('next_job_tracker_custom');
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
    localStorage.setItem('next_job_tracker_states', JSON.stringify(newStates));
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
    
    // Сохранение кастомных
    const customOnly = updated.filter(c => c.isCustom);
    localStorage.setItem('next_job_tracker_custom', JSON.stringify(customOnly));

    // Статус отправлено
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
    a.download = "трекер_компаний_nextjs.csv";
    a.click();
  };

  // Фильтрация
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

  // Статистика
  const countSent = Object.values(states).filter(s => s.sent).length;
  const countYes = Object.values(states).filter(s => s.status === 'yes').length;
  const countNo = Object.values(states).filter(s => s.status === 'no').length;
  const countNoEmail = Object.values(states).filter(s => s.status === 'noemail').length;

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Липкая верхняя шапка */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md py-4 border-b border-slate-700/80 mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">🚀</span>
              Трекер откликов: Работа и Практика
            </h1>
            <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-medium">
              Next.js + Tailwind
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Кандидат: <strong className="text-slate-200">Андрей Мелехов</strong> | Специальность: Сетевое и системное администрирование (СПЭТ)
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Plus size={16} /> Добавить компанию
        </button>
      </header>

      {/* Карточки статистики */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl">
          <span className="text-2xl sm:text-3xl font-bold text-blue-400 block">{companies.length}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Всего компаний</span>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl">
          <span className="text-2xl sm:text-3xl font-bold text-sky-400 block">{countSent}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Отправлено</span>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl">
          <span className="text-2xl sm:text-3xl font-bold text-emerald-400 block">{countYes}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Ответили (✅)</span>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl">
          <span className="text-2xl sm:text-3xl font-bold text-rose-400 block">{countNo}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Отказы (❌)</span>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl col-span-2 sm:col-span-1">
          <span className="text-2xl sm:text-3xl font-bold text-amber-400 block">{countNoEmail}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Нет почты (⚠️)</span>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Поиск по названию, почте, заметке..."
            className="w-full bg-slate-800/80 border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'sakhalin', 'remote', 'custom', 'sent', 'error'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === tab 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {tab === 'all' && 'Все'}
              {tab === 'sakhalin' && '📍 Сахалин'}
              {tab === 'remote' && '🌐 Удалёнка'}
              {tab === 'custom' && '⭐ Мои'}
              {tab === 'sent' && '☑️ Отправленные'}
              {tab === 'error' && '⚠️ Ошибки'}
            </button>
          ))}
          <button
            onClick={exportCSV}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ml-auto"
          >
            <Download size={14} /> Экспорт CSV
          </button>
        </div>
      </div>

      {/* Таблица */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto max-h-[72vh] overflow-y-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-800 sticky top-0 z-20 shadow-md">
                <th className="py-3 px-3 text-slate-400 font-semibold text-xs uppercase w-10">№</th>
                <th className="py-3 px-3 text-slate-400 font-semibold text-xs uppercase text-center w-20">Отправлено</th>
                <th className="py-3 px-3 text-slate-400 font-semibold text-xs uppercase w-44">Ответ компании</th>
                <th className="py-3 px-3 text-slate-400 font-semibold text-xs uppercase w-52">Способ / Заметка</th>
                <th className="py-3 px-4 text-slate-400 font-semibold text-xs uppercase">Компания</th>
                <th className="py-3 px-3 text-slate-400 font-semibold text-xs uppercase">Регион</th>
                <th className="py-3 px-4 text-slate-400 font-semibold text-xs uppercase">Контакты</th>
                <th className="py-3 px-4 text-slate-400 font-semibold text-xs uppercase">Сфера и позиция</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filtered.map(item => {
                const s = states[item.id] || { sent: false, status: 'none', channel: 'email', note: '' };

                // Окраска строк
                let rowBg = 'hover:bg-slate-800/30';
                if (s.status === 'yes') rowBg = 'bg-emerald-950/40 border-l-4 border-l-emerald-500';
                else if (s.status === 'no') rowBg = 'bg-rose-950/40 border-l-4 border-l-rose-500';
                else if (s.status === 'noemail') rowBg = 'bg-amber-950/40 border-l-4 border-l-amber-500';
                else if (s.sent) rowBg = 'bg-blue-950/20';

                return (
                  <tr key={item.id} className={`transition-colors ${rowBg}`}>
                    <td className="py-3 px-3 text-slate-500 font-mono text-xs">{item.id}</td>
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={s.sent}
                        onChange={(e) => toggleSent(item.id, e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={s.status}
                        onChange={(e) => updateStatus(item.id, e.target.value as any)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer w-full ${
                          s.status === 'yes'
                            ? 'bg-emerald-900/60 text-emerald-300 border-emerald-500'
                            : s.status === 'no'
                            ? 'bg-rose-900/60 text-rose-300 border-rose-500'
                            : s.status === 'noemail'
                            ? 'bg-amber-900/60 text-amber-300 border-amber-500'
                            : 'bg-slate-900 text-slate-300 border-slate-700'
                        }`}
                      >
                        <option value="none">⏳ Ждем ответ</option>
                        <option value="yes">✅ Да (Ответили)</option>
                        <option value="no">❌ Нет (Отказ)</option>
                        <option value="noemail">⚠️ Нет такой почты</option>
                      </select>
                    </td>
                    <td className="py-3 px-3 space-y-1.5">
                      <select
                        value={s.channel}
                        onChange={(e) => updateChannel(item.id, e.target.value as any)}
                        className="text-xs bg-slate-900 text-slate-400 border border-slate-700 rounded px-2 py-1 w-full focus:outline-none"
                      >
                        <option value="email">📧 Через Email</option>
                        <option value="site">🌐 Через Сайт</option>
                        <option value="hh">💼 Через hh.ru</option>
                        <option value="tg">✈️ В Telegram</option>
                      </select>
                      <input
                        type="text"
                        value={s.note}
                        onChange={(e) => updateNote(item.id, e.target.value)}
                        placeholder="Заметка..."
                        className="text-xs bg-slate-900 text-slate-200 border border-slate-700 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium text-white">
                      {item.name}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                        item.isCustom
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : item.isSakhalin
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                      }`}>
                        {item.region}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <code className="text-xs bg-slate-900 text-sky-400 px-2 py-1 rounded border border-slate-800 font-mono select-all">
                        {item.email || '—'}
                      </code>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-400">
                      {item.role}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Кнопка наверх */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl transition-all cursor-pointer z-50"
          title="Наверх"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Модальное окно добавления */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Plus size={18} className="text-indigo-400" /> Добавить компанию
            </h2>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Название компании *</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Например: Яндекс, Местный банк..."
                  className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Регион</label>
                <select
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none"
                >
                  <option value="Сахалин">Мой регион (Сахалин)</option>
                  <option value="Удалённо">Удалённо / Другой регион</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Способ отклика</label>
                <select
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none"
                >
                  <option value="email">📧 Напрямую на Email</option>
                  <option value="site">🌐 Через сайт / анкету</option>
                  <option value="hh">💼 Через HeadHunter (hh.ru)</option>
                  <option value="tg">✈️ В Telegram</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Контакты (Email или ссылка)</label>
                <input
                  type="text"
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  placeholder="hr@company.ru или ссылка на вакансию"
                  className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Заметка</label>
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Отправил через форму / жду ответ"
                  className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2.5 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Отмена
              </button>
              <button
                onClick={handleAddCompany}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg cursor-pointer shadow-lg shadow-indigo-600/30"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
