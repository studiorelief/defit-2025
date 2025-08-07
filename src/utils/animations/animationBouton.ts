export function cardsIconAnimation() {
  // Ajouter les styles CSS directement via JavaScript
  const style = document.createElement('style');
  style.textContent = `
      .home_explain_cards_icon {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center;
        animation: iconPulse 3s ease-in-out infinite;
      }
  
      .home_explain_cards_icon.is-visible {
        animation: iconPulse 3s ease-in-out infinite, iconBounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
  
      .home_explain_cards_icon:hover {
        animation: iconHover 0.6s ease-in-out infinite alternate;
        cursor: pointer;
      }
  
      .home_explain_cards_icon.is-dancing {
        animation: iconDance 2s ease-in-out infinite;
      }
  
      @keyframes iconPulse {
        0%, 100% { 
          transform: scale(1); 
        }
        25% { 
          transform: scale(1.05) rotate(1deg); 
        }
        50% { 
          transform: scale(1.1) rotate(-1deg); 
        }
        75% { 
          transform: scale(1.05) rotate(0.5deg); 
        }
      }
  
      @keyframes iconBounceIn {
        0% {
          transform: scale(0) rotate(-180deg);
          opacity: 0;
        }
        50% {
          transform: scale(1.2) rotate(-90deg);
          opacity: 0.8;
        }
        80% {
          transform: scale(0.9) rotate(-10deg);
          opacity: 1;
        }
        100% {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }
      }
  
      @keyframes iconHover {
        0% { 
          transform: scale(1.1) rotate(-3deg); 
        }
        100% { 
          transform: scale(1.2) rotate(3deg); 
        }
      }
  
      @keyframes iconDance {
        0%, 100% { 
          transform: scale(1) rotate(0deg); 
        }
        10% { 
          transform: scale(1.1) rotate(5deg); 
        }
        20% { 
          transform: scale(0.95) rotate(-5deg); 
        }
        30% { 
          transform: scale(1.15) rotate(3deg); 
        }
        40% { 
          transform: scale(0.9) rotate(-3deg); 
        }
        50% { 
          transform: scale(1.2) rotate(7deg); 
        }
        60% { 
          transform: scale(0.85) rotate(-7deg); 
        }
        70% { 
          transform: scale(1.1) rotate(2deg); 
        }
        80% { 
          transform: scale(0.95) rotate(-2deg); 
        }
        90% { 
          transform: scale(1.05) rotate(1deg); 
        }
      }
    `;
  document.head.appendChild(style);

  // Intersection Observer pour déclencher l'animation à l'entrée dans le viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const icon = entry.target as HTMLElement;
          icon.classList.add('is-visible');

          // Déclencher une "dance" aléatoire après l'animation d'entrée
          setTimeout(() => {
            if (Math.random() > 0.7) {
              // 30% de chance
              icon.classList.add('is-dancing');
              setTimeout(() => {
                icon.classList.remove('is-dancing');
              }, 2000);
            }
          }, 800);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  // Observer tous les éléments .home_explain_cards_icon
  const icons = document.querySelectorAll('.home_explain_cards_icon');
  icons.forEach((icon) => {
    observer.observe(icon);

    // Ajouter des interactions supplémentaires
    let danceInterval: number;

    icon.addEventListener('mouseenter', () => {
      // Déclencher une dance au hover (chance plus élevée)
      if (Math.random() > 0.4) {
        // 60% de chance
        (icon as HTMLElement).classList.add('is-dancing');
        setTimeout(() => {
          (icon as HTMLElement).classList.remove('is-dancing');
        }, 2000);
      }
    });

    // Animation aléatoire périodique
    const randomDance = () => {
      if (Math.random() > 0.9) {
        // 10% de chance toutes les 5 secondes
        (icon as HTMLElement).classList.add('is-dancing');
        setTimeout(() => {
          (icon as HTMLElement).classList.remove('is-dancing');
        }, 2000);
      }
    };

    // Démarrer l'animation aléatoire après un délai initial
    setTimeout(() => {
      danceInterval = window.setInterval(randomDance, 5000);
    }, 2000);

    // Nettoyer l'interval si l'élément est retiré du DOM
    icon.addEventListener('remove', () => {
      if (danceInterval) {
        clearInterval(danceInterval);
      }
    });
  });

  // Fonction pour déclencher manuellement la dance sur tous les icônes
  (window as any).triggerIconDance = () => {
    icons.forEach((icon) => {
      (icon as HTMLElement).classList.add('is-dancing');
      setTimeout(() => {
        (icon as HTMLElement).classList.remove('is-dancing');
      }, 2000);
    });
  };

  console.log(
    '🎉 Animation des icônes cards activée! Tapez triggerIconDance() dans la console pour déclencher la dance manuellement.'
  );
}
