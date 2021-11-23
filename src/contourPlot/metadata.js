import { t } from '@rawgraphs/rawgraphs-core'
import icon from './contourPlot.svg'
import thumbnail from './contourPlot_thumb.svg'

export const metadata = {
  name: 'Contour plot',
  id: 'rawgraphs.contourplot',
  thumbnail,
  icon,
  categories: [t('categories.correlations'), t('categories.distributions')],
  description: t('charts.contourPlot.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/contourPlot',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-contour-plot/',
}
