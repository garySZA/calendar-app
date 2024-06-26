import { EventType } from "../../types";

interface Props {
    event: EventType
}

export const CalendarEvent = ({ event }: Props) => {
    const { title, user } = event;
    
    return (
        <>
            <strong>{ title }</strong>
            <span> - { user?.name }</span>
        </>
    )
}   
