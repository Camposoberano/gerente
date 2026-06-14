/**
 * Simple Lightbox for News Soberano
 * @version 1.3.0
 */
(function() {
    'use strict';

    let currentIndex = 0;
    let images = [];

    // Criar lightbox HTML
    const lightboxHTML = `
        <div id="ns-lightbox" class="ns-lightbox" style="display:none;">
            <button class="ns-lightbox-close">&times;</button>
            <button class="ns-lightbox-prev">&larr;</button>
            <button class="ns-lightbox-next">&rarr;</button>
            <div class="ns-lightbox-content">
                <img class="ns-lightbox-image" src="" alt="">
                <div class="ns-lightbox-caption"></div>
            </div>
        </div>
    `;

    // Inicializar
    document.addEventListener('DOMContentLoaded', function() {
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        const lightbox = document.getElementById('ns-lightbox');
        const lightboxImg = lightbox.querySelector('.ns-lightbox-image');
        const lightboxCaption = lightbox.querySelector('.ns-lightbox-caption');

        // Event listeners para galeria
        document.querySelectorAll('.gallery-item a, .wp-block-gallery a').forEach((link, index) => {
            link.addEventListener('click', function(e) {
                if (link.querySelector('img')) {
                    e.preventDefault();
                    images = Array.from(document.querySelectorAll('.gallery-item a img, .wp-block-gallery img'));
                    currentIndex = index;
                    openLightbox(link.href, link.querySelector('img').alt);
                }
            });
        });

        // Fechar
        lightbox.querySelector('.ns-lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });

        // Navegar
        lightbox.querySelector('.ns-lightbox-prev').addEventListener('click', () => navigate(-1));
        lightbox.querySelector('.ns-lightbox-next').addEventListener('click', () => navigate(1));

        // Teclado
        document.addEventListener('keydown', function(e) {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') navigate(-1);
                if (e.key === 'ArrowRight') navigate(1);
            }
        });

        function openLightbox(src, caption) {
            lightboxImg.src = src;
            lightboxCaption.textContent = caption || '';
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }

        function navigate(direction) {
            currentIndex += direction;
            if (currentIndex < 0) currentIndex = images.length - 1;
            if (currentIndex >= images.length) currentIndex = 0;

            const img = images[currentIndex];
            lightboxImg.src = img.src.replace(/-\d+x\d+\./, '.');
            lightboxCaption.textContent = img.alt || '';
        }
    });
})();
