import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateComponents() {
    const user = localStorage.getItem('user')
  return user?<Outlet/>: <Navigate to='/signup'/>
}

export default PrivateComponents
