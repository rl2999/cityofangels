// put the json here

makePlotRentalType = url => {
  var jsondata = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    description: "Airbnb Rentals By Type",
    data: {
      values: {
        url:
url
      },
      transform: [
        {
          window: [
            {
              op: "sum",
              field: "room_type",
              as: "room_type"
            }
          ],
          frame: [null, null]
        },
        {
          calculate: "datum.Time/datum.room_type * 100",
          as: "PercentOfTotal"
        }
      ],
      height: { step: 12 },
      mark: "bar",
      encoding: {
        x: {
          field: "PercentOfTotal",
          type: "quantitative",
          axis: {
            title: "% of Total"
          }
        },
        y: { field: "Activity", type: "nominal" }
      }
    }
  };
  return jsondata;
};

const makePlotRentalType = url => {
  var jsondata = {
    title:
      "Density of Airbnb rentals vs. homeless encampments across all neighborhoods",
    width: 600,
    height: "container",
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    data: {
      url:
        "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fdensity_summary.csv"
    },
    encoding: {
      x: {
        field: "density_airbnb",
        type: "quantitative",
        scale: { domain: [0, 1.5] }
      },
      y: {
        field: "density_homeless",
        type: "quantitative",
        scale: { domain: [0, 2] }
      },
      tooltip: [
        { field: "density_airbnb", type: "quantitative" },
        { field: "density_homeless", type: "quantitative" }
      ]
    },
    layer: [
      {
        selection: {
          grid: {
            type: "interval",
            bind: "scales"
          }
        },
        mark: "circle"
      },
      {
        mark: { type: "text", baseline: "middle", dx: 30 },
        encoding: {
          text: { field: "neighbourhood", type: "nominal" },
          color: {
            value: "black"
          }
        }
      }
    ]
  };
  return jsondata;
};
