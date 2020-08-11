import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';

export default function TestModal({ data }) {
    return (
        <ModalWrapper size='xs' header="Test Modal">
            The data is {data}
        </ModalWrapper>
    );
}
