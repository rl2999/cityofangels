import {
  Circle as CircleStyle, Fill, Stroke, Style
} from 'ol/style';

export const mapStylesReports = {
  Point: new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: '#7e75fc'
      }),
      stroke: new Stroke({
        color: 'magenta',
      }),
    })
  })
};

export const mapStylesRentals = {
  Point: new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: '#f17b6b'
      }),
      stroke: new Stroke({
        color: 'white',
      }),
    })
  })
};

export const mapStyles = {
  Point: new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: '#fc757e'
      }),
      stroke: new Stroke({
        color: 'magenta',
      }),
    }),
  }),
  GeometryCollection: new Style({
    stroke: new Stroke({
      color: 'magenta',
      width: 2,
    }),
    fill: new Fill({
      color: 'magenta',
    }),
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: 'magenta',
      }),
    }),
  }),
  Circle: new Style({
    stroke: new Stroke({
      color: 'red',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(255,0,0,0.2)',
    }),
  }),
};

export const styleFunctionRentals = function (feature) {
  return mapStylesReports[feature.getGeometry().getType()];
};
export const styleFunctionReports = function (feature) {
  return mapStylesRentals[feature.getGeometry().getType()];
};

