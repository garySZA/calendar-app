
import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../store/auth';
import { authenticatedState, initialState, testUserCredentials } from '../../fixtures';

describe('Pruebas en authSlice', () => { 
    test('Debe de regresar el estado por defecto', () => { 

        expect( authSlice.getInitialState() ).toEqual( initialState );
    });

    test('Debe de realizar el login', () => { 
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );

        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: null
        });
    });

    test('Debe de realizar el logout', () => { 
        const state = authSlice.reducer( authenticatedState, onLogout( null ) );

        expect( state ).toEqual({
            status: 'not-authenticated',
            user: null,
            errorMessage: null
        });
    });

    test('Debe de realizar el logout con un mensaje de error', () => { 
        const errorMessage = 'Credenciales no validas';
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );

        expect( state ).toEqual({
            status: 'not-authenticated',
            user: null,
            errorMessage: errorMessage
        });
    });

    test('Debe de limpiar el mensaje de error', () => { 
        const errorMessage = 'Credenciales no validas';
        let state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );

        state = authSlice.reducer( state, clearErrorMessage() );
        
        expect( state.errorMessage ).toBe( null );
    });
});