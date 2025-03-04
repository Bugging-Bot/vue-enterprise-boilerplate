// stores/eventBus.js
import { defineStore } from 'pinia'
// Define the type for the callback function
type EventCallback = (data: any) => void

export const useEventBusStore = defineStore('eventBus', {
  state: () => ({
    // Store subscribers for each event by name
    subscribers: new Map<string, EventCallback[]>()
  }),
  actions: {
    // Register a subscriber for a specific event name
    on(eventName: string, callback: EventCallback) {
      if (!this.subscribers.has(eventName)) {
        this.subscribers.set(eventName, [])
      }
      this.subscribers.get(eventName)?.push(callback)
    },

    // Trigger an event by its name with the associated data
    emit(eventName: string, data: any) {
      if (this.subscribers.has(eventName)) {
        this.subscribers.get(eventName)?.forEach((callback: EventCallback) => callback(data))
      }
    },

    // Remove all subscribers for a specific event name
    off(eventName: string) {
      this.subscribers.delete(eventName)
    },

    // Optionally remove specific subscriber for an event name
    offSpecific(eventName: string, callback: EventCallback) {
      const eventSubscribers = this.subscribers.get(eventName)
      if (eventSubscribers) {
        const index = eventSubscribers.indexOf(callback)
        if (index !== -1) {
          eventSubscribers.splice(index, 1)
        }
      }
    }
  }
})
