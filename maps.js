// neighborhoodBounds = postData();

var url2 = "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2FLA-Neighborhoods_crs.geojson"
  try{
   
fetch(url2)
  .then(function (response) {
    // Read data as JSON
    return response.json();
  })
  .then(function (data) {
    // Add data to the map
  var myLayer = L.geoJSON().addTo(mainMap);
  console.log(data);
  myLayer.addData(data);
    // L.geoJSON(data).addTo(mainMap);
  });
    
   }
   catch {

      // # nothing
    }



var url_neighborhood_bounds = "https://s3-us-west-2.amazonaws.com/boundaries.latimes.com/archive/1.0/boundary-set/lapd-bureaus.geojson";

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


// data_neighborhoods = $.getJSON(url_neighborhood_bounds).responseJSON;
// neighborhoods = L.geoJson(geo).addTo(mymap); //Adds the layer to the map.
