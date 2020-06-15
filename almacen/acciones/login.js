import AsyncStorage from '@react-native-community/async-storage';
export const AUTENTICAR = 'AUTENTICAR';
export const CERRAR_SESION = 'CERRAR_SESION';

export const autenticar = (idUsuario) => {
    return {
        type: AUTENTICAR,
        idUsuario: idUsuario,
    };
};

export const crearUsuario = (email, pass) => {
    return async dispatch => {
        try {
            const respuesta = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2f6_YBdzTMwcAU1yJ7153GDIg3YBqy9o',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: pass,
                        returnSecureToken: true,
                    }),
                }
            );
            if (!respuesta.ok) {
                const errorData = await respuesta.json();
                const errorId = errorData.error.message;
                let mensaje = 'Hubo un error al crear el usuario';
                if (errorId === 'EMAIL_EXISTS') {
                    mensaje = 'Este E-mail ya esta tomado';
                }
                if (errorId === 'WEAK_PASSWORD : Password should be at least 6 characters') {
                    mensaje = 'La contraseña debe tener 6 o más caracteres';
                }
                throw new Error(mensaje);
            }
            const resData = await respuesta.json();
            dispatch(autenticar(resData.localId));
            guardarID(resData.localId);
        } catch (error) {
            throw error;
        }
    };
};

export const iniciarSesion = (email, pass) => {
    return async dispatch => {
        try {
            const respuesta = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2f6_YBdzTMwcAU1yJ7153GDIg3YBqy9o',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: pass,
                        returnSecureToken: true,
                    }),
                }
            );
            if (!respuesta.ok) {
                const errorData = await respuesta.json();
                const errorId = errorData.error.message;
                let mensaje = 'Hubo un error al iniciar sesion';
                if (errorId === 'EMAIL_NOT_FOUND') {
                    mensaje = 'No se encontro este email';
                } else if (errorId === 'INVALID_PASSWORD') {
                    mensaje = 'Contraseña Incorrecta';
                }
                throw new Error(mensaje);
            }
            const resData = await respuesta.json();
            dispatch(autenticar(resData.localId));
            guardarID(resData.localId);
        } catch (error) {
            throw error;
        }
    };
};

export const cerrarSesion = () => {
    return {
        type: CERRAR_SESION,
    };
};


const guardarID = async (idUsuario) => {
    await AsyncStorage.setItem('id', idUsuario);
};

