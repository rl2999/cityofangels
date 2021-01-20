import embed from 'vega-embed';

import {
  makePricePlot,
  makeOverviewScatter,
  makeMiniNights,
  makePlotRentalType
} from './PlotStyles';


const overviewScatterPlot = makeOverviewScatter('data/density_summary.csv');

export const renderOverview = () => embed('.overview-scatter-embed', overviewScatterPlot).then(result => console.log(result));