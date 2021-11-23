import { t } from '@rawgraphs/rawgraphs-core'
import icon from './matrixplot.svg'
import thumbnail from './heatmap_thumb.svg'

export const metadata = {
  name: 'Matrix Plot',
  id: 'rawgraphs.matrixplot',
  thumbnail,
  icon,
  categories: [
    t('categories.correlations'),
    t('categories.time series'),
    t('categories.proportions'),
  ],
  description: t('charts.matrixplot.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/matrixplot',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-matrix-plot/',
}
