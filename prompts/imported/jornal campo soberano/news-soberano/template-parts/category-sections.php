<?php
/**
 * Seções por Categoria (Estilo G1)
 *
 * @package News_Soberano
 */

$featured_categories = get_terms(array(
    'taxonomy'   => 'category',
    'hide_empty' => true,
    'number'     => 6,
    'orderby'    => 'count',
    'order'      => 'DESC',
));

if (!empty($featured_categories) && !is_wp_error($featured_categories)) :
?>
<div class="category-sections">
    <?php foreach ($featured_categories as $index => $category) :
        $cat_posts = new WP_Query(array(
            'cat'            => $category->term_id,
            'posts_per_page' => 4,
            'post_status'    => 'publish',
        ));

        if ($cat_posts->have_posts()) :
            $cat_color = get_term_meta($category->term_id, 'category_color', true);
            if (!$cat_color) {
                $colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
                $cat_color = $colors[$index % count($colors)];
            }
    ?>
        <section class="category-section">
            <div class="container">
                <div class="category-section-header" style="border-left-color: <?php echo esc_attr($cat_color); ?>;">
                    <h2 class="category-section-title">
                        <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>"
                           style="color: <?php echo esc_attr($cat_color); ?>;">
                            <?php echo esc_html($category->name); ?>
                        </a>
                    </h2>
                    <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>" class="category-section-more">
                        Ver tudo →
                    </a>
                </div>

                <div class="category-section-grid">
                    <?php
                    $post_count = 0;
                    while ($cat_posts->have_posts()) :
                        $cat_posts->the_post();
                        $post_count++;
                        $is_featured = ($post_count === 1);
                    ?>
                        <article class="category-post <?php echo $is_featured ? 'category-post-featured' : ''; ?>">
                            <?php if (has_post_thumbnail()) : ?>
                                <a href="<?php the_permalink(); ?>" class="category-post-image">
                                    <?php
                                    the_post_thumbnail(
                                        $is_featured ? 'news-large' : 'news-medium',
                                        array('alt' => get_the_title())
                                    );
                                    ?>
                                    <?php if (get_post_format() === 'video') : ?>
                                        <span class="post-badge post-badge-video">VÍDEO</span>
                                    <?php endif; ?>
                                </a>
                            <?php endif; ?>

                            <div class="category-post-content">
                                <h3 class="category-post-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h3>

                                <?php if ($is_featured) : ?>
                                    <p class="category-post-excerpt">
                                        <?php echo wp_trim_words(get_the_excerpt(), 20); ?>
                                    </p>
                                <?php endif; ?>

                                <div class="category-post-meta">
                                    <time><?php echo news_soberano_time_ago(get_the_time('U')); ?></time>
                                </div>
                            </div>
                        </article>
                    <?php endwhile; ?>
                </div>
            </div>
        </section>
    <?php
        endif;
        wp_reset_postdata();
    endforeach;
    ?>
</div>
<?php endif; ?>
