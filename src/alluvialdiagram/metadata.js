import { t } from '@rawgraphs/rawgraphs-core'
import icon from './alluvialdiagram.svg'
import thumbnail from './alluvialdiagram_thumb.svg'

export const metadata = {
  name: 'Alluvial Diagram',
  id: 'rawgraphs.alluvialdiagram',
  thumbnail,
  icon,
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/alluvialdiagram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-an-alluvial-diagram/',
  categories: [t('categories.correlations'), t('categories.proportions')],
  description: t('charts.alluvialdiagram.description'),
}
