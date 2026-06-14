<?php
/**
 * Template para archives (categorias, tags, autor, data)
 *
 * @package News_Soberano
 */

get_header();
?>

<main id="main" class="site-main archive-page">
    <div class="container">
        <div class="row">
            <div class="col-main">

                <!-- Título do Archive -->
                <header class="archive-header">
                    <?php
                    the_archive_title('<h1 class="archive-title">', '</h1>');
                    the_archive_description('<div class="archive-description">', '</div>');
                    ?>
                </header>

                <?php if (have_posts()) : ?>

                    <div class="news-grid grid grid-3">
                        <?php
                        while (have_posts()) :
                            the_post();
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
                                    if (!empty($categories) && !is_category()) :
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
                                        <?php if (!is_author()) : ?>
                                            <span class="post-author">
                                                <?php _e('Por', 'news-soberano'); ?> <?php the_author(); ?>
                                            </span>
                                            <span>•</span>
                                        <?php endif; ?>
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
                        <p><?php _e('Não há posts nesta categoria ainda.', 'news-soberano'); ?></p>
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
</main>

<?php
get_footer();
