// ===== PAGE NAVIGATION =====
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const pageId = this.dataset.page;
        document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
        document.getElementById('page-' + pageId).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ===== WHATSAPP & TELEGRAM =====
function openWhatsApp(message) {
    const number = '212663087765';
    const url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
}

function openTelegram(message) {
    const username = 'reselleriptvcom';
    const url = 'https://t.me/' + username + '?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
}

// ===== CONSOLE WELCOME =====
console.log('🚀 Dream 24K IPTV - Premium IPTV Subscription & Reseller Panel');
console.log('📺 40,000+ Channels · 100,000+ VOD · 4K UHD');
console.log('📱 WhatsApp: +212 663-087765');
console.log('📱 Telegram: @reselleriptvcom');
