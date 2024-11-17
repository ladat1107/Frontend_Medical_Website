import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { AuthenContext } from '@/contexts/AuthenContext';
import "./Login.scss";
import { handleLogin } from '@/services/adminService';
const Login = () => {
    const { login } = useContext(AuthenContext);
    const onFinish = async (values) => {
        let respone = await handleLogin(values);
        if (respone?.data?.EC === 0) {
            login(respone?.data?.DT)
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