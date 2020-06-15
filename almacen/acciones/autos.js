import Auto from '../../clases/Auto';

export const OBTENER_AUTOS = 'OBTENER_AUTOS';

export const obtenerAutos = () => {
    return async dispatch => {
        try {
            const respuesta = await fetch('https://alquilerautos-8360d.firebaseio.com/autos.json');

            if (!respuesta.ok){
                throw new Error('¡Hubo un error!');
            }

            const resData = await respuesta.json();
            const autosCargados = [];
            for (const key in resData) {
                autosCargados.push(
                    new Auto(
                        key,
                        resData[key].marca,
                        resData[key].modelo,
                        resData[key].precio,
                        resData[key].asientos,
                        resData[key].puertas,
                        resData[key].transmision,
                        resData[key].urlImagen,
                    )
                );
            }
            dispatch({
                type: OBTENER_AUTOS,
                autosCargados: autosCargados,
            });
        } catch (error) {
            throw error;
        }
    };
};
