/**
 * MAHA PRASADA - RESTAURANTE VEGANO
 * Lógica e Interactividad en el Frontend (script.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // === 1. Navbar dinámico al hacer scroll ===
  const navbar = document.getElementById('mainNavbar');
  
  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };

  // Ejecutar al cargar la página por si se inicia con scroll previo
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll);


  // === 2. Animaciones al hacer Scroll (Intersection Observer) ===
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Dejar de observar una vez animado
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Se activa cuando el 15% del elemento es visible
    rootMargin: '0px 0px -50px 0px' // Margen de compensación inferior
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  // === 3. Auto-colapsar menú de navegación móvil al hacer clic ===
  const navLinks = document.querySelectorAll('.nav-link-custom:not(.btn)');
  const navbarCollapse = document.getElementById('navbarContent');
  
  // Instancia del colapsador de Bootstrap 5
  let bsCollapse = null;
  if (navbarCollapse) {
    bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Verificar si el menú colapsable está desplegado (clase 'show') en móvil
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    });
  });


  // === 4. Scroll Spy personalizado (Resaltar enlace activo) ===
  const sections = document.querySelectorAll('section');
  
  const scrollSpy = () => {
    const scrollPosition = window.scrollY + 100; // Offset para mayor exactitud

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);
});
