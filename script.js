// ===== SECURITY: Disable Right Click =====
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// ===== SECURITY: Disable Keyboard Shortcuts =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.key === 'U') {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return false;
    }
});

// ===== OPEN WHATSAPP =====
function openWhatsApp(message) {
    const phone = '212663087765';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    return false;
}

// ===== OPEN TELEGRAM =====
function openTelegram(message) {
    const username = 'reselleriptvcom';
    const url = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    return false;
}

// ===== PAGE NAVIGATION =====
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const pageId = this.dataset.page;
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
        const targetPage = document.getElementById('page-' + pageId);
        if (targetPage) targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ===== CANVAS HERO PARTICLES =====
(function initCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        w = rect.width;
        h = rect.height;
        canvas.width = w;
        canvas.height = h;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const count = Math.min(80, Math.floor(w * h / 15000));
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2 + 0.5,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
            c: `hsla(${40 + Math.random() * 20}, 80%, 70%, ${0.2 + Math.random() * 0.3})`
        });
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > w) p.dx *= -1;
            if (p.y < 0 || p.y > h) p.dy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.c;
            ctx.fill();
        });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(247,201,72,${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.4;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// ===== LANGUAGE SWITCHER =====
const translations = {
    en: {
        heroTagline: 'DREAM <span>24K</span> · DREAM <span>4K</span>',
        heroSub: 'Premium IPTV · 40,000+ Channels · 100,000+ VOD',
        heroDesc: 'Experience the future of television with Dream24K IPTV — the evolution of Dream4K. Ultra-fast servers, zero buffering, 4K UHD quality, and a global network trusted by resellers and end-users in 120+ countries. Whether you\'re a viewer or a reseller, Dream24K delivers the ultimate IPTV experience.',
        trialTitle: 'Request Your <span>Free Trial</span>',
        subscribe: 'Subscribe',
        getStarted: 'Get Started',
        freeTrial: 'Free Trial',
        packages: 'IPTV <span>Subscription</span> Packages',
        reseller: 'IPTV <span>Reseller</span> Packages',
        features: 'POWERFUL <span>FEATURES</span>',
        advantages: 'More <span>Advantages</span>',
        faq: 'Frequently Asked <span>Questions</span>',
        support: '24/7 <span>Support</span>',
        supportDesc: 'Our dedicated support team is available around the clock to help you with any questions or issues.',
        ctaTitle: 'TAKE YOUR IPTV BUSINESS TO <span>THE NEXT LEVEL</span>',
        ctaDesc: 'DREAM24K · 24K PREMIUM QUALITY — STABLE · SECURE · POWERFUL',
        footer: 'Dream 24K IPTV · since 2017 · 40K+ live & 100K+ VOD',
        convertTitle: 'Convert <span>M3U</span> to Xtream Code',
        convertSub: 'Enter your M3U playlist URL to convert it to Xtream Code format instantly.',
        appTitle: 'App Player & Code Downloader',
        appSub: 'Copy codes to download',
        trialSub: 'Choose your preferred connection type and we\'ll send you credentials instantly via WhatsApp or Telegram.',
        contactTitle: 'Get in Touch',
        contactText: 'Our team is available 24/7 via WhatsApp, Telegram, or email. Fill out the form or reach out directly.',
        legacyTitle: 'Legacy <span>Pages</span>',
        legacySub: 'Access our previous versions and archived content.'
    },
    fr: {
        heroTagline: 'DREAM <span>24K</span> · DREAM <span>4K</span>',
        heroSub: 'IPTV Premium · 40 000+ chaînes · 100 000+ VOD',
        heroDesc: 'Découvrez l\'avenir de la télévision avec Dream24K IPTV — l\'évolution de Dream4K. Serveurs ultra-rapides, zéro buffer, qualité 4K UHD, et un réseau mondial approuvé par les revendeurs et les utilisateurs finaux dans plus de 120 pays.',
        trialTitle: 'Demandez Votre <span>Essai Gratuit</span>',
        subscribe: 'S\'abonner',
        getStarted: 'Commencer',
        freeTrial: 'Essai Gratuit',
        packages: 'Forfaits <span>IPTV</span>',
        reseller: 'Forfaits <span>Revendeur</span> IPTV',
        features: 'FONCTIONNALITÉS <span>PUISSANTES</span>',
        advantages: 'Plus d\'<span>Avantages</span>',
        faq: 'Questions <span>Fréquentes</span>',
        support: 'Support <span>24/7</span>',
        supportDesc: 'Notre équipe de support dédiée est disponible 24h/24 et 7j/7 pour vous aider avec toutes vos questions ou problèmes.',
        ctaTitle: 'FAITES PASSER VOTRE ACTIVITÉ IPTV AU <span>NIVEAU SUPÉRIEUR</span>',
        ctaDesc: 'DREAM24K · QUALITÉ PREMIUM 24K — STABLE · SÉCURISÉ · PUISSANT',
        footer: 'Dream 24K IPTV · depuis 2017 · 40K+ live & 100K+ VOD',
        convertTitle: 'Convertir <span>M3U</span> en Code Xtream',
        convertSub: 'Entrez l\'URL de votre playlist M3U pour la convertir instantanément en format Xtream Code.',
        appTitle: 'Lecteur d\'application et téléchargeur de code',
        appSub: 'Copiez les codes pour télécharger',
        trialSub: 'Choisissez votre type de connexion préféré et nous vous enverrons les identifiants instantanément via WhatsApp ou Telegram.',
        contactTitle: 'Entrez en Contact',
        contactText: 'Notre équipe est disponible 24/7 via WhatsApp, Telegram ou email. Remplissez le formulaire ou contactez-nous directement.',
        legacyTitle: 'Pages <span>Héritées</span>',
        legacySub: 'Accédez à nos versions précédentes et au contenu archivé.'
    },
    es: {
        heroTagline: 'DREAM <span>24K</span> · DREAM <span>4K</span>',
        heroSub: 'IPTV Premium · 40,000+ canales · 100,000+ VOD',
        heroDesc: 'Experimenta el futuro de la televisión con Dream24K IPTV — la evolución de Dream4K. Servidores ultrarrápidos, cero buffering, calidad 4K UHD, y una red global confiable por revendedores y usuarios finales en más de 120 países.',
        trialTitle: 'Solicita Tu <span>Prueba Gratuita</span>',
        subscribe: 'Suscribirse',
        getStarted: 'Comenzar',
        freeTrial: 'Prueba Gratuita',
        packages: 'Paquetes de <span>Suscripción</span> IPTV',
        reseller: 'Paquetes <span>Revendedor</span> IPTV',
        features: 'CARACTERÍSTICAS <span>POTENTES</span>',
        advantages: 'Más <span>Ventajas</span>',
        faq: 'Preguntas <span>Frecuentes</span>',
        support: 'Soporte <span>24/7</span>',
        supportDesc: 'Nuestro equipo de soporte dedicado está disponible las 24 horas del día, los 7 días de la semana, para ayudarte con cualquier pregunta o problema.',
        ctaTitle: 'LLEVA TU NEGOCIO IPTV AL <span>PRÓXIMO NIVEL</span>',
        ctaDesc: 'DREAM24K · CALIDAD PREMIUM 24K — ESTABLE · SEGURO · POTENTE',
        footer: 'Dream 24K IPTV · desde 2017 · 40K+ live & 100K+ VOD',
        convertTitle: 'Convertir <span>M3U</span> a Código Xtream',
        convertSub: 'Ingresa la URL de tu lista de reproducción M3U para convertirla instantáneamente al formato Xtream Code.',
        appTitle: 'Reproductor de aplicaciones y descargador de códigos',
        appSub: 'Copia los códigos para descargar',
        trialSub: 'Elige tu tipo de conexión preferido y te enviaremos las credenciales al instante vía WhatsApp o Telegram.',
        contactTitle: 'Ponte en Contacto',
        contactText: 'Nuestro equipo está disponible 24/7 vía WhatsApp, Telegram o correo electrónico. Completa el formulario o contáctanos directamente.',
        legacyTitle: 'Páginas <span>Legado</span>',
        legacySub: 'Accede a nuestras versiones anteriores y contenido archivado.'
    },
    de: {
        heroTagline: 'DREAM <span>24K</span> · DREAM <span>4K</span>',
        heroSub: 'Premium IPTV · 40.000+ Kanäle · 100.000+ VOD',
        heroDesc: 'Erleben Sie die Zukunft des Fernsehens mit Dream24K IPTV – der Weiterentwicklung von Dream4K. Ultraschnelle Server, null Pufferung, 4K UHD-Qualität und ein globales Netzwerk, das von Resellern und Endnutzern in über 120 Ländern vertrauen.',
        trialTitle: 'Fordern Sie Ihre <span>kostenlose Testversion</span> an',
        subscribe: 'Abonnieren',
        getStarted: 'Loslegen',
        freeTrial: 'Kostenlose Testversion',
        packages: 'IPTV-<span>Abonnementpakete</span>',
        reseller: 'IPTV-<span>Reseller-Pakete</span>',
        features: 'LEISTUNGSSTARKE <span>FUNKTIONEN</span>',
        advantages: 'Mehr <span>Vorteile</span>',
        faq: 'Häufig gestellte <span>Fragen</span>',
        support: '24/7 <span>Support</span>',
        supportDesc: 'Unser engagiertes Support-Team ist rund um die Uhr für Sie da, um Ihnen bei Fragen oder Problemen zu helfen.',
        ctaTitle: 'BRINGEN SIE IHR IPTV-GESCHÄFT AUF <span>DIE NÄCHSTE STUFE</span>',
        ctaDesc: 'DREAM24K · 24K PREMIUM-QUALITÄT — STABIL · SICHER · LEISTUNGSSTARK',
        footer: 'Dream 24K IPTV · seit 2017 · 40K+ live & 100K+ VOD',
        convertTitle: 'Konvertieren Sie <span>M3U</span> in Xtream-Code',
        convertSub: 'Geben Sie die URL Ihrer M3U-Playlist ein, um sie sofort in das Xtream-Code-Format zu konvertieren.',
        appTitle: 'App-Player und Code-Downloader',
        appSub: 'Kopieren Sie Codes zum Herunterladen',
        trialSub: 'Wählen Sie Ihren bevorzugten Verbindungstyp und wir senden Ihnen die Zugangsdaten sofort über WhatsApp oder Telegram.',
        contactTitle: 'Kontaktieren Sie uns',
        contactText: 'Unser Team ist rund um die Uhr über WhatsApp, Telegram oder E-Mail erreichbar. Füllen Sie das Formular aus oder kontaktieren Sie uns direkt.',
        legacyTitle: 'Legacy-<span>Seiten</span>',
        legacySub: 'Zugriff auf unsere früheren Versionen und archivierte Inhalte.'
    },
    it: {
        heroTagline: 'DREAM <span>24K</span> · DREAM <span>4K</span>',
        heroSub: 'IPTV Premium · 40.000+ canali · 100.000+ VOD',
        heroDesc: 'Sperimenta il futuro della televisione con Dream24K IPTV — l\'evoluzione di Dream4K. Server ultraveloci, zero buffering, qualità 4K UHD e una rete globale affidabile da rivenditori e utenti finali in oltre 120 paesi.',
        trialTitle: 'Richiedi la tua <span>Prova Gratuita</span>',
        subscribe: 'Abbonati',
        getStarted: 'Inizia',
        freeTrial: 'Prova Gratuita',
        packages: 'Pacchetti <span>Abbonamento</span> IPTV',
        reseller: 'Pacchetti <span>Rivenditore</span> IPTV',
        features: 'FUNZIONALITÀ <span>POTENTI</span>',
        advantages: 'Più <span>Vantaggi</span>',
        faq: 'Domande <span>Frequenti</span>',
        support: 'Supporto <span>24/7</span>',
        supportDesc: 'Il nostro team di supporto dedicato è disponibile 24 ore su 24, 7 giorni su 7, per aiutarti con qualsiasi domanda o problema.',
        ctaTitle: 'PORTA LA TUA ATTIVITÀ IPTV AL <span>LIVELLO SUCCESSIVO</span>',
        ctaDesc: 'DREAM24K · QUALITÀ PREMIUM 24K — STABILE · SICURO · POTENTE',
        footer: 'Dream 24K IPTV · dal 2017 · 40K+ live & 100K+ VOD',
        convertTitle: 'Converti <span>M3U</span> in Codice Xtream',
        convertSub: 'Inserisci l\'URL della tua playlist M3U per convertirla istantaneamente nel formato Xtream Code.',
        appTitle: 'Lettore app e downloader di codici',
        appSub: 'Copia i codici per scaricare',
        trialSub: 'Scegli il tuo tipo di connessione preferito e ti invieremo le credenziali istantaneamente via WhatsApp o Telegram.',
        contactTitle: 'Mettiti in Contatto',
        contactText: 'Il nostro team è disponibile 24/7 via WhatsApp, Telegram o email. Compila il modulo o contattaci direttamente.',
        legacyTitle: 'Pagine <span>Legacy</span>',
        legacySub: 'Accedi alle nostre versioni precedenti e ai contenuti archiviati.'
    },
    pt: {
        heroTagline: 'DREAM <span>24K</span> · DREAM <span>4K</span>',
        heroSub: 'IPTV Premium · 40.000+ canais · 100.000+ VOD',
        heroDesc: 'Experimente o futuro da televisão com Dream24K IPTV — a evolução do Dream4K. Servidores ultrarrápidos, zero buffering, qualidade 4K UHD e uma rede global confiável por revendedores e usuários finais em mais de 120 países.',
        trialTitle: 'Solicite seu <span>Teste Gratuito</span>',
        subscribe: 'Inscrever-se',
        getStarted: 'Começar',
        freeTrial: 'Teste Gratuito',
        packages: 'Pacotes de <span>Assinatura</span> IPTV',
        reseller: 'Pacotes <span>Revendedor</span> IPTV',
        features: 'RECURSOS <span>PODEROSOS</span>',
        advantages: 'Mais <span>Vantagens</span>',
        faq: 'Perguntas <span>Frequentes</span>',
        support: 'Suporte <span>24/7</span>',
        supportDesc: 'Nossa equipe de suporte dedicada está disponível 24 horas por dia, 7 dias por semana, para ajudá-lo com qualquer dúvida ou problema.',
        ctaTitle: 'LEVE SEU NEGÓCIO IPTV PARA O <span>PRÓXIMO NÍVEL</span>',
        ctaDesc: 'DREAM24K · QUALIDADE PREMIUM 24K — ESTÁVEL · SEGURO · POTENTE',
        footer: 'Dream 24K IPTV · desde 2017 · 40K+ live & 100K+ VOD',
        convertTitle: 'Converter <span>M3U</span> para Código Xtream',
        convertSub: 'Insira o URL da sua playlist M3U para convertê-la instantaneamente no formato Xtream Code.',
        appTitle: 'Player de aplicativos e downloader de códigos',
        appSub: 'Copie os códigos para baixar',
        trialSub: 'Escolha seu tipo de conexão preferido e enviaremos as credenciais instantaneamente via WhatsApp ou Telegram.',
        contactTitle: 'Entre em Contato',
        contactText: 'Nossa equipe está disponível 24/7 via WhatsApp, Telegram ou e-mail. Preencha o formulário ou entre em contato diretamente.',
        legacyTitle: 'Páginas <span>Legado</span>',
        legacySub: 'Acesse nossas versões anteriores e conteúdo arquivado.'
    },
    ar: {
        heroTagline: 'DREAM <span>24K</span> · DREAM <span>4K</span>',
        heroSub: 'IPTV متميز · 40,000+ قناة · 100,000+ VOD',
        heroDesc: 'اختبر مستقبل التلفزيون مع Dream24K IPTV — تطور Dream4K. خوادم فائقة السرعة، بدون تخزين مؤقت، جودة 4K UHD، وشبكة عالمية موثوق بها من قبل الموزعين والمستخدمين النهائيين في أكثر من 120 دولة.',
        trialTitle: 'اطلب <span>نسختك التجريبية المجانية</span>',
        subscribe: 'اشترك',
        getStarted: 'ابدأ',
        freeTrial: 'نسخة تجريبية مجانية',
        packages: 'باقات <span>اشتراك</span> IPTV',
        reseller: 'باقات <span>موزع</span> IPTV',
        features: 'ميزات <span>قوية</span>',
        advantages: 'مزيد من <span>المزايا</span>',
        faq: 'الأسئلة <span>الشائعة</span>',
        support: 'دعم <span>24/7</span>',
        supportDesc: 'فريق الدعم المخصص لدينا متاح على مدار الساعة طوال أيام الأسبوع لمساعدتك في أي أسئلة أو مشاكل.',
        ctaTitle: 'ارفع عملك IPTV إلى <span>المستوى التالي</span>',
        ctaDesc: 'DREAM24K · جودة متميزة 24K — مستقرة · آمنة · قوية',
        footer: 'Dream 24K IPTV · منذ 2017 · 40K+ قناة حية & 100K+ VOD',
        convertTitle: 'تحويل <span>M3U</span> إلى رمز Xtream',
        convertSub: 'أدخل عنوان URL لقائمة التشغيل M3U الخاصة بك لتحويلها فورًا إلى تنسيق Xtream Code.',
        appTitle: 'مشغل التطبيقات ومحمل الكود',
        appSub: 'انسخ الرموز للتنزيل',
        trialSub: 'اختر نوع الاتصال المفضل لديك وسنرسل لك بيانات الاعتماد فورًا عبر WhatsApp أو Telegram.',
        contactTitle: 'تواصل معنا',
        contactText: 'فريقنا متاح 24/7 عبر WhatsApp أو Telegram أو البريد الإلكتروني. املأ النموذج أو تواصل معنا مباشرة.',
        legacyTitle: 'الصفحات <span>السابقة</span>',
        legacySub: 'الوصول إلى إصداراتنا السابقة والمحتوى المؤرشف.'
    },
    ru: {
        heroTagline: 'DREAM <span>24K</span> · DREAM <span>4K</span>',
        heroSub: 'Премиум IPTV · 40,000+ каналов · 100,000+ VOD',
        heroDesc: 'Испытайте будущее телевидения с Dream24K IPTV — эволюцией Dream4K. Сверхбыстрые серверы, нулевая буферизация, качество 4K UHD и глобальная сеть, которой доверяют реселлеры и конечные пользователи в более чем 120 странах.',
        trialTitle: 'Запросите <span>бесплатную пробную версию</span>',
        subscribe: 'Подписаться',
        getStarted: 'Начать',
        freeTrial: 'Бесплатная пробная версия',
        packages: 'Пакеты <span>подписки</span> IPTV',
        reseller: 'Пакеты <span>реселлера</span> IPTV',
        features: 'МОЩНЫЕ <span>ФУНКЦИИ</span>',
        advantages: 'Больше <span>преимуществ</span>',
        faq: 'Часто задаваемые <span>вопросы</span>',
        support: 'Поддержка <span>24/7</span>',
        supportDesc: 'Наша команда поддержки доступна круглосуточно, чтобы помочь вам с любыми вопросами или проблемами.',
        ctaTitle: 'ПОДНИМИТЕ СВОЙ IPTV-БИЗНЕС НА <span>СЛЕДУЮЩИЙ УРОВЕНЬ</span>',
        ctaDesc: 'DREAM24K · ПРЕМИУМ-КАЧЕСТВО 24K — СТАБИЛЬНЫЙ · БЕЗОПАСНЫЙ · МОЩНЫЙ',
        footer: 'Dream 24K IPTV · с 2017 · 40K+ live & 100K+ VOD',
        convertTitle: 'Конвертировать <span>M3U</span> в код Xtream',
        convertSub: 'Введите URL-адрес вашего плейлиста M3U, чтобы мгновенно преобразовать его в формат Xtream Code.',
        appTitle: 'Проигрыватель приложений и загрузчик кодов',
        appSub: 'Скопируйте коды для скачивания',
        trialSub: 'Выберите предпочитаемый тип подключения, и мы мгновенно отправим вам учетные данные через WhatsApp или Telegram.',
        contactTitle: 'Свяжитесь с нами',
        contactText: 'Наша команда доступна 24/7 через WhatsApp, Telegram или электронную почту. Заполните форму или свяжитесь с нами напрямую.',
        legacyTitle: 'Устаревшие <span>страницы</span>',
        legacySub: 'Доступ к нашим предыдущим версиям и архивированному контенту.'
    },
    zh: {
        heroTagline: 'DREAM <span>24K</span> · DREAM <span>4K</span>',
        heroSub: '高级IPTV · 40,000+ 频道 · 100,000+ VOD',
        heroDesc: '通过Dream24K IPTV体验电视的未来——Dream4K的进化。超快速服务器、零缓冲、4K UHD画质，以及一个受到120多个国家经销商和终端用户信赖的全球网络。',
        trialTitle: '申请<span>免费试用</span>',
        subscribe: '订阅',
        getStarted: '开始',
        freeTrial: '免费试用',
        packages: 'IPTV<span>订阅套餐</span>',
        reseller: 'IPTV<span>经销商套餐</span>',
        features: '强大<span>功能</span>',
        advantages: '更多<span>优势</span>',
        faq: '常见<span>问题</span>',
        support: '24/7<span>支持</span>',
        supportDesc: '我们的专业支持团队全天候为您服务，帮助您解决任何问题。',
        ctaTitle: '将您的IPTV业务提升到<span>新水平</span>',
        ctaDesc: 'DREAM24K · 24K优质品质 — 稳定 · 安全 · 强大',
        footer: 'Dream 24K IPTV · 始于2017 · 40K+ 直播 & 100K+ VOD',
        convertTitle: '将<span>M3U</span>转换为Xtream代码',
        convertSub: '输入您的M3U播放列表URL，即时将其转换为Xtream Code格式。',
        appTitle: '应用播放器和代码下载器',
        appSub: '复制代码进行下载',
        trialSub: '选择您喜欢的连接类型，我们将通过WhatsApp或Telegram即时发送您的凭据。',
        contactTitle: '联系我们',
        contactText: '我们的团队全天候通过WhatsApp、Telegram或电子邮件提供服务。填写表格或直接联系我们。',
        legacyTitle: '旧版<span>页面</span>',
        legacySub: '访问我们的先前版本和存档内容。'
    },
    ja: {
        heroTagline: 'DREAM <span>24K</span> · DREAM <span>4K</span>',
        heroSub: 'プレミアムIPTV · 40,000+チャンネル · 100,000+ VOD',
        heroDesc: 'Dream24K IPTVでテレビの未来を体験 — Dream4Kの進化版。超高速サーバー、ゼロバッファリング、4K UHD品質、そして120カ国以上のリセラーとエンドユーザーから信頼されるグローバルネットワーク。',
        trialTitle: '<span>無料トライアル</span>をリクエスト',
        subscribe: '購読',
        getStarted: '始める',
        freeTrial: '無料トライアル',
        packages: 'IPTV<span>サブスクリプションパッケージ</span>',
        reseller: 'IPTV<span>リセラーパッケージ</span>',
        features: '強力な<span>機能</span>',
        advantages: 'さらに多くの<span>利点</span>',
        faq: 'よくある<span>質問</span>',
        support: '24/7<span>サポート</span>',
        supportDesc: '専任のサポートチームが24時間年中無休で、ご質問や問題に対応いたします。',
        ctaTitle: 'IPTVビジネスを<span>次のレベル</span>へ',
        ctaDesc: 'DREAM24K · 24Kプレミアム品質 — 安定 · 安全 · 強力',
        footer: 'Dream 24K IPTV · 2017年から · 40K+ ライブ & 100K+ VOD',
        convertTitle: '<span>M3U</span>をXtreamコードに変換',
        convertSub: 'M3UプレイリストのURLを入力して、即座にXtream Code形式に変換します。',
        appTitle: 'アプリプレーヤーとコードダウンローダー',
        appSub: 'ダウンロード用のコードをコピー',
        trialSub: '希望の接続タイプを選択すると、WhatsAppまたはTelegramですぐに認証情報が送信されます。',
        contactTitle: 'お問い合わせ',
        contactText: '当社のチームはWhatsApp、Telegram、またはメールで24時間年中無休で対応しています。フォームに記入するか、直接お問い合わせください。',
        legacyTitle: 'レガシー<span>ページ</span>',
        legacySub: '以前のバージョンやアーカイブされたコンテンツにアクセスします。'
    }
};

document.getElementById('languageSelect').addEventListener('change', function() {
    const lang = this.value;
    const t = translations[lang] || translations.en;

    document.querySelector('.hero-tagline').innerHTML = t.heroTagline;
    document.querySelector('.hero-sub').textContent = t.heroSub;
    document.querySelector('.hero-desc').textContent = t.heroDesc;
    document.querySelector('#trial').innerHTML = t.trialTitle;
    document.querySelector('.btn-gold').innerHTML = `<i class="fas fa-rocket"></i> ${t.subscribe}`;
    document.querySelector('.map-overlay-content .btn-primary').innerHTML = `<i class="fas fa-rocket"></i> ${t.getStarted}`;
    document.querySelector('.map-overlay-content .btn-secondary').innerHTML = `<i class="fas fa-gift"></i> ${t.freeTrial}`;
    document.querySelector('#page-subscriptions .section-title').innerHTML = t.packages;
    document.querySelector('#page-reseller .section-title').innerHTML = t.reseller;
    document.querySelector('#page-features .features-title').innerHTML = t.features;
    document.querySelector('#page-features .section-title').innerHTML = t.advantages;
    document.querySelector('#page-faq .section-title').innerHTML = t.faq;
    document.querySelector('#page-support .section-title').innerHTML = t.support;
    document.querySelector('#page-support .section-sub').textContent = t.supportDesc;
    document.querySelector('.cta-banner .cta-title').innerHTML = t.ctaTitle;
    document.querySelector('.cta-banner .cta-desc').textContent = t.ctaDesc;
    document.querySelector('.footer').innerHTML = `<i class="fas fa-shield-alt" style="color:#f7c948;"></i> ${t.footer}<div class="keywords"><span>#Dream24KIPTV</span><span>#Dream4KIPTV</span><span>#Dream24KSubscription</span><span>#Dream4KReseller</span></div>`;
    
    const converterTitle = document.querySelector('.converter-box + .section-title');
    const converterSub = document.querySelector('.converter-box + .section-title + .section-sub');
    if (converterTitle) converterTitle.innerHTML = t.convertTitle;
    if (converterSub) converterSub.textContent = t.convertSub;
    
    document.querySelector('.app-section .app-header h3').innerHTML = '<i class="fas fa-download"></i> ' + t.appTitle;
    document.querySelector('.app-section .app-header span').innerHTML = '<i class="fas fa-code"></i> ' + t.appSub;
    
    const trialSub = document.querySelector('.section-sub');
    if (trialSub && document.querySelector('#trial')) trialSub.textContent = t.trialSub;
    document.querySelector('.trial-info h3').innerHTML = '<i class="fas fa-headset"></i> ' + t.contactTitle;
    document.querySelector('.trial-info p').textContent = t.contactText;
    
    const legacyTitle = document.querySelector('.legacy-grid + .section-title');
    const legacySub = document.querySelector('.legacy-grid + .section-title + .section-sub');
    if (legacyTitle) legacyTitle.innerHTML = t.legacyTitle;
    if (legacySub) legacySub.textContent = t.legacySub;
});

// ===== SHOW/HIDE MAC ADDRESS FIELD =====
document.getElementById('connectionType').addEventListener('change', function() {
    const macField = document.getElementById('macField');
    const macInput = document.getElementById('macAddress');
    if (this.value === 'mag') {
        macField.classList.add('visible');
        macInput.setAttribute('required', 'required');
    } else {
        macField.classList.remove('visible');
        macInput.removeAttribute('required');
        macInput.value = '';
    }
});

// ===== FREE TRIAL FORM =====
document.getElementById('trialForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const type = document.getElementById('connectionType');
    const typeValue = type.value;
    const typeLabel = type.options[type.selectedIndex].text;
    const mac = document.getElementById('macAddress').value.trim();

    if (!typeValue) {
        alert('⚠️ Please select a connection type.');
        return;
    }
    if (typeValue === 'mag' && !mac) {
        alert('⚠️ Please provide a MAC address for MAG Line connection.');
        return;
    }

    let trialMessage = `I want to start a free trial with Dream24K IPTV - ${typeLabel}`;
    if (mac) trialMessage += ` (MAC: ${mac})`;
    openWhatsApp(trialMessage);
    alert('✅ Free trial request sent to WhatsApp!\n\nConnection: ' + typeLabel + (mac ? '\nMAC: ' + mac : '') +
        '\n\nYou will receive your credentials shortly.');
    this.reset();
    document.getElementById('macField').classList.remove('visible');
});

// ===== CONVERTER =====
function convertM3U() {
    const input = document.getElementById('m3uInput').value.trim();
    const resultDiv = document.getElementById('converterResult');
    resultDiv.innerHTML = '';

    if (!input) {
        resultDiv.innerHTML = '<span class="error"><i class="fas fa-exclamation-triangle"></i> Please paste a valid M3U URL or content.</span>';
        return;
    }

    resultDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Converting...';
    setTimeout(function() {
        try {
            let server = 'http://dream24k.tv:8080';
            let username = 'user_' + Math.random().toString(36).substring(2, 10);
            let password = 'pass_' + Math.random().toString(36).substring(2, 12);
            if (input.match(/^https?:\/\/[^\s]+/)) {
                try { server = new URL(input).origin + ':8080'; } catch (e) {}
            }
            resultDiv.innerHTML = `
                    <i class="fas fa-check-circle" style="color:#4cd964;"></i> 
                    <strong>Xtream Codes:</strong><br>
                    <strong>Server:</strong> ${server}<br>
                    <strong>Username:</strong> ${username}<br>
                    <strong>Password:</strong> ${password}
                    <button class="copy-btn" onclick="copyResult()"><i class="fas fa-copy"></i> Copy</button>
                    <br><small style="color:#4a5a7a; display:block; margin-top:6px;">(Demo conversion)</small>
                `;
        } catch (error) {
            resultDiv.innerHTML = `<span class="error"><i class="fas fa-exclamation-triangle"></i> Error: ${error.message}</span>`;
        }
    }, 800);
}

// ===== COPY FUNCTION =====
function copyResult() {
    const resultDiv = document.getElementById('converterResult');
    const text = resultDiv.textContent.replace('Copy', '').trim();
    navigator.clipboard.writeText(text).then(() => {
        const btn = resultDiv.querySelector('.copy-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
    }).catch(() => {
        const range = document.createRange();
        range.selectNode(resultDiv);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        const btn = resultDiv.querySelector('.copy-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
    });
}

// ===== COPY APP CODE =====
function copyAppCode(elementId) {
    const codeSpan = document.getElementById(elementId);
    const code = codeSpan.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const btn = codeSpan.parentElement.querySelector('.btn-copy-code');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
    }).catch(() => {
        alert('Code: ' + code);
    });
}

document.getElementById('m3uInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') convertM3U();
});
