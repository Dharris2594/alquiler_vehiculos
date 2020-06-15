import React, { useReducer, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const CAMBIAR_INPUT = 'CAMBIAR_INPUT';
const PERDER_FOCO = 'PERDER_FOCO';

const reductorInput = (estado, accion) => {
    switch (accion.type) {
        case CAMBIAR_INPUT:
            return {
                ...estado,
                valor: accion.valor,
                valido: accion.esValido,
            };
        case PERDER_FOCO:
            return {
                ...estado,
                tocado: true,
            };
        default:
            return estado;
    }
};

const IconInput = props => {
    const [estadoInput, dispatch] = useReducer(reductorInput, {
        valor: '',
        valido: false,
        tocado: false,
    });

    const [mensaje, aplicarMensaje] = useState(props.error);

    const { alCambiarInput, id } = props;

    useEffect(() => {
        if (estadoInput.tocado) {
            alCambiarInput(id, estadoInput.valor, estadoInput.valido);
        }
    }, [estadoInput, alCambiarInput, id]);

    const cambiarTexto = texto => {
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let cedulaReg = /^[0-9]{1,2}-[0-9]{1,4}-[0-9]{1,5}$/;
        let soloLetrasReg = /^[a-zA-Z]*$/;
        let telefonoReg = /^[0-9]{3,4}-[0-9]{4}$/;
        let valido = true;
        if (texto.trim().length === 0) {
            aplicarMensaje(props.error);
            valido = false;
        }
        else if (props.comparar && props.comparar !== texto) {
            aplicarMensaje('Las contraseñas no coinciden');
            valido = false;
        }

        else if (props.email && emailReg.test(texto) === false) {
            aplicarMensaje('Email inválido');
            valido = false;
        }

        else if (props.cedula && cedulaReg.test(texto) === false) {
            aplicarMensaje('Cedula inválida');
            valido = false;
        }
        else if (props.soloLetras && soloLetrasReg.test(texto) === false) {
            aplicarMensaje('Solo debe contener letras');
            valido = false;
        }
        else if (props.telefono && telefonoReg.test(texto) === false) {
            aplicarMensaje('Numero de Teléfono Inválido');
            valido = false;
        }
        dispatch({ type: CAMBIAR_INPUT, valor: texto, esValido: valido });
    };

    const validarInput = () => {
        dispatch({ type: PERDER_FOCO });
    };

    return (
        <View style={styles.contenedor}>
            <View style={{
                ...styles.input, ...props.inputStyle,
                borderBottomColor: estadoInput.tocado && !estadoInput.valido ? 'red' : 'grey',
            }}>
                <TextInput {...props}
                    style={styles.textInput}
                    placeholder={props.label}
                    onChangeText={cambiarTexto}
                    ref={props.inputRef}
                    placeholderTextColor="gray"
                    onBlur={validarInput}
                    value={estadoInput.valor}
                />
                <Icon
                    style={{ marginBottom: 10, marginRight: 7.5 }}
                    name={props.icono} type={props.tipoIcono}
                    size={20}
                    iconStyle={{ color: props.colorInput }}
                />
            </View>
            {!estadoInput.valido && estadoInput.tocado && <Text style={{ color: 'red' }}>
                {mensaje}
            </Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {

    },
    input: {
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
    },
    textInput: {
        fontSize: 15,
        flex: 1,
    },
});


export { IconInput };
