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
    hierarchy: { value: ["Root", "Level1", "Level2", "Level3"] },
		color: {
			value: ["Root"],
			config: {"aggregation": ["csvDistinct"]}
		},
    label: {
			value: ["Level3", "results", "Root"],
			config: {"aggregation": ["csvDistinct","sum","csvDistinct"]}
		},
    size: {
			value: ["results"],
			config: {"aggregation": ["sum"]}
		},
  },
  visualOptions: {
    width: 500,
    height: 500,
		drawHierarchy: true
  },
}
