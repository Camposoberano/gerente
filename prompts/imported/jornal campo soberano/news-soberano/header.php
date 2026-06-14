<?php
/**
 * Header do tema
 *
 * @package News_Soberano
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> data-theme="<?php echo esc_attr(get_option('news_soberano_theme', 'light')); ?>">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site-container">
    <a class="skip-link sr-only" href="#main"><?php _e('Pular para o conteúdo', 'news-soberano'); ?></a>

    <header id="masthead" class="site-header">
        <div class="container">
            <div class="header-content">
                <!-- Logo -->
                <div class="site-branding">
                    <?php if (has_custom_logo()) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-logo" rel="home">
                            <?php bloginfo('name'); ?>
                        </a>
                    <?php endif; ?>
                </div>

                <!-- Navegação -->
                <nav id="site-navigation" class="main-navigation" aria-label="<?php esc_attr_e('Menu Principal', 'news-soberano'); ?>">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_id'        => 'primary-menu',
                        'menu_class'     => 'nav-menu',
                        'container'      => false,
                        'fallback_cb'    => false,
                    ));
                    ?>

                    <!-- Busca, Tema Toggle e Menu Mobile -->
                    <div class="header-actions">
                        <!-- Botão de Busca -->
                        <button class="search-toggle" aria-label="<?php esc_attr_e('Abrir busca', 'news-soberano'); ?>" aria-expanded="false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </button>

                        <!-- Toggle Tema Escuro/Claro -->
                        <button class="theme-toggle" id="themeToggle" aria-label="<?php esc_attr_e('Alternar tema', 'news-soberano'); ?>">
                            <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                            <svg class="moon-icon hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </button>

                        <!-- Botão Menu Mobile -->
                        <button class="mobile-menu-toggle" aria-label="<?php esc_attr_e('Menu', 'news-soberano'); ?>" aria-expanded="false">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            <!-- Busca Modal -->
            <div class="search-modal" id="searchModal" style="display: none;">
                <div class="search-modal-content">
                    <?php get_search_form(); ?>
                    <button class="search-close" aria-label="<?php esc_attr_e('Fechar busca', 'news-soberano'); ?>">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <?php
    // Breadcrumbs (se Rank Math estiver ativo)
    if (function_exists('rank_math_the_breadcrumbs') && !is_front_page()) :
    ?>
        <div class="breadcrumbs-container">
            <div class="container">
                <?php rank_math_the_breadcrumbs(); ?>
            </div>
        </div>
    <?php endif; ?>
