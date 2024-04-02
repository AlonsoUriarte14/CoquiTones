

import websiteUrl from "../Util/constant";


export default function () {// Listen for messages from the main script

    onmessage = async function (event) {
        // Process the data received from the main script

        const result = await processData(event.data);

        // Send the processed data back to the main script
        postMessage(result);
    };



    function processData(file) {
        console.log("File", file);
        const formData = new FormData();
        formData.append('file', file);

        const url = "http://localhost:8080"

        return fetch(url + "/api/basic-spectrogram/", {
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
}
