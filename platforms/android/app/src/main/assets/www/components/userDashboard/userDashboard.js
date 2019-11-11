// var map;
// function initMap() {
//   console.log("Trying to display map");  
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 49.246292, lng: -123.116226},
//     zoom: 6,
//     mapTypeId: 'hybrid'
//   });
// }


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
switchView = () => {
  document.getElementById("mainTimeline").classList.toggle('hideTimeline');
  document.getElementById("map").classList.toggle('IncMapHt');
  document.getElementById("switchView").classList.toggle('switchViewBtnDown');
  document.getElementById("arView").classList.toggle('switchArViewBtnn');
}

/*************************************************************/
/*************************************************************/
/************************Check-in Feature ********************/
/*************************************************************/
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
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    //Get the current address
    geoCoder(pos);
    
    //Marker
    placeMarker(pos);
    
    //Overlay
    //createOverlay(pos);

    //Timeline Entry
    //addTimelineEntry(userThought);
    setTimeout(function(){ addTimelineEntry(userThought); }, 500);
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
        address = results[0].address_components.filter(ac=>~ac.types.indexOf('route'))[0].long_name;
        address = address +", "+ results[0].address_components.filter(ac=>~ac.types.indexOf('locality'))[0].long_name;
        address = address +", "+ results[0].address_components.filter(ac=>~ac.types.indexOf('administrative_area_level_1'))[0].long_name;
        address = address +", "+ results[0].address_components.filter(ac=>~ac.types.indexOf('country'))[0].long_name;
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
placeMarker = (pos) => {
  confetti.start(800);
  var image = {
    url: 'images/pinIndia.png',
    scaledSize: new google.maps.Size(40, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  var beachMarker = new google.maps.Marker({
    position: pos,
    map: map,
    icon: image
  });
  beachMarker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function () { beachMarker.setAnimation(null); }, 4000);
}

/*************************************************************/
/**********************Create Overlays************************/
/*************************************************************/
createOverlay = (pos) => {
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

  //Overlay Country flag
  var imageBounds = {
    // north: parseFloat(pos.lat) + 0.012,
    // south: parseFloat(pos.lat) - 0.012,
    // east: parseFloat(pos.lng) + 0.03, //right
    // west: parseFloat(pos.lng) - 0.035 //left
    north: parseFloat(pos.lat) + 0.018,
    south: parseFloat(pos.lat) - 0.018,
    east: parseFloat(pos.lng) + 0.08, //right
    west: parseFloat(pos.lng) - 0.085 //left
  };
  var overlayOpts = {
    opacity: 0.4
  }
  flagOverlay = new google.maps.GroundOverlay("images/overlayIndia.png",
    imageBounds, overlayOpts);
  flagOverlay.setMap(map);
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
  contentDiv.id='contentDiv';
  document.getElementById("contentContainerDiv").appendChild(contentDiv);

  var h3 = document.createElement("H3")                
  var text = document.createTextNode(address);     
  h3.appendChild(text);
  document.getElementById("contentDiv").appendChild(h3); 

  var datetime = new Date().toLocaleString(); + " " + new Date().toLocaleTimeString();
  var h4 = document.createElement("H4")                
  var text = document.createTextNode(datetime);     
  h4.appendChild(text);
  document.getElementById("contentDiv").appendChild(h4);  

  var p = document.createElement("P")                
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
      'www/pgday/index.html', ['2d_tracking'], { camera_position: 'back' }
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
// }

/*************************************************************/
/*************************************************************/
/************************Init Demo Overlays*******************/
/*************************************************************/
/*************************************************************/
initAllDemoOverlays=()=> {
  var pos = {
    lat: 49.397,
    lng: -122.975
  };
  //Overlay
  createOverlay(pos);
}

/*************************************************************/
/*************************************************************/
/************************Init Demo Markers********************/
/*************************************************************/
/*************************************************************/
initAllDemoMarkers=()=> {
  var pos = {
    lat: 49.397,
    lng: -122.975
  };
  //Marker
  placeMarker(pos);
}
