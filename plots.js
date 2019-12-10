// Vega-lite plots //
// --------------------------------------------------------------- //

var makePricePlot = dataURL => {
  return ktown_plot_airbnb_price = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    width: "400",
    height: "400",
    data: {
      url: dataURL
    },
    mark: "bar",
    encoding: {
      x: {
        bin: false,
        field: "price",
        type: "quantitative"
      },
      y: {
        aggregate: "count",
        type: "quantitative"
      }, 
       tooltip: [
          {"field": "AAPL", "type": "quantitative"},
          {"field": "AMZN", "type": "quantitative"}
        ]
      },
    }
  };
};

// Make standardized Vega JSON's
ktown_plot_airbnb_price = makePricePlot(
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fkoreatown_airbnb2.csv"
);
hollywood_plot_airbnb_price = makePricePlot(
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fhollywood_airbnb2.csv"
);
venice_plot_airbnb_price = makePricePlot(
  "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fvenice_airbnb2.csv"
);

// Embed our Vega plots
vegaEmbed("#ktown-viz-airbnb-price", ktown_plot_airbnb_price);
vegaEmbed("#hollywood-viz-airbnb-price", hollywood_plot_airbnb_price);
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
