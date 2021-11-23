import { t } from '@rawgraphs/rawgraphs-core'
import icon from './convexHull.svg'
import thumbnail from './convexHull_thumb.svg'

export const metadata = {
  name: 'Convex hull',
  id: 'rawgraphs.convexhull',
  thumbnail,
  icon,
  categories: [t('categories.correlations'), t('categories.proportions')],
  description: t('charts.convexHull.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/convexHull',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-convex-hulls-chart/',
}
