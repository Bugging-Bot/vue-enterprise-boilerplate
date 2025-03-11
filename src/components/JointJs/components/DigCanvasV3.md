Prompt:

Create a reusable and flexible Vue component that allows rendering a diagram using JointJS (Open Source). The component should accept a JSON object containing configuration for shapes, links, and events, and render the diagram accordingly. The component should be able to update the shapes based on event changes. The diagram should also support legend display to explain the meaning of each event status.

The JSON object structure should include the following:

name (string): The name of the diagram.
description (string): A brief description of the diagram.
legends (array of objects): Each legend should have the following properties:
status (string): A numerical or string identifier for the status.
color (string): The color representing the status.
label (string): The label that describes the status.
shapes (array of objects): Each shape object should include:
id (string): A unique identifier for the shape.
type (string): The type of shape (e.g., standard.Rectangle).
position (object): The x and y coordinates of the shape.
size (object): The width and height of the shape.
label (string): The label text displayed inside the shape.
fill (string): The initial color of the shape.
styles (object): Styling properties such as stroke and strokeWidth.
links (array of objects): Each link object should contain:
link_id (string): A unique identifier for the link.
source (string): The id of the source shape.
target (string): The id of the target shape.
stroke (string): The color of the link line.
strokeWidth (number): The width of the link line.
events (array of objects): Each event object should contain:
event_id (string): A unique identifier for the event.
status_value (array): An array of numeric or string values representing the status.
color (array): The colors corresponding to the status_value.
shapes (array of strings): An array of shape ids that should be updated when the event occurs.
links (array of strings): An array of link ids that should be updated when the event occurs.
width (number or string): The width of the canvas.
height (number or string): The height of the canvas.
The Vue component should dynamically render shapes and links based on the provided JSON data. Each shape should be represented as a joint.shapes.standard.Rectangle, and the component should provide a way to change the shape colors when events are triggered. The component should also display the name, description, and legends for the diagram, along with visual feedback (e.g., updating the color of the shapes based on event status).

The generated code should:

Handle dynamic shape rendering and event-driven updates.
Allow for multiple diagrams to be rendered by passing different JSON configurations.
Be responsive and customizable in terms of layout and styles (such as canvas dimensions and shape properties).
Provide a mechanism to update shapes based on events, such as changing colors when an event is triggered.
Support a flexible chart definition in JSON format that can be processed and saved/exported for rendering.
