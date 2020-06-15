import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { NavegadorApp, NavegadorAlquilados } from './Stacks';
import Colores from '../constantes/Colores';
import { ContenidoDrawer } from '../componentes/App/ContenidoDrawer';
import { Icon } from 'react-native-elements';


const Drawer = createDrawerNavigator({
    principal: {
        screen: NavegadorApp,
        navigationOptions: {
            drawerLabel: 'Alquilar Auto',
            drawerIcon: <Icon name="shopping-cart" type="font-awesome" color={Colores.colorPrincipal}/>,
        },
    },
    alquilados: {
        screen: NavegadorAlquilados,
        navigationOptions: {
            drawerLabel: 'Autos Alquilados',
            drawerIcon: <Icon name="file-document-edit" type="material-community" color={Colores.colorPrincipal}/>,
        },
    },
}, {
    contentComponent: ContenidoDrawer,
    contentOptions: {
        activeTintColor: Colores.colorPrincipal,
        inactiveTintColor: Colores.colorPrincipal,
        inactiveBackgroundColor: 'transparent',
        labelStyle: {
            fontSize: 18,
        },
    },
});

export default Drawer;




