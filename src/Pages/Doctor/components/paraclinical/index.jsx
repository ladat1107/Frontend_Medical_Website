import { useCallback, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Paracdetail from '../Paracdetail';
import { notification } from 'antd';
import { deleteParaclinical } from '@/services/doctorService';

const Paraclinical = ({ listParaclinicals, examinationId, refresh }) => {
    const [paracDetails, setParacDetails] = useState(listParaclinicals);
    const [nextId, setNextId] = useState(0);

    // Notification
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message, type = 'info') => {
        api[type]({
            message: message,
            placement: 'bottomRight',
        });
    };

    // Tính toán nextId ban đầu
    useEffect(() => {
        const maxId = Math.max(...listParaclinicals.map(detail => detail.id), -1);
        setNextId(maxId + 1);
    }, [listParaclinicals]);

    const handleAddParacdetail = useCallback(() => {
        setParacDetails(prevDetails => [
            ...prevDetails,
            {
                id: nextId,
                examinationId: examinationId,
                isNew: true
            }
        ]);
        setNextId(prevId => prevId + 1);
    }, [nextId, examinationId]);

    const handleDeleteParacdetail = useCallback(async (id) => {

        const isExistingParaclinical = listParaclinicals.some(detail => detail.id === id);

        if (isExistingParaclinical) {
            try {
                const response = await deleteParaclinical({ id, examinationId });
                // Sửa lại điều kiện kiểm tra
                if (response && response.EC === 0 && response.DT === 1) {
                    openNotification('Xóa xét nghiệm thành công!', 'success');
                    setParacDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
                } else {
                    openNotification('Xóa xét nghiệm thất bại.', 'error');
                    console.error("Error deleting paraclinical:", response);
                }
            } catch (error) {
                console.error("Lỗi khi xóa xét nghiệm:", error.response?.data || error.message);
                openNotification('Xóa xét nghiệm thất bại.', 'error');
            }
        } else {
            setParacDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
        }
    }, [examinationId, listParaclinicals]);


    const handleSaveResult = useCallback((savedData, success, message) => {
        if (success) {
            openNotification(message, 'success');
            setParacDetails(prevDetails =>
                prevDetails.map(detail =>
                    detail.id === savedData.id ? { ...detail, ...savedData } : detail
                )
            );
            refresh();
        } else {
            openNotification(message, 'error');
        }
    }, []);

    const sortedParacDetails = useMemo(() => {
        return [...paracDetails].sort((a, b) => b.id - a.id);
    }, [paracDetails]);

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
                    {sortedParacDetails.length > 0 ? (
                        sortedParacDetails.map(detail => (
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
    refresh: PropTypes.func.isRequired,
};

export default Paraclinical;