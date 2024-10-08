import { useCallback, useState } from 'react';
import Paracdetail from '../Paracdetail';

const Paraclinical = () => {

    const [paracDetails, setParacDetails] = useState([{ id: 0 }]);

    const handleAddParacdetail = useCallback(() => {
        setParacDetails(prevDetails => [
            ...prevDetails,
            { id: prevDetails.length > 0 ? Math.max(...prevDetails.map(d => d.id)) + 1 : 0 }
        ]);
    }, []);

    const handleDeletePresdetail = useCallback((id) => {
        setParacDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
    }, []);

    return (
        <>
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
                                onDelete={() => handleDeletePresdetail(detail.id)} 
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

export default Paraclinical;