import dendrogram from "rawcharts/dendrogram"
import data from "../datasets/WineTasting.tsv"

export default {
  chart: dendrogram,
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
			value: ["Level1"],
			config: {"aggregation": ["csvDistinct"]}
		},
		size: {
			value: ["results"],
			config: {"aggregation": ["sum"]}
		},
  },
  visualOptions: {
    width: 500,
    height: 500,
		marginRight: 50
  },
}
