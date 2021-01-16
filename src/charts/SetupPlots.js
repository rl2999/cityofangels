import embed from 'vega-embed'

import {
  makePricePlot,
  makeOverviewScatter,
  makeMiniNights,
  makePlotRentalType
} from './plotStyles'

const plotWidth = 400
const plotHeight = 400

const urlOverviewData =
    'https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fdensity_summary.csv'
const overviewScatterPlot = makeOverviewScatter(urlOverviewData)

export const renderOverview = async () => await embed('#overviewScatter', overviewScatterPlot)

// Make standardized Vega JSON's
// export const renderAllPlotsForArea = (area, dataUrl) => {
//   const pricePlot = makePricePlot(dataUrl)
//   vegaEmbed('#' + area + '-viz-airbnb-price', pricePlot)
//   const rentalTypes = makePlotRentalType(dataUrl)
//   vegaEmbed('#' + area + 'RentalTypes', rentalTypes)
//   vegaEmbed('#' + area + 'MiniNights', makeMiniNights(dataUrl))
// }

// export const setupPlots = function () {
//   renderAllPlotsForArea(
//     'ktown',
//     'https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fkoreatown_airbnb2.csv'
//   )
//   renderAllPlotsForArea(
//     'hollywood',
//     'https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fhollywood_airbnb2.csv'
//   )
//   renderAllPlotsForArea(
//     'venice',
//     'https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fvenice_airbnb2.csv'
//   )
// }
