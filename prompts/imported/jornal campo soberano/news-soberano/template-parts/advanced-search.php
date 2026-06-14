<?php
/**
 * Advanced Search Form
 * @version 1.3.0
 */
?>
<div class="advanced-search-form">
    <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
        <div class="search-fields">
            <input type="search" name="s" placeholder="<?php esc_attr_e('Buscar notícias...', 'news-soberano'); ?>" value="<?php echo get_search_query(); ?>" required>

            <select name="cat">
                <option value=""><?php _e('Todas as categorias', 'news-soberano'); ?></option>
                <?php
                $categories = get_categories();
                foreach ($categories as $cat) {
                    $selected = (isset($_GET['cat']) && $_GET['cat'] == $cat->term_id) ? 'selected' : '';
                    echo '<option value="' . esc_attr($cat->term_id) . '" ' . $selected . '>' . esc_html($cat->name) . '</option>';
                }
                ?>
            </select>

            <select name="orderby">
                <option value="date" <?php selected(isset($_GET['orderby']) ? $_GET['orderby'] : '', 'date'); ?>><?php _e('Mais recentes', 'news-soberano'); ?></option>
                <option value="relevance" <?php selected(isset($_GET['orderby']) ? $_GET['orderby'] : '', 'relevance'); ?>><?php _e('Mais relevantes', 'news-soberano'); ?></option>
            </select>

            <button type="submit" class="search-submit"><?php _e('Buscar', 'news-soberano'); ?></button>
        </div>
    </form>
</div>
