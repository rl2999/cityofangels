const FONT_PLOTS = 'Silka';

export const globalPlotConfig = {
  background: 'rgba(255, 255, 255, 0.0)',
  font: FONT_PLOTS,
  autosize: {
    type: 'fit',
    contains: 'padding'
  },
  mark: {
    text: {
      font: FONT_PLOTS
    }
  },
  axis: {
    labelFont: FONT_PLOTS,
    labelFontSize: 14,
    titleFont: FONT_PLOTS,
    titleFontSize: 14,
    titlePadding: 14,
  },
  label: {
    labelFont: FONT_PLOTS,
    labelFontSize: 18,
    labelPadding: 6
  },
  title: {
    font: FONT_PLOTS,
    fontSize: 18,
  },
  height: 'container',
  width: 'container'
};

export const makeOverviewScatter = (url) => (
  {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    autosize: {
      type: 'fit',
      contains: 'padding'
    },

    height: 'container',
    width: 'container',
    config: globalPlotConfig,
    data: {
      url
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
      }
    },
    layer: [
      {
        selection: {
          grid: {
            type: 'interval',
            bind: 'scales'
          }
        },
        mark: {
          type: 'point',
          size: 240,
          filled: true,
          tooltip: {
            content: 'encoding',
            format: '.1f',
            formatType: 'number'
          }
        },
      },
      {
        mark: {
          type: 'text',
          dy: 18,
          font: FONT_PLOTS,
          fontSize: 18,
          tooltip: {
            content:'encoding',
            format: '.1f',
            formatType: 'number'
          }
        },
        encoding: {
          text: {
            field: 'neighborhood',
            type: 'nominal',
            tooltip: {
              content: 'encoding',
              format: '.1f',
              formatType: 'number'
            }
          }
        }
      },
    ]
  });

export const makePlotRentalType = (url, area = '') => ({
  config: globalPlotConfig,
  width: 'container',
  height: 'container',
  autosize: {
    resize: true,
    type: 'fit'
  },
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
});

export const makePricePlot = (dataURL, area = '') => ({
  config: globalPlotConfig,
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
  ]
});

export const makeMiniNights = (dataURL, area = '') => ({
  config: globalPlotConfig,
  $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
  autosize: {
    resize: true,
    type: 'fit'
  },
  height: 'container',
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
  ]
});