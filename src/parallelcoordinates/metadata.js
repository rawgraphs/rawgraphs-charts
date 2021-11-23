import { t } from '@rawgraphs/rawgraphs-core'
import icon from './parallelcoordinates.svg'
import thumbnail from './parallelcoordinates_thumb.svg'

export const metadata = {
  name: 'Parallel coordinates',
  id: 'rawgraphs.parallelcoordinates',
  thumbnail,
  icon,
  categories: [t('categories.correlations'), t('categories.distributions')],
  description: t('charts.parallelcoordinates.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/parallelcoordinates',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-parallel-coordinates/',
}
