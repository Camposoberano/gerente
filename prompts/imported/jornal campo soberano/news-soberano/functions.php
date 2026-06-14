<?php
/**
 * News Soberano Theme Functions
 *
 * @package News_Soberano
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Define constantes do tema
define('NEWS_SOBERANO_VERSION', '1.3.6');
define('NEWS_SOBERANO_DIR', get_template_directory());
define('NEWS_SOBERANO_URI', get_template_directory_uri());

/**
 * Configuração inicial do tema
 */
function news_soberano_setup() {
    // Suporte a tradução
    load_theme_textdomain('news-soberano', NEWS_SOBERANO_DIR . '/languages');

    // Suporte a feed automático
    add_theme_support('automatic-feed-links');

    // Suporte a título dinâmico
    add_theme_support('title-tag');

    // Suporte a imagens destacadas
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(800, 450, true);

    // Tamanhos de imagem personalizados
    add_image_size('news-featured', 1200, 600, true);
    add_image_size('news-large', 800, 450, true);
    add_image_size('news-medium', 400, 225, true);
    add_image_size('news-thumb', 200, 150, true);

    // Suporte a HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ));

    // Suporte a logotipo customizado
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Suporte a cores customizadas
    add_theme_support('editor-color-palette', array(
        array(
            'name'  => __('Verde Primário', 'news-soberano'),
            'slug'  => 'primary-green',
            'color' => '#6cb83b',
        ),
        array(
            'name'  => __('Marrom Primário', 'news-soberano'),
            'slug'  => 'primary-brown',
            'color' => '#8b6f47',
        ),
    ));

    // Registrar menus
    register_nav_menus(array(
        'primary' => __('Menu Principal', 'news-soberano'),
        'footer'  => __('Menu Rodapé', 'news-soberano'),
    ));

    // Suporte a refresh seletivo no Customizer
    add_theme_support('customize-selective-refresh-widgets');

    // Suporte a post formats
    add_theme_support('post-formats', array(
        'video',
        'gallery',
        'quote',
    ));

    // Suporte a AMP
    add_theme_support('amp', array(
        'paired' => true,
    ));
}
add_action('after_setup_theme', 'news_soberano_setup');

/**
 * Configurar largura do conteúdo
 */
function news_soberano_content_width() {
    $GLOBALS['content_width'] = apply_filters('news_soberano_content_width', 1280);
}
add_action('after_setup_theme', 'news_soberano_content_width', 0);

/**
 * Enfileirar estilos e scripts
 */
function news_soberano_scripts() {
    // Google Fonts
    wp_enqueue_style(
        'news-soberano-fonts',
        'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    // Estilo principal
    wp_enqueue_style(
        'news-soberano-style',
        get_stylesheet_uri(),
        array(),
        NEWS_SOBERANO_VERSION
    );

    // Estilos adicionais
    wp_enqueue_style(
        'news-soberano-additional',
        NEWS_SOBERANO_URI . '/assets/css/additional-styles.css',
        array('news-soberano-style'),
        NEWS_SOBERANO_VERSION
    );

    // Estilos G1
    wp_enqueue_style(
        'news-soberano-g1',
        NEWS_SOBERANO_URI . '/assets/css/g1-style.css',
        array('news-soberano-additional'),
        NEWS_SOBERANO_VERSION
    );

    // Estilos Homepage Layout
    if (is_front_page()) {
        wp_enqueue_style(
            'news-soberano-homepage',
            NEWS_SOBERANO_URI . '/assets/css/homepage-layout.css',
            array('news-soberano-g1'),
            NEWS_SOBERANO_VERSION
        );
    }

    // Estilos Newsletter
    wp_enqueue_style(
        'news-soberano-newsletter',
        NEWS_SOBERANO_URI . '/assets/css/newsletter.css',
        array('news-soberano-style'),
        NEWS_SOBERANO_VERSION
    );

    // Estilos Trending Topics
    wp_enqueue_style(
        'news-soberano-trending',
        NEWS_SOBERANO_URI . '/assets/css/trending-topics.css',
        array('news-soberano-style'),
        NEWS_SOBERANO_VERSION
    );

    // Estilos Lightbox
    wp_enqueue_style(
        'news-soberano-lightbox',
        NEWS_SOBERANO_URI . '/assets/css/lightbox.css',
        array('news-soberano-style'),
        NEWS_SOBERANO_VERSION
    );

    // Script principal
    wp_enqueue_script(
        'news-soberano-script',
        NEWS_SOBERANO_URI . '/assets/js/main.js',
        array(),
        NEWS_SOBERANO_VERSION,
        true
    );

    // Lazy loading para imagens
    wp_enqueue_script(
        'news-soberano-lazyload',
        NEWS_SOBERANO_URI . '/assets/js/lazyload.js',
        array(),
        NEWS_SOBERANO_VERSION,
        true
    );

    // Newsletter
    wp_enqueue_script(
        'news-soberano-newsletter',
        NEWS_SOBERANO_URI . '/assets/js/newsletter.js',
        array(),
        NEWS_SOBERANO_VERSION,
        true
    );

    // Lightbox
    wp_enqueue_script(
        'news-soberano-lightbox',
        NEWS_SOBERANO_URI . '/assets/js/lightbox.js',
        array(),
        NEWS_SOBERANO_VERSION,
        true
    );

    // Comentários
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    // Passar dados para JavaScript
    wp_localize_script('news-soberano-script', 'newsSoberanoData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('news-soberano-nonce'),
        'theme'   => get_option('news_soberano_theme', 'light'),
    ));
}
add_action('wp_enqueue_scripts', 'news_soberano_scripts');

