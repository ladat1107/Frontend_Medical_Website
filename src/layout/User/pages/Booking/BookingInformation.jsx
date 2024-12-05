import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Booking.scss"
import { faHospital } from "@fortawesome/free-regular-svg-icons";
import { faBriefcaseMedical } from "@fortawesome/free-solid-svg-icons";
const BookingInformation = () => {
    return (
        <div className="booking-information ">
            <div className="medical-info-card">
                <div className="card-header">Thông tin cơ sở y tế</div>
                <div className="card-body">
                    <FontAwesomeIcon className="mt-2" icon={faHospital} />
                    <div className="ms-2">
                        <div className="hospital-name">Bệnh viện Đại học Y Dược TP.HCM</div>
                        <div className="hospital-address">
                            Cơ sở 215 Hồng Bàng, Phường 11, Quận 5, TP.HCM
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <FontAwesomeIcon className="mt-1" icon={faBriefcaseMedical} />
                    <div className="ms-2">
                        <div className="hospital-name">Chuyên khoa: Ngoại tổng hợp</div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BookingInformation;