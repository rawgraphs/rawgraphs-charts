import linechart from "rawcharts/linechart";
import data from "../datasets/Music.csv";

export default {
  chart: linechart,
  data,
  dataTypes: {
    Format: "string",
    Year: "number",
    Units: "number",
    // Title: "string",
    // Genre: "string",
  },
  mapping: {
    lines: { value: ["Format"] },
    x: { value: ["Year"] },
    y: { value: ["Units"] },
    //color: { value: ["Genre"] },
    // label: { value: ["Rating"] },
    // size: { value: ["Rating"] },
  },
  visualOptions: {
    width: 500,
    height: 500,
    //xOrigin: false,
  },
};
