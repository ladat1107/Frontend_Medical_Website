import React from 'react'
import { AuthenContextProvider } from '@/contexts/AuthenContext';
import { Outlet } from "react-router-dom";
import SideBar from './components/Sidebar'

const DoctorLayout = () => {
    return (
        <AuthenContextProvider>
            <SideBar />
            <div className="sm:ml-64" >
                <Outlet />
            </div>
        </AuthenContextProvider>
    )
}

export default DoctorLayout