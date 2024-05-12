import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';

import { authSlice } from '../../store/auth';
import { authSliceType } from '../../types';
import { authInitialState } from '../../helpers/initialStates';
import { useAuthStore } from '../../hooks';
import { notAuthenticatedState, testUserCredentials } from '../fixtures';
import { calendarApi } from '../../api';

const getMockStore = ( initialState: authSliceType ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Pruebas en useAuthStore', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('Debe de retornar los valores por defecto', () => { 
        const mockStore = getMockStore({ ...authInitialState });

        const { result } = renderHook(  () => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={ mockStore } >
                    { children }
                </Provider>
            )
        });

        expect(result.current).toEqual({
            errorMessage: null,
            status: 'checking',
            user: null,
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),
        });
    });

    test('startLogin debe de realizar el login correctamente', async () => { 
        
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={ mockStore } >
                    { children }
                </Provider>
            )
        });

        await act( async () => {
            await result.current.startLogin( testUserCredentials );
        });
        
        const { errorMessage, status, user } = result.current;
        expect({  errorMessage, status, user}).toEqual({
            errorMessage: null,
            status: 'authenticated',
            user: { name: 'Test User', uid: '663cfbcbf662fb0cc1b82eb7' }
        });

        expect( localStorage.getItem('token') ).toEqual( expect.any( String ) );
        expect( localStorage.getItem('token-init-date') ).toEqual( expect.any( String ) );
    });

    test('startLogin debe de fallar la autenticación', async () => { 
        
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={ mockStore } >
                    { children }
                </Provider>
            )
        });

        await act( async () => {
            await result.current.startLogin({ email: 'fail@google.com', password: '10101010' });
        });

        const { errorMessage, status, user } = result.current;
        
        expect( localStorage.getItem('token') ).toBeNull();
        expect({errorMessage, status, user}).toEqual({
            errorMessage: 'Credenciales incorrectas',
            status: 'not-authenticated',
            user: null
        });

        waitFor(
            () => expect( result.current.errorMessage ).toBeUndefined()
        );
    });

    test('startRegister debe de crear un usuario', async () => { 
        const newUser = { email: 'algo@google.com', password: '10101010', name: 'Test User 2' }
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={ mockStore } >
                    { children }
                </Provider>
            )
        });

        const spy = jest.spyOn( calendarApi, 'post').mockReturnValue(
            Promise.resolve({
                data: {
                    ok: true,
                    user: {
                        _id: '12345',
                        name: 'Test User 2',
                    },
                }

            }) as Promise<any>    
        )

        await act( async () => {
            await result.current.startRegister( newUser );
        });

        const { errorMessage, status, user } = result.current;
        
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: null,
            status: 'authenticated',
            user: { name: 'Test User 2', uid: '12345' }
        });

        spy.mockRestore();
    });

    test('startRegister debe de fallar la creación', async () => { 
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={ mockStore } >
                    { children }
                </Provider>
            )
        });

        await act( async () => {
            await result.current.startRegister( testUserCredentials );
        });

        const { errorMessage, status, user } = result.current;
        
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'El email ya existe <br/>',
            status: 'not-authenticated',
            user: null
        });
    });

    test('checkAuthToken debe de fallar si no hay token', async () => { 
        const mockStore = getMockStore({ ...authInitialState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={ mockStore } >
                    { children }
                </Provider>
            )
        });

        await act( async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: null,
            status: 'not-authenticated',
            user: null
        });
    });

    test('checkAuthToken debe de autenticar el usuario si hay un token', async () => { 
        const { data } = await calendarApi.post('/auth/login', testUserCredentials);
        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({ ...authInitialState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={ mockStore } >
                    { children }
                </Provider>
            )
        });

        await act( async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: null,
            status: 'authenticated',
            user: { name: 'Test User', uid: '663cfbcbf662fb0cc1b82eb7' }
        });
    });
});