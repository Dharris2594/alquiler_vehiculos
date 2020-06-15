import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { CustomHeaderButton } from '../componentes/UI';
import { ElementoAlquilado } from '../componentes/App';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { obtenerReservas } from '../almacen/acciones/reservas';
import Colores from '../constantes/Colores';

const AutosAlquilados = () => {
    const [cargando, setCargando] = useState(false);
    const [errorExistente, setError] = useState(false);
    const autos = useSelector(estado => estado.autos.autos);
    const id = useSelector(estado => estado.login.idUsuario);
    const listaReservas = useSelector(estado => estado.reservas.reservas).reverse();
    const dispatch = useDispatch();

    const cargarReservas = useCallback( async () => {
        setError(null);
        setCargando(true);
        try {
            await dispatch(obtenerReservas());
        } catch (error) {
           setError(true);
        }
        setCargando(false);
    }, [dispatch, setCargando, setError]);

    useEffect(() => {
        cargarReservas();
    }, [dispatch, cargarReservas]);


    const crearElementoAlquilado = (reserva) => {
        const item = autos.find((auto) => auto.id === reserva.item.idAuto);
        return (
            <ElementoAlquilado reserva={reserva.item} marca={item.marca} modelo={item.modelo} />
        );
    };

    if (cargando) {
        return <View style={styles.centrado}>
            <ActivityIndicator size="large" color={Colores.colorPrincipal}/>
        </View>;
    }

    if (errorExistente) {
        return <View style={styles.centrado}>
            <Text style={{fontSize:16, marginBottom:20}}>Ha ocurrido un error cargando los datos</Text>
            <Button title="Intentar Nuevamente" color={Colores.colorPrincipal} onPress={cargarReservas}/>
        </View>;
    }

    if (id === null){
        return (
            <View style={styles.centrado}>
                <Text style={{fontSize:16}}>¡Inicia Sesión para ver tus vehículos reservados!</Text>
            </View>
        );
    }

    if (!cargando && listaReservas.length === 0){
        return (
            <View style={styles.centrado}>
                <Text style={{fontSize:16}}>No tienes reservas. ¡Empieza añadiendo una!</Text>
            </View>
        );
    }
    return (
        <View style={styles.pantalla}>
            <FlatList
                data={listaReservas}
                renderItem={crearElementoAlquilado}
            />
        </View>
    );
};

AutosAlquilados.navigationOptions = data => {
    return {
        headerTitle: 'Autos Alquilados',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName="menu" onPress={() => { data.navigation.toggleDrawer(); }} />
                </HeaderButtons >
            );
        },
    };
};

const styles = StyleSheet.create({
    pantalla: {
        padding: 10,
        flex:1,
    },
    centrado: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export { AutosAlquilados };

