// worker.js
/**
 * Create data matrix for heatmap from one-dimensional array
 * @param {Uint8Array}  data          FFT Data for one channel
 * @param {number}      strideSize    Single data block width
 * @param {number}      tickCount     Data row count
 * @returns {number[][]}              Two-dimensional matrix representing the spectrogram data
 */


export default function () {// Listen for messages from the main script

    onmessage = function (event) {
        // Process the data received from the main script
        const result = processData(event.data);

        // Send the processed data back to the main script
        postMessage(result);
    };

    const remapDataToTwoDimensionalMatrix = (data, strideSize, tickCount) => {
        const output = [];

        // Map the one-dimensional data to a two-dimensional matrix
        for (let col = 0; col < tickCount; col++) {
            output[col] = [];
            for (let row = 0; row < strideSize; row++) {
                output[col][row] = data[col * strideSize + row];
            }
        }

        return output;
    }
    // Function to process the data
    function processData(data) {

        return remapDataToTwoDimensionalMatrix(data.channels[0], data.stride, data.tickCount)
    }
}

