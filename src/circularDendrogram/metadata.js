import icon from './circulardendrogram.svg'
import thumbnail from './circulardendrogram_thumb.svg'

export const metadata = {
  name: 'Circular dendrogram',
  id: 'rawgraphs.circulardendrogram',
  thumbnail,
  icon,
  categories: ['hierarchies', 'proportions'],
  description:
    'It displays hierarchically structured data with a radial tree structure, where the root node is in the center with the hierarchies moving outward. The area of nodes can be used to encode a further quantitative dimension and a quantitative or categorical dimension with color.',
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/circularDendrogram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-circular-dendrogram/',
}
