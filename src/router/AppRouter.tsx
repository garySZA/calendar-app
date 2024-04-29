import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth/pages';
import { CalendarPage } from '../calendar/pages';

export const AppRouter = () => {
    const authStatus:string = 'authenticated';
    
    return (
        <Routes>
            {
                ( authStatus === 'not-authenticated' )
                    ? <Route path='/auth/*' element={ <LoginPage /> }/>
                    : <Route path='/*' element={ <CalendarPage /> }/>
            }

            <Route path='/*' element={ <Navigate to='/auth/login' /> }/>
        </Routes>
    )
}