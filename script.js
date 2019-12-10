
// require('waypoints');
// prints "hi" in the browser's dev tools console
console.log("Successfully loaded javascript file");

// Setup Leaflet map //
// --------------------------------------------------------------- //

mapOptions = {
  preferCanvas: true,
  zoomControl: false,
  // renderer: L.Canvas, ## THIS CAUSES AN ERROR
  dragging: false
};

point_home = L.latLng(34.0522, -118.2437);

mainMap = L.map("mapid", mapOptions).setView(point_home, 13);

// Add base layer
CartoDB_Positron = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 15
  }
).addTo(mainMap);

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
