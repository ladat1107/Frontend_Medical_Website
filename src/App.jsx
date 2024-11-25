// import "./App.css";
import MainLayout from "./layouts/MainLayout";
import ContactPage from "./pages/Contact/index";
import AdminHomePage from "./pages/Admin/pages/HomePage";
import HomePage from "./pages/Home/index";
import { Routes, Route, useNavigate } from "react-router-dom";
import PrivateRoute from "./components/AuthComponent/PrivateRouter";
import StaffManage from "./pages/Admin/pages/UserManage/Staff";
import PatientManage from "./pages/Admin/pages/UserManage/Patient";
import DoctorLayout from "./pages/Doctor";
import DoctorHomePage from "./pages/Doctor/pages/HomePage";
import Appointment from "./pages/Doctor/pages/Appointment";
import Examination from "./pages/Doctor/pages/Examination";
import AdminLayoutTest from "./pages/Admin";
import DepartmentManage from "./pages/Admin/pages/DepartmentManage";
import Room from "./pages/Admin/pages/Room";
import ServiceOfRoom from "./pages/Admin/pages/ServiceOfRoom";
import Profile from "./pages/Admin/components/Profile";
import Handbook from "./pages/Doctor/pages/Handbook";
import InfoHandbook from "./pages/Doctor/pages/Handbook/InfoHandbook";
import Schedule from "./pages/Doctor/pages/Schedule";
import Specialty from "./pages/Admin/pages/Specialty";
import Login from "./pages/Login";
import { PATHS } from "./constant/path";
import ReceptionistLayout from "./pages/Receptionist";
import ReceptionistDashboard from "./pages/Receptionist/components/Dashboard";
import ProfileAdmin from "./pages/Admin/pages/ProfileAdmin";
import DoctorDetail from "./Pages/User/pages/DoctorDetail";
import ProfileStaff from "./pages/Doctor/pages/ProfileStaff";
import HandbookAdmin from "./pages/Admin/pages/HandbookAdmin";
import HandbookAdminDetail from "./pages/Admin/pages/HandbookAdmin/Detail";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ROLE } from "./constant/role";
function App() {
  let navigate = useNavigate();
  let { user } = useSelector((state) => state.authen);

  useEffect(() => {
    if (user) {
      console.log("user", user);
      if (user.role === ROLE.ADMIN) {
        navigate(PATHS.ADMIN.DASHBOARD);
      } else if (user.role === ROLE.PATIENT) {
        navigate(PATHS.HOME.HOMEPAGE);
      } else {
        navigate(PATHS.STAFF.DASHBOARD);
      }
    }
  }, [user]);
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<PrivateRoute />}>
        </Route>
        <Route index element={<HomePage />} />
        <Route path='/doctor-detail' element={<DoctorDetail/>} />
        {/* <Route path='/doctor-detail' element={<ContactPage />} /> */}
      </Route>
      {/* <Route path={PATHS.HOME.LOGIN} element={<Login />} /> */}
      {/* <Route element={<PrivateRoute />}>
        <Route element={<AdminLayoutTest />}>
          <Route path={PATHS.ADMIN.DASHBOARD} element={<AdminHomePage />} />
          <Route path={PATHS.ADMIN.PATIENT_MANAGE} element={<PatientManage />} />
          <Route path={PATHS.ADMIN.STAFF_MANAGE} element={<StaffManage />} />
          <Route path={PATHS.ADMIN.DEPARTMENT_MANAGE} element={<DepartmentManage />} />
          <Route path={PATHS.ADMIN.ROOM_MANAGE} element={<Room />} />
          <Route path={PATHS.ADMIN.SERVICE_MANAGE} element={<ServiceOfRoom />} />
          <Route path={PATHS.ADMIN.SPECIALTY_MANAGE} element={<Specialty />} />
          <Route path={PATHS.ADMIN.PROFILE} element={<ProfileAdmin />} />
          <Route path={PATHS.ADMIN.HANDBOOK_MANAGE} element={<HandbookAdmin />} />
          <Route path={`${PATHS.ADMIN.HANDBOOK_DETAIL}/:id`} element={<HandbookAdminDetail />} />
        </Route>
        <Route element={<DoctorLayout />}>
          <Route path={PATHS.STAFF.DASHBOARD} element={<DoctorHomePage />} />
          <Route path={PATHS.STAFF.APPOINTMENT} element={<Appointment />} />
          <Route path={PATHS.STAFF.EXAMINATION} element={<Examination />} />
          <Route path={PATHS.STAFF.HANDBOOK} element={<Handbook />} />
          <Route path={PATHS.STAFF.INFO_HANDBOOK} element={<InfoHandbook />} />
          <Route path={PATHS.STAFF.SCHEDULE} element={<Schedule />} />
          <Route path={PATHS.STAFF.PROFILE} element={<ProfileStaff />} />
        </Route>
        <Route element={<ReceptionistLayout />}>
          <Route path={PATHS.RECEPTIONIST.DASHBOARD} element={<ReceptionistDashboard />} />
        </Route>
      </Route> */}
    </Routes>
  );
}

export default App;
