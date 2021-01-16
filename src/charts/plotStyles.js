export const globalPlotConfig = {
  "width": "container",
  "height": 250,

};

export const makeOverviewScatter = url => (
  {
    title: 'Density of Airbnb rentals vs. homeless encampments across all neighborhoods',
    data: {
      url
    },
    mark: 'point',
    encoding: {
      x: { field: 'density_airbnb', type: 'quantitative' },
      y: { field: 'density_homeless', type: 'quantitative' }
    }
  });

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
  };
  return jsondata;
};

export const makePricePlot = dataURL => {
  const plotData = {
    title: 'Frequency of rental units by price range',

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
  };
  // for debugging
  // console.log(JSON.stringify(plotData));
  return plotData;
};

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
  };
  // for debugging
  // console.log(JSON.stringify(plotData));
  return plotData;
};
