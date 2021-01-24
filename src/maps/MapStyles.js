import {
  Circle as CircleStyle, Fill, Stroke, Style
} from 'ol/style';

const COLORS = {
  red: '#FF5A5F',
  blue: '#7e75fc',
  green:'green',
  white: '#ffffff'
};

export const mapStylesReports = {
  Point: new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: COLORS.blue
      }),
      stroke: new Stroke({
        color: COLORS.white,
      }),
    })
  })
};

export const mapStylesRentals = {
  Point: new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: COLORS.red
      }),
      stroke: new Stroke({
        color: 'white',
      }),
    })
  })
};

export const mapStylesBounds = {
  GeometryCollection: new Style({
    stroke: new Stroke({
      color: COLORS.green,
      width: 2,
    })
  })
};

export const styleFunctionRentals = function (feature) {
  return mapStylesReports[feature.getGeometry().getType()];
};

export const styleFunctionReports = function (feature) {
  return mapStylesRentals[feature.getGeometry().getType()];
};

export const styleFunctionBounds = function (feature) {
  return mapStylesBounds[feature.getGeometry().getType()];
};