import treemap from "rawcharts/treemap"
import data from "../datasets/WineTasting.tsv"

export default {
  chart: treemap,
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
		},
    label: {
			value: ["Level3"],
			config: {"aggregation": ["csvDistinct"]}
		},
    size: {
			value: ["results"],
			config: {"aggregation": ["sum"]}
		},
  },
  visualOptions: {
    width: 500,
    height: 500
  },
}
