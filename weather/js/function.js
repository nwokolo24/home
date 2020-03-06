
'use strict';
// Global Variables t be used
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var pageNav = $('#navbar');
var statusContainer = $('#status');
var contentContainer = $('#main-content');

// local and session storage selectors
var locStore = window.localStorage;
var sessStore = window.sessionStorage;

/* *****************************************************************
* WEATHER SITE JAVASCRIPT INSTRUCTIONS THAT CALLS VARIOUS FUNCTIONS *
****************************************************************** */
// Listen for the DOM to finish building
document.addEventListener("DOMContentLoaded", function(){
  buildModDate();
  const menuButton = document.querySelector("#menu-button");
  menuButton.addEventListener('click', burgerMenu);
  //call current date
  buildCurDate(); 
//Variables for wind chill function
let temp = 31;
let speed = 4.8;
buildWC(speed, temp);

//The Time Indicator function
let hour="6";
timeBall(hour);
console.log(hour);

//Background image change
let curCond = "fog";
curCond = curCond.toLowerCase();
changeSummaryImage(curCond);
console.log(curCond);

//Get weather json data
let weatherURL = "/weather/js/idahoweather.json";
fetchWeatherData(weatherURL);




// // // number Divisible by a divisor
const whyClick = document.querySelector("#cal");
console.log(whyClick);
whyClick.addEventListener("click", getAnswer);
})



/* *************************************
* WEATHER SITE JAVASCRIPT FUNCTIONS *
************************************* */
 //Js to get the Current Date
 function buildCurDate(){
const options = {weekday: "long", day: "numeric", month:"short", year: "numeric"};
document.getElementById("currentdate").textContent = new Date().toLocaleDateString("en-US", options);
 }
/* ##################################################
               Fetch Weather Data
###################################################### */
function fetchWeatherData(weatherURL){
  let cityName = "Preston"; //The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
    if(response.ok){
      return response.json();
    }
    throw new Error("Network resonse was not OK.");
  })
  .then(function(data){
    //check the data object that was retrieved
    console.log(data);
    //data is the full javaScript object, but we only want the preston part
    //shorten the variable and focus only on the data we want to reduce typing
    let p = data[cityName];
    console.log(p);


    //************ Get the location information *********
    let locName = p.properties.relativeLocation.properties.city;
    let locState = p.properties.relativeLocation.properties.state;
    let lowTemp = p.properties.relativeLocation.properties.lowTemp;
    let temperature = p.properties.relativeLocation.properties.temperature;
    let windSpeed = p.properties.relativeLocation.properties.windSpeed;
    let windGust = p.properties.relativeLocation.properties.windGust;
    let highTemp = p.properties.relativeLocation.properties.highTemp;

    //put them together
    let fullName = locName+', '+locState;

    //see if it worked, using ticks around the content in th log
    console.log(`Full name is: ${fullName}`); //This combines and outputs a string and a predefined variable

    //Get the longitude and latitude and combine them to
    //a comma seperated single string
    const latLong = p.properties.relativeLocation.geometry.coordinates[1] + ","+ p.properties.relativeLocation.geometry.coordinates[0];
    console.log(latLong);

     // Create a JSON object containing the full name, latitude and longitude
    // and store it into local storage.
    const prestonData = JSON.stringify({fullName,latLong});
    console.log(prestonData);
    locStore.setItem("PrestonID", prestonData);


    //************ Get the current condition information *********
    //As the data is extracted from the JSON, store it into session storage
    //Get the temperature data
    sessStore.setItem("FullName", fullName);
    sessStore.setItem("latLong", latLong);
    sessStore.setItem("lowTemp", lowTemp);
    sessStore.setItem("temperature", temperature);
    

    // Get the wind data 
    sessStore.setItem("windSpeed", windSpeed);
    sessStore.setItem("windGust", windGust);
    sessStore.setItem("highTemp", highTemp);

    // Get the hourly data using another function - should include the forecast temp, condition icons and wind speeds. 
    //The data will be stored into session storage.
    getHourly(p.properties.forecastHourly);
  })
  .catch(function(error){
    console.log("There was a fetch problem: ", error.message);
    statusContainer.innerHTML = "Sorry, the data could not be processed.";

  })

}

