import { fireEvent, render, screen } from '@testing-library/react';

import { FabDelete } from '../../../calendar/components';
import { useCalendarStore } from '../../../hooks';

jest.mock('../../../hooks/useCalendarStore');

describe('Pruebas en <FabDelete />', () => { 
    const mockStartDeletingEvent = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar el componente correctamente', () => { 
        ( useCalendarStore as jest.Mock ).mockReturnValue({
            hasEventDeleted: false
        });
        
        render( <FabDelete /> );

        const btn = screen.getByLabelText('btn-delete');

        expect( btn.classList ).toContain('btn');
        expect( btn.classList ).toContain('btn-danger');
        expect( btn.classList ).toContain('fab-danger');
        expect( btn.style.display ).toBe('none');
    });

    test('Debe de llamar startDeletingEvent si hay evento activo', () => { 
        ( useCalendarStore as jest.Mock ).mockReturnValue({
            hasEventDeleted: true,
            startDeletingEvent: mockStartDeletingEvent
        });
        
        render( <FabDelete /> );

        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click( btn );

        expect( mockStartDeletingEvent ).toHaveBeenCalledWith();
    });
});