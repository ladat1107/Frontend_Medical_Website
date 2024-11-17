import { convertDateTime } from '@/utils/formatDate';
import './HandbookItem.scss';
import PropTypes from 'prop-types';

const HandbookItem = ({ item, onClick }) => {
    return (
        <div 
            className='handbookitem-container cursor-pointer hover:shadow-lg transition-shadow'
            onClick={() => onClick(item.id)}
        >
            <div className='row'>
                <div className='image-container'>
                    <img src={item.image} alt={item.title} />
                </div>
            </div>
            <div className='row'>
                <div className='title'>
                    <p>{item.title}</p>
                </div>
            </div>
            <div className='row'>
                <div className='subtitle'>
                    <p>Bác sĩ: {item.handbookStaffData.staffUserData.lastName + 
                        ' ' + item.handbookStaffData.staffUserData.firstName}</p>
                </div>
            </div>
            <div className='row'>
                <div className='subtitle'>
                    <p>Ngày đăng: {convertDateTime(item.createdAt)}</p>
                </div>
            </div>
        </div>
    );
};

HandbookItem.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default HandbookItem;