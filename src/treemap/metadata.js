import { t } from '@rawgraphs/rawgraphs-core'
import icon from './treemap.svg'
import thumbnail from './treemap_thumb.svg'

export const metadata = {
  name: 'Treemap',
  id: 'rawgraphs.treemap',
  thumbnail,
  icon,
  categories: [t('categories.hierarchies'), t('categories.proportions')],
  description: t('charts.treemap.description'),
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/treemap',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-treemap/',
}
