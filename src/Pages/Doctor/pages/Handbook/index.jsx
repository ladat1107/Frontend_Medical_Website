import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllHandbooks } from '@/services/doctorService';
import { useMutation } from '@/hooks/useMutation';
import './Handbook.scss'
import CreateHandbook from './CreateHandbook';
import { List } from 'antd';
import ListHandbook from './ListHandbook';

const Handbook = () => {

    const [action, setAction] = useState(1);

    const handleButtonClick = () => {
        if(action === 1) setAction(2);
        if(action === 2) setAction(1);
    }

    return (
        <>
            <div className="handbook-container">
                <div className="row">
                    <div className="col-6">
                        <h1>Cẩm nang</h1>
                    </div>
                    <div className="col-6">
                        <div className='button-container'>
                            <button className='button' onClick={handleButtonClick}>
                                { action === 1 && (
                                    <>
                                        <i className="fa-solid fa-plus"></i>
                                        Thêm mới
                                    </>
                                )}
                                { action === 2 && (
                                    <>
                                        <i className="fa-solid fa-arrow-left"></i>
                                        Hủy bỏ
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12">
                        Cẩm nang sức khỏe cung cấp những thông tin hữu ích về các bệnh lý thường gặp, quy trình khám chữa bệnh, hướng dẫn chăm sóc sức khỏe hằng ngày, và những lưu ý quan trọng trong việc phòng ngừa bệnh, giúp người dùng tự tin và chủ động hơn trong việc bảo vệ sức khỏe bản thân và gia đình.
                    </div>
                </div>
                <div className='row mt-3'>
                    { action === 1 && (
                        <ListHandbook />
                    )}
                    { action === 2 && (
                        <CreateHandbook />
                    )}
                </div>
            </div>
        </>
    );
}

export default Handbook;