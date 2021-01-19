import embed from 'vega-embed';

import {
  makePricePlot,
  makeOverviewScatter,
  makeMiniNights,
  makePlotRentalType
} from './PlotStyles';

const plotWidth = 400;
const plotHeight = 400;

const urlOverviewData =
    'http://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fdensity_summary.csv';
const overviewScatterPlot = makeOverviewScatter('data/density_summary.csv');

export const renderOverview = () => embed('.overview-scatter', overviewScatterPlot).then(result => console.log(result));