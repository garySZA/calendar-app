import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { AppRouter } from "../../router";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../calendar/pages/CalendarPage";

jest.mock('../../hooks/useAuthStore');

jest.mock('../../calendar/pages/CalendarPage', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))

describe('Pruebas en <AppRouter />', () => { 
    const mockCheckAuthToken = jest.fn();

    beforeEach(() => jest.clearAllMocks());
    
    test('Debe de mostrar la pantalla de carga y llamar checkAuthToken', () => { 
        (useAuthStore as jest.Mock).mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render(<AppRouter/>);
        
        expect( screen.getByText('Cargando...') ).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled(); 
    });

    test('Debe de mostrar el login en caso de no estar autenticado', () => { 
        (useAuthStore as jest.Mock).mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        const { container } = render(
            <MemoryRouter initialEntries={['/auth/login']}>
                <AppRouter/>
            </MemoryRouter>
        );

        expect( screen.getByText('Ingreso') ).toBeTruthy();
        expect( container ).toMatchSnapshot();
    });

    test('Debe de mostrar el calendario si se esta autenticado', () => { 
        (useAuthStore as jest.Mock).mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter >
                <AppRouter/>
            </MemoryRouter>
        );
        
        expect( screen.getByText('CalendarPage') ).toBeTruthy();  
    });
});