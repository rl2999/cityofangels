// neighborhoodBounds = postData();

var url2 = "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2FLA-Neighborhoods_crs.geojson?v=1575860761151"
fetch(url2)
  .then(function (response) {
    // Read data as JSON
    return response.json();
  })
  .then(function (data) {
    // Add data to the map
    L.geoJson(data).addTo(mainMap);
  });

