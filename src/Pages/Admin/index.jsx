import React, { useContext, useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import AdminFooter from './components/AdminFooter';
import AdminHeader from './components/AdminHeader';
import SideBar from './components/Sidebar';
import './Admin.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthenContext } from '@/contexts/AuthenContext';
import { ROLE } from '@/constant/role';
const { Content } = Layout;

const AdminLayoutTest = () => {
    const [collapsed, setCollapsed] = useState(false);
    let { user, logout } = useContext(AuthenContext);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(user);
        if (user.role !== ROLE.ADMIN) {  // Clears the localStorage (optional)
            logout(); // Redirect to login page or another appropriate route
        }
    }, [navigate]);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const action = (value) => {
        setCollapsed(value);
    }

    return (
        <div className='admin-content'>
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
                                margin: '0px',
                                minHeight: "80vh",
                                borderRadius: borderRadiusLG,
                                backgroundColor: colorBgContainer,
                            }}>
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