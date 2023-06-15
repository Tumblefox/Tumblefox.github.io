(() => {
  window.addEventListener("load", () => {
    let animationTimeline = anime.timeline({
      // easing: 'easeOutExpo',
      duration: 1000
    });

    animationTimeline.add({
      targets: ".intro-card h1",
      fontSize: "6em"
    });

    animationTimeline.add({
      targets: ".intro-card h1 span",
      boxShadow: "5px 5px 0 red, 10px 10px 0 yellow, 15px 15px 0 blue, 20px 20px 0 green, 25px 25px 0 orange"
    });

    // animationTimeline.add({
    //   targets: ".intro-card h4 span",
    //   keyframes: [
    //     {color: "#ffffff"},
    //     {color: "#00ff00"}
    //   ],
    //   easing: 'easeOutElastic(1, .10)',
    // });

  });
})();
