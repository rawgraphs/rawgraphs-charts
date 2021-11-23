import { t } from '@rawgraphs/rawgraphs-core'
import icon from './arcdiagram.svg'
import thumbnail from './arcdiagram_thumb.svg'

export const metadata = {
  name: 'Arc Diagram',
  id: 'rawgraphs.arcdiagram',
  thumbnail,
  icon,
  categories: [t('categories.networks')],
  description: t('charts.arcdiagram.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/arcdiagram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-an-arc-diagram/',
}
