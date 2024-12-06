import { useCallback, useState, useEffect, useMemo, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Paracdetail from '../Paracdetail';
import { message, notification } from 'antd';
import { createRequestParaclinical, deleteParaclinical, getServiceLaboratory } from '@/services/doctorService';
import './Paraclinical.scss';
import { useSelector } from 'react-redux';
import { useMutation } from '@/hooks/useMutation';

const Paraclinical = ({ listParaclinicals, examinationId, refresh }) => {
    const [paracDetails, setParacDetails] = useState(listParaclinicals);
    const [nextId, setNextId] = useState(0);

    const [inputParac, setInputParac] = useState('');
    const [shakeId, setShakeId] = useState(null);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [selectedParaclinicals, setSelectedParaclinicals] = useState([]);
    const [paracOptions, setParacOptions] = useState([]);

    const paraclinicalContainerRef = useRef(null);
    const inputRef = useRef(null);
    const searchResultsRef = useRef(null);

    // const {user} = useContext(AuthenContext);
    let { user } = useSelector((state) => state.authen);

    // Notification
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message, type = 'info') => {
        api[type]({
            message: message,
            placement: 'bottomRight',
        });
    };

    //Paraclinical options
    let {
        data: dataParaclinicals,
        loading: comorbiditiesLoading,
        error: comorbiditiesError,
        execute: fetchParaclinical,
    } = useMutation((query) =>
        getServiceLaboratory()
    );

    useEffect(() => {
        if (dataParaclinicals && dataParaclinicals.DT) {
            const paracOptions = dataParaclinicals.DT.map(item => ({
                id: item.id,
                label: item.name,
                price: item.price,
            }));
            setParacOptions(paracOptions);
        }
    }, [dataParaclinicals]);

    //#region Cận lâm sàn cũ
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
                isNew: true,
                paraclinical: 0,
                doctorId: user.staff,
                result: '',
                description: '',
                image: '', // Initialize image in paracDetails
                price: 0
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

    // #endregion

    // #region Cận lâm sàn

    const handleParacRequest = async () => {
        if (selectedParaclinicals.length === 0) {
            message.warning('Vui lòng chọn ít nhất một xét nghiệm!');
            return;
        }

        const data = {
            examinationId: examinationId,
            listParaclinicals: selectedParaclinicals
        }

        // Gọi API tạo yêu cầu xét nghiệm
        const response = await createRequestParaclinical(data);

        // console.log("Response:", response);
        if (response.data && response.data.EC === 0) {
            openNotification('Tạo yêu cầu xét nghiệm thành công!', 'success');
            refresh();
            setSelectedParaclinicals([]);
        } else {
            openNotification('Tạo yêu cầu xét nghiệm thất bại.', 'error');
            console.error("Error creating paraclinical request:", response);
        }
    }

    // Bệnh đi kèm
    const handleInputChange = (event) => {
        setInputParac(event.target.value);
        setShowSearchResults(true);
    };

    const filteredParaclinicals = paracOptions.filter(paraclinical =>
        paraclinical.label.toLowerCase().includes(inputParac.toLowerCase())
    );

    useEffect(() => {
        fetchParaclinical();
        const handleClickOutside = (event) => {
            if (
                paraclinicalContainerRef.current &&
                !paraclinicalContainerRef.current.contains(event.target)
            ) {
                setShowSearchResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectParaclinical = (paraclinical) => {
        // Kiểm tra xem paraclinical đã tồn tại trong danh sách chưa
        if (selectedParaclinicals.some(item => item.id === paraclinical.id)) {
            setShakeId(paraclinical.id);
            setTimeout(() => setShakeId(null), 1000);
            return;
        }
    
        setSelectedParaclinicals((prevSelected) => [
            ...prevSelected,
            paraclinical
        ]);
        setInputParac('');
        setShowSearchResults(false);
    };
    
    const handleRemoveParaclinical  = (id) => {
        setSelectedParaclinicals(selectedParaclinicals.filter(item => item.id !== id));
    };

    // #endregion

    return (
        <>
            {contextHolder}
            <div className="parac-container">
                <div className='exam-info mt-4'>
                    <div 
                        ref={paraclinicalContainerRef} 
                        className='comorbidities-action'
                    >
                        <div className='comorbidities-list'>
                            {selectedParaclinicals.map(comorbidity => (
                                <div
                                    key={comorbidity.id}
                                    className={`comorbidities-item mb-2 ${shakeId === comorbidity.id ? 'shake' : ''}`}
                                >
                                    <p>{comorbidity.label}</p>
                                    <i 
                                        className="fa-solid me-2 fa-times"
                                        onClick={() => handleRemoveParaclinical(comorbidity.id)}
                                    ></i>
                                </div>
                            ))}
                        </div>
                        {/* Input tìm kiếm bệnh đi kèm */}
                        <input
                            ref={inputRef}
                            className='input-add-prac'
                            type='text'
                            placeholder='Thêm yêu cầu cận lâm sàng...'
                            style={{ background: '#eeeeee', border: 'none', boxShadow: 'none' }}
                            value={inputParac}
                            onChange={handleInputChange}
                            onFocus={() => setShowSearchResults(true)}
                        />
                        {/* Hiển thị danh sách bệnh đi kèm khi có kết quả tìm kiếm */}
                        {showSearchResults && inputParac && (
                            <div 
                                ref={searchResultsRef}
                                className='search-results'
                            >
                                {filteredParaclinicals.map(paraclinical => (
                                    <div 
                                        key={paraclinical.id}
                                        className='search-item'
                                        onClick={() => handleSelectParaclinical (paraclinical)}
                                    >
                                        {paraclinical.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className='col-12'>
                        <button className="add-button" onClick={handleParacRequest}>Thêm xét nghiệm</button>
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