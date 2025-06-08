/*
  File: BaseButton.test.ts

  About:
  This code defines unit tests for the `BaseButton` Vue component using `vitest` and `@vue/test-utils`.
  The tests ensure that the `BaseButton` component behaves as expected in terms of rendering content.
  The `BaseButton` component is expected to display content passed into it via slots and also provide default content if no content is provided.

  The test suite contains two tests:
    1. **Rendering custom content**: Ensures that custom slot content passed into the component is rendered correctly.
    2. **Rendering default content**: Ensures that the default content ('Submit') is displayed when no custom content is provided.

  The tests use `shallowMount` to mount the component and test its behavior in isolation.
*/

import { describe, it, expect } from 'vitest' // Importing testing functions from vitest
import { shallowMount } from '@vue/test-utils' // Importing shallowMount for mounting the component
import BaseButton from './BaseButton.vue' // Importing the BaseButton component

// Test suite for the BaseButton component
describe('BaseButton Component', () => {
  /**
   * Test 1: Rendering custom content passed into the default slot.
   * This test verifies that the content provided to the `default` slot is rendered inside the button.
   */
  it('renders its content', () => {
    const slotContent = '<strong>Click me!</strong>' // Define custom content for the default slot
    const { element } = shallowMount(BaseButton, {
      // Mount the component with custom slot content
      slots: {
        default: slotContent
      }
    })

    // Assert that the component's rendered HTML contains the custom slot content
    expect(element.innerHTML).toContain(slotContent)
  })

  /**
   * Test 2: Rendering default content when no slot content is provided.
   * This test verifies that if no custom content is provided, the component renders the default content ('Submit').
   */
  it('renders default content', () => {
    const slotContent = '' // Define an empty string to simulate no slot content
    const { element } = shallowMount(BaseButton, {
      // Mount the component with empty default slot
      slots: {
        default: slotContent
      }
    })

    // Assert that the component's rendered HTML contains the default content ('Submit')
    expect(element.innerHTML).toContain('Submit')
  })
})
