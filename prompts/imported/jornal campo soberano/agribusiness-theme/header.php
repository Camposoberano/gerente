<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'agribusiness' ); ?></a>

    <!-- COMMODITIES TICKER (JS POWERED) -->
    <div class="commodities-ticker" id="js-ticker">
        <div class="ticker-content" id="ticker-content">
            <!-- JS will inject items here -->
            <span>Carregando cotações...</span> 
        </div>
    </div>

	<header id="masthead" class="site-header">
        
        <!-- TOP BAR (Dark Green: Menu + Search) -->
        <div class="header-top-bar">
            <div class="container top-bar-inner">
                <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
                    <span class="dashicons dashicons-menu-alt3"></span> Menu
                </button>
                
                <div class="top-search">
                    <button class="search-toggle-btn" aria-label="Pesquisar">
                        <span class="dashicons dashicons-search"></span>
                    </button>
                </div>
            </div>
        </div>

        <!-- MAIN HEADER (Logo area) -->
		<div class="header-main">
            <div class="container header-main-inner">
                <div class="site-branding">
                    <?php
                    if ( has_custom_logo() ) :
                        the_custom_logo();
                    else :
                        ?>
                        <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                        <?php
                    endif;
                    ?>
                </div><!-- .site-branding -->

                <!-- Leaderboard Ad Slot (Optional) -->
                <div class="header-ad">
                    <?php if ( is_active_sidebar( 'ad-leaderboard' ) ) : ?>
                        <?php dynamic_sidebar( 'ad-leaderboard' ); ?>
                    <?php endif; ?>
                </div>
            </div>
		</div>

        <!-- CATEGORY NAVIGATION (Bottom Row) -->
		<nav id="site-navigation" class="main-navigation">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'menu_id'        => 'primary-menu',
                    'container_class' => 'container',
				)
			);
			?>
		</nav><!-- #site-navigation -->
	</div>
</header><!-- #masthead -->

<!-- Ad Slot: Leaderboard -->
<?php if ( is_active_sidebar( 'ad-leaderboard' ) ) : ?>
    <div class="container ad-leaderboard-wrapper">
        <?php dynamic_sidebar( 'ad-leaderboard' ); ?>
    </div>
<?php endif; ?>
