  $(document).ready(function() {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          if (!counter.classList.contains('animated')) {
            counter.classList.add('animated');
            animateCounter(counter);
          }
          counterObserver.unobserve(counter);
        }
      });
    }, observerOptions);
    
    function animateCounter(counter) {
      const target = parseInt(counter.getAttribute('data-target'));
      let current = 0;
      const increment = target / 60;
      const duration = 2000;
      const stepTime = duration / 60;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    }
    
    document.querySelectorAll('.counter').forEach(counter => {
      counterObserver.observe(counter);
    });
    
    $('.animate-text, .animate-text-delay').css({
      'opacity': '0',
      'transform': 'translateY(30px)'
    });
    
    $('.animate-text').animate({
      opacity: 1,
      transform: 'translateY(0)'
    }, 800);
    
    setTimeout(() => {
      $('.animate-text-delay').animate({
        opacity: 1,
        transform: 'translateY(0)'
      }, 800);
    }, 300);
    
    $('.btn-view-more').on('click', function() {
      const destino = $(this).data('destino');
      alert(`🔍 Explorando más información sobre ${destino}\n👈 Próximamente más detalles de este increíble destino.`);
    });
  });