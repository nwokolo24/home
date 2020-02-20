/* #######################################################
This javascript code is duplicated in the function.js file.
Use the functoin.js file instead of this very file.
######################################################### */

/* *************************************
*  Js to get the Current Date
************************************* */
const options = {weekday: "long", day: "numeric", month:"short", year: "numeric"};
document.getElementById("currentdate").textContent = new Date().toLocaleDateString("en-US", options);

/* *************************************
*  Js to get the last modified date
************************************* */
document.getElementById("lastmodify").innerHTML = document.lastModified;

/* *************************************
* Toggle between adding and removing the "responsive"
 class to the navbar when the user clicks on the icon
************************************* */
function burgerMenu() {
   document.getElementById("myLinks").classList.toggle("hide");
  }