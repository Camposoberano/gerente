/**
 * News Soberano - Script Principal
 *
 * @package News_Soberano
 */

(function() {
    'use strict';

    // Esperar DOM carregar
    document.addEventListener('DOMContentLoaded', function() {

        // ========================================
        // MENU MOBILE
        // ========================================
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('active');

                // Prevenir scroll quando menu está aberto
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Fechar menu ao clicar em link
            const menuLinks = navMenu.querySelectorAll('a');
            menuLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });
            });
        }

        // ========================================
        // BUSCA MODAL
        // ========================================
        const searchToggle = document.querySelector('.search-toggle');
        const searchModal = document.getElementById('searchModal');
        const searchClose = document.querySelector('.search-close');
        const searchInput = searchModal ? searchModal.querySelector('.search-field') : null;

        if (searchToggle && searchModal) {
            searchToggle.addEventListener('click', function() {
                searchModal.style.display = 'flex';
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 100);
                }
            });

            if (searchClose) {
                searchClose.addEventListener('click', function() {
                    searchModal.style.display = 'none';
                });
            }

            // Fechar ao clicar fora
            searchModal.addEventListener('click', function(e) {
                if (e.target === searchModal) {
                    searchModal.style.display = 'none';
                }
            });

            // Fechar com ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && searchModal.style.display === 'flex') {
                    searchModal.style.display = 'none';
                }
            });
        }

        // ========================================
        // TOGGLE TEMA ESCURO/CLARO
        // ========================================
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        if (themeToggle) {
            // Carregar tema salvo
            const savedTheme = localStorage.getItem('newssoberano_theme') || 'light';
            html.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);

            themeToggle.addEventListener('click', function() {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';

                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('newssoberano_theme', newTheme);
                updateThemeIcon(newTheme);

                // Adicionar animação de transição
                html.style.transition = 'background-color 0.3s, color 0.3s';
                setTimeout(() => {
                    html.style.transition = '';
                }, 300);
            });
        }

        function updateThemeIcon(theme) {
            const sunIcon = themeToggle.querySelector('.sun-icon');
            const moonIcon = themeToggle.querySelector('.moon-icon');

            if (theme === 'dark') {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            } else {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        }

        // ========================================
        // VOLTAR AO TOPO
        // ========================================
        const backToTop = document.getElementById('backToTop');

        if (backToTop) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTop.style.display = 'flex';
                } else {
                    backToTop.style.display = 'none';
                }
            });

            backToTop.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // ========================================
        // STICKY HEADER
        // ========================================
        const siteHeader = document.querySelector('.site-header');
        let lastScroll = 0;

        if (siteHeader) {
            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset;

                if (currentScroll <= 0) {
                    siteHeader.classList.remove('scroll-up');
                    return;
                }

                if (currentScroll > lastScroll && !siteHeader.classList.contains('scroll-down')) {
                    // Scroll para baixo
                    siteHeader.classList.remove('scroll-up');
                    siteHeader.classList.add('scroll-down');
                } else if (currentScroll < lastScroll && siteHeader.classList.contains('scroll-down')) {
                    // Scroll para cima
                    siteHeader.classList.remove('scroll-down');
                    siteHeader.classList.add('scroll-up');
                }

                lastScroll = currentScroll;
            });
        }

        // ========================================
        // SMOOTH SCROLL PARA LINKS ÂNCORA
        // ========================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '#0') {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // ========================================
        // LOADING PROGRESSIVO DE IMAGENS
        // ========================================
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazyload');
                            img.classList.add('lazyloaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img.lazyload').forEach(function(img) {
                imageObserver.observe(img);
            });
        }

        // ========================================
        // ANIMAÇÕES AO SCROLL (FADE IN)
        // ========================================
        if ('IntersectionObserver' in window) {
            const fadeElements = document.querySelectorAll('.news-card, .featured-news');

            const fadeObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(20px)';
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 100);

                        fadeObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            fadeElements.forEach(function(el) {
                fadeObserver.observe(el);
            });
        }

        // ========================================
        // CONTADOR DE CARACTERES (para textarea de comentários)
        // ========================================
        const commentTextarea = document.querySelector('#comment');
        if (commentTextarea) {
            const maxLength = 500;
            const counter = document.createElement('div');
            counter.className = 'comment-counter';
            counter.textContent = `0 / ${maxLength}`;
            commentTextarea.parentNode.appendChild(counter);

            commentTextarea.addEventListener('input', function() {
                const length = this.value.length;
                counter.textContent = `${length} / ${maxLength}`;

                if (length > maxLength) {
                    counter.style.color = 'red';
                } else {
                    counter.style.color = '';
                }
            });
        }

        // ========================================
        // PRINT FRIENDLY
        // ========================================
        const printButton = document.querySelector('.print-article');
        if (printButton) {
            printButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.print();
            });
        }

        // ========================================
        // COPIAR LINK DO ARTIGO
        // ========================================
        const copyLinkButtons = document.querySelectorAll('.copy-link');
        copyLinkButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const url = window.location.href;

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(url).then(function() {
                        showNotification('Link copiado!');
                    });
                } else {
                    // Fallback para navegadores antigos
                    const textArea = document.createElement('textarea');
                    textArea.value = url;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showNotification('Link copiado!');
                }
            });
        });

        // ========================================
        // NOTIFICAÇÃO TOAST
        // ========================================
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'toast-notification';
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.classList.add('show');
            }, 10);

            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        }

        // ========================================
        // PERFORMANCE: Prefetch de links ao hover
        // ========================================
        const links = document.querySelectorAll('a[href^="' + window.location.origin + '"]');
        links.forEach(function(link) {
            link.addEventListener('mouseenter', function() {
                const href = this.getAttribute('href');
                if (href && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
                    const prefetchLink = document.createElement('link');
                    prefetchLink.rel = 'prefetch';
                    prefetchLink.href = href;
                    document.head.appendChild(prefetchLink);
                }
            }, { once: true });
        });

    });

})();
