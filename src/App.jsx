import "./App.css";
import 'flowbite';
import MainLayout from "./layouts/MainLayout";
import ContactPage from "./pages/Contact/index";
import AdminHomePage from "./pages/Admin/pages/HomePage/index";
import HomePage from "./pages/Home/index";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./pages/Admin/index";
import UserManage from "./pages/Admin/pages/UserManage";
import DoctorLayout from "./pages/Doctor";
import DoctorHomePage from "./pages/Doctor/pages/HomePage";
import Appointment from "./pages/Doctor/pages/Appointment";
import Examination from "./pages/Doctor/pages/Examination";
function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path='/admin' element={<AdminHomePage />} />
        <Route path='/adminUserManage' element={<UserManage />} />
      </Route>
      <Route element={<DoctorLayout />}>
        <Route path='/doctor' element={<DoctorHomePage />} />
        <Route path='/doctorAppointment' element={<Appointment />} />
        <Route path='/doctorExamination' element={<Examination />} />
      </Route>
    </Routes>
  );
}

export default App;
