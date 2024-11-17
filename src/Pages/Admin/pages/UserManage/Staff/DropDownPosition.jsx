import React, { useEffect, useState } from 'react';
import { Dropdown, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { STAFF_ROLE } from '@/constant/role';

const DropdownPosition = ({ onChange }) => {
    let items = [{ label: "Tất cả", value: 0, onClick: () => { handleChangePosition(0) } }];
    for (let i = 0; i < STAFF_ROLE.length; i++) {
        items.push({
            label: STAFF_ROLE[i].label,
            key: STAFF_ROLE[i].value,
            onClick: () => { handleChangePosition(STAFF_ROLE[i].value) }
        })
    }
    let handleChangePosition = (id) => {
        if (id === 0) {
            onChange(STAFF_ROLE.map(item => item.value))
        } else {
            onChange([id]);
        };
    }
    useEffect(() => {

    }, [])
    return (
        <Dropdown
            menu={{
                items,
            }}
            trigger={['click']}
            overlayClassName="dropdownPosition"
            placement="bottomRight">
            <Space>
                <FontAwesomeIcon className='ms-1' icon={faChevronDown} size='xs' />
            </Space>
        </Dropdown>
    );
};

export default DropdownPosition;