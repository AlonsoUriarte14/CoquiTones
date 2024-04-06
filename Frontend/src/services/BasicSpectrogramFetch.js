




export default function () {// Listen for messages from the main script

    onmessage = async function (event) {
        // Process the data received from the main script

        const { file, type } = event.data;
        const result = await processData(file, type);

        // Send the processed data back to the main script
        postMessage(result);
    };



    function processData(file, type) {
        console.log("File", file);
        const formData = new FormData();
        formData.append('file', file);

        const web_url = process.env.WEB_URL || 'http://localhost:8080';
        console.log("fetching from ", web_url)

        let endpoint;

        if (type === "mel") {
            endpoint = "/api/mel-spectrogram/"
        }

        else {
            endpoint = "/api/basic-spectrogram/"
        }

        return fetch(web_url + endpoint, {
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
