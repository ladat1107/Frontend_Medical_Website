import React from 'react';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { PAGINATE } from '@/constant/value';
const DropdownPaginate = (props) => {
    let handleChange = (item) => {
        props.setPage(item)
    }
    return (
        <div>
            <DropdownMenu trigger={props.page.value} shouldRenderToParent>
                <DropdownItemGroup>
                    {PAGINATE.length > 0 && PAGINATE.map((item, index) => {
                        return (<DropdownItem key={index}
                            onClick={() => { handleChange(item) }}>{
                                item.value}</DropdownItem>)
                    })}

                </DropdownItemGroup>
            </DropdownMenu>
        </div>
    );
};

export default DropdownPaginate;