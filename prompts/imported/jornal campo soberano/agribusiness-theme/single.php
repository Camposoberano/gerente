<?php
/**
 * The template for displaying all single posts
 */

get_header();
?>

<main id="primary" class="site-main container">
    <!-- Using same wrapper as HomePage for consistency in CSS Grid/Flex switch -->
    <div class="content-grid-wrapper"> 
        <div class="single-post-content">
            <?php
            while ( have_posts() ) :
                the_post();
                get_template_part( 'template-parts/content', 'single' );

                // Navigation
                the_post_navigation(
                    array(
                        'prev_text' => '<span class="nav-subtitle">' . esc_html__( 'Anterior:', 'agribusiness' ) . '</span> <span class="nav-title">%title</span>',
                        'next_text' => '<span class="nav-subtitle">' . esc_html__( 'Próximo:', 'agribusiness' ) . '</span> <span class="nav-title">%title</span>',
                    )
                );

                // Comments
                if ( comments_open() || get_comments_number() ) :
                    comments_template();
                endif;

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
