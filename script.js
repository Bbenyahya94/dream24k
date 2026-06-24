/**
 * DREAM 24K IPTV - Main JavaScript
 * Version: 2.0
 * Description: Full interactive functionality for DREAM 24K IPTV website
 */

(function() {
    'use strict';

    // ============================================================
    // CONFIGURATION
    // ============================================================
    const CONFIG = {
        support: {
            phone: '+212 663-087765',
            telegram: '@reselleriptvcom',
            email: 'support@reselleriptv.com'
        },
        trialDuration: 24, // hours
        redirectDelay: 5000, // ms for 404 redirect
    };

    // ============================================================
    // UTILITY FUNCTIONS
    // ============================================================
    const Utils = {
        /** Get current year for footer */
        getCurrentYear: () => new Date().getFullYear(),

        /** Smooth scroll to element */
        scrollTo: (element, offset = 0) => {
            if (!element) return;
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        },

        /** Format phone number */
        formatPhone: (phone) => phone.replace(/\s/g, ''),

        /** Generate random ID */
        generateId: () => Math.random().toString(36).substring(2, 10),

        /** Debounce function */
        debounce: (fn, delay = 250) => {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => fn.apply(this, args), delay);
            };
        },

        /** Detect if element is in viewport */
        isInViewport: (el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    };

    // ============================================================
    // HEADER / NAVIGATION
    // ============================================================
    const Header = {
        init() {
            this.header = document.getElementById('mainHeader');
            this.menuToggle = document.getElementById('menuToggle');
            this.navLinks = document.getElementById('navLinks');
            this.lastScroll = 0;

            if (this.menuToggle) {
                this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
            }

            // Close menu on link click
            if (this.navLinks) {
                this.navLinks.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => this.closeMobileMenu());
                });
            }

            // Scroll effect
            window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

            // Smooth scroll for nav links
            document.querySelectorAll('.nav-links a[data-section]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.getElementById(link.getAttribute('data-section'));
                    if (target) Utils.scrollTo(target, 80);
                });
            });
        },

        toggleMobileMenu() {
            this.menuToggle?.classList.toggle('active');
            this.navLinks?.classList.toggle('open');
        },

        closeMobileMenu() {
            this.menuToggle?.classList.remove('active');
            this.navLinks?.classList.remove('open');
        },

        handleScroll() {
            const scroll = window.pageYOffset || document.documentElement.scrollTop;
            if (scroll > 50) {
                this.header?.classList.add('scrolled');
            } else {
                this.header?.classList.remove('scrolled');
            }
            this.lastScroll = scroll;
        }
    };

    // ============================================================
    // ACTIVATION PANEL (Trial & Codes)
    // ============================================================
    const Activation = {
        init() {
            this.panel = document.getElementById('activationPanel');
            this.codeSelect = document.getElementById('codeTypeSelect');
            this.codeInput = document.getElementById('codeInput');
            this.whatsappBtn = document.getElementById('whatsappTrial');
            this.telegramBtn = document.getElementById('telegramTrial');
            this.headerTrialBtn = document.getElementById('headerTrialBtn');

            // Header trial button
            this.headerTrialBtn?.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToPanel();
            });

            // Trial buttons
            this.whatsappBtn?.addEventListener('click', (e) => {
                e.preventDefault();
                this.requestTrial('WhatsApp');
            });

            this.telegramBtn?.addEventListener('click', (e) => {
                e.preventDefault();
                this.requestTrial('Telegram');
            });

            // Code type change - update placeholder
            this.codeSelect?.addEventListener('change', () => this.updatePlaceholder());
            this.updatePlaceholder();
        },

        scrollToPanel() {
            if (!this.panel) return;
            Utils.scrollTo(this.panel, 80);
            this.panel.classList.add('highlight');
            setTimeout(() => this.panel.classList.remove('highlight'), 2000);
        },

        updatePlaceholder() {
            if (!this.codeSelect || !this.codeInput) return;
            const type = this.codeSelect.value;
            const placeholders = {
                m3u: 'Enter your M3U URL or code',
                xtream: 'Enter your Xtream credentials',
                mac: 'Enter your MAC address (00:1A:2B:3C:4D:5E)'
            };
            this.codeInput.placeholder = placeholders[type] || 'Enter your code';
        },

        requestTrial(channel) {
            const codeType = this.codeSelect?.value.toUpperCase() || 'M3U';
            const code = this.codeInput?.value || 'Not provided';
            const support = CONFIG.support;

            let message = `📱 ${channel} Trial Request\n\n`;
            message += `Code Type: ${codeType}\n`;
            message += `Your Code: ${code}\n\n`;
            message += `Contact us:\n`;
            message += `Phone: ${support.phone}\n`;
            message += `Telegram: ${support.telegram}\n`;
            message += `Email: ${support.email}\n\n`;
            message += `Send us your code to get started!`;

            alert(message);

            // Track trial request (analytics placeholder)
            console.log(`📊 Trial requested via ${channel} | Code Type: ${codeType}`);
        }
    };

    // ============================================================
    // SUBSCRIPTION CARDS
    // ============================================================
    const Subscriptions = {
        init() {
            document.querySelectorAll('.subscribe-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const card = btn.closest('.card');
                    const price = card?.querySelector('.price')?.textContent?.trim() || 'selected plan';
                    this.handleSubscription(price);
                });
            });
        },

        handleSubscription(price) {
            alert(`📺 DREAM 24K IPTV — Subscription ${price} selected.\n\nProceed to payment gateway.\n\nSupport: ${CONFIG.support.phone}`);
            console.log(`📊 Subscription selected: ${price}`);
        }
    };

    // ============================================================
    // RESELLER CARDS
    // ============================================================
    const Reseller = {
        init() {
            document.querySelectorAll('.reseller-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const card = btn.closest('.reseller-card');
                    const credit = card?.querySelector('.credit')?.textContent?.trim() || 'selected package';
                    this.handleReseller(credit);
                });
            });
        },

        handleReseller(credit) {
            alert(`🚀 DREAM 24K IPTV Reseller — ${credit} package selected.\n\nContact our sales team:\n${CONFIG.support.phone}\n${CONFIG.support.telegram}\n${CONFIG.support.email}`);
            console.log(`📊 Reseller package selected: ${credit}`);
        }
    };

    // ============================================================
    // CONTACT / SUPPORT
    // ============================================================
    const Support = {
        init() {
            // Contact buttons in CTA section
            document.querySelectorAll('.contact-support').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showSupportInfo(btn.textContent.trim());
                });
            });

            // Footer support links
            document.querySelectorAll('.footer-support').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showSupportInfo(btn.querySelector('i')?.className || 'support');
                });
            });

            // Main support link in nav
            document.getElementById('supportLink')?.addEventListener('click', (e) => {
                e.preventDefault();
                const cta = document.querySelector('.cta-section');
                if (cta) Utils.scrollTo(cta, 80);
            });

            // Footer privacy
            document.getElementById('footerPrivacy')?.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPrivacyPolicy();
            });

            // Footer 404 test
            document.getElementById('footer404')?.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.show404) window.show404();
            });
        },

        showSupportInfo(channel) {
            const s = CONFIG.support;
            alert(`📱 DREAM 24K IPTV Support\n\n` +
                `Channel: ${channel}\n` +
                `Phone: ${s.phone}\n` +
                `Telegram: ${s.telegram}\n` +
                `Email: ${s.email}\n\n` +
                `We're available 24/7!`);
        },

        showPrivacyPolicy() {
            alert(`🔒 Privacy Policy\n\n` +
                `DREAM 24K IPTV respects your privacy.\n\n` +
                `• We collect minimal data to provide our service\n` +
                `• Your data is never shared with third parties\n` +
                `• You can request data deletion at any time\n\n` +
                `For full details, contact:\n${CONFIG.support.email}`);
        }
    };

    // ============================================================
    // FEATURES INTERACTION
    // ============================================================
    const Features = {
        init() {
            document.querySelectorAll('.feature-item').forEach(item => {
                item.addEventListener('click', () => {
                    const title = item.querySelector('h4')?.textContent || 'feature';
                    const desc = item.querySelector('p')?.textContent || '';
                    alert(`✨ DREAM 24K IPTV Feature\n\n` +
                        `${title}\n${desc}\n\n` +
                        `Contact us to learn more!`);
                });
            });
        }
    };

    // ============================================================
    // 404 PAGE HANDLING
    // ============================================================
    const Error404 = {
        init() {
            // Functions exposed globally for the 404 page
            window.show404 = () => this.show();
            window.goHome = () => this.hide();

            // Home button on 404 page
            document.getElementById('goHome')?.addEventListener('click', (e) => {
                e.preventDefault();
                this.hide();
            });
        },

        show() {
            const earth = document.getElementById('earth-container');
            const main = document.getElementById('mainContent');
            const error = document.getElementById('errorPage');
            const header = document.querySelector('.header');

            if (earth) earth.classList.add('hidden');
            if (main) main.classList.add('hidden');
            if (error) error.classList.add('active');
            if (header) {
                header.style.position = 'relative';
                header.style.background = 'rgba(11,13,21,0.98)';
            }

            // Track 404
            console.log('📡 404 page displayed');
        },

        hide() {
            const earth = document.getElementById('earth-container');
            const main = document.getElementById('mainContent');
            const error = document.getElementById('errorPage');
            const header = document.querySelector('.header');

            if (earth) earth.classList.remove('hidden');
            if (main) main.classList.remove('hidden');
            if (error) error.classList.remove('active');
            if (header) {
                header.style.position = 'fixed';
                header.style.background = 'rgba(11,13,21,0.85)';
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // ============================================================
    // LANGUAGE SELECTOR (Multi-language)
    // ============================================================
    const Language = {
        translations: {
            // Full translations dictionary (same as in main page)
            en: {
                nav_packages: 'Packages',
                nav_reseller: 'Reseller',
                nav_features: 'Features',
                nav_faq: 'FAQ',
                nav_support: 'Support',
                nav_trial: 'Free Trial',
                hero_title: 'DREAM 24K IPTV Service',
                // ... full translations (see main page for complete)
            },
            fr: {
                nav_packages: 'Forfaits',
                nav_reseller: 'Revendeur',
                nav_features: 'Fonctionnalités',
                nav_faq: 'FAQ',
                nav_support: 'Assistance',
                nav_trial: 'Essai Gratuit',
                // ... full translations
            },
            // ... other languages
        },

        init() {
            this.selector = document.getElementById('languageSelect');
            if (!this.selector) return;

            // Restore saved language
            const saved = localStorage.getItem('preferred_lang');
            if (saved && this.translations[saved]) {
                this.selector.value = saved;
                this.apply(saved);
            }

            this.selector.addEventListener('change', () => {
                const lang = this.selector.value;
                this.apply(lang);
                localStorage.setItem('preferred_lang', lang);
            });
        },

        apply(lang) {
            const dict = this.translations[lang];
            if (!dict) return;

            document.querySelectorAll('[data-key]').forEach(el => {
                const key = el.getAttribute('data-key');
                if (dict[key] !== undefined) {
                    // Check if HTML content
                    const htmlKeys = ['map_desc', 'hero_desc', 'trial_desc', 'sub_desc', 'reseller_desc', 'features_desc', 'faq_desc', 'cta_desc', 'error_desc'];
                    if (htmlKeys.includes(key)) {
                        el.innerHTML = dict[key];
                    } else {
                        el.textContent = dict[key];
                    }
                }
            });

            // Update select options
            document.querySelectorAll('select option[data-key]').forEach(opt => {
                const key = opt.getAttribute('data-key');
                if (dict[key] !== undefined) {
                    opt.textContent = dict[key];
                }
            });

            document.documentElement.lang = lang;
            console.log(`🌐 Language switched to: ${lang}`);
        }
    };

    // ============================================================
    // FOOTER
    // ============================================================
    const Footer = {
        init() {
            // Update year
            const footerEl = document.querySelector('.footer div:first-child');
            if (footerEl) {
                const year = Utils.getCurrentYear();
                // Check if it's already set via translation
                if (!footerEl.textContent.includes('2026') && !footerEl.textContent.includes(year)) {
                    footerEl.textContent = footerEl.textContent.replace('2026', year);
                }
            }
        }
    };

    // ============================================================
    // DOM READY INIT
    // ============================================================
    document.addEventListener('DOMContentLoaded', () => {
        console.log('✨ DREAM 24K IPTV · Initializing...');

        Header.init();
        Activation.init();
        Subscriptions.init();
        Reseller.init();
        Support.init();
        Features.init();
        Error404.init();
        Language.init();
        Footer.init();

        console.log('✅ DREAM 24K IPTV · All systems ready!');
        console.log(`📞 Support: ${CONFIG.support.phone}`);
        console.log('💡 Type "show404()" to test 404 page');
    });

})();
