import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import { RootState } from '../store'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar';
import { EventType } from '../types';
import { useAppDispatch, useAppSelector } from './useRedux'

export const useCalendarStore = () => {
    const { events, activeEvent } = useAppSelector(( state: RootState ) => state.calendar );
    const { user } = useAppSelector(( state: RootState ) => state.auth );
    const dispatch = useAppDispatch();
    
    const setActiveEvent = ( calendarEvent: EventType ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async ( calendarEvent: EventType ) => {
        try {
            if( calendarEvent.id ){
                //* Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
    
                dispatch( onUpdateEvent( {...calendarEvent, user} ) );
                return;
            }
            //* Creando
            const { data } = await calendarApi.post('/events', calendarEvent)
    
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user: { name: user?.name, _id: user?.uid } }) )
            
        } catch (error: any) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${ activeEvent?.id }`);

            dispatch( onDeleteEvent() );
        } catch (error: any) {
            console.log(error);
            Swal.fire('Error al eliminar', 'El evento no pudo ser eliminado, intenta mas tarde', 'error');
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.events );
            
            dispatch( onLoadEvents( events ) );
        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error);
        }
    }

    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Métodos
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}