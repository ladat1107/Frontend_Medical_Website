import "./App.css";
import 'flowbite';
import MainLayout from "./layouts/MainLayout";
import ContactPage from "./pages/Contact/index";
import HomePage from "./pages/Admin/pages/HomePage/index";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/Admin/index";
function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path='/admin' element={<HomePage />} />

      </Route>
    </Routes>
  );
}

export default App;
