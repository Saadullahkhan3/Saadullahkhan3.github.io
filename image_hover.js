
var timeout;

// const scroll = new LocomotiveScroll({
//     el: document.querySelector('main'),
//     smooth: true
// });

const MouseFollowerSkewser = () => {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    var cX;
    var cY;

    function mouseEvent(eventName){
      window.addEventListener(eventName, function(dets){
          this.clearTimeout(timeout);
  
          xscale = gsap.utils.clamp(5, 5, dets.clientX - xprev);
          yscale = gsap.utils.clamp(5, 5, dets.clientX - yprev);
  
          xprev = dets.clientX;
          yprev = dets.clientY;
  
          MouseFollower(xscale, yscale);
  
          timeout = setTimeout(function(){
              document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px ,${dets.clientY}px) scale(1, 1)`
              // document.querySelector("#minicircle").style.transform = `translate(500px ,500px) scale(1, 1)`
          }, 100)
      })

    }
    mouseEvent("mousemove")
    mouseEvent("scroll")
    document.querySelector("#minicircle").style.transform = `translate(${xprev}px ,${yprev}px) scale(1, 1)`
}

const MouseFollower = (xscale, yscale) => {
    window.addEventListener("mousemove", function detail(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px ,${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}

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
  // .from("", {
  //     y: -10,
  //     opacity: 0,
  //     duration: 1.5,
  //     delay: -1,       
  //     ease: Expo.easeInOut
  // })
}

BoundingAnime()

const pictureHoverMover = () => {
    document.querySelectorAll(".elem").forEach(function(elem){
        elem.addEventListener("mousemove", function(dets){

            var diff = dets.clientY - elem.getBoundingClientRect().top;
            
            gsap.to(elem.querySelector("img"), {
                opacity: 1,
                ease: Power1,
                top: diff,
                left: dets.clientX,
            });

        });
    });
}


document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
      });
    });
  });


// MouseFollower()
// MouseFollowerSkewser()
// pictureHoverMover()



// ----------------------------------------

const pictureHoverMover2 = () => {
    document.querySelectorAll(".elem").forEach(function(elem){
        elem.addEventListener("mousemove", function(dets){

            var diff = dets.clientY - elem.getBoundingClientRect().top;
            
            gsap.to(elem.querySelector("svg"), {
                opacity: 1,
                ease: Power1,
                top: diff,
                left: dets.clientX,
            });

        });
    });
}


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

pictureHoverMover2()
