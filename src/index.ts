import './index.css';

import { heroAnimation } from './utils/animations/animationLoad';
import { replaceHeroHeadings, swiperCrossfade } from './utils/animations/heroTextLoop';
import { iconsLoop } from './utils/animations/iconsLoop';
import { initStep2Swiper } from './utils/animations/step2SwiperLoop';
import { wearablesLoop } from './utils/animations/wearablesLoop';
import { initMarker } from './utils/global/marker';
import { navbarMobile, navbarScrollBehavior } from './utils/global/navbar';

window.Webflow ||= [];
window.Webflow.push(() => {
  /* marker */
  initMarker();
  navbarMobile();
  navbarScrollBehavior();

  /* CC animations */
  replaceHeroHeadings();
  swiperCrossfade();

  /* ix3 animations */
  heroAnimation();

  /* Loop animations */
  iconsLoop();
  wearablesLoop();
  initStep2Swiper();
});
