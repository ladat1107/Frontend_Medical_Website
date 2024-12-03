import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import "./Login.scss";
import { handleConfirmUser, handleLogin } from '@/services/adminService';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/authenSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROLE } from '@/constant/role';
import { PATHS } from '@/constant/path';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FacebookOutlined } from '@mui/icons-material';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
const Login = () => {
    const open = {
        login: "login",
        register: "register",
        forgotPassword: "forgotPassword"
    }
    let [isShow, setIsShow] = useState(open.login);
    let [form] = Form.useForm();
    let [register, setRegister] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    useEffect(() => {
        let confirmToken = queryParams.get('confirm');
        if (confirmToken !== null) {
            const fetchConfirmAsync = async () => {
                const response = await handleConfirmUser({ token: confirmToken });
                if (response?.data?.EC === 0 || response?.data?.EC === 1) {
                    message.success(response?.data?.EM);
                } else {
                    message.error(response?.data?.EM);
                }
            };
            fetchConfirmAsync();
        }
    }, []);
    const onFinish = async (values) => {
        let respone = await handleLogin(values);
        if (respone?.data?.EC === 0) {
            dispatch(login(respone.data.DT));
            console.log(respone.data.DT.user.role);
            if (respone.data.DT.user.role) {
                if (respone.data.DT.user.role === ROLE.ADMIN) {
                    navigate(PATHS.ADMIN.DASHBOARD);
                } else if (respone.data.DT.user.role === ROLE.PATIENT) {
                    navigate(PATHS.HOME.HOMEPAGE);
                } else {
                    navigate(PATHS.STAFF.DASHBOARD);
                }
            }
        } else {
            message.error(respone?.data?.EM || 'Đăng nhập thất bại')
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login-content '>
            <div className='slide'  >
                {isShow === open.register && <Register login={() => setIsShow(open.login)} />}
                {isShow === open.forgotPassword && <ForgotPassword login={() => setIsShow(open.login)} />}
                {isShow === open.login &&
                    <div className='modal-login'>
                        <span className="icon-back" onClick={() => navigate(PATHS.HOME.HOMEPAGE)}><FontAwesomeIcon icon={faArrowLeft} /> </span>
                        <div className="circle-avatar"></div>
                        <h2 className="login-title">Hoa Sen</h2>
                        <Form
                            name="basic"
                            form={form}
                            layout="vertical"
                            className="login-form mt-3"
                            initialValues={{
                                email: 'doctorCuong@gmail.com',
                                password: '123456'
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}>
                            <Form.Item name="email" rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
                                <Input className='input' placeholder='Email' width={100} />
                            </Form.Item>
                            <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
                                <Input.Password className='input' placeholder='Mật khẩu' width={100} />
                            </Form.Item>
                            <span className="forgot-password" onClick={() => setIsShow(open.forgotPassword)}>
                                Quên mật khẩu?
                            </span>
                            <Button type="primary" htmlType="submit" className="login-button">
                                Đăng nhập
                            </Button>
                        </Form>
                        <div className='line'></div>
                        <div className="social-login">
                            <Button icon={<FacebookOutlined />} className="facebook-button">
                                Đăng nhập với Facebook
                            </Button>
                            <Button icon={<FontAwesomeIcon icon={faGoogle} />} className="google-button">
                                Đăng nhập với Google
                            </Button>
                        </div>
                        <div className='register-text mt-3' onClick={() => setIsShow(open.register)}><span> <FontAwesomeIcon size='lg' className='me-2' icon={faAddressCard} /> Đăng ký tài khoản</span></div>
                    </div>
                }
            </div>
        </div>
    );
}
export default Login;