/* ++++++++++ Header and Home ++++++++++ */
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



/* ++++++++++ Nav ++++++++++ */
function monitorNavToAssignActiveClass(className, navSelector, offset = 250) {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll(`${navSelector} a`);

    function onScroll() {
        const scrollPos = window.scrollY + offset;
        sections.forEach((section, index) => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => link.closest("li").classList.remove(className));
                navLinks[index].closest("li").classList.add(className);
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Initialize on page load
}
monitorNavToAssignActiveClass("active-nav-link", 'header nav ul');



/* ++++++++++ Skill Section ++++++++++ */
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
infiniteScroll()



/* ++++++++++ Project Section ++++++++++ */
const MouseFollowerFor3dImageEffect = (effectIntensity=10) => {
    let imageRotateTime;

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
                let rotateY = ((diffX - centerX) / centerX) * effectIntensity; // Rotate Y based on X distance
                let rotateX = -((diffY - centerY) / centerY) * effectIntensity; // Rotate X based on Y distance
                
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
}
MouseFollowerFor3dImageEffect(10)



/* ++++++++++ Home Section  ++++++++++ */
const TypeWriter = (textElementId, texts_arr, typingSpeed=100, pauseBetweenTexts=2000) => {
    // typingSpeed -> Time between each character (in ms)
    // pauseBetweenTexts -> Pause between each full text (in ms)
    
    let currentTextIndex = 0;
    let charIndex = 0;
    const textElement = document.getElementById(textElementId);
    
    function typeWriterEffect() {
        // Check if all characters of the current text are typed
        if (charIndex < texts_arr[currentTextIndex].length) {
            textElement.textContent += texts_arr[currentTextIndex][charIndex];
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
            currentTextIndex = (currentTextIndex + 1) % texts_arr.length;
            typeWriterEffect();
        }
    }
    typeWriterEffect();
}
const texts_arr = ["Web Developer", "Development"];
TypeWriter("text", texts_arr);

    

/* ++++++++++ Contact Section ++++++++++ */
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
  

/* ++++++++++ Auto Experience total time/date calculator ++++++++++ */
const timeSeperatorElement = "∙";
const calculateTotalTime = (startTimeElemTextContent, endTimeElemTextContent) => {
    const startTime = new Date(startTimeElemTextContent);
    const endTime = (endTimeElemTextContent
                    .trim().toLowerCase() === "present" 
                    ? new Date() :
                    new Date(endTimeElemTextContent));

    const totalYears = endTime.getFullYear() - startTime.getFullYear();

    const totalMonths = totalYears * 12 + (endTime.getMonth() - startTime.getMonth());
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    let totalTimeText = "";
    if (years > 0) {
        totalTimeText += `${years} yr${years > 1 ? 's' : ''} `;
    }
    if (months > 0) {
        totalTimeText += `${months} mo${months > 1 ? 's' : ''}`;
    }
    // If less than a month, assume 1 month
    else{
        totalTimeText = "1 mo";
    }

    return totalTimeText.trim();
}

const allJobs = document.querySelectorAll(".exp-card");

allJobs.forEach((job) => {
    try{
    /* Calculate the total job time */
    const totalJobTime = job.querySelector(".exp-total-time");
    
    const startTimeElemTextContent = job.querySelector(".start-time");
    const endTimeElemTextContent = job.querySelector(".end-time");

    if (!startTimeElemTextContent || !endTimeElemTextContent){
        console.log("SUK card just hit!");
        // console.log("Start/End Time element not found");
        return;
    }
    
    const totalTimeText = calculateTotalTime(startTimeElemTextContent.textContent, endTimeElemTextContent.textContent);

    totalJobTime.textContent = ` ${timeSeperatorElement} ${totalTimeText.trim()}`;

    // Calculate the total time for each job level
    const jobLevels = job.querySelectorAll(".exp-job-level");
    jobLevels.forEach((jobLevel)=>{
        const timeStampElem = jobLevel.querySelector(".exp-job-timestamp");

        if (!timeStampElem){
            console.log("TimeStamp element not found");
            return;
        }
        
        const startTimeElemTextContent = timeStampElem.textContent.split(" - ")[0];
        const endTimeElemTextContent = timeStampElem.textContent.split(" - ")[1];

        const totalTimeText = calculateTotalTime(startTimeElemTextContent, endTimeElemTextContent);
        timeStampElem.textContent += ` ${timeSeperatorElement} ${totalTimeText.trim()}`;
    });
    }
    catch(err){
        console.log("SUK = Saadullah Khan!");
    }

});



/* XXXXXXXXXX END OF SCRIPT XXXXXXXXXX */