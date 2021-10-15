import icon from './dendrogram.svg'
import thumbnail from './dendrogram_thumb.svg'

export const metadata = {
  name: 'Linear dendrogram',
  id: 'rawgraphs.lineardendrogram',
  thumbnail,
  icon,
  categories: ['hierarchies', 'proportions'],
  description:
    'It displays hierarchically structured data with a tree structure, where the root node is on the left and leaves are on the right. The size of nodes can be used to encode a further quantitative dimension with size and a quantitative or categorical dimension with color.',
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/dendrogram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-linear-dendrogram/',
}
