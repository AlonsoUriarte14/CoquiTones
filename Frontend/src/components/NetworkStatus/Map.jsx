import React, { useMemo } from "react";
import MapGL, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// Marker Component
const DuckMarker = ({ duck }) => (
    <Marker
        key={duck.nid}
        longitude={-duck.nlongitude}
        latitude={duck.nlatitude}
        anchor="bottom"
    />
);

const MapEmbed = ({ ducks }) => {
    // Use useMemo to compute markers
    const markers = useMemo(() => ducks.map(duck => <DuckMarker duck={duck} />), [ducks]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapGL
                mapboxAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN || "pk.eyJ1IjoiYWxvbnNvMTQiLCJhIjoiY2x2NnRhbml5MDJtczJrb2V6eWFpajl6NyJ9.p3o47cKv1FYbG-7WFhbM9g"}
                initialViewState={{
                    longitude: -66.1057,
                    latitude: 18.4655,
                    zoom: 9,
                    width: '100%',
                    height: '100%'
                }}
                mapStyle="mapbox://styles/mapbox/navigation-night-v1"
            >
                {markers.map((duckMarker) => (duckMarker))}
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                />
            </MapGL>
        </div>
    );
}

export default MapEmbed;