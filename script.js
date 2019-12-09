/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
// require('waypoints');
// prints "hi" in the browser's dev tools console
console.log("hi");

// Vega-lite plots //
// --------------------------------------------------------------- //

var ktown_plot_airbnb_price = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  width: "400",
  height: "400",
  data: {
    url:
      "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fkoreatown_airbnb2.csv"
  },
  mark: "bar",
  encoding: {
    x: {
      bin: false,
      field: "price",
      type: "quantitative"
    },
    y: {
      aggregate: "count",
      type: "quantitative"
    }
  }
};

vegaEmbed("#ktown-viz-airbnb-price", ktown_plot_airbnb_price);

// Leaflet maps //
// --------------------------------------------------------------- //

var mapOptions = {
  preferCanvas: true,
  zoomControl: false,
  renderer: L.Canvas,
  dragging: false
};

var point_home = L.latLng(34.0522, -118.2437);

var mymap = L.map("mapid", mapOptions).setView(point_home, 13);

// var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// 	subdomains: 'abcd',
// 	maxZoom: 19
// }).addTo(mymap);

var CartoDB_Positron = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 15
  }
).addTo(mymap);

// WAYPOINTS //
// --------------------------------------------------------------- //
// http://imakewebthings.com/waypoints/guides/getting-started/

// Declare our zoom points on the map
// Make them with geojson.io but note that its flipped
// http://geojson.io/#map=19/40.80805/-73.96041
var point_venice = L.latLng(33.99539435637889, -118.46677780151366);
var point_hollywood = L.latLng(34.1016774615434, -118.330135345459);
var point_nyc = L.latLng(40.80807627279606, -73.96046251058578);
var point_burbank = L.latLng(34.18539, -118.364295);
var point_koreatown = L.latLng(34.05776160573775, -118.30073833465576);

// This is a callback function
// it changes locations for us
const zoomToLocation = (point, zoomLevel) => {
  mymap.flyTo(point, zoomLevel, {
    animate: true,
    duration: 2,
    easeLinearity: 0.1
  });
  // mymap.setZoom(zoom);
};

const make_waypoint = (
  selector,
  triggerpoint,
  offsety,
  callbacky = x => {}
) => {
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

var global_offset = -100;
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
async function postData(url = "", data = {}) {
  const url_neighborhood_bounds =
    "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2FLA-Neighborhoods.geojson";
  const response = await fetch(url_neighborhood_bounds);
  const neighborhoodBounds = await response.json();
  console.log(JSON.stringify(neighborhoodBounds));
  return neighborhoodBounds;
}

neighborhoodBounds = postData();

var neighborhood = L.geoJson(JSON.stringify(neighborhoodBounds), {
  //instantiates a new geoJson layer using built in geoJson handling
  weight: 1, //Attributes of polygons including the weight of boundaries and colors of map.
  color: "#222"
})
  .bindPopup(function(Layer) {
    //binds a popup when clicking on each polygon to access underlying data
    return Layer.feature.properties.NAME;
  })
  .addTo(mymap); //Adds the layer to the map.
