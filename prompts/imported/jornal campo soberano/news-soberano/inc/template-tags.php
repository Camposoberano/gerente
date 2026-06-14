<?php
/**
 * Template Tags personalizadas
 *
 * @package News_Soberano
 */

/**
 * Timestamp relativo estilo G1 (há X minutos)
 */
function news_soberano_time_ago($timestamp) {
    $time_ago = current_time('timestamp') - $timestamp;

    if ($time_ago < 60) {
        return __('agora', 'news-soberano');
    } elseif ($time_ago < 3600) {
        $minutes = floor($time_ago / 60);
        return sprintf(_n('há %s minuto', 'há %s minutos', $minutes, 'news-soberano'), $minutes);
    } elseif ($time_ago < 86400) {
        $hours = floor($time_ago / 3600);
        return sprintf(_n('há %s hora', 'há %s horas', $hours, 'news-soberano'), $hours);
    } elseif ($time_ago < 604800) {
        $days = floor($time_ago / 86400);
        return sprintf(_n('há %s dia', 'há %s dias', $days, 'news-soberano'), $days);
    } else {
        return date_i18n(get_option('date_format'), $timestamp);
    }
}

/**
 * Exibir breadcrumbs manual (fallback se Rank Math não estiver ativo)
 */
function news_soberano_breadcrumbs() {
    if (function_exists('rank_math_the_breadcrumbs')) {
        return;
    }

    if (is_front_page()) {
        return;
    }

    $separator = ' &raquo; ';
    $home_title = __('Início', 'news-soberano');

    echo '<nav class="breadcrumbs" aria-label="' . esc_attr__('Breadcrumb', 'news-soberano') . '">';
    echo '<a href="' . esc_url(home_url('/')) . '">' . esc_html($home_title) . '</a>';

    if (is_category() || is_single()) {
        echo $separator;
        the_category(', ');
        if (is_single()) {
            echo $separator;
            the_title();
        }
    } elseif (is_page()) {
        if (wp_get_post_parent_id(get_the_ID())) {
            $parent_id = wp_get_post_parent_id(get_the_ID());
            $breadcrumbs = array();
            while ($parent_id) {
                $page = get_post($parent_id);
                $breadcrumbs[] = '<a href="' . esc_url(get_permalink($page->ID)) . '">' . esc_html(get_the_title($page->ID)) . '</a>';
                $parent_id = $page->post_parent;
            }
            $breadcrumbs = array_reverse($breadcrumbs);
            foreach ($breadcrumbs as $crumb) {
                echo $separator . $crumb;
            }
        }
        echo $separator;
        the_title();
    } elseif (is_search()) {
        echo $separator . __('Resultados de busca para:', 'news-soberano') . ' "' . get_search_query() . '"';
    } elseif (is_404()) {
        echo $separator . __('Erro 404', 'news-soberano');
    }

    echo '</nav>';
}

/**
 * Exibir views formatadas
 */
function news_soberano_post_views() {
    $views = news_soberano_get_post_views(get_the_ID());

    if ($views < 1000) {
        return number_format($views);
    } elseif ($views < 1000000) {
        return number_format($views / 1000, 1) . 'k';
    } else {
        return number_format($views / 1000000, 1) . 'M';
    }
}

/**
 * Exibir meta do post
 */
function news_soberano_post_meta() {
    ?>
    <div class="entry-meta">
        <span class="posted-on">
            <time datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                <?php echo esc_html(get_the_date()); ?>
            </time>
        </span>
        <span class="byline">
            <?php _e('por', 'news-soberano'); ?>
            <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>">
                <?php echo esc_html(get_the_author()); ?>
            </a>
        </span>
    </div>
    <?php
}

/**
 * Exibir categorias com cores
 */
function news_soberano_category_badge($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }

    $categories = get_the_category($post_id);
    if (empty($categories)) {
        return;
    }

    $category = $categories[0];
    $color = get_term_meta($category->term_id, 'category_color', true);
    $style = $color ? 'style="background-color: ' . esc_attr($color) . ';"' : '';

    echo '<a href="' . esc_url(get_category_link($category->term_id)) . '" class="category-badge" ' . $style . '>';
    echo esc_html($category->name);
    echo '</a>';
}

/**
 * Paginação customizada
 */
