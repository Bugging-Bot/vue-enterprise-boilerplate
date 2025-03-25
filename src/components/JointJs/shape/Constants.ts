/*
This file contain constants for the charts


| Type                         | Naming Convention   | Example                              |
|------------------------------|---------------------|--------------------------------------|
| Local Variables              | camelCase           | `let userName = "John";`             |
| Global Variables             | UPPER_SNAKE_CASE    | `let GLOBAL_USER_SESSION = null;`    |
| Local Constants              | UPPER_SNAKE_CASE    | `const MAX_AGE = 120;`               |
| Global Constants             | UPPER_SNAKE_CASE    | `const API_URL = "https://api.example.com";` |
| Private Class Variables     | _camelCase (underscore prefix) | `this._userId`                  |
| Public Class Variables      | camelCase           | `this.userName`                      |
| Static Class Variables      | UPPER_SNAKE_CASE    | `static MAX_RETRIES = 3;`            |

*/

export const COLORS = {
  BLUE: '#2874a6',
  RED: '#cd6155',
  LIGHT_RED: '#f5b7b1',
  STROKE: '#333333'
}
export const CUSTOM_LABLES = {
  LABEL: 14
}
export const CUSTOM_SHAPES = {
  FILL: 'transparent'
}
export const CUSTOM_LINKS = {
  STROKE: '#333333',
  FILL: 'transparent'
}
export const CONNECTORS_SHAPES = {
  Rtrinagle: 'M 0 0 L 10 5 L 0 10 Z' // Right triangle
}
