import { AGREGAR_RESERVA, EXPANDIR_RESERVA, OBTENER_RESERVAS } from '../acciones/reservas';
import Reserva from '../../clases/Reserva';

const estadoInicial = {
    reservas: [],
    reservaExpandida: null,
};

const reservasReductor = (estado = estadoInicial, accion) => {
    switch (accion.type) {
        case OBTENER_RESERVAS:
            return {
                reservas: accion.reservas,
            };
        case AGREGAR_RESERVA:
            const nuevaReserva = new Reserva(
                accion.reserva.id,
                accion.reserva.idAuto,
                accion.reserva.fechaInicial,
                accion.reserva.fechaFinal,
                accion.reserva.alquiler,
                accion.reserva.seguro,
                accion.reserva.ibtms,
                accion.reserva.total,
            );
            return { ...estado, reservas: estado.reservas.concat(nuevaReserva) };
        case EXPANDIR_RESERVA:
            if (accion.reserva === estado.reservaExpandida) {
                return { ...estado, reservaExpandida: null };
            }
            return { ...estado, reservaExpandida: accion.reserva };
        default:
            return estado;
    }
};

export default reservasReductor;
