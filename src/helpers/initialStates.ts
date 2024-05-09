// import { addHours } from 'date-fns';
import { authSliceType, calendarSliceType, uiSliceType } from '../types';

export const uiInitialState: uiSliceType = {
    isDateModalOpen: false
}

export const calendarInitialState: calendarSliceType = {
    isLoadingEvents: true,
    events: [
        // {
        //     title: 'Cumpleaños del jefe',
        //     notes: 'hay que comprar el pastel',
        //     start: new Date(),
        //     end: addHours( new Date(), 2 ),
        //     bgColor: '#fafafa',
        //     user: {
        //         _id: '123',
        //         name: 'Fernando'
        //     }
        // }
    ],
    activeEvent: null
}

export const authInitialState: authSliceType = {
    status: 'checking',
    user: null,
    errorMessage: null
}