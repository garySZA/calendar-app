import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from '../../../store/calendar';
import { EventType } from '../../../types';
import { calendarWithActiveEventState, calendarWithEventsState, events, initialStateCalendar } from '../../fixtures';

describe('Pruebas en calendarSlice', () => { 
    test('Debe de regresar el estado por defecto', () => { 
        const state = calendarSlice.getInitialState();

        expect( state ).toEqual( initialStateCalendar );
    });

    test('onSetActiveEvent debe de activar el evento', () => { 
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );

        expect( state.activeEvent ).toEqual( events[0] );
    });

    test('onAddNewEvent debe de agregar el evento', () => { 
        const newEvent: EventType = {
            id: 3,
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
            title: 'Empezar con Nest',
            notes: 'empezar con el curso de nest'
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );

        expect( state.events ).toEqual([...events, newEvent]);
    });

    test('onUpdateEvent debe de actualizar el evento', () => { 
        const updatedEvent: EventType = {
            id: 1,
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
            title: 'Empezar con Nest actualizado',
            notes: 'empezar con el curso de nest actualizado'
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ) );

        expect( state.events ).toContain( updatedEvent );
    });

    test('onDeleteEvent debe de borrar el evento activo', () => { 
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );

        expect( state.events ).not.toContain( events[0] );
        expect( state.activeEvent ).toBeNull(); 
    });

    test('onLoadEvents debe de establecer los eventos', () => { 
        const state = calendarSlice.reducer( initialStateCalendar, onLoadEvents( events ) );

        expect( state.events ).toEqual( events );
        expect( state.events.length ).toEqual( events.length );
        expect( state.activeEvent ).toBeNull();
        expect( state.isLoadingEvents ).toBeFalsy();

        const newState = calendarSlice.reducer(state, onLoadEvents( events ));
        expect( newState.events.length ).toBe( events.length );
    });

    test('onLogoutCalendar debe de limpiar el estado', () => { 
        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );

        expect( state ).toEqual( initialStateCalendar); 
    });
});