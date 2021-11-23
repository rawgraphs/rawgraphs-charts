import { t } from '@rawgraphs/rawgraphs-core'
import icon from './barchartmultiset.svg'
import thumbnail from './barchartmultiset_thumb.svg'

export const metadata = {
  name: 'Multi-set bar chart',
  thumbnail,
  icon,
  id: 'rawgraphs.barchartmultiset',
  categories: [t('categories.correlations'), t('categories.proportions')],
  description: t('charts.barchartmultiset.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/barchartmultiset',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-multiset-barchart/',
}