/**
 * Registrar áreas de widgets
 */
function news_soberano_widgets_init() {
    // Sidebar principal
    register_sidebar(array(
        'name'          => __('Sidebar Principal', 'news-soberano'),
        'id'            => 'sidebar-1',
        'description'   => __('Aparece na lateral das páginas de posts e archives.', 'news-soberano'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    // Footer widgets
    for ($i = 1; $i <= 3; $i++) {
        register_sidebar(array(
            'name'          => sprintf(__('Rodapé %d', 'news-soberano'), $i),
            'id'            => 'footer-' . $i,
            'description'   => sprintf(__('Área de widget %d do rodapé.', 'news-soberano'), $i),
            'before_widget' => '<div id="%1$s" class="footer-widget widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h3 class="widget-title">',
            'after_title'   => '</h3>',
        ));
    }
}
add_action('widgets_init', 'news_soberano_widgets_init');

/**
 * Adicionar classes ao body
 */
function news_soberano_body_classes($classes) {
    // Adiciona classe se não houver sidebar
    if (!is_active_sidebar('sidebar-1')) {
        $classes[] = 'no-sidebar';
    }

    // Adiciona classe do tema escuro/claro
    $theme = get_option('news_soberano_theme', 'light');
    $classes[] = 'theme-' . $theme;

    return $classes;
}
add_filter('body_class', 'news_soberano_body_classes');

/**
 * Customizar excerpt
 */
function news_soberano_custom_excerpt_length($length) {
    return 25;
}
add_filter('excerpt_length', 'news_soberano_custom_excerpt_length');

function news_soberano_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'news_soberano_excerpt_more');

/**
 * Função para obter tempo de leitura estimado
 */
function news_soberano_reading_time() {
    $content = get_post_field('post_content', get_the_ID());
    $word_count = str_word_count(strip_tags($content));
    $reading_time = ceil($word_count / 200); // 200 palavras por minuto

    return sprintf(
        _n('%s min de leitura', '%s mins de leitura', $reading_time, 'news-soberano'),
        $reading_time
    );
}

/**
 * Função para obter visualizações do post
 */
function news_soberano_get_post_views($post_id) {
    $count = get_post_meta($post_id, 'news_soberano_post_views', true);
    return $count ? $count : 0;
}

function news_soberano_set_post_views($post_id) {
    $count = news_soberano_get_post_views($post_id);
    $count++;
    update_post_meta($post_id, 'news_soberano_post_views', $count);
}

// Remover prefetch do post quando visualizado
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);

/**
 * Adicionar schema.org markup para SEO
 */
function news_soberano_schema_markup() {
    if (is_single()) {
        $schema = array(
            '@context'      => 'https://schema.org',
            '@type'         => 'NewsArticle',
            'headline'      => get_the_title(),
            'datePublished' => get_the_date('c'),
            'dateModified'  => get_the_modified_date('c'),
            'author'        => array(
                '@type' => 'Person',
                'name'  => get_the_author(),
            ),
            'publisher'     => array(
                '@type' => 'Organization',
                'name'  => get_bloginfo('name'),
                'logo'  => array(
                    '@type' => 'ImageObject',
                    'url'   => get_site_icon_url(),
                ),
            ),
        );

        if (has_post_thumbnail()) {
            $schema['image'] = get_the_post_thumbnail_url(get_the_ID(), 'full');
        }

        echo '<script type="application/ld+json">' . wp_json_encode($schema) . '</script>';
    }
}
add_action('wp_head', 'news_soberano_schema_markup');

/**
 * Adicionar meta tags Open Graph para compartilhamento social
 */
function news_soberano_add_og_tags() {
    if (is_single()) {
        ?>
        <meta property="og:type" content="article" />
        <meta property="og:title" content="<?php echo esc_attr(get_the_title()); ?>" />
        <meta property="og:description" content="<?php echo esc_attr(get_the_excerpt()); ?>" />
        <meta property="og:url" content="<?php echo esc_url(get_permalink()); ?>" />
        <meta property="og:site_name" content="<?php echo esc_attr(get_bloginfo('name')); ?>" />
        <?php if (has_post_thumbnail()) : ?>
        <meta property="og:image" content="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'full')); ?>" />
        <?php endif; ?>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="<?php echo esc_attr(get_the_title()); ?>" />
        <meta name="twitter:description" content="<?php echo esc_attr(get_the_excerpt()); ?>" />
        <?php if (has_post_thumbnail()) : ?>
        <meta name="twitter:image" content="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'full')); ?>" />
        <?php endif; ?>
        <?php
    }
}
add_action('wp_head', 'news_soberano_add_og_tags');

/**
 * AJAX: Alternar tema escuro/claro
 */
function news_soberano_toggle_theme() {
    check_ajax_referer('news-soberano-nonce', 'nonce');

    $current_theme = get_option('news_soberano_theme', 'light');
    $new_theme = ($current_theme === 'light') ? 'dark' : 'light';

    update_option('news_soberano_theme', $new_theme);

    wp_send_json_success(array('theme' => $new_theme));
}
add_action('wp_ajax_news_soberano_toggle_theme', 'news_soberano_toggle_theme');
add_action('wp_ajax_nopriv_news_soberano_toggle_theme', 'news_soberano_toggle_theme');

/**
 * Otimizações de performance
 */
// Remover query strings de recursos estáticos
function news_soberano_remove_query_strings($src) {
    if (strpos($src, '?ver=')) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}
add_filter('style_loader_src', 'news_soberano_remove_query_strings', 10, 1);
add_filter('script_loader_src', 'news_soberano_remove_query_strings', 10, 1);

// Desabilitar emojis para performance
function news_soberano_disable_emojis() {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
}
add_action('init', 'news_soberano_disable_emojis');

/**
 * Compatibilidade com WP Rocket
 */
function news_soberano_rocket_compatibility() {
    // Adicionar suporte para lazy loading de imagens
    add_filter('rocket_lazyload_html', '__return_true');

    // Minificar CSS inline
    add_filter('rocket_minify_inline_css', '__return_true');

    // Minificar JS inline
    add_filter('rocket_minify_inline_js', '__return_true');
}
add_action('init', 'news_soberano_rocket_compatibility');

/**
 * Compatibilidade com Rank Math SEO
 */
function news_soberano_rankmath_compatibility() {
    // Adicionar breadcrumbs do Rank Math
    add_theme_support('rank-math-breadcrumbs');
}
add_action('after_setup_theme', 'news_soberano_rankmath_compatibility');

/**
 * Widget customizado: Posts Populares
 */
class News_Soberano_Popular_Posts_Widget extends WP_Widget {

    public function __construct() {
        parent::__construct(
            'news_soberano_popular_posts',
            __('Posts Populares (News Soberano)', 'news-soberano'),
            array('description' => __('Exibe os posts mais visualizados', 'news-soberano'))
        );
    }

    public function widget($args, $instance) {
        echo $args['before_widget'];

        if (!empty($instance['title'])) {
            echo $args['before_title'] . apply_filters('widget_title', $instance['title']) . $args['after_title'];
        }

        $number = !empty($instance['number']) ? absint($instance['number']) : 5;

        $popular_posts = new WP_Query(array(
            'posts_per_page' => $number,
            'meta_key'       => 'news_soberano_post_views',
            'orderby'        => 'meta_value_num',
            'order'          => 'DESC',
        ));

        if ($popular_posts->have_posts()) {
            echo '<ul class="popular-posts-list">';
            while ($popular_posts->have_posts()) {
                $popular_posts->the_post();
                ?>
                <li class="popular-post-item">
                    <?php if (has_post_thumbnail()) : ?>
                        <a href="<?php the_permalink(); ?>" class="popular-post-thumb">
                            <?php the_post_thumbnail('news-thumb'); ?>
                        </a>
                    <?php endif; ?>
                    <div class="popular-post-content">
                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        <span class="popular-post-date"><?php echo get_the_date(); ?></span>
                    </div>
                </li>
                <?php
            }
            echo '</ul>';
            wp_reset_postdata();
        }

        echo $args['after_widget'];
    }

    public function form($instance) {
        $title = !empty($instance['title']) ? $instance['title'] : __('Posts Populares', 'news-soberano');
        $number = !empty($instance['number']) ? absint($instance['number']) : 5;
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>">
                <?php _e('Título:', 'news-soberano'); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text"
                   value="<?php echo esc_attr($title); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('number')); ?>">
                <?php _e('Número de posts:', 'news-soberano'); ?>
            </label>
            <input class="tiny-text" id="<?php echo esc_attr($this->get_field_id('number')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('number')); ?>" type="number"
                   step="1" min="1" value="<?php echo esc_attr($number); ?>" size="3">
        </p>
        <?php
    }

    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? sanitize_text_field($new_instance['title']) : '';
        $instance['number'] = (!empty($new_instance['number'])) ? absint($new_instance['number']) : 5;
        return $instance;
    }
}

