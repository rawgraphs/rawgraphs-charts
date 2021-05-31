import icon from './alluvialdiagram.svg'
import thumbnail from './alluvialdiagram_thumb.svg'

export const metadata = {
  name: 'Alluvial Diagram',
  id: 'rawgraphs.alluvialdiagram',
  thumbnail,
  icon,
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/alluvialdiagram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-an-alluvial-diagram/',
  categories: ['correlations', 'proportions'],
  description:
    'It shows correlations between categorical dimensions representing them as flows, visually linking categories with shared items. Each rectangle represents a unique value in the selected dimension, its height is proportional to its value. Correlations are represented with curved lines whose width is proportional to their value.',
}
