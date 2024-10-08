import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Presdetail.scss';
import PropTypes from 'prop-types';

const Presdetail = ({ onDelete }) => {
    return (
        <div className="presdetail-container ">
            <div className="row center-content">
                <div className='col-3'>
                    <div className='row'>
                        <p className='title'>Tên thuốc</p>
                    </div>
                    <div className='row'>
                        <p className='suptext'>Thành phần hoạt tính</p>
                    </div>
                </div>
                <div className='col-2'>
                    <div className='row'>
                        <p className='title'>Số lượng</p>
                    </div>
                    <div className='row'>
                        <input type="text" className="input" placeholder="Nhập số lượng"/>
                    </div>
                </div>
                <div className='col-1'>
                    <div className='row'>
                        <p className='title'>Đơn vị</p>
                    </div>
                    <div className='row'>
                        <p className='suptext'>Viên</p>
                    </div>
                </div>
                <div className='col-1'>
                    <div className='row'>
                        <p className='title'>Giá</p>
                    </div>
                    <div className='row'>
                        <p className='suptext'>20.000</p>
                    </div>
                </div>
                <div className='col-3'>
                    <div className='row'>
                        <p className='title'>Liều dùng</p>
                    </div>
                    <div className='row'>
                        <input type="text" className="input" placeholder="Nhập liều dùng"/>
                    </div>
                </div>
                <div className='col-1'> 
                    <i className="fa-solid fa-trash red" onClick={onDelete}></i>
                </div>
            </div>
        </div>
    )
}
Presdetail.propTypes = {
    onDelete: PropTypes.func.isRequired,
};

export default Presdetail;