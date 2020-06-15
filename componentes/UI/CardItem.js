import React from 'react';
import { View } from 'react-native';

const CardItem = (props) => (
        <View  style={{...props.style, ...styles.containerStyle}} >
            {props.children}
        </View>
    );

const styles = {
    containerStyle: {
        justifyContent:'center',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 5,
        elevation:5,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        position: 'relative',
    },
};

export { CardItem };
