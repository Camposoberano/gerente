<?php
/**
 * Template do formulário de busca
 *
 * @package News_Soberano
 */
?>

<form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>" <?php echo (function_exists('is_amp_endpoint') && is_amp_endpoint()) ? 'target="_top"' : ''; ?>>
    <label for="search-input" class="sr-only">
        <?php _e('Buscar por:', 'news-soberano'); ?>
    </label>
    <div class="search-input-wrapper">
        <input type="search"
               id="search-input"
               class="search-field"
               placeholder="<?php esc_attr_e('Buscar notícias...', 'news-soberano'); ?>"
               value="<?php echo get_search_query(); ?>"
               name="s" />
        <button type="submit" class="search-submit" aria-label="<?php esc_attr_e('Buscar', 'news-soberano'); ?>">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
            <span class="sr-only"><?php _e('Buscar', 'news-soberano'); ?></span>
        </button>
    </div>
</form>
