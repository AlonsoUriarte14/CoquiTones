
import axios from 'axios';
import { websiteUrl } from '../Util/constant';


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
            .then(res => {
                return res.data
            })
    }

    get_from_id = (id) => {
        axios.get(`${websiteUrl}/api/${this.endpointType}/${id}`)
            .then(res => {
                return res.data
            })
    }

    get_from_timestamp = (timestamp) => {
        axios.get(`${websiteUrl}/api/${this.endpointType}/timestamp?${timestamp}`)
            .then(res => {
                return res.data
            })
    }


}