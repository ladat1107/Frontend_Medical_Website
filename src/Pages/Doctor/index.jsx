import React, { useContext, useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import AdminFooter from './components/AdminFooter';
import AdminHeader from './components/AdminHeader';
import SideBar from './components/Sidebar';
import './Doctor.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthenContext } from '@/contexts/AuthenContext';
import { ROLE } from '@/constant/role';
import { PATHS } from '@/constant/path';
const { Content } = Layout;

const DoctorLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    let { user, logout } = useContext(AuthenContext);
    const location = useLocation();
    useEffect(() => {
        if ((user.role === ROLE.ADMIN || user.role === ROLE.PATIENT) && location.pathname !== PATHS.ADMIN.PROFILE) {  // Clears the localStorage (optional)
            logout(); // Redirect to login page or another appropriate route
        }
    }, [location]);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const action = (value) => {
        setCollapsed(value);
    }

    return (
        <>
            <div className='doctor-content'>
                <Layout>
                    <SideBar open={collapsed}
                        action={action} />
                    <Layout>
                        <AdminHeader
                            open={collapsed}
                            action={action} />
                        <div className='content-data'>
                            <Content
                                style={{
                                    margin: '24px 16px 0',
                                    borderRadius: borderRadiusLG,
                                    backgroundColor: colorBgContainer,
                                }}>
                                <Outlet />
                            </Content>
                        </div>
                        <AdminFooter />
                    </Layout>
                </Layout>
            </div>
        </>
    )
}

export default DoctorLayout