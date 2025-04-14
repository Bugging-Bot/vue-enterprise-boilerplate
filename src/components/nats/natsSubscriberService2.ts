import { connect } from 'nats.ws'
import type { NatsConnection, Subscription } from 'nats.ws'

let nc: NatsConnection | null = null

export async function initNatsClient(): Promise<NatsConnection> {
  if (nc) return nc

  nc = await connect({
    servers: 'wss://localhost:8181',
    user: 'sys_user',
    pass: 'Sys_P@ss'
  })

  console.log('✅ Connected to NATS via WebSocket')
  return nc
}

export async function subscribeToTopic(subject: string, callback: (msg: string) => void) {
  const client = await initNatsClient()
  const sub: Subscription = client.subscribe(subject)
  ;(async () => {
    for await (const msg of sub) {
      callback(msg.string())
    }
  })()
}
