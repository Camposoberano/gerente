<?php
/**
 * The template for displaying the custom Front Page
 */

get_header();
?>

<main id="primary" class="site-main container">
    
    <!-- SECTION: Hero / Destaques -->
    <section class="home-hero-section">
        <div class="hero-grid">
            <?php
            // Query for the 1 most recent sticky post or just most recent
            $hero_query = new WP_Query( array(
                'posts_per_page' => 1,
                'ignore_sticky_posts' => 1
            ) );

            if ( $hero_query->have_posts() ) :
                while ( $hero_query->have_posts() ) : $hero_query->the_post();
                    get_template_part( 'template-parts/content', 'hero' );
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
            
            <div class="hero-secondary">
                <?php
                // Query for the next 2 posts
                $secondary_query = new WP_Query( array(
                    'posts_per_page' => 2,
                    'offset' => 1,
                    'ignore_sticky_posts' => 1
                ) );

                if ( $secondary_query->have_posts() ) :
                    while ( $secondary_query->have_posts() ) : $secondary_query->the_post();
                        ?>
                        <div class="secondary-card">
                             <?php if ( has_post_thumbnail() ) : ?>
                                <a href="<?php the_permalink(); ?>" class="secondary-thumb">
                                    <?php the_post_thumbnail( 'medium' ); ?>
                                </a>
                            <?php endif; ?>
                            <div class="secondary-info">
                                <span class="sec-cat"><?php $cats = get_the_category(); echo !empty($cats) ? esc_html($cats[0]->name) : ''; ?></span>
                                <h3 class="secondary-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                            </div>
                        </div>
                        <?php
                    endwhile;
                    wp_reset_postdata();
                endif;
                ?>
            </div>
        </div>
    </section>

    <!-- Ad Slot: Leaderboard -->
    <?php if ( is_active_sidebar( 'ad-leaderboard' ) ) : ?>
        <div class="home-ad-break">
            <?php dynamic_sidebar( 'ad-leaderboard' ); ?>
        </div>
    <?php endif; ?>

    <!-- SECTION: Latest News + Sidebar -->
    <div class="content-grid-wrapper">
        <div class="news-feed">
            <h2 class="section-heading">Últimas Notícias</h2>
            <div class="news-list-vertical">
                <?php
                // Main Loop for the rest
                $main_query = new WP_Query( array(
                    'posts_per_page' => 6,
                    'offset' => 3
                ) );

                if ( $main_query->have_posts() ) :
                    while ( $main_query->have_posts() ) : $main_query->the_post();
                        get_template_part( 'template-parts/content', 'list' ); // We will create a list view template
                    endwhile;
                    
                    // Pagination for the main query could go here, but since it's front page custom query, 
                    // usually "Load More" or simple Link to Archive is better.
                    ?>
                    <div class="view-all-btn">
                        <a href="<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>" class="btn">Ver todas as notícias</a>
                    </div>
                    <?php
                else :
                    get_template_part( 'template-parts/content', 'none' );
                endif;
                wp_reset_postdata();
                ?>
            </div>
        </div>
        
        <aside id="secondary" class="widget-area">
            <?php dynamic_sidebar( 'sidebar-1' ); ?>
        </aside><!-- #secondary -->
    </div>

</main><!-- #main -->

<?php
get_footer();
