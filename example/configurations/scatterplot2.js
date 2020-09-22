import bubblechart from "rawcharts/bubblechart";
import data from "../datasets/Movies.tsv";

export default {
  chart: bubblechart,
  data,
  dataTypes: {
    Year: {
      type: "date",
      dateFormat: "YYYY",
    },
    "Box Office (Millions, adjusted for inflation)": "number",
    Rating: "number",
    Title: "string",
    Genre: "string",
  },
  mapping: {
    x: { value: ["Year"] },
    y: { value: ["Box Office (Millions, adjusted for inflation)"] },
    color: { value: ["Genre"] },
    label: { value: ["Title"] },
    size: { value: ["Rating"] },
  },
  visualOptions: {
    width: 800,
    height: 600,
    marginTop: 50,
    marginRight: 50,
    marginBottom: 50,
    marginLeft: 50,
    showLegend: true,
  },
};
