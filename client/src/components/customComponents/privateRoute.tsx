import { useAppSelector } from '@/store/store';
import React, { ReactNode } from 'react'
import { Navigate } from 'react-router';
import Loading from './loading';

type Props = {
    children:ReactNode
}

function PrivateRoute({children}: Props) {
    const isLoading = useAppSelector((state) => state.userSlice.isLoading);  
    const user = useAppSelector((state) => state.userSlice.user);  
    if (isLoading) {
        return <Loading/>
    }
    return user ? children : <Navigate to="/sign-in" />;  
}

export default PrivateRoute