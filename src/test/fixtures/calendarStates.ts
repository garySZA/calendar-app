import { EventType, calendarSliceType } from '../../types';

export const events: EventType[] = [
    {
        id: 1,
        title: 'Cumpleaños de jhoan',
        notes: 'Description 1',
        start: new Date('2024-04-07 13:00:00'),
        end: new Date('2024-04-07 15:00:00'),
        bgColor: '#fafafa',
        user: {
            _id: '123',
            name: 'User Tester',
        },
    },
    {
        id: 2,
        title: 'Cumpleaños de selena',
        notes: 'Description 1',
        start: new Date('2024-08-26 13:00:00'),
        end: new Date('2024-08-26 15:00:00'),
        bgColor: '#fafafa',
        user: {
            _id: '123',
            name: 'User Tester',
        },
    },
]

export const initialStateCalendar: calendarSliceType = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
}

export const calendarWithEventsState: calendarSliceType = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null,
}

export const calendarWithActiveEventState: calendarSliceType = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0] },
}