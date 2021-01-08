import radarchart from 'rawcharts/radarChart'
import data from '../datasets/football-players.csv'

export default {
  chart: radarchart,
  data,
  dataTypes: {
    ID: 'number',
    Name: 'string',
    Age: 'number',
    Nationality: 'string',
    Club: 'string',
    'Value (millions)': 'number',
    Wage: 'number',
    BallControl: 'number',
    Acceleration: 'number',
    Agility: 'number',
    Reactions: 'number',
    Balance: 'number',
    ShotPower: 'number',
    Jumping: 'number',
    Stamina: 'number',
    Strength: 'number',
  },
  mapping: {
    name: {
      value: ['Name'],
    },
    axes: {
      value: [
        'BallControl',
        'Acceleration',
        'Agility',
        'ShotPower',
        'Strength',
      ],
    },
    color: { value: ['Club'] },
    series: { value: ['Name'] },
  },
  visualOptions: {
    width: 1500,
    height: 1500,
  },
}
