import "./App.css";
import MainLayout from "./layouts/MainLayout";
import ContactPage from "./pages/Contact/index";
import AdminHomePage from "./pages/Admin/pages/HomePage";
import HomePage from "./pages/Home/index";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
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
import { PATHS } from "./constant/path";
function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Route>
      <Route element={<AdminLayoutTest />}>
        <Route path={PATHS.ADMIN.DASHBOARD} element={<AdminHomePage />} />
        <Route path={PATHS.ADMIN.PATIENT_MANAGE} element={<PatientManage />} />
        <Route path={PATHS.ADMIN.STAFF_MANAGE} element={<StaffManage />} />
        <Route path={PATHS.ADMIN.DEPARTMENT_MANAGE} element={<DepartmentManage />} />
        <Route path={PATHS.ADMIN.ROOM_MANAGE} element={<Room />} />
        <Route path={PATHS.ADMIN.SERVICE_MANAGE} element={<ServiceOfRoom />} />
        <Route path={PATHS.ADMIN.PROFILE} element={<Profile />} />
      </Route>
      <Route element={<DoctorLayout />}>
        <Route path='/doctor' element={<DoctorHomePage />} />
        <Route path='/doctorAppointment' element={<Appointment />} />
        <Route path='/doctorExamination/:examId' element={<Examination />} />
        <Route path='/doctorHandbook' element={<Handbook />} />
        <Route path='/doctorHandbook/:handbookId' element={<InfoHandbook />} />
        <Route path='/doctorSchedule' element={<Schedule />} />
      </Route>
    </Routes>
  );
}

export default App;
