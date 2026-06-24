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

// ===== COPY CODE =====
function copyAppCode(elementId) {
    const code = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById(elementId).parentElement.querySelector('.btn-copy-code');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.background = '#25D366';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    });
}

// ===== CONVERT M3U =====
function convertM3U() {
    const input = document.getElementById('m3uInput');
    const result = document.getElementById('converterResult');
    if (!input.value) {
        result.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid M3U URL.';
        result.style.color = '#ff6b6b';
        return;
    }
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Converting...';
    result.style.color = '#ffd700';
    setTimeout(() => {
        const mockXtream = 'http://your-dns.com:80/get.php?username=demo&password=demo&type=m3u_plus&output=ts';
        result.innerHTML = '<i class="fas fa-check-circle"></i> Converted! <br><strong style="color:#ffd700;">' + mockXtream + '</strong><br><small style="color:#666;">This is a demo. Contact us for real conversion.</small>';
        result.style.color = '#aaa';
    }, 2000);
}

// ===== LANGUAGE SELECTOR =====
document.getElementById('languageSelect')?.addEventListener('change', function() {
    const lang = this.value;
    const translations = {
        en: { brand: 'DREAM <span>24K</span>', sub: 'Premium IPTV Panel' },
        fr: { brand: 'DREAM <span>24K</span>', sub: 'Panel IPTV Premium' },
        es: { brand: 'DREAM <span>24K</span>', sub: 'Panel IPTV Premium' },
        de: { brand: 'DREAM <span>24K</span>', sub: 'Premium IPTV Panel' },
        it: { brand: 'DREAM <span>24K</span>', sub: 'Panel IPTV Premium' },
        pt: { brand: 'DREAM <span>24K</span>', sub: 'Painel IPTV Premium' },
        ar: { brand: 'DREAM <span>24K</span>', sub: 'لوحة IPTV الممتازة' },
        ru: { brand: 'DREAM <span>24K</span>', sub: 'Премиум IPTV Панель' },
        zh: { brand: 'DREAM <span>24K</span>', sub: '高级IPTV面板' },
        ja: { brand: 'DREAM <span>24K</span>', sub: 'プレミアムIPTVパネル' }
    };
    const t = translations[lang] || translations.en;
    document.querySelector('.logo-text .brand').innerHTML = t.brand;
    document.querySelector('.logo-text .sub').innerHTML = '<i class="fas fa-crown"></i> ' + t.sub;
});

// ===== HERO CANVAS =====
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = width;
        canvas.height = height;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const count = 120;
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 2 + 1,
            a: Math.random() * 0.5 + 0.1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';

        const centerX = width / 2;
        const centerY = height / 2;

        // Glow rings
        for (let i = 0; i < 3; i++) {
            const radius = 80 + i * 50 + Math.sin(Date.now() / 2000 + i) * 20;
            const grad = ctx.createRadialGradient(centerX, centerY, radius - 20, centerX, centerY, radius + 20);
            grad.addColorStop(0, 'rgba(255, 215, 0, 0)');
            grad.addColorStop(0.5, 'rgba(255, 215, 0, ' + (0.03 - i * 0.005) + ')');
            grad.addColorStop(1, 'rgba(255, 215, 0, 0)');
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
        }

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 215, 0, ' + p.a + ')';
            ctx.fill();
        });

        // Connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(255, 215, 0, ' + (0.03 - dist / 5000) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }
    draw();
});

// ===== TRIAL FORM =====
document.getElementById('trialForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const type = document.getElementById('connectionType').value;
    const mac = document.getElementById('macAddress').value;
    let msg = 'I want to start a free trial with Dream24K IPTV. Connection type: ' + type;
    if (mac) msg += '. MAC Address: ' + mac;
    const choice = confirm('Send trial request via WhatsApp or Telegram?');
    if (choice) {
        openWhatsApp(msg);
    } else {
        openTelegram(msg);
    }
});

// ===== CONNECTION TYPE CHANGE =====
document.getElementById('connectionType')?.addEventListener('change', function() {
    const macField = document.getElementById('macField');
    if (this.value === 'mag') {
        macField.style.display = 'block';
    } else {
        macField.style.display = 'none';
    }
});
document.getElementById('macField').style.display = 'none';

// ===== CONSOLE WELCOME =====
console.log('🚀 Dream 24K IPTV - Premium IPTV Subscription & Reseller Panel');
console.log('📺 40,000+ Channels · 100,000+ VOD · 4K UHD');
console.log('📱 WhatsApp: +212 663-087765');
console.log('📱 Telegram: @reselleriptvcom');
