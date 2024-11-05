import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Room.scss";
import { faPlus, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import InsertRoom from "./InsertRoom";
import { useState } from "react";
const Room = (props) => {
    let [showInsert, setShowInsert] = useState(true);
    return (
        <div className="room-content">
            <div className="container">
                <div className="room-content__header">
                    <div className="room-of-room-content-header d-flex align-items-center justify-content-between mb-3">
                        <div className="text">QUẢN LÝ PHÒNG</div>
                        <div>
                            {showInsert &&
                                <button className=' py-1 px-2 btn-add-room' onClick={() => { setShowInsert(true) }}>
                                    <FontAwesomeIcon
                                        className='me-1 icon' icon={faPlus} style={{ color: "#0A8FDC", }} /> Thêm mới</button>
                            }
                            <button className='py-1 px-2 btn-refresh-room ms-3' onClick={() => refresh()}>
                                <FontAwesomeIcon
                                    className='me-1 icon' icon={faRotateRight} style={{ color: "#03989e", }} /> Tải lại</button>
                        </div>

                    </div>
                </div>
                <div className={`p-2 animated-div ${showInsert ? 'show' : ''}`}>
                    {showInsert && <InsertRoom />}
                </div>
            </div>

        </div>
    );
}

export default Room;