/* ************************************
*  Get Hourly Forecast data
************************************* */
function getHourly(URL){
  fetch(URL)
  .then(function(response){
    if(response.ok){
      return response.json();
    }
    throw new Error("Response not OK.");
  })
  .then(function(data){
    console.log("Data from getHourly function:");
    console.log(data); //Let's see what we got back

    //Store 12 hours of data to session storage
    var hourData = [];
    let todayDate = new Date();
    var nowHour = todayDate.getHours();
    console.log(`nowHour is ${nowHour}`);
    for (let i = 0, x = 11; i <= x; i++){
      if (nowHour < 24) {
        hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
        sessStore.setItem(`hour${nowHour}`, hourData[nowHour]);
        nowHour++;
      } else {
        nowHour = nowHour - 12;
        hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
        sessStore.setItem(`hour${nowHour}`, hourData[nowHour]);
        nowHour = 1;
      }
    }

    // Get the shortForecast value from the first hour (the current hour)
    // This will be the condition keyword for setting the background image
    sessStore.setItem(`shortForecast`, data.properties.periods[0].shortForecast);
    
    //Call the buildPage function
    buildPage();
  })
  .catch(error => console.log("There was a getHourly error: ", error))
}

/* ************************************
*  Build the Weather page
************************************* */
function buildPage(){
  //set the title with the location name at the first
  //Gets the title element so it can be worked with
  let pageTitle = $("#page-title");
  //Create a text node containing the full name
  let fullNameNode = document.createTextNode(sessStore.getItem("FullName"));
  console.log("FullName");
  //Inserts the fullName value before any other content that might exist
  pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
  //Get the h1 to display the city location
  let contentHeading = $(".town");
  contentHeading.innerHTML = sessStore.getItem("FullName");
//Get the coordinates container for the location
let latlon = $(".gps");
latlon.innerHTML = sessStore.getItem("latLong");
console.log(latlon);
}

//Js to get the last modified date
function buildModDate(){
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let lastMod = new Date(document.lastModified);
    const dayName = dayArray[lastMod.getDay()];
    const monthName = monthArray[lastMod.getMonth()];
    const formattedDate = dayName+", "+lastMod.getDate() +" "+monthName+", "+lastMod.getFullYear();
    document.querySelector('#lastmodify').innerText = formattedDate;
   }

   //variables for responsive menu
var mobileMenuClicks = 0;

//Handles Small Screen Menu
function burgerMenu(){
  //how many times responive menu used
  if (mobileMenuClicks == 0)
    console.groupCollapsed("Times Mobile Menu Toggled");
    mobileMenuClicks += 1;
    console.log(mobileMenuClicks);
  //declare variables
  const x = document.getElementById("navbar");
  const y = document.getElementById("footer");
  //if the buttun is tapped and the components are hidden, show them
  if (x.className === "hidden") {
    x.className = "shown";
    y.className = "large-footer";
  }
  //if the items are already shown, hide them 
  else {
    x.className = "hidden";
    y.className = "small-footer";
  }
}
/* ##################################################
//This function calculates the WindChill
###################################################### */
function buildWC(speed, temp) {
  let feelTemp = document.getElementById("feelTemp");

//This formular Computes the windchill value
  let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
 console.log(wc);

 //Round the answer down to integer
  wc = Math.floor(wc);

  //IF chill is greater than temp, return the temp
  wc = (wc > temp)?temp:wc;

  //Display the windchill result
  console.log(wc);
  feelTemp.innerHTML = wc;
}

/* ###########################################################################
Function for Time indicator
########################################################################## */
function timeBall(hour){
  //find all "ball" classes and remove them
  let x = document.querySelectorAll(".ball");
  for (let item of x) {
          item.classList.remove("ball");
  }

  //Find all hours that match the parameter and add the "ball"
  let hr = document.querySelectorAll(".p"+hour);
  for (let item of hr){
  item.classList.add("ball");
}}

/* ##################################################################
Function for changing the background image surrounding the weather 
condition boxes
##################################################################### */
function changeSummaryImage(curCond){
let selectImage = document.querySelector(".clear");
selectImage.classList.add(curCond);
}



// // // Integers evenly divisible by divisor
function divisible(a, b, c){
  let answer = " ";
   for (let i = a; i <= b; i++){
       if(i % c == 0){
           answer += i + " ";
           console.log(answer);
       }
      }
      return answer;
        }

      //A different function that calls the divisible function
       function getAnswer(){
  //Input: 
  let start = parseInt(document.querySelector("#start").value);
  let end = parseInt(document.querySelector("#end").value);
  let divisor = parseInt(document.querySelector("#divisor").value);
        
  //Processing
  //Calling the divisible function
  let calculate = divisible(start, end, divisor);
   console.log(calculate);
   //Output:
   document.getElementById("output").innerHTML = calculate;
       }