function news_soberano_register_widgets() {
    register_widget('News_Soberano_Popular_Posts_Widget');
    register_widget('News_Soberano_Newsletter_Widget');
    register_widget('News_Soberano_Trending_Topics_Widget');
}
add_action('widgets_init', 'news_soberano_register_widgets');

/**
 * Função helper: Obter thumbnail ou placeholder
 */
function news_soberano_get_thumbnail($size = 'news-medium', $post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }

    if (has_post_thumbnail($post_id)) {
        return get_the_post_thumbnail($post_id, $size, array('alt' => get_the_title($post_id)));
    }

    // Placeholder SVG inline
    $sizes = array(
        'news-featured' => array(1200, 600),
        'news-large'    => array(800, 450),
        'news-medium'   => array(400, 225),
        'news-thumb'    => array(200, 150),
    );

    $dimensions = isset($sizes[$size]) ? $sizes[$size] : array(400, 225);
    $width = $dimensions[0];
    $height = $dimensions[1];

    $placeholder = '<svg width="' . $width . '" height="' . $height . '" xmlns="http://www.w3.org/2000/svg" class="placeholder-img">
        <rect width="100%" height="100%" fill="#e5e7eb"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">
            Sem imagem
        </text>
    </svg>';

    return $placeholder;
}

/**
 * ========================================================================
 * FUNÇÕES HELPER PARA AMP
 * ========================================================================
 */

