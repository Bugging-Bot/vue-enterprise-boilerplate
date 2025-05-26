/**
 * Configuration for the message view, defining default options and actions related to messaging.
 *
 * @remarks
 * Provides a set of predefined menu items for message-related interactions,
 * including creating new messages, archiving, filtering, and managing settings and templates.
 */
import type { ViewConfigType } from './types'

export const MessageViewConfig: ViewConfigType = {
  default: {
    title: 'Message Options',
    description: 'Communication and messaging tools',
    items: [
      { title: 'New Message', icon: 'mdi-email-plus', action: 'new-message' },
      { title: 'Archive', icon: 'mdi-archive', action: 'archive-messages' },
      { title: 'Filter Messages', icon: 'mdi-filter', action: 'filter-messages' },
      { title: 'Settings', icon: 'mdi-cog', action: 'message-settings' },
      { title: 'Templates', icon: 'mdi-file-document-multiple', action: 'message-templates' },
      { title: 'Scheduled Messages', icon: 'mdi-clock-outline', action: 'scheduled-messages' }
    ]
  }
}
