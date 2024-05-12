import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { useUiStore } from '../../hooks';
import { uiSlice } from '../../store/ui';
import { uiSliceType } from '../../types';
import { act } from 'react-dom/test-utils';

const getMockStore = ( initialState: uiSliceType ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    });
}

describe('Pruebas en useUiStore', () => { 
    test('Debe de regresar los valores por defecto', () => { 
        const mockStore = getMockStore({ isDateModalOpen: false });
        
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => ( 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
            )
        });

        expect( result.current ).toEqual({
            isDateModalOpen: false,
            openDateModal:  expect.any( Function ),
            closeDateModal: expect.any( Function ),
            toggleDateModal: expect.any( Function ),
        });
    });

    test('openDateModal debe de colocar true en el isDateModalOpen', () => { 
        const mockStore = getMockStore({ isDateModalOpen: false });
        
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => ( 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
            )
        });

        const { openDateModal } = result.current;

        act(() => {
            openDateModal();
        });

        expect(  result.current.isDateModalOpen).toBeTruthy();
    });

    test('closeDateModal debe de colocar false en isDateModalOpen', () => { 
        const mockStore = getMockStore({ isDateModalOpen: false });
        
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => ( 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
            )
        });

        act(() => {
            result.current.closeDateModal();
        });

        expect(  result.current.isDateModalOpen ).toBeFalsy();
    });

    test('toggleDateModal debe de cambiar el estado respectivamente', () => { 
        const mockStore = getMockStore({ isDateModalOpen: true });
        
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => ( 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
            )
        });

        act(() => {
            result.current.toggleDateModal();
        });
        
        expect(  result.current.isDateModalOpen ).toBeFalsy();
        
        act(() => {
            result.current.toggleDateModal();
        });
        expect(  result.current.isDateModalOpen ).toBeTruthy();
    });


});