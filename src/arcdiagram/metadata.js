import icon from './arcdiagram.svg'
import thumbnail from './arcdiagram_thumb.svg'

export const metadata = {
  name: 'Arc Diagram',
  id: 'rawgraphs.arcdiagram',
  thumbnail,
  icon,
  categories: ['networks'],
  description:
    'A particular kind of network graph, allows seeing relationships among nodes. Nodes are displayed on the horizontal axis, and links as clockwise arcs. An arc above the nodes means a connection from the left to the right, while below means a connection from the right node to the left one.',
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/arcdiagram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-an-arc-diagram/',
}
