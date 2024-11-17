
import React, { useContext } from 'react';
import { Dropdown, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { PATHS } from '@/constant/path';
import "./Dropdown.scss"
import { AuthenContext } from '@/contexts/AuthenContext';
const DropdownProfile = () => {
    const { logout } = useContext(AuthenContext);
    const items = [
        {
            label: (<NavLink to={PATHS.ADMIN.PROFILE}>Thông tin cá nhân</NavLink>),
            key: '0',
        },
        {
            label: "Đăng xuất",
            key: '1',
            onClick: () => { logout(); }
        },
    ];
    return (
        <Dropdown
            menu={{
                items,
            }}
            trigger={['click']}
            overlayClassName="dropdownProfile"
            placement="bottomRight">
            <Space>
                <FontAwesomeIcon icon={faChevronDown} />
            </Space>

        </Dropdown>
    )
}

export default DropdownProfile