/**
 * Detectar se a requisição atual é AMP
 * Centraliza a detecção para garantir consistência em todo o tema
 *
 * @return bool True se for requisição AMP
 */
function news_soberano_is_amp() {
    // Método 1: Verificar via plugin AMP (mais confiável)
    if (function_exists('is_amp_endpoint') && is_amp_endpoint()) {
        return true;
    }

    // Método 2: Verificar URL e query string (fallback)
    $request_uri = $_SERVER['REQUEST_URI'] ?? '';
    $query_string = $_SERVER['QUERY_STRING'] ?? '';

    $is_amp_url = (
        strpos($request_uri, '/amp/') !== false ||
        strpos($request_uri, '/amp') !== false ||
        strpos($query_string, 'amp=1') !== false ||
        strpos($query_string, 'amp') !== false
    );

    return $is_amp_url;
}

/**
 * ========================================================================
 * COMPATIBILIDADE COM LITESPEED CACHE
 * ========================================================================
 */

/**
 * Compatibilidade com LiteSpeed Cache
 * Otimizações e exclusões para funcionamento correto
 */
// Excluir imagens destacadas do lazy load do LiteSpeed
add_filter('litespeed_media_lazy_img_excludes', function($excludes) {
    $excludes[] = 'wp-post-image'; // Classe de imagens destacadas
    $excludes[] = 'hero-image';
    $excludes[] = 'news-featured';
    return $excludes;
});

// Desabilitar lazy load nativo do WordPress em imagens destacadas
add_filter('wp_lazy_loading_enabled', function($default, $tag_name, $context) {
    if ('img' === $tag_name && 'the_post_thumbnail' === $context) {
        return false;
    }
    return $default;
}, 10, 3);

// Limpar cache do LiteSpeed após atualização de posts
add_action('save_post', function($post_id) {
    if (defined('LSCWP_V')) {
        do_action('litespeed_purge_post', $post_id);
    }
});

