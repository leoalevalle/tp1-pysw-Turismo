$(document).ready(function () {
  const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
  welcomeModal.show();

  document.getElementById('welcomeModal').addEventListener('hidden.bs.modal', function () {
    $("#mainContent").fadeIn(500);
  });

  $("#loginForm").submit(function (e) {
    e.preventDefault();
    alert("⚠️ Esto es una simulación educativa.\n\nEn un sitio real, tus datos habrían sido capturados por el atacante.");
    $(this).trigger("reset");
  });

  $("#quizPhishing").submit(function (e) {
    e.preventDefault();
    
    let seleccionados = $("#quizPhishing input:checked");
    let correctas = 0;
    let errorCritico = false;

    seleccionados.each(function () {
      let val = $(this).val();
      if (val === "1" || val === "2") {
        correctas++;
      } else if (val === "0") {
        errorCritico = true;
      }
    });

    const $resultado = $("#resultado");
    if (correctas === 2 && !errorCritico) {
      $resultado.html(`
        <div class="alert alert-success d-flex align-items-center">
          <i class="bi bi-check-circle-fill me-2"></i>
          <div><strong>¡Excelente!</strong> Identificaste la URL falsa y la presión por urgencia.</div>
        </div>`);
    } else if (errorCritico) {
      $resultado.html(`
        <div class="alert alert-danger">
          <strong>❌ Error de seguridad:</strong> Marcar un mensaje como "normal" cuando tiene señales de fraude es peligroso.
        </div>`);
    } else {
      $resultado.html(`
        <div class="alert alert-warning">
          <strong>⚠️ Te faltaron señales:</strong> Revisa de nuevo el mensaje. ¿La URL termina en .xyz? ¿Te están amenazando con bloquear la cuenta?
        </div>`);
    }
  });

  $("#btnEntendido").click(function () {
    let phishingModal = bootstrap.Modal.getInstance(document.getElementById('phishingModal'));
    phishingModal.hide();
  });

  $('#quizPhishing').on('submit', function(e) {
    e.preventDefault();
    
    const urlChecked = $('#checkUrl').is(':checked');
    const urgenciaChecked = $('#checkUrgencia').is(':checked');
    const datosChecked = $('#checkDatos').is(':checked');
    const normalChecked = $('#checkNormal').is(':checked');
    
    const $resultado = $('#resultadoQuiz');
    
    const aciertos = [];
    const errores = [];
    
    if (urlChecked) aciertos.push('URL sospechosa');
    else errores.push('No marcaste la URL sospechosa');
    
    if (urgenciaChecked) aciertos.push('Mensaje urgente');
    else errores.push('No marcaste el mensaje urgente');
    
    if (datosChecked) aciertos.push('Solicitud de datos sensibles');
    else errores.push('No marcaste la solicitud de datos sensibles');
    
    if (!normalChecked) aciertos.push('Reconociste que NO es un mensaje normal');
    else errores.push('Marcaste "mensaje normal" - ¡INCORRECTO! Este mensaje es fraudulento');
    
    if (aciertos.length >= 3 && !normalChecked) {
      $resultado.removeClass('incorrecto').addClass('correcto');
      $resultado.html(`
        <div class="d-flex align-items-start">
          <i class="fas fa-check-circle fs-4 me-3 text-success"></i>
          <div>
            <strong class="d-block">✅ ¡RESPUESTA CORRECTA!</strong>
            <span>Identificaste correctamente las señales de phishing:</span>
            <ul class="mb-0 mt-2">
              ${aciertos.map(a => `<li><i class="fas fa-check text-success me-2"></i>${a}</li>`).join('')}
            </ul>
            <div class="mt-2 small text-success">
              ¡Excelente! Así es como se detecta un intento de phishing.
            </div>
          </div>
        </div>
      `);
    } else {
      $resultado.removeClass('correcto').addClass('incorrecto');
      $resultado.html(`
        <div class="d-flex align-items-start">
          <i class="fas fa-exclamation-triangle fs-4 me-3 text-danger"></i>
          <div>
            <strong class="d-block">⚠️ ¡REVISÁ TU RESPUESTA!</strong>
            <span>Un correo de phishing tiene estas características:</span>
            <ul class="mb-0 mt-2">
              <li><i class="fas fa-link text-danger me-2"></i>URL falsa o sospechosa</li>
              <li><i class="fas fa-clock text-danger me-2"></i>Mensaje urgente para que actúes rápido</li>
              <li><i class="fas fa-lock text-danger me-2"></i>Solicitud de datos personales o contraseña</li>
            </ul>
            <div class="mt-2 small text-danger">
              📚 Recordá: Si ves estas señales, ¡NO hagas clic! Reportá el correo.
            </div>
          </div>
        </div>
      `);
    }
    
    $resultado.fadeIn(300);
    
    $('html, body').animate({
      scrollTop: $resultado.offset().top - 100
    }, 300);
  });
  
  $('#btnMasInfo').on('click', function() {
    alert('🔐 RECURSOS ADICIONALES:\n\n• Reportá phishing a: seguridad@unju.edu.ar\n• Más info: www.unju.edu.ar/seguridad\n• Activá la verificación en dos pasos\n\n¡La seguridad es responsabilidad de todos!');
  });
  
  $('#phishingModal').on('hidden.bs.modal', function() {
    $('#quizPhishing')[0].reset();
    $('#resultadoQuiz').fadeOut(200).html('');
  });
});