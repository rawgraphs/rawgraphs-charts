import { t } from '@rawgraphs/rawgraphs-core'
import icon from './hexagonalBinning.svg'
import thumbnail from './hexagonalBinning_thumb.svg'

export const metadata = {
  name: 'Hexagonal binning',
  id: 'rawgraphs.hexagonalbinning',
  thumbnail,
  icon,
  categories: [t('categories.correlations'), t('categories.distributions')],
  description: t('charts.hexagonalBinning.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/hexagonalBinning',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-an-hexagonal-binning/',
}
