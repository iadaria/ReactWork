import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { openModal } from '../../app/common/modals/modalReducer';
import TestPlaceInput from './TestPlaceInput';
import TestMap from './TestMap';

export default function Sandbox() {
    const dispatch = useDispatch();
    const defaultProps = {
        center: { lat: 59.95, lng: 30.33 },
        zoom: 11
    };
    const [location, setLocation] = useState(defaultProps);
    const data = "data";

    function handleSetLocation(latLng) {
        setLocation({ ...location, center: {lat: latLng.lat, lng: latLng.lng} });
    }

    return (
        <>
            <Button 
                color="primary"
                onClick={() => dispatch(openModal({modalType: 'TestModal', modalProps: {data}}))}
            >
                Open Modal
            </Button>

            <div style={{marginTop: 15}}>
                <TestPlaceInput setLocation={handleSetLocation}/>
                <TestMap location={location} />
            </div>
        </>
    );
}
