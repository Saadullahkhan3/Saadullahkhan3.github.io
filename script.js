let BoundingAnime=()=>{gsap.timeline().from("header",{y:"-10",opacity:0,duration:1,ease:Expo.easeInOut}).to(".bounding-elem",{opacity:1,y:0,duration:2,stagger:.2,delay:-1,ease:Expo.easeInOut})};function monitorNavToAssignActiveClass(n,e,t=250){let l=document.querySelectorAll("section"),i=document.querySelectorAll(e+" a");function o(){let o=window.scrollY+t;l.forEach((e,t)=>{o>=e.offsetTop&&o<e.offsetTop+e.offsetHeight&&(i.forEach(e=>e.closest("li").classList.remove(n)),i[t].closest("li").classList.add(n))})}window.addEventListener("scroll",o),o()}function infiniteScroll(){var e;for(e of document.querySelectorAll(".infinite-scroll")){var t=getComputedStyle(e.querySelector(".infinite-scroll > .scroll-item"));let o=Number.parseInt(t.animationDuration),n=e.querySelectorAll(".scroll-item").length;Array.from(e.querySelectorAll(".scroll-item")).forEach((e,t)=>{t=o/n*(n-t)*-1;e.style.animationDelay=t+"s",e.style.animationDuration=o+"s"})}}BoundingAnime(),monitorNavToAssignActiveClass("active-nav-link","header nav ul"),infiniteScroll();let MouseFollowerFor3dImageEffect=(r=10)=>{this.clearTimeout(void 0),setTimeout(()=>{document.querySelectorAll(".project .thumbnail").forEach(function(i){i.addEventListener("mousemove",function(e){var t=i.getBoundingClientRect(),o=e.clientX-t.left,n=t.width/2,l=t.height/2,o=(o-n)/n*r,n=-(e.clientY-t.top-l)/l*r;i.querySelector("img").style.transform=`rotateX(${n}deg) rotateY(${o}deg) translateZ(30px)`}),i.addEventListener("mouseleave",function(){i.querySelector("img").style.transform=""})})},100)},TypeWriter=(MouseFollowerFor3dImageEffect(10),(e,t,o=100,n=2e3)=>{let l=0,i=0,r=document.getElementById(e);function a(){i<t[l].length?(r.textContent+=t[l][i],i++,setTimeout(a,o)):setTimeout(()=>{s()},n)}function s(){0<i?(r.textContent=r.textContent.slice(0,i-1),i--,setTimeout(s,o/2)):(l=(l+1)%t.length,a())}a()}),texts_arr=["Web Developer","Development"],pictureHoverMover=(TypeWriter("text",texts_arr),()=>{document.querySelectorAll(".elem").forEach(function(o){var n,l=0;o.addEventListener("mouseleave",function(e){gsap.to(o.querySelector("svg"),{opacity:0,ease:Power3,duration:.5})}),o.addEventListener("mousemove",function(e){var t=e.clientY-o.getBoundingClientRect().top;n=e.clientX-l,l=e.clientX,gsap.to(o.querySelector("svg"),{opacity:1,ease:Power3,top:t,left:e.clientX,rotate:gsap.utils.clamp(-20,20,.5*n)})})})});pictureHoverMover();