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