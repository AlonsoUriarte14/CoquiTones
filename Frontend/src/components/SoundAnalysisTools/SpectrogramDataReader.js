import WorkerFactory from "../../services/WorkerFactory";
import generateMelData from "../../services/MelSpectrogramFetch";
import generateBasicSpecData from "../../services/BasicSpectrogramFetch"


/**
 * 
 * @param {File} file object of type wav / mp3
 * @returns {Promise<number[][]>} spectrogram data
 */
export const handleMelLoad = async (file) => {
    try {

        const workerInstance = new WorkerFactory(generateMelData)
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


export const handleBasicLoad = async (file) => {
    try {

        const workerInstance = new WorkerFactory(generateBasicSpecData)
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

