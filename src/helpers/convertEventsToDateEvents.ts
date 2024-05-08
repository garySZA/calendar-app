import { formatISO, parseISO } from 'date-fns';
import { EventType } from '../types';

export const convertEventsToDateEvents = ( events: EventType[] ) => {
    return events.map( event => {
        event.start = parseISO(formatISO(event.start));
        event.end = parseISO(formatISO(event.end));

        return event;
    });
}