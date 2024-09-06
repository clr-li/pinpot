// Filename - Maps.js
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({
    iconUrl: './marker.png',
    iconSize: [38, 38],
});

const position = [51.505, -0.09];

function ResetCenterView(props) {
    const { selectPosition } = props;
    const map = useMap();

    useEffect(() => {
        if (selectPosition) {
            map.setView(L.latLng(selectPosition?.lat, selectPosition?.lon), map.getZoom(), {
                animate: true,
            });
        }
    });

    return null;
}

function Maps(props) {
    const { selectPosition } = props;
    const locationSelection = [selectPosition?.lat, selectPosition?.lon];

    return (
        <MapContainer center={position} zoom={8} style={{ width: '100%', height: '100% ' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {selectPosition && (
                <Marker position={locationSelection} icon={icon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            )}
            <ResetCenterView selectPosition={selectPosition} />
        </MapContainer>
    );
}

export default Maps;
