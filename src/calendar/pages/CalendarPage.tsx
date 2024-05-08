import { useEffect, useState } from 'react';
import { Calendar, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, Navbar, CalendarModal, FabAddNew, FabDelete } from '../components';
import { localizer, getMessagesES } from '../../helpers';
import { EventType } from '../../types';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {
    const { user } = useAuthStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const { openDateModal } = useUiStore();
    const [lastView, setLastView] = useState<View>(() => {
        const storedView = localStorage.getItem( 'lastView' );
        return storedView as View || 'week';
    });

    const eventStyleGetter = ( event: EventType ) => {
        const isMyEvent = user?.uid === event.user?._id;

        const style = {
            backgroundColor: isMyEvent ? '#347cf7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const onDoubleClick = () => {
        openDateModal();
    }

    const onSelect = (event: EventType) => {
        setActiveEvent( event );
    }

    const onViewChanged = ( event: string ) => {
        localStorage.setItem('lastView', event);
        setLastView( event as View );
    }
    
    useEffect(() => {
        startLoadingEvents();
    }, []);
    

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={ localizer }
                events={ events }
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={ getMessagesES() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />

            <CalendarModal />

            <FabAddNew />
            <FabDelete />
        </>
    )
}
