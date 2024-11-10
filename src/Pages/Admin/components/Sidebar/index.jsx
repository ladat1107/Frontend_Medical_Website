import React from 'react';
import { Layout } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';
import MenuSidebar from './MenuSidebar';

const { Sider } = Layout;
const Sidebar = (props) => {
    return (
        <div className='sidebar-content'>
            <Sider
                theme="light"
                width={230}
                collapsed={props.open}
                trigger={null}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    //console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    //console.log(collapsed, type);
                    props.action(collapsed);
                }}
            >
                <div className="demo-logo-vertical" />
                <div className='header-sideBar row ms-1'>
                    <div className='col-3 p-2'>
                        <div className='logo' style={{ backgroundImage: 'url(https://ant-cra.cremawork.com/assets/images/avatar/A11.jpg)', }}></div>
                    </div>
                    <div className='col-8 py-2 ms-1'>
                        <div className='d-flex justify-content-between'>
                            <span><b>La Đạt</b></span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                        <div>
                            Quản trị viên
                        </div>
                    </div>
                </div>
                <MenuSidebar />
                {/* <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} items={items} /> */}
            </Sider >
        </div >

    );
}

export default Sidebar;