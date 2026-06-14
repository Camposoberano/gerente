<?php
/**
 * Customizer do tema
 *
 * @package News_Soberano
 */

/**
 * Adicionar configurações do Customizer
 */
function news_soberano_customize_register($wp_customize) {

    // ========================================
    // SEÇÃO: OPÇÕES GERAIS
    // ========================================
    $wp_customize->add_section('news_soberano_general', array(
        'title'    => __('Opções Gerais', 'news-soberano'),
        'priority' => 30,
    ));

    // ========================================
    // SEÇÃO: CORES
    // ========================================
    $wp_customize->add_section('news_soberano_colors', array(
        'title'    => __('Cores do Tema', 'news-soberano'),
        'priority' => 40,
    ));

    // Cor primária verde
    $wp_customize->add_setting('news_soberano_primary_green', array(
        'default'           => '#6cb83b',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
    ));

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'news_soberano_primary_green', array(
        'label'    => __('Cor Verde Primária', 'news-soberano'),
        'section'  => 'news_soberano_colors',
        'settings' => 'news_soberano_primary_green',
    )));

    // Cor primária marrom
    $wp_customize->add_setting('news_soberano_primary_brown', array(
        'default'           => '#8b6f47',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
    ));

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'news_soberano_primary_brown', array(
        'label'    => __('Cor Marrom Primária', 'news-soberano'),
        'section'  => 'news_soberano_colors',
        'settings' => 'news_soberano_primary_brown',
    )));

    // ========================================
    // SEÇÃO: LAYOUT
    // ========================================
    $wp_customize->add_section('news_soberano_layout', array(
        'title'    => __('Layout', 'news-soberano'),
        'priority' => 50,
    ));

    // Mostrar sidebar
    $wp_customize->add_setting('news_soberano_show_sidebar', array(
        'default'           => true,
        'sanitize_callback' => 'news_soberano_sanitize_checkbox',
    ));

    $wp_customize->add_control('news_soberano_show_sidebar', array(
        'label'    => __('Mostrar Sidebar', 'news-soberano'),
        'section'  => 'news_soberano_layout',
        'type'     => 'checkbox',
    ));

    // Container width
    $wp_customize->add_setting('news_soberano_container_width', array(
        'default'           => 1280,
        'sanitize_callback' => 'absint',
        'transport'         => 'postMessage',
    ));

    $wp_customize->add_control('news_soberano_container_width', array(
        'label'       => __('Largura do Container (px)', 'news-soberano'),
        'section'     => 'news_soberano_layout',
        'type'        => 'number',
        'input_attrs' => array(
            'min'  => 960,
            'max'  => 1920,
            'step' => 10,
        ),
    ));

    // ========================================
    // SEÇÃO: HOMEPAGE
    // ========================================
    $wp_customize->add_section('news_soberano_homepage', array(
        'title'    => __('Página Inicial', 'news-soberano'),
        'priority' => 60,
    ));

    // Número de posts por página
    $wp_customize->add_setting('news_soberano_posts_per_page', array(
        'default'           => 12,
        'sanitize_callback' => 'absint',
    ));

    $wp_customize->add_control('news_soberano_posts_per_page', array(
        'label'       => __('Posts por Página', 'news-soberano'),
        'section'     => 'news_soberano_homepage',
        'type'        => 'number',
        'input_attrs' => array(
            'min'  => 6,
            'max'  => 30,
            'step' => 3,
        ),
    ));

    // Layout do grid
    $wp_customize->add_setting('news_soberano_grid_columns', array(
        'default'           => 3,
        'sanitize_callback' => 'absint',
        'transport'         => 'postMessage',
    ));

    $wp_customize->add_control('news_soberano_grid_columns', array(
        'label'       => __('Colunas do Grid', 'news-soberano'),
        'section'     => 'news_soberano_homepage',
        'type'        => 'select',
        'choices'     => array(
            2 => __('2 Colunas', 'news-soberano'),
            3 => __('3 Colunas', 'news-soberano'),
            4 => __('4 Colunas', 'news-soberano'),
        ),
    ));

    // ========================================
    // SEÇÃO: REDES SOCIAIS
    // ========================================
    $wp_customize->add_section('news_soberano_social', array(
        'title'    => __('Redes Sociais', 'news-soberano'),
        'priority' => 70,
    ));

    $social_networks = array(
        'facebook'  => 'Facebook',
        'twitter'   => 'Twitter/X',
        'instagram' => 'Instagram',
        'youtube'   => 'YouTube',
        'linkedin'  => 'LinkedIn',
    );

    foreach ($social_networks as $network => $label) {
        $wp_customize->add_setting('news_soberano_' . $network, array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ));

        $wp_customize->add_control('news_soberano_' . $network, array(
            'label'   => $label . ' ' . __('URL', 'news-soberano'),
            'section' => 'news_soberano_social',
            'type'    => 'url',
        ));
    }

    // ========================================
    // SEÇÃO: FOOTER
    // ========================================
    $wp_customize->add_section('news_soberano_footer', array(
        'title'    => __('Rodapé', 'news-soberano'),
        'priority' => 80,
    ));

    // Texto do copyright
    $wp_customize->add_setting('news_soberano_copyright', array(
        'default'           => '',
        'sanitize_callback' => 'wp_kses_post',
    ));

    $wp_customize->add_control('news_soberano_copyright', array(
        'label'   => __('Texto do Copyright', 'news-soberano'),
        'section' => 'news_soberano_footer',
        'type'    => 'textarea',
    ));
}
add_action('customize_register', 'news_soberano_customize_register');

/**
 * Sanitizar checkbox
 */
function news_soberano_sanitize_checkbox($checked) {
    return ((isset($checked) && true === $checked) ? true : false);
}

/**
 * CSS customizado no head
 */
function news_soberano_customizer_css() {
    $primary_green = get_theme_mod('news_soberano_primary_green', '#6cb83b');
    $primary_brown = get_theme_mod('news_soberano_primary_brown', '#8b6f47');
    $container_width = get_theme_mod('news_soberano_container_width', 1280);
    $grid_columns = get_theme_mod('news_soberano_grid_columns', 3);

    ?>
    <style type="text/css">
        :root {
            --color-primary-green: <?php echo esc_attr($primary_green); ?>;
            --color-primary-brown: <?php echo esc_attr($primary_brown); ?>;
            --container-width: <?php echo absint($container_width); ?>px;
        }
        .news-grid.grid-3 {
            grid-template-columns: repeat(auto-fit, minmax(<?php echo $grid_columns === 2 ? '400px' : ($grid_columns === 4 ? '200px' : '250px'); ?>, 1fr));
        }
    </style>
    <?php
}
add_action('wp_head', 'news_soberano_customizer_css');

/**
 * Preview ao vivo no Customizer
 */
function news_soberano_customizer_live_preview() {
    wp_enqueue_script(
        'news-soberano-customizer',
        NEWS_SOBERANO_URI . '/assets/js/customizer.js',
        array('jquery', 'customize-preview'),
        NEWS_SOBERANO_VERSION,
        true
    );
}
add_action('customize_preview_init', 'news_soberano_customizer_live_preview');
