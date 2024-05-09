import { calendarApi } from '../../api';

describe('Pruebas en CalendarApi', () => { 
    const token = 'ABC-123';
    
    test('Debe de tener la configuración por defecto', () => { 
        
        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );
    });

    test('Debe de tener el x-token en el header de todas las peticiones', async () => { 
        localStorage.setItem('token', token);

        const response = await calendarApi.get('/auth')
            .then( res => res )
            .catch( res => res );

        expect( response.config.headers['x-token'] ).toBe( token ); 
    });
});