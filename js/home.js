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

$(document).ready(function() {
    
    // 1. Inicializar todos los Tooltips de Bootstrap en la página
    // Busca cualquier elemento que tenga data-bs-toggle="tooltip"
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // 2. Efecto Hover Dinámico con jQuery para la Tabla
    $('#tabla-destinos tbody tr').hover(
        // Función cuando el mouse ENTRA a la fila
        function() {
            $(this).addClass('table-active'); // Clase de Bootstrap para oscurecer la fila
            $(this).css({
                'cursor': 'pointer',
                'transition': 'all 0.2s ease-in-out'
            });
        }, 
        // Función cuando el mouse SALE de la fila
        function() {
            $(this).removeClass('table-active');
        }
    );
});