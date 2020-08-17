import matrixplot from "rawcharts/matrixplot"
import data from "../datasets/Music.csv";

console.log(data)

export default {
  chart: matrixplot,
  data,
	dataTypes: {
    Category:"string",
    Format: "string",
    Year: "number",
    Year_date:"date",
    Units: "number",
    Revenues: "number",
    "Revenues-Adjusted": "number"
  },
  mapping: {
    x: { value: ["Format"] },
    y: { value: ["Year"] },
    color: { value: ["Revenues-Adjusted"] },
    label: { value: ["Format"] },
    size: { value: ["Revenues-Adjusted"] },
  },
	visualOptions: {
    width: 1000,
    height: 800,
		marginTop: 100,
		marginLeft: 100,
		sortXAxisBy: "Total value (ascending)",
		sortYAxisBy: "Original"
	}
}
