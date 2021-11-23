import { t } from '@rawgraphs/rawgraphs-core'
import icon from './barchart.svg'
import thumbnail from './barchart_thumb.svg'

export const metadata = {
  name: 'Bar chart',
  thumbnail,
  icon,
  id: 'rawgraphs.barchart',
  categories: [t('categories.correlations')],
  description: t('charts.barchart.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/barchart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-barchart/',
}
