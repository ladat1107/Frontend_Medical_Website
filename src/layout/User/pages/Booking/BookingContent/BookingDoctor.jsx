import { Input } from "antd";
import "../Booking.scss";
import { SearchOutlined } from "@mui/icons-material";
import userService from "@/services/userService";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { formatCurrency } from "@/utils/formatCurrency";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookingDoctor = (props) => {
    let specialtyId = props?.specialty || "";
    let [listDoctor, setListDoctor] = useState([]);
    let [search, setSearch] = useState('');
    let searchDebounce = useDebounce(search, 500);;
    useEffect(() => {
        fetchDoctor();
    }, [searchDebounce, specialtyId]);
    let fetchDoctor = async () => {
        let response = await userService.getDoctor({ specialtyId: specialtyId, search: searchDebounce });
        if (response.data.EC === 0) {
            setListDoctor(response.data.DT);
        }
    }
    let handleChangeSearch = (event) => {
        setSearch(event.target.value);
    }
    return (
        <>
            <Input
                onChange={(e) => handleChangeSearch(e)}
                style={{ height: '40px', borderRadius: '5px', }}
                placeholder="Tìm nhanh chuyên khoa hoặc triệu chứng"
                suffix={<SearchOutlined />}
            />
            <div className="doctor-list mt-3">
                {listDoctor?.length > 0 && listDoctor.map((doctor, index) => (
                    <div className={"item"} key={index}>
                        <div className={"name"}><FontAwesomeIcon className="me-3" icon={faUserDoctor} />{doctor?.staffUserData?.lastName + " " + doctor?.staffUserData?.firstName}</div>
                        <p className={"gender"}>
                            <span>Giới tính:</span> {doctor?.staffUserData?.gender === 1 ? "Nữ" : "Nam"}
                        </p>
                        <p className={"specialty"}>
                            <span>Chuyên khoa:</span> {doctor?.staffSpecialtyData?.name || "Đa khoa"}
                        </p>
                        <p className={"schedule"}>
                            <span>Lịch khám:</span> {"Thứ 2, 4, 6"}
                        </p>
                        <p className={"price"}>
                            <span>Giá khám:</span> {formatCurrency(doctor?.price || 0)}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}
export default BookingDoctor;