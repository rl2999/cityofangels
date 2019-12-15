// Vega-lite plots //
// --------------------------------------------------------------- //
// put the json here

// const colorAirbnb = "#FF5A5F"
// const colorHomeless = "#0b03fc"
// GLOBAL VARS for dimensions
const plotWidth = 400;
const plotHeight = 400;

  const globalPlotConfig = {
  autosize: {
      resize: true,
      type: "fit"
    },
    width: "container",
    height: "container",
    axis: {
      labelFont: "monospace",
      titleFont: "Courier",
    },
    title: {
      font: "Courier"
    },
    background: "rgba(0,0,0,0)",
    mark: {
      fill: "#FF5A5F"
    }
  };

const makePlotRentalType = url => {
  var jsondata = {
    width: "container",
    height: "container",
    autosize : {resize: true, type: "fit"},
    title: "Distribution of room types",
    description: "Distribution of room types",
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    data: { url: url },
    mark: "bar",
    encoding: {
      y: {
        field: "room_type",
        type: "nominal"
      },
      x: {
        aggregate: "count",
        type: "quantitative"
      }
    },
    config: globalPlotConfig
  };
  return jsondata;
};

const makeOverviewScatter = url => {
  var jsondata = {
    width: "container",
    height: "container",
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    title:
      "Density of Airbnb rentals vs. homeless encampments across all neighborhoods",
    data: {
      url: url
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
        mark: "circle",
        size: 120,
        fill: "#0b03fc"
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
    ],
    config: globalPlotConfig
  };
  return jsondata;
};

const makePricePlot = dataURL => {
  var plotData = {
    title: "Frequency of rental units by price range",
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    autosize: { resize: true, type: "fit" },
    width: "container",
    height: "container",
    data: {
      url: dataURL
    },
    transform: [{ filter: "datum.price < 6000" }],
    layer: [
      {
        mark: "bar",
        selection: { grid: { type: "interval", bind: "scales" } },
        encoding: {
          tooltip: [
            { field: "__count" },
            { field: "price", type: "quantitative" }
          ],
          x: {
            bin: false,
            field: "price",
            type: "quantitative",
            axis: { grid: false, labelFont: "Courier" },
            scale: { domain: [0, 365] }
          },
          y: {
            aggregate: "count",
            type: "quantitative",
            axis: { grid: false, labelFont: "Courier" },
            scale: { domain: [0, 450] }
          }
        }
      },
      {
        mark: "rule",
        encoding: {
          x: {
            aggregate: "mean",
            field: "price",
            type: "quantitative"
          },
          color: { value: "blue" },
          size: { value: 2 }
        }
      }
    ],
    config: globalPlotConfig
  };
  // for debugging
  // console.log(JSON.stringify(plotData));
  return plotData;
};

const makeMiniNights = dataURL => {
  var plotData = {
    title: "Frequency of rental units by minimum_nights range",
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    autosize: { resize: true, type: "fit" },
    width: 400,
    height: 400,
    data: {
      url: dataURL
    },

    view: { fill: "white", opacity: 0 },
    transform: [{ filter: "datum.minimum_nights < 6000" }],
    layer: [
      {
        mark: "bar",
        selection: { grid: { type: "interval", bind: "scales" } },
        background: "rgba(0,0,0,0)",
        encoding: {
          tooltip: [
            { field: "__count" },
            { field: "minimum_nights", type: "quantitative" }
          ],
          x: {
            bin: false,
            field: "minimum_nights",
            type: "quantitative",
            axis: { grid: false, labelFont: "Courier" },
            scale: { domain: [0, 365] }
          },
          y: {
            aggregate: "count",
            type: "quantitative",
            axis: { grid: false, labelFont: "Courier" },
            scale: { domain: [0, 450] }
          }
        }
      },
      {
        mark: "rule",
        encoding: {
          x: {
            aggregate: "mean",
            field: "minimum_nights",
            type: "quantitative"
          },
          color: { value: "blue" },
          size: { value: 2 }
        }
      }
    ],
    config: globalPlotConfig
  };
  // for debugging
  // console.log(JSON.stringify(plotData));
  return plotData;
};

const urlOverviewData =
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fdensity_summary.csv";
overviewScatterPlot = makeOverviewScatter(urlOverviewData);
vegaEmbed("#overviewScatter", overviewScatterPlot);

// Make standardized Vega JSON's
const renderAllPlotsForArea = (area, dataUrl) => {
  pricePlot = makePricePlot(dataUrl);
  vegaEmbed("#" + area + "-viz-airbnb-price", pricePlot);
  rentalTypes = makePlotRentalType(dataUrl);
  vegaEmbed("#" + area + "RentalTypes", rentalTypes);
  vegaEmbed("#" + area + "MiniNights", makeMiniNights(dataUrl));
};

renderAllPlotsForArea(
  "ktown",
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fkoreatown_airbnb2.csv"
);
renderAllPlotsForArea(
  "hollywood",
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fhollywood_airbnb2.csv"
);
renderAllPlotsForArea(
  "venice",
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fvenice_airbnb2.csv"
);

// BOKEH //
// --------------------------------------------------------------- //
(function() {
  var fn = function() {
    Bokeh.safely(function() {
      (function(root) {
        function embed_document(root) {
          var docs_json = document.getElementById("9718").textContent;
          var render_items = [
            {
              docid: "85dad36b-030e-45ff-90d6-cbaf4cfe6a36",
              roots: { "9203": "eb82953e-61c9-4b88-b3dd-a30aa64654c4" }
            }
          ];
          root.Bokeh.embed.embed_items(docs_json, render_items);
        }
        if (root.Bokeh !== undefined) {
          embed_document(root);
        } else {
          var attempts = 0;
          var timer = setInterval(
            function(root) {
              if (root.Bokeh !== undefined) {
                embed_document(root);
                clearInterval(timer);
              }
              attempts++;
              if (attempts > 100) {
                console.log(
                  "Bokeh: ERROR: Unable to run BokehJS code because BokehJS library is missing"
                );
                clearInterval(timer);
              }
            },
            10,
            root
          );
        }
      })(window);
    });
  };
  if (document.readyState != "loading") fn();
  else document.addEventListener("DOMContentLoaded", fn);
})();
