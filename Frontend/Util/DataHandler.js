
import axios from 'axios';
import websiteUrl from './WebUrlConfig';

// @app.get("/", response_class=HTMLResponse)
// async def root():
//     with open("../../Frontend/build/index.html", "r") as f:
//         return f.read()



export default class DataHandler {

    constructor(){}


    get_all_nodes = () => {
        axios.get(websiteUrl + '/api/node/all')
        .then( res => {
            return res.data
        })
    }

    get_node_from_id = (nid) => {
        axios.get(websiteUrl + '/api/node/' + nid)
        .then( res => {
            return res.data
        })
    }

    get_timestamp_all = () => {
        axios.get(websiteUrl + '/api/timestamp/all')
        .then(res => {
            return res.data
        })
    }

    get_timestamp_from_id = (tid) => {
        axios.get(websiteUrl + '/api/timestamp/'  + tid)
        .then(res => {
            return res.data
        })
    }


    get_all_reports = () => {
        axios.get(websiteUrl + '/api/report/all')
        .then(res => {
            return res.data
        })
    }

    get_report_from_id = (crid)  => {
        axios.get(websiteUrl + '/api/report/' + crid)
        .then(res => {
            return res.data
        })
    }

    get_all_weather = () => {
        axios.get(websiteUrl + '/api/weather/all')
        .then(res => {
            return res.data
        })
    }

    get_weather_from_id = (wdid) => {
        axios.get(websiteUrl + '/api/weather/'  + wdid)
        .then(res => {
            return res.data
        })
    }

    get_all_audio = () => {
        axios.get(websiteUrl + 'api/audio/all')
        .then(res => {
            return res.data
        })
    }

    get_audio_from_id = (afid) => {
        axios.get(websiteUrl + '/api/audio/' + afid)
        .then( res => {
            return res.data
        })
    }

}