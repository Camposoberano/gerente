<?php
/**
 * Template para comentários
 *
 * @package News_Soberano
 */

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area">

    <?php if (have_comments()) : ?>
        <h2 class="comments-title">
            <?php
            $comment_count = get_comments_number();
            printf(
                _n('%s comentário', '%s comentários', $comment_count, 'news-soberano'),
                number_format_i18n($comment_count)
            );
            ?>
        </h2>

        <ol class="comment-list">
            <?php
            wp_list_comments(array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 50,
                'callback'    => 'news_soberano_comment_callback',
            ));
            ?>
        </ol>

        <?php
        the_comments_navigation(array(
            'prev_text' => __('&laquo; Comentários anteriores', 'news-soberano'),
            'next_text' => __('Próximos comentários &raquo;', 'news-soberano'),
        ));
        ?>

    <?php endif; ?>

    <?php if (!comments_open() && get_comments_number() && post_type_supports(get_post_type(), 'comments')) : ?>
        <p class="no-comments"><?php _e('Os comentários estão fechados.', 'news-soberano'); ?></p>
    <?php endif; ?>

    <?php
    comment_form(array(
        'title_reply'          => __('Deixe um comentário', 'news-soberano'),
        'title_reply_to'       => __('Deixe uma resposta para %s', 'news-soberano'),
        'cancel_reply_link'    => __('Cancelar resposta', 'news-soberano'),
        'label_submit'         => __('Enviar comentário', 'news-soberano'),
        'comment_field'        => '<p class="comment-form-comment"><label for="comment">' . __('Comentário', 'news-soberano') . ' <span class="required">*</span></label><textarea id="comment" name="comment" cols="45" rows="8" maxlength="500" required="required"></textarea></p>',
        'submit_button'        => '<button type="submit" class="btn btn-primary">%4$s</button>',
        'class_submit'         => 'submit',
    ));
    ?>

</div>

<?php
/**
 * Callback customizado para comentários
 */
function news_soberano_comment_callback($comment, $args, $depth) {
    $tag = ('div' === $args['style']) ? 'div' : 'li';
    ?>
    <<?php echo $tag; ?> id="comment-<?php comment_ID(); ?>" <?php comment_class(empty($args['has_children']) ? '' : 'parent'); ?>>
        <article id="div-comment-<?php comment_ID(); ?>" class="comment-body">
            <div class="comment-author vcard">
                <?php
                if (0 != $args['avatar_size']) {
                    echo get_avatar($comment, $args['avatar_size']);
                }
                ?>
                <b class="fn"><?php echo get_comment_author_link($comment); ?></b>
                <span class="says"><?php _e('disse:', 'news-soberano'); ?></span>
            </div>

            <div class="comment-metadata">
                <a href="<?php echo esc_url(get_comment_link($comment, $args)); ?>">
                    <time datetime="<?php comment_time('c'); ?>">
                        <?php
                        printf(
                            __('%1$s às %2$s', 'news-soberano'),
                            get_comment_date('', $comment),
                            get_comment_time()
                        );
                        ?>
                    </time>
                </a>
                <?php edit_comment_link(__('Editar', 'news-soberano'), '<span class="edit-link">', '</span>'); ?>
            </div>

            <?php if ('0' == $comment->comment_approved) : ?>
                <p class="comment-awaiting-moderation"><?php _e('Seu comentário está aguardando moderação.', 'news-soberano'); ?></p>
            <?php endif; ?>

            <div class="comment-content">
                <?php comment_text(); ?>
            </div>

            <?php
            comment_reply_link(array_merge($args, array(
                'add_below' => 'div-comment',
                'depth'     => $depth,
                'max_depth' => $args['max_depth'],
                'before'    => '<div class="reply">',
                'after'     => '</div>',
            )));
            ?>
        </article>
    <?php
}
