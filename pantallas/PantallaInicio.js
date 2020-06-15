import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colores from '../constantes/Colores';
import { useDispatch } from 'react-redux';
import { autenticar } from '../almacen/acciones/login';

const PantallaInicio = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const intentarLogin = async () => {
            const datosUsuario = await AsyncStorage.getItem('id');
            if (datosUsuario && datosUsuario !== null){
                dispatch(autenticar(datosUsuario));
            }
            props.navigation.navigate('Aplicacion');
        };
        intentarLogin();
    }, [dispatch]);

    return (
        <View style={styles.pantalla}>
            <ActivityIndicator size="large" color={Colores.colorPrincipal} />
        </View>
    );
};

const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export { PantallaInicio };
