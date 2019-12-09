
// require('waypoints');
// prints "hi" in the browser's dev tools console
console.log("Successfully loaded javascript file");

// Leaflet maps //
// --------------------------------------------------------------- //

mapOptions = {
  preferCanvas: true,
  zoomControl: false,
  renderer: L.Canvas,
  dragging: false
};

point_home = L.latLng(34.0522, -118.2437);

mainMap = L.map("mapid", mapOptions).setView(point_home, 13);

CartoDB_Positron = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 15
  }
).addTo(mainMap);

var url_neighborhood_bounds =
  "https://s3-us-west-2.amazonaws.com/boundaries.latimes.com/archive/1.0/boundary-set/lapd-bureaus.geojson";
// "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/USA/CA/Los%20Angeles.geo.json";
// "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2FLA-Neighborhoods_crs.geojson?v=1575860761151";
// "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2FLA-Neighborhoods.geojson?v=1575855297854"

// var neighborhoodBounds = fetch(url_neighborhood_bounds)
//   .then(
//     function(response) {
//       if (response.status !== 200) {
//         console.log('Looks like there was a problem. Status Code: ' +
//           response.status);
//         return;
//       }

//       // Examine the text in the response
//       response.json().then(function(data) {
//         console.log(data);
//         return data;
//       });
//     }
//   )
//   .catch(function(err) {
//     console.log('Fetch Error :-S', err);
//   });

fetch(url_neighborhood_bounds)
  .then(res => {
    res.json();
    console.log(res);
  })
  .then(data => {
    console.log(data);
    var neighborhoods = L.geoJSON(data).addTo(mainMap);
  });

// data_neighborhoods = $.getJSON(url_neighborhood_bounds).responseJSON;
// neighborhoods = L.geoJson(geo).addTo(mymap); //Adds the layer to the map.
// WAYPOINTS //
// --------------------------------------------------------------- //
// http://imakewebthings.com/waypoints/guides/getting-started/

// Declare our zoom points on the map
// Make them with geojson.io but note that its flipped
// http://geojson.io/#map=19/40.80805/-73.96041
point_venice = L.latLng(33.99539435637889, -118.46677780151366);
point_hollywood = L.latLng(34.1016774615434, -118.330135345459);
point_nyc = L.latLng(40.80807627279606, -73.96046251058578);
point_burbank = L.latLng(34.18539, -118.364295);
point_koreatown = L.latLng(34.05776160573775, -118.30073833465576);

// This is a callback function
// it changes locations for us
zoomToLocation = (point, zoomLevel) => {
  mainMap.flyTo(point, zoomLevel, {
    animate: true,
    duration: 2,
    easeLinearity: 0.1
  });
  // mainMap.setZoom(zoom);
};

make_waypoint = (selector, triggerpoint, offsety, callbacky = x => {}) => {
  new Waypoint({
    element: document.querySelector(selector),
    handler: function(direction) {
      zoomToLocation(triggerpoint, 15);
      // callbacky = typeof callbacky !== undefined ? null: callbacky();
      callbacky();
      console.log(
        "Triggered a waypoint with params: " + selector + triggerpoint
      );
    },
    offset: offsety
  });
};

// var (hi, param2, param3) => {
//   dosomethin();
//   doanother();
//   return x;
// };

global_offset = 500;
make_waypoint("#introduction", point_home, global_offset);
make_waypoint("#koreatown", point_koreatown, global_offset);
make_waypoint("#venice", point_venice, global_offset, x => {
  console.log("lolol");
});
make_waypoint("#hollywood", point_hollywood, global_offset);
// make_waypoint("#burbank", point_burbank, 50);
make_waypoint("#appendix", point_nyc, global_offset);

// D3 Leaflet Magic
// -=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=-
// async function postData(url = "", data = {}) {
//   const response = await fetch(url_neighborhood_bounds);
//   const neighborhoodBounds = await response.json();
//   console.log(JSON.stringify(neighborhoodBounds));
//   return neighborhoodBounds;
// }
