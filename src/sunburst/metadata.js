import icon from './sunburst.svg'
import thumbnail from './sunburst_thumb.svg'

export const metadata = {
  name: 'Sunburst diagram',
  id: 'rawgraphs.sunburst',
  thumbnail,
  icon,
  categories: ['hierarchies', 'proportions'],
  description:
    'It displays hierarchically structured data and a related quantitative dimension using concentric circles. The circle in the center represents the root node, with the hierarchies moving outward from the center. The angle of each arc corresponds to the qualitative dimension.',
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/sunburst',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-sunburst-diagram/',
}
