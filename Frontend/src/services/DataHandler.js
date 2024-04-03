
import axios from 'axios';


webisteUrl = "http://localhost:8080"


class ValidationError extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = "ValidationError"; // (2)
    }
}
export default class DataHandler {

    allowedEndpointTypes = ["node", "timestamp", "report", "weather", "audio",]
    constructor(endpointType) {

        if (this.allowedEndpointTypes.includes(endpointType)) {
            this.endopointType = endpointType;
        }

        else {
            throw new ValidationError(`Endpoint "${endpointType}" is not one of the defined endpoints`)
        }
    }


    get_all() {
        axios.get(`${websiteUrl}/api/${this.endpointType}/all`)

            .then(data => {
                console.log("Data", data); // Logging the response before parsing
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error; // Re-throw the error for further handling
            });
    }

    get_from_id = (id) => {
        axios.get(`${websiteUrl}/api/${this.endpointType}/${id}`)

            .then(data => {
                console.log("Data", data); // Logging the response before parsing
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error; // Re-throw the error for further handling
            });
    }

    get_from_timestamp = (timestamp) => {
        axios.get(`${websiteUrl}/api/${this.endpointType}/timestamp?${timestamp}`)

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