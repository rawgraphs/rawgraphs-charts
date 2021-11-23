import { t } from '@rawgraphs/rawgraphs-core'
import icon from './dendrogram.svg'
import thumbnail from './dendrogram_thumb.svg'

export const metadata = {
  name: 'Linear dendrogram',
  id: 'rawgraphs.lineardendrogram',
  thumbnail,
  icon,
  categories: [t('categories.hierarchies'), t('categories.proportions')],
  description: t('charts.dendrogram.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/dendrogram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-linear-dendrogram/',
}
