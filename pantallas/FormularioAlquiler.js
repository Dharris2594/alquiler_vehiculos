import React, { useCallback, useReducer, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IconInput } from '../componentes/UI';
import Colores from '../constantes/Colores';
import { useHeaderHeight } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { agregarReserva } from '../almacen/acciones/reservas';
import { reductorFormulario } from '../almacen/reductores/formulario';

const ACTUALIZAR = 'ACTUALIZAR';
const estadoInicial = {
    campos: {
        nombre: '',
        cedula: '',
        telefono: '',
        correo: '',
        direccion: '',
        permiso: '',
    },
    validezCampos: {
        nombre: false,
        cedula: false,
        telefono: false,
        correo: false,
        direccion: false,
        permiso: false,
    },
    validezFormulario: false,
};

const FormularioAlquiler = props => {
    const dispatch = useDispatch();
    const [cargando, cambiarCargando] = useState(false);
    const [estadoFormulario, dispatchActualizar] = useReducer(reductorFormulario, estadoInicial);
    const headerHeight = useHeaderHeight();
    const cambiarTexto = useCallback((idInput, texto, valido) => {
        dispatchActualizar({
            type: ACTUALIZAR,
            valor: texto,
            valido: valido,
            input: idInput,
        });
    }, [dispatchActualizar]);

    const enviarFormulario = useCallback(
        async () => {
            if (!estadoFormulario.validezFormulario) {
                Alert.alert('Formulario Inválido', 'Porfavor llene los campos y revise los errores', [{ text: 'Aceptar' }]);
                return;
            }
            cambiarCargando(true);
            try {
                await dispatch(agregarReserva(props.navigation.getParam('reserva')));
                props.navigation.navigate({ routeName: ('Confirmacion') });
            } catch (error) {
                Alert.alert('Error', 'Ha habido un error procesando su solicitud', [{ text: 'Aceptar' }]);
                cambiarCargando(false);
                return;
            }
        }, [dispatch, estadoFormulario]
    );

    return (
            <KeyboardAwareScrollView  enableOnAndroid extraScrollHeight={100}>
                <View style={styles.pantalla}>
                    <Text style={styles.titulo}> ORDEN DE ALQUILER</Text>
                    <IconInput
                        id="nombre"
                        colorInput={Colores.colorPrincipal}
                        label="Nombre del titular"
                        keyboardType="default"
                        icono="user"
                        soloLetras
                        value={estadoFormulario.campos.nombre}
                        alCambiarInput={cambiarTexto}
                        returnKeyType="next"
                        onSubmitEditing={() => this.cedula.focus()}
                        tipoIcono="font-awesome"
                        autoCorrect={false}
                        error="Ingrese un nombre"
                    />
                    <IconInput
                        id="cedula"
                        cedula
                        inputRef={ref => {this.cedula = ref;}}
                        onSubmitEditing={() => this.telefono.focus()}
                        colorInput={Colores.colorPrincipal}
                        label="Cédula"
                        icono="lock"
                        value={estadoFormulario.campos.cedula}
                        alCambiarInput={cambiarTexto}
                        keyboardType="numeric"
                        returnKeyType="next"
                        tipoIcono="font-awesome"
                        autoCorrect={false}
                        error="Ingrese la cédula"
                    />
                    <IconInput
                        id="telefono"
                        colorInput={Colores.colorPrincipal}
                        label="Telefono"
                        inputRef={ref => {this.telefono = ref;}}
                        onSubmitEditing={() => this.correo.focus()}
                        value={estadoFormulario.campos.telefono}
                        keyboardType="numeric"
                        alCambiarInput={cambiarTexto}
                        telefono
                        icono="cellphone"
                        returnKeyType="next"
                        tipoIcono="material-community"
                        autoCorrect={false}
                        error="Ingrese su número de teléfono"
                    />
                    <IconInput
                        id="correo"
                        colorInput={Colores.colorPrincipal}
                        inputRef={ref => {this.correo = ref;}}
                        onSubmitEditing={() => this.direccion.focus()}
                        label="Correo Electrónico"
                        icono="email"
                        email
                        value={estadoFormulario.campos.correo}
                        returnKeyType="next"
                        alCambiarInput={cambiarTexto}
                        keyboardType="email-address"
                        tipoIcono="entypo"
                        autoCorrect={false}
                        error="Ingrese un correo"
                    />
                    <IconInput
                        id="direccion"
                        colorInput={Colores.colorPrincipal}
                        inputRef={ref => {this.direccion = ref;}}
                        onSubmitEditing={() => this.permiso.focus()}
                        label="Dirección Residencial"
                        icono="location"
                        value={estadoFormulario.campos.direccion}
                        alCambiarInput={cambiarTexto}
                        returnKeyType="next"
                        tipoIcono="entypo"
                        autoCorrect={false}
                        error="Ingrese una dirección"
                    />
                    <IconInput
                        id="permiso"
                        colorInput={Colores.colorPrincipal}
                        inputRef={ref => {this.permiso = ref;}}
                        label="Permiso de Conducir"
                        icono="drivers-license"
                        value={estadoFormulario.campos.permiso}
                        keyboardType="numeric"
                        alCambiarInput={cambiarTexto}
                        returnKeyType="done"
                        tipoIcono="font-awesome"
                        autoCorrect={false}
                        error="Ingrese el código de su permiso de conducir"
                    />
                    <View style={{ marginTop: 25 }}>
                        {cargando ? <ActivityIndicator size="large" color={Colores.colorPrincipal} />
                            :
                            <Button
                                color={Colores.colorPrincipal}
                                title="CONFIRMAR RESERVA"
                                onPress={enviarFormulario}
                            />}
                    </View>
                </View>
            </KeyboardAwareScrollView>
    );
};

FormularioAlquiler.navigationOptions = data => {
    return {
        headerTitle: 'Finalizar Reserva',
    };
};

const styles = StyleSheet.create({
    pantalla: {
        padding: 20,
    },
    titulo: {
        fontSize: 17,
        marginVertical: 10,
        color: 'black',
    },
});


export { FormularioAlquiler };
