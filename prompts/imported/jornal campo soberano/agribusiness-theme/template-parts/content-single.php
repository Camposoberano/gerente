<?php
/**
 * Template part for displaying single post content
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('single-article'); ?>>
    <header class="entry-header">
        <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
        
        <div class="entry-meta">
            <span class="posted-on">📅 <?php echo get_the_date(); ?></span>
            <span class="byline"> ✍️ <?php the_author(); ?></span>
        </div>
    </header><!-- .entry-header -->

    <?php if ( has_post_thumbnail() ) : ?>
    <div class="post-thumbnail-wrapper full-width">
        <?php the_post_thumbnail( 'large' ); ?>
    </div>
    <?php endif; ?>
    
    <!-- Ad Slot: In Article Top -->
    <div class="ad-slot-article-top">
       <!-- Placeholder for Ad Injection or Widget Area -->
    </div>

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

    <footer class="entry-footer">
        <?php
        $categories_list = get_the_category_list( esc_html__( ', ', 'agribusiness' ) );
        if ( $categories_list ) {
            printf( '<span class="cat-links">' . esc_html__( 'Categorias: %1$s', 'agribusiness' ) . '</span>', $categories_list );
        }

        $tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', 'agribusiness' ) );
        if ( $tags_list ) {
            printf( '<span class="tags-links">' . esc_html__( 'Tags: %1$s', 'agribusiness' ) . '</span>', $tags_list );
        }
        ?>
    </footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
