import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import MoreVerticalIcon from '@atlaskit/icon/glyph/more-vertical'
import { IconButton } from '@atlaskit/button/new';
const DropdownAction = (props) => {
    return (
        <div>
            <DropdownMenu className="dropdown"
                placement="left-start"
                trigger={({ triggerRef, ...props }) => (
                    <IconButton {...props} icon={MoreVerticalIcon} label="more" ref={triggerRef} />
                )}
                shouldRenderToParent>
                <DropdownItemGroup className="item">
                    <DropdownItem>
                        <span className="update" > <FontAwesomeIcon className="me-1" icon={faFilePen} size="lg" /> Cập nhật</span>
                    </DropdownItem>
                    <DropdownItem >
                        <span className="del"> <FontAwesomeIcon className="me-2" icon={faTrashCan} size="lg" /> Xóa</span>
                    </DropdownItem>
                </DropdownItemGroup>
            </DropdownMenu>
        </div>
    );
};
<style>

</style>

export default DropdownAction;