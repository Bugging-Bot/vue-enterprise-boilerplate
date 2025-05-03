adding element palette: https://docs.jointjs.com/learn/quickstart/element-palette
interact with Elements and Links : https://docs.jointjs.com/learn/quickstart/editing-overlay
Add a toolbar: https://docs.jointjs.com/learn/quickstart/toolbar
Zoom and pan paper: https://docs.jointjs.com/learn/quickstart/zoom-and-pan
Add a property editor: https://docs.jointjs.com/learn/quickstart/property-editor

Issues:

1. Currently chart keep on displaying the color based on the last reading.
   Requirement:

   - If any sensor on a machine does not receive data within a specified time window (e.g., 10 seconds), the machine should be marked as inactive.
   - The key difference is that we need to monitor each individual sensor and check if any of the sensors fails to provide data within the specified time window (e.g., 10 seconds). This is different from the previous approach where we were monitoring all sensors collectively.

   Approach:

   1. Track Last Update per Sensor
      Each sensor should track its last data reception timestamp (lastReadingTime). This timestamp should be updated every time a new reading is received. If the time gap between the current timestamp and the last received reading exceeds the configured threshold (e.g., 10 seconds), that sensor will be considered inactive.
   2. Monitor All Sensors on the Machine
      Each machine has multiple sensors. We need to check each sensor’s lastReadingTime periodically (e.g., every 1 second) to determine if any sensor has gone beyond the threshold (e.g., 10 seconds) without receiving new data. If any sensor exceeds the threshold, the machine should be marked as inactive. If all sensors are active, the machine should be marked as active, and we should proceed with the regular color update.
   3. Update Machine’s Status If any sensor hasn't received data in the last 10 seconds, the machine's status becomes inactive, and its shape color should be updated to NO_DATA_COLOR (or any default color). If all sensors are up-to-date, the machine's status is considered active, and we should proceed to determine the machine color based on the sensor readings.
   4. Configuration-based Timeout The timeout duration (e.g., 10 seconds) should be provided from a configuration file so that you can easily adjust this value globally.
      check if the sensor configuraion file can be extended to capture reading time or generic time for full chart or machine level.
