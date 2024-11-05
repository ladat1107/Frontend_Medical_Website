import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import AdminFooter from './components/AdminFooter';
import AdminHeader from './components/AdminHeader';
import SideBar from './components/Sidebar';
import './Doctor.scss';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;

const DoctorLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

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