

const BoundingAnime = () => {
  var tl = gsap.timeline()

  tl.from("header", {
      y: "-10",
      opacity: 0,
      duration: 1,
      ease: Expo.easeInOut
  })
  .to(".bounding-elem", {
      opacity: 1,
      y: 0,
      duration: 2,
      stagger: .2,
      delay: -1,
      ease: Expo.easeInOut
  })
}

BoundingAnime()


// ----------------------------------------

const pictureHoverMover = () => {
  document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("svg"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("svg"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
      });
    });
  });
}


pictureHoverMover()
