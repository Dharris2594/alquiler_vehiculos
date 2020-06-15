import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Colores from '../../constantes/Colores';

const AppHeader = (props) => (
    <View>
        <View style={{...styles.contenedor, ...props.style}}>
            <Icon name="car" type="fontisto" size={props.size} color="white" />
        </View>
    </View>
);

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: Colores.colorPrincipal,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AppHeader;
