import { createSlice } from '@reduxjs/toolkit';
import { authInitialState as initialState } from '../../helpers/initialStates';

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user = null;
            state.errorMessage = null;
        },

        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = null;
        },

        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = null;
            state.errorMessage = payload;
        },

        clearErrorMessage: (state) => {
            state.errorMessage = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;