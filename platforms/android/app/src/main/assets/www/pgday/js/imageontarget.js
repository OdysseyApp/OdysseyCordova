// var World = {
// 	loaded: false,

// 	init: function initFn() {
// 		this.createOverlays();
// 	},

// 	createOverlays: function createOverlaysFn() {
// 		/*
// 			First an AR.ClientTracker needs to be created in order to start the recognition engine. It is initialized with a URL specific to the target collection. Optional parameters are passed as object in the last argument. In this case a callback function for the onLoaded trigger is set. Once the tracker is fully loaded the function worldLoaded() is called.

// 			Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
// 			Use a specific target name to respond only to a certain target or use a wildcard to respond to any or a certain group of targets.
// 		*/
// 		this.tracker = new AR.ClientTracker("assets/samurai_bot.wtc", {
// 			onLoaded: this.worldLoaded
// 		});

// 		/*
// 			The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.Trackable2DObject) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.
// 		*/


// 		var samurai_eyes = new AR.ImageResource("assets/samurai-eyes.png");
// 		var samurai_eyes_animate = new AR.AnimatedImageDrawable(samurai_eyes, 1, 286, 315, {
// 			offsetX: 0,
// 			offsetY: 0
// 		});
// 		samurai_eyes_animate.animate([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], 50, -1);
 
// 		var phonegap_text = new AR.ImageResource("assets/phonegap.png");
// 		var overlayOne = new AR.ImageDrawable(phonegap_text, 0.2, {
// 			offsetX: 0,
// 			offsetY: -0.70
// 		});

// 		/*
// 			The last line combines everything by creating an AR.Trackable2DObject with the previously created tracker, the name of the image target and the drawable that should augment the recognized image.
// 			Please note that in this case the target name is a wildcard. Wildcards can be used to respond to any target defined in the target collection. If you want to respond to a certain target only for a particular AR.Trackable2DObject simply provide the target name as specified in the target collection.
// 		*/
// 		var pageOne = new AR.Trackable2DObject(this.tracker, "*", {
// 			drawables: {
// 				cam: [samurai_eyes_animate, overlayOne]
// 			}
// 		});
// 	},

// 	worldLoaded: function worldLoadedFn() {
// 		var message = " style='text-align: center; font-family:Arial, sans-serif;'";
// 		document.getElementById('loadingMessage').innerHTML =
// 			"<div" + message + ">Swipe right or use back button to exit.</div>";

// 		// Remove Scan target message after 10 sec.
// 		setTimeout(function() {
// 			var e = document.getElementById('loadingMessage');
// 			e.parentElement.removeChild(e);
// 		}, 10000);
// 	}
// };

// World.init();

// /* Implementation of AR-Experience (aka "World"). */
// var World = {
//     /* You may request new data from server periodically, however: in this sample data is only requested once. */
//     isRequestingData: false,

//     /* True once data was fetched. */
//     initiallyLoadedData: false,

//     /* Different POI-Marker assets. */
//     markerDrawableIdle: null,
//     markerDrawableSelected: null,
//     markerDrawableDirectionIndicator: null,


//     /* List of AR.GeoObjects that are currently shown in the scene / World. */
//     markerList: [],

//     /* the last selected marker. */
//     currentMarker: null,

//     /* Called to inject new POI data. */
//     loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {
//         /* Empty list of visible markers. */
//         World.markerList = [];

//         /* Start loading marker assets. */
//         World.markerDrawableIdle = new AR.ImageResource("assets/marker_idle.png", {
//             onError: World.onError
//         });
//         World.markerDrawableSelected = new AR.ImageResource("assets/marker_selected.png", {
//             onError: World.onError
//         });
//         World.markerDrawableDirectionIndicator = new AR.ImageResource("assets/indi.png", {
//             onError: World.onError
//         });


//         /* Loop through POI-information and create an AR.GeoObject (=Marker) per POI. */
//         for (var currentPlaceNr = 0; currentPlaceNr < poiData.length; currentPlaceNr++) {
//             var singlePoi = {
//                 "id": poiData[currentPlaceNr].id,
//                 "latitude": parseFloat(poiData[currentPlaceNr].latitude),
//                 "longitude": parseFloat(poiData[currentPlaceNr].longitude),
//                 "altitude": parseFloat(poiData[currentPlaceNr].altitude),
//                 "title": poiData[currentPlaceNr].name,
//                 "description": poiData[currentPlaceNr].description
//             };

