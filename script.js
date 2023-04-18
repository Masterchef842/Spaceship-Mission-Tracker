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
    for (var i = 0; i < 1/*launchData.length*/; i++) {
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



//main code

searchButton.addEventListener("click", getLaunchInfo)