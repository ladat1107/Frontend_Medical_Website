import { ConfigProvider } from "antd";
import MainLayout from "./layout/User/index";
import ContactPage from "./layout/User/pages/Contact/index";
import AdminHomePage from "./layout/Admin/pages/HomePage/HomePageAdmin";
import HomePage from "./layout/User/pages/Home/index";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/AuthComponent/PrivateRouter";
import StaffManage from "./layout/Admin/pages/UserManage/Staff/StaffManage";
import PatientManage from "./layout/Admin/pages/UserManage/Patient/PatientManage";
import DoctorLayout from "./layout/Doctor";
import DoctorHomePage from "./layout/Doctor/pages/HomePage";
import Appointment from "./layout/Doctor/pages/Appointment";
import Examination from "./layout/Doctor/pages/Examination";
import AdminLayoutTest from "./layout/Admin/AdminLayout";
import DepartmentManage from "./layout/Admin/pages/DepartmentManage/DepartmentManage";
import Room from "./layout/Admin/pages/Room/RoomManage";
import ServiceOfRoom from "./layout/Admin/pages/ServiceOfRoom/ServiceOfRoomManage";
import Handbook from "./layout/Doctor/pages/Handbook/Handbook";
import Schedule from "./layout/Doctor/pages/Schedule";
import Specialty from "./layout/Admin/pages/Specialty/SpecialtyManage";
import Login from "./layout/User/pages/Login/Login";
import { PATHS } from "./constant/path";
import ReceptionistDashboard from "./layout/Receptionist/pages/Dashboard";
import ProfileAdmin from "./layout/Admin/pages/ProfileAdmin/ProfileAdmin";
import DoctorDetail from "./layout/User/pages/DoctorDetail";
import ProfileStaff from "./layout/Doctor/pages/ProfileStaff";
import HandbookAdmin from "./layout/Admin/pages/HandbookAdmin/HandbookAdmin";
import HandbookAdminDetail from "./layout/Admin/pages/HandbookAdmin/Detail";
import ScheduleManage from "./layout/Admin/pages/ScheduleManage/ScheduleManage";
import DoctorList from "./layout/User/pages/DoctorList";
import BlogList from "./layout/User/pages/BlogList";
import HandbookDetail from "./layout/Doctor/pages/Handbook/HandbookDetail/HandbookDetail";
import Booking from "./layout/User/pages/Booking/Booking";
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Be Vietnam Pro",
        }
      }}
    >
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={`${PATHS.HOME.DOCTOR_DETAIL}/:id`} element={<DoctorDetail />} />
          <Route path={PATHS.HOME.DOCTOR_LIST} element={<DoctorList />} />
          <Route path={PATHS.HOME.BOOKING} element={<Booking />} />
          <Route path={PATHS.HOME.HANDBOOK_LIST} element={<BlogList />} />
        </Route>

        <Route path={PATHS.HOME.LOGIN} element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AdminLayoutTest />}>
            <Route path={PATHS.ADMIN.DASHBOARD} element={<AdminHomePage />} />
            <Route path={PATHS.ADMIN.PATIENT_MANAGE} element={<PatientManage />} />
            <Route path={PATHS.ADMIN.STAFF_MANAGE} element={<StaffManage />} />
            <Route path={PATHS.ADMIN.DEPARTMENT_MANAGE} element={<DepartmentManage />} />
            <Route path={PATHS.ADMIN.SERVICE_MANAGE} element={<ServiceOfRoom />} />
            <Route path={PATHS.ADMIN.ROOM_MANAGE} element={<Room />} />
            <Route path={PATHS.ADMIN.SPECIALTY_MANAGE} element={<Specialty />} />
            <Route path={PATHS.ADMIN.PROFILE} element={<ProfileAdmin />} />
            <Route path={PATHS.ADMIN.HANDBOOK_MANAGE} element={<HandbookAdmin />} />
            <Route path={`${PATHS.ADMIN.HANDBOOK_DETAIL}/:id`} element={<HandbookAdminDetail />} />
            <Route path={PATHS.ADMIN.SCHEDULE_MANAGE} element={<ScheduleManage />} />
          </Route>

          <Route element={<DoctorLayout />}>
            <Route path={PATHS.STAFF.DASHBOARD} element={<DoctorHomePage />} />
            <Route path={PATHS.STAFF.APPOINTMENT} element={<Appointment />} />
            <Route path={PATHS.STAFF.EXAMINATION} element={<Examination />} />
            <Route path={PATHS.STAFF.HANDBOOK} element={<Handbook />} />
            <Route path={`${PATHS.STAFF.HANDBOOK}/:id`} element={<HandbookDetail />} />
            <Route path={PATHS.STAFF.SCHEDULE} element={<Schedule />} />
            <Route path={PATHS.STAFF.PROFILE} element={<ProfileStaff />} />
            <Route path={PATHS.RECEPTIONIST.DASHBOARD} element={<ReceptionistDashboard />} />
          </Route>

        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
