<?php
/**
 * Breaking News / Últimas Notícias (Estilo G1)
 *
 * @package News_Soberano
 */

$breaking_posts = new WP_Query(array(
    'posts_per_page' => 5,
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'DESC',
));

if ($breaking_posts->have_posts()) :
?>
<div class="breaking-news-bar">
    <div class="container">
        <div class="breaking-news-wrapper">
            <span class="breaking-news-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                ÚLTIMAS NOTÍCIAS
            </span>
            <div class="breaking-news-slider">
                <?php
                while ($breaking_posts->have_posts()) :
                    $breaking_posts->the_post();
                    $time_ago = news_soberano_time_ago(get_the_time('U'));
                ?>
                    <div class="breaking-news-item">
                        <a href="<?php the_permalink(); ?>">
                            <span class="breaking-time"><?php echo esc_html($time_ago); ?></span>
                            <span class="breaking-title"><?php the_title(); ?></span>
                        </a>
                    </div>
                <?php endwhile; ?>
            </div>
            <button class="breaking-news-prev" aria-label="Anterior">‹</button>
            <button class="breaking-news-next" aria-label="Próximo">›</button>
        </div>
    </div>
</div>
<?php
    wp_reset_postdata();
endif;
