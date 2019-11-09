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
    zoom: 18,
    streetViewControl: false,
    mapTypeControlOptions: {
      // mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
      //   'styled_map']
    }
  });

  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
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

checkInAtPlace = () => {
  console.log("Hello Check in clicked");
  infoWindow.close();
  navigator.geolocation.getCurrentPosition(function (position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    var beachMarker = new google.maps.Marker({
      position: pos,
      map: map,
      icon: image
    });
    beachMarker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () { beachMarker.setAnimation(null); }, 4000);

    var antennasCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map: map,
      center: pos,
      radius: 50
    });
    //map.fitBounds(antennasCircle.getBounds());


    // beachMarker.addListener('click', toggleBounce);
    // function toggleBounce() {
    //   if (beachMarker.getAnimation() !== null) {
    //     beachMarker.setAnimation(null);
    //   } else {
    //     beachMarker.setAnimation(google.maps.Animation.BOUNCE);
    //   }
    // }
  });
}

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
    cordova.file.dataDirectory +  'www/pgday/index.html', ['2d_tracking'], { camera_position: 'back' }
    );
  }, function (errorMessage) {
    console.log(errorMessage);
  },
    ['2d_tracking']
  );
}
/*************************************************************/
/*************************************************************/
/**************************Coins Collection*******************/
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
    cordova.file.dataDirectory +  'www/coinCollection/index.html', ['2d_tracking'], { camera_position: 'back' }
    );
  }, function (errorMessage) {
    console.log(errorMessage);
  },
    ['2d_tracking']
  );
}