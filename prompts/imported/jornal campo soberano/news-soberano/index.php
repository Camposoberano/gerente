<?php
/**
 * Template principal
 *
 * @package News_Soberano
 */

get_header();

// Breaking News Bar (Estilo G1)
if (is_home() && !is_paged()) {
    get_template_part('template-parts/breaking-news');
}
?>

<main id="main" class="site-main">
    <div class="container">

        <?php if (is_home() && !is_paged()) : ?>
            <!-- Notícia em Destaque -->
            <?php
            $featured_query = new WP_Query(array(
                'posts_per_page' => 1,
                'meta_key'       => '_is_ns_featured',
                'meta_value'     => '1',
            ));

            if (!$featured_query->have_posts()) {
                $featured_query = new WP_Query(array('posts_per_page' => 1));
            }

            if ($featured_query->have_posts()) :
                while ($featured_query->have_posts()) : $featured_query->the_post();
            ?>
                <div class="featured-news">
                    <article class="featured-main">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail('news-featured', array('class' => 'featured-main-image', 'alt' => get_the_title())); ?>
                        <?php endif; ?>

                        <div class="featured-main-overlay">
                            <?php
                            $categories = get_the_category();
                            if (!empty($categories)) :
                            ?>
                                <span class="news-card-category"><?php echo esc_html($categories[0]->name); ?></span>
                            <?php endif; ?>

                            <h1 class="featured-main-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h1>

                            <p class="featured-main-excerpt">
                                <?php echo wp_trim_words(get_the_excerpt(), 30); ?>
                            </p>

                            <div class="news-card-meta">
                                <span><?php echo get_the_date(); ?></span>
                                <span>•</span>
                                <span><?php echo news_soberano_reading_time(); ?></span>
                            </div>
                        </div>
                    </article>
                </div>
            <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        <?php endif; ?>

        <div class="content-area">
            <div class="row">
                <!-- Conteúdo Principal -->
                <div class="col-main">

                    <?php if (have_posts()) : ?>

                        <div class="news-grid grid grid-3">
                            <?php
                            while (have_posts()) :
                                the_post();

                                // Pular o post destacado na primeira página
                                if (is_home() && !is_paged() && get_query_var('paged') < 1) {
                                    if (isset($featured_query) && $featured_query->have_posts()) {
                                        $featured_query->the_post();
                                        $featured_id = get_the_ID();
                                        wp_reset_postdata();

                                        if (get_the_ID() === $featured_id) {
                                            continue;
                                        }
                                    }
                                }
                            ?>
                                <article id="post-<?php the_ID(); ?>" <?php post_class('news-card'); ?>>
                                    <?php if (has_post_thumbnail()) : ?>
                                        <a href="<?php the_permalink(); ?>">
                                            <?php the_post_thumbnail('news-large', array('class' => 'news-card-image lazyload', 'alt' => get_the_title())); ?>
                                        </a>
                                    <?php endif; ?>

                                    <div class="news-card-content">
                                        <?php
                                        $categories = get_the_category();
                                        if (!empty($categories)) :
                                        ?>
                                            <a href="<?php echo esc_url(get_category_link($categories[0]->term_id)); ?>" class="news-card-category">
                                                <?php echo esc_html($categories[0]->name); ?>
                                            </a>
                                        <?php endif; ?>

                                        <h2 class="news-card-title">
                                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                        </h2>

                                        <div class="news-card-excerpt">
                                            <?php the_excerpt(); ?>
                                        </div>

                                        <div class="news-card-meta">
                                            <span class="post-author">
                                                <?php _e('Por', 'news-soberano'); ?> <?php the_author(); ?>
                                            </span>
                                            <span>•</span>
                                            <span class="post-date"><?php echo get_the_date(); ?></span>
                                            <span>•</span>
                                            <span class="post-reading-time"><?php echo news_soberano_reading_time(); ?></span>
                                        </div>
                                    </div>
                                </article>
                            <?php endwhile; ?>
                        </div>

                        <!-- Paginação -->
                        <div class="pagination">
                            <?php
                            the_posts_pagination(array(
                                'mid_size'  => 2,
                                'prev_text' => __('&laquo; Anterior', 'news-soberano'),
                                'next_text' => __('Próximo &raquo;', 'news-soberano'),
                            ));
                            ?>
                        </div>

                    <?php else : ?>

                        <div class="no-results">
                            <h1><?php _e('Nada encontrado', 'news-soberano'); ?></h1>
                            <p><?php _e('Desculpe, mas nenhum conteúdo foi encontrado. Tente uma busca diferente.', 'news-soberano'); ?></p>
                            <?php get_search_form(); ?>
                        </div>

                    <?php endif; ?>

                </div>

                <!-- Sidebar -->
                <?php if (is_active_sidebar('sidebar-1')) : ?>
                    <aside class="col-sidebar">
                        <?php get_sidebar(); ?>
                    </aside>
                <?php endif; ?>
            </div>
        </div>

    </div>

    <?php
    // Seções por Categoria (Estilo G1)
    if (is_home() && !is_paged()) {
        get_template_part('template-parts/category-sections');
    }
    ?>
</main>

<?php
get_footer();
