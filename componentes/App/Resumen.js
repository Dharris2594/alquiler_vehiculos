import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CardItem, IconoTexto } from '../UI';
import Colores from '../../constantes/Colores';

const Resumen = props => {
    return (
        <View style={styles.resumen} >
            <CardItem>
                <View style={styles.grid}>
                    <IconoTexto
                        iconStyle={{ color: Colores.colorPrincipal }}
                        texto="ALQUILER"
                        icono="car"
                        tipoIcono="fontisto"
                    />
                    <Text style={{ fontSize: 16 }}>{'$' + props.alquiler.toFixed(2)}</Text>
                </View>
            </CardItem>
            <CardItem>
                <View style={styles.grid}>
                    <IconoTexto
                        iconStyle={{ color: Colores.colorPrincipal }}
                        texto="SEGURO"
                        icono="heart"
                        tipoIcono="entypo"
                    />
                    <Text style={{ fontSize: 16 }}>{'$' + props.seguro.toFixed(2)}</Text>
                </View>
            </CardItem>
            <CardItem>
                <View style={styles.grid}>
                    <IconoTexto
                        iconStyle={{ color: Colores.colorPrincipal }}
                        texto="IBTMS (7%)"
                        icono="percent"
                        tipoIcono="feather"
                    />
                    <Text style={{ fontSize: 16 }}>{'$' + props.ibtms.toFixed(2)}</Text>
                </View>
            </CardItem>
            <CardItem>
                <View style={styles.grid}>
                    <IconoTexto
                        iconStyle={{ color: Colores.colorPrincipal }}
                        texto="TOTAL"
                        icono="dollar"
                        tipoIcono="font-awesome"
                    />
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {'$' + props.total.toFixed(2)}
                    </Text>
                </View>
            </CardItem>
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    resumen: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderRadius: 0,
    },
});

export default Resumen;
