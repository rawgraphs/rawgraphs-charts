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
    Revenues: "number",
	"Revenues-Adjusted": "number"
  },
  mapping: {
	series: { value: ["Format"] },
    lines: { value: ["Format"] },
    x: { value: ["Year"] },
    y: { value: ["Revenues-Adjusted"] },
    color: { value: ["Category"] }
  },
  visualOptions: {
    width: 1000,
    height: 3000,
	showPoints:true,
	interpolation:"Natural",
	pointsRadius:1.5,
	columnsNumber:1,
	gutter: 50,
	sortSeriesBy: "Total value (descending)"
  },
};
