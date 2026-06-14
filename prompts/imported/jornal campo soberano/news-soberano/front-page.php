<?php
/**
 * Template da Página Inicial (Homepage)
 * Layout estilo grandes portais de notícias
 *
 * @package News_Soberano
 * @version 1.2.0
 */

get_header();

// Breaking News Bar
get_template_part('template-parts/breaking-news');
?>

<main id="main" class="site-main homepage-layout">

    <!-- Hero Section + Grid Principal -->
    <section class="hero-section">
        <div class="container">
            <div class="hero-grid">

                <!-- Notícia Principal (Hero) -->
                <div class="hero-main">
                    <?php
                    // Buscar notícia em destaque
                    $hero_query = new WP_Query(array(
                        'posts_per_page' => 1,
                        'meta_key'       => '_is_ns_featured',
                        'meta_value'     => '1',
                    ));

                    if (!$hero_query->have_posts()) {
                        $hero_query = new WP_Query(array('posts_per_page' => 1));
                    }

                    if ($hero_query->have_posts()) :
                        while ($hero_query->have_posts()) : $hero_query->the_post();
                            $hero_id = get_the_ID();
                    ?>
                        <article class="hero-article">
                            <div class="hero-image">
                                <?php echo news_soberano_get_thumbnail('news-featured'); ?>
                                <?php if (get_post_format() === 'video') : ?>
                                    <span class="post-badge post-badge-video">VÍDEO</span>
                                <?php endif; ?>
                            </div>

                            <div class="hero-content">
                                <?php
                                $categories = get_the_category();
                                if (!empty($categories)) :
                                ?>
                                    <a href="<?php echo esc_url(get_category_link($categories[0]->term_id)); ?>"
                                       class="hero-category">
                                        <?php echo esc_html($categories[0]->name); ?>
                                    </a>
                                <?php endif; ?>

                                <h1 class="hero-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h1>

                                <p class="hero-excerpt">
                                    <?php echo wp_trim_words(get_the_excerpt(), 35); ?>
                                </p>

                                <div class="hero-meta">
                                    <span class="hero-time">
                                        <?php echo news_soberano_time_ago(get_the_time('U')); ?>
                                    </span>
                                    <span class="separator">•</span>
                                    <span class="hero-reading-time">
                                        <?php echo news_soberano_reading_time(); ?>
                                    </span>
                                </div>
                            </div>
                        </article>
                    <?php
                        endwhile;
                        wp_reset_postdata();
                    endif;
                    ?>
                </div>

                <!-- Notícias Secundárias (Grid Lateral) -->
                <div class="hero-sidebar">
                    <?php
                    $args = array(
                        'posts_per_page' => 4,
                        'post_status'    => 'publish',
                        'post__not_in'   => isset($hero_id) ? array($hero_id) : array(),
                    );

                    $sidebar_posts = new WP_Query($args);

                    if ($sidebar_posts->have_posts()) :
                        while ($sidebar_posts->have_posts()) : $sidebar_posts->the_post();
                    ?>
                        <article class="hero-sidebar-post">
                            <a href="<?php the_permalink(); ?>" class="sidebar-post-image">
                                <?php echo news_soberano_get_thumbnail('news-medium'); ?>
                                <?php if (get_post_format() === 'video') : ?>
                                    <span class="post-badge post-badge-video">VÍDEO</span>
                                <?php endif; ?>
                            </a>

                            <div class="sidebar-post-content">
                                <?php
                                $categories = get_the_category();
                                if (!empty($categories)) :
                                ?>
                                    <a href="<?php echo esc_url(get_category_link($categories[0]->term_id)); ?>"
                                       class="sidebar-post-category">
                                        <?php echo esc_html($categories[0]->name); ?>
                                    </a>
                                <?php endif; ?>

                                <h3 class="sidebar-post-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h3>

                                <span class="sidebar-post-time">
                                    <?php echo news_soberano_time_ago(get_the_time('U')); ?>
                                </span>
                            </div>
                        </article>
                    <?php
                        endwhile;
                        wp_reset_postdata();
                    endif;
                    ?>
                </div>

            </div><!-- .hero-grid -->
        </div><!-- .container -->
    </section><!-- .hero-section -->

    <!-- Seção: Não Perca (Destaques Horizontais) -->
    <section class="dont-miss-section">
        <div class="container">
            <h2 class="section-title">
                <span>Não Perca</span>
            </h2>

            <div class="dont-miss-grid">
                <?php
                $dont_miss_query = new WP_Query(array(
                    'posts_per_page' => 6,
                    'post_status'    => 'publish',
                    'offset'         => 5,
                ));

                if ($dont_miss_query->have_posts()) :
                    while ($dont_miss_query->have_posts()) : $dont_miss_query->the_post();
                ?>
                    <article class="dont-miss-post">
                        <a href="<?php the_permalink(); ?>" class="dont-miss-image">
                            <?php echo news_soberano_get_thumbnail('news-medium'); ?>
                            <?php if (get_post_format() === 'video') : ?>
                                <span class="post-badge post-badge-video">VÍDEO</span>
                            <?php endif; ?>
                        </a>

                        <div class="dont-miss-content">
                            <?php
                            $categories = get_the_category();
                            if (!empty($categories)) :
                            ?>
                                <a href="<?php echo esc_url(get_category_link($categories[0]->term_id)); ?>"
                                   class="dont-miss-category">
                                    <?php echo esc_html($categories[0]->name); ?>
                                </a>
                            <?php endif; ?>

                            <h3 class="dont-miss-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h3>

                            <span class="dont-miss-time">
                                <?php echo news_soberano_time_ago(get_the_time('U')); ?>
                            </span>
                        </div>
                    </article>
                <?php
                    endwhile;
                    wp_reset_postdata();
                endif;
                ?>
            </div>
        </div>
    </section>

    <!-- Seção: Vídeos em Destaque -->
    <?php
    $video_query = new WP_Query(array(
        'posts_per_page' => 4,
        'post_status'    => 'publish',
        'tax_query'      => array(
            array(
                'taxonomy' => 'post_format',
                'field'    => 'slug',
                'terms'    => 'post-format-video',
            ),
        ),
    ));

    if ($video_query->have_posts()) :
    ?>
    <section class="videos-section">
        <div class="container">
            <h2 class="section-title">
                <span>Vídeos</span>
                <a href="<?php echo esc_url(get_post_format_link('video')); ?>" class="section-more">
                    Ver todos →
                </a>
            </h2>

            <div class="videos-grid">
                <?php
                while ($video_query->have_posts()) : $video_query->the_post();
                ?>
                    <article class="video-post">
                        <a href="<?php the_permalink(); ?>" class="video-image">
                            <?php echo news_soberano_get_thumbnail('news-large'); ?>
                            <span class="post-badge post-badge-video">VÍDEO</span>
                            <span class="video-play-icon">▶</span>
                        </a>

                        <div class="video-content">
                            <h3 class="video-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h3>

                            <span class="video-time">
                                <?php echo news_soberano_time_ago(get_the_time('U')); ?>
                            </span>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
        </div>
    </section>
    <?php
        wp_reset_postdata();
    endif;
    ?>

    <!-- Seções por Categoria (Já implementado) -->
    <?php get_template_part('template-parts/category-sections'); ?>

    <!-- Seção: Últimas Notícias -->
    <section class="latest-news-section">
        <div class="container">
            <div class="row">
                <div class="col-main">
                    <h2 class="section-title">
                        <span>Últimas Notícias</span>
                    </h2>

                    <div class="latest-news-list">
                        <?php
                        $latest_query = new WP_Query(array(
                            'posts_per_page' => 10,
                            'post_status'    => 'publish',
                            'offset'         => 15,
                        ));

                        if ($latest_query->have_posts()) :
                            while ($latest_query->have_posts()) : $latest_query->the_post();
                        ?>
                            <article class="latest-news-item">
                                <a href="<?php the_permalink(); ?>" class="latest-news-image">
                                    <?php echo news_soberano_get_thumbnail('news-thumb'); ?>
                                </a>

                                <div class="latest-news-content">
                                    <?php
                                    $categories = get_the_category();
                                    if (!empty($categories)) :
                                    ?>
                                        <a href="<?php echo esc_url(get_category_link($categories[0]->term_id)); ?>"
                                           class="latest-news-category">
                                            <?php echo esc_html($categories[0]->name); ?>
                                        </a>
                                    <?php endif; ?>

                                    <h3 class="latest-news-title">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h3>

                                    <p class="latest-news-excerpt">
                                        <?php echo wp_trim_words(get_the_excerpt(), 15); ?>
                                    </p>

                                    <span class="latest-news-time">
                                        <?php echo news_soberano_time_ago(get_the_time('U')); ?>
                                    </span>
                                </div>
                            </article>
                        <?php
                            endwhile;
                            wp_reset_postdata();
                        endif;
                        ?>
                    </div>

                    <!-- Botão Carregar Mais -->
                    <div class="load-more-wrapper">
                        <a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>"
                           class="btn btn-primary load-more-btn">
                            Ver Todas as Notícias →
                        </a>
                    </div>
                </div>

                <!-- Sidebar -->
                <?php if (is_active_sidebar('sidebar-1')) : ?>
                    <aside class="col-sidebar">
                        <?php get_sidebar(); ?>
                    </aside>
                <?php endif; ?>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();
