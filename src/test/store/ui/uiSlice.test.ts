import { uiInitialState } from '../../../helpers';
import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../store/ui';

describe('Pruebas en uiSlice', () => { 
    test('Debe de regresar el estado por defecto', () => { 

        expect( uiSlice.getInitialState() ).toEqual( uiInitialState );
    });

    test('Debe de cambiar el isDateModalOpen correctamente', () => { 
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(  state, onOpenDateModal());

        expect( state.isDateModalOpen ).toBeTruthy();
        
        state = uiSlice.reducer(state, onCloseDateModal());
        expect( state.isDateModalOpen ).toBeFalsy();
    });
});