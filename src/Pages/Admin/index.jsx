import React from 'react'
import { Outlet } from "react-router-dom";
import SideBar from './components/Sidebar'
import CustomScrollbars from '@/components/Scrollbars/CustomScrollbars'
import AdminHeader from './components/AdminHeader';

const AdminLayout = () => {
  return (
    <>
      <CustomScrollbars>
        <SideBar />
        <div className="p-4 sm:ml-64" >
          <AdminHeader />
          <Outlet />
        </div>


      </CustomScrollbars>
    </>


  )
}

export default AdminLayout