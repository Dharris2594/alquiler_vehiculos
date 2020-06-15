import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';


const IconoTexto = props => {
    return (
        <View style={styles.contenedor}>
            <Icon name={props.icono} type={props.tipoIcono} size={20}  iconStyle={{...props.iconStyle}}/>
            <Text style={{...styles.label, ...props.style}}>{props.texto}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flexDirection: 'row',
        marginVertical: 7.5,
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        marginLeft: 7.5,
    },
});

export { IconoTexto };
