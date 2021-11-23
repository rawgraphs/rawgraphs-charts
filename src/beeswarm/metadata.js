import { t } from '@rawgraphs/rawgraphs-core'
import icon from './beeswarm.svg'
import thumbnail from './beeswarm_thumb.svg'

export const metadata = {
  name: 'Beeswarm plot',
  id: 'rawgraphs.beeswarm',
  thumbnail,
  icon,
  categories: [
    t('categories.distributions'),
    t('categories.time series'),
    t('categories.proportions'),
  ],
  description: t('charts.beeswarm.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/beeswarm',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-beeswarm-plot/',
}
