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
