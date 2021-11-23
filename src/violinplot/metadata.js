import { t } from '@rawgraphs/rawgraphs-core'
import icon from './violinplot.svg'
import thumbnail from './violinplot_thumb.svg'

export const metadata = {
  name: 'Violin plot',
  id: 'rawgraphs.violinplot',
  thumbnail,
  icon,
  categories: [t('categories.distributions')],
  description: t('charts.violinplot.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/violinplot',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-violin-plot/',
}
