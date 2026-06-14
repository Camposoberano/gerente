<?php
/**
 * Widget: Trending Topics
 * Mostra tags/tópicos mais populares
 *
 * @package News_Soberano
 * @version 1.3.0
 */

class News_Soberano_Trending_Topics_Widget extends WP_Widget {

    public function __construct() {
        parent::__construct(
            'news_soberano_trending_topics',
            __('🔥 Trending Topics (News Soberano)', 'news-soberano'),
            array('description' => __('Exibe os tópicos mais populares do momento', 'news-soberano'))
        );
    }

    public function widget($args, $instance) {
        echo $args['before_widget'];

        $title = !empty($instance['title']) ? $instance['title'] : __('🔥 Trending Topics', 'news-soberano');
        $number = !empty($instance['number']) ? absint($instance['number']) : 10;
        $orderby = !empty($instance['orderby']) ? $instance['orderby'] : 'count';

        echo $args['before_title'] . esc_html($title) . $args['after_title'];

        // Buscar tags mais usadas
        $tags_args = array(
            'orderby'    => $orderby,
            'order'      => 'DESC',
            'number'     => $number,
            'hide_empty' => true,
        );

        $tags = get_tags($tags_args);

        if ($tags) :
        ?>
            <div class="trending-topics-widget">
                <ul class="trending-topics-list">
                    <?php
                    $index = 1;
                    foreach ($tags as $tag) :
                        $tag_link = get_tag_link($tag->term_id);
                        $post_count = $tag->count;
                        $is_hot = $index <= 3; // Top 3 são "hot"
                    ?>
                        <li class="trending-topic-item <?php echo $is_hot ? 'hot' : ''; ?>">
                            <a href="<?php echo esc_url($tag_link); ?>" class="trending-topic-link">
                                <span class="topic-rank"><?php echo $index; ?></span>
                                <span class="topic-name">#<?php echo esc_html($tag->name); ?></span>
                                <span class="topic-count"><?php echo esc_html($post_count); ?> <?php _e('posts', 'news-soberano'); ?></span>
                            </a>
                        </li>
                    <?php
                        $index++;
                    endforeach;
                    ?>
                </ul>
            </div>
        <?php
        else :
            echo '<p>' . __('Nenhum tópico encontrado.', 'news-soberano') . '</p>';
        endif;

        echo $args['after_widget'];
    }

    public function form($instance) {
        $title = !empty($instance['title']) ? $instance['title'] : __('🔥 Trending Topics', 'news-soberano');
        $number = !empty($instance['number']) ? absint($instance['number']) : 10;
        $orderby = !empty($instance['orderby']) ? $instance['orderby'] : 'count';
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>">
                <?php _e('Título:', 'news-soberano'); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text"
                   value="<?php echo esc_attr($title); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('number')); ?>">
                <?php _e('Número de tópicos:', 'news-soberano'); ?>
            </label>
            <input class="tiny-text" id="<?php echo esc_attr($this->get_field_id('number')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('number')); ?>" type="number"
                   step="1" min="1" max="20" value="<?php echo esc_attr($number); ?>" size="3">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('orderby')); ?>">
                <?php _e('Ordenar por:', 'news-soberano'); ?>
            </label>
            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('orderby')); ?>"
                    name="<?php echo esc_attr($this->get_field_name('orderby')); ?>">
                <option value="count" <?php selected($orderby, 'count'); ?>><?php _e('Mais Usadas', 'news-soberano'); ?></option>
                <option value="name" <?php selected($orderby, 'name'); ?>><?php _e('Nome', 'news-soberano'); ?></option>
            </select>
        </p>
        <?php
    }

    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = !empty($new_instance['title']) ? sanitize_text_field($new_instance['title']) : '';
        $instance['number'] = !empty($new_instance['number']) ? absint($new_instance['number']) : 10;
        $instance['orderby'] = !empty($new_instance['orderby']) ? sanitize_text_field($new_instance['orderby']) : 'count';
        return $instance;
    }
}
