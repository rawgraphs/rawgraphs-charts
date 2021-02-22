import * as d3 from 'd3'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  // add the non-compulsory dimensions.
  'series' in mapping ? null : (mapping.series = { value: undefined })
  'color' in mapping ? null : (mapping.color = { value: undefined })
  'size' in mapping ? null : (mapping.size = { value: undefined })
  'label' in mapping ? null : (mapping.label = { value: undefined })

  return data.map((d) => ({
    xValue: d[mapping.xValue.value],
    series: d[mapping.series.value],
    color: d[mapping.color.value],
    size: mapping.size.value ? d[mapping.size.value] : 1,
    label: mapping.label.value ? mapping.label.value.map((l) => d[l]) : null,
  }))
}
