import { t } from '@rawgraphs/rawgraphs-core'
import icon from './circlepacking.svg'
import thumbnail from './circlepacking_thumb.svg'

export const metadata = {
  name: 'Circle Packing',
  id: 'rawgraphs.circlepacking',
  thumbnail,
  icon,
  categories: [t('categories.hierarchies'), t('categories.proportions')],
  description: t('charts.circlepacking.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/circlepacking',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-circle-packing',
}
