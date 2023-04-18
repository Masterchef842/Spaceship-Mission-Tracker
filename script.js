//!This is the API to fetch from the Launch Library!//

const queryLaunchUrl = `https://lldev.thespacedevs.com/2.2.0/launch/?limit=3&offset=3`;

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
    let = launch.rocket.configuration.name;
    let imgUrl = launch.image;
    let launchServiceProvider = launch.launch_service_provider.name;

    console.log('The Location Is ' + launch.pad.location.name)
    console.log('The Launch Pad Name Is ' + launch.pad.name)
    console.log('The Latitude Is ' + latitude);
    console.log('The Longitude Is ' + longitude);
  }
};

//! Launch Library API END !//