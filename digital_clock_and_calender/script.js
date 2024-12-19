function monthAbbrByNo(num0To11) {
  switch (num0To11) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
  }
}

// Clock
// Selecting elements from DOM
let clock = document.querySelector(".clock");
let hourElem = clock.querySelector(".hour");
let minElem = clock.querySelector(".min");
let secElem = clock.querySelector(".sec");
const hour12 = document.getElementById("hour12");
let ampmElem = clock.querySelector(".ampm")

// Set hour wheter in 24(default) or 12 format
const setHour = () => {
  if (hour12.checked) {

    let ampm = date.getHours() >= 12 ? "PM" : "AM";
    ampmElem.textContent = ampm
    
    hours = date.getHours() % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hourElem.textContent = hours;
} else {
    hourElem.textContent = date.getHours() + 1;
    ampmElem.textContent = ""
  }
};

// 1 second interval that update the time
setInterval(() => {
  let date = new Date();
  setHour();    
  minElem.textContent = date.getMinutes();
  secElem.textContent = date.getSeconds();
}, 1000);

hour12.addEventListener("change", setHour);

// Calender
// Selecting elements from DOM
let calender = document.querySelector(".calender");
let dayElem = calender.querySelector(".day");
let monthElem = calender.querySelector(".month");
let yearElem = calender.querySelector(".year");
let slashElem = calender.querySelector(".slash")

let date = new Date();

dayElem.textContent = date.getDate();
monthElem.textContent = monthAbbrByNo(date.getMonth());  // set month as abbr as default
yearElem.textContent = date.getFullYear();

// Event listener for month that it should be abbr or in num
const monthNo = document.getElementById("month-no");
console.log(monthNo)
monthNo.addEventListener("change", () => {
    if (monthNo.checked) {
        monthElem.textContent = date.getMonth();
        slashElem.textContent = "/"
    } else {
        monthElem.textContent = monthAbbrByNo(date.getMonth());
        slashElem.textContent = ""
  }
});

// Close/Open dev-area on double click
window.addEventListener("dblclick", () => {
  let devArea = document.querySelector(".dev-area");
  if (devArea.style.display === "none") {
    devArea.style.display = "block";
  } else {
    devArea.style.display = "none";
  }
});
