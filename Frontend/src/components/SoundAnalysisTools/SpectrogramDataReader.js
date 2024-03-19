import WorkerFactory from "../../services/WorkerFactory";
import generateSpectrogramData from "../../services/generateSpectrogramData";



/**
 * 
 * @param {File} file object of type wav / mp3
 * @returns {Promise<number[][]>} spectrogram data
 */
export const handleLoad = async (file) => {
    try {

        const workerInstance = new WorkerFactory(generateSpectrogramData)
        workerInstance.postMessage(file)
        // Remap data to a 2D matrix
        let parsed;
        let promise = new Promise((resolve, reject) => {
            workerInstance.onmessage = (event) => {
                parsed = event.data
                console.log("Parsed", parsed)
                resolve(event.data)
            }
        })

        return promise;
    } catch (error) {
        // Handle errors
        console.error(error)
        console.error("Error loading and processing audio:", error);
        throw error;
    }
}


