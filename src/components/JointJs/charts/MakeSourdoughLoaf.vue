<!-- This is charting for Make Sourdough Loaf -->

<template>
  <!-- <div ref="paperContainer" style="width: 100%; height: 100%; border: 2px solid red"></div> -->
  <div ref="paperContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { GenericShape } from '@/components/JointJs/shape/GenericShape'
import { GenericLink } from '@/components/JointJs/shape/GenericLink'
import { dia, shapes, routers } from 'jointjs'

/*
####################################################################################################
                        Initializing the paper and adding shapes to the paper
####################################################################################################
*/
// Declare the paper variable that will hold the Paper instance (but don't pass the `el` yet), as it can be use in OnMounted hook
let genericPaper: dia.Paper | null = null

// namespace contains all the objects that you will use to build your diagrams, // this contains list of out of box shapes and custome shapes like GenericShape
const genericNamespace = { ...shapes, GenericShape }

// dia.Graph is the model holding all cells (elements and links) of the diagram. (ref: https://docs.jointjs.com/api/dia/Graph/)
// In this we are using namespace created above
const genericGraph = new dia.Graph({}, { cellNamespace: genericNamespace })

//[Dev Mode]: Declare a ref for the paper container
const paperContainer = ref<HTMLElement | null>(null)

// [Dev Mode]: A ref to hold the current position of the selected shape
const currentShapePosition = ref<{ x: number; y: number }>({ x: 0, y: 0 })
// [Dev Mode]: A ref to hold the selected shape
const selectedShape = ref<dia.Element | null>(null)

// Paper transforms an ordinary <div> HTML element into an interactive diagram area.
// joint.dia.Paper is the view for the joint.dia.Graph model. (ref: https://docs.jointjs.com/api/dia/Paper/)

/*
####################################################################################################
                        Create Shapes
####################################################################################################
*/
// Creating custom shape Balance1
const BalanceSize = { width: 15, height: 60 }
const BalanceLabelPosition = { x: 32, y: 30 }

