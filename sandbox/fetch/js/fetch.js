var weatherSite = "/sandbox/fetch/js/idahoweather.json";
function fetchData(weatherSite){
    fetch(weatherSite)
    .then(function(response){
        if(response.ok){
            return response.json();
        }
      throw new Error("Network response was not OK.");
    })
    .then(function(data){
console.log(data);
    })
    .catch(function(error){
        console.log("There was a fetch problem ", error.message);
    })
}

fetchData(weatherSite);