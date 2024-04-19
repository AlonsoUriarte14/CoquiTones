import React, { useState, useEffect } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";

const MapEmbed = ({ ducks }) => {


    const [markers, setMarkers] = useState([])

    useEffect(() => {
        const locations = ducks.map((duck) => (

            <Marker
                key={duck.nid}
                longitude={duck.nlongitude}
                latitude={duck.nlatitude}
            />
        ))

        setMarkers(locations)
    }, [ducks])

    return (
        <div>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN || "pk.eyJ1IjoiYWxvbnNvMTQiLCJhIjoiY2x2NnRhbml5MDJtczJrb2V6eWFpajl6NyJ9.p3o47cKv1FYbG-7WFhbM9g"}
                initialViewState={{
                    longitude: 66.5901,
                    latitude: 18.2208,
                    zoom: 3.5,

                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                {markers}
            </Map>
        </div>
    );
}
export default MapEmbed;