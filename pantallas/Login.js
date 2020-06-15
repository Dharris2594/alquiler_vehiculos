import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { StyleSheet, View, ScrollView, Button, Text, TouchableWithoutFeedback, Platform, UIManager, LayoutAnimation, ActivityIndicator, Alert, BackHandler } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IconInput } from '../componentes/UI';
import Colores from '../constantes/Colores';
import AppHeader from '../componentes/App/AppHeader';
import { useDispatch } from 'react-redux';
import { crearUsuario, iniciarSesion, autoLogin } from '../almacen/acciones/login';
import { reductorFormulario } from '../almacen/reductores/formulario';

const ACTUALIZAR = 'ACTUALIZAR';

const estadoInicial = {
    campos: {
        email: '',
        pass: '',
        repetir: '',
    },
    validezCampos: {
        email: false,
        pass: false,
        repetir: false,
    },
    validezFormulario: false,
};

const Login = props => {

    const dispatch = useDispatch();
    const [registrar, cambiarRegistrar] = useState(false);
    const [cargando, cambiarCargando] = useState(false);
    const [error, cambiarError] = useState();
    const [estadoFormulario, dispatchActualizar] = useReducer(reductorFormulario, estadoInicial);

    useEffect(() => {
        const backAction = () => {
            props.navigation.navigate('Aplicacion');
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, []);


    const enviarFormulario = useCallback(
        async () => {
            if ((!estadoFormulario.validezFormulario && registrar) ||
            ((!estadoFormulario.validezCampos.email || !estadoFormulario.validezCampos.pass) && !registrar)) {
            Alert.alert('Formulario Inválido','Porfavor llene los campos y revise los errores', [{ text: 'Aceptar' }]);
                return;
            }
            if (registrar && estadoFormulario.campos.pass !== estadoFormulario.campos.repetir) {
            Alert.alert('Formulario Inválido','Las contraseñas no coinciden', [{ text: 'Aceptar' }]);
                return;
            }
            let accion;
            if (registrar) {
                accion = crearUsuario(estadoFormulario.campos.email, estadoFormulario.campos.pass);
            } else {
                accion = iniciarSesion(estadoFormulario.campos.email, estadoFormulario.campos.pass);
            }
            cambiarError(null);
            cambiarCargando(true);
            try {
                await dispatch(accion);
                props.navigation.navigate('Aplicacion');
            } catch (err) {
                cambiarError(err.message);
                cambiarCargando(false);
            }
        }, [dispatch, registrar,estadoFormulario, crearUsuario, iniciarSesion, cambiarCargando, cambiarError, props.navigation]
    );

    const cambiarTexto = useCallback((idInput, texto, valido) => {
        dispatchActualizar({
            type: ACTUALIZAR,
            valor: texto,
            valido: valido,
            input: idInput,
        });
    }, [dispatchActualizar]);

    useEffect(() => {
        if (error) {
            Alert.alert('Ha Ocurrido un Error', error, [{ text: 'Aceptar' }]);
        }
    }, [error]);


    const repetirContra = () => {
        if (registrar) {
            return (
                <View>
                    <Text style={styles.label}>Repetir Contraseña</Text>
                    <IconInput
                        id="repetir"
                        colorInput={Colores.colorPrincipal}
                        inputStyle={{ marginBottom: 0 }}
                        iconStyle={{ color: Colores.colorPrincipal}}
                        label=""
                        autoCorrect={false}
                        returnKeyType="done"
                        inputRef={ref => { registrar ? this.repetir = ref : '';}}
                        secureTextEntry
                        comparar={estadoFormulario.campos.pass}
                        icono="lock"
                        alCambiarInput={cambiarTexto}
                        error="Ingrese la contraseña"
                        tipoIcono="font-awesome"
                    />
                </View>
            );
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView bounces enableOnAndroid extraScrollHeight={100}>
                <AppHeader style={{ height: 225 }} size={100} />
                <View style={styles.form}>
                    <Text style={styles.label}>E-Mail</Text>
                    <IconInput
                        id="email"
                        colorInput={Colores.colorPrincipal}
                        inputStyle={{ marginBottom: 0, marginTop: 0 }}
                        iconStyle={{ color: Colores.colorPrincipal }}
                        onSubmitEditing={() => this.pass.focus()}
                        keyboardType="email-address"
                        label=""
                        email
                        autoCorrect={false}
                        returnKeyType="next"
                        icono="email"
                        error="Ingrese el e-mail"
                        alCambiarInput={cambiarTexto}
                        tipoIcono="material-community"
                    />
                    <Text style={styles.label}>Contraseña</Text>
                    <IconInput
                        id="pass"
                        colorInput={Colores.colorPrincipal}
                        inputStyle={{ marginBottom: 0 }}
                        inputRef={ref => { this.pass = ref;}}
                        onSubmitEditing={registrar ? () => this.repetir.focus() : () => {}}
                        iconStyle={{ color: Colores.colorPrincipal }}
                        label=""
                        returnKeyType={registrar ? 'next' : 'done'}
                        secureTextEntry
                        autoCorrect={false}
                        error="Ingrese la contraseña"
                        icono="key"
                        alCambiarInput={cambiarTexto}
                        tipoIcono="foundation"
                    />
                    {repetirContra()}
                    <View style={{ marginTop: 30 }}>
                        {cargando ? <ActivityIndicator size="large" color={Colores.colorPrincipal} />
                            : <View>
                                <Button
                                    onPress={enviarFormulario}
                                    title={registrar ? 'Crear Usuario' : 'Iniciar Sesion'}
                                    color={Colores.colorPrincipal}
                                />
                                <TouchableWithoutFeedback onPress={() => {
                                    cambiarRegistrar(estadoAnterior => !estadoAnterior);
                                    if (Platform.OS === 'android') {
                                        if (UIManager.setLayoutAnimationEnabledExperimental) {
                                            UIManager.setLayoutAnimationEnabledExperimental(true);
                                        }
                                    }
                                    LayoutAnimation.easeInEaseOut();
                                }}>
                                    <Text style={styles.subtext}>
                                        {!registrar ?
                                            '¿No tienes una cuenta? ¡Registrate!'
                                            : '¿Ya tienes una cuenta? ¡Inicia Sesion!'}
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>}
                    </View>
                </View>
                </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        marginTop: 20,
        marginLeft: 3,
        fontWeight: 'bold',
        color: Colores.colorPrincipal,
    },
    form: {
        flex: 1,
        margin: 25,
        marginTop: 15,
    },
    subtext: {
        color: Colores.colorPrincipal,
        textDecorationLine: 'underline',
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 16,
    },
});

export { Login };
