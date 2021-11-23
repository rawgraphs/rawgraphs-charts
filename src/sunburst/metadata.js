import { t } from '@rawgraphs/rawgraphs-core'
import icon from './sunburst.svg'
import thumbnail from './sunburst_thumb.svg'

export const metadata = {
  name: 'Sunburst diagram',
  id: 'rawgraphs.sunburst',
  thumbnail,
  icon,
  categories: [t('categories.hierarchies'), t('categories.proportions')],
  description: t('charts.sunburst.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/sunburst',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-sunburst-diagram/',
}
