
/*************************************************************/
/************************Variable declaraion******************/
/*************************************************************/

var countryFlagCount = {
  IndiaFlagsCount: 1,
  TurkeyFlagsCount: 2,
  SouthkoreaFlagsCount: 0,
  BrazilFlagsCount: 0,
  RussiaFlagsCount: 0
}

/*************************************************************/
var map, infoWindow;
function initMap() {
  // Create a new StyledMapType object, passing it an array of styles,
  // and the name to be displayed on the map type control.
  var styledMapType = new google.maps.StyledMapType(
    [
      { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#c9b2a6' }]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#dcd2be' }]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ae9e90' }]
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{ color: '#dfd2ae' }]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#dfd2ae' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#93817c' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{ color: '#a5b076' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#447530' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#f5f1e6' }]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{ color: '#fdfcf8' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#f8c967' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#e9bc62' }]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{ color: '#e98d58' }]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#db8555' }]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#806b63' }]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{ color: '#dfd2ae' }]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#8f7d77' }]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#ebe3cd' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{ color: '#dfd2ae' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#b9d3c2' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#92998d' }]
      }
    ],
    { name: 'Odyssey' }
  );



  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 12,
    streetViewControl: false,
    mapTypeControlOptions: {
      // mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
      //   'styled_map']
    }
  });

  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
  infoWindow = new google.maps.InfoWindow;

  // HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here!');
      infoWindow.open(map);
      map.setCenter(pos);

      // var marker = new google.maps.Marker({
      //   position: pos,
      //   map: map,
      //   title: 'Hello World!'
      // });
      // marker.setMap(map);

    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

/*************************************************************/
/*************************************************************/
/*******************What is on your mind? ********************/
/*************************************************************/
/*************************************************************/
whatsOnMind = () => {
  document.getElementById("userThought").value = "";
  document.getElementById("mapBackground").classList.add("blurEffect");
  document.getElementById("mainTimeline").classList.add("blurEffect");

  var modal = document.getElementById("myModal");
  modal.style.display = "contents";

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    document.getElementById("mapBackground").classList.remove("blurEffect");
    document.getElementById("mainTimeline").classList.remove("blurEffect");
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.getElementById("mapBackground").classList.remove("blurEffect");
      document.getElementById("mainTimeline").classList.remove("blurEffect");
    }
  }
}

/*************************************************************/
/************************Switch view**************************/
/*************************************************************/
var visbleTeamThings = true;
switchView = () => {

  document.getElementById("mainTimeline").classList.toggle('hideTimeline');
  document.getElementById("map").classList.toggle('IncMapHt');
  document.getElementById("switchView").classList.toggle('switchViewBtnDown');
  document.getElementById("arView").classList.toggle('switchArViewBtnn');
  visbleTeamThings ? showTeamThings() : hideTeamThings();
}
showTeamThings = () => {
  for (let i = 0; i < flagTeamMarkerArr.length; i++) {
    flagTeamMarkerArr[i].setVisible(true);
  }
  for (let i = 0; i < flagTeamOverlayArr.length; i++) {
    flagTeamOverlayArr[i].setMap(map);
  }
  visbleTeamThings = false;
}
hideTeamThings = () => {
  for (let i = 0; i < flagTeamMarkerArr.length; i++) {
    flagTeamMarkerArr[i].setVisible(false);
  }
  for (let i = 0; i < flagTeamOverlayArr.length; i++) {
    flagTeamOverlayArr[i].setMap(null);
  }
  visbleTeamThings = true;
}
/*************************************************************/
/*************************************************************/
/*************************************************************/

