import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { closeModal } from './modalReducer';

export default function ModalWrapper({ children, size, header }) {
    const dispatch = useDispatch();

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={() => dispatch(closeModal())}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                </View>
            </View>
            
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
    }
})
