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
          ]
        }
      },
      {
        targets: "#top-skills span",
        properties: {
          scale: [
            { to: '1.14', ease: 'outExpo', duration: 600 },
            { to: '1', ease: 'outBounce', duration: 800, delay: 100 }
          ],
          color: [
            { to: 'var(--sage)', ease: 'outExpo', duration: 600 },
            { to: '#000', ease: 'outExpo', duration: 800, delay: 100 }
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
