$(document).ready(function() {
    
    // --- 1. GIRO DE TARJETAS (FLIP) ---
    $('.btn-flip').on('click', function(e) {
        e.preventDefault(); // Evita que la página salte si es un enlace
        // Busca al padre '.agencia-card-inner' de este botón específico y lo gira
        $(this).closest('.agencia-card-inner').toggleClass('is-flipped');
    });

    // --- 2. SISTEMA DE ESTRELLAS (HOVER) ---
    $('.star-item').on('mouseenter', function() {
        let value = $(this).data('value');
        let container = $(this).closest('.rating-stars');

        // Limpia las estrellas de ESTA tarjeta
        container.find('.star-item').removeClass('bi-star-fill text-warning').addClass('bi-star');

        // Pinta hasta la estrella donde está el mouse
        container.find('.star-item').each(function() {
            if ($(this).data('value') <= value) {
                $(this).removeClass('bi-star').addClass('bi-star-fill text-warning');
            }
        });
    });

    // --- 3. SISTEMA DE ESTRELLAS (SALIR DEL HOVER) ---
    $('.rating-stars').on('mouseleave', function() {
        let container = $(this);
        let selectedValue = container.data('selected-value') || 0; // Recupera el voto si ya existe

        // Restaura la vista al voto guardado (o a cero)
        container.find('.star-item').each(function() {
            if ($(this).data('value') <= selectedValue) {
                $(this).removeClass('bi-star').addClass('bi-star-fill text-warning');
            } else {
                $(this).removeClass('bi-star-fill text-warning').addClass('bi-star');
            }
        });
    });

    // --- 4. SISTEMA DE ESTRELLAS (GUARDAR VOTO AL HACER CLIC) ---
    $('.star-item').on('click', function() {
        let value = $(this).data('value');
        let container = $(this).closest('.rating-stars');
        
        // Guarda el valor en el contenedor de ESTA agencia
        container.data('selected-value', value);
        
        let agenciaID = container.data('agencia');
        
        // Opcional: Feedback visual rápido
        alert(`¡Gracias por calificar a ${agenciaID} con ${value} estrellas!`);
    });

});