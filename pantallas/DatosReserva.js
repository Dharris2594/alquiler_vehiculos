import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton, DateInput } from '../componentes/UI';
import  Resumen  from '../componentes/App/Resumen';
import Colores from '../constantes/Colores';

const DatosReserva = props => {
    const inicio = new Date();
    const milisegundos = 1000 * 60 * 60 * 24;
    const alquilerInicial = props.navigation.getParam('precio');
    const seguroInicial = 23;
    const final = inicio.getTime() + milisegundos;

    const [reserva, cambiarReserva] = useState({
        diaInicial: inicio,
        diaFinal: new Date(final),
        dias: 1,
        alquiler: alquilerInicial,
        seguro: seguroInicial,
    });

    const guardarReserva = useCallback(() => {
        const datos = {
            idAuto: props.navigation.getParam('id'),
            fechaInicial: reserva.diaInicial.toLocaleDateString(),
            fechaFinal: reserva.diaFinal.toLocaleDateString(),
            alquiler: reserva.alquiler,
            seguro: reserva.seguro,
            ibtms: ibtms,
            total: total,
        };
        return datos;
    }, [reserva.dias, reserva.total]);

    useEffect(() => {
        props.navigation.setParams({ guardar: guardarReserva });
    }, [guardarReserva]);

    const alCambiarFechaInicial = (fecha) => {
        const diff = (reserva.diaFinal.getTime() - fecha.getTime()) / milisegundos;
        if (diff <= 0) {
            Alert.alert('Fecha Inválida', 'La fecha de recogida debe ser antes que la de entrega',
                [{ text: 'ACEPTAR' }]);
            return;
        }
        cambiarReserva({
            ...reserva, diaInicial: fecha, dias: diff,
            alquiler: (alquilerInicial * diff), seguro: (seguroInicial * diff),
        });
    };
    const alCambiarFechaFinal = (fecha) => {
        const diff = (fecha.getTime() - reserva.diaInicial.getTime()) / milisegundos;
        if (diff <= 0) {
            Alert.alert('Fecha Inválida', 'La fecha de entrega debe ser despues que la de recogida',
                [{ text: 'ACEPTAR' }]);
            return;
        }
        cambiarReserva({
            ...reserva, diaFinal: fecha, dias: diff,
            alquiler: (alquilerInicial * diff), seguro: (seguroInicial * diff),
        });
    };
    const ibtms = (reserva.alquiler + reserva.seguro) * 0.07;
    const total = reserva.alquiler + reserva.seguro + ibtms;

    return (
        <ScrollView>
            <View style={styles.pantalla}>
                <Image style={styles.imagen} source={{ uri: props.navigation.getParam('url') }} />
                <Text style={styles.subtitulo}>{'ITINERARIO - ' + reserva.dias + ' DIA(S)'}</Text>
                <View style={styles.grid}>
                    <View style={styles.contenedor}>
                        <Text style={styles.label}>FECHA DE RECOGIDA</Text>
                        <DateInput
                            date={reserva.diaInicial}
                            alCambiar={alCambiarFechaInicial}
                            style={{ borderColor: Colores.colorPrincipal }}
                            color={Colores.colorPrincipal} />
                    </View>
                    <View style={styles.contenedor}>
                        <Text style={styles.label}>FECHA DE ENTREGA</Text>
                        <DateInput
                            date={reserva.diaFinal}
                            alCambiar={alCambiarFechaFinal}
                            style={{ borderColor: Colores.colorPrincipal }}
                            color={Colores.colorPrincipal}
                        />
                    </View>
                </View>
                <Text style={styles.subtitulo}>RESUMEN</Text>
                <Resumen
                    alquiler={reserva.alquiler}
                    seguro={reserva.seguro}
                    ibtms={ibtms}
                    total={total}
                />
            </View>
        </ScrollView>
    );
};

DatosReserva.navigationOptions = data => {
    return {
        headerTitle: 'Reservar Vehículo',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item iconName="check" onPress={() => {
                    const datos = data.navigation.getParam('guardar')();
                    data.navigation.navigate({
                        routeName: ('FormularioAlquiler'),
                        params: {
                            reserva: datos,
                        },
                    });
                }} />
            </HeaderButtons>,
    };
};

const styles = StyleSheet.create({
    pantalla: {
        padding: 20,
    },
    imagen: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    subtitulo: {
        fontSize: 16,
        marginTop: 0,
        marginBottom: 15,
        color: Colores.colorPrincipal,
    },
    contenedor: {
        marginBottom: 15,
        width: '47.5%',
    },
    label: {
        marginBottom: 10,
        fontSize: 14,
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export { DatosReserva };
