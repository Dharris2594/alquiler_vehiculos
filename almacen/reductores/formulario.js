const ACTUALIZAR = 'ACTUALIZAR';

export const reductorFormulario = (estado, accion) => {
    if (accion.type === ACTUALIZAR){
        const camposActualizados = {
            ...estado.campos,
            [accion.input]: accion.valor,
        };
        const validezActualizada = {
            ...estado.validezCampos,
            [accion.input]: accion.valido,
        };
        let formularioValido = true;
        for (const key in validezActualizada) {
            formularioValido = formularioValido && validezActualizada[key];
        }
        return {
            validezFormulario: formularioValido,
            validezCampos: validezActualizada,
            campos: camposActualizados,
        };
    }
    return estado;
};
