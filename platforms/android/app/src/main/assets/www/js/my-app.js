// Initialize app
var app = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

$$('.popup-about').on('popup:open', function (e) {
    console.log('About popup open');
});
$$('.popup-about').on('popup:opened', function (e) {
    console.log('About popup opened');
});

// Add view
var mainView = app.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
app.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }

    if (page.name === 'userDashbaord') {
        console.log("User Dashboard Page");
        console.log(mainView);
        //This function checks user location when the DashBoard screen is opened, and if the user location changes , it call findPlaces method.
        navigator.geolocation.watchPosition(findPlaces,errorHandler);
        initMap();
        loadCurrentLocation();
        setTimeout(function () { initAllDemoOverlays(); }, 6000);
        setTimeout(function () { initAllDemoMarkers(); }, 6000);
        setTimeout(function () { hideTeamThings(); }, 6000);
    }
    if (page.name === 'team-splash') { 
        changeTeamFlag();
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page');
})

