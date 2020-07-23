export const dimensions = [
  {
    id: "lines",
    name: "lines",
    validTypes: ["number", "string", "date"],
    required: false,
    operation: "groups",
  },
  {
    id: "x",
    name: "x",
    operation: "get",
    validTypes: ["number", "date"],
    required: true,
  },
  {
    id: "y",
    name: "y",
    operation: "get",
    validTypes: ["number", "date"],
    required: false,
  },
  {
    id: "color",
    name: "color",
    operation: "get",
    validTypes: ["number", "string", "date"],
    required: false,
  },
];
