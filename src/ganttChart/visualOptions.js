import { t } from '@rawgraphs/rawgraphs-core'

export const visualOptions = {
  marginTop: {
    type: 'number',
    label: t('visualOptions.marginTop'),
    default: 50,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    label: t('visualOptions.marginRight'),
    default: 50,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    label: t('visualOptions.marginBottom'),
    default: 50,
    group: 'artboard',
  },
  marginLeft: {
    type: 'number',
    label: t('visualOptions.marginLeft'),
    default: 50,
    group: 'artboard',
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
  sortGroupsBy: {
    type: 'text',
    label: t('visualOptions.sortGroupsBy'),
    group: 'chart',
    options: [
      {
        label: t('visualOptions.sortGroupsByOptions.'),
        value: '',
      },
      {
        label: t('visualOptions.sortGroupsByOptions.ascending'),
        value: 'ascending',
      },
      {
        label: t('visualOptions.sortGroupsByOptions.descending'),
        value: 'descending',
      },
      {
        label: t('visualOptions.sortGroupsByOptions.group'),
        value: 'group',
      },
    ],
    default: '',
  },
  barPadding: {
    type: 'number',
    label: t('visualOptions.barPadding'),
    default: 0,
    group: 'chart',
    step: 0.1,
    min: 0,
    max: 1,
  },
  colorScale: {
    type: 'colorScale',
    label: t('visualOptions.colorScale'),
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },
  alignLabels: {
    type: 'boolean',
    label: t('visualOptions.alignLabels'),
    default: false,
    group: 'labels',
  },
}
