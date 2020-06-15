import { createStackNavigator } from 'react-navigation-stack';
import { FormularioAlquiler, ListaAutos, DatosReserva, Confirmacion, AutosAlquilados } from '../pantallas';
import Colores from '../constantes/Colores';


export const NavegadorApp = createStackNavigator(
    {
        ListaAutos: {
            screen: ListaAutos,
        },
        DatosReserva: {
            screen: DatosReserva,
        },
        FormularioAlquiler: {
            screen: FormularioAlquiler,
        },
        Confirmacion: {
            screen: Confirmacion,
        },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colores.colorPrincipal,
            },
            headerTintColor: 'white',
        },
    }
);

export const NavegadorAlquilados = createStackNavigator(
    {
        autosAlquilados: {
            screen: AutosAlquilados,
        },

    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colores.colorPrincipal,
            },
            headerTintColor: 'white',
        },
    }
);



