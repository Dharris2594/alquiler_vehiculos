import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, IconoTexto } from '../UI';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Colores from '../../constantes/Colores';


const ElementoLista = props => {
    const auto = props.auto;
    return (
        <Card style={styles.elemento}>
            <TouchableWithoutFeedback onPress={props.alSeleccionar}>
                <View style={styles.contenedor}>
                    <View style={styles.contenedor2}>
                        <Image source={{ uri: auto.urlImagen }} style={styles.imagen} />
                        <View style={styles.contenedorTexto}>
                            <Text style={styles.titulo}>{auto.marca} {auto.modelo}</Text>
                            <IconoTexto
                                iconStyle={{color:Colores.colorPrincipal}}
                                icono="car-door"
                                tipoIcono="material-community"
                                style={{fontSize:15}}
                                texto={auto.puertas + ' Puertas'} />
                            <IconoTexto
                                iconStyle={{color:Colores.colorPrincipal}}
                                icono="seat-recline-normal"
                                tipoIcono="material-community"
                                style={{fontSize:15}}
                                texto={auto.asientos + ' Asientos'} />
                            <IconoTexto
                                iconStyle={{color:Colores.colorPrincipal}}
                                icono="gear"
                                style={{fontSize:15, marginLeft:10}}
                                tipoIcono="font-awesome"
                                texto={auto.transmision} />
                        </View>
                    </View>
                    <View style={styles.contenedorPrecio}>
                        <Text style={styles.precio}>{'$' + auto.precio + '/'}</Text>
                        <Text>Día</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Card>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    contenedor2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagen: {
        width: '40%',
        resizeMode: 'contain',
        height: 120,
    },
    contenedorTexto: {
        marginLeft: 15,
    },
    titulo: {
        fontSize: 18,
        color: 'black',
        marginBottom: 15,
    },
    contenedorPrecio: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
    },
    precio: {
        fontSize: 19,
        alignSelf: 'baseline',
    },
});

export { ElementoLista };
