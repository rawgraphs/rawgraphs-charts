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
    required: true,
  },
  {
    id: "y",
    name: "y",
    operation: "get",
    required: false,
  },
  {
    id: "color",
    name: "color",
    operation: "get",
    required: false,
  },
];
