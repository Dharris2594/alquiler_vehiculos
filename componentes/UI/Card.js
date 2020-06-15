import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor:'white',
        elevation: 5,
        paddingHorizontal: 10,
        paddingVertical:15,
        marginHorizontal: 10,
        marginVertical: 10,
    },
});

export { Card };
