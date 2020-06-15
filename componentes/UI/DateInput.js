import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateInput = props => {

    const [show, setShow] = useState(false);

    const showPicker = () => {
        setShow(true);
    };

    const onChange = (event, selectedValue) => {
        setShow(Platform.OS === 'ios');
        const currentDate = selectedValue || new Date();
        props.alCambiar(currentDate);
    };

    return (
        <TouchableWithoutFeedback onPress={showPicker}>
            <View style={{...styles.contenedor,...props.style}}>
                <Text style={{fontSize:16}}>{
                    props.date.toLocaleDateString()
                }
                </Text>
                <Icon name="calendar" type="font-awesome" size={20} color={props.color} />
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        minimumDate={new Date()}
                        value={props.date}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}

                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        paddingVertical: 10,
        paddingHorizontal:15,
        borderWidth: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export { DateInput };
