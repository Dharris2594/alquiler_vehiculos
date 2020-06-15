import Reserva from '../../clases/Reserva';
export const AGREGAR_RESERVA = 'AGREGAR_RESERVA';
export const EXPANDIR_RESERVA = 'EXPANDIR_RESERVA';
export const OBTENER_RESERVAS = 'OBTENER_RESERVAS';

export const obtenerReservas = () => {
    return async (dispatch, getState) => {
        const user = getState().login.idUsuario;
        try {
            const respuesta = await fetch('https://alquilerautos-8360d.firebaseio.com/reservas/' + user + '.json');
            if (!respuesta.ok) {
                throw new Error('¡Hubo un error!');
            }
            const resData = await respuesta.json();
            const reservasCargadas = [];
            for (const key in resData) {
                reservasCargadas.push(
                    new Reserva(
                        key,
                        resData[key].idAuto,
                        resData[key].fechaInicial,
                        resData[key].fechaFinal,
                        resData[key].alquiler,
                        resData[key].seguro,
                        resData[key].ibtms,
                        resData[key].total
                    )
                );
            }
            dispatch({
                type: OBTENER_RESERVAS,
                reservas: reservasCargadas,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const agregarReserva = (reserva) => {
    return async (dispatch, getState) => {
        const user = getState().login.idUsuario;
        let link = user;
        if (user === null) {
            link = 'NoRegistrado';
        }
        try {
            const respuesta = await fetch(
                'https://alquilerautos-8360d.firebaseio.com/reservas/' + link + '.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idAuto: reserva.idAuto,
                        fechaInicial: reserva.fechaInicial,
                        fechaFinal: reserva.fechaFinal,
                        alquiler: reserva.alquiler,
                        seguro: reserva.seguro,
                        ibtms: reserva.ibtms,
                        total: reserva.total,
                    }),
                });
            if (!respuesta.ok) {
                throw new Error('¡Hubo un error!');
            }
            const resData = await respuesta.json();
            reserva.id = resData.name;
            dispatch({
                type: AGREGAR_RESERVA,
                reserva: reserva,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const expandirReserva = (id) => {
    return {
        type: EXPANDIR_RESERVA,
        reserva: id,
    };
};

