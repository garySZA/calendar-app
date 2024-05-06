import { useEffect, useMemo, useState } from 'react';
import { IForm } from '../types';


type FormValidation = [( value: string ) => boolean, string];

export const useForm = <T extends IForm> ( 
    initialForm: T, 
    formValidations?: Record<keyof T, FormValidation> ) => {

    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState<Record<string, string | null>>({});

    useEffect(() => {
        createValidators();
    }, [ formState ]);

    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])
    
    
    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys( formValidation )) {
            if( formValidation[ formValue ] !== null ) return false;
        }

        return true;
    }, [ formValidation ]);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues: Record<string, string | null> = {};

        if( formValidations ){
            for (const formField of Object.keys( formValidations )) {
                const [ fn, errorMessage='Este campo es requerido' ] = formValidations[ formField ];
    
                formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
            }
        }

        setFormValidation( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}