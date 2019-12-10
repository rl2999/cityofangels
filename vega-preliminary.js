// put the json here
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "Airbnb Rentals By Type",
  "data": {
    "values": [
      {"Activity": "Sleeping", "Time": 8},
      {"Activity": "Eating", "Time": 2},
      {"Activity": "TV", "Time": 4},
      {"Activity": "Work", "Time": 8},
      {"Activity": "Exercise", "Time": 2}
    ]
  },
  "transform": [{
    "window": [{
      "op": "sum",
      "field": "Time",
      "as": "TotalTime"
    }],
    "frame": [null, null]
  },
  {
    "calculate": "datum.Time/datum.TotalTime * 100",
    "as": "PercentOfTotal"
  }],
  "height": {"step": 12},
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "PercentOfTotal",
      "type": "quantitative",
      "axis": {
        "title": "% of total Time"
      }
    },
    "y": {"field": "Activity", "type": "nominal"}
  }
}
