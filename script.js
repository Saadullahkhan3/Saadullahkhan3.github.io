// const scroll = new LocomotiveScroll({
//     el: document.querySelector('body'),
//     // el: document.querySelector('[data-scroll-container]'),
//     smooth: true
// });


function infiniteScroll(){
    const _infiniteScrollParent = document.querySelectorAll(".infinite-scroll"); 

    for (let infiniteScrollParent of _infiniteScrollParent){


        const computedStyle = getComputedStyle(infiniteScrollParent.querySelector(".infinite-scroll > .scroll-item"));

        const duration = Number.parseInt(computedStyle.animationDuration);
    

        const totalItems = infiniteScrollParent.querySelectorAll(`.scroll-item`).length;
        
        const itemsArr = Array.from(infiniteScrollParent.querySelectorAll(".scroll-item"))
        
        itemsArr.forEach((elem, index) => {

            let formula = (duration / totalItems * (totalItems - index) * -1);         

            elem.style.animationDelay = `${formula}s`
            elem.style.animationDuration = `${duration}s`
        });
    }
}

// Call the function to execute/run it
infiniteScroll()




let imageRotateTime;

const MouseFollowerForImage = () => {

    window.addEventListener("mousemove", function(dets) {
        this.clearTimeout(imageRotateTime);
    
        imageRotateTime = setTimeout(() => {
            document.querySelectorAll(".project .thumbnail").forEach(function(elem) {
                elem.addEventListener("mousemove", function(dets) {
                    
                    // Get the bounding box of the element and calculate the cursor's relative position
                    let itemInfo = elem.getBoundingClientRect();
                    let diffX = dets.clientX - itemInfo.left;  // X-axis distance from left
                    let diffY = dets.clientY - itemInfo.top;   // Y-axis distance from top
                    
                    // Calculate the center of the element
                    let centerX = itemInfo.width / 2;
                    let centerY = itemInfo.height / 2;
                    
                    // Calculate rotation values based on distance from center
                    let rotateY = ((diffX - centerX) / centerX) * 16; // Rotate Y based on X distance
                    let rotateX = -((diffY - centerY) / centerY) * 16; // Rotate X based on Y distance
                    
                    // Apply the transformation to the image
                    let item = elem.querySelector("img");
                    item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
                });
                
                // Reset rotation on mouse leave
                elem.addEventListener("mouseleave", function() {
                    let item = elem.querySelector("img");
                    item.style.transform = "";
                });
            });
        }, 100);
    });
}

const MouseFollower2 = (xscale, yscale) => {
    window.addEventListener("mousemove", function detail(dets){
        for( let elem of document.querySelectorAll(".project .thumbnail img")){
            console.log(elem)
            elem.style.transform = `translate(${dets.clientX}px ,${dets.clientY}px) scale(${xscale}, ${yscale})`

        }
    })
}
MouseFollowerForImage()











function textAppear() {
    let home = document.getElementById("home");
    let textElem = home.querySelector("h1");
    textElem.style.display = "none"
    textElem.style.textAlign = "left"
    let text = textElem.textContent;
    textElem.textContent = ""; // Clear the text to start animation
    
    textElem.style.display = "block"
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            textElem.textContent += text[i];
        }, i * 250); // Adjust delay (100ms) as needed
    }
}
// textAppear();


// TypeWriter 
const texts = ["Software Engineer", "Web Developer"];
let currentTextIndex = 0;
let charIndex = 0;
const typingSpeed = 100;  // Time between each character (in ms)
const pauseBetweenTexts = 2000;  // Pause between each full text (in ms)
const textElement = document.getElementById("text");

function typeWriterEffect() {
    // Check if all characters of the current text are typed
    if (charIndex < texts[currentTextIndex].length) {
        textElement.textContent += texts[currentTextIndex][charIndex];
        charIndex++;
        setTimeout(typeWriterEffect, typingSpeed);
    } else {
        // Pause after finishing a text, then erase it and move to the next
        setTimeout(() => {
            eraseText();
        }, pauseBetweenTexts);
    }
}

function eraseText() {
    if (charIndex > 0) {
        textElement.textContent = textElement.textContent.slice(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, typingSpeed / 2);
    } else {
        // Move to the next text in the array
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        typeWriterEffect();
    }
}

// Start the typewriter effect
typeWriterEffect();







function addClassInNavElem(){
    let currentURL = document.URL;
    let navLiAnchor = document.querySelectorAll("nav ul li a");
    navLiAnchor.forEach((a)=>{
    if (a.href  == currentURL){
        a.classList.add("currentURL");
    }
    else{
        a.classList.remove("currentURL");
        }
    });
}

// setTimeout(addClassInNavElem, 100)
// window.addEventListener("popstate", addClassInNavElem);

function initScrollSpy(navSelector, offset = 250) {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll(`${navSelector} a`);


    function onScroll() {
        const scrollPos = window.scrollY + offset;
        sections.forEach((section, index) => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                // Highlight current navigation link
                navLinks.forEach(link => link.classList.remove('currentURL'));
                navLinks[index].classList.add('currentURL');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Initialize on page load
}

// Usage
initScrollSpy('header nav ul');



