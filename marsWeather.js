weatherDive=document.querySelector("#marsWeather");
weatherButton=document.querySelector("#getWeather")

function getWeather(event){

    event.preventDefault();
    url="https://api.nasa.gov/insight_weather/?api_key=AxOSLRhcXa2WNR7gH6JlTlEZteqsRaPNO5VrC8HN&feedtype=json&ver=1.0"
    fetch(url)
        .then(function(response){
            if(!response.ok)
                console.log(response.status)
            else
                response.json().then(function(data){
                    console.log(data)
                    displayData(data)
                })
        })
}
function displayData(data){
    
}

weatherButton.addEventListener("click",getWeather)