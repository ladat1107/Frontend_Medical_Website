
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


const DropdownDepartment = (props) => {
    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };
    let items = [
        {
            label: '1st menu item',
            key: '1',
        },
        {
            label: '2nd menu item',
            key: '2',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
    return (
        <Dropdown

            menu={{
                items,
                onClick,
            }}        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <FontAwesomeIcon icon={faChevronDown} color='#6c757d' />
                </Space>
            </a>
        </Dropdown>
    )
}

export default DropdownDepartment