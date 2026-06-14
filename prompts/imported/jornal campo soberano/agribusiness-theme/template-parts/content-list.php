<?php
/**
 * Template part for displaying posts in a horizontal list format
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('list-card'); ?>>
	<div class="list-card-image">
        <?php if ( has_post_thumbnail() ) : ?>
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail( 'thumbnail' ); ?>
            </a>
        <?php endif; ?>
    </div>

	<div class="list-card-content">
        <header class="list-header">
            <?php
            $categories = get_the_category();
            if ( ! empty( $categories ) ) {
                echo '<span class="list-cat">' . esc_html( $categories[0]->name ) . '</span>';
            }
            ?>
            <h3 class="list-title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h3>
        </header>

        <div class="list-excerpt">
            <?php the_excerpt(); ?>
        </div>
        
        <div class="list-meta">
            <?php echo get_the_date(); ?>
        </div>
    </div>
</article>
