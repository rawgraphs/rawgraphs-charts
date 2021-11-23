import { t } from '@rawgraphs/rawgraphs-core'
import icon from './barchartstacked.svg'
import thumbnail from './barchartstacked_thumb.svg'

export const metadata = {
  name: 'Stacked bar chart',
  id: 'rawgraphs.barchartstacked',
  thumbnail,
  icon,
  categories: [t('categories.correlations'), t('categories.proportions')],
  description: t('charts.barchartstacked.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/barchartstacked',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-stacked-barchart/',
}
