/**
 * Declares a Vue component that can be imported from a `.vue` file.
 * The component is defined using the `DefineComponent` type from the Vue library.
 * This allows TypeScript to provide type checking and autocompletion for the component's props, data, and methods.
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
