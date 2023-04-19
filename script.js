//!This is the API to fetch from the Launch Library!//

let searchButton=document.querySelector('#searchButton')
let missionCard=document.querySelector('#missionName');
let imgCard=document.querySelector('#shipImg')
let locationCard =document.querySelector('#launchSite');
let launchPadCard=document.querySelector('#launchPadName');
let rocketCard=document.querySelector('#rocketName');
let weatherCard=document.querySelector('#launchWeather');


function getLaunchInfo() {
    let queryLaunchUrl = `https://lldev.thespacedevs.com/2.2.0/launch/?limit=3&offset=3`;

    fetch(queryLaunchUrl, {
        method: 'GET',
        headers: {
        },

    }).then(response => {
        if (!response.ok) {
            throw response;
        }
        console.log('SUCCESS');
        return response.json();

    }).then(response => {
        processLaunchData(response);

    }).catch((errorResponse) => {
        if (errorResponse.text) {
            errorResponse.text().then(errorMessage => {
                console.error('Error:', errorMessage);
            })
        } else {
            console.error('Error:', errorResponse);
        }
    });
}


function processLaunchData(response) {
    var launchData = response.results;
    console.log(launchData);
    for (var i = 0; i < launchData.length; i++) {
        var launch = launchData[i];
        console.log(launch.pad.name);

        //We can access the data from the response using this format.
        //We can then have it append to the page where we need it to display

        let launchLocation = launch.pad.location.name;
        let launchPadName = launch.pad.name
        let latitude = launch.pad.latitude;
        let longitude = launch.pad.longitude;
        let missionName = launch.mission.name;
        let rocketName= launch.rocket.configuration.name;
        let imgUrl = launch.image;
        let launchServiceProvider = launch.launch_service_provider.name;
        // getWeather(latitude, longitude);

        // console.log('The Location Is ' + launch.pad.location.name)
        // console.log('The Launch Pad Name Is ' + launch.pad.name)
        // console.log('The Latitude Is ' + latitude);
        // console.log('The Longitude Is ' + longitude);
        
        updatePage(imgUrl,missionName,launchLocation,launchPadName,rocketName,launchServiceProvider)
        setWeather(latitude,longitude)
    }
};

function setWeather(latitude, longitude) {
    let url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=30938dd6fcd531961e9f7d4e28342bde"
    fetch(url)
        .then(function (response) {
            if (!response.ok)
                console.log(response.status)
            else
                response.json().then(function (data) {
                    console.log(data)
                    weatherCard.textContent="Current Conditions"+data.list[0].weather[0].description

                })
        })
};
function updatePage(imgUrl,missionName,launchLocation,launchPadName,rocketName,launchServiceProvider){
    missionCard.textContent=missionName
    imgCard.src=imgUrl
    locationCard.textContent= "Launch Site: "+launchLocation
    launchPadCard.textContent="Launch Pad: "+launchPadName
    rocketCard.textContent="RocketName: "+rocketName
    
}
//! Launch Library API END !//

// function made to send api request
async function sendAPIRequest() {
    let nasa_key = 'rn9bVJgUa0FaOs6GRHb3NN3WbN8N4HZACMMdrI8Y'
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasa_key}`);
    console.log(response);
    // responding code in json
    let data = await response.json();
    console.log(data);
    document.getElementById("apod").src = data.hdurl;
  var imageTitle = document.getElementById("title");

 useApiData (data)
}
    
function useApiData(data) {
    document.querySelector('#content').innerHTML = data.explanation

    // document.querySelector('#content').innerHTML = `<img src="${data.url}">`

}


//main code
sendAPIRequest();
searchButton.addEventListener("click", getLaunchInfo)


//! Source for favicon https://spemer.com/articles/set-favicon-with-javascript.html 

function setFavicons(favImg) {
  let headTitle = document.querySelector('head');
  let setFavicon = document.createElement('link');
  setFavicon.setAttribute('rel', 'shortcut icon');
  setFavicon.setAttribute('href', favImg);
  headTitle.appendChild(setFavicon);
}
setFavicons('images/favicon.ico');

