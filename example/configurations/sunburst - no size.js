import sunburst from "rawcharts/sunburst"
import data from "../datasets/WineTasting.tsv"

export default {
  chart: sunburst,
  data,
  dataTypes: {
	  "Root": "string",
	  "Level1": "string",
	  "Level2": "string",
	  "Level3": "string",
	  "results": "number"
	},
  mapping: {
    hierarchy: { value: ["Root"] },
    color: {
			value: ["Level1"],
			config: {"aggregation": ["csvDistinct"]}
		}
  },
  visualOptions: {
    width: 500,
    height: 500
  },
}
