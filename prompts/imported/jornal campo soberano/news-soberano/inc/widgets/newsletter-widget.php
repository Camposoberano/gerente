<?php
/**
 * Widget: Newsletter
 * Formulário de inscrição em newsletter
 *
 * @package News_Soberano
 * @version 1.3.0
 */

class News_Soberano_Newsletter_Widget extends WP_Widget {

    public function __construct() {
        parent::__construct(
            'news_soberano_newsletter',
            __('📧 Newsletter (News Soberano)', 'news-soberano'),
            array('description' => __('Formulário de inscrição em newsletter', 'news-soberano'))
        );
    }

    public function widget($args, $instance) {
        echo $args['before_widget'];

        $title = !empty($instance['title']) ? $instance['title'] : __('Receba Notícias', 'news-soberano');
        $description = !empty($instance['description']) ? $instance['description'] : __('Cadastre seu email e receba as últimas notícias', 'news-soberano');
        $button_text = !empty($instance['button_text']) ? $instance['button_text'] : __('Inscrever-se', 'news-soberano');
        $privacy_text = !empty($instance['privacy_text']) ? $instance['privacy_text'] : '';

        echo $args['before_title'] . esc_html($title) . $args['after_title'];
        ?>

        <div class="newsletter-widget">
            <?php if ($description) : ?>
                <p class="newsletter-description"><?php echo esc_html($description); ?></p>
            <?php endif; ?>

            <form class="newsletter-form" id="newsletter-form" method="post" action="<?php echo esc_url(admin_url('admin-ajax.php')); ?>">
                <div class="newsletter-input-group">
                    <input
                        type="email"
                        name="newsletter_email"
                        id="newsletter_email"
                        class="newsletter-input"
                        placeholder="<?php esc_attr_e('Seu melhor email', 'news-soberano'); ?>"
                        required
                        aria-label="<?php esc_attr_e('Email para newsletter', 'news-soberano'); ?>"
                    >
                    <button type="submit" class="newsletter-submit">
                        <span class="submit-text"><?php echo esc_html($button_text); ?></span>
                        <span class="submit-loading" style="display:none;">
                            <span class="spinner"></span>
                        </span>
                    </button>
                </div>

                <?php if ($privacy_text) : ?>
                    <p class="newsletter-privacy"><?php echo esc_html($privacy_text); ?></p>
                <?php endif; ?>

                <div class="newsletter-message" style="display:none;"></div>

                <input type="hidden" name="action" value="news_soberano_newsletter_subscribe">
                <?php wp_nonce_field('newsletter_subscribe', 'newsletter_nonce'); ?>
            </form>
        </div>

        <?php
        echo $args['after_widget'];
    }

    public function form($instance) {
        $title = !empty($instance['title']) ? $instance['title'] : __('Receba Notícias', 'news-soberano');
        $description = !empty($instance['description']) ? $instance['description'] : __('Cadastre seu email e receba as últimas notícias', 'news-soberano');
        $button_text = !empty($instance['button_text']) ? $instance['button_text'] : __('Inscrever-se', 'news-soberano');
        $privacy_text = !empty($instance['privacy_text']) ? $instance['privacy_text'] : '';
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
            <label for="<?php echo esc_attr($this->get_field_id('description')); ?>">
                <?php _e('Descrição:', 'news-soberano'); ?>
            </label>
            <textarea class="widefat" id="<?php echo esc_attr($this->get_field_id('description')); ?>"
                      name="<?php echo esc_attr($this->get_field_name('description')); ?>" rows="3"><?php echo esc_textarea($description); ?></textarea>
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('button_text')); ?>">
                <?php _e('Texto do Botão:', 'news-soberano'); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('button_text')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('button_text')); ?>" type="text"
                   value="<?php echo esc_attr($button_text); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('privacy_text')); ?>">
                <?php _e('Texto de Privacidade (opcional):', 'news-soberano'); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('privacy_text')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('privacy_text')); ?>" type="text"
                   value="<?php echo esc_attr($privacy_text); ?>"
                   placeholder="<?php esc_attr_e('Não compartilhamos seu email', 'news-soberano'); ?>">
        </p>
        <?php
    }

    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = !empty($new_instance['title']) ? sanitize_text_field($new_instance['title']) : '';
        $instance['description'] = !empty($new_instance['description']) ? sanitize_textarea_field($new_instance['description']) : '';
        $instance['button_text'] = !empty($new_instance['button_text']) ? sanitize_text_field($new_instance['button_text']) : '';
        $instance['privacy_text'] = !empty($new_instance['privacy_text']) ? sanitize_text_field($new_instance['privacy_text']) : '';
        return $instance;
    }
}

/**
 * AJAX Handler para inscrição em newsletter
 */
function news_soberano_newsletter_subscribe_handler() {
    // Verificar nonce
    if (!isset($_POST['newsletter_nonce']) || !wp_verify_nonce($_POST['newsletter_nonce'], 'newsletter_subscribe')) {
        wp_send_json_error(array('message' => __('Erro de segurança. Tente novamente.', 'news-soberano')));
    }

    $email = sanitize_email($_POST['newsletter_email']);

    if (!is_email($email)) {
        wp_send_json_error(array('message' => __('Email inválido.', 'news-soberano')));
    }

    // Salvar no banco de dados
    global $wpdb;
    $table_name = $wpdb->prefix . 'newsletter_subscribers';

    // Verificar se já existe
    $exists = $wpdb->get_var($wpdb->prepare(
        "SELECT id FROM $table_name WHERE email = %s",
        $email
    ));

    if ($exists) {
        wp_send_json_error(array('message' => __('Este email já está cadastrado!', 'news-soberano')));
    }

    // Inserir novo inscrito
    $inserted = $wpdb->insert(
        $table_name,
        array(
            'email' => $email,
            'status' => 'active',
            'subscribed_at' => current_time('mysql'),
            'ip_address' => $_SERVER['REMOTE_ADDR']
        ),
        array('%s', '%s', '%s', '%s')
    );

    if ($inserted) {
        // Enviar email de confirmação (opcional)
        $subject = sprintf(__('Inscrição confirmada - %s', 'news-soberano'), get_bloginfo('name'));
        $message = sprintf(
            __("Olá!\n\nSua inscrição em nossa newsletter foi confirmada.\n\nVocê receberá as últimas notícias de %s diretamente no seu email.\n\nObrigado!", 'news-soberano'),
            get_bloginfo('name')
        );
        wp_mail($email, $subject, $message);

        wp_send_json_success(array('message' => __('✅ Inscrição realizada com sucesso!', 'news-soberano')));
    } else {
        wp_send_json_error(array('message' => __('Erro ao cadastrar. Tente novamente.', 'news-soberano')));
    }
}
add_action('wp_ajax_news_soberano_newsletter_subscribe', 'news_soberano_newsletter_subscribe_handler');
add_action('wp_ajax_nopriv_news_soberano_newsletter_subscribe', 'news_soberano_newsletter_subscribe_handler');

/**
 * Criar tabela de newsletter na ativação do tema
 */
function news_soberano_create_newsletter_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'newsletter_subscribers';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        email varchar(255) NOT NULL,
        status varchar(20) NOT NULL DEFAULT 'active',
        subscribed_at datetime NOT NULL,
        ip_address varchar(45) DEFAULT NULL,
        PRIMARY KEY  (id),
        UNIQUE KEY email (email)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
add_action('after_switch_theme', 'news_soberano_create_newsletter_table');
