import embed from 'vega-embed';

import {
  makePricePlot,
  makeOverviewScatter,
  makeMiniNights,
  makePlotRentalType
} from './plotStyles';

const plotWidth = 400;
const plotHeight = 400;

const urlOverviewData =
    'http://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fdensity_summary.csv';
const overviewScatterPlot = makeOverviewScatter('data/density_summary.csv');

export const renderOverview = () => embed('#overviewScatter', overviewScatterPlot).then(result => console.log(result));

// Make standardized Vega JSON's
export const renderAllPlotsForArea = (area, dataUrl) => {
  Promise.all([embed(this.shadowRoot.querySelector('#' + area + '-vis-price'), makePricePlot(dataUrl)),
    embed('#' + area + '-vis-rental-types', makePlotRentalType(dataUrl)),
    embed('#' + area + '-vis-nights', makeMiniNights(dataUrl))], values => console.log);
};

export const setupPlots = function () {
  renderAllPlotsForArea(
    'ktown',
    'https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fkoreatown_airbnb2.csv'
  );
  renderAllPlotsForArea(
    'hollywood',
    'https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fhollywood_airbnb2.csv'
  );
  renderAllPlotsForArea(
    'venice',
    'https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fvenice_airbnb2.csv'
  );
};
