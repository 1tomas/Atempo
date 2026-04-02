document.addEventListener('DOMContentLoaded', () => {

  // 1. LÓGICA DEL CARRUSEL INICIAL (FADE)
  const diapositivas = document.querySelectorAll('.item-fade');
  let diapositivaActual = 0;

  setInterval(() => {
    diapositivas[diapositivaActual].classList.remove('activo');
    diapositivaActual = (diapositivaActual + 1) % diapositivas.length;
    diapositivas[diapositivaActual].classList.add('activo');
  }, 5000);

  // 2. INICIALIZAR SWIPER
  var swiper = new Swiper(".miSwiper", {
    slidesPerView: 1,
    loop: true,
    pagination: { el: ".swiper-pagination", clickable: true },
  });

  // 3. LÓGICA DEL LIBRO 3D
  const libro = document.getElementById('libro');
  const paginas = document.querySelectorAll('.pagina');
  let inicioToqueX = 0;
  let paginaActual = 0;

  // Asignar z-index inicial correcto
  paginas.forEach((pag, index) => {
      pag.style.zIndex = paginas.length - index;
  });

  libro.addEventListener('touchstart', e => {
      inicioToqueX = e.touches[0].clientX;
  });

  libro.addEventListener('touchend', e => {
      const finToqueX = e.changedTouches[0].clientX;
      const diferencia = inicioToqueX - finToqueX;

      // Avanzar página
      if (diferencia > 50 && paginaActual < paginas.length - 1) {
          paginas[paginaActual].classList.add('volteada');
          const pagVoltear = paginas[paginaActual];
          setTimeout(() => { pagVoltear.style.zIndex = paginaActual; }, 500);
          paginaActual++;
      } 
      // Retroceder página
      else if (diferencia < -50 && paginaActual > 0) {
          paginaActual--;
          paginas[paginaActual].style.zIndex = paginas.length - paginaActual;
          paginas[paginaActual].classList.remove('volteada');
      }
  });

  // 4. CERRAR MENÚ BOOTSTRAP AL HACER CLIC EN UN ENLACE
  const enlacesNav = document.querySelectorAll('.navbar-nav .nav-link');
  const contenidoMenu = document.getElementById('menuNavegacion');
  const menuColapsable = new bootstrap.Collapse(contenidoMenu, { toggle: false });

  enlacesNav.forEach((enlace) => {
    enlace.addEventListener('click', () => {
      if (contenidoMenu.classList.contains('show')) {
        menuColapsable.hide();
      }
    });
  });

});