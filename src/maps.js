import 'ol/ol.css';

import Stamen from 'ol/source/Stamen';

import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';

import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { styleFunctionRentals, styleFunctionReports } from './styles.js';

const pointHome = [-118.22181701660156,
  34.04298753935195];

const geoJsonUrls = [
  'https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fkoreatown_airbnb.geojson?v=1575949660578',
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fhollywood_airbnb.geojson?v=1575949660567",
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fvenice_airbnb.geojson?v=1575949660567"
]

const geoJsonReports = [
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fktown_311.geojson",
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fhollywood_311.geojson",
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fvenice_311.geojson"
]

const fetchParseGeojson = function (url, type) {
  return fetch(url).then(resp => resp.json()).then(data => {
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(data, { featureProjection: 'EPSG:3857' }),
    });

    // EPSG:3857
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: type === 'rentals' ? styleFunctionRentals : styleFunctionReports
    });
    return vectorLayer;
  })
}

const setupMap = function () {
  Promise.all(
    [Promise.all(geoJsonUrls.map(d => fetchParseGeojson(d, 'rentals'))),
    Promise.all(geoJsonReports.map(d => fetchParseGeojson(d, 'reports')))]).then(values => {
      console.log(values)
      debugger;

      const map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new Stamen({
              layer: 'toner-lite',
            })
          }),
          ...[...values[0], ...values[1]]
        ],
        view: new View({
          center: fromLonLat(pointHome),
          zoom: 8
        })
      })
    });
}

const flyMapTo = function (elements, map) {
  const id = elements[0];
  switch (id) {
    case '#ktown':
      console.log(id)
      break;
    case '#hollywood':
      console.log(id)
      break;
    case '#venice':
      console.log(id)
      break;
  }
}

const setupScrollObserver = function () {

  function callback(entries, observer) {
    console.log(observer);

    entries.forEach(entry => {
      console.log(entry);
    });

    // flyMapTo(entries, map);
  }


  const makeObserver = function (selector) {
    let observer = new IntersectionObserver(callback, {
      root: document.body,
      rootMargin: '0px',
      threshold: 0
    });
    console.log(selector);
    observer.observe(document.querySelector(selector));
  }

  // const waypoints = ['#ktown', '#hollywood', '#venice']
  const waypoints = ['#ktown']
  // waypoints.forEach(point => observe);
  makeObserver('#ktown')
}

setupScrollObserver();

export default setupMap;