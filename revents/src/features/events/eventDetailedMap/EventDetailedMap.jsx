import './event-detailed-map.scss';
import React from 'react';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';

function Marker() {
    return <RoomIcon color="secondary" fontSize="large" />;
}

export default function EventDetailedMap({ latLng }) {
    const zoom = 14;

    console.log('latLng', latLng)

    return (
        <div className="event-detailed-map">
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_KEY}}
                center={latLng}
                zoom={zoom}
            >
                <Marker lat={latLng.lat} lng={latLng.lng} />
            </GoogleMapReact>
        </div>
    );
}
