
'use strict';
/* *************************************
*  Js to get the Current Date
************************************* */
const options = {weekday: "long", day: "numeric", month:"short", year: "numeric"};
document.getElementById("currentdate").textContent = new Date().toLocaleDateString("en-US", options);

/* *************************************
*  Js to get the last modified date
************************************* */
function buildModDate(){
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let lastMod = new Date(document.lastModified);
    const dayName = dayArray[lastMod.getDay()];
    const monthName = monthArray[lastMod.getMonth()];
    const formattedDate = dayName+", "+lastMod.getDate() +" "+monthName+", "+lastMod.getFullYear();
    document.querySelector('#lastmodify').innerText = formattedDate;
   }


/* *************************************
* Handles Small Screen Menu
************************************* */
function burgerMenu() {
    console.log(document.getElementById("primaryNav").classList);
   document.getElementById("primaryNav").classList.toggle("hide");
  }


  /* *************************************
*  Weather Site JavaScript Functions
************************************* */
console.log('My javascript is being read');

// Listen for the DOM to finish building
document.addEventListener("DOMContentLoaded", function(){
    buildModDate();
  })