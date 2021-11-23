import { t } from '@rawgraphs/rawgraphs-core'

export const visualOptions = {
  marginTop: {
    type: 'number',
    label: t('visualOptions.marginTop'),
    default: 10,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    label: t('visualOptions.marginRight'),
    default: 10,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    label: t('visualOptions.marginBottom'),
    default: 30,
    group: 'artboard',
  },
  marginLeft: {
    type: 'number',
    label: t('visualOptions.marginLeft'),
    default: 50,
    group: 'artboard',
  },
  padding: {
    type: 'number',
    label: t('visualOptions.padding'),
    default: 10,
    group: 'chart',
  },
  binsNumber: {
    type: 'number',
    label: t('visualOptions.binsNumber'),
    default: 10,
    group: 'chart',
  },
  sortGroupsBy: {
    type: 'text',
    label: t('visualOptions.sortViolinsBy'),
    group: 'chart',
    options: [
      {
        label: t('visualOptions.sortGroupsByOptions.valueDescending'),
        value: 'valueDescending',
      },
      {
        label: t('visualOptions.sortGroupsByOptions.valueAscending'),
        value: 'valueAscending',
      },
      {
        label: t('visualOptions.sortGroupsByOptions.name'),
        value: 'name',
      },
      {
        label: t('visualOptions.sortGroupsByOptions.none'),
        value: 'none',
      },
    ],
    default: 'valueDescending',
  },
  interpolation: {
    type: 'text',
    label: t('visualOptions.curveType'),
    default: 'Monotone Y',
    options: [
      'Basis',
      'Bundle',
      'Cardinal',
      'Catmull–Rom',
      'Linear',
      'Monotone Y',
      'Natural',
      'Step',
      'Step After',
      'Step Before',
    ],
    group: 'chart',
  },
  showDots: {
    type: 'boolean',
    label: t('visualOptions.showDotsOnData'),
    default: false,
    group: 'chart',
  },
  dotsDiameter: {
    type: 'number',
    label: t('visualOptions.dotsDiameter'),
    disabled: {
      showDots: false,
    },
    default: 2,
    group: 'chart',
  },
  showLegend: {
    type: 'boolean',
    label: t('visualOptions.showLegend'),
    default: false,
    group: 'artboard',
  },
  legendWidth: {
    type: 'number',
    label: t('visualOptions.legendWidth'),
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
    container: 'width',
    containerCondition: {
      showLegend: true,
    },
  },
  colorScale: {
    type: 'colorScale',
    label: t('visualOptions.colorScale'),
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'schemeCategory10',
    },
    group: 'colors',
  },
}
