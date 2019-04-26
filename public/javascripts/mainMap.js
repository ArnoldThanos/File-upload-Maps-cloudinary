const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();

function getUserLocation() {
  if (navigator.geolocation) {
    // Get current position
    // The permissions dialog will pop up
    navigator.geolocation.getCurrentPosition((position) => {
      // Create an object to match Google's Lat-Lng object format
      const myLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      startMap(myLoc);
      // console.log('center: ', center)
      // User granted permission
      // Center the map in the position we got
    }, () => {
      // If something goes wrong
      console.log('Error in the geolocation service.');
    });
  } else {
    // Browser says: Nah! I do not support this.
    console.log('Browser does not support geolocation.');
  }
}


function startMap(myLoc) {
  const ironhackBCN = {
    lat: -23.533773,
    lng: -46.625290,
  };
  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 10,
      center: ironhackBCN,
    },
  );

  const myHome = {
    lat: -23.645871,
    lng: -46.758312,
  };
  const myHouse = new google.maps.Marker({
    position: myHome,
    map,
    title: 'Home',
  });
  const whereAmI = new google.maps.Marker({
    position: myLoc,
    map,
    title: "I'm here",
  });

  const directionRequest = {
    origin: myLoc,
    destination: myHome,
    travelMode: 'DRIVING',
  };

  directionsService.route(
    directionRequest,
    (response, status) => {
      if (status === 'OK') {
        console.log(response)
        // everything is ok
        directionsDisplay.setDirections(response);
  
      } else {
        // something went wrong
        window.alert('Directions request failed due to ' + status);
      }
    },
  );

  directionsDisplay.setMap(map);
}

getUserLocation();
