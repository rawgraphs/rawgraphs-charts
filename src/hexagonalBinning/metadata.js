import icon from './hexagonalBinning.svg'
import thumbnail from './hexagonalBinning_thumb.svg'

export const metadata = {
  name: 'Hexagonal binning',
  thumbnail,
  icon,
  categories: ['correlation', 'density'],
  description:
    'Hexagonal Binning is a way to manage the problem of having to many points that start to overlap. Hexagonal binning plots density, rather than points. Points are binned into gridded hexagons and distribution (the number of points per hexagon) is displayed using either the color or the area of the hexagons.',
  code: 'https://github.com/rawgraphs/raw',
  tutorial: 'https://rawgraphs.io/learning/',
}
