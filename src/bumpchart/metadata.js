import { t } from '@rawgraphs/rawgraphs-core'
import icon from './bumpchart.svg'
import thumbnail from './bumpchart_thumb.svg'

export const metadata = {
  name: 'Bumpchart',
  id: 'rawgraphs.bumpchart',
  thumbnail,
  icon,
  categories: [
    t('categories.time series'),
    t('categories.correlations'),
    t('categories.proportions'),
  ],
  description: t('charts.bumpchart.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/bumpchart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-bump-chart/',
}
