import { useAppDispatch, useAppSelector } from './useRedux';

import { RootState } from '../store';
import {calendarApi} from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth';
import { IErrorField } from '../types/interfaces';
import { onLogoutCalendar } from '../store/calendar';

export const useAuthStore = () => {
    const { status, user, errorMessage } = useAppSelector(( state: RootState ) => state.auth )
    const dispatch = useAppDispatch();

    const startLogin = async ({ email, password }: { email: string, password: string }) => {
        dispatch( onChecking() );

        try {
            const { data } = await calendarApi.post('/auth/login', { email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas') );

            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async({ name, email, password }: { name: String, email: string, password: string }) => {
        dispatch( onChecking() );

        try {
            const { data } = await calendarApi.post('/auth/register', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch( onLogin({ name: data.user.name, uid: data.user._id }) );
        } catch (error: any) {
            let errors:string = '';
            
            error.response.data.errors.forEach( (element: IErrorField) => {
                errors += `${element.msg} <br/>`
            });
            
            dispatch( onLogout( errors || '--') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');

        if( !token ) return dispatch( onLogout(null) );

        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch(  onLogoutCalendar() );
            dispatch( onLogout(null) );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout(null) );
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //*Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}