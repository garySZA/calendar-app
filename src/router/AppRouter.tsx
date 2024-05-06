import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth/pages';
import { CalendarPage } from '../calendar/pages';
import { TStatus } from '../types';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

export const AppRouter = () => {
    // const authStatus: string = 'not-authenticated';
    const { status, checkAuthToken } = useAuthStore();
    
    useEffect(() => {
        checkAuthToken();
    }, [])
    

    if( status == 'checking' ) return <h3>Cargando...</h3>

    const authStatus: TStatus = status; 

    return (
        <Routes>
            {
                ( authStatus === 'not-authenticated' )
                    ? (
                        <>
                            <Route path='/auth/*' element={ <LoginPage /> }/>
                            <Route path='/*' element={ <Navigate to='/auth/login' /> }/>
                        </>
                    )
                    : (
                        <>
                            <Route path='/' element={ <CalendarPage /> }/>
                            <Route path='/*' element={ <Navigate to='/' /> }/>
                        </>
                    )
            }
        </Routes>
    )
}
