import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import Drawer from '../navegacion/Drawer';
import { Login, PantallaInicio } from '../pantallas';
import React from 'react';
import { Transition } from 'react-native-reanimated';


const NavegadorPrincipal = createAnimatedSwitchNavigator({
    Inicio: PantallaInicio,
    Aplicacion: Drawer,
    PantallaLogin: Login,
},
{
    transition: (
        <Transition.In
          type="fade"
          durationMs={400}
        />
    ),
  });

export default createAppContainer(NavegadorPrincipal);
