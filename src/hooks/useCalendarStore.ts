import { RootState } from '../store'
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar';
import { EventType } from '../types';
import { useAppDispatch, useAppSelector } from './useRedux'

export const useCalendarStore = () => {
    const { events, activeEvent } = useAppSelector(( state: RootState ) => state.calendar );
    const dispatch = useAppDispatch();
    
    const setActiveEvent = ( calendarEvent: EventType ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async ( calendarEvent: EventType ) => {
        // Todo: llegar al backend

        // Todo exitoso
        if( calendarEvent._id ){
            //* Actualizando
            dispatch( onUpdateEvent( {...calendarEvent} ) );

        } else {
            //* Creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
        }
    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() );
    }

    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent
    }
}