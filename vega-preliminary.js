// put the json here
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "Airbnb Rentals By Type",
  "data": {
    "values": {
      url:
        "https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fkoreatown_airbnb2.csv"
    },
  "transform": [{
    "window": [{
      "op": "sum",
      "field": "room_type",
      "as": "room_type"
    }],
    "frame": [null, null]
  },
  {
    "calculate": "datum.Time/datum.room_type * 100",
    "as": "PercentOfTotal"
  }],
  "height": {"step": 12},
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "PercentOfTotal",
      "type": "quantitative",
      "axis": {
        "title": "% of Total"
      }
    },
    "y": {"field": "Activity", "type": "nominal"}
  }
}
