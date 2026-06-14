<?php
/**
 * The template for displaying all pages
 */

get_header();
?>

<main id="primary" class="site-main container">
    <div class="content-grid-wrapper">
        <div class="page-content-area">
            <?php
            while ( have_posts() ) :
                the_post();
                ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <?php if ( ! is_front_page() ) : ?>
                    <header class="entry-header">
                        <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                    </header><!-- .entry-header -->
                    <?php endif; ?>

                    <?php agribusiness_post_thumbnail(); ?>

                    <div class="entry-content">
                        <?php
                        the_content();

                        wp_link_pages(
                            array(
                                'before' => '<div class="page-links">' . esc_html__( 'Páginas:', 'agribusiness' ),
                                'after'  => '</div>',
                            )
                        );
                        ?>
                    </div><!-- .entry-content -->
                </article><!-- #post-<?php the_ID(); ?> -->
                <?php
            endwhile; // End of the loop.
            ?>
        </div>
        
        <aside id="secondary" class="widget-area">
            <?php dynamic_sidebar( 'sidebar-1' ); ?>
        </aside><!-- #secondary -->
    </div>
</main><!-- #main -->

<?php
get_footer();
