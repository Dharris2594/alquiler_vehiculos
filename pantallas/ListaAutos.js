import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { CustomHeaderButton } from '../componentes/UI';
import { ElementoLista } from '../componentes/App';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { obtenerAutos } from '../almacen/acciones/autos';
import Colores from '../constantes/Colores';
import { autenticar } from '../almacen/acciones/login';

const ListaAutos = props => {
  const [cargando, setCargando] = useState(false);
  const [errorExistente, setError] = useState(false);
  const listaAutos = useSelector(estado => estado.autos.autos);
  const dispatch = useDispatch();

  const cargarDatos = useCallback(async () => {
    setError(null);
    setCargando(true);
    try {
      await dispatch(obtenerAutos());
    } catch (error) {
      setError(true);
    }
    setCargando(false);
  }, [dispatch, setCargando, setError]);


  useEffect(() => {
    cargarDatos();
  }, [dispatch, cargarDatos]);


  const crearElementoLista = (auto) => {
    return (
      <ElementoLista
        auto={auto.item}
        alSeleccionar={() => {
          props.navigation.navigate({
            routeName: ('DatosReserva'),
            params: {
              url: auto.item.urlImagen,
              id: auto.item.id,
              precio: auto.item.precio,
            },
          });
        }} />
    );
  };

  if (cargando) {
    return <View style={styles.centrado}>
      <ActivityIndicator size="large" color={Colores.colorPrincipal} />
    </View>;
  }

  if (errorExistente) {
    return <View style={styles.centrado}>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>Ha ocurrido un error cargando los datos</Text>
      <Button title="Intentar Nuevamente" color={Colores.colorPrincipal} onPress={cargarDatos} />
    </View>;
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={listaAutos}
        renderItem={crearElementoLista}
      />
    </View>
  );
};

ListaAutos.navigationOptions = data => {
  return {
    headerTitle: 'Listado de Autos',
    headerLeft: () =>
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item iconName="menu" onPress={() => { data.navigation.toggleDrawer(); }} />
      </HeaderButtons >,
  };
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  centrado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { ListaAutos };
