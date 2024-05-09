import { authSliceType } from '../../types';

const initialState: authSliceType = {
    status: 'checking',
    user: null,
    errorMessage: null
}

const authenticatedState: authSliceType = {
    status: 'authenticated',
    user: {
        uid: 'ABC-123',
        name: 'Juan Test'
    },
    errorMessage: null
}

const notAuthenticatedState: authSliceType = {
    status: 'not-authenticated',
    user: null,
    errorMessage: null
}

export {
    initialState,
    authenticatedState,
    notAuthenticatedState
}