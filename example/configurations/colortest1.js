import colortest from "rawcharts/colortest";
import data from "../datasets/Music.csv";

export default {
  chart: colortest,
  data,
  dataTypes: {
    Format: "string",
    Year: "number",
    Units: "number",
    // Title: "string",
    // Genre: "string",
  },
  mapping: {
     
    color: { value: ["Format"] },
  },
  visualOptions: {
    width: 500,
    height: 500,
    colorScale : {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    }

  },
};
