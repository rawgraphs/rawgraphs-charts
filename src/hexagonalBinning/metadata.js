import icon from './hexagonalBinning.svg'
import thumbnail from './hexagonalBinning_thumb.svg'

export const metadata = {
  name: 'Hexagonal binning',
  id: 'rawgraphs.hexagonalbinning',
  thumbnail,
  icon,
  categories: ['correlations', 'distributions'],
  description:
    'Hexagonal Binning is a way to manage the problem of having too many points that start to overlap. Hexagonal binning plots density, rather than points. Points are binned into gridded hexagons and distribution (the number of points per hexagon) is displayed using either the color or the area of the hexagons.',
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/hexagonalBinning',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-an-hexagonal-binning/',
}
