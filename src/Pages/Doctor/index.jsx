import React, { useContext, useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import SideBar from './components/Sidebar';
import './Doctor.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROLE } from '@/constant/role';
import { PATHS } from '@/constant/path';
import DoctorHeader from './components/DoctorHeader';
import DoctorFooter from './components/DoctorFooter';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/authenSlice';
const { Content } = Layout;

const DoctorLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    let { user } = useSelector((state) => state.authen);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!user || user.role === ROLE.ADMIN || user.role === ROLE.PATIENT) {
            dispatch(logout());
            navigate(PATHS.HOME.LOGIN);
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