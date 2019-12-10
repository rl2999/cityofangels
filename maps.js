// neighborhoodBounds = postData();

// https://leafletjs.com/reference-1.6.0.html#path-option
geojsonStyle = {
  color: "#52cc00",
  weight: 1.5,
  fillOpacity: 0,
  dashArray: "10",
  opacity: 1
};

// Wow Fetch neighborhoods layer and load it into the map as GEOJSON!
var urlNeighborhoods =
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2FLA-Neighborhoods_crs.geojson";

// try {
//   fetch(urlNeighborhoods)
//     .then(function(response) {
//       // Read data as JSON
//       return response.json();
//     })
//     .then(function(data) {
//       // Add data to the map
//       var myLayer = L.geoJSON(data, geojsonStyle).addTo(mainMap);
//       console.log(data);
//       // myLayer.addData(data);
//       // L.geoJSON(data).addTo(mainMap);
//     });
// } catch {
//   // nothing
// }

var loadGeoLayer = url => {
  fetch(url)
    .then(function(response) {
      // Read data as JSON
      return response.json();
    })
    .then(function(data) {
      // Add data to the map
      var myLayer = L.geoJSON(data, geojsonStyle).addTo(mainMap);
      console.log(data);
      // myLayer.addData(data);
      // L.geoJSON(data).addTo(mainMap);
    });
};

const colorAirbnb = "#FF5A5F";

var geojsonAirBnbOptions = {
  radius: 3,
  fillColor: colorAirbnb,
  color: colorAirbnb,
  weight: 0,
  opacity: 1,
  fillOpacity: 0.55,
  preferCanvas: true

  // renderer: L.Canvas
};

const loadGeoPoints = url => {
  fetch(url)
    .then(function(response) {
      // Read data as JSON
      return response.json();
    })
    .then(function(data) {
      var popupOptions = { maxWidth: 500 };
      var popupContent =
        '<a target="_blank" class="popup" href="' +
        feature.properties.post +
        '">' +
        feature.properties.soundcloud +
        "<h3>" +
        "Post & tracklist" +
        "</h3>" +
        "</a>";
      // Add data to the map
      var points = L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, geojsonAirBnbOptions);
        ).addTo(mainMap);
      console.log(data);
    });
};

// this lil helper function handles fetches for us.
loadGeoLayer(urlNeighborhoods);

url_ktown_airbnb =
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fkoreatown_airbnb.geojson?v=1575949660578";
// We loading GEOJSON
loadGeoPoints(url_ktown_airbnb);
