/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");


// Leaflet maps //
// --------------------------------------------------------------- // 

mapOptions = {
  'preferCanvas': true,
  'zoomControl': false,
  'renderer': L.Canvas
 }

var mymap = L.map('mapid', mapOptions).setView([34.0522, -118.2437], 13);

// var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// 	subdomains: 'abcd',
// 	maxZoom: 19
// }).addTo(mymap);

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(mymap);


// WAYPOINTS //
// --------------------------------------------------------------- // 
// http://imakewebthings.com/waypoints/guides/getting-started/
point_home = L.latLng(-118.2437, );
point_1 = L.latLng(50.5, 30.5);

var waypoint = new Waypoint({
  element: document.getElementById('scrollstory'),
  handler: function(direction) {
    mymap.panTo(point_1);
    console.log('Scrolled to ' + direction);
  }
});

var waypoint2 = new Waypoint({
  element: document.getElementsByClassName("landmark"),
  handler: function(direction) {
    mymap.panTo(point_home);
    console.log('Scroll handler for down' + this);
  }
});


// mymap.panTo(point_1);