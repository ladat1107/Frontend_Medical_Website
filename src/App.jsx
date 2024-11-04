import "./App.css";
import MainLayout from "./layouts/MainLayout";
import ContactPage from "./pages/Contact/index";
import AdminHomePage from "./pages/Admin/pages/HomePage";
import HomePage from "./pages/Home/index";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
//import AdminLayout from "./pages/Admin";
import StaffManage from "./pages/Admin/pages/UserManage/Staff";
import PatientManage from "./pages/Admin/pages/UserManage/Patient";
import DoctorLayout from "./pages/Doctor";
import DoctorHomePage from "./pages/Doctor/pages/HomePage";
import Appointment from "./pages/Doctor/pages/Appointment";
import Examination from "./pages/Doctor/pages/Examination";
import AdminLayoutTest from "./pages/Admin";
import DepartmentManage from "./pages/Admin/pages/DepartmentManage";
function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Route>
      <Route element={<AdminLayoutTest />}>
        <Route path='/admin' element={<AdminHomePage />} />
        <Route path='/adminPatientManage' element={<PatientManage />} />
        <Route path='/adminStaffManage' element={<StaffManage />} />
        <Route path='/adminDepartmentManage' element={<DepartmentManage />} />
      </Route>
      <Route element={<DoctorLayout />}>
        <Route path='/doctor' element={<DoctorHomePage />} />
        <Route path='/doctorAppointment' element={<Appointment />} />
        <Route path='/doctorExamination/:examId' element={<Examination />} />
      </Route>
    </Routes>
  );
}

export default App;
