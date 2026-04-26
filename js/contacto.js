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

});