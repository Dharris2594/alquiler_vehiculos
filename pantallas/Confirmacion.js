import React from 'react';
import { View, StyleSheet, Text,  Button } from 'react-native';
import { Icon } from 'react-native-elements';
import Colores from '../constantes/Colores';

const Confirmacion = props => {
    return (
        <View style={styles.contenedor}>
            <Icon name="shopping-cart" type="font-awesome" size={150} color={Colores.colorPrincipal} />
            <Text style={styles.texto}>¡Tu pedido se ha realizado exitosamente! </Text>
            <Button
                title="VOLVER A INICIO"
                color={Colores.colorPrincipal}
                onPress={() => props.navigation.popToTop()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        justifyContent: 'center',
        padding: 75,
        flex: 1,
    },
    texto: {
        fontSize: 20,
        textAlign:
            'center',
        marginVertical: 20,
    },
});

Confirmacion.navigationOptions = data => {
    return {
        headerTitle: 'Reserva Completada',
        headerLeft: () => { },
    };
};

export { Confirmacion };



