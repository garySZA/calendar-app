import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';
import { EventType } from '../../types';

export const FabAddNew = () => {
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();
    
    const handleClickNew = () => {
        const eventEmpty: EventType = {
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#3aa',
            user: {
                _id: 'XXX',
                name: 'Juan'
            }
        }
        
        setActiveEvent( eventEmpty );
        openDateModal();
    }

    return (
        <button
            className='btn btn-primary fab'
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
