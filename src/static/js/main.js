import { animate, stagger, createTimeline } from 'animejs';

(() => {
  window.addEventListener("load", () => {
    const timeline = createTimeline();

    let animations = [
      {
        targets: ".intro-card h1",
        properties: {
          scale: [
            { to: '1.14', ease: 'outExpo', duration: 600 },
            { to: '1', ease: 'outBounce', duration: 800, delay: 100 }
          ],
          "text-shadow": "3px 3px 0 #fff"
        }
      },
      {
        targets: "#top-skills span",
        properties: {
          scale: [
            { to: '1.14', ease: 'outExpo', duration: 600 },
            { to: '1', ease: 'outBounce', duration: 800, delay: 100 }
          ],
          '--c1': [
            { to: '#7a5c1e', ease: 'outExpo', duration: 600 },
            { to: '#60696D', ease: 'outExpo', duration: 800, delay: 100 }
          ],
          '--c2': [
            { to: '#f5e6a8', ease: 'outExpo', duration: 600 },
            { to: '#D3D2D5', ease: 'outExpo', duration: 800, delay: 100 }
          ],
          '--c3': [
            { to: '#c9a23f', ease: 'outExpo', duration: 600 },
            { to: '#7C7F85', ease: 'outExpo', duration: 800, delay: 100 }
          ],
          delay: stagger(100),
          ease: 'inOutCirc'
        }
      },
    ];

    animations.forEach((animation) => {
      timeline.add(animation.targets, animation.properties);
    });
  });
})();