function news_soberano_pagination() {
    global $wp_query;

    if ($wp_query->max_num_pages <= 1) {
        return;
    }

    $paged = get_query_var('paged') ? absint(get_query_var('paged')) : 1;
    $max = intval($wp_query->max_num_pages);

    if ($paged >= 1) {
        $links[] = $paged;
    }

    if ($paged >= 3) {
        $links[] = $paged - 1;
        $links[] = $paged - 2;
    }

    if (($paged + 2) <= $max) {
        $links[] = $paged + 2;
        $links[] = $paged + 1;
    }

    echo '<nav class="pagination" aria-label="' . esc_attr__('Navegação de páginas', 'news-soberano') . '"><ul>' . "\n";

    // Link anterior
    if (get_previous_posts_link()) {
        printf('<li>%s</li>' . "\n", get_previous_posts_link('&laquo; ' . __('Anterior', 'news-soberano')));
    }

    // Link para primeira página
    if (!in_array(1, $links)) {
        $class = 1 == $paged ? ' class="active"' : '';
        printf('<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url(get_pagenum_link(1)), '1');

        if (!in_array(2, $links)) {
            echo '<li><span>...</span></li>';
        }
    }

    // Links
    sort($links);
    foreach ((array) $links as $link) {
        $class = $paged == $link ? ' class="active"' : '';
        printf('<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url(get_pagenum_link($link)), $link);
    }

    // Link para última página
    if (!in_array($max, $links)) {
        if (!in_array($max - 1, $links)) {
            echo '<li><span>...</span></li>' . "\n";
        }

        $class = $paged == $max ? ' class="active"' : '';
        printf('<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url(get_pagenum_link($max)), $max);
    }

    // Link próximo
    if (get_next_posts_link()) {
        printf('<li>%s</li>' . "\n", get_next_posts_link(__('Próximo', 'news-soberano') . ' &raquo;'));
    }

    echo '</ul></nav>' . "\n";
}

/**
 * Exibir ícones de redes sociais
 */
function news_soberano_social_links() {
    $networks = array(
        'facebook'  => array('name' => 'Facebook', 'icon' => 'facebook'),
        'twitter'   => array('name' => 'Twitter', 'icon' => 'twitter'),
        'instagram' => array('name' => 'Instagram', 'icon' => 'instagram'),
        'youtube'   => array('name' => 'YouTube', 'icon' => 'youtube'),
        'linkedin'  => array('name' => 'LinkedIn', 'icon' => 'linkedin'),
    );

    $has_links = false;
    foreach ($networks as $network => $data) {
        if (get_theme_mod('news_soberano_' . $network)) {
            $has_links = true;
            break;
        }
    }

    if (!$has_links) {
        return;
    }

    echo '<div class="social-links">';
    foreach ($networks as $network => $data) {
        $url = get_theme_mod('news_soberano_' . $network);
        if ($url) {
            printf(
                '<a href="%s" target="_blank" rel="noopener noreferrer" aria-label="%s" class="social-link social-link-%s">
                    <span class="sr-only">%s</span>
                </a>',
                esc_url($url),
                esc_attr($data['name']),
                esc_attr($network),
                esc_html($data['name'])
            );
        }
    }
    echo '</div>';
}

/**
 * Tempo estimado de leitura com ícone
 */
function news_soberano_reading_time_with_icon() {
    echo '<span class="reading-time">';
    echo '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">';
    echo '<circle cx="12" cy="12" r="10"></circle>';
    echo '<polyline points="12 6 12 12 16 14"></polyline>';
    echo '</svg> ';
    echo news_soberano_reading_time();
    echo '</span>';
}

/**
 * Post navigation (anterior/próximo)
 */
function news_soberano_post_navigation() {
    $prev_post = get_previous_post();
    $next_post = get_next_post();

    if (!$prev_post && !$next_post) {
        return;
    }

    ?>
    <nav class="post-navigation" aria-label="<?php esc_attr_e('Navegação de posts', 'news-soberano'); ?>">
        <div class="nav-links">
            <?php if ($prev_post) : ?>
                <div class="nav-previous">
                    <a href="<?php echo esc_url(get_permalink($prev_post)); ?>" rel="prev">
                        <span class="nav-subtitle">&laquo; <?php _e('Anterior', 'news-soberano'); ?></span>
                        <span class="nav-title"><?php echo esc_html(get_the_title($prev_post)); ?></span>
                    </a>
                </div>
            <?php endif; ?>

            <?php if ($next_post) : ?>
                <div class="nav-next">
                    <a href="<?php echo esc_url(get_permalink($next_post)); ?>" rel="next">
                        <span class="nav-subtitle"><?php _e('Próximo', 'news-soberano'); ?> &raquo;</span>
                        <span class="nav-title"><?php echo esc_html(get_the_title($next_post)); ?></span>
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </nav>
    <?php
}
