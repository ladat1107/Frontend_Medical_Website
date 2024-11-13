import React from 'react';
import { HomeOutlined, UserSwitchOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { PATHS } from '@/constant/path';
const items = [
    {
        key: 'sub1',
        label: (<NavLink to={PATHS.STAFF.APPOINTMENT}>Lịch hẹn</NavLink>),
        icon: <i className="fa-solid fa-list"></i>,
    },
    {
        key: 'sub2',
        label: 'Quản lý người dùng',
        icon: <UserSwitchOutlined />,
        children: [
            {
                key: '5',
                label: (<NavLink to="/adminStaffManage">Nhân viên</NavLink>),
            },
            {
                key: '6',
                label: (<NavLink to="/adminPatientManage">Bệnh nhân</NavLink>),
            },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    {
                        key: '7',
                        label: 'Option 7',
                    },
                    {
                        key: '8',
                        label: 'Option 8',
                    },
                ],
            },
        ],
    },
    {
        key: 'sub5',
        label: (<NavLink to={PATHS.STAFF.HANDBOOK}>Cẩm nang</NavLink>),
        icon: <i className="fa-solid fa-book"></i>,
    },
    {
        key: 'sub6',
        label: (<NavLink to={PATHS.STAFF.SCHEDULE}>Lịch trực</NavLink>),
        icon: <i className="fa-regular fa-calendar"></i>,
    },
    {
        type: 'divider',
    },
    {
        key: 'sub4',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
        children: [
            {
                key: '9',
                label: 'Option 9',
            },
            {
                key: '10',
                label: 'Option 10',
            },
            {
                key: '11',
                label: 'Option 11',
            },
            {
                key: '12',
                label: 'Option 12',
            },
        ],
    },
    {
        key: 'grp',
        label: 'Group',
        type: 'group',
        children: [
            {
                key: '13',
                label: 'Option 13',
            },
            {
                key: '14',
                label: 'Option 14',
            },
        ],
    },
];
const MenuSidebar = () => {
    const onClick = (e) => {
        console.log('click ', e);
    };
    return (
        <div className='menu-item'>
            <Menu
                onClick={onClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
        </div>
    );
}

export default MenuSidebar;