import React, { useContext, useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import AdminFooter from './components/AdminFooter';
import AdminHeader from './components/AdminHeader';
import SideBar from './components/Sidebar';
import './Admin.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROLE } from '@/constant/role';
import { PATHS } from '@/constant/path';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/authenSlice';
const { Content } = Layout;

const AdminLayoutTest = () => {
    const [collapsed, setCollapsed] = useState(false);
    let navigate = useNavigate();
    let { user } = useSelector((state) => state.authen);
    let dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        if (user.role !== ROLE.ADMIN) {  // Clears the localStorage (optional)
            dispatch(logout());
            navigate(PATHS.HOME.LOGIN);
        }
    }, [location]);
    const action = (value) => {
        setCollapsed(value);
    }
    return (
        <div className='admin-content'>
            <Layout>
                <SideBar
                    open={collapsed}
                    action={action} />
                <Layout>
                    <AdminHeader
                        open={collapsed}
                        action={action} />
                    <div className='content-data'>
                        <Content>
                            <Outlet />
                        </Content>
                    </div>
                    <AdminFooter />
                </Layout>
            </Layout>
        </div >
    );
};
export default AdminLayoutTest;