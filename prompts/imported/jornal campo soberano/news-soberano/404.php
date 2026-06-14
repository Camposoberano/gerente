<?php
/**
 * Template para página 404
 *
 * @package News_Soberano
 */

get_header();
?>

<main id="main" class="site-main error-404-page">
    <div class="container">
        <div class="error-404-content">
            <div class="error-404-inner">
                <h1 class="error-404-title">404</h1>
                <h2 class="error-404-subtitle"><?php _e('Página não encontrada', 'news-soberano'); ?></h2>
                <p class="error-404-text">
                    <?php _e('Desculpe, mas a página que você está procurando não existe ou foi movida.', 'news-soberano'); ?>
                </p>

                <!-- Formulário de busca -->
                <div class="error-404-search">
                    <?php get_search_form(); ?>
                </div>

                <!-- Link para home -->
                <div class="error-404-actions">
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-primary">
                        <?php _e('Voltar para a página inicial', 'news-soberano'); ?>
                    </a>
                </div>
            </div>

            <!-- Posts recentes -->
            <?php
            $recent_posts = new WP_Query(array(
                'posts_per_page' => 3,
                'post_status'    => 'publish',
            ));

            if ($recent_posts->have_posts()) :
            ?>
                <div class="error-404-recent">
                    <h3><?php _e('Notícias Recentes', 'news-soberano'); ?></h3>
                    <div class="grid grid-3">
                        <?php
                        while ($recent_posts->have_posts()) :
                            $recent_posts->the_post();
                        ?>
                            <article class="news-card">
                                <?php if (has_post_thumbnail()) : ?>
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail('news-medium', array('class' => 'news-card-image')); ?>
                                    </a>
                                <?php endif; ?>
                                <div class="news-card-content">
                                    <h4 class="news-card-title">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h4>
                                    <div class="news-card-meta">
                                        <span><?php echo get_the_date(); ?></span>
                                    </div>
                                </div>
                            </article>
                        <?php endwhile; ?>
                    </div>
                </div>
            <?php
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </div>
</main>

<?php
get_footer();
