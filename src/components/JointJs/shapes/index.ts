/**
 * This file serves as the central export point for all SCADA diagram shapes.
 * It consolidates custom JointJS shapes that represent industrial equipment
 * like tanks, pumps, and valves used in process control visualization.
 *
 * SVG Assets Location: /public/assets/
 * Required files: Tank.svg, Pump.svg, Valve.svg
 */

// Export Tank shape definition for liquid storage visualization
export * from './Tank'

// Export Pump shape definition for fluid transfer equipment
export * from './Pump'
// Export Valve shape definition for flow control components
export * from './Valve'
