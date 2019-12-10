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

// this lil helper function handles fetches for us.
loadGeoLayer(urlNeighborhoods);