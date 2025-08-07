import 'swiper/css/bundle';

// import { gsap } from 'gsap';
import Swiper from 'swiper/bundle';

export const wearablesLoop = () => {
  const swipers = document.querySelectorAll('.swiper.is-wearables');
  swipers.forEach((swiperEl) => {
    new Swiper(swiperEl as HTMLElement, {
      direction: 'horizontal',
      loop: true,
      centeredSlides: false,
      spaceBetween: 16 * 1,
      speed: 1250,
      autoplay: {
        delay: 0,
        // pauseOnMouseEnter: true,
        // disableOnInteraction: false,
        reverseDirection: false,
      },
      grabCursor: false,
      allowTouchMove: false,
      //   mousewheel: {
      //     forceToAxis: true,
      //   },
      breakpoints: {
        320: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 'auto',
        },
        992: {
          slidesPerView: 'auto',
        },
      },
    });
  });
};
