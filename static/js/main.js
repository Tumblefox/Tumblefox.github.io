(() => {
  window.addEventListener("load", () => {
    let animationTimeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });

    let animations = [
      {
        targets: ".intro-card h1",
        fontSize: "6em"
      },
      {
        targets: ".intro-card h1 span",
        // color: "#000000",
        boxShadow: "7px 7px 0 white",
        textShadow: "2px 2px 2px #474747"
      },
      {
        targets: ".intro-card p",
        keyframes: [
          {rotate: 10, scale: 0.5},
          {rotate: -10},
          {rotate: 0, scale: 1}
        ],
        duration: 1000
      }
    ];

    animations.forEach((animation) => {
      animationTimeline.add(animation);
    });
  });
})();
