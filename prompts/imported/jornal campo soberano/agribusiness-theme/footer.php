<footer id="colophon" class="site-footer">
    <div class="container footer-widgets">
        <!-- Footer content here -->
        <div class="site-info">
            <a href="<?php echo esc_url( __( 'https://wordpress.org/', 'agribusiness' ) ); ?>">
                <?php
                /* translators: %s: CMS Name, i.e. WordPress. */
                printf( esc_html__( 'Orgulhosamente mantido com %s', 'agribusiness' ), 'WordPress' );
                ?>
            </a>
            <span class="sep"> | </span>
                <?php
                /* translators: 1: Theme name, 2: Theme author. */
                printf( esc_html__( 'Tema: %1$s por %2$s.', 'agribusiness' ), 'Agribusiness News', 'Agribusiness Media' );
                ?>
        </div><!-- .site-info -->
    </div>
</footer><!-- #colophon -->

<!-- Sticky Podcast Player -->
<div id="sticky-podcast-player" class="sticky-player collapsed">
    <div class="player-toggle">🎧 Podcast Rural</div>
    <div class="player-content">
        <div class="track-info">
            <span class="track-title">Resumo do Dia - Agronegócio</span>
            <span class="track-date">Hoje, 12:00</span>
        </div>
        <audio id="main-audio-player" controls preload="none">
            <!-- Source will be set via JS or WP custom field -->
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
            Seu navegador não suporta o elemento de áudio.
        </audio>
    </div>
    <button id="close-player" class="close-player">×</button>
</div>

<!-- WhatsApp Floating Button -->
<a href="https://wa.me/?text=Confira%20as%20notícias%20do%20Agro!" class="whatsapp-float" target="_blank" aria-label="Compartilhar no WhatsApp">
    <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
</a>

</div><!-- #page -->

<?php wp_footer(); ?>

<script>
// Install Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('<?php echo get_template_directory_uri(); ?>/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
</script>

</body>
</html>
