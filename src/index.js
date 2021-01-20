import './styles/main.scss';

// Web components
import LandmarkAnnotation from './components/LandmarkAnnotation';
import LandmarkNeighborhood from './components/LandmarkNeighborhood';

import { renderOverview } from './charts/SetupPlots.js';

import mainMap from './maps/Map.js';

mainMap.then(val => {
  document.mainMap = val;
});

renderOverview();