
const pointHome = L.latLng(34.022326, -118.395734);

const mainMap = L.map("mapid",
    {
        zoomControl: false,
        dragging: false
    }).setView(pointHome, 12);

// Add base layer
const CartoDB_Positron = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 18
    }
).addTo(mainMap);

const toggleLegend = (x) => {
    document.querySelector('.map-legend').classList.toggle("invisible");
};

// https://leafletjs.com/reference-1.6.0.html#path-option
let geojsonStyle = {
    color: "#52cc00",
    weight: 1.5,
    fillOpacity: 0,
    dashArray: "10",
    opacity: 1,
    size: 3
};

// Wow Fetch neighborhoods layer and load it into the map as GEOJSON!
const urlNeighborhoods =
    "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2FLA-Neighborhoods_crs.geojson";

const loadGeoLayer = url => {
    fetch(url)
        .then(function (response) {
            // Read data as JSON
            return response.json();
        })
        .then(function (data) {
            // Add data to the map
            var myLayer = L.geoJSON(data, geojsonStyle).addTo(mainMap);
            console.log(data);
            // myLayer.addData(data);
            // L.geoJSON(data).addTo(mainMap);
        });
};

const colorAirbnb = "#FF5A5F";
const colorHomeless = "#0b03fc";

const geojsonAirBnbOptions = {
    radius: 3,
    fillColor: colorAirbnb,
    color: colorAirbnb,
    weight: 0,
    opacity: 1,
    fillOpacity: 0.55,
    preferCanvas: true

    // renderer: L.Canvas
};

const loadAirbnbPoints = url => {
    fetch(url)
        .then(function (response) {
            // Read data as JSON
            return response.json();
        })
        .then(function (data) {
            // Add data to the map
            var myLayer = L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojsonAirBnbOptions);
                }
            }).addTo(mainMap);
            console.log(data);
        });
};

const geojsonHomelessPoints = {
    radius: 3,
    fillColor: colorHomeless,
    color: colorHomeless,
    weight: 0,
    opacity: 1,
    fillOpacity: 0.55,
    preferCanvas: true
    // renderer: L.Canvas
};

const load311Points = url => {
    fetch(url)
        .then(function (response) {
            // Read data as JSON
            return response.json();
        })
        .then(function (data) {
            // Add data to the map
            var myLayer = L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojsonHomelessPoints);
                }
            }).addTo(mainMap);

            console.log(data);
        });
};

loadGeoLayer(urlNeighborhoods);

// neighborhoodBounds = postData();

// https://leafletjs.com/reference-1.6.0.html#path-option
geojsonStyle = {
    color: "#52cc00",
    weight: 1.5,
    fillOpacity: 0,
    dashArray: "10",
    opacity: 1,
    size: 3
};

export const setupMaps = function () {
    // We loading GEOJSON
    loadAirbnbPoints(url_ktown_airbnb);
    loadAirbnbPoints(url_hollywood_airbnb);
    loadAirbnbPoints(url_venice_airbnb);
    load311Points(url_ktown_homeless);
    load311Points(url_hollywood_homeless);
    load311Points(url_ktown_homeless);
    load311Points(url_venice_homeless);

}
