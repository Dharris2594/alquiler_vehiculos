import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Platform, UIManager, LayoutAnimation} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { CardItem, Card, IconoTexto } from '../UI';
import Resumen from '../App/Resumen';
import Colores from '../../constantes/Colores';
import { expandirReserva } from '../../almacen/acciones/reservas';

const ElementoAlquilado = props => {
    const reserva = props.reserva;
    const seleccionado = useSelector(estado => estado.reservas.reservaExpandida);
    const expandido = seleccionado === props.reserva.id;
    const dispatch = useDispatch();
    const renderizarResumen = () => {
        if (expandido) {
            return (
                <Resumen
                    alquiler={reserva.alquiler}
                    seguro={reserva.seguro}
                    ibtms={reserva.ibtms}
                    total={reserva.total}
                />
            );
        }
    };


    const expandir = useCallback(
        () => {
            dispatch(expandirReserva(reserva.id));
            if (Platform.OS === 'android') {
                if (UIManager.setLayoutAnimationEnabledExperimental) {
                  UIManager.setLayoutAnimationEnabledExperimental(true);
                }
              }
            LayoutAnimation.easeInEaseOut();
        }, [dispatch]
    );

    return (
        <Card style={{ paddingVertical: 0, paddingHorizontal: 0 }}>
            <TouchableWithoutFeedback onPress={expandir} >
                <View >
                    <CardItem>
                        <View style={styles.contenedorTitulo}>
                            <IconoTexto
                                iconStyle={{ color: Colores.colorPrincipal }}
                                texto={props.marca + ' ' + props.modelo}
                                icono={expandido ? 'up' : 'down'}
                                tipoIcono="antdesign"
                            />
                            <Text>{reserva.fechaInicial} - {reserva.fechaFinal}</Text>
                        </View>
                    </CardItem>
                    {renderizarResumen()}
                </View>
            </TouchableWithoutFeedback>
        </Card>
    );
};

const styles = StyleSheet.create({
    contenedorTitulo: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});



export { ElementoAlquilado };
