import React, { useContext, useState } from 'react';
import { HomeOutlined, UserSwitchOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBuilding, faHospital, faIdCard } from '@fortawesome/free-regular-svg-icons';
import { PATHS } from '@/constant/path';
import emitter from '@/utils/eventEmitter';
import { EMIT } from '@/constant/value';
import { AuthenContext } from '@/contexts/AuthenContext';
import "./Sidebar.scss";
import { backgroundColor } from '@/style/variables';
const MenuSidebar = () => {
    let { user } = useContext(AuthenContext);
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState("sub2");

    const handleOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (latestOpenKey) {
            setOpenKeys([latestOpenKey]);
        } else {
            setOpenKeys([]);
        }
    };
    const items = [
        {
            type: 'divider',
        },
        {
            key: 'sub1',
            label: (<NavLink to={PATHS.ADMIN.DASHBOARD}>Trang chủ</NavLink>),
            icon: <HomeOutlined />,
        },
        {
            key: 'sub2',
            label: (<NavLink style={{ color: selectedKeys === "sub2" ? "red" : "" }} to={PATHS.ADMIN.PROFILE}>Cá nhân</NavLink>),
            icon: <FontAwesomeIcon style={{ color: selectedKeys === "sub2" ? "red" : "" }} icon={faAddressCard} />,
            children: [
                {
                    key: 'personal1',
                    label: 'Thông tin cá nhân',
                    onClick: () => { emitter.emit(EMIT.EVENT_PROFILE.key, EMIT.EVENT_PROFILE.info); }
                },
                {
                    key: 'personal2',
                    label: 'Đổi mật khẩu',
                    onClick: () => { emitter.emit(EMIT.EVENT_PROFILE.key, EMIT.EVENT_PROFILE.changePassword); }
                },
                ...(user?.staff ? [{
                    key: '3',
                    label: "Hồ sơ",
                    onClick: () => {
                        emitter.emit(EMIT.EVENT_PROFILE.key, EMIT.EVENT_PROFILE.staff);
                    }
                }] : [])
            ],
            backgroundColor: "red"
        },

        {
            key: 'user',
            label: (<NavLink to={PATHS.ADMIN.STAFF_MANAGE}>Người dùng</NavLink>),
            icon: <UserSwitchOutlined />,
            children: [
                {
                    key: 'user1',
                    label: (<NavLink to={PATHS.ADMIN.STAFF_MANAGE}>Nhân viên</NavLink>),
                    onClick: (value) => { console.log(value) }
                },
                {
                    key: 'user2',
                    label: (<NavLink to={PATHS.ADMIN.PATIENT_MANAGE}>Bệnh nhân</NavLink>),
                }
            ],
        },
        {
            key: 'sub3',
            label: (<NavLink to={PATHS.ADMIN.DEPARTMENT_MANAGE}>Khoa</NavLink>),
            icon: <FontAwesomeIcon icon={faBuilding} />,
        },
        {
            key: 'sub4',
            label: (<NavLink to={PATHS.ADMIN.SPECIALTY_MANAGE}>Chuyên khoa</NavLink>),
            icon: <FontAwesomeIcon icon={faBuilding} />,
        },
        {
            key: 'sub5',
            label: (<NavLink to={PATHS.ADMIN.ROOM_MANAGE}>Cơ sở ý tế</NavLink>),
            icon: <FontAwesomeIcon icon={faHospital} />,
            children: [
                {
                    key: '3',
                    label: (<NavLink to={PATHS.ADMIN.ROOM_MANAGE}>Phòng</NavLink>),
                },
                {
                    key: '4',
                    label: (<NavLink to={PATHS.ADMIN.SERVICE_MANAGE}>Dịch vụ phòng</NavLink>),
                },
            ],
        },
        {
            type: 'divider',
        },
    ];

    return (
        <div className='menu-item'>
            <Menu
                openKeys={openKeys} // Truyền state openKeys vào
                onOpenChange={handleOpenChange}
                mode="inline"
                items={items}
            />
        </div>
    );
}

export default MenuSidebar;