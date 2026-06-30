/* ===================================================================
   ATEMPO — main.js
   - Menú hamburguesa mobile
   - Dots activos del carrusel "Proyectos destacados" (Mobile)
   - Flechas de paginación estricta (Desktop)
   - Header dinámico con sombra al scrollear
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. MENÚ HAMBURGUESA ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('menuNav');

  // Creamos el overlay de fondo dinámicamente
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);

  function openMenu() {
    nav.classList.add('is-open');
    navOverlay.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('is-open');
    navOverlay.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    navOverlay.addEventListener('click', closeMenu);

    // Cerrar el menú al hacer click en un link de navegación
    nav.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ---------- 2. CARRUSEL "PROYECTOS DESTACADOS" ---------- */
  const proyectosCarousel = document.getElementById('proyectosCarousel');
  const proyectosTrack = document.getElementById('proyectosTrack');

  if (proyectosCarousel && proyectosTrack) {

    // --- 2A. LÓGICA MOBILE (Scroll nativo + Dots) ---
    const dotsContainer = document.getElementById('proyectosDots');
    
    if (dotsContainer) {
      const items = Array.from(proyectosTrack.children);
      const dots = Array.from(dotsContainer.children);

      function updateActiveDot() {
        const scrollLeft = proyectosCarousel.scrollLeft;
        const containerCenter = scrollLeft + proyectosCarousel.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        items.forEach((item, index) => {
          const itemCenter = item.offsetLeft + item.offsetWidth / 2;
          const distance = Math.abs(itemCenter - containerCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        dots.forEach((dot, index) => {
          dot.classList.toggle('dots__dot--active', index === closestIndex);
        });
      }

      let scrollTimeout;
      proyectosCarousel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveDot, 60);
      });

      // Inicializar el estado de los dots al cargar
      updateActiveDot();
    }

// --- 2B. LÓGICA DESKTOP (Paginación exacta de a 3) ---
    const prevBtn = document.getElementById('proyectosPrev');
    const nextBtn = document.getElementById('proyectosNext');

    if (prevBtn && nextBtn && proyectosTrack) {
      let isPageTwo = false;

      function updateStrictCarousel() {
        if (isPageTwo) {
          // Se desplaza exactamente un 100% del contenedor + 1 gap (24px)
          proyectosTrack.style.transform = 'translateX(calc(-100% - 24px))';
          
          prevBtn.disabled = false;
          prevBtn.classList.add('carousel-nav__btn--active');
          nextBtn.disabled = true;
          nextBtn.classList.remove('carousel-nav__btn--active');
        } else {
          // Vuelve a la página 1
          proyectosTrack.style.transform = 'translateX(0)';
          
          prevBtn.disabled = true;
          prevBtn.classList.remove('carousel-nav__btn--active');
          nextBtn.disabled = false;
          nextBtn.classList.add('carousel-nav__btn--active');
        }
      }

      nextBtn.addEventListener('click', () => {
        isPageTwo = true;
        updateStrictCarousel();
      });

      prevBtn.addEventListener('click', () => {
        isPageTwo = false;
        updateStrictCarousel();
      });

      // Estado inicial
      updateStrictCarousel();
    }
  }
  /* ---------- 3. HEADER: Sombra sutil al hacer scroll ---------- */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    });
  }

});