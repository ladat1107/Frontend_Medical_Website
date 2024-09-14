import "./App.css";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./Pages/Home";
import ContactPage from "./Pages/Contact";
import { Routes, Route } from "react-router-dom";

function App() {
 
  return (
    <Routes>
      <Route  element={<MainLayout/>}>
        <Route index element={<HomePage/>} />
        <Route path='/contact' element={<ContactPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