/*************************************************************/
/*************************************************************/
/************************Check-in Feature ********************/
/*************************************************************/
/*************************************************************/
var currentPosition;
var currentPositionConst; //Dont modify this variable in code.
/************************Loading Location ********************/
loadCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(function (position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    currentPosition = pos;
    currentPositionConst = pos;
  });
}
/*************************************************************/
checkInAtPlace = () => {
  console.log("Check in clicked");
  document.getElementById("myModal").style.display = "none";
  document.getElementById("mapBackground").classList.remove("blurEffect");
  document.getElementById("mainTimeline").classList.remove("blurEffect");
  var userThought = document.getElementById("userThought").value;
  // Placing a flag on map
  infoWindow.close();
  navigator.geolocation.getCurrentPosition(function (position) {
    var pos = {
      lat: position.coords.latitude + parseFloat((Math.random() / 100).toFixed(4)),
      lng: position.coords.longitude + parseFloat((Math.random() / 100).toFixed(4))
    };
    //currentPosition=pos;
    var country = "India";
    //Get the current address
    geoCoder(currentPosition);

    //Marker 
    placeMarker(pos, country);

    //Overlay
    //createOverlay(pos);
    //Timeline Entry
    //addTimelineEntry(userThought);
    setTimeout(function () { addTimelineEntry(userThought); }, 500);
  });
  navigator.geolocation.getCurrentPosition(function (position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    setTimeout(function () { updateAllOverlaysBatch(pos);}, 500);
  });
}

/*************************************************************/
/**************************Geocoder***************************/
/*************************************************************/
var address = "A wonderful place";
geoCoder = (pos) => {
  //Getting the current address
  var geocoder = new google.maps.Geocoder;

  geocoder.geocode({
    'location': pos
  }, function (results, status) {
    if (status === 'OK') {
      if (results[0]) {

        //This is yout formatted address
        //alert(results[0].formatted_address);
         address = results[0].address_components.filter(ac => ~ac.types.indexOf('locality'))[0].long_name;
        address = results[0].address_components.filter(ac => ~ac.types.indexOf('administrative_area_level_2'))[0].long_name;
        address = address + ", " + results[0].address_components.filter(ac => ~ac.types.indexOf('administrative_area_level_1'))[0].long_name;
        address = address + ", " + results[0].address_components.filter(ac => ~ac.types.indexOf('country'))[0].long_name;
      } else {
        //return "Location not available";
      }
    } else {
      //alert('Geocoder failed due to: ' + status);
      //return "Location not available";
    }
  });
}

