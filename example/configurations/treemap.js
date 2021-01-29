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
    hierarchy: { value: ["Root", "Level1", "Level2"] },
		color: {
			value: ["Root"],
			config: {"aggregation": ["csvDistinct"]}
		},
    label: {
			value: ["Level2","results" ],
			config: {"aggregation": ["csvDistinct","sum"]}
		},
    size: {
			value: ["results"],
			config: {"aggregation": ["sum"]}
		},
  },
  visualOptions: {
    width: 1000,
    height: 700,
	showHierarchyLabels: true,
	drawHierarchy:false,
	padding:5,
	showLabelsOutline:true
  },
}
