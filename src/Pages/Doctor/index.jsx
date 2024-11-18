import React, { useContext, useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import SideBar from './components/Sidebar';
import './Doctor.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthenContext } from '@/contexts/AuthenContext';
import { ROLE } from '@/constant/role';
import { PATHS } from '@/constant/path';
import DoctorHeader from './components/DoctorHeader';
import DoctorFooter from './components/DoctorFooter';
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
                        <DoctorHeader
                            open={collapsed}
                            action={action} />
                        <div className='content-data'>
                            <Content
                                style={{
                                    margin: '24px 16px 0',
                                    borderRadius: borderRadiusLG,
                                    backgroundcolor: colorBgContainer,
                                }}>
                                <Outlet />
                            </Content>
                        </div>
                        <DoctorFooter />
                    </Layout>
                </Layout>
            </div>
        </>
    )
}

export default DoctorLayout