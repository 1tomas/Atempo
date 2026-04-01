document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.fade-item');
  let currentSlide = 0;

  function nextSlide() {
    // Quitamos la clase active a la actual
    slides[currentSlide].classList.remove('active');
    
    // Pasamos a la siguiente (o volvemos a la primera)
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Agregamos active a la nueva
    slides[currentSlide].classList.add('active');
  }

  // Cambiar cada 5 segundos
  setInterval(nextSlide, 5000);
});



document.addEventListener('DOMContentLoaded', () => {
  // Inicializar el carrousel táctil
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,      // Ver 1 slide a la vez en móvil
    spaceBetween: 0,       // Sin espacio entre slides
    loop: true,            // Bucle infinito
    grabCursor: true,      // Cambia el cursor a una mano (en desktop)
    pagination: {
      el: ".swiper-pagination",
      clickable: true,     // Los puntos son clickeables
    },
    // Configuración para diferentes anchos de pantalla (Responsive)
    breakpoints: {
      // Cuando la pantalla es >= 768px (Tablet/Desktop)
      768: {
        slidesPerView: 2,  // Ver 2 slides
        spaceBetween: 20,  // Espacio de 20px
      },
      // Cuando la pantalla es >= 1024px
      1024: {
        slidesPerView: 3,  // Ver 3 slides
        spaceBetween: 30,
      },
    },
  });
});