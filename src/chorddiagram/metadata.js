import icon from './chorddiagram.svg'
import thumbnail from './chorddiagram_thumb.svg'

/*
Copied and adapted from:
https://github.com/rawgraphs/rawgraphs-charts/blob/master/docs/add-a-new-chart.md
*/

export const metadata = {
  name: 'Chord Diagram',
  id: 'rawgraphs.chorddiagram',
  thumbnail,
  icon,
  categories: ['networks'],
  description:
    'It shows relationships among nodes. Nodes size represent the sum of incoming and outgoing links. Relationships are drawn as arcs whose width represent their values.', //TODO
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/chorddiagram',
  tutorial: 'www.rawgraphs.io/learning/how-to-make-a-chord-diagram',
}
