import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = () => {
    const auth = useAuth()
    return auth ? <Outlet /> : <Navigate to={"/signup"} />
}

export default PrivateRoute