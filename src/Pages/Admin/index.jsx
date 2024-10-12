import React, { useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { set } from 'react-hook-form';
const { Header, Content, Footer, Sider } = Layout;
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
        label: `nav ${index + 1}`,
    }),
);
const AdminLayoutTest = () => {
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Sider
                theme="light"
                collapsed={collapsed}
                trigger={null}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    //console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    //console.log(collapsed, type);
                    setCollapsed(collapsed);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        content
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default AdminLayoutTest;