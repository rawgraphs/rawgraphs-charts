export const dimensions = [
  {
    "id": "hierarchy",
    "name": "hierarchy",
    "validTypes": [
      "number",
      "date",
      "string"
    ],
    "required": true,
    "multiple": true
  },
  {
    "id": "size",
    "name": "size",
    "validTypes": [
      "number"
    ],
    "required": false,
    "aggregation": true,
    "aggregationDefault": "sum"
  },
  {
    "id": "color",
    "name": "color",
    "validTypes": [
      "number",
      "date",
      "string"
    ],
    "required": false,
    "aggregation": true,
    "aggregationDefault": {
      "number": "sum",
      "string": "csvDistinct",
      "date": "csvDistinct"
    },
  },
	{
    "id": "label",
    "name": "label",
    "validTypes": [
      "number",
      "date",
      "string"
    ],
    "required": false,
    "multiple": true,
    "aggregation": true,
		"aggregationDefault": {
      "number": "sum",
      "string": "csvDistinct",
      "date": "csvDistinct"
    },
  }
]
