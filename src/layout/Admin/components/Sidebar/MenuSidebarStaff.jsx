import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { PATHS } from '@/constant/path';
import { logout } from '@/redux/authenSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

const MenuSidebar = () => {
    let dispatch = useDispatch();
    const items = [
        {
            type: 'divider',
        },
        {
            key: 'sub2',
            label: (<NavLink to={PATHS.RECEPTIONIST.DASHBOARD}>Lịch hẹn</NavLink>),
            icon: <i className="fa-solid fa-list"></i>,
        },
        {
            key: 'sub1',
            label: (<NavLink to={PATHS.STAFF.APPOINTMENT}>Khám bệnh</NavLink>),
            icon: <i className="fa-solid fa-list"></i>,
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
            key: 'logout',
            label: ("Đăng xuất"),
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} />,
            onClick: () => { dispatch(logout()); }
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