// ESI (Edge Side Includes) para widgets dinâmicos
add_filter('litespeed_esi_enabled', function($enabled, $block_id) {
    // Não usar ESI em widgets críticos
    $critical_widgets = array('newsletter', 'trending-topics');
    if (in_array($block_id, $critical_widgets)) {
        return false;
    }
    return $enabled;
}, 10, 2);

/**
 * Desabilitar otimizações LiteSpeed em páginas AMP
 * IMPORTANTE: Desabilita APENAS otimizações, mantém cache e buffer de conteúdo
 *
 * Correção v1.3.6: Usa função centralizada news_soberano_is_amp()
 */
function news_soberano_disable_litespeed_on_amp() {
    // Usar função centralizada de detecção AMP
    if (news_soberano_is_amp()) {
        // Desabilitar todas as otimizações LiteSpeed (NÃO bloquear buffer/cache)
        add_filter('litespeed_can_optm', '__return_false', 1);
        add_filter('litespeed_optm_html_head', '__return_false', 1);
        add_filter('litespeed_optm_css', '__return_false', 1);
        add_filter('litespeed_optm_js', '__return_false', 1);
        add_filter('litespeed_media_lazy_img', '__return_false', 1);
        add_filter('litespeed_media_lazy_iframe', '__return_false', 1);
        add_filter('litespeed_optm_js_defer', '__return_false', 1);
        add_filter('litespeed_optm_css_defer', '__return_false', 1);
        add_filter('litespeed_optm_ucss', '__return_false', 1);
        add_filter('litespeed_optm_ccss', '__return_false', 1);
        add_filter('litespeed_optm_js_inline_defer', '__return_false', 1);
        add_filter('litespeed_optm_ggfonts_async', '__return_false', 1);
        add_filter('litespeed_optm_css_inline', '__return_false', 1);
        add_filter('litespeed_optm_js_inline', '__return_false', 1);

        // Marcar URL como não-otimizável
        add_filter('litespeed_is_not_optmz_url', '__return_true', 1);
    }
}
// Executar MUITO CEDO - antes do LiteSpeed processar otimizações
add_action('plugins_loaded', 'news_soberano_disable_litespeed_on_amp', 1);

/**
 * Compatibilidade AMP - Limpeza e otimizações
 * NOTA: Sanitizadores AMP estão em inc/amp-support.php para evitar duplicação
 */
function news_soberano_amp_compatibility() {
    // Verificar se é endpoint AMP
    if (function_exists('is_amp_endpoint') && is_amp_endpoint()) {

        // Desabilitar lazy load
        remove_action('wp_enqueue_scripts', 'news_soberano_lazyload');

        // Desabilitar widgets incompatíveis (sidebar vazia no AMP)
        add_filter('sidebars_widgets', function($sidebars) {
            $sidebars['sidebar-1'] = array();
            return $sidebars;
        });

        // Remover scripts desnecessários no AMP
        remove_action('wp_enqueue_scripts', 'news_soberano_scripts', 10);

        // Remover fontes externas para reduzir CSS
        remove_action('wp_enqueue_scripts', 'news_soberano_fonts');
    }
}
add_action('template_redirect', 'news_soberano_amp_compatibility', 1);

/**
 * Adicionar amp-form extension para formulários AMP
 */
function news_soberano_amp_add_form_script($data) {
    if (function_exists('is_amp_endpoint') && is_amp_endpoint()) {
        // Adicionar amp-form script para formulários
        if (!isset($data['amp_component_scripts']) || !is_array($data['amp_component_scripts'])) {
            $data['amp_component_scripts'] = array();
        }
        $data['amp_component_scripts']['amp-form'] = 'https://cdn.ampproject.org/v0/amp-form-0.1.js';
    }
    return $data;
}
add_filter('amp_post_template_data', 'news_soberano_amp_add_form_script');

/**
 * Incluir arquivos adicionais
 */
require_once NEWS_SOBERANO_DIR . '/inc/customizer.php';
require_once NEWS_SOBERANO_DIR . '/inc/template-tags.php';
require_once NEWS_SOBERANO_DIR . '/inc/amp-support.php';
require_once NEWS_SOBERANO_DIR . '/inc/widgets/most-read-widget.php';
require_once NEWS_SOBERANO_DIR . '/inc/widgets/newsletter-widget.php';
require_once NEWS_SOBERANO_DIR . '/inc/widgets/trending-topics-widget.php';
