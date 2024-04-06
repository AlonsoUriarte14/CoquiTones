
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

export default class DataHandler {
    allowedEndpointTypes = ["node", "timestamp", "report", "weather", "audio"];
    web_url = process.env.WEB_URL || 'http://localhost:8080';

    constructor(endpointType) {
        if (this.allowedEndpointTypes.includes(endpointType)) {
            this.endpointType = endpointType;
        } else {
            throw new ValidationError(`Endpoint "${endpointType}" is not one of the defined endpoints`);
        }
    }

    async get_all() {
        try {
            const response = await fetch(`${web_url}/api/${this.endpointType}/all`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Data", data);
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async get_from_id(id) {
        try {
            const response = await fetch(`${web_url}/api/${this.endpointType}/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Data", data);
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async get_from_timestamp(timestamp) {
        try {
            const response = await fetch(`${web_url}/api/${this.endpointType}/timestamp?${timestamp}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Data", data);
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}
