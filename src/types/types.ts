export type TUser = {
    uid: string;
    name: string;
}

export type EventType = {
    _id?: number;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor?: `#${string}`
    user?: {
        _id: string;
        name: string;
    }
}

export type uiSliceType = {
    isDateModalOpen: boolean
}

export type calendarSliceType = {
    events: EventType[];
    activeEvent: EventType | null;
}

export type TStatus = 'checking' | 'authenticated' | 'not-authenticated';

export type authSliceType = {  
    status: TStatus,
    user: TUser | null,
    errorMessage: string | null
}

