import { t } from '@rawgraphs/rawgraphs-core'
import icon from './boxplot.svg'
import thumbnail from './boxplot_thumb.svg'

export const metadata = {
  name: 'Box plot',
  id: 'rawgraphs.boxplot',
  thumbnail,
  icon,
  categories: [t('categories.distributions')],
  description: t('charts.boxplot.description'),
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/boxplot',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-boxplot/',
}
