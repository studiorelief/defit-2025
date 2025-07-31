import './index.css';

import { initMarker } from './global/marker';
import { navbarMobile } from './global/navbar';
import { heroAnimation } from './utils/animations/animationLoad';
import { replaceHeroHeadings, swiperCrossfade } from './utils/animations/heroTextLoop';
import { iconsLoop } from './utils/animations/iconsLoop';
import { wearablesLoop } from './utils/animations/wearablesLoop';

window.Webflow ||= [];
window.Webflow.push(() => {
  /* marker */
  initMarker();
  navbarMobile();

  /* CC animations */
  replaceHeroHeadings();
  swiperCrossfade();

  /* ix3 animations */
  heroAnimation();

  /* Loop animations */
  iconsLoop();
  wearablesLoop();
});
