export const globalPlotConfig = {
  autosize: {
    resize: true,
    type: 'fit'
  },
  width: 'container',
  height: 'container',
  axis: {
    labelFont: 'monospace',
    titleFont: 'Courier'
  },
  title: {
    font: 'Courier'
  },
  background: 'rgba(0,0,0,0)',
  mark: {
    fill: '#f8e7e8'
  }
}

export const makePlotRentalType = url => {
  const jsondata = {
    width: 'container',
    height: 'container',
    autosize: {
      resize: true,
      type: 'fit'
    },
    title: 'Distribution of room types',
    description: 'Distribution of room types',
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: {
      url: url
    },
    mark: 'bar',
    encoding: {
      y: {
        field: 'room_type',
        type: 'nominal'
      },
      x: {
        aggregate: 'count',
        type: 'quantitative'
      }
    },
    config: globalPlotConfig
  }
  return jsondata
}

export const makeOverviewScatter = url => ({
  autosize: {
    resize: false,
    type: 'fit'
  },
  height: 'container',
  width: 'container',
  $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
  title: 'Density of Airbnb rentals vs. homeless encampments across all neighborhoods',
  data: {
    url: url
  },
  encoding: {
    x: {
      field: 'density_airbnb',
      type: 'quantitative',
      scale: {
        domain: [0, 1.5]
      }
    },
    y: {
      field: 'density_homeless',
      type: 'quantitative',
      scale: {
        domain: [0, 2]
      }
    },
    tooltip: [{
      field: 'density_airbnb',
      type: 'quantitative'
    },
    {
      field: 'density_homeless',
      type: 'quantitative'
    }
    ]
  },
  layer: [{
    selection: {
      grid: {
        type: 'interval',
        bind: 'scales'
      }
    },
    mark: 'circle',
    size: 120,
    fill: '#0b03fc'
  },
  {
    mark: {
      type: 'text',
      baseline: 'middle',
      dx: 30
    },
    encoding: {
      text: {
        field: 'neighbourhood',
        type: 'nominal'
      },
      color: {
        value: 'black'
      }
    }
  }
  ],
  config: globalPlotConfig
})

export const makePricePlot = dataURL => {
  const plotData = {
    title: 'Frequency of rental units by price range',
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    width: 'container',
    height: 'container',
    data: {
      url: dataURL
    },
    transform: [{
      filter: 'datum.price < 6000'
    }],
    layer: [{
      mark: 'bar',
      selection: {
        grid: {
          type: 'interval',
          bind: 'scales'
        }
      },
      encoding: {
        tooltip: [{
          field: '__count'
        },
        {
          field: 'price',
          type: 'quantitative'
        }
        ],
        x: {
          bin: false,
          field: 'price',
          type: 'quantitative',
          axis: {
            grid: false,
            labelFont: 'Courier'
          },
          scale: {
            domain: [0, 365]
          }
        },
        y: {
          aggregate: 'count',
          type: 'quantitative',
          axis: {
            grid: false,
            labelFont: 'Courier'
          },
          scale: {
            domain: [0, 450]
          }
        }
      }
    },
    {
      mark: 'rule',
      encoding: {
        x: {
          aggregate: 'mean',
          field: 'price',
          type: 'quantitative'
        },
        color: {
          value: 'blue'
        },
        size: {
          value: 2
        }
      }
    }
    ],
    config: globalPlotConfig
  }
  // for debugging
  // console.log(JSON.stringify(plotData));
  return plotData
}

export const makeMiniNights = dataURL => {
  const plotData = {
    title: 'Frequency of rental units by minimum_nights range',
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    autosize: {
      resize: true,
      type: 'fit'
    },
    width: 'container',
    data: {
      url: dataURL
    },
    view: {
      fill: 'white',
      opacity: 0
    },
    transform: [{
      filter: 'datum.minimum_nights < 6000'
    }],
    layer: [{
      mark: 'bar',
      selection: {
        grid: {
          type: 'interval',
          bind: 'scales'
        }
      },
      background: 'rgba(0,0,0,0)',
      encoding: {
        tooltip: [{
          field: '__count'
        },
        {
          field: 'minimum_nights',
          type: 'quantitative'
        }
        ],
        x: {
          bin: false,
          field: 'minimum_nights',
          type: 'quantitative',
          axis: {
            grid: false,
            labelFont: 'Courier'
          },
          scale: {
            domain: [0, 365]
          }
        },
        y: {
          aggregate: 'count',
          type: 'quantitative',
          axis: {
            grid: false,
            labelFont: 'Courier'
          },
          scale: {
            domain: [0, 450]
          }
        }
      }
    },
    {
      mark: 'rule',
      encoding: {
        x: {
          aggregate: 'mean',
          field: 'minimum_nights',
          type: 'quantitative'
        },
        color: {
          value: 'blue'
        },
        size: {
          value: 2
        }
      }
    }
    ],
    config: globalPlotConfig
  }
  // for debugging
  // console.log(JSON.stringify(plotData));
  return plotData
}
