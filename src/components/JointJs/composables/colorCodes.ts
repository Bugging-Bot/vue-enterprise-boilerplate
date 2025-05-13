// Define color constants for the full Scada applications

export const OPERATIONAL_COLOR: string = '#00FF00' // Green
export const WARNING_COLOR: string = '#FFFF00' // Yellow
export const ERROR_COLOR: string = '#FFA500' // Orange
export const DANGER_COLOR: string = '#FF0000' // Red
export const DEFAULT_COLOR: string = '#CCCCCC' // Gray for unknown values
export const NO_DATA_COLOR: string = '#E0FFFF' // Light Cyan (soft and noticeable)

// Define color constants for the connection status indicator
export const CONNECTION_STATES0 = {
  CONNECTED: {
    state: 'connected',
    color: '#4CAF50', // Green
    title: 'Connected to NATS server'
  },
  DISCONNECTED: {
    state: 'disconnected',
    color: '#F44336', // Red
    title: 'Disconnected from NATS server'
  },
  CONNECTING: {
    state: 'connecting',
    color: '#FFC107', // Yellow
    title: 'Connecting to NATS server'
  },
  RETRYING: {
    state: 'retrying',
    color: '#FFC107', // Yellow
    title: 'Retrying connection to NATS server'
  }
}

export const CONNECTION_STATES = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  RETRYING: 'retrying'
}

export const CONNECTION_COLORS = {
  [CONNECTION_STATES.CONNECTED]: '#4CAF50', // Green
  [CONNECTION_STATES.DISCONNECTED]: '#F44336', // Red
  [CONNECTION_STATES.CONNECTING]: '#FFC107', // Yellow
  [CONNECTION_STATES.RETRYING]: '#FFC107' // Yellow
}

export const CONNECTION_TITLES = {
  [CONNECTION_STATES.CONNECTED]: 'Connected to NATS server',
  [CONNECTION_STATES.DISCONNECTED]: 'Disconnected from NATS server',
  [CONNECTION_STATES.CONNECTING]: 'Connecting to NATS server',
  [CONNECTION_STATES.RETRYING]: 'Retrying connection to NATS server'
}
