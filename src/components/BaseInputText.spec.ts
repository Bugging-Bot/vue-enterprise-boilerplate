/*
  File: BaseInputText.test.ts

  About:
  This file contains unit tests for the `BaseInputText` Vue component using the `vitest` testing framework
  and `@vue/test-utils`. The tests focus on verifying the behavior of the input component, specifically for:

  1. **Working with `v-model`**: Ensures that the input correctly binds its value with the parent component via `v-model`.
  2. **Handling different input types**: Ensures that the input component allows specific types like "password" but rejects invalid types like "checkbox".

  The tests use `mount` and `shallowMount` methods from `@vue/test-utils` to mount the component and simulate user interaction.

  The test suite contains the following tests:
    1. **Testing `v-model` binding**.
    2. **Testing the `password` input type**.
    3. **Testing an invalid `checkbox` input type**.
*/

import { describe, it, expect, vi } from 'vitest' // Import testing functions from vitest
import { shallowMount, mount } from '@vue/test-utils' // Import shallowMount and mount from vue-test-utils
import BaseInputText from '@/components/BaseInputText.vue' // Import the BaseInputText component

// Test suite for the BaseInputText component
describe('@components/BaseInputText', () => {
  /**
   * Test 1: Testing the v-model binding behavior
   * This test verifies that the input correctly binds its value with the `modelValue` prop
   * and that changes to the input field are reflected back to the parent component.
   */
  it('works with v-model', () => {
    const wrapper = mount(BaseInputText, {
      props: {
        modelValue: 'aaa', // Initial value passed via v-model
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }) // Handling the model update
      }
    })
    const inputWrapper = wrapper.find('input') // Find the input element in the component
    const inputEl = inputWrapper.element // Get the raw DOM element

    // Check if the input has the correct starting value
    expect(inputEl.value).toEqual('aaa')

    // Simulate user input and verify that the input's value is updated correctly
    inputWrapper.setValue('ccc') // Set the input value to 'ccc'
    expect(inputEl.value).toEqual('ccc') // Assert that the input value is now 'ccc'
  })

  /**
   * Test 2: Testing the "password" input type
   * This test checks that the component correctly handles the 'password' input type
   * and does not throw any errors or warnings when used.
   */
  it('allows a type of "password"', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {}) // Mock console.error to prevent unwanted logs
    shallowMount(BaseInputText, {
      propsData: { value: 'aaa', type: 'password' } // Mount the component with the type set to 'password'
    })
    // Ensure that no console errors are thrown for valid 'password' input type
    expect(consoleError).not.toBeCalled()
    consoleError.mockRestore() // Restore the original console.error method
  })

  /**
   * Test 3: Testing the invalid "checkbox" input type
   * This test ensures that the component correctly handles invalid input types such as 'checkbox'
   * by showing a warning and preventing invalid usage.
   */
  it('does NOT allow a type of "checkbox"', () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {}) // Mock console.warn to suppress warnings during tests
    shallowMount(BaseInputText, {
      propsData: { value: 'aaa', type: 'checkbox' } // Mount the component with the invalid 'checkbox' input type
    })

    // Ensure that a warning is logged when an invalid input type is provided
    expect(consoleWarn).toBeCalled()
    // Assert that the warning message contains the specific error for invalid 'type' prop
    expect(consoleWarn.mock.calls[0][0]).toContain('custom validator check failed for prop "type"')
    consoleWarn.mockRestore() // Restore the original console.warn method
  })
})
