/**
 * Lazy Loading de Imagens
 * Otimizado para performance
 *
 * @package News_Soberano
 */

(function() {
    'use strict';

    // Verificar suporte a IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        // Fallback: carregar todas as imagens imediatamente
        document.querySelectorAll('img[data-src]').forEach(function(img) {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        });
        return;
    }

    // Configurar observer
    const config = {
        rootMargin: '50px 0px',
        threshold: 0.01
    };

    let imageCount = 0;
    let observer;

    function onIntersection(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                imageCount++;
                observer.unobserve(entry.target);
                preloadImage(entry.target);
            }
        });
    }

    function preloadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        // Criar nova imagem para pré-carregar
        const tmpImg = new Image();

        tmpImg.onload = function() {
            // Aplicar imagem carregada
            img.src = src;

            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }

            // Adicionar classe de carregado
            img.classList.add('lazyloaded');
            img.classList.remove('lazyload');

            // Remover atributos data
            delete img.dataset.src;
            delete img.dataset.srcset;

            // Animação fade in
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s';
            requestAnimationFrame(function() {
                img.style.opacity = '1';
            });
        };

        tmpImg.onerror = function() {
            console.warn('Erro ao carregar imagem:', src);
            img.classList.add('lazyerror');
        };

        tmpImg.src = src;
    }

    // Inicializar observer
    observer = new IntersectionObserver(onIntersection, config);

    // Observar todas as imagens com lazy load
    function observeImages() {
        const images = document.querySelectorAll('img.lazyload:not(.lazyloaded):not(.lazyerror)');
        images.forEach(function(img) {
            observer.observe(img);
        });
    }

    // Executar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeImages);
    } else {
        observeImages();
    }

    // Re-observar se novo conteúdo for adicionado dinamicamente
    window.addEventListener('load', observeImages);

    // Exportar função para uso externo
    window.newssoberanoLazyLoad = {
        update: observeImages
    };

})();
