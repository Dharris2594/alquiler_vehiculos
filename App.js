/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import NavegadorPrincipal from './navegacion/NavegadorPrincipal';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import autosReductor from './almacen/reductores/autos';
import reservasReductor from './almacen/reductores/reservas';
import loginReductor from './almacen/reductores/login';

const reductorPrincipal = combineReducers({
  autos : autosReductor,
  reservas: reservasReductor,
  login: loginReductor,
});

const almacen = createStore(reductorPrincipal, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={almacen}>
      <StatusBar backgroundColor="#4682B4" translucent={true} />
      <NavegadorPrincipal/>
    </Provider>
  );
}




