import { useMutation } from "@/hooks/useMutation";
import "./Profile.scss";
import { getNameDepartment, getSpecialtySelect, getUserById } from "@/services/adminService";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCircleInfo, faNotesMedical, faUnlockKeyhole, faUser } from "@fortawesome/free-solid-svg-icons";
import Information from "./section/Information";
import Password from "./section/Password";
import Notification from "./section/Notification";
import { apiService } from "@/services/apiService";
import useQuery from "@/hooks/useQuery";
import { info } from "sass";
import StaffInfo from "./section/staff";
import { set } from "lodash";
import { AuthenContext } from "@/contexts/AuthenContext";
let item = {
    info: "information",
    changePassword: "changePassword",
    staff: "staff",
    insurance: "insurance",
    notifications: "notifications"
}
const Profile = () => {
    let { user } = useContext(AuthenContext);
    let [profile, setProfile] = useState({});
    const [selectedItem, setSelectedItem] = useState(item.info);
    const [folks, setListfolks] = useState([]);
    let { data: folkdata } = useQuery(() => apiService.getAllFolk())
    let [specialty, setSpecailty] = useState([]);
    let { data: specialtyData } = useQuery(() => getSpecialtySelect())
    let {
        data: dataProfile,
        loading: listProfileLoading,
        execute: fetchProfile,
    } = useMutation((query) =>
        getUserById(user.id)
    )
    useEffect(() => {
        if (specialtyData && specialtyData?.DT?.length > 0) {
            setSpecailty(specialtyData.DT);
        }
    }, [specialtyData])
    useEffect(() => {
        if (folkdata?.length > 0) {
            let _folk = folkdata.map((item) => {
                return {
                    value: +item.id,
                    label: item.name
                }
            })
            setListfolks(_folk);
        } else {
            setListfolks([]);
        }
    }, [folkdata])
    useEffect(() => {
        if (dataProfile && dataProfile.DT) {
            setProfile(dataProfile.DT)
        }
    }, [dataProfile])

    useEffect(() => {
        setSelectedItem(item.infor);
        fetchProfile();
    }, []);
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };
    let refresh = () => {
        fetchProfile();
    }
    return (
        <div className="staff-profile" >
            <div className="container row py-5 d-flex">
                <div className="left-profile col-12 col-md-5 col-lg-3">
                    <div className="content py-4 pe-4">
                        <div
                            className={`ps-4 py-2 my-1  ${selectedItem === item.infor ? "item-click" : "item"}`}
                            onClick={() => handleItemClick(item.infor)}
                        >
                            <FontAwesomeIcon className="icon" icon={faUser} />
                            <span className="ps-3">Thông tin cá nhân</span>
                        </div>
                        <div
                            className={`ps-4 py-2 item ${selectedItem === item.changePassword ? "item-click" : "item"}`}
                            onClick={() => handleItemClick(item.changePassword)}
                        >
                            <FontAwesomeIcon className="icon" icon={faUnlockKeyhole} />
                            <span className="ps-3">Đổi mật khẩu</span>
                        </div>
                        {profile?.staffUserData?.id &&
                            <div
                                className={`ps-4 py-2 item ${selectedItem === item.staff ? "item-click" : "item"}`}
                                onClick={() => handleItemClick(item.staff)}
                            >
                                <FontAwesomeIcon className="icon" icon={faCircleInfo} />
                                <span className="ps-3">Hồ sơ nghề nghiệp</span>
                            </div>
                        }
                        <div
                            className={`ps-4 py-2 item ${selectedItem === item.insurance ? "item-click" : "item"}`}
                            onClick={() => handleItemClick(item.insurance)}
                        >
                            <FontAwesomeIcon className="icon" icon={faNotesMedical} />
                            <span className="ps-3">Bảo hiểm y tế</span>
                        </div>
                        <div
                            className={`ps-4 py-2 item ${selectedItem === item.notifications ? "item-click" : "item"}`}
                            onClick={() => handleItemClick(item.notifications)}
                        >
                            <FontAwesomeIcon className="icon" icon={faBell} />
                            <span className="ps-3">Thông báo</span>
                        </div>

                    </div>
                </div>
                <div className="right-profile col-12 col-md-7 col-lg-9 ps-5">
                    <div className="content">
                        {selectedItem === item.infor && profile?.id && folks.length > 0 &&
                            <Information
                                refresh={refresh}
                                folks={folks}
                                data={profile}
                                key={Date.now() + profile.id}
                            />}
                        {selectedItem === item.changePassword && profile?.id &&
                            <Password
                                data={profile.id}
                            />}
                        {selectedItem === item.staff && specialty.length > 0 && <StaffInfo
                            refresh={refresh}
                            department={profile?.staffUserData?.staffDepartmentData}
                            specialty={specialty}
                            data={profile}
                            key={Date.now() + profile.id}
                        />}
                        {selectedItem === item.insurance && <div>Bảo hiểm</div>}
                        {selectedItem === item.notifications && <Notification />}
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Profile;