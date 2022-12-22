import matrixplot from "rawcharts/matrixplot"
import data from "../datasets/Music.csv";

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
    x: { value: ["Category"] },
    y: { value: ["Year"] },
    color: {
      value: ["Format"],
      config: {"aggregation": ["csvDistinct"]}
    },
    size: {
      value: ["Revenues-Adjusted"],
      config: {"aggregation": ["sum"]}
    },
  },
  visualOptions: {
    width: 1000,
    height: 5000,
    marginTop: 100,
    marginLeft: 100,
    sortXAxisBy: "Total value (ascending)",
    sortYAxisBy: "Original"
  }
}
