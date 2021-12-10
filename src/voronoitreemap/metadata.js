import icon from './voronoitreemap.svg'
import thumbnail from './voronoitreemap_thumb.svg'

export const metadata = {
  name: 'Treemap (Voronoi)',
  id: 'rawgraphs.voronoitreemap',
  thumbnail,
  icon,
  categories: ['hierarchies', 'proportions'],
  description:
    'It displays hierarchically structured data and a related quantitative dimension. It is composed of an area divided into small cells, representing the last level of the tree structure, computed using the Voronoi tessellation. The cells’ size depends on the quantitative dimension.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/treemap',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-treemap/',
}