/*************************************************************/
/**********************Place Marker***************************/
/*************************************************************/
placeMarker = (pos, country) => {
  var img = "";
  if (country === "India") {
    img = 'pinIndia';
    countryFlagCount.IndiaFlagsCount++;
  } else if (country === "Turkey") {
    img = 'pinTurkey';
    countryFlagCount.TurkeyFlagsCount++;
  } else if (country === "Brazil") {
    img = 'pinBrazil';
    countryFlagCount.BrazilFlagsCount++;
  } else if (country === "Southkorea") {
    img = 'pinSouthkorea';
    countryFlagCount.SouthkoreaFlagsCount++;
  } else if (country === "Russia") {
    img = 'pinRussia';
    countryFlagCount.RussiaFlagsCount++;
  }
  //confetti.start(800);
  var image = {
    url: 'images/' + img + '.png',
    scaledSize: new google.maps.Size(40, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  flagMarker = new google.maps.Marker({
    position: pos,
    map: map,
    icon: image
  });
  flagMarker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function () { flagMarker.setAnimation(null); }, 4000);
}

/*************************************************************/
/*******************Place Marker of teams*********************/
/*************************************************************/
var flagTeamMarkerArr = [];
placeMarkerTeam = (pos, country) => {
  var img = "";
  if (country === "India") {
    img = 'pinIndia';
  } else if (country === "Turkey") {
    img = 'pinTurkey';
  } else if (country === "Brazil") {
    img = 'pinBrazil';
  } else if (country === "Southkorea") {
    img = 'pinSouthkorea';
  } else if (country === "Russia") {
    img = 'pinRussia';
  }
  //confetti.start(800);
  var image = {
    url: 'images/' + img + '.png',
    scaledSize: new google.maps.Size(40, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  flagTeamMarker = new google.maps.Marker({
    position: pos,
    map: map,
    icon: image
  });
  flagTeamMarkerArr.push(flagTeamMarker);
  flagTeamMarker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function () { flagTeamMarker.setAnimation(null); }, 4000);
}

/*************************************************************/
/**********************Create Overlays************************/
/*************************************************************/
var flagTeamOverlayArr = [];
createOverlay = (pos, country) => {
  //Overlay Country flag
  var img = "";
  if (country === "India") {
    img = 'overlayIndia';
  } else if (country === "Turkey") {
    img = 'overlayTurkey';
  } else if (country === "Brazil") {
    img = 'overlayBrazil';
  } else if (country === "Southkorea") {
    img = 'overlaySouthkorea';
  }
  var imageBounds = {
    // north: parseFloat(pos.lat) + 0.012,
    // south: parseFloat(pos.lat) - 0.012,
    // east: parseFloat(pos.lng) + 0.03, //right
    // west: parseFloat(pos.lng) - 0.035 //left
    north: parseFloat(pos.lat) + 0.018,
    south: parseFloat(pos.lat) - 0.018,
    east: parseFloat(pos.lng) + 0.04, //right
    west: parseFloat(pos.lng) - 0.055 //left
  };
  var overlayOpts = {
    opacity: 0.3
  }
  flagOverlay = new google.maps.GroundOverlay("images/" + img + ".png",
    imageBounds, overlayOpts);
  flagOverlay.setMap(map);
  flagTeamOverlayArr.push(flagOverlay);
}

/*************************************************************/
/********************Update Overlays Batch********************/
/*************************************************************/

updateAllOverlaysBatch = (pos) => {
  console.log(countryFlagCount.IndiaFlagsCount);
  if (countryFlagCount.IndiaFlagsCount > countryFlagCount.TurkeyFlagsCount) {
    // if (findMax(countryFlagCount) === "TurkeyFlagsCount") {
    //   var country = "Turkey";
    // } else if (findMax(countryFlagCount) === "IndiaFlagsCount") {
    //   var country = "India";
    // }
    var country = "India";
    if (country === "India") {
      img = 'overlayIndia';
    } else if (country === "Turkey") {
      img = 'overlayTurkey';
    } else if (country === "Brazil") {
      img = 'overlayBrazil';
    } else if (country === "Southkorea") {
      img = 'overlaySouthkorea';
    }
    var imageBounds = {
      // north: parseFloat(pos.lat) + 0.012,
      // south: parseFloat(pos.lat) - 0.012,
      // east: parseFloat(pos.lng) + 0.03, //right
      // west: parseFloat(pos.lng) - 0.035 //left
      north: parseFloat(pos.lat) + 0.018,
      south: parseFloat(pos.lat) - 0.018,
      east: parseFloat(pos.lng) + 0.04, //right
      west: parseFloat(pos.lng) - 0.055 //left
    };
    var overlayOpts = {
      opacity: 0.8
    }
    flagOverlay = new google.maps.GroundOverlay("images/" + img + ".png",
      imageBounds, overlayOpts);
    flagOverlay.setMap(map);
    flagTeamOverlayArr.push(flagOverlay);
    // setTimeout(function () { hideTeamThings();}, 1000);
    // flagOverlay.setMap(null);
    if(visbleTeamThings) {
      flagOverlay.setMap(null);
    } else {
      flagOverlay.setMap(map);
    }
  }
}


/*************************************************************/
/********************Add timeline Entry***********************/
/*************************************************************/
addTimelineEntry = (userThought) => {
  // Appending the div to timeline
  var contentContainerDiv = document.createElement('div');
  contentContainerDiv.className = 'container right';
  contentContainerDiv.id = "contentContainerDiv";

  var timeline = document.getElementById("mainTimeline");
  timeline.insertBefore(contentContainerDiv, timeline.childNodes[0]);

  var contentDiv = document.createElement('div');
  contentDiv.className = 'content';
  contentDiv.id = 'contentDiv';
  document.getElementById("contentContainerDiv").appendChild(contentDiv);

  var h3 = document.createElement("H3")
  var text = document.createTextNode(address);
  h3.appendChild(text);
  document.getElementById("contentDiv").appendChild(h3);

  var datetime = new Date().toLocaleString(); + " " + new Date().toLocaleTimeString();
  var h4 = document.createElement("H4");
  var text = document.createTextNode(datetime);
  h4.appendChild(text);
  document.getElementById("contentDiv").appendChild(h4);

  var p = document.createElement("P");
  var text = document.createTextNode(userThought);
  p.appendChild(text);
  document.getElementById("contentDiv").appendChild(p);

}

/*************************************************************/
/*************************************************************/
/**************************AR Flags **************************/
/*************************************************************/
/*************************************************************/
showFlags = () => {
  app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
  loadARchitectWorld();
  //app.loadARchitectWorld();
} 

//Use the following path with PhoneGap. Remove it with the Cordova build.
//cordova.file.dataDirectory + 'www/pgday/index.html'
loadARchitectWorld = () => {
  //console.log(cordova.file.dataDirectory);
  app.wikitudePlugin.isDeviceSupported(function () {
    app.wikitudePlugin.loadARchitectWorld(function successFn(loadedURL) {
    }, function errorFn(error) { 
      console.log('Loading AR web view failed: ' + error);
    },
    cordova.file.dataDirectory + 'www/pgday/index.html', ['2d_tracking'], { camera_position: 'back' }
    );
  }, function (errorMessage) {
    console.log(errorMessage);
  },
    ['2d_tracking']
  );
}

/*************************************************************/
/*************************************************************/
/*******************Coins Collection**************************/
/*************************************************************/
/*************************************************************/
collectCoins = () => {
  app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
  loadCoins();
}

loadCoins = () => {
  app.wikitudePlugin.isDeviceSupported(function () {
    app.wikitudePlugin.loadARchitectWorld(function successFn(loadedURL) {
    }, function errorFn(error) {
      console.log('Loading AR web view for Coins failed: ' + error);
    },
      cordova.file.dataDirectory + 'www/coinCollection/index.html', ['2d_tracking'], { camera_position: 'back' }
    );
  }, function (errorMessage) {
    console.log(errorMessage);
  },
    ['2d_tracking']
  );
}

/*************************************************************/
/*************************************************************/
/************************Init Demo Overlays*******************/
/*************************************************************/
/*************************************************************/
initAllDemoOverlays = () => {
  //#1
  var country = "Turkey";
  createOverlay(currentPositionConst, country);
  //#2
  var country = "Brazil";
  var pos = {
    lat: 49.267132,
    lng: -122.968941
  };
  createOverlay(pos, country);
}

/*************************************************************/
/*************************************************************/
/************************Init Demo Markers********************/
/*************************************************************/
/*************************************************************/
initAllDemoMarkers = () => {
  //Demo Current location
  //#a.1
  currentPosition.lat = currentPosition.lat + parseFloat((Math.random() / 100).toFixed(4));
  currentPosition.lng = currentPosition.lng + parseFloat((Math.random() / 100).toFixed(4));
  var country = "Turkey";
  placeMarkerTeam(currentPosition, country);
  //#a.2
  currentPosition.lat = currentPosition.lat + parseFloat((Math.random() / 100).toFixed(4));
  currentPosition.lng = currentPosition.lng + parseFloat((Math.random() / 100).toFixed(4));
  var country = "Turkey";
  placeMarkerTeam(currentPosition, country);
  //#a.3
  currentPosition.lat = currentPosition.lat + parseFloat((Math.random() / 100).toFixed(4));
  currentPosition.lng = currentPosition.lng + parseFloat((Math.random() / 100).toFixed(4));
  var country = "India";
  placeMarkerTeam(currentPosition, country);

  //Demo Brazil & Korea
  //b.1
  var pos = {
    lat: 49.267132 + parseFloat((Math.random() / 100).toFixed(4)),
    lng: -122.968941 + parseFloat((Math.random() / 100).toFixed(4))
  };
  var country = "Southkorea";
  placeMarkerTeam(pos, country);
  //b.2
  var pos = {
    lat: 49.267132 + parseFloat((Math.random() / 100).toFixed(4)),
    lng: -122.968941 + parseFloat((Math.random() / 100).toFixed(4))
  };
  var country = "Southkorea";
  placeMarkerTeam(pos, country);
  //b.3
  var pos = {
    lat: 49.267132 + parseFloat((Math.random() / 100).toFixed(4)),
    lng: -122.968941 + parseFloat((Math.random() / 100).toFixed(4))
  };
  var country = "Brazil";
  placeMarkerTeam(pos, country);
  //b.4
  var pos = {
    lat: 49.267132 + parseFloat((Math.random() / 100).toFixed(4)),
    lng: -122.968941 + parseFloat((Math.random() / 100).toFixed(4))
  };
  var country = "Brazil";
  placeMarkerTeam(pos, country);
  //b.5
  var pos = {
    lat: 49.267132 + parseFloat((Math.random() / 100).toFixed(4)),
    lng: -122.968941 + parseFloat((Math.random() / 100).toFixed(4))
  };
  var country = "Brazil";
  placeMarkerTeam(pos, country);
}
/*************************************************************/
/*************************************************************/
/**********************Timeline Entry Option******************/
/*************************************************************/
/*************************************************************/
function entryOptions() {
  //Delete the timeline Entry

}

/*************************************************************/
/**********************Find Max Count*************************/
/***************************Reference:************************/
// https://stackoverflow.com/questions/28882590/return-the-name-of-variable-with-highest-value

function findMax(obj) {
  var keys = Object.keys(obj);
  var max = keys[0];
  for (var i = 1, n = keys.length; i < n; ++i) {
    var k = keys[i];
    if (obj[k] > obj[max]) {
      max = k;
    }
  }
  return max;
}

/*************************************************************/
/*************************************************************/
/*******************For future references ********************/
/*************************************************************/
/*************************************************************/
// beachMarker.addListener('click', toggleBounce);
// function toggleBounce() {
//   if (beachMarker.getAnimation() !== null) {
//     beachMarker.setAnimation(null);
//   } else {
//     beachMarker.setAnimation(google.maps.Animation.BOUNCE);
//   }
//  
// }
//Overlay Circle 
// var antennasCircle = new google.maps.Circle({
//   strokeColor: "#FF0000",
//   strokeOpacity: 0.8,
//   strokeWeight: 2,
//   fillColor: "#FF0000",
//   fillOpacity: 0.35,
//   map: map,
//   center: pos,
//   radius: 100,
// });
// map.fitBounds(antennasCircle.getBounds());
// var map;
// function initMap() {
//   console.log("Trying to display map");  
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 49.246292, lng: -123.116226},
//     zoom: 6,
//     mapTypeId: 'hybrid'
//   });
// }


// Yalcin Tatar - Search Place Part ////
findPlaces = () => {
  navigator.geolocation.getCurrentPosition(function (ps) {
    var pos = {
      lat: ps.coords.latitude,
      lng: ps.coords.longitude
    };
    console.log(pos.lat);
    //Get all places within 200 meters
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url =`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=200&key=`
    fetch(proxyurl + url)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log(response);
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
          var getDropDown = document.getElementById('dropdown-places');
          getDropDown.options.length = 1;
          var checkInButton = document.getElementsByClassName('checkinIcon');
          //If there is no places within 200 meters  change button color.
          if(data.status === "ZERO_RESULTS"){

            checkInButton[0].src = "images/checkinIcon-disable.svg";
            checkInButton[0].onclick = function(){myApp.alert("There is no place which is nearby", 'Error!');};

          }
          else{

            checkInButton[0].src = "images/checkin.svg";
            checkInButton[0].onclick =function(){whatsOnMind()};

            for(let i=0; i<data.results.length;i++){

              // console.log(data.results[i].name);
              var option = document.createElement("OPTION");
              option.text = data.results[i].name;
              getDropDown.appendChild(option);
            }

            console.log(data);
          }
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  });

}
function errorHandler(err) {
  if(err.code == 1) {
     alert("Error: Access is denied!");
  } else if( err.code == 2) {
     alert("Error: Position is unavailable!");
  }
}

// locationTracking = () => {
//   navigator.geolocation.watchPosition(findPlaces,errorHandler);
// }
