<?php
/**
 * Template part for displaying the Hero/Featured post
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('hero-card'); ?>>
    <div class="hero-image-wrapper">
        <a href="<?php the_permalink(); ?>">
            <?php 
            if ( has_post_thumbnail() ) {
                the_post_thumbnail( 'large' ); 
            } else {
                // Fallback styling if no image
                echo '<div class="hero-placeholder"></div>';
            }
            ?>
        </a>
    </div>

    <div class="hero-content-overlay">
        <header class="entry-header">
            <?php
            $categories = get_the_category();
            if ( ! empty( $categories ) ) {
                echo '<span class="hero-cat">' . esc_html( $categories[0]->name ) . '</span>';
            }
            ?>
            <h2 class="hero-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <div class="hero-meta">
                <?php echo get_the_date(); ?>
            </div>
        </header>
    </div>
</article>
