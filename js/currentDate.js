//Js to get the Current Date
const options = {weekday: "long", day: "numeric", month:"short", year: "numeric"};
document.getElementById("currentdate").textContent = new Date().toLocaleDateString("en-US", options);

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