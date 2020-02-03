//Js to get the actual Year
var today = new Date();
var month = today.getMonth();
var day = today.getDay();
var year = today.getFullYear();
document.getElementById("currentdate").innerHTML = day + "/" + month + "/"  + year;

//Js to get the last modified date
document.getElementById("lastmodify").innerHTML = document.lastModified;

/* Toggle between adding and removing the "responsive" class to the navbar when the user clicks on the icon */
function burgerMenu() {
    var naviBar = document.getElementsById("navbar");
    var footerBar = document.getElementsById("footer");
    if (naviBar.className === "hide") {
      naviBar.className = "shown";
      footerBar.className = "large-footer";
    } else {
        naviBar.className = "hide";
        footerBar.className = "minorfooter";
    }
  } 