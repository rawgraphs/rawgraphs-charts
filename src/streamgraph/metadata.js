import { t } from '@rawgraphs/rawgraphs-core'
import icon from './streamgraph.svg'
import thumbnail from './streamgraph_thumb.svg'

export const metadata = {
  name: 'Streamgraph (area chart)',
  id: 'rawgraphs.streamgraph',
  thumbnail,
  icon,
  categories: [
    t('categories.time series'),
    t('categories.correlations'),
    t('categories.proportions'),
  ],
  description: t('charts.streamgraph.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/streamgraph',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-streamgraph/',
}
