import icon from './matrixplot.svg'
import thumbnail from './heatmap_thumb.svg'

export const metadata = {
  name: 'Matrix Plot',
  id: 'rawgraphs.matrixplot',
  thumbnail,
  icon,
  categories: ['correlations', 'time series', 'proportions'],
  description:
    'It allows comparison of two categorical dimensions, disposing them on the horizontal and vertical axes. Each glyph (square or circle) represents a possible correlation among the two dimensions. Associated quantitative variables can be represented with size and/or color.',
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/matrixplot',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-matrix-plot/',
}
