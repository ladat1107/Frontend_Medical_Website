import { useMutation } from "@/hooks/useMutation";
import "./Profile.scss";
import { getSpecialtySelect, getUserById } from "@/services/adminService";
import { useContext, useEffect, useState } from "react";
import Information from "./section/Information";
import Password from "./section/Password";
import Notification from "./section/Notification";
import { apiService } from "@/services/apiService";
import useQuery from "@/hooks/useQuery";
import StaffInfo from "./section/staff";
import { EMIT } from "@/constant/value";
import emitter from "@/utils/eventEmitter";
import { useSelector } from "react-redux";
const Profile = () => {
    //let { user } = useContext(AuthenContext);
    let { user } = useSelector((state) => state.authen);
    let [profile, setProfile] = useState({});
    const [selectedItem, setSelectedItem] = useState(EMIT.EVENT_PROFILE.info);
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
    let handleEvent = (event) => {
        setSelectedItem(event);
    }
    useEffect(() => {
        fetchProfile();
        emitter.on(EMIT.EVENT_PROFILE.key, handleEvent);

        // Cleanup khi component unmount để tránh rò rỉ bộ nhớ
        return () => {
            emitter.removeListener(EMIT.EVENT_PROFILE.key, handleEvent);
        };

    }, []);
    let refresh = () => {
        fetchProfile();
    }
    return (
        <div className="staff-profile" >
            <div className="container row py-5 d-flex justify-content-start">
                <div className="right-profile col-10 ps-5">
                    <div className="content">
                        {selectedItem === EMIT.EVENT_PROFILE.info && profile?.id && folks.length > 0 &&
                            <Information
                                refresh={refresh}
                                folks={folks}
                                data={profile}
                                key={Date.now() + profile.id}
                            />}
                        {selectedItem === EMIT.EVENT_PROFILE.changePassword && profile?.id &&
                            <Password
                                data={profile.id}
                            />}
                        {selectedItem === EMIT.EVENT_PROFILE.staff && specialty.length > 0 && <StaffInfo
                            refresh={refresh}
                            department={profile?.staffUserData?.staffDepartmentData}
                            specialty={specialty}
                            data={profile}
                            key={Date.now() + profile.id}
                        />}
                        {selectedItem === EMIT.EVENT_PROFILE.insurance && <div>Bảo hiểm</div>}
                        {selectedItem === EMIT.EVENT_PROFILE.notifications && <Notification />}
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Profile;