//             /*
//                 To be able to deselect a marker while the user taps on the empty screen, the World object holds an
//                  array that contains each marker.
//             */
//             World.markerList.push(new Marker(singlePoi));
//         }

//         World.updateStatusMessage(currentPlaceNr + ' places loaded');
//     },

//     /* Updates status message shown in small "i"-button aligned bottom center. */
//     updateStatusMessage: function updateStatusMessageFn(message, isWarning) {

//         var themeToUse = isWarning ? "e" : "c";
//         var iconToUse = isWarning ? "alert" : "info";

//         $("#status-message").html(message);
//         $("#popupInfoButton").buttonMarkup({
//             theme: themeToUse,
//             icon: iconToUse
//         });
//     },

//     /* Location updates, fired every time you call architectView.setLocation() in native environment. */
//     locationChanged: function locationChangedFn(lat, lon, alt, acc) {

//         /*
//             The custom function World.onLocationChanged checks with the flag World.initiallyLoadedData if the
//             function was already called. With the first call of World.onLocationChanged an object that contains geo
//             information will be created which will be later used to create a marker using the
//             World.loadPoisFromJsonData function.
//         */
//         if (!World.initiallyLoadedData) {
//             /*
//                 requestDataFromLocal with the geo information as parameters (latitude, longitude) creates different
//                 poi data to a random location in the user's vicinity.
//             */
//             World.requestDataFromLocal(lat, lon);
//             World.initiallyLoadedData = true;
//         }
//     },

//     /* Fired when user pressed maker in cam. */
//     onMarkerSelected: function onMarkerSelectedFn(marker) {

//         /* Deselect previous marker. */
//         if (World.currentMarker) {
//             if (World.currentMarker.poiData.id === marker.poiData.id) {
//                 return;
//             }
//             World.currentMarker.setDeselected(World.currentMarker);
//         }

//         /* Highlight current one. */
//         marker.setSelected(marker);
//         World.currentMarker = marker;
//     },

//     /* Screen was clicked but no geo-object was hit. */
//     onScreenClick: function onScreenClickFn() {
//         if (World.currentMarker) {
//             World.currentMarker.setDeselected(World.currentMarker);
//         }
//     },

//     /* Request POI data. */
//     requestDataFromLocal: function requestDataFromLocalFn(centerPointLatitude, centerPointLongitude) {
//         var poisToCreate = 20;
//         var poiData = [];

//         for (var i = 0; i < poisToCreate; i++) {
//             poiData.push({
//                 "id": (i + 1),
//                 "longitude": (centerPointLongitude + (Math.random() / 5 - 0.1)),
//                 "latitude": (centerPointLatitude + (Math.random() / 5 - 0.1)),
//                 "description": ("This is the description of POI#" + (i + 1)),
//                 /* Use this value to ignore altitude information in general - marker will always be on user-level. */
//                 "altitude": AR.CONST.UNKNOWN_ALTITUDE,
//                 "name": ("POI#" + (i + 1))
//             });
//         }
//         World.loadPoisFromJsonData(poiData);
//     },

//     onError: function onErrorFn(error) {
//         alert(error);
//     }
// };

// /*
//     Set a custom function where location changes are forwarded to. There is also a possibility to set
//     AR.context.onLocationChanged to null. In this case the function will not be called anymore and no further
//     location updates will be received.
// */
// AR.context.onLocationChanged = World.locationChanged;

// /*
//     To detect clicks where no drawable was hit set a custom function on AR.context.onScreenClick where the
//     currently selected marker is deselected.
// */
// AR.context.onScreenClick = World.onScreenClick;

/*
    Information about server communication. This sample webservice is provided by Wikitude and returns random dummy
    places near given location.
 */
var ServerInformation = {
    POIDATA_SERVER: "https://example.wikitude.com/GetSamplePois/",
    POIDATA_SERVER_ARG_LAT: "lat",
    POIDATA_SERVER_ARG_LON: "lon",
    POIDATA_SERVER_ARG_NR_POIS: "nrPois"
};

