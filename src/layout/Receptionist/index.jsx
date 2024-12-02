import { Outlet, useLocation, useNavigate } from "react-router-dom"
import DoctorFooter from "../Doctor/components/DoctorFooter"
import { Content } from "antd/es/layout/layout"
import DoctorHeader from "../Doctor/components/DoctorHeader"
import { Layout, theme } from "antd"
import { useContext, useEffect, useState } from "react"
import { ROLE } from "@/constant/role"
import { PATHS } from "@/constant/path"
import Sidebar from "./components/Sidebar"
import "./Receptionist.scss"
import { useDispatch, useSelector } from "react-redux"
import { logout } from '@/redux/authenSlice';


const ReceptionistLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    let { user } = useSelector((state) => state.authen);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if ((user.role === ROLE.ADMIN || user.role === ROLE.PATIENT) && location.pathname !== PATHS.ADMIN.PROFILE) {  // Clears the localStorage (optional)
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
            <div className='receptionist-content'>
                <Layout>
                    <Sidebar open={collapsed}
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

export default ReceptionistLayout