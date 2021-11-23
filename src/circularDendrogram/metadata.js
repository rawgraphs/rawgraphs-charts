import { t } from '@rawgraphs/rawgraphs-core'
import icon from './circulardendrogram.svg'
import thumbnail from './circulardendrogram_thumb.svg'

export const metadata = {
  name: 'Circular dendrogram',
  id: 'rawgraphs.circulardendrogram',
  thumbnail,
  icon,
  categories: [t('categories.hierarchies'), t('categories.proportions')],
  description: t('charts.circularDendrogram.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/circularDendrogram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-circular-dendrogram/',
}
