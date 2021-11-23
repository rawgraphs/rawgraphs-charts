import { t } from '@rawgraphs/rawgraphs-core'
import icon from './sankeydiagram.svg'
import thumbnail from './sankeydiagram_thumb.svg'

export const metadata = {
  name: 'Sankey Diagram',
  id: 'rawgraphs.sankeydiagram',
  thumbnail,
  icon,
  categories: [t('categories.networks')],
  description: t('charts.sankeydiagram.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/sankeydiagram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-sankey-diagram/',
}
