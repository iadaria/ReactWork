import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { openModal } from '../../app/common/modals/modalReducer';

export default function Sandbox() {
    const dispatch = useDispatch();
    const data = "data";

    return (
        <>
            <Button 
                color="primary"
                onClick={() => dispatch(openModal({modalType: 'TestModal', modalProps: {data}}))}
            >
                Open Modal
            </Button>
        </>
    );
}