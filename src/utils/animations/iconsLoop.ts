import 'swiper/css/bundle';

// import { gsap } from 'gsap';
import Swiper from 'swiper/bundle';

export function iconsLoop() {
  const swipers = document.querySelectorAll('.swiper.is-icons');
  swipers.forEach((swiperEl) => {
    new Swiper(swiperEl as HTMLElement, {
      direction: 'horizontal',
      loop: true,
      centeredSlides: false,
      // autoHeight: true,
      spaceBetween: 96,
      speed: 2500,
      autoplay: {
        delay: 0,
        // pauseOnMouseEnter: true,
        // disableOnInteraction: false,
        reverseDirection: true,
      },
      mousewheel: {
        forceToAxis: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 4,
          spaceBetween: 16 * 2,
        },
        768: {
          slidesPerView: 'auto',
          spaceBetween: 16 * 2,
        },
        992: {
          slidesPerView: 'auto',
        },
      },
    });
  });
}
