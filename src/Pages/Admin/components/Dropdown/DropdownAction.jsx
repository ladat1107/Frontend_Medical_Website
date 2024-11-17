import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import MoreVerticalIcon from '@atlaskit/icon/glyph/more-vertical'
import { IconButton } from '@atlaskit/button/new';
import DeleteModal from '../Modal/DeleteModal';
import './Dropdown.scss'
const DropdownAction = (props) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    let handleDelete = () => {
        setShowDeleteModal(true)
    }
    let handleShow = (value) => {
        setShowDeleteModal(value)
    }
    let handleUpdate = () => {
        props.action(props.data)
    }
    return (
        <div>
            <DropdownMenu className="dropdown"
                placement="left-start"
                trigger={({ triggerRef, ...props }) => (
                    <IconButton {...props} icon={MoreVerticalIcon} label="more" ref={triggerRef} />
                )}
                shouldRenderToParent>
                <DropdownItemGroup className="item">
                    <DropdownItem onClick={() => { handleUpdate() }} >
                        <span className="update" > <FontAwesomeIcon className="me-1" icon={faFilePen} size="lg" /> Cập nhật</span>
                    </DropdownItem>
                    <DropdownItem onClick={() => { handleDelete() }} >
                        <span className="del"> <FontAwesomeIcon className="me-2" icon={faTrashCan} size="lg" /> Xóa</span>
                    </DropdownItem>
                </DropdownItemGroup>
            </DropdownMenu>
            <DeleteModal
                show={showDeleteModal}
                isShow={handleShow}
                {...props} />
        </div>
    );
};
<style>

</style>

export default DropdownAction;