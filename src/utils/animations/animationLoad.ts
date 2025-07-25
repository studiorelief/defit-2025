export function heroAnimation() {
  // @ts-expect-error Webflow is not defined in the global scope
  const wfIx = Webflow.require('ix3');

  const videoElement = document.getElementById('hero-video') as HTMLVideoElement;

  videoElement.addEventListener('loadeddata', () => {
    wfIx.emit('home_hero_video-load');
  });

  if (videoElement.readyState >= 4) {
    wfIx.emit('home_hero_video-load');
  }
}
