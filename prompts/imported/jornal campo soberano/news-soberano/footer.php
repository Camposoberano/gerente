<?php
/**
 * Footer do tema
 *
 * @package News_Soberano
 */
?>

    <footer id="colophon" class="site-footer">
        <div class="container">
            <?php if (is_active_sidebar('footer-1') || is_active_sidebar('footer-2') || is_active_sidebar('footer-3')) : ?>
                <div class="footer-widgets">
                    <?php if (is_active_sidebar('footer-1')) : ?>
                        <div class="footer-widget-area">
                            <?php dynamic_sidebar('footer-1'); ?>
                        </div>
                    <?php endif; ?>

                    <?php if (is_active_sidebar('footer-2')) : ?>
                        <div class="footer-widget-area">
                            <?php dynamic_sidebar('footer-2'); ?>
                        </div>
                    <?php endif; ?>

                    <?php if (is_active_sidebar('footer-3')) : ?>
                        <div class="footer-widget-area">
                            <?php dynamic_sidebar('footer-3'); ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="footer-bottom">
                <p>
                    &copy; <?php echo date('Y'); ?>
                    <a href="<?php echo esc_url(home_url('/')); ?>">
                        <?php bloginfo('name'); ?>
                    </a>
                    <?php _e('- Todos os direitos reservados', 'news-soberano'); ?>
                </p>

                <?php
                if (has_nav_menu('footer')) :
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'menu_id'        => 'footer-menu',
                        'menu_class'     => 'footer-menu',
                        'container'      => 'nav',
                        'depth'          => 1,
                    ));
                endif;
                ?>

                <p class="theme-credit">
                    <?php
                    printf(
                        __('Tema %s desenvolvido para alto desempenho', 'news-soberano'),
                        '<strong>News Soberano</strong>'
                    );
                    ?>
                </p>
            </div>
        </div>
    </footer>

    <!-- Botão Voltar ao Topo -->
    <button id="backToTop" class="back-to-top" aria-label="<?php esc_attr_e('Voltar ao topo', 'news-soberano'); ?>" style="display: none;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    </button>

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
