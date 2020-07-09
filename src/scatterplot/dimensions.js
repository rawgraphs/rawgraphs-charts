export const dimensions = [
  {
    "id": "x",
    "name": "x axis",
    "validTypes": [
      "number",
      "date"
    ],
    "required": true
  },
  {
    "id": "y",
    "name": "y axis",
    "validTypes": [
      "number",
      "date"
    ],
    "required": true
  },
  {
    "id": "size",
    "name": "size",
    "validTypes": [
      "number"
    ],
    "required": false,
    "aggregation": true,
  },
  {
    "id": "color",
    "name": "color",
    "validTypes": [
      "number",
      "date",
      "string"
    ],
    "required": true
  },
  {
    "id": "label",
    "name": "label",
    "validTypes": [
      "number",
      "date",
      "string"
    ],
    "required": true,
    "multiple": true
  }
]