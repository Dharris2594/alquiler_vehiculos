import {  OBTENER_AUTOS } from '../acciones/autos';

const estadoInicial = {
    autos: [],
};


const autosReductor = (estado = estadoInicial, accion) => {
    switch (accion.type) {
        case OBTENER_AUTOS:
        return {
            autos: accion.autosCargados,
        };
        default: {
            return estado;
        }
    }
};

export default autosReductor;
