import Container from "@/components/Container";
import Profile from "@/layout/Admin/components/Profile/Profile";
import "./ProfileUser.scss";
import emitter from "@/utils/eventEmitter";
import { EMIT } from "@/constant/value";
const ProfileUser = () => {
    return (
        <div className="profile-user">
            <div className="header-profile-user">
                <div className="btn-profile-user" onClick={() => { emitter.emit(EMIT.EVENT_PROFILE.key, EMIT.EVENT_PROFILE.info) }}>
                    Thông tin các nhân
                </div>
                <div className="btn-profile-user" onClick={() => { emitter.emit(EMIT.EVENT_PROFILE.key, EMIT.EVENT_PROFILE.changePassword) }}>
                    Đổi mật khẩu
                </div>
            </div>
            <Profile />
        </div>
    );
};
export default ProfileUser;