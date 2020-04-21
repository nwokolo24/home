// Formula: (32°F − 32) × 5/9
let display = document.querySelector("#resultDisplay");
function calCel(f){
let celcius = (f - 32) * (5/9);
celcius = Math.round(celcius);
console.log(celcius);
return celcius;
}

console.log(URL);
function fetchData(URL){
    fetch(URL)
        .then(function(response){
            if(response.ok){
                return response.json();
            }
            throw new Error("Response was not OK");
        })
            .then(function(data){
                let tempSelect = "Temperature";
                for(let i = 1; i < 4; i++){
              let fahren = data[tempSelect + i];

              if(fahren < 32){
                display.innerHTML += " It is too cold! ";
            }
            else{ display.innerHTML += calCel(fahren);}
        }
            })
        
        .catch(function(error){
            console.log("Sorry we could not get your data because " + error.message);
        });
}
fetchData("test.json");

function buildCurDate(){
    const options = {weekday: "long", day: "numeric", month:"short", year: "numeric"};
    document.getElementById("demo").textContent = new Date().toLocaleDateString("en-US", options);
     }
    //  buildCurDate();
     console.log(buildCurDate);

// display.innerHTML = calCel(fahren);

// 1. Get temperature from JSON file
// 2. Check that each temperature is less than 32
// 3. Add to HTML the temperature in Celcius or "Its too cold"




