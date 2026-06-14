<?php
/**
 * Suporte AMP (Accelerated Mobile Pages)
 *
 * @package News_Soberano
 */

/**
 * Adicionar suporte AMP ao tema
 */
function news_soberano_amp_init() {
    // Verificar se o plugin AMP está ativo
    if (!function_exists('is_amp_endpoint')) {
        return;
    }

    // Adicionar templates AMP customizados
    add_filter('amp_post_template_file', 'news_soberano_amp_set_custom_template', 10, 3);

    // Customizar meta tags AMP
    add_filter('amp_post_template_metadata', 'news_soberano_amp_metadata', 10, 2);

    // Adicionar estilos customizados ao AMP
    add_action('amp_post_template_css', 'news_soberano_amp_custom_css');

    // Adicionar analytics ao AMP
    add_filter('amp_post_template_analytics', 'news_soberano_amp_add_analytics');
}
add_action('after_setup_theme', 'news_soberano_amp_init');

/**
 * Definir template AMP customizado
 */
function news_soberano_amp_set_custom_template($file, $type, $post) {
    if ('single' === $type) {
        $custom_file = NEWS_SOBERANO_DIR . '/amp/single.php';
        if (file_exists($custom_file)) {
            return $custom_file;
        }
    }
    return $file;
}

/**
 * Customizar metadata do AMP
 */
function news_soberano_amp_metadata($metadata, $post) {
    $metadata['@type'] = 'NewsArticle';
    $metadata['publisher']['logo'] = array(
        '@type' => 'ImageObject',
        'url'   => get_site_icon_url(512),
        'width' => 512,
        'height' => 512,
    );

    // Adicionar organização
    $metadata['publisher']['@type'] = 'Organization';
    $metadata['publisher']['name'] = get_bloginfo('name');

    // Adicionar autor
    if (isset($post)) {
        $metadata['author'] = array(
            '@type' => 'Person',
            'name'  => get_the_author_meta('display_name', $post->post_author),
        );
    }

    return $metadata;
}

/**
 * CSS customizado para páginas AMP
 */
function news_soberano_amp_custom_css() {
    ?>
    /* AMP Custom Styles - News Soberano */

    :root {
        --color-primary-green: #6cb83b;
        --color-primary-brown: #8b6f47;
        --color-white: #ffffff;
        --color-black: #121212;
        --color-gray: #6c757d;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        line-height: 1.6;
        color: #212529;
        background-color: #fff;
    }

    .amp-wp-header {
        background: linear-gradient(135deg, var(--color-primary-green) 0%, var(--color-primary-brown) 100%);
        color: var(--color-white);
        padding: 1rem;
        text-align: center;
    }

    .amp-wp-site-icon {
        display: inline-block;
        margin-bottom: 0.5rem;
    }

    .amp-wp-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
        color: var(--color-white);
    }

    .amp-wp-title a {
        color: var(--color-white);
        text-decoration: none;
    }

    .amp-wp-article {
        max-width: 800px;
        margin: 0 auto;
        padding: 1.5rem;
    }

    .amp-wp-article-header {
        margin-bottom: 2rem;
    }

    .amp-wp-title {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 1rem;
        color: var(--color-black);
    }

    .amp-wp-meta {
        color: var(--color-gray);
        font-size: 0.875rem;
        margin-bottom: 1rem;
    }

    .amp-wp-meta time {
        margin-right: 1rem;
    }

    .amp-wp-byline {
        margin-right: 1rem;
    }

    .amp-wp-article-featured-image {
        margin-bottom: 1.5rem;
    }

    .amp-wp-article-featured-image amp-img {
        width: 100%;
        height: auto;
    }

    .amp-wp-article-content {
        font-size: 1.125rem;
        line-height: 1.8;
    }

    .amp-wp-article-content h2,
    .amp-wp-article-content h3 {
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-weight: 600;
        color: var(--color-black);
    }

    .amp-wp-article-content h2 {
        font-size: 1.75rem;
    }

    .amp-wp-article-content h3 {
        font-size: 1.5rem;
    }

    .amp-wp-article-content p {
        margin-bottom: 1.5rem;
    }

    .amp-wp-article-content amp-img {
        margin: 1.5rem 0;
    }

    .amp-wp-article-content blockquote {
        border-left: 4px solid var(--color-primary-green);
        padding-left: 1.5rem;
        margin: 1.5rem 0;
        font-style: italic;
        color: var(--color-gray);
    }

    .amp-wp-article-content ul,
    .amp-wp-article-content ol {
        margin-bottom: 1.5rem;
        padding-left: 2rem;
    }

    .amp-wp-article-content li {
        margin-bottom: 0.5rem;
    }

    .amp-wp-article-content a {
        color: var(--color-primary-green);
        text-decoration: underline;
    }

    .amp-wp-footer {
        background: linear-gradient(135deg, var(--color-primary-brown) 0%, var(--color-primary-green) 100%);
        color: var(--color-white);
        padding: 2rem 1rem;
        margin-top: 3rem;
        text-align: center;
    }

    .amp-wp-footer p {
        margin: 0.5rem 0;
        font-size: 0.875rem;
    }

    .amp-wp-footer a {
        color: var(--color-white);
        text-decoration: underline;
    }

    /* Categorias */
    .amp-category-badge {
        display: inline-block;
        background: linear-gradient(135deg, var(--color-primary-green) 0%, var(--color-primary-brown) 100%);
        color: var(--color-white);
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 0.5rem;
        text-decoration: none;
    }

    /* Compartilhamento Social */
    .amp-social-share {
        margin: 2rem 0;
        text-align: center;
    }

    .amp-social-share amp-social-share {
        margin: 0 0.5rem;
    }

    /* Posts Relacionados */
    .amp-related-posts {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 2px solid #e9ecef;
    }

    .amp-related-posts h3 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        color: var(--color-black);
    }

    .amp-related-post {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #e9ecef;
    }

    .amp-related-post:last-child {
        border-bottom: none;
    }

    .amp-related-post a {
        text-decoration: none;
        color: var(--color-black);
        font-weight: 600;
    }

    .amp-related-post a:hover {
        color: var(--color-primary-green);
    }
    <?php
}