const Balance1 = new GenericShape({
  position: { x: 685, y: 144 },
  size: { width: BalanceSize.width, height: BalanceSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M34.33 1C34.33 10.28 26.87 17.8 17.67 17.8C8.46 17.8 1 10.28 1 1L126 1C126 10.28 118.54 17.8 109.33 17.8C100.13 17.8 92.67 10.28 92.67 1ZM63.5 1.42L76 22L51 22Z', // Example path
  fill: '#ffcc00',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: '40g : 80g : 80g',
  labelFontSize: 14,
  labelPosition: { x: BalanceLabelPosition.x, y: BalanceLabelPosition.y },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const Balance2 = new GenericShape({
  position: { x: 685, y: 244 },
  size: { width: BalanceSize.width, height: BalanceSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M34.33 1C34.33 10.28 26.87 17.8 17.67 17.8C8.46 17.8 1 10.28 1 1L126 1C126 10.28 118.54 17.8 109.33 17.8C100.13 17.8 92.67 10.28 92.67 1ZM63.5 1.42L76 22L51 22Z', // Example path
  fill: '#ffcc00',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: '940g : 600g',
  labelFontSize: 14,
  labelPosition: { x: BalanceLabelPosition.x, y: BalanceLabelPosition.y },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const Balance3 = new GenericShape({
  position: { x: 685, y: 344 },
  size: { width: BalanceSize.width, height: BalanceSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M34.33 1C34.33 10.28 26.87 17.8 17.67 17.8C8.46 17.8 1 10.28 1 1L126 1C126 10.28 118.54 17.8 109.33 17.8C100.13 17.8 92.67 10.28 92.67 1ZM63.5 1.42L76 22L51 22Z', // Example path
  fill: '#ffcc00',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: '50g : 20g',
  labelFontSize: 14,
  labelPosition: { x: BalanceLabelPosition.x, y: BalanceLabelPosition.y },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const Bread = new GenericShape({
  position: { x: 685, y: 430 },
  size: { width: 3, height: 11 }, //custom size of shape, but this changes the position of label
  svgPath:
    'M489.954 60.56l-16.64-16.644C414.793-14.606 319.59-14.638 261.026 43.82l-0.002-0.002l-56.315 56.315l0.001 0.001l-51.797 51.796l-28.223 28.222l0.001 0.001l-80.775 80.775c-58.554 58.555-58.554 153.83 0 212.384l16.643 16.642c14.215 14.216 33.115 22.044 53.22 22.044s39.005-7.83 53.221-22.044l40.183-40.184l-10.75-10.75l-40.183 40.183c-11.345 11.345-26.427 17.592-42.471 17.592c-16.043 0-31.126-6.247-42.47-17.592l-16.643-16.642c-52.627-52.627-52.627-138.257 0-190.884l0.757-0.757l60.413 60.412c7.521 7.521 17.521 11.664 28.158 11.664c10.636 0 20.637-4.142 28.158-11.664c15.526-15.526 15.526-40.79 0-56.317l-60.411-60.412l23.701-23.701l60.412 60.411c7.52 7.52 17.52 11.663 28.157 11.664c0.001 0 0.002 0 0.004 0c10.635 0 20.635-4.142 28.157-11.664c15.525-15.527 15.525-40.791-0.001-56.316l-60.411-60.411l23.702-23.702l60.41 60.412c7.521 7.521 17.521 11.664 28.158 11.664c0.001 0 0 0 0.001 0c10.636 0 20.637-4.142 28.159-11.665c15.523-15.527 15.523-40.791-0.001-56.316l-60.411-60.409c52.635-52.53 138.191-52.499 190.785 0.094l16.641 16.644c11.345 11.344 17.592 26.426 17.592 42.469c0 16.043-6.247 31.126-17.593 42.471L210.767 424.685l10.751 10.75l268.435-268.436c14.217-14.216 22.047-33.117 22.047-53.221C511.999 93.675 504.169 74.774 489.954 60.56z M161.4 285.765c9.599 9.6 9.599 25.219 0 34.817c-4.65 4.65-10.833 7.211-17.409 7.211c-6.576 0-12.758-2.561-17.409-7.211l-60.412-60.411l34.818-34.817L161.4 285.765z M241.419 205.747c9.598 9.598 9.598 25.217 0 34.817c-4.65 4.65-10.832 7.211-17.406 7.211c-0.001 0-0.002 0-0.003 0c-6.577-0.001-12.759-2.561-17.409-7.21l-60.412-60.411l24.907-24.907l9.912-9.911L241.419 205.747z M321.436 125.729c9.599 9.598 9.599 25.217 0.002 34.817c-4.651 4.65-10.834 7.211-17.41 7.211c-6.577 0-12.759-2.561-17.409-7.211l-60.411-60.411l34.815-34.815L321.436 125.729z', // Example path
  fill: '#ffcc00',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Bread',
  labelFontSize: 14,
  labelPosition: { x: 22, y: 75 },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const MixerSize = { width: 30, height: 90 }
const Mixer1 = new GenericShape({
  position: { x: 285, y: 130 },
  size: { width: MixerSize.width, height: MixerSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M6.53 52L1.04 57.1L1.04 74.95C1 82.25 10.19 88.54 23.01 90L26.3 85.15ZM50.46 52L55.95 57.1L55.95 74.95C56 82.25 46.81 88.54 33.99 90L30.69 85.15ZM6.53 26.5C6.53 22.28 16.37 18.85 28.5 18.85C40.63 18.85 50.46 22.28 50.46 26.5L50.46 72.4C50.46 79.45 40.63 85.15 28.5 85.15C16.37 85.15 6.53 79.45 6.53 72.4ZM24.65 2.53L32.34 2.53M24.65 9.67L32.34 9.67M28.5 11.2L28.5 77.76ZM23.01 77.5C23.01 77.5 23.01 77.5 23.01 77.5ZM33.99 77.5C33.99 77.5 33.99 77.5 33.99 77.5Z',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Mix',
  labelFontSize: 14,
  labelPosition: { x: 30, y: 100 },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const Mixer2 = new GenericShape({
  position: { x: 285, y: 250 },
  size: { width: MixerSize.width, height: MixerSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M6.53 52L1.04 57.1L1.04 74.95C1 82.25 10.19 88.54 23.01 90L26.3 85.15ZM50.46 52L55.95 57.1L55.95 74.95C56 82.25 46.81 88.54 33.99 90L30.69 85.15ZM6.53 26.5C6.53 22.28 16.37 18.85 28.5 18.85C40.63 18.85 50.46 22.28 50.46 26.5L50.46 72.4C50.46 79.45 40.63 85.15 28.5 85.15C16.37 85.15 6.53 79.45 6.53 72.4ZM24.65 2.53L32.34 2.53M24.65 9.67L32.34 9.67M28.5 11.2L28.5 77.76ZM23.01 77.5C23.01 77.5 23.01 77.5 23.01 77.5ZM33.99 77.5C33.99 77.5 33.99 77.5 33.99 77.5Z',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Mix',
  labelFontSize: 14,
  labelPosition: { x: 30, y: 100 },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const OvenSize = { width: 30, height: 100 }
const Oven1 = new GenericShape({
  position: { x: 785, y: 330 },
  size: { width: OvenSize.width, height: OvenSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M26 1L56 1L56 35.5L71 45.5L71 100L61 100L61 90.5L21 90.5L21 100L11 100L11 45.5L26 35.5ZM26 35.5L56 35.5M11 45.5L71 45.5M11 90.5L71 90.5M1 55.5L56 55.5L26 80.5L81 80.5',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Preheat',
  labelFontSize: 14,
  labelPosition: { x: 42, y: 118 },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const Oven2 = new GenericShape({
  position: { x: 785, y: 530 },
  size: { width: OvenSize.width, height: OvenSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M26 1L56 1L56 35.5L71 45.5L71 100L61 100L61 90.5L21 90.5L21 100L11 100L11 45.5L26 35.5ZM26 35.5L56 35.5M11 45.5L71 45.5M11 90.5L71 90.5M1 55.5L56 55.5L26 80.5L81 80.5',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Bake',
  labelFontSize: 14,
  labelPosition: { x: 42, y: 118 },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const ContainerSize = { width: 30, height: 100 }
const ContainerLabelPosition = { x: 40, y: 80 }
const Container1 = new GenericShape({
  position: { x: 885, y: 130 },
  size: { width: ContainerSize.width, height: ContainerSize.height }, //custom size of shape, but this changes the position of label
  svgPath: 'M4.6 5.07L4.6 62L69.4 62L69.4 5.07M1 9.13L1 1L73 1L73 9.13',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Starter',
  labelFontSize: 14,
  labelPosition: { x: ContainerLabelPosition.x, y: ContainerLabelPosition.y },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const Container2 = new GenericShape({
  position: { x: 885, y: 230 },
  size: { width: ContainerSize.width, height: ContainerSize.height }, //custom size of shape, but this changes the position of label
  svgPath: 'M4.6 5.07L4.6 62L69.4 62L69.4 5.07M1 9.13L1 1L73 1L73 9.13',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Levain',
  labelFontSize: 14,
  labelPosition: { x: ContainerLabelPosition.x, y: ContainerLabelPosition.y },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const Container3 = new GenericShape({
  position: { x: 885, y: 330 },
  size: { width: ContainerSize.width, height: ContainerSize.height }, //custom size of shape, but this changes the position of label
  svgPath: 'M4.6 5.07L4.6 62L69.4 62L69.4 5.07M1 9.13L1 1L73 1L73 9.13',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Autolyse',
  labelFontSize: 14,
  labelPosition: { x: ContainerLabelPosition.x, y: ContainerLabelPosition.y },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const Container4 = new GenericShape({
  position: { x: 885, y: 430 },
  size: { width: ContainerSize.width, height: ContainerSize.height }, //custom size of shape, but this changes the position of label
  svgPath: 'M4.6 5.07L4.6 62L69.4 62L69.4 5.07M1 9.13L1 1L73 1L73 9.13',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Bulk Fermentation',
  labelFontSize: 14,
  labelPosition: { x: ContainerLabelPosition.x, y: ContainerLabelPosition.y },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const FContainerSize = { width: 30, height: 100 }
const FContainerLabelPosition = { x: 25, y: 65 }
const FContainer1 = new GenericShape({
  position: { x: 985, y: 130 },
  size: { width: FContainerSize.width, height: FContainerSize.height }, //custom size of shape, but this changes the position of label
  svgPath: 'M1 1L45 1L45 32.67L23 48.5L1 32.67ZM16.4 13.47C20.41 11.59 25.59 11.59 29.6 13.47',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Flour',
  labelFontSize: 14,
  labelPosition: { x: FContainerLabelPosition.x, y: FContainerLabelPosition.y },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const FContainer2 = new GenericShape({
  position: { x: 985, y: 230 },
  size: { width: FContainerSize.width, height: FContainerSize.height }, //custom size of shape, but this changes the position of label
  svgPath: 'M1 1L45 1L45 32.67L23 48.5L1 32.67ZM16.4 13.47C20.41 11.59 25.59 11.59 29.6 13.47',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Flour',
  labelFontSize: 14,
  labelPosition: { x: FContainerLabelPosition.x, y: FContainerLabelPosition.y },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const funnelSize = { width: 30, height: 100 }
const funnelLabelPositioion = { x: -18, y: 53 }
const funnel1 = new GenericShape({
  position: { x: 1085, y: 130 },
  size: { width: funnelSize.width, height: funnelSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M-5.5-3.75C-10.7 1.54-14.15 17.56-13.9 35.25L-27.1 35.25C-26.85 17.56-30.3 1.54-35.5-3.75Z',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Water',
  labelFontSize: 14,
  labelPosition: { x: funnelLabelPositioion.x, y: funnelLabelPositioion.y },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const funnel2 = new GenericShape({
  position: { x: 1085, y: 230 },
  size: { width: funnelSize.width, height: funnelSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M-5.5-3.75C-10.7 1.54-14.15 17.56-13.9 35.25L-27.1 35.25C-26.85 17.56-30.3 1.54-35.5-3.75Z',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Water',
  labelFontSize: 14,
  labelPosition: { x: funnelLabelPositioion.x, y: funnelLabelPositioion.y },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const funnel3 = new GenericShape({
  position: { x: 1085, y: 330 },
  size: { width: funnelSize.width, height: funnelSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M-5.5-3.75C-10.7 1.54-14.15 17.56-13.9 35.25L-27.1 35.25C-26.85 17.56-30.3 1.54-35.5-3.75Z',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Water',
  labelFontSize: 14,
  labelPosition: { x: funnelLabelPositioion.x, y: funnelLabelPositioion.y },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const funnel4 = new GenericShape({
  position: { x: 1085, y: 430 },
  size: { width: funnelSize.width, height: funnelSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M-5.5-3.75C-10.7 1.54-14.15 17.56-13.9 35.25L-27.1 35.25C-26.85 17.56-30.3 1.54-35.5-3.75Z',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Salt',
  labelFontSize: 14,
  labelPosition: { x: funnelLabelPositioion.x, y: funnelLabelPositioion.y },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const ShapeLoof = new GenericShape({
  position: { x: 1185, y: 130 },
  size: { width: 30, height: 70 }, //custom size of shape, but this changes the position of label
  svgPath: 'M1 60.5L101 60.5L81 0.5L21 0.5ZM6 45.5L96 45.5M16 45.5L16 60.5M86 45.5L86 60.5',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Shape Loaf',
  labelFontSize: 14,
  labelPosition: { x: 50, y: 60 },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const Proof = new GenericShape({
  position: { x: 1185, y: 230 },
  size: { width: 130, height: 370 }, //custom size of shape, but this changes the position of label
  svgPath:
    'M0 18 0 31 32 31 32 18M-1 19-1 17 33 17 33 19M6.36 24c0-1.302-1.059-2.36-2.36-2.36S1.64 22.698 1.64 24 2.699 26.36 4 26.36 6.36 25.302 6.36 24zM2.36 24c0-.904.736-1.64 1.64-1.64S5.64 23.096 5.64 24 4.904 25.64 4 25.64 2.36 24.904 2.36 24zM14.36 24c0-1.302-1.059-2.36-2.36-2.36S9.64 22.698 9.64 24s1.059 2.36 2.36 2.36S14.36 25.302 14.36 24zM10.36 24c0-.904.736-1.64 1.64-1.64s1.64.735 1.64 1.64-.736 1.64-1.64 1.64S10.36 24.904 10.36 24zM22.36 24c0-1.302-1.059-2.36-2.36-2.36s-2.36 1.059-2.36 2.36 1.059 2.36 2.36 2.36S22.36 25.302 22.36 24zM18.36 24c0-.904.735-1.64 1.64-1.64s1.64.735 1.64 1.64-.735 1.64-1.64 1.64S18.36 24.904 18.36 24zM30.36 24c0-1.302-1.059-2.36-2.36-2.36s-2.36 1.059-2.36 2.36 1.059 2.36 2.36 2.36S30.36 25.302 30.36 24zM26.36 24c0-.904.735-1.64 1.64-1.64s1.64.735 1.64 1.64-.735 1.64-1.64 1.64S26.36 24.904 26.36 24zM31 19.64v.721H1V19.64H31zM1 27.64h30v.721H1V27.64z',
  stroke: '#333333',
  strokeWidth: 0.1,
  label: 'Proof',
  labelFontSize: 14,
  labelPosition: { x: 70, y: 135 },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})
// Creating custom shape Generator
const Jar = new GenericShape({
  position: { x: 150, y: 302 },
  size: { width: ContainerSize.width + 20, height: ContainerSize.height + 10 }, //custom size of shape, but this changes the position of label
  svgPath:
    'M1 15.47C1 12.28 9.51 9.68 20 9.68C30.49 9.68 39 12.28 39 15.47L39 56L1 56ZM20 9.11L12.4 1L27.6 1ZM20 1L20 9.68', // Example path
  fill: '#ffffff',
  stroke: '#333333',
  strokeWidth: 1,
  label: 'Starter',
  labelFontSize: 14,
  labelPosition: { x: 31, y: 80 },
  AssetTrackingID: 'Society Generator',
  SN: 'Cummins-100KVA'
})

const clockSize = { width: 20, height: 60 }
const clockLabelPosition = { x: 13, y: 40 }
const clock1 = new GenericShape({
  position: { x: 550, y: 100 },
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
  SN: 'Cummins-100KVA'
})
const clock2 = new GenericShape({
  position: { x: 550, y: 200 },
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
  SN: 'Cummins-100KVA'
})
const clock3 = new GenericShape({
  position: { x: 550, y: 300 },
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
  SN: 'Cummins-100KVA'
})
const clock4 = new GenericShape({
  position: { x: 550, y: 400 },
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
  SN: 'Cummins-100KVA'
})
const clock5 = new GenericShape({
  position: { x: 550, y: 500 },
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
  SN: 'Cummins-100KVA'
})

const clock6 = new GenericShape({
  position: { x: 550, y: 600 },
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
  SN: 'Cummins-100KVA'
})

const temperatureSize = { width: 60, height: 150 }
const temperatureLabelPosition = { x: 23, y: 50 }
const temperature1 = new GenericShape({
  position: { x: 450, y: 100 },
  size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
  fill: '#ffffff',
  stroke: '#333333',
  strokeWidth: 1,
  label: 'Room \ntemperature',
  labelFontSize: 14,
  labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
  AssetTrackingID: 'Society Generator',
  SN: 'Cummins-100KVA'
})

const temperature2 = new GenericShape({
  position: { x: 450, y: 200 },
  size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
  fill: '#ffffff',
  stroke: '#333333',
  strokeWidth: 1,
  label: '24 C',
  labelFontSize: 14,
  labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
  AssetTrackingID: 'Society Generator',
  SN: 'Cummins-100KVA'
})

const temperature3 = new GenericShape({
  position: { x: 450, y: 300 },
  size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
  fill: '#ffffff',
  stroke: '#333333',
  strokeWidth: 1,
  label: '24 C',
  labelFontSize: 14,
  labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
  AssetTrackingID: 'Society Generator',
  SN: 'Cummins-100KVA'
})

const temperature4 = new GenericShape({
  position: { x: 450, y: 400 },
  size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
  fill: '#ffffff',
  stroke: '#333333',
  strokeWidth: 1,
  label: '24 C',
  labelFontSize: 14,
  labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
  AssetTrackingID: 'Society Generator',
  SN: 'Cummins-100KVA'
})

const temperature5 = new GenericShape({
  position: { x: 450, y: 500 },
  size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
  fill: '#ffffff',
  stroke: '#333333',
  strokeWidth: 1,
  label: '3 C',
  labelFontSize: 14,
  labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
  AssetTrackingID: 'Society Generator',
  SN: 'Cummins-100KVA'
})

const temperature6 = new GenericShape({
  position: { x: 450, y: 600 },
  size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
  fill: '#ffffff',
  stroke: '#333333',
  strokeWidth: 1,
  label: '230 C',
  labelFontSize: 14,
  labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
  AssetTrackingID: 'Society Generator',
  SN: 'Cummins-100KVA'
})

const temperature7 = new GenericShape({
  position: { x: 450, y: 700 },
  size: { width: temperatureSize.width, height: temperatureSize.height }, //custom size of shape, but this changes the position of label
  svgPath:
    'M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5ZM12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5Z', // Example path
  fill: '#ffffff',
  stroke: '#333333',
  strokeWidth: 1,
  label: '92 C\n Internal Temp',
  labelFontSize: 14,
  labelPosition: { x: temperatureLabelPosition.x, y: temperatureLabelPosition.y },
  AssetTrackingID: 'Society Generator',
  SN: 'Cummins-100KVA'
})
// creating wire for connecting generator and bulb 60 watt
// const wire1 = new GenericLink({
//   linkID: 'wire1',
//   source: { id: Generator.id as string },
//   target: { id: Bulb1.id as string },
//   customData: {
//     serialNumber: 'SN-001',
//     description: 'Power link',
//     Load: '10 amps',
//     Wirelabel: '10 amps Power Link'
//   },
//   attrs: {
//     line: {
//       stroke: '#ab5b68',
//       strokeWidth: 1
//     }
//   },
//   router: {
//     name: 'rightAngle',
//     options: {
//       margin: 0,
//       sourceDirection: routers.rightAngle.Directions.RIGHT,
//       targetDirection: routers.rightAngle.Directions.LEFT
//     }
//   }
// })
// creating wire for connecting generator and bulb 100 watt
// Create a simple dia.Link (wire2) between Generator and Bulb2
// const wire2 = new GenericLink({
//   linkID: 'wire2',
//   source: { id: Generator.id as string },
//   target: { id: Bulb2.id as string },
//   customData: {
//     serialNumber: 'SN-002',
//     description: 'Power link',
//     Load: '20 amps',
//     Wirelabel: '20 amps Power Link'
//   },
//   attrs: {
//     line: {
//       stroke: '#cb4335',
//       strokeWidth: 1,
//       fill: 'transparent'
//     }
//   },
//   router: {
//     name: 'rightAngle',
//     options: {
//       margin: 1,
//       sourceDirection: routers.rightAngle.Directions.RIGHT,
//       targetDirection: routers.rightAngle.Directions.LEFT
//     }
//   }
// })
// Appending labels to the links
// wire2.appendLabel({ attrs: { text: { text: wire2.getCustomData().Wirelabel } } })
// wire1.appendLabel({ attrs: { text: { text: wire1.getCustomData().Wirelabel } } })

/*
####################################################################################################
                        Link all Shapes in Graph
####################################################################################################
*/
// Function to create a shape and add it to the graph
const createShape = () => {
  genericGraph.addCell([
    Balance1,
    Balance2,
    Balance3,
    Bread,
    Mixer1,
    Mixer2,
    Oven1,
    Oven2,
    Container1,
    Container2,
    Container3,
    Container4,
    FContainer1,
    FContainer2,
    funnel1,
    funnel2,
    funnel3,
    funnel4,
    ShapeLoof,
    Proof,
    Jar,
    clock1,
    clock2,
    clock3,
    clock4,
    clock5,
    clock6,
    temperature1,
    temperature2,
    temperature3,
    temperature4,
    temperature5,
    temperature6,
    temperature7
  ]) // Add the shape to the graph
}

/*
####################################################################################################
                        For debugging graph - should be removed once graph is signed off
####################################################################################################
*/
// [Dev Mode]: Function to log shape details
const logShapeDetails = (shape: dia.Element) => {
  const position = shape.position()
  const label = shape.attr('label/text')
  const assetTrackingId = (shape as GenericShape).getAssetTrackingID() // Accessing custom property
  const sn = (shape as GenericShape).getSN() // Accessing custom property
  console.log(
    `Shape Info - Label: ${label}, AssetTrackingID: ${assetTrackingId}, SN: ${sn}, Position - X: ${position.x}, Y: ${position.y}`
  )
}

// [Dev Mode]: Function to update position and log details of the selected shape
const updateShapePosition = (shape: dia.Element) => {
  const position = shape.position()
  currentShapePosition.value = position
  logShapeDetails(shape) // Log the details when the shape is moved
}

// [Dev Mode]: Function to handle selection of a shape
const selectShape = (shape: dia.Element) => {
  selectedShape.value = shape
  updateShapePosition(shape) // Log details of the selected shape
}

/*
####################################################################################################
                       Initialize graph
####################################################################################################
*/

// Initialize the Paper and add shapes once the component is mounted
onMounted(() => {
  //  Ensure paperContainer.value is not null before initializing Paper
  if (paperContainer.value) {
    // get width of paprent container
    const containerWidth = paperContainer.value.offsetWidth // can try with paperContainer.value.clientWidth
    let containerHeight = paperContainer.value.offsetHeight
    if (containerHeight < 600) containerHeight = 1200 // set a minimum height of 500px

    console.log('containerWidth', containerWidth)
    console.log('containerHeight', containerHeight)
    // Initialize the JointJS paper after the component has been mounted
    const genericPaper = new dia.Paper({
      model: genericGraph,
      width: containerWidth,
      height: containerHeight,
      background: { color: '#ffffff' },
      cellViewNamespace: genericNamespace,
      el: paperContainer.value, // Pass the ref here, which is guaranteed to be non-null
      async: true
    })
    console.log('Paper Container initialize in Onmounted')

    createShape() // Create and add shape after paper is ready
    console.log('mounted custom chart')

    // [Dev Mode]: Listen for shape movements and log their details
    genericGraph.on('change:position', (cell: dia.Cell) => {
      if (cell instanceof dia.Element) {
        updateShapePosition(cell) // Update and log position when shape is moved
      }
    })

    // [Dev Mode]: Listen for shape selection and log their details
    genericPaper.on('cell:pointerclick', (view: dia.CellView) => {
      selectShape(view.model as dia.Element) // Set the clicked shape as the selected shape
    })
  }
})
/*
####################################################################################################
                       End of life of graph
####################################################################################################
*/
onUnmounted(() => {
  // Clean up the paper when the component is unmounted
  // Cleanup when the component is unmounted
  if (genericPaper) {
    genericPaper.remove() // Remove the paper instance
    genericPaper = null
  }
  if (genericGraph) {
    genericGraph.clear() // Clear the graph (removes all shapes)
    //genericGraph = null
  }
})
</script>

<style scoped>
/* Ensure paperContainer has a well-defined size */
#paperContainer {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  right: 5px;
  top: 5px;
  left: 5px;
  bottom: 5px;
  overflow: auto;
}
</style>
