import { t } from '@rawgraphs/rawgraphs-core'

export const visualOptions = {
  marginTop: {
    type: 'number',
    label: t('visualOptions.marginTop'),
    default: 20,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    label: t('visualOptions.marginRight'),
    default: 20,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    label: t('visualOptions.marginBottom'),
    default: 20,
    group: 'artboard',
  },
  marginLeft: {
    type: 'number',
    label: t('visualOptions.marginLeft'),
    default: 20,
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
  orientation: {
    type: 'text',
    label: t('visualOptions.orientation'),
    group: 'chart',
    options: [
      {
        label: t('visualOptions.orientationOptions.vertical'),
        value: 'vertical',
      },
      {
        label: t('visualOptions.orientationOptions.horizontal'),
        value: 'horizontal',
      },
    ],
    default: 'vertical',
  },
  strokeWidth: {
    type: 'number',
    label: t('visualOptions.strokeWidth'),
    default: 1,
    group: 'chart',
  },
  strokeOpacity: {
    group: 'chart',
    type: 'number',
    label: t('visualOptions.strokeOpacity'),
    default: 0.5,
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
}
