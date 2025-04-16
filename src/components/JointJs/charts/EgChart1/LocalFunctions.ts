// this contain local function for egchart1

import {
  getSensorValueColor,
  getSensorTopic
} from '@/components/JointJs/composables/chartConfiguration'

const factory_setup = {
  factory_id: 1,
  production_line_id: 1,
  machine_id: 1,
  sensor_id: 1
}

// Reactive data for UI display
// const temperature = ref<string>('--')
// const current = ref<string>('--')

export const localTopics = {
  temperature: getSensorTopic(
    factory_setup.factory_id,
    factory_setup.production_line_id,
    factory_setup.machine_id,
    factory_setup.sensor_id,
    'Temperature'
  ),
  current: getSensorTopic(
    factory_setup.factory_id,
    factory_setup.production_line_id,
    factory_setup.machine_id,
    factory_setup.sensor_id,
    'Current'
  ),
  gas: getSensorTopic(
    factory_setup.factory_id,
    factory_setup.production_line_id,
    factory_setup.machine_id,
    factory_setup.sensor_id,
    'Gas'
  ),
  flow: getSensorTopic(
    factory_setup.factory_id,
    factory_setup.production_line_id,
    factory_setup.machine_id,
    factory_setup.sensor_id,
    'Flow'
  )
}
// Function to get color based on temperature
// const getColorForTemperature = (temperature: number): string => {
//   const thermometerColors = colorConfig.Thermometer

//   // Default color if no match is found
//   let color = '#CCCCCC'

//   // Find the appropriate color based on temperature
//   for (let i = thermometerColors.length - 1; i >= 0; i--) {
//     if (temperature >= thermometerColors[i].temperature) {
//       color = thermometerColors[i].color
//       break
//     }
//   }

//   return color
// }

export function getColorForTemperature(): void {
  console.log('Temperature ->', localTopics.temperature)
  console.log('Current ->', localTopics.current)
}
