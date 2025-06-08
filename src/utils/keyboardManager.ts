// utils/keyboardManager.ts
/*
 Global keyboard registration system with scopes
*/
import hotkeys from 'hotkeys-js'
import type { HotkeysEvent } from 'hotkeys-js'

/**
 * Set the current keyboard shortcut scope
 */
export function setKeyboardScope(scope: string) {
  hotkeys.setScope(scope)
}

/**
 * Register a shortcut with scope
 */
export function registerShortcut(
  keys: string,
  callback: (keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => void,
  scope: string = 'global'
) {
  hotkeys(keys, { scope }, callback)
}

/**
 * Unregister a specific shortcut
 */
export function unregisterShortcut(keys: string, scope: string = 'global') {
  hotkeys.unbind(keys, scope)
}

/**
 * Clear all shortcuts
 */
export function clearAllShortcuts() {
  hotkeys.unbind()
}
