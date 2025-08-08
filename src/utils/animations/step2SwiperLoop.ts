import 'swiper/css/bundle';

// import { gsap } from 'gsap';
import Swiper from 'swiper/bundle';

export function initStep2Swiper() {
  const swipers = document.querySelectorAll('.swiper.is-step-2');
  swipers.forEach((swiperEl) => {
    new Swiper(swiperEl as HTMLElement, {
      direction: 'horizontal',
      speed: 600,
      slidesPerView: 1,
      // spaceBetween: 32,
      autoHeight: true,
      loop: true,
      centeredSlides: true,
      effect: 'fade',
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        reverseDirection: true,
      },
    });
  });
}
