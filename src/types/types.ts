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