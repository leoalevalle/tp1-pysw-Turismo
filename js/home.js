// Cambiar de modo claro a oscuro
const btnTheme = document.getElementById('btn-theme');
const themeIcon = document.getElementById('theme-icon');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
}

btnTheme.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }
});

// VALIDACIÓN EN TIEMPO REAL con jQuery
  $(document).ready(function() {
    const $emailInput = $('#emailInput');
    const $emailFeedback = $('#emailFeedback');
    const $sanitizeMsg = $('#sanitizeMsg');
    const $form = $('#newsletterForm');

    function sanitizeEmail(email) {
      if (!email) return '';
      let sanitized = email.trim();
      sanitized = sanitized.replace(/[<>{}[\]|\\`^&*()=+;:'"?,]/g, '');
      sanitized = sanitized.toLowerCase();
      return sanitized;
    }

    $emailInput.on('input', function() {
      let rawValue = $(this).val();
      let cleanValue = sanitizeEmail(rawValue);
      
      if (rawValue !== cleanValue) {
        $(this).val(cleanValue);
        $sanitizeMsg.html('<i class="bi bi-shield-check"></i> Texto sanitizado').fadeIn(200);
        setTimeout(function() {
          $sanitizeMsg.fadeOut(500);
        }, 1500);
      }
      
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      const isValid = emailPattern.test(cleanValue);
      
      if (!isValid && cleanValue.length > 0) {
        $emailFeedback.fadeIn(200);
        $(this).css('border-color', '#dc3545');
      } else {
        $emailFeedback.fadeOut(200);
        $(this).css('border-color', '#198754');
      }
      
      if (cleanValue.length === 0) {
        $(this).css('border-color', '#ced4da');
      }
    });
    
    $form.on('submit', function(e) {
      e.preventDefault();
      let email = $emailInput.val();
      let cleanEmail = sanitizeEmail(email);
      
      if (!cleanEmail) {
        $emailFeedback.html('<i class="bi bi-exclamation-triangle-fill me-1"></i> El email es requerido').show();
        $emailInput.css('border-color', '#dc3545').focus();
        return false;
      }
      
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      if (!emailPattern.test(cleanEmail)) {
        $emailFeedback.html('<i class="bi bi-exclamation-triangle-fill me-1"></i> Ingresá un email válido (ej: nombre@dominio.com)').show();
        $emailInput.css('border-color', '#dc3545').focus();
        return false;
      }
      
      $emailFeedback.hide();
      $sanitizeMsg.html('<i class="bi bi-check-circle-fill me-1"></i> ¡Suscripción exitosa! Hemos enviado un correo a ' + cleanEmail).fadeIn(300);
      $emailInput.val('');
      $emailInput.css('border-color', '#ced4da');
      
      setTimeout(function() {
        $sanitizeMsg.fadeOut(500);
      }, 4000);
      
      console.log('Email sanitizado y válido:', cleanEmail);
      return true;
    });
    
    $emailInput.on('blur', function() {
      let value = $(this).val();
      let cleanValue = sanitizeEmail(value);
      if (value !== cleanValue) {
        $(this).val(cleanValue);
      }
      $(this).trigger('input');
    });
  });