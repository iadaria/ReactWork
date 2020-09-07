import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{ text }</div>;

export default function TestMap({ location }) {
    
    return (
        <div style={{ height: '80vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_KEY}}
                center={location.center}
                zoom={location.zoom}
            >
                <AnyReactComponent
                    lat={location.center.lat}
                    lng={location.center.lng}
                    text={'Kreyser Avrora'}
                />
            </GoogleMapReact>
        </div>
    );
}
