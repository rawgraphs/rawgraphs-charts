import { t } from '@rawgraphs/rawgraphs-core'
import icon from './voronoidiagram.svg'
import thumbnail from './voronoidiagram_thumb.svg'

export const metadata = {
  name: 'Voronoi Diagram',
  id: 'rawgraphs.voronoidiagram',
  thumbnail,
  icon,
  categories: [t('categories.correlations')],
  description: t('charts.voronoidiagram.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/voronoidiagram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-voronoi-diagram/',
}
