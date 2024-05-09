import { createSlice } from '@reduxjs/toolkit';
import { calendarInitialState, calendarInitialState as initialState } from '../../helpers';
import { EventType } from '../../types';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: ( state, { payload } ) => {
            state.activeEvent = payload;
        },

        onAddNewEvent: ( state, { payload } ) => {
            state.events.push( payload );
            state.activeEvent = null;
        },

        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if( event.id === payload.id ) {
                    return payload;
                };

                return event;
            })
        },

        onDeleteEvent: ( state ) => {
            if( state.activeEvent ){
                state.events = state.events.filter( event => event.id !== state.activeEvent?.id );
                state.activeEvent = null;
            }
        },

        onLoadEvents: ( state, { payload } ) => {
            state.isLoadingEvents = false;
            
            payload.forEach( ( event: EventType ) => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );

                if( !exists ) state.events.push( event );
            });
        },

        onLogoutCalendar: ( state ) => {
            state.isLoadingEvents = calendarInitialState.isLoadingEvents;
            state.events = calendarInitialState.events;
            state.activeEvent = calendarInitialState.activeEvent;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions;