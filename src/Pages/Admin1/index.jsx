import React from 'react'
import { Outlet } from "react-router-dom";
import SideBar from './components/Sidebar'
import CustomScrollbars from '@/components/Scrollbars/CustomScrollbars'
import AdminHeader from './components/AdminHeader';
import { AuthenContextProvider } from '@/contexts/AuthenContext';

import styles from './Sidebar.module.scss';
import "./Admin.scss"
const AdminLayout = () => {
  return (
    <div className='admin-layout'>
      <AuthenContextProvider>
        <CustomScrollbars>
          <SideBar></SideBar>
          <div className="p-4 sm:ml-64" >
            <AdminHeader />
            <Outlet />
          </div>
        </CustomScrollbars>
      </AuthenContextProvider>
    </div>

  )
}

export default AdminLayout