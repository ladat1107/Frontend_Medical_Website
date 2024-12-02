import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import "./Login.scss";
import { handleLogin } from '@/services/adminService';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/authenSlice';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '@/constant/role';
import { PATHS } from '@/constant/path';
const Login = () => {
    
    const dispatch = useDispatch();
    let navigate = useNavigate();
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
            <div className='my-4'>ĐĂNG NHẬP</div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                    email: 'doctorCuong@gmail.com',
                    password: '123456'
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        }
                    ]}
                >
                    <Input type='email' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default Login;