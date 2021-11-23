import { t } from '@rawgraphs/rawgraphs-core'
import icon from './radarchart.svg'
import thumbnail from './radarchart_thumb.svg'

export const metadata = {
  name: 'Radar Chart',
  id: 'rawgraphs.radarchart',
  thumbnail,
  icon,
  categories: [t('categories.correlations')],
  description: t('charts.radarchart.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/radarchart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-radar-chart/',
}
