import './styles/main.css';
// Web component
import LandmarkAnnotation from './components/LandmarkAnnotation';
import LandmarkNeighborhood from './components/LandmarkNeighborhood';

import { renderOverview } from './charts/SetupPlots.js';

import mainMap from './maps.js';

mainMap.then(val => {
  document.mainMap = val;
});

renderOverview();