import "./App.css";
import 'flowbite';
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home/index";
import ContactPage from "./pages/Contact/index";
import AdminHomePage from "./pages/adminPages/Home";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path='/admin' element={<AdminHomePage />} />

      </Route>
    </Routes>
  );
}

export default App;
