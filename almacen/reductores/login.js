import { AUTENTICAR, CERRAR_SESION} from '../acciones/login';

const estadoInicial = {
    idUsuario: null,
};

const loginReductor = (estado = estadoInicial, accion) => {
    switch (accion.type) {
        case AUTENTICAR:
            return {
                idUsuario: accion.idUsuario,
            };
        case CERRAR_SESION: {
            return estadoInicial;
        }
        default:
            return estado;
    }
};

export default loginReductor;


