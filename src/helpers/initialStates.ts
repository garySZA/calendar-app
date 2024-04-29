import { addHours } from 'date-fns';
import { calendarSliceType, uiSliceType } from '../types';

export const uiInitialState: uiSliceType = {
    isDateModalOpen: false
}

export const calendarInitialState: calendarSliceType = {
    events: [
        {
            title: 'Cumpleaños del jefe',
            notes: 'hay que comprar el pastel',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Fernando'
            }
        }
    ],
    activeEvent: null
}