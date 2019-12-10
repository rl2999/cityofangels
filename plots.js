// Vega-lite plots //
// --------------------------------------------------------------- //
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

const makeOverviewScatter = url => {
  var jsondata = {
    title:
      "Density of Airbnb rentals vs. homeless encampments across all neighborhoods",
    width: 600,
    height: "container",
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    data: {
      url: url },
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


var makePricePlot = dataURL => {
  var plotData = {
    title: "Frequency of rental units by price range",
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    autosize: { resize: true, type: "fit" },
    width: 400,
    height: 250,
    data: {
      url:
        "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fkoreatown_airbnb2.csv"
    },
    transform: [{ filter: "datum.price < 6000" }],
    mark: "bar",
    encoding: {
      tooltip: [{ field: "__count" }, { field: "price", type: "quantitative" }],
      x: {
        bin: false,
        field: "price",
        type: "quantitative",
        axis: { grid: false, labelFont: "Courier" }
      },
      y: {
        aggregate: "count",
        type: "quantitative",
        axis: { grid: false, labelFont: "Courier" }
      }
    }
  };
  // for debugging
  // console.log(JSON.stringify(plotData));
  return plotData;
};

urlOverviewData = "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fdensity_summary.csv"
overviewScatterPlot = makeOverviewScatter(urlOverviewData);
vegaEmbed("#overviewScatter", overviewScatterPlot);

// Make standardized Vega JSON's
urlKtownData = "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fkoreatown_airbnb2.csv";
ktown_plot_airbnb_price = makePricePlot(urlKtownData);
ktownRentalTypes = makePlotRentalType(urlKtownData);

urlHollywoodData = "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fhollywood_airbnb2.csv";
hollywood_plot_airbnb_price = makePricePlot(urlHollywoodData);
hollywoodRentalTypes = makePlotRentalType(urlHollywoodData);

urlVeniceData = "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fvenice_airbnb2.csv";
venice_plot_airbnb_price = makePricePlot(urlVeniceData);
veniceRentalTypes = makePlotRentalType(urlVeniceData);


// Embed our Vega plots
vegaEmbed("#ktown-viz-airbnb-price", ktown_plot_airbnb_price);
vegaEmbed("#ktown-viz-airbnb-price", ktown_plot_airbnb_price);

vegaEmbed("#hollywood-viz-airbnb-price", hollywood_plot_airbnb_price);
vegaEmbed("#hollywood-viz-airbnb-price", hollywood_plot_airbnb_price);

vegaEmbed("#venice-viz-airbnb-price", venice_plot_airbnb_price);
vegaEmbed("#venice-viz-airbnb-price", venice_plot_airbnb_price);

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