/**
 * Adicionar Google Analytics ao AMP
 */
function news_soberano_amp_add_analytics($analytics) {
    // Obter ID do Google Analytics (pode ser configurado via Customizer)
    $ga_id = get_theme_mod('news_soberano_ga_id', '');

    if (!empty($ga_id)) {
        $analytics['news-soberano-ga'] = array(
            'type'        => 'googleanalytics',
            'attributes'  => array(),
            'config_data' => array(
                'vars' => array(
                    'account' => $ga_id,
                ),
                'triggers' => array(
                    'trackPageview' => array(
                        'on'      => 'visible',
                        'request' => 'pageview',
                    ),
                ),
            ),
        );
    }

    return $analytics;
}

/**
 * Configurar sanitizadores de conteúdo AMP
 * Garante que imagens e estilos sejam compatíveis com AMP
 */
function news_soberano_amp_content_sanitizers($sanitizers) {
    // Configurar sanitizador de imagens
    if (isset($sanitizers['AMP_Img_Sanitizer'])) {
        $sanitizers['AMP_Img_Sanitizer']['add_dimensions'] = true;
    }

    // Configurar sanitizador de estilos
    if (isset($sanitizers['AMP_Style_Sanitizer'])) {
        $sanitizers['AMP_Style_Sanitizer']['allow_dirty_styles'] = false;
    }

    return $sanitizers;
}
add_filter('amp_content_sanitizers', 'news_soberano_amp_content_sanitizers', 10);

/**
 * Adicionar suporte para Web Stories (AMP Stories)
 */
function news_soberano_amp_stories_support() {
    if (function_exists('amp_is_canonical')) {
        add_post_type_support('web-story', 'amp');
    }
}
add_action('init', 'news_soberano_amp_stories_support');

/**
 * Otimizar carregamento de fontes no AMP
 */
function news_soberano_amp_font_urls($urls) {
    $urls[] = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap';
    return $urls;
}
add_filter('amp_post_template_data', function($data) {
    if (!isset($data['font_urls'])) {
        $data['font_urls'] = array();
    }
    $data['font_urls'] = news_soberano_amp_font_urls($data['font_urls']);
    return $data;
});
