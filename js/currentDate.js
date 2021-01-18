//Js to get the Current Date
const options = {weekday: "long", day: "numeric", month:"short", year: "numeric"};
document.getElementById("currentdate").textContent = new Date().toLocaleDateString("en-US", options);

//Js to get the last modified date
document.getElementById("lastmodify").innerHTML = document.lastModified;