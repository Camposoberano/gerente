<?php
/**
 * Agribusiness Theme functions and definitions
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

function agribusiness_setup() {
    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );

    // Let WordPress manage the document title.
    add_theme_support( 'title-tag' );

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support( 'post-thumbnails' );

    // Register Navigation Menus
    register_nav_menus( array(
        'primary' => esc_html__( 'Primary Menu', 'agribusiness' ),
    ) );
}
add_action( 'after_setup_theme', 'agribusiness_setup' );

/**
 * Register Widget Areas for Ads
 */
function agribusiness_widgets_init() {
    register_sidebar( array(
        'name'          => esc_html__( 'Sidebar Principal', 'agribusiness' ),
        'id'            => 'sidebar-1',
        'description'   => esc_html__( 'Adicione widgets aqui.', 'agribusiness' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Ad Slot: Leaderboard (Topo)', 'agribusiness' ),
        'id'            => 'ad-leaderboard',
        'description'   => esc_html__( 'Área para banner de topo (728x90).', 'agribusiness' ),
        'before_widget' => '<div id="%1$s" class="ad-container leaderboard %2$s">',
        'after_widget'  => '</div>',
    ) );
}
add_action( 'widgets_init', 'agribusiness_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function agribusiness_scripts() {
    // Version 1.2.2 - Player Fix, Header Contrast, Full Mobile Img
    wp_enqueue_style( 'agribusiness-style', get_stylesheet_uri(), array(), '1.2.2' );
    
    // Google Fonts
    wp_enqueue_style( 'agribusiness-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@700&display=swap', array(), null );

    // Theme JS (Ticker, Weather, Player Logic)
    wp_enqueue_script( 'agribusiness-app', get_template_directory_uri() . '/js/app.js', array(), '1.0.0', true );

    // Pass data to JS
    wp_localize_script( 'agribusiness-app', 'agribusinessData', array(
        'siteUrl' => get_site_url(),
        'themeUrl' => get_template_directory_uri(),
        'ajaxUrl' => admin_url( 'admin-ajax.php' )
    ));
}
add_action( 'wp_enqueue_scripts', 'agribusiness_scripts' );

/**
 * Optional: Custom Post Thumbnail Helper using function_exists check
 */
if ( ! function_exists( 'agribusiness_post_thumbnail' ) ) :
	function agribusiness_post_thumbnail() {
		if ( post_password_required() || is_attachment() || ! have_post_thumbnail() ) {
			return;
		}

		if ( is_singular() ) :
			?>
			<div class="post-thumbnail">
				<?php the_post_thumbnail(); ?>
			</div><!-- .post-thumbnail -->
			<?php
		else :
			?>
			<a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
				<?php
					the_post_thumbnail( 'post-thumbnail', array(
						'alt' => the_title_attribute( array(
							'echo' => false,
						) ),
					) );
				?>
			</a>
			<?php
		endif; // End is_singular().
	}
endif;

/**
 * Add PWA Manifest to Head
 */
function agribusiness_add_manifest() {
    echo '<link rel="manifest" href="' . get_template_directory_uri() . '/manifest.json">';
    echo '<meta name="theme-color" content="#1B4D3E">';
}
add_action( 'wp_head', 'agribusiness_add_manifest' );
