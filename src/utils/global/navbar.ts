export function navbarMobile() {
  const isMobile = window.innerWidth < 992;

  if (isMobile) {
    const modal = document.querySelector('.navbar_menu-wrapper') as HTMLElement;
    const overlay = document.querySelector('.navbar_menu-layer') as HTMLElement;
    const btnsOpenModal = document.querySelector('.navbar_menu-button');

    const openModal = function () {
      // Empêcher le scroll du body
      document.body.style.overflow = 'hidden';

      // Afficher les éléments
      modal?.classList.remove('hidden');
      overlay?.classList.remove('hidden');

      // Forcer un reflow puis ajouter les classes d'animation
      requestAnimationFrame(() => {
        overlay?.classList.add('navbar-overlay-visible');
        modal?.classList.add('navbar-modal-visible');
      });
    };

    const closeModal = function () {
      // Remettre le scroll du body
      document.body.style.overflow = '';

      // Retirer les classes d'animation
      overlay?.classList.remove('navbar-overlay-visible');
      modal?.classList.remove('navbar-modal-visible');

      // Attendre la fin de l'animation avant de cacher
      setTimeout(() => {
        modal?.classList.add('hidden');
        overlay?.classList.add('hidden');
      }, 300); // 0.5s pour correspondre à la durée d'animation
    };

    btnsOpenModal?.addEventListener('click', openModal);
    overlay?.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal?.classList.contains('hidden')) {
        closeModal();
      }
    });
  }
}

export function navbarScrollBehavior() {
  const navbar = document.querySelector('.navbar_component') as HTMLElement;
  if (!navbar) return;

  let scrollTimer: ReturnType<typeof setTimeout>;

  const handleScroll = () => {
    // Remettre la navbar à sa position normale et visible quand on scroll
    navbar.style.transform = 'translateY(0)';
    navbar.style.opacity = '1';

    // Réinitialiser le timer
    clearTimeout(scrollTimer);

    // Détecter la fin du scroll
    scrollTimer = setTimeout(() => {
      // Si l'utilisateur est en haut de la page, laisser la navbar visible
      if (window.scrollY === 0) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
      } else {
        // Sinon, positionner la navbar à -10rem quand le scroll s'arrête
        navbar.style.transform = 'translateY(-10rem)';
        navbar.style.opacity = '0';
      }
    }, 2000); // Délai pour détecter la fin du scroll
  };

  // Position initiale : si en haut de page, visible, sinon cachée
  if (window.scrollY === 0) {
    navbar.style.transform = 'translateY(0)';
    navbar.style.opacity = '1';
  } else {
    navbar.style.transform = 'translateY(-10rem)';
    navbar.style.opacity = '0';
  }
  navbar.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';

  // Écouter les événements de scroll
  window.addEventListener('scroll', handleScroll, { passive: true });
}

// Fonction principale pour initialiser toutes les fonctionnalités de la navbar
export function initNavbar() {
  navbarMobile();
  navbarScrollBehavior();
}
