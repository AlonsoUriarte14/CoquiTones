


export default function () {// Listen for messages from the main script

    onmessage = function (event) {
        // Process the data received from the main script

        const result = processData(event.data);

        // Send the processed data back to the main script
        postMessage(result);
    };


    // Function to process the data
    function processData(file) {
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
}
