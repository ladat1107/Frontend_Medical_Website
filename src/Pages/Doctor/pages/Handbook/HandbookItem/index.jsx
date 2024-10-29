import { convertDateTime } from '@/utils/formartDate';
import './HandbookItem.scss'
import PropTypes from 'prop-types';

const HandbookItem = ({item}) => {
    
    return (
        <>
            <div className='handbookitem-container'>
                <div className='row'>
                    <div className='image-container'>
                        <img src={item.image} alt="placeholder"/>
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
        </>
    );
}
HandbookItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default HandbookItem;