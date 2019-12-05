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

// Declare our zoom points on the map
point_home = L.latLng( 34.0522, -118.2437);
point_1 = L.latLng(50.5, 30.5);
point_hollywood = L.latLng(34.1016774615434, -118.330135345459);
burbank = L.latLng(34.18539 ,-118.364295);

// This is a callback function 
// it changes locations for us
zoomToLocation = (point, zoom) => {
    mymap.flyTo(point, zoom, 
                {'animate': true, 
                 'duration': 2,
                'easeLinearity': 0.1});
    // mymap.setZoom(zoom);
};

make_waypoint = (selector, triggerpoint) => 
{
  new Waypoint({
  element: document.querySelector(selector),
  handler: function(direction) {
  zoomToLocation(triggerpoint, 15); 
  console.log('Triggered a waypoint with params: ' + selector + triggerpoint);  
  console.log('Scrolled to ' + direction);
  },
  offset: 80 

});
}

make_waypoint('#hollywood', point_hollywood);

var waypoint = new Waypoint({
  element: document.querySelector('#burbank'),
  handler: function(direction) {
  zoomToLocation(burbank, 15);  
    console.log('Scrolled to ' + direction);
  }
});

var waypoint2 = new Waypoint({
  element: document.querySelector(".introduction"),
  handler: function(direction) {
    zoomToLocation(point_home, 8);
    console.log('Scroll handler for down' + this);
  }
});


// mymap.panTo(point_1);