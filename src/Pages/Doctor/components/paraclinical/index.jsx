import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Paracdetail from '../Paracdetail';
import { notification } from 'antd';

const Paraclinical = ({listParaclinicals, examinationId}) => {

    const [paracDetails, setParacDetails] = useState(listParaclinicals);

    //Notification
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message, type = 'info') => {
        api[type]({
            message: message,
            placement: 'bottomRight',
        });
    };

    const handleAddParacdetail = useCallback(() => {
        setParacDetails(prevDetails => [
            ...prevDetails,
            { 
                id: prevDetails.length > 0 ? Math.max(...prevDetails.map(d => d.id)) + 1 : 0,
                examinationId: examinationId
            }
        ]);
    }, []);

    const handleDeleteParacdetail = useCallback((id) => {
        setParacDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
    }, []);

    const handleSaveResult = useCallback((savedData, success) => {
        if (success) {
            openNotification('Thêm thông tin thành công!', 'success');
            setParacDetails(prevDetails => 
                prevDetails.map(detail => 
                    detail.id === savedData.id ? { ...detail, ...savedData } : detail
                )
            );
        } else {
            openNotification('Thêm thông tin thất bại.', 'error');
        }
    }, []);

    return (
        <>
            {contextHolder}
            <div className="parac-container">
                <div className="row">
                    <div className='col-3'>
                        <button className="add-button" onClick={handleAddParacdetail}>Thêm xét nghiệm</button>
                    </div>
                </div>
                <div className="row">
                    {paracDetails.length > 0 ? (
                        paracDetails.map(detail => (
                            <Paracdetail 
                                key={detail.id} 
                                id={detail.id}
                                paraclinicalData={detail}
                                onSaveResult={handleSaveResult}
                                onDelete={handleDeleteParacdetail} 
                            />
                        ))
                    ) : (
                        <div className="empty-list-message">
                            <div>Phiếu xét nghiệm trống</div>
                            <hr />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
Paraclinical.propTypes = {
    listParaclinicals: PropTypes.array.isRequired,
    examinationId: PropTypes.number.isRequired,
};

export default Paraclinical;