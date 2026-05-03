// 1. LÓGICA DEL CARRUSEL INICIAL (FADE PROGRESIVO)
  const diapositivas = document.querySelectorAll('.item-fade');
  let actual = 0;

  function actualizarCarruselFade() {
    // Escenario A: CELULAR (1 sola imagen a la vez)
    if (window.innerWidth < 992) {
      diapositivas.forEach(d => {
        d.style.opacity = '0';
        d.style.left = '0%';
        d.style.width = '100%';
        d.style.zIndex = '1';
      });
      
      diapositivas[actual].style.opacity = '1';
      diapositivas[actual].style.zIndex = '10';
      
      actual = (actual + 1) % diapositivas.length;
    } 
    
    // Escenario B: ESCRITORIO (3 imágenes a la vez)
    else {
      // 1. Apagamos todas al mismo tiempo suavemente
      diapositivas.forEach(d => {
        d.style.opacity = '0';
        d.style.zIndex = '1';
      });

      // 2. Esperamos 1 segundo (lo que dura el fade) para cambiarlas de lugar en la sombra
      setTimeout(() => {
        let izq = actual;
        let centro = (actual + 1) % diapositivas.length;
        let der = (actual + 2) % diapositivas.length;

        // Las ubicamos en sus respectivos tercios
        diapositivas[izq].style.left = '0%';
        diapositivas[centro].style.left = '33.33%';
        diapositivas[der].style.left = '66.66%';

        // Las traemos al frente
        diapositivas[izq].style.zIndex = '10';
        diapositivas[centro].style.zIndex = '10';
        diapositivas[der].style.zIndex = '10';

        // Las encendemos
        diapositivas[izq].style.opacity = '1';
        diapositivas[centro].style.opacity = '1';
        diapositivas[der].style.opacity = '1';

        // Avanzamos el contador de a 3 para cambiar por "otras 3" en el próximo ciclo
        actual = (actual + 3) % diapositivas.length;
      }, 200); 
    }
  }

  // Ejecutamos inmediatamente al cargar la página
  actualizarCarruselFade();
  
  // Repetimos cada 6 segundos (5s de vista + 1s de transición)
  setInterval(actualizarCarruselFade, 7000);

  // 2. INICIALIZAR SWIPER
  var swiper = new Swiper(".miSwiper", {
    slidesPerView: 1,
    loop: true,
    pagination: { el: ".swiper-pagination", clickable: true },
  });

// 3. LÓGICA DEL LIBRO 3D
  const libro = document.getElementById('libro');
  const paginas = document.querySelectorAll('.pagina');
  const indicador = document.getElementById('indicadorDeslizar');
  const btnPrev = document.getElementById('btnPrevLibro'); // Botón Izquierdo
  const btnNext = document.getElementById('btnNextLibro'); // Botón Derecho
  
  let inicioToqueX = 0;
  let paginaActual = 0;

  // Asignar z-index inicial
  paginas.forEach((pag, index) => {
      pag.style.zIndex = paginas.length - index;
  });

  // --- FUNCIONES CENTRALES PARA MOVER EL LIBRO ---
  function avanzarPagina() {
      if (paginaActual < paginas.length - 1) {
          paginas[paginaActual].classList.add('volteada');
          const pagVoltear = paginas[paginaActual];
          setTimeout(() => { pagVoltear.style.zIndex = paginaActual; }, 500);
          paginaActual++;
      }
  }

  function retrocederPagina() {
      if (paginaActual > 0) {
          paginaActual--;
          paginas[paginaActual].style.zIndex = paginas.length - paginaActual;
          paginas[paginaActual].classList.remove('volteada');
      }
  }

  // --- EVENTOS 1: CLICS EN BOTONES (ESCRITORIO) ---
  if (btnNext) btnNext.addEventListener('click', avanzarPagina);
  if (btnPrev) btnPrev.addEventListener('click', retrocederPagina);

  // --- EVENTOS 2: DESLIZAMIENTO TÁCTIL (CELULAR) ---
  libro.addEventListener('touchstart', e => {
      inicioToqueX = e.touches[0].clientX;
      if (indicador && !indicador.classList.contains('oculto')) {
          indicador.classList.add('oculto'); // Oculta la manito
      }
  });

  libro.addEventListener('touchend', e => {
      const finToqueX = e.changedTouches[0].clientX;
      const diferencia = inicioToqueX - finToqueX;

      // Reutilizamos las mismas funciones que usan los botones
      if (diferencia > 50) {
          avanzarPagina();
      } else if (diferencia < -50) {
          retrocederPagina();
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