/* Implementation of AR-Experience (aka "World"). */
var World = {
    /* You may request new data from server periodically, however: in this sample data is only requested once. */
    isRequestingData: false,

    /* True once data was fetched. */
    initiallyLoadedData: false,

    /* Different POI-Marker assets. */
    markerDrawableIdle: null,
    markerDrawableSelected: null,
    markerDrawableDirectionIndicator: null,

    /* List of AR.GeoObjects that are currently shown in the scene / World. */
    markerList: [],

    /* the last selected marker. */
    currentMarker: null,

    locationUpdateCounter: 0,
    updatePlacemarkDistancesEveryXLocationUpdates: 10,

    /* Called to inject new POI data. */
    loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {

        /* Empty list of visible markers. */
        World.markerList = [];

        /* Start loading marker assets. */
        World.markerDrawableIdle = new AR.ImageResource("assets/marker_idle.png", {
            onError: World.onError
        });
        World.markerDrawableSelected = new AR.ImageResource("assets/marker_selected.png", {
            onError: World.onError
        });
        World.markerDrawableDirectionIndicator = new AR.ImageResource("assets/indi.png", {
            onError: World.onError
        });

        /* Loop through POI-information and create an AR.GeoObject (=Marker) per POI. */
        for (var currentPlaceNr = 0; currentPlaceNr < poiData.length; currentPlaceNr++) {
            var singlePoi = {
                "id": poiData[currentPlaceNr].id,
                "latitude": parseFloat(poiData[currentPlaceNr].latitude),
                "longitude": parseFloat(poiData[currentPlaceNr].longitude),
                "altitude": parseFloat(poiData[currentPlaceNr].altitude),
                "title": poiData[currentPlaceNr].name,
                "description": poiData[currentPlaceNr].description
            };

            World.markerList.push(new Marker(singlePoi));
        }

        /* Updates distance information of all placemarks. */
        World.updateDistanceToUserValues();

        World.updateStatusMessage(currentPlaceNr + ' places loaded');
    },

    /*
        Sets/updates distances of all makers so they are available way faster than calling (time-consuming)
        distanceToUser() method all the time.
     */
    updateDistanceToUserValues: function updateDistanceToUserValuesFn() {
        for (var i = 0; i < World.markerList.length; i++) {
            World.markerList[i].distanceToUser = World.markerList[i].markerObject.locations[0].distanceToUser();
        }
    },

    /* Updates status message shown in small "i"-button aligned bottom center. */
    updateStatusMessage: function updateStatusMessageFn(message, isWarning) {

        var themeToUse = isWarning ? "e" : "c";
        var iconToUse = isWarning ? "alert" : "info";

        $("#status-message").html(message);
        $("#popupInfoButton").buttonMarkup({
            theme: themeToUse,
            icon: iconToUse
        });
    },

    /* Location updates, fired every time you call architectView.setLocation() in native environment. */
    locationChanged: function locationChangedFn(lat, lon, alt, acc) {

        /* Request data if not already present. */
        if (!World.initiallyLoadedData) {
            World.requestDataFromServer(lat, lon);
            World.initiallyLoadedData = true;
        } else if (World.locationUpdateCounter === 0) {
            /*
                Update placemark distance information frequently, you max also update distances only every 10m with
                some more effort.
             */
            World.updateDistanceToUserValues();
        }

        /* Helper used to update placemark information every now and then (e.g. every 10 location upadtes fired). */
        World.locationUpdateCounter =
            (++World.locationUpdateCounter % World.updatePlacemarkDistancesEveryXLocationUpdates);
    },

    /*
        POIs usually have a name and sometimes a quite long description.
        Depending on your content type you may e.g. display a marker with its name and cropped description but
        allow the user to get more information after selecting it.
    */

    /* Fired when user pressed maker in cam. */
    onMarkerSelected: function onMarkerSelectedFn(marker) {
        World.currentMarker = marker;

        /*
            In this sample a POI detail panel appears when pressing a cam-marker (the blue box with title &
            description), compare index.html in the sample's directory.
        */
        /* Update panel values. */
        $("#poi-detail-title").html(marker.poiData.title);
        $("#poi-detail-description").html(marker.poiData.description);


        /*
            It's ok for AR.Location subclass objects to return a distance of `undefined`. In case such a distance
            was calculated when all distances were queried in `updateDistanceToUserValues`, we recalculate this
            specific distance before we update the UI.
         */
        if (undefined === marker.distanceToUser) {
            marker.distanceToUser = marker.markerObject.locations[0].distanceToUser();
        }

        /*
            Distance and altitude are measured in meters by the SDK. You may convert them to miles / feet if
            required.
        */
        var distanceToUserValue = (marker.distanceToUser > 999) ?
            ((marker.distanceToUser / 1000).toFixed(2) + " km") :
            (Math.round(marker.distanceToUser) + " m");

        $("#poi-detail-distance").html(distanceToUserValue);

        /* Show panel. */
        $("#panel-poidetail").panel("open", 123);

        $(".ui-panel-dismiss").unbind("mousedown");

        /* Deselect AR-marker when user exits detail screen div. */
        $("#panel-poidetail").on("panelbeforeclose", function(event, ui) {
            World.currentMarker.setDeselected(World.currentMarker);
        });
    },

    /* Screen was clicked but no geo-object was hit. */
    onScreenClick: function onScreenClickFn() {
        /* You may handle clicks on empty AR space too. */
    },

    /* Returns distance in meters of placemark with maxdistance * 1.1. */
    getMaxDistance: function getMaxDistanceFn() {

        /* Sort places by distance so the first entry is the one with the maximum distance. */
        World.markerList.sort(World.sortByDistanceSortingDescending);

        /* Use distanceToUser to get max-distance. */
        var maxDistanceMeters = World.markerList[0].distanceToUser;

        /*
            Return maximum distance times some factor >1.0 so ther is some room left and small movements of user
            don't cause places far away to disappear.
         */
        return maxDistanceMeters * 1.1;
    },

    /*
        JQuery provides a number of tools to load data from a remote origin.
        It is highly recommended to use the JSON format for POI information. Requesting and parsing is done in a few lines of code.
        Use e.g. 'AR.context.onLocationChanged = World.locationChanged;' to define the method invoked on location updates.
        In this sample POI information is requested after the very first location update.

        This sample uses a test-service of Wikitude which randomly delivers geo-location data around the passed latitude/longitude user location.
        You have to update 'ServerInformation' data to use your own own server. Also ensure the JSON format is same as in previous sample's 'myJsonData.js'-file.
    */

    /* Request POI data. */
    requestDataFromServer: function requestDataFromServerFn(lat, lon) {

        /* Set helper var to avoid requesting places while loading. */
        World.isRequestingData = true;
        World.updateStatusMessage('Requesting places from web-service');

        /* Server-url to JSON content provider. */
        var serverUrl = ServerInformation.POIDATA_SERVER + "?" + ServerInformation.POIDATA_SERVER_ARG_LAT + "=" +
            lat + "&" + ServerInformation.POIDATA_SERVER_ARG_LON + "=" +
            lon + "&" + ServerInformation.POIDATA_SERVER_ARG_NR_POIS + "=20";

        var jqxhr = $.getJSON(serverUrl, function(data) {
                World.loadPoisFromJsonData(data);
            })
            .error(function(err) {
                World.updateStatusMessage("Invalid web-service response.", true);
                World.isRequestingData = false;
            })
            .complete(function() {
                World.isRequestingData = false;
            });
    },

    /* Helper to sort places by distance. */
    sortByDistanceSorting: function sortByDistanceSortingFn(a, b) {
        return a.distanceToUser - b.distanceToUser;
    },

    /* Helper to sort places by distance, descending. */
    sortByDistanceSortingDescending: function sortByDistanceSortingDescendingFn(a, b) {
        return b.distanceToUser - a.distanceToUser;
    },

    onError: function onErrorFn(error) {
        alert(error);
    }
};


/* Forward locationChanges to custom function. */
AR.context.onLocationChanged = World.locationChanged;

/* Forward clicks in empty area to World. */
AR.context.onScreenClick = World.onScreenClick;