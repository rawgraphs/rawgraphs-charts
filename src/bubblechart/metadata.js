import { t } from '@rawgraphs/rawgraphs-core'
import icon from './bubblechart.svg'
import thumbnail from './bubblechart_thumb.svg'

export const metadata = {
  name: 'Bubble chart',
  id: 'rawgraphs.bubblechart',
  thumbnail,
  icon,
  categories: [t('categories.correlations'), t('categories.proportions')],
  description: t('charts.bubblechart.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/bubblechart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-scatterplot/',
}
