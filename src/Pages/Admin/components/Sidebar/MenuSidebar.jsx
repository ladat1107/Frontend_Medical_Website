import React from 'react';
import { HomeOutlined, UserSwitchOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
const items = [
    {
        key: 'sub1',
        label: (<NavLink to="/admin">Trang chủ</NavLink>),
        icon: <HomeOutlined />,
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
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'sub3',
        label: (<NavLink to="/adminDepartmentManage">Quản lý khoa</NavLink>),
        icon: <FontAwesomeIcon icon={faBuilding} />,
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