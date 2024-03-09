// worker.js

import { remapDataToTwoDimensionalMatrix } from "../components/SoundAnalysisTools/DataProcessing";

export default function () {// Listen for messages from the main script
    onmessage = function (event) {
        // Process the data received from the main script
        const result = processData(event.data);

        // Send the processed data back to the main script
        postMessage(result);
    };

    // Function to process the data
    function processData(data) {

        return remapDataToTwoDimensionalMatrix(data.channels[0], data.stride, data.tickCount)
    }
}