<?php
/**
 * Template part for displaying posts
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('news-card'); ?>>
	<div class="news-card-image">
        <?php if ( has_post_thumbnail() ) : ?>
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail( 'medium' ); ?>
            </a>
        <?php endif; ?>
    </div>

	<div class="news-card-content">
        <header class="entry-header">
            <?php
            if ( is_singular() ) :
                the_title( '<h1 class="entry-title">', '</h1>' );
            else :
                the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
            endif;
            ?>
        </header><!-- .entry-header -->
        
        <div class="entry-meta">
            <?php echo get_the_date(); ?>
        </div>

        <div class="entry-excerpt">
            <?php the_excerpt(); ?>
        </div>
    </div>
</article><!-- #post-<?php the_ID(); ?> -->
