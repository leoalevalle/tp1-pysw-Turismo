$(document).ready(function() {
  // ===== FILTRO POR CATEGORÍAS =====
  $('.filter-btn').click(function() {
    // Actualizar botón activo
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    
    const filter = $(this).data('filter');
    
    if (filter === 'todos') {
      $('.post').fadeIn(300).show();
    } else {
      $('.post').each(function() {
        const category = $(this).data('category');
        if (category === filter) {
          $(this).fadeIn(300);
        } else {
          $(this).fadeOut(200);
        }
      });
    }
  });
  
  // ===== ANIMACIONES AL HACER SCROLL (Intersection Observer) =====
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '50px'
  };
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar todos los posts
  document.querySelectorAll('.post').forEach(post => {
    scrollObserver.observe(post);
  });
  
  // También observar la sección de comentarios
  const commentsSection = document.querySelector('.comments-section');
  if (commentsSection) {
    scrollObserver.observe(commentsSection);
  }
  
  // ===== SISTEMA DE COMENTARIOS =====
  $('#commentForm').on('submit', function(e) {
    e.preventDefault();
    
    const userName = $('#userName').val().trim();
    let commentText = $('#commentMessage').val().trim();
    
    // Validación
    if (!userName || userName.length < 3) {
      alert('Por favor, ingresa un nombre de usuario (mínimo 3 caracteres)');
      return;
    }
    
    if (!commentText || commentText.length < 10) {
      alert('El comentario debe tener al menos 10 caracteres');
      return;
    }
    
    // Sanitización básica (evitar HTML)
    const sanitizedName = escapeHtml(userName);
    const sanitizedComment = escapeHtml(commentText);
    
    // Obtener fecha actual
    const now = new Date();
    const timeAgo = 'hace unos segundos';
    
    // Crear nuevo comentario
    const newComment = `
      <div class="comment d-flex gap-3 mb-4 p-3 rounded-3 transition-base" style="background: rgba(var(--bg-color-rgb), 0.08); backdrop-filter: blur(5px); opacity: 0; transform: translateY(20px);">
        <div class="avatar-css flex-shrink-0">
          <i class="bi bi-person-circle fs-1" style="color: #ff9531;"></i>
        </div>
        <div class="comment-body flex-grow-1">
          <div class="d-flex align-items-center gap-2 mb-1">
            <strong style="color: var(--text-color);">@${sanitizedName}</strong>
            <small class="text-muted"><i class="bi bi-clock me-1"></i>${timeAgo}</small>
          </div>
          <p style="color: var(--text-color); opacity: 0.9;">${sanitizedComment}</p>
          <div class="comment-actions mt-2">
            <i class="bi bi-heart me-1" style="cursor: pointer;"></i>
            <small class="text-muted">Responder</small>
          </div>
        </div>
      </div>
    `;
    
    // Agregar al inicio de la lista
    $('.comments-list').prepend(newComment);
    
    // Animar el nuevo comentario
    const $newComment = $('.comments-list .comment').first();
    setTimeout(() => {
      $newComment.css({
        'opacity': '1',
        'transform': 'translateY(0)',
        'transition': 'all 0.5s ease-out'
      });
    }, 50);
    
    // Limpiar formulario
    $('#commentMessage').val('');
    
    // Mostrar mensaje de éxito
    const successMsg = $('<div class="alert alert-success alert-dismissible fade show mt-3" role="alert"><i class="bi bi-check-circle-fill me-2"></i>¡Comentario agregado con éxito!<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>');
    $('.comment-form').append(successMsg);
    
    setTimeout(() => {
      successMsg.fadeOut(500, function() { $(this).remove(); });
    }, 3000);
  });
  
  // Función para sanitizar HTML
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  
  // Efecto de like en comentarios
  $(document).on('click', '.comment-actions i.bi-heart', function() {
    const $heart = $(this);
    if ($heart.hasClass('bi-heart')) {
      $heart.removeClass('bi-heart').addClass('bi-heart-fill text-danger');
      $heart.css('transform', 'scale(1.2)');
      setTimeout(() => $heart.css('transform', 'scale(1)'), 200);
    } else {
      $heart.removeClass('bi-heart-fill text-danger').addClass('bi-heart');
    }
  });
});