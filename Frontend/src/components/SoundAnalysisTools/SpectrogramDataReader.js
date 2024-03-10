import WorkerFactory from "../../services/WorkerFactory";
import generateSpectrogramData from "../../services/generateSpectrogramData";



const AudioContext = window.AudioContext || window.webkitAudioContext
/**
 * 
 * @param {File} file object of type wav / mp3
 * @returns {Promise<number[][]>} spectrogram data
 */
export const handleLoad = async (file) => {
    // try {

    //     const workerInstance = new WorkerFactory(generateSpectrogramData)
    //     workerInstance.postMessage(file)
    //     // Remap data to a 2D matrix
    //     let parsed;
    //     let promise = new Promise((resolve, reject) => {
    //         workerInstance.onmessage = (event) => {
    //             parsed = event.data
    //             console.log("Parsed", parsed)
    //             resolve(event.data)
    //         }
    //     })

    //     return promise;
    // } catch (error) {
    //     // Handle errors
    //     console.error(error)
    //     console.error("Error loading and processing audio:", error);
    //     throw error;
    // }

    console.log("File", file);
    const formData = new FormData();
    formData.append('file', file);

    return fetch("http://localhost:8000/api/spectrogram/", {
        method: "POST",
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log("Data", data); // Logging the response before parsing
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error; // Re-throw the error for further handling
        });
}


