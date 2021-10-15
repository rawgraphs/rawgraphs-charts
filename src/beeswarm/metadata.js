import icon from './beeswarm.svg'
import thumbnail from './beeswarm_thumb.svg'

export const metadata = {
  name: 'Beeswarm plot',
  id: 'rawgraphs.beeswarm',
  thumbnail,
  icon,
  categories: ['distributions', 'time series', 'proportions'],
  description:
    'It displays the distribution of items over a continuous dimensions. Each (line) is represented with a dot placed on the horizontal axis. The vertical dimension is used to avoid overlaps among circles, showing their distribution. The area of dots can be used to encode a further quantitative dimension and a quantitative or categorical dimension with color.',
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/beeswarm',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-beeswarm-plot/',
}
