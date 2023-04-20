//!This is the API to fetch from the Launch Library!//

let searchButton=document.querySelector('#searchButton')
let missionCard=document.querySelectorAll('.missionName');
let imgCard=document.querySelectorAll('.shipImg')
let locationCard =document.querySelectorAll('.launchSite');
let launchPadCard=document.querySelectorAll('.launchPadName');
let rocketCard=document.querySelectorAll('.rocketName');
let weatherCard=document.querySelectorAll('.launchWeather');
let searchResults=document.querySelectorAll('.searchResults')
let launchProvider=document.querySelectorAll('.launchProvider');
let lDate=document.querySelectorAll('.launchDate')

function getLaunchInfo() {

  let launchLocation = document.getElementsByName("pad__location")[0].value;
  let isCrewed = document.getElementsByName("is_crewed")[0].value;
  let lspId = document.getElementsByName("lsp__id")[0].value;

  let queryLaunchUrl = `https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=5&offset=3`;

  if (launchLocation) {
    queryLaunchUrl += `&pad__location=${launchLocation}`;
  }

  if (isCrewed) {
    queryLaunchUrl += `&isCrewed=${isCrewed}`;
  }

  if (lspId) {
    queryLaunchUrl += `&lsp__id=${lspId}`;
  }

  fetch(queryLaunchUrl, {
    method: 'GET',
    headers: {
    },

  }).then(response => {
    if (!response.ok) {
      throw response;
    }
    console.log('SUCCESS');
    console.log(queryLaunchUrl)
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
        searchResults[i].classList.remove('hide')
        let launchDate=launch.window_start
        console.log(launchDate)
        let launchLocation = launch.pad.location.name;
        let launchPadName = launch.pad.name
        let latitude = launch.pad.latitude;
        let longitude = launch.pad.longitude;
        let missionName = launch.mission.name;
        let rocketName= launch.rocket.configuration.name;
        let imgUrl = launch.image;
        let launchServiceProvider = launch.launch_service_provider.name;
        updatePage(i,imgUrl,missionName,launchLocation,launchPadName,rocketName,launchServiceProvider,launchDate)
        setWeather(i,latitude,longitude)
    }
};

function setWeather(i,latitude, longitude) {
    let url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=30938dd6fcd531961e9f7d4e28342bde"
    fetch(url)
        .then(function (response) {
            if (!response.ok)
                console.log(response.status)
            else
                response.json().then(function (data) {
                    console.log(data)
                    weatherCard[i].textContent="Current Conditions: "+data.list[0].weather[0].description

                })
        })
};
function updatePage(i,imgUrl,missionName,launchLocation,launchPadName,rocketName,launchServiceProvider,launchDate){
    missionCard[i].textContent=missionName
    imgCard[i].src=imgUrl
    locationCard[i].textContent= "Launch Site: "+launchLocation
    launchPadCard[i].textContent="Launch Pad: "+launchPadName
    rocketCard[i].textContent="RocketName: "+rocketName
    launchProvider[i].textContent="Agency: "+launchServiceProvider

    setInterval(function(){
      let diff=dayjs(launchDate).diff(dayjs(), 's')

      let days = Math.floor(diff / 86400);
      let hours = Math.floor((diff % 86400) / 3600);
      let minutes = Math.floor(((diff%86400)% 3600) / 60);
      let seconds = diff % 60;

      lDate[i].textContent="Liftoff: "+days+ " days, "+hours+" hours, "+minutes+" minutes, "+seconds+" seconds";
      lDate[i].style="font-weight: bold;"
    },1000)
    
    
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
    document.getElementById("apod").src = data.url;
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

// Source: Beyond Fireship Youtube Video "Subtle, yet Beautiful Scroll Animations" link: https://www.youtube.com/watch?v=T33NN_pPeNI

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {

    if (entry.isIntersecting) {
      entry.target.classList.add('showNav');
    } else {
      entry.target.classList.remove('showNav');
    }
  })
})

const hiddenElements = document.querySelectorAll('.hiddenNav');
hiddenElements.forEach((el) => observer.observe(el));