import scatterplot from "rawcharts/scatterplot"
import data from "../datasets/Movies.tsv"

console.log(data)

export default {
  chart: scatterplot,
  data,
  dataTypes: {
    Year: "number",
    "Runtime (minutes)": "number",
    Rating: "number",
    Title: "string",
    Genre: "string",
  },
  mapping: {
    x: { value: ["Year"] },
    y: { value: ["Runtime (minutes)"] },
    color: { value: ["Genre"] },
    label: { value: ["Title"] },
    size: { value: ["Rating"] },
  },
  visualOptions: {
    width: 500,
    height: 500,
    xOrigin: false,
  },
}