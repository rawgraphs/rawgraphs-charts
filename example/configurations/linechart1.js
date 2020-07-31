import linechart from "rawcharts/linechart";
import data from "../datasets/Music.csv";

export default {
  chart: linechart,
  data,
  dataTypes: {
	Category:"string",
    Format: "string",
    Year: "number",
    Units: "number",
    Revenues: "number"
  },
  mapping: {
	series: { value: ["Category"] },
    lines: { value: ["Category"] },
    x: { value: ["Year"] },
    y: { value: ["Revenues"] },
    color: { value: ["Category"] }
  },
  visualOptions: {
    width: 1000,
    height: 1000,
	showPoints:true,
	interpolation:"Step Before",
	pointsRadius:2,
	columnsNumber:2,
	gutter: 20
  },
};
