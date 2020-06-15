import React, { useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import  AppHeader  from './AppHeader';
import Colores from '../../constantes/Colores';
import { useSelector, useDispatch } from 'react-redux';
import { cerrarSesion } from '../../almacen/acciones/login';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';


const ContenidoDrawer = props => {
    const id = useSelector(estado => estado.login.idUsuario);
    const dispatch = useDispatch();
    const alPresionar = useCallback(async () => {
        if (id === null) {
             props.navigation.navigate('PantallaLogin');
            return;
        }
        Alert.alert('Cerrar Sesión', '¿Deseas cerrar la sesion actual?', [
            {
              text: 'CANCELAR',
              onPress: () => null,
              style: 'cancel',
            },
            { text: 'ACEPTAR', onPress: async () => {
                dispatch(cerrarSesion());
                props.navigation.toggleDrawer();
                await AsyncStorage.clear();
                props.navigation.navigate('Inicio');
            } },
          ]);
    }, [id, props.navigation, dispatch]);

    return (
        <View>
            <AppHeader size={75} />
            <DrawerItems {...props} iconContainerStyle={{opacity:1}} />
            <TouchableOpacity onPress={alPresionar}>
                <View style={styles.item}>
                    <View style={styles.iconContainer}>
                    <Icon name={id === null ? 'user' : 'exit-to-app'} type={id === null ? 'font-awesome' : 'material-community'} color={Colores.colorPrincipal}/>
                    </View>
                    <Text style={styles.label}>{id === null ? 'Iniciar Sesión' : 'Cerrar Sesión'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      label: {
        margin: 16,
        fontWeight: 'bold',
        fontSize: 18,
        color: Colores.colorPrincipal,
      },
      iconContainer: {
        marginHorizontal: 16,
        width: 24,
        alignItems: 'center',
      },
      icon: {
        width: 24,
        height: 24,
      },
  });

export { ContenidoDrawer };
