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
  bands: {
    type: 'number',
    label: t('visualOptions.bands'),
    default: 4,
    group: 'chart',
  },
  padding: {
    type: 'number',
    label: t('visualOptions.padding'),
    default: 1,
    group: 'chart',
  },
  interpolation: {
    type: 'text',
    label: t('visualOptions.curveType'),
    default: 'curveMonotoneX',
    options: [
      {
        label: t('visualOptions.interpolationOptions.curveBasis'),
        value: 'curveBasis',
      },
      {
        label: t('visualOptions.interpolationOptions.curveCardinal'),
        value: 'curveCardinal',
      },
      {
        label: t('visualOptions.interpolationOptions.curveCatmullRom'),
        value: 'curveCatmullRom',
      },
      {
        label: t('visualOptions.interpolationOptions.curveLinear'),
        value: 'curveLinear',
      },
      {
        label: t('visualOptions.interpolationOptions.curveMonotoneX'),
        value: 'curveMonotoneX',
      },
      {
        label: t('visualOptions.interpolationOptions.curveNatural'),
        value: 'curveNatural',
      },
      {
        label: t('visualOptions.interpolationOptions.curveStep'),
        value: 'curveStep',
      },
      {
        label: t('visualOptions.interpolationOptions.curveStepAfter'),
        value: 'curveStepAfter',
      },
      {
        label: t('visualOptions.interpolationOptions.curveStepBefore'),
        value: 'curveStepBefore',
      },
    ],
    group: 'chart',
  },
  negativeStyle: {
    type: 'text',
    label: t('visualOptions.negativeStyle'),
    group: 'chart',
    options: [
      {
        label: t('visualOptions.negativeStyleOptions.mirrored'),
        value: 'mirrored',
      },
      {
        label: t('visualOptions.negativeStyleOptions.top'),
        value: 'top',
      },
    ],
    default: 'mirrored',
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
