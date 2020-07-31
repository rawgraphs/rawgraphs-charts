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
    lines: { value: ["Category"] },
    x: { value: ["Year"] },
    y: { value: ["Revenues-Adjusted"] },
    color: { value: ["Category"] }
  },
  visualOptions: {
    width: 1000,
    height: 700,
	showPoints:true,
	interpolation:"Natural",
	pointsRadius:2,
	columnsNumber:5,
	gutter: 50
  },
};
