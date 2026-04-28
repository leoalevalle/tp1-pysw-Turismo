document.addEventListener("DOMContentLoaded", function () {

  const botones = document.querySelectorAll(".btn-filtro");
  const destinos = document.querySelectorAll(".destino");

  botones.forEach(boton => {
    boton.addEventListener("click", function () {

      let filtro = this.getAttribute("data-filtro");

      // boton
      botones.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline-primary");
      });

      this.classList.remove("btn-outline-primary");
      this.classList.add("btn-primary");

      // FILTRO
      destinos.forEach(destino => {

        if (filtro === "todos") {
          destino.style.display = "block";
        } else {
          if (destino.classList.contains(filtro)) {
            destino.style.display = "block";
          } else {
            destino.style.display = "none";
          }
        }

      });

    });
  });

});