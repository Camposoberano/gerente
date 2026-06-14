/**
 * Newsletter Form Handler
 *
 * @package News_Soberano
 * @version 1.3.0
 */

(function() {
    'use strict';

    // Aguardar DOM carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewsletter);
    } else {
        initNewsletter();
    }

    function initNewsletter() {
        const form = document.getElementById('newsletter-form');
        if (!form) return;

        form.addEventListener('submit', handleSubmit);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector('.newsletter-submit');
        const messageBox = form.querySelector('.newsletter-message');
        const emailInput = form.querySelector('#newsletter_email');

        // Validar email
        if (!emailInput.validity.valid) {
            showMessage(messageBox, 'Por favor, insira um email válido', 'error');
            return;
        }

        // Mostrar loading
        submitBtn.classList.add('loading');
        messageBox.style.display = 'none';

        // Enviar via AJAX
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(data => {
            submitBtn.classList.remove('loading');

            if (data.success) {
                showMessage(messageBox, data.data.message, 'success');
                form.reset();

                // Esconder mensagem após 5 segundos
                setTimeout(() => {
                    messageBox.style.display = 'none';
                }, 5000);
            } else {
                showMessage(messageBox, data.data.message, 'error');
            }
        })
        .catch(error => {
            submitBtn.classList.remove('loading');
            showMessage(messageBox, 'Erro ao enviar. Tente novamente.', 'error');
            console.error('Newsletter error:', error);
        });
    }

    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = 'newsletter-message ' + type;
        element.style.display = 'block';
    }
})();
