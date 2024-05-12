import { RootState } from '../store';
import { onCloseDateModal, onOpenDateModal } from '../store/ui';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useUiStore = () => {
    const { isDateModalOpen } = useAppSelector(( state: RootState ) => state.ui );
    const dispatch = useAppDispatch();

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    const toggleDateModal = () => {
        ( isDateModalOpen )
        ? closeDateModal()
        : openDateModal();
    }

    return {
        //* Propiedades
        isDateModalOpen,

        //* Métodos
        openDateModal,
        closeDateModal,
        toggleDateModal
    }
}