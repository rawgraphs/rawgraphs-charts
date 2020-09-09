import sunburst from "rawcharts/sunburst"
import data from "../datasets/simple-hierarchy.tsv"

export default {
  chart: sunburst,
  data,
  dataTypes: {
	  "Level1": "string",
	  "Level2": "string",
	  "Size": "number"
	},
  mapping: {
    hierarchy: { value: ["Level1", "Level2"] },
    color: {
			value: ["Level1"],
			config: {"aggregation": ["csvDistinct"]}
		},
		size: {
			value: ["Size"],
			config: {"aggregation": ["sum"]}
		},
  },
  visualOptions: {
    width: 500,
    height: 500
  },
}
