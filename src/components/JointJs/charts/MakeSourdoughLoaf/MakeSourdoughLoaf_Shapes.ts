/*
This contain all the shapes for the MakeSourdoughLoaf chart
*/

import { CreateShape, ShapeFactory } from '@/components/JointJs/composables/ShapeFactory'
import * as joint from '@joint/core'
const shapes: { [key: string]: joint.dia.Element } = {}

const strokeWidthStroke = 1
const strokeColor = '#0f0f0f'
// Creating custom shape Balance1
const BalanceSize = { width: 25, height: 80 }
const BalanceLabelPosition = { x: 52, y: 30 }

// creating all shapes in the chart and return dictionary of shapes.
function createShapesInChart(graph: joint.dia.Graph): { [key: string]: joint.dia.Element } {
  shapes.start = new ShapeFactory({
    position: { x: 50, y: 93 },
    customData: {
      SN: 'Start-01',
      Description: 'Start of the process',
      AssetTrackingID: 'AssetID-01'
    },

    size: { width: 100, height: 300 }, //custom size of shape, but this changes the position of label
    svgPath:
      'M18.5 21h-13A4.505 4.505 0 0 1 1 16.5v-9A4.505 4.505 0 0 1 5.5 3h13A4.505 4.505 0 0 1 23 7.5v9a4.505 4.505 0 0 1-4.5 4.5zM5.5 4A3.504 3.504 0 0 0 2 7.5v9A3.504 3.504 0 0 0 5.5 20h13a3.504 3.504 0 0 0 3.5-3.5v-9A3.504 3.504 0 0 0 18.5 4z', // Example path
    fill: '#229954',
    stroke: strokeColor,
    strokeWidth: 0.3,
    label: 'Start',
    labelFontSize: 14,
    labelPosition: { x: 40, y: 40 },
    AssetTrackingID: 'start',
    SN: 'start of flow chart'
  })

  shapes.knead = new ShapeFactory({
    position: { x: 870, y: 530 },
    size: { width: 45, height: 200 }, //custom size of shape, but this changes the position of label
    svgPath: 'M1 10H44V34H1ZM1 22 8.59 22 16.18 13.6 28.82 30.4 38.94 22 44 22', // Example path
    fill: 'transparent',
    stroke: strokeColor,
    strokeWidth: 0.5,
    label: 'Knead\n3 times',
    labelFontSize: 14,
    labelPosition: { x: 35, y: 45 },
    AssetTrackingID: 'rhombus1',
    SN: 'Mouldy'
  })

  shapes.rhombus1 = new ShapeFactory({
    position: { x: 250, y: 87 },
    size: { width: 120, height: 350 }, //custom size of shape, but this changes the position of label
    svgPath:
      'M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z', // Example path
    fill: '#fadbd8',
    stroke: strokeColor,
    strokeWidth: 0.3,
    label: 'Mouldy?',
    labelFontSize: 14,
    labelPosition: { x: 49, y: 45 },
    AssetTrackingID: 'rhombus1',
    SN: 'Mouldy'
  })

  shapes.rhombus2 = new ShapeFactory({
    position: { x: 390, y: 130 },
    size: { width: 120, height: 350 }, //custom size of shape, but this changes the position of label
    svgPath:
      'M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z', // Example path
    fill: '#fadbd8',
    stroke: strokeColor,
    strokeWidth: 0.3,
    label: 'Ready?',
    labelFontSize: 14,
    labelPosition: { x: 49, y: 45 },
    AssetTrackingID: 'rhombus2',
    SN: 'Ready'
  })

  shapes.Balance1 = new ShapeFactory({
    position: { x: 1005, y: 190 },
    size: { width: BalanceSize.width, height: BalanceSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M34.33 1C34.33 10.28 26.87 17.8 17.67 17.8C8.46 17.8 1 10.28 1 1L126 1C126 10.28 118.54 17.8 109.33 17.8C100.13 17.8 92.67 10.28 92.67 1ZM63.5 1.42L76 22L51 22Z', // Example path
    fill: '#ffcc00',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: '40g : 80g : 80g',
    labelFontSize: 14,
    labelPosition: { x: BalanceLabelPosition.x, y: BalanceLabelPosition.y },
    AssetTrackingID: 'Balance1',
    SN: '40g : 80g : 80g'
  })

  shapes.Balance2 = new ShapeFactory({
    position: { x: 130, y: 480 },
    size: { width: BalanceSize.width, height: BalanceSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M34.33 1C34.33 10.28 26.87 17.8 17.67 17.8C8.46 17.8 1 10.28 1 1L126 1C126 10.28 118.54 17.8 109.33 17.8C100.13 17.8 92.67 10.28 92.67 1ZM63.5 1.42L76 22L51 22Z', // Example path
    fill: '#ffcc00',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: '940g : 600g',
    labelFontSize: 14,
    labelPosition: { x: BalanceLabelPosition.x, y: BalanceLabelPosition.y },
    AssetTrackingID: 'Balance2',
    SN: '940g : 600g'
  })

  shapes.Balance3 = new ShapeFactory({
    position: { x: 1000, y: 480 },
    size: { width: BalanceSize.width, height: BalanceSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M34.33 1C34.33 10.28 26.87 17.8 17.67 17.8C8.46 17.8 1 10.28 1 1L126 1C126 10.28 118.54 17.8 109.33 17.8C100.13 17.8 92.67 10.28 92.67 1ZM63.5 1.42L76 22L51 22Z', // Example path
    fill: '#ffcc00',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: '50g : 20g',
    labelFontSize: 14,
    labelPosition: { x: BalanceLabelPosition.x, y: BalanceLabelPosition.y },
    AssetTrackingID: 'Balance3',
    SN: '50g : 20g'
  })

  shapes.Bread = new ShapeFactory({
    position: { x: 50, y: 743 },
    size: { width: 3, height: 11 }, //custom size of shape, but this changes the position of label
    svgPath:
      'M489.954 60.56l-16.64-16.644C414.793-14.606 319.59-14.638 261.026 43.82l-0.002-0.002l-56.315 56.315l0.001 0.001l-51.797 51.796l-28.223 28.222l0.001 0.001l-80.775 80.775c-58.554 58.555-58.554 153.83 0 212.384l16.643 16.642c14.215 14.216 33.115 22.044 53.22 22.044s39.005-7.83 53.221-22.044l40.183-40.184l-10.75-10.75l-40.183 40.183c-11.345 11.345-26.427 17.592-42.471 17.592c-16.043 0-31.126-6.247-42.47-17.592l-16.643-16.642c-52.627-52.627-52.627-138.257 0-190.884l0.757-0.757l60.413 60.412c7.521 7.521 17.521 11.664 28.158 11.664c10.636 0 20.637-4.142 28.158-11.664c15.526-15.526 15.526-40.79 0-56.317l-60.411-60.412l23.701-23.701l60.412 60.411c7.52 7.52 17.52 11.663 28.157 11.664c0.001 0 0.002 0 0.004 0c10.635 0 20.635-4.142 28.157-11.664c15.525-15.527 15.525-40.791-0.001-56.316l-60.411-60.411l23.702-23.702l60.41 60.412c7.521 7.521 17.521 11.664 28.158 11.664c0.001 0 0 0 0.001 0c10.636 0 20.637-4.142 28.159-11.665c15.523-15.527 15.523-40.791-0.001-56.316l-60.411-60.409c52.635-52.53 138.191-52.499 190.785 0.094l16.641 16.644c11.345 11.344 17.592 26.426 17.592 42.469c0 16.043-6.247 31.126-17.593 42.471L210.767 424.685l10.751 10.75l268.435-268.436c14.217-14.216 22.047-33.117 22.047-53.221C511.999 93.675 504.169 74.774 489.954 60.56z M161.4 285.765c9.599 9.6 9.599 25.219 0 34.817c-4.65 4.65-10.833 7.211-17.409 7.211c-6.576 0-12.758-2.561-17.409-7.211l-60.412-60.411l34.818-34.817L161.4 285.765z M241.419 205.747c9.598 9.598 9.598 25.217 0 34.817c-4.65 4.65-10.832 7.211-17.406 7.211c-0.001 0-0.002 0-0.003 0c-6.577-0.001-12.759-2.561-17.409-7.21l-60.412-60.411l24.907-24.907l9.912-9.911L241.419 205.747z M321.436 125.729c9.599 9.598 9.599 25.217 0.002 34.817c-4.651 4.65-10.834 7.211-17.41 7.211c-6.577 0-12.759-2.561-17.409-7.211l-60.411-60.411l34.815-34.815L321.436 125.729z', // Example path
    fill: '#e67e22',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Bread',
    labelFontSize: 14,
    labelPosition: { x: 22, y: 75 },
    AssetTrackingID: 'Bread',
    SN: 'Bread'
  })

  const MixerSize = { width: 40, height: 90 }
  shapes.Mixer1 = new ShapeFactory({
    position: { x: 1020, y: 260 },
    size: { width: MixerSize.width, height: MixerSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M6.53 52L1.04 57.1L1.04 74.95C1 82.25 10.19 88.54 23.01 90L26.3 85.15ZM50.46 52L55.95 57.1L55.95 74.95C56 82.25 46.81 88.54 33.99 90L30.69 85.15ZM6.53 26.5C6.53 22.28 16.37 18.85 28.5 18.85C40.63 18.85 50.46 22.28 50.46 26.5L50.46 72.4C50.46 79.45 40.63 85.15 28.5 85.15C16.37 85.15 6.53 79.45 6.53 72.4ZM24.65 2.53L32.34 2.53M24.65 9.67L32.34 9.67M28.5 11.2L28.5 77.76ZM23.01 77.5C23.01 77.5 23.01 77.5 23.01 77.5ZM33.99 77.5C33.99 77.5 33.99 77.5 33.99 77.5Z',
    fill: '#aeb6bf',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Mix   1',
    labelFontSize: 14,
    labelPosition: { x: 35, y: 40 },
    AssetTrackingID: 'Mixer1',
    SN: 'Mix'
  })

  shapes.Mixer2 = new ShapeFactory({
    position: { x: 400, y: 455 },
    size: { width: MixerSize.width, height: MixerSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M6.53 52L1.04 57.1L1.04 74.95C1 82.25 10.19 88.54 23.01 90L26.3 85.15ZM50.46 52L55.95 57.1L55.95 74.95C56 82.25 46.81 88.54 33.99 90L30.69 85.15ZM6.53 26.5C6.53 22.28 16.37 18.85 28.5 18.85C40.63 18.85 50.46 22.28 50.46 26.5L50.46 72.4C50.46 79.45 40.63 85.15 28.5 85.15C16.37 85.15 6.53 79.45 6.53 72.4ZM24.65 2.53L32.34 2.53M24.65 9.67L32.34 9.67M28.5 11.2L28.5 77.76ZM23.01 77.5C23.01 77.5 23.01 77.5 23.01 77.5ZM33.99 77.5C33.99 77.5 33.99 77.5 33.99 77.5Z',
    fill: '#aeb6bf',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Mix   2',
    labelFontSize: 14,
    labelPosition: { x: 35, y: 40 },
    AssetTrackingID: 'Mixer2',
    SN: 'Mix'
  })

  shapes.Mixer3 = new ShapeFactory({
    position: { x: 810, y: 455 },
    size: { width: MixerSize.width, height: MixerSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M6.53 52L1.04 57.1L1.04 74.95C1 82.25 10.19 88.54 23.01 90L26.3 85.15ZM50.46 52L55.95 57.1L55.95 74.95C56 82.25 46.81 88.54 33.99 90L30.69 85.15ZM6.53 26.5C6.53 22.28 16.37 18.85 28.5 18.85C40.63 18.85 50.46 22.28 50.46 26.5L50.46 72.4C50.46 79.45 40.63 85.15 28.5 85.15C16.37 85.15 6.53 79.45 6.53 72.4ZM24.65 2.53L32.34 2.53M24.65 9.67L32.34 9.67M28.5 11.2L28.5 77.76ZM23.01 77.5C23.01 77.5 23.01 77.5 23.01 77.5ZM33.99 77.5C33.99 77.5 33.99 77.5 33.99 77.5Z',
    fill: '#aeb6bf',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Mix   3',
    labelFontSize: 14,
    labelPosition: { x: 35, y: 40 },
    AssetTrackingID: 'Mixer3',
    SN: 'Mix'
  })

  const OvenSize = { width: 30, height: 100 }
  shapes.Oven1 = new ShapeFactory({
    position: { x: 190, y: 560 },
    size: { width: OvenSize.width, height: OvenSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M26 1L56 1L56 35.5L71 45.5L71 100L61 100L61 90.5L21 90.5L21 100L11 100L11 45.5L26 35.5ZM26 35.5L56 35.5M11 45.5L71 45.5M11 90.5L71 90.5M1 55.5L56 55.5L26 80.5L81 80.5',
    fill: '#eb984e',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Preheat',
    labelFontSize: 14,
    labelPosition: { x: 42, y: 118 },
    AssetTrackingID: 'Oven1',
    SN: 'Preheat'
  })

  shapes.Oven2 = new ShapeFactory({
    position: { x: 190, y: 721 },
    size: { width: OvenSize.width, height: OvenSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M26 1L56 1L56 35.5L71 45.5L71 100L61 100L61 90.5L21 90.5L21 100L11 100L11 45.5L26 35.5ZM26 35.5L56 35.5M11 45.5L71 45.5M11 90.5L71 90.5M1 55.5L56 55.5L26 80.5L81 80.5',
    fill: '#d35400',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Bake',
    labelFontSize: 14,
    labelPosition: { x: 42, y: 118 },
    AssetTrackingID: 'Oven2',
    SN: 'Bake'
  })

  const ContainerSize = { width: 50, height: 100 }
  const ContainerLabelPosition = { x: 60, y: 30 }
  shapes.Container0 = new ShapeFactory({
    position: { x: 50, y: 250 },
    size: { width: ContainerSize.width, height: ContainerSize.height }, //custom size of shape, but this changes the position of label
    svgPath: 'M4.6 5.07L4.6 62L69.4 62L69.4 5.07M1 9.13L1 1L73 1L73 9.13',
    fill: '#fcf3cf',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Initial\nStarter',
    labelFontSize: 14,
    labelPosition: { x: ContainerLabelPosition.x, y: ContainerLabelPosition.y },
    AssetTrackingID: 'Container0',
    SN: 'Initial Starter'
  })
  shapes.Container1 = new ShapeFactory({
    position: { x: 870, y: 70 },
    size: { width: ContainerSize.width, height: ContainerSize.height }, //custom size of shape, but this changes the position of label
    svgPath: 'M4.6 5.07L4.6 62L69.4 62L69.4 5.07M1 9.13L1 1L73 1L73 9.13',
    fill: '#fcf3cf',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Starter',
    labelFontSize: 14,
    labelPosition: { x: ContainerLabelPosition.x, y: ContainerLabelPosition.y },
    AssetTrackingID: 'Container1',
    SN: 'Container1'
  })

  shapes.Container2 = new ShapeFactory({
    position: { x: 786, y: 270 },
    size: { width: ContainerSize.width, height: ContainerSize.height }, //custom size of shape, but this changes the position of label
    svgPath: 'M4.6 5.07L4.6 62L69.4 62L69.4 5.07M1 9.13L1 1L73 1L73 9.13',
    fill: '#f9e79f',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Levain',
    labelFontSize: 14,
    labelPosition: { x: ContainerLabelPosition.x, y: ContainerLabelPosition.y },
    AssetTrackingID: 'Container2',
    SN: 'Levain'
  })

  shapes.Container3 = new ShapeFactory({
    position: { x: 570, y: 465 },
    size: { width: ContainerSize.width, height: ContainerSize.height }, //custom size of shape, but this changes the position of label
    svgPath: 'M4.6 5.07L4.6 62L69.4 62L69.4 5.07M1 9.13L1 1L73 1L73 9.13',
    fill: '#f7dc6f',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Autolyse',
    labelFontSize: 14,
    labelPosition: { x: ContainerLabelPosition.x, y: ContainerLabelPosition.y },
    AssetTrackingID: 'Container3',
    SN: 'Autolyse'
  })

  shapes.Container4 = new ShapeFactory({
    position: { x: 786.5, y: 750 },
    size: { width: ContainerSize.width, height: ContainerSize.height }, //custom size of shape, but this changes the position of label
    svgPath: 'M4.6 5.07L4.6 62L69.4 62L69.4 5.07M1 9.13L1 1L73 1L73 9.13',
    fill: '#f8c471',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Bulk\nFermentation',
    labelFontSize: 14,
    labelPosition: { x: ContainerLabelPosition.x, y: ContainerLabelPosition.y },
    AssetTrackingID: 'Container4',
    SN: 'Bulk Fermentation'
  })

  shapes.Container5 = new ShapeFactory({
    position: { x: 290, y: 250 },
    size: { width: ContainerSize.width, height: ContainerSize.height }, //custom size of shape, but this changes the position of label
    svgPath: 'M4.6 5.07L4.6 62L69.4 62L69.4 5.07M1 9.13L1 1L73 1L73 9.13',
    fill: '#fcf3cf',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Fermenting\nStarter',
    labelFontSize: 14,
    labelPosition: { x: ContainerLabelPosition.x, y: ContainerLabelPosition.y },
    AssetTrackingID: 'Container5',
    SN: 'Fermenting\nStarter'
  })

  const FContainerSize = { width: 72, height: 125 }
  const FContainerLabelPosition = { x: 55, y: 40 }
  shapes.FContainer1 = new ShapeFactory({
    position: { x: 1005, y: 70 },
    size: { width: FContainerSize.width, height: FContainerSize.height }, //custom size of shape, but this changes the position of label
    svgPath: 'M1 1L45 1L45 32.67L23 48.5L1 32.67ZM16.4 13.47C20.41 11.59 25.59 11.59 29.6 13.47',
    fill: '#fcf3cf',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Flour',
    labelFontSize: 14,
    labelPosition: { x: FContainerLabelPosition.x, y: FContainerLabelPosition.y },
    AssetTrackingID: 'FContainer1',
    SN: 'Flour'
  })

  shapes.FContainer2 = new ShapeFactory({
    position: { x: 60, y: 370 },
    size: { width: FContainerSize.width, height: FContainerSize.height }, //custom size of shape, but this changes the position of label
    svgPath: 'M1 1L45 1L45 32.67L23 48.5L1 32.67ZM16.4 13.47C20.41 11.59 25.59 11.59 29.6 13.47',
    fill: '#fcf3cf',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Flour',
    labelFontSize: 14,
    labelPosition: { x: FContainerLabelPosition.x, y: FContainerLabelPosition.y },
    AssetTrackingID: 'Bedroom Light',
    SN: 'FContainer2'
  })

  const funnelSize = { width: 100, height: 130 }
  const funnelLabelPositioion = { x: -70, y: 23 }
  shapes.funnel1 = new ShapeFactory({
    position: { x: 1250, y: 80 },
    size: { width: funnelSize.width, height: funnelSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M-5.5-3.75C-10.7 1.54-14.15 17.56-13.9 35.25L-27.1 35.25C-26.85 17.56-30.3 1.54-35.5-3.75Z',
    fill: '#3498db',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke - 0.5,
    label: 'Water',
    labelFontSize: 14,
    labelPosition: { x: funnelLabelPositioion.x, y: funnelLabelPositioion.y },
    AssetTrackingID: 'Bedroom Light',
    SN: 'funnel1'
  })

  shapes.funnel2 = new ShapeFactory({
    position: { x: 320, y: 375 },
    size: { width: funnelSize.width, height: funnelSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M-5.5-3.75C-10.7 1.54-14.15 17.56-13.9 35.25L-27.1 35.25C-26.85 17.56-30.3 1.54-35.5-3.75Z',
    fill: '#3498db',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke - 0.5,
    label: 'Water',
    labelFontSize: 14,
    labelPosition: { x: funnelLabelPositioion.x, y: funnelLabelPositioion.y },
    AssetTrackingID: 'Bedroom Light',
    SN: 'funnel2'
  })

  shapes.funnel3 = new ShapeFactory({
    position: { x: 1060, y: 390 },
    size: { width: funnelSize.width, height: funnelSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M-5.5-3.75C-10.7 1.54-14.15 17.56-13.9 35.25L-27.1 35.25C-26.85 17.56-30.3 1.54-35.5-3.75Z',
    fill: '#3498db',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke - 0.5,
    label: 'Water',
    labelFontSize: 14,
    labelPosition: { x: funnelLabelPositioion.x, y: funnelLabelPositioion.y },
    AssetTrackingID: 'Bedroom Light',
    SN: 'funnel3'
  })

  shapes.funnel4 = new ShapeFactory({
    position: { x: 1190, y: 390 },
    size: { width: funnelSize.width, height: funnelSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M-5.5-3.75C-10.7 1.54-14.15 17.56-13.9 35.25L-27.1 35.25C-26.85 17.56-30.3 1.54-35.5-3.75Z',
    fill: '#bdc3c7',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke - 0.5,
    label: 'Salt',
    labelFontSize: 14,
    labelPosition: { x: funnelLabelPositioion.x, y: funnelLabelPositioion.y },
    AssetTrackingID: 'Bedroom Light',
    SN: 'funnel4'
  })

  shapes.ShapeLoof = new ShapeFactory({
    position: { x: 620, y: 760.5 },
    size: { width: 30, height: 70 }, //custom size of shape, but this changes the position of label
    svgPath: 'M1 60.5L101 60.5L81 0.5L21 0.5ZM6 45.5L96 45.5M16 45.5L16 60.5M86 45.5L86 60.5',
    fill: '#d7dbdd',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke,
    label: 'Shape\nLoaf',
    labelFontSize: 14,
    labelPosition: { x: 50, y: 13 },
    AssetTrackingID: 'ShapeLoof',
    SN: 'Philips-01'
  })

  shapes.Proof = new ShapeFactory({
    position: { x: 350, y: 693 },
    size: { width: 130, height: 370 }, //custom size of shape, but this changes the position of label
    svgPath:
      'M0 18 0 31 32 31 32 18M-1 19-1 17 33 17 33 19M6.36 24c0-1.302-1.059-2.36-2.36-2.36S1.64 22.698 1.64 24 2.699 26.36 4 26.36 6.36 25.302 6.36 24zM2.36 24c0-.904.736-1.64 1.64-1.64S5.64 23.096 5.64 24 4.904 25.64 4 25.64 2.36 24.904 2.36 24zM14.36 24c0-1.302-1.059-2.36-2.36-2.36S9.64 22.698 9.64 24s1.059 2.36 2.36 2.36S14.36 25.302 14.36 24zM10.36 24c0-.904.736-1.64 1.64-1.64s1.64.735 1.64 1.64-.736 1.64-1.64 1.64S10.36 24.904 10.36 24zM22.36 24c0-1.302-1.059-2.36-2.36-2.36s-2.36 1.059-2.36 2.36 1.059 2.36 2.36 2.36S22.36 25.302 22.36 24zM18.36 24c0-.904.735-1.64 1.64-1.64s1.64.735 1.64 1.64-.735 1.64-1.64 1.64S18.36 24.904 18.36 24zM30.36 24c0-1.302-1.059-2.36-2.36-2.36s-2.36 1.059-2.36 2.36 1.059 2.36 2.36 2.36S30.36 25.302 30.36 24zM26.36 24c0-.904.735-1.64 1.64-1.64s1.64.735 1.64 1.64-.735 1.64-1.64 1.64S26.36 24.904 26.36 24zM31 19.64v.721H1V19.64H31zM1 27.64h30v.721H1V27.64z',
    fill: '#d5d8dc',
    stroke: '#808b96',
    strokeWidth: strokeWidthStroke,
    label: 'Proof',
    labelFontSize: 14,
    labelPosition: { x: 70, y: 90 },
    AssetTrackingID: 'Bedroom Light',
    SN: 'Philips-01'
  })
  // Creating custom shape Generator
  shapes.Jar = new ShapeFactory({
    position: { x: 700, y: 70 },
    size: { width: ContainerSize.width + 20, height: ContainerSize.height + 10 }, //custom size of shape, but this changes the position of label
    svgPath:
      'M1 15.47C1 12.28 9.51 9.68 20 9.68C30.49 9.68 39 12.28 39 15.47L39 56L1 56ZM20 9.11L12.4 1L27.6 1ZM20 1L20 9.68', // Example path
    fill: '#fcf3cf',
    stroke: strokeColor,
    strokeWidth: strokeWidthStroke - 0.5,
    label: 'Starter',
    labelFontSize: 14,
    labelPosition: { x: 45, y: 40 },
    AssetTrackingID: 'Society Generator',
    SN: 'Jar'
  })

  const clockSize = { width: 20, height: 60 }
  const clockLabelPosition = { x: 13, y: 40 }
  shapes.clock1 = new ShapeFactory({
    position: { x: 210, y: 260 },
    size: { width: clockSize.width, height: clockSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M32.67 30.32C33.1 30.69 33.17 31.37 32.73 31.88C32.38 32.24 31.78 32.42 31.26 32.07L21.44 24.51C21.22 24.29 21.02 24.06 21.03 23.59L21.03 7.11C21.03 6.44 21.63 6 22.16 6C22.85 6 23.27 6.65 23.27 7.11L23.27 23.11ZM22.61 41.28C33.7 41.28 41.25 31.94 41.25 22.53C41.25 11.08 31.84 3.75 22.55 3.75C10.23 3.75 3.77 14.41 3.77 22C3.77 34.79 13.93 41.28 22.61 41.28ZM22.39 45C11.29 45 0.27 36.52 0 22.23C0 11.3 9.2 0 22.42 0C34.03 0 45 8.99 45 22.63C45 34.71 35.24 45 22.39 45Z', // Example path
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 1,
    label: '24 hours',
    labelFontSize: 14,
    labelPosition: { x: clockLabelPosition.x, y: clockLabelPosition.y },
    AssetTrackingID: 'Society Generator',
    SN: 'clock1'
  })
  shapes.clock2 = new ShapeFactory({
    position: { x: 950, y: 240 },
    size: { width: clockSize.width, height: clockSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M32.67 30.32C33.1 30.69 33.17 31.37 32.73 31.88C32.38 32.24 31.78 32.42 31.26 32.07L21.44 24.51C21.22 24.29 21.02 24.06 21.03 23.59L21.03 7.11C21.03 6.44 21.63 6 22.16 6C22.85 6 23.27 6.65 23.27 7.11L23.27 23.11ZM22.61 41.28C33.7 41.28 41.25 31.94 41.25 22.53C41.25 11.08 31.84 3.75 22.55 3.75C10.23 3.75 3.77 14.41 3.77 22C3.77 34.79 13.93 41.28 22.61 41.28ZM22.39 45C11.29 45 0.27 36.52 0 22.23C0 11.3 9.2 0 22.42 0C34.03 0 45 8.99 45 22.63C45 34.71 35.24 45 22.39 45Z', // Example path
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 1,
    label: 'Rest \n4-6 hours',
    labelFontSize: 14,
    labelPosition: { x: clockLabelPosition.x, y: clockLabelPosition.y },
    AssetTrackingID: 'Society Generator',
    SN: 'clock2'
  })
  shapes.clock3 = new ShapeFactory({
    position: { x: 290, y: 435 },
    size: { width: clockSize.width, height: clockSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M32.67 30.32C33.1 30.69 33.17 31.37 32.73 31.88C32.38 32.24 31.78 32.42 31.26 32.07L21.44 24.51C21.22 24.29 21.02 24.06 21.03 23.59L21.03 7.11C21.03 6.44 21.63 6 22.16 6C22.85 6 23.27 6.65 23.27 7.11L23.27 23.11ZM22.61 41.28C33.7 41.28 41.25 31.94 41.25 22.53C41.25 11.08 31.84 3.75 22.55 3.75C10.23 3.75 3.77 14.41 3.77 22C3.77 34.79 13.93 41.28 22.61 41.28ZM22.39 45C11.29 45 0.27 36.52 0 22.23C0 11.3 9.2 0 22.42 0C34.03 0 45 8.99 45 22.63C45 34.71 35.24 45 22.39 45Z', // Example path
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 1,
    label: 'Rest \n1 hours',
    labelFontSize: 14,
    labelPosition: { x: clockLabelPosition.x, y: clockLabelPosition.y },
    AssetTrackingID: 'Society Generator',
    SN: 'clock3'
  })
  shapes.clock4 = new ShapeFactory({
    position: { x: 880, y: 610 },
    size: { width: clockSize.width, height: clockSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M32.67 30.32C33.1 30.69 33.17 31.37 32.73 31.88C32.38 32.24 31.78 32.42 31.26 32.07L21.44 24.51C21.22 24.29 21.02 24.06 21.03 23.59L21.03 7.11C21.03 6.44 21.63 6 22.16 6C22.85 6 23.27 6.65 23.27 7.11L23.27 23.11ZM22.61 41.28C33.7 41.28 41.25 31.94 41.25 22.53C41.25 11.08 31.84 3.75 22.55 3.75C10.23 3.75 3.77 14.41 3.77 22C3.77 34.79 13.93 41.28 22.61 41.28ZM22.39 45C11.29 45 0.27 36.52 0 22.23C0 11.3 9.2 0 22.42 0C34.03 0 45 8.99 45 22.63C45 34.71 35.24 45 22.39 45Z', // Example path
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 1,
    label: 'Rest \n4 hours',
    labelFontSize: 14,
    labelPosition: { x: clockLabelPosition.x, y: clockLabelPosition.y },
    AssetTrackingID: 'Society Generator',
    SN: 'clock4'
  })
  shapes.clock5 = new ShapeFactory({
    position: { x: 540, y: 720 },
    size: { width: clockSize.width, height: clockSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M32.67 30.32C33.1 30.69 33.17 31.37 32.73 31.88C32.38 32.24 31.78 32.42 31.26 32.07L21.44 24.51C21.22 24.29 21.02 24.06 21.03 23.59L21.03 7.11C21.03 6.44 21.63 6 22.16 6C22.85 6 23.27 6.65 23.27 7.11L23.27 23.11ZM22.61 41.28C33.7 41.28 41.25 31.94 41.25 22.53C41.25 11.08 31.84 3.75 22.55 3.75C10.23 3.75 3.77 14.41 3.77 22C3.77 34.79 13.93 41.28 22.61 41.28ZM22.39 45C11.29 45 0.27 36.52 0 22.23C0 11.3 9.2 0 22.42 0C34.03 0 45 8.99 45 22.63C45 34.71 35.24 45 22.39 45Z', // Example path
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 1,
    label: 'Rest \nOvernight',
    labelFontSize: 14,
    labelPosition: { x: clockLabelPosition.x, y: clockLabelPosition.y },
    AssetTrackingID: 'Society Generator',
    SN: 'clock5'
  })

  shapes.clock6 = new ShapeFactory({
    position: { x: 300, y: 610 },
    size: { width: clockSize.width, height: clockSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M32.67 30.32C33.1 30.69 33.17 31.37 32.73 31.88C32.38 32.24 31.78 32.42 31.26 32.07L21.44 24.51C21.22 24.29 21.02 24.06 21.03 23.59L21.03 7.11C21.03 6.44 21.63 6 22.16 6C22.85 6 23.27 6.65 23.27 7.11L23.27 23.11ZM22.61 41.28C33.7 41.28 41.25 31.94 41.25 22.53C41.25 11.08 31.84 3.75 22.55 3.75C10.23 3.75 3.77 14.41 3.77 22C3.77 34.79 13.93 41.28 22.61 41.28ZM22.39 45C11.29 45 0.27 36.52 0 22.23C0 11.3 9.2 0 22.42 0C34.03 0 45 8.99 45 22.63C45 34.71 35.24 45 22.39 45Z', // Example path
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 1,
    label: '50 min',
    labelFontSize: 14,
    labelPosition: { x: clockLabelPosition.x, y: clockLabelPosition.y },
    AssetTrackingID: 'Society Generator',
    SN: 'clock6'
  })

  const temperatureSize = { width: 60, height: 150 }
  const temperatureLabelPosition = { x: 23, y: 50 }
  shapes.temperature1 = new ShapeFactory({
    position: { x: 170, y: 55 },
    size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
    fill: '#85c1e9',
    stroke: '#333333',
    strokeWidth: 1,
    label: 'Room\ntemperature',
    labelFontSize: 14,
    labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
    AssetTrackingID: 'Society Generator',
    SN: 'Cummins-100KVA'
  })

  shapes.temperature2 = new ShapeFactory({
    position: { x: 870, y: 670 },
    size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
    fill: '#85c1e9',
    stroke: '#333333',
    strokeWidth: 1,
    label: '24 C',
    labelFontSize: 14,
    labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
    AssetTrackingID: 'temperature2',
    SN: 'temperature2'
  })

  shapes.temperature3 = new ShapeFactory({
    position: { x: 500, y: 440 },
    size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
    fill: '#85c1e9',
    stroke: '#333333',
    strokeWidth: 1,
    label: '24 C',
    labelFontSize: 14,
    labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
    AssetTrackingID: 'temperature3',
    SN: 'temperature3'
  })

  shapes.temperature4 = new ShapeFactory({
    position: { x: 940, y: 310 },
    size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
    fill: '#85c1e9',
    stroke: '#333333',
    strokeWidth: 1,
    label: '24 C',
    labelFontSize: 14,
    labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
    AssetTrackingID: 'temperature4',
    SN: 'temperature4'
  })

  shapes.temperature5 = new ShapeFactory({
    position: { x: 580, y: 720 },
    size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
    fill: '#2874a6',
    stroke: '#333333',
    strokeWidth: 1,
    label: '3 C',
    labelFontSize: 14,
    labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
    AssetTrackingID: 'Society Generator',
    SN: 'temperature5'
  })

  shapes.temperature6 = new ShapeFactory({
    position: { x: 130, y: 610 },
    size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
    fill: '#cd6155',
    stroke: '#333333',
    strokeWidth: 1,
    label: '230 C',
    labelFontSize: 14,
    labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
    AssetTrackingID: 'Society Generator',
    SN: 'Cummins-100KVA'
  })

  shapes.temperature7 = new ShapeFactory({
    position: { x: 130, y: 700 },
    size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
    svgPath:
      'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
    fill: '#f5b7b1',
    stroke: '#333333',
    strokeWidth: 1,
    label: '92 C\n Internal Temp',
    labelFontSize: 14,
    labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
    AssetTrackingID: 'Society Generator',
    SN: 'Cummins-100KVA'
  })

  return shapes
}
