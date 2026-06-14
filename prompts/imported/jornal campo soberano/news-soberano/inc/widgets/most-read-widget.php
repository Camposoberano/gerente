<?php
/**
 * Widget Mais Lidas Estilo G1
 *
 * @package News_Soberano
 */

class News_Soberano_Most_Read_Widget extends WP_Widget {

    public function __construct() {
        parent::__construct(
            'news_soberano_most_read',
            __('Mais Lidas (G1 Style)', 'news-soberano'),
            array('description' => __('Exibe os posts mais lidos com numeração estilo G1', 'news-soberano'))
        );
    }

    public function widget($args, $instance) {
        echo $args['before_widget'];

        ?>
        <div class="most-read-widget">
            <?php if (!empty($instance['title'])) : ?>
                <h3 class="widget-title"><?php echo esc_html($instance['title']); ?></h3>
            <?php endif; ?>

            <?php
            $number = !empty($instance['number']) ? absint($instance['number']) : 10;
            $period = !empty($instance['period']) ? $instance['period'] : 'all';

            $args_query = array(
                'posts_per_page' => $number,
                'meta_key'       => 'news_soberano_post_views',
                'orderby'        => 'meta_value_num',
                'order'          => 'DESC',
                'post_status'    => 'publish',
            );

            // Filtrar por período
            if ($period !== 'all') {
                $args_query['date_query'] = array(
                    array(
                        'after' => $period . ' days ago',
                    ),
                );
            }

            $most_read = new WP_Query($args_query);

            if ($most_read->have_posts()) :
            ?>
                <ol class="most-read-list">
                    <?php while ($most_read->have_posts()) : $most_read->the_post(); ?>
                        <li class="most-read-item">
                            <div class="most-read-content">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                <span class="most-read-time">
                                    <?php echo news_soberano_time_ago(get_the_time('U')); ?>
                                </span>
                            </div>
                        </li>
                    <?php endwhile; ?>
                </ol>
            <?php
                wp_reset_postdata();
            else :
                echo '<p>' . __('Nenhum post encontrado.', 'news-soberano') . '</p>';
            endif;
            ?>
        </div>
        <?php

        echo $args['after_widget'];
    }

    public function form($instance) {
        $title = !empty($instance['title']) ? $instance['title'] : __('Mais Lidas', 'news-soberano');
        $number = !empty($instance['number']) ? absint($instance['number']) : 10;
        $period = !empty($instance['period']) ? $instance['period'] : 'all';
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>">
                <?php _e('Título:', 'news-soberano'); ?>
            </label>
            <input class="widefat"
                   id="<?php echo esc_attr($this->get_field_id('title')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('title')); ?>"
                   type="text"
                   value="<?php echo esc_attr($title); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('number')); ?>">
                <?php _e('Número de posts:', 'news-soberano'); ?>
            </label>
            <input class="tiny-text"
                   id="<?php echo esc_attr($this->get_field_id('number')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('number')); ?>"
                   type="number"
                   step="1"
                   min="1"
                   max="20"
                   value="<?php echo esc_attr($number); ?>"
                   size="3">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('period')); ?>">
                <?php _e('Período:', 'news-soberano'); ?>
            </label>
            <select class="widefat"
                    id="<?php echo esc_attr($this->get_field_id('period')); ?>"
                    name="<?php echo esc_attr($this->get_field_name('period')); ?>">
                <option value="all" <?php selected($period, 'all'); ?>>
                    <?php _e('Todos os tempos', 'news-soberano'); ?>
                </option>
                <option value="1" <?php selected($period, '1'); ?>>
                    <?php _e('Últimas 24 horas', 'news-soberano'); ?>
                </option>
                <option value="7" <?php selected($period, '7'); ?>>
                    <?php _e('Últimos 7 dias', 'news-soberano'); ?>
                </option>
                <option value="30" <?php selected($period, '30'); ?>>
                    <?php _e('Últimos 30 dias', 'news-soberano'); ?>
                </option>
            </select>
        </p>
        <?php
    }

    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? sanitize_text_field($new_instance['title']) : '';
        $instance['number'] = (!empty($new_instance['number'])) ? absint($new_instance['number']) : 10;
        $instance['period'] = (!empty($new_instance['period'])) ? sanitize_text_field($new_instance['period']) : 'all';
        return $instance;
    }
}

// Registrar o widget
function news_soberano_register_most_read_widget() {
    register_widget('News_Soberano_Most_Read_Widget');
}
add_action('widgets_init', 'news_soberano_register_most_read_widget');
