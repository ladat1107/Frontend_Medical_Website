import React, { useState } from 'react';
import { Inline } from '@atlaskit/primitives';
import DropdownMenu, { DropdownItemCheckbox, DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import { STAFF_ROLE } from '@/constant/role';

const DropdownPosition = ({ onChange }) => {
    // let [positionChoosed, setPositionChoosed] = useState([...STAFF_ROLE].map(item => ({ ...item, selected: true })));
    let handleChangePosition = (id) => {
        if (id === 0) {
            onChange(STAFF_ROLE.map(item => item.value))
        } else {
            onChange([id]);
        }
        ;
    }

    return (
        <Inline space="space.600">
            <DropdownMenu trigger="CHỨC VỤ" shouldRenderToParent
                spacing="compact">
                <DropdownItemGroup >
                    <DropdownItem onClick={() => { handleChangePosition(0) }}>Tất cả</DropdownItem>
                </DropdownItemGroup>
                <DropdownItemGroup hasSeparator>
                    {STAFF_ROLE.length > 0 && STAFF_ROLE.map((item, index) => {
                        return (<DropdownItem
                            key={index}
                            id={`staff-${item.value}`}
                            onClick={() => {
                                handleChangePosition(item.value);
                            }}
                        >{item.label}</DropdownItem>)
                    })}
                </DropdownItemGroup>
            </DropdownMenu>
        </Inline>
    );
};

export default DropdownPosition;