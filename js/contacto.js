$(document).ready(function() {

  // ========== VALIDACIÓN EN TIEMPO REAL ==========
  
  // Campo NOMBRE (mínimo 3 caracteres)
  $('#nombre').on('input', function() {
    let valor = $(this).val();
    if (valor.length >= 3) {
      $(this).removeClass('is-invalid').addClass('is-valid');
    } else {
      $(this).removeClass('is-valid').addClass('is-invalid');
    }
  });

  // Campo EMAIL (debe contener @ y .)
  $('#email').on('input', function() {
    let valor = $(this).val();
    if (valor.includes('@') && valor.includes('.')) {
      $(this).removeClass('is-invalid').addClass('is-valid');
    } else {
      $(this).removeClass('is-valid').addClass('is-invalid');
    }
  });

  // Campo TELÉFONO (solo números, 8 a 15 dígitos)
  $('#telefono').on('input', function() {
    let valor = $(this).val();
    let soloNumeros = /^[0-9]{8,15}$/;
    if (soloNumeros.test(valor)) {
      $(this).removeClass('is-invalid').addClass('is-valid');
    } else {
      $(this).removeClass('is-valid').addClass('is-invalid');
    }
  });

  // Campo MENSAJE (mínimo 10 caracteres)
  $('#mensaje').on('input', function() {
    let valor = $(this).val();
    if (valor.length >= 10) {
      $(this).removeClass('is-invalid').addClass('is-valid');
    } else {
      $(this).removeClass('is-valid').addClass('is-invalid');
    }
  });




$('#formContacto').on('submit', function(e) {
  e.preventDefault();
  
  // Verificar campos inválidos
  let invalidos = $('#nombre, #email, #telefono, #mensaje').filter(function() {
    return $(this).hasClass('is-invalid') || $(this).val().trim() === '';
  }).length;
  
  if (invalidos > 0) {
    alert('Por favor, corrige los campos marcados en rojo.');
    return;
  }
  
  // Mostrar spinner
  $('#btnTexto').addClass('d-none');           
  $('#btnSpinner').removeClass('d-none');     
  $('#btnEnviar').prop('disabled', true);      
    
  // Simular envío
  setTimeout(function() {
    
    // Ocultar spinner
    $('#btnTexto').removeClass('d-none');      
    $('#btnSpinner').addClass('d-none');       
    $('#btnEnviar').prop('disabled', false);   
    
    // Abrir modal
    let modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
    modal.show();
    
    // Limpiar formulario
    $('#formContacto')[0].reset();
    $('#nombre, #email, #telefono, #mensaje').removeClass('is-valid is-invalid');
    
  }, 2000);
  
});

});