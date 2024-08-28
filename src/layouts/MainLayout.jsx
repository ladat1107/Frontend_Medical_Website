
import MainContextProvider from "@/contexts/MainContext";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <MainContextProvider>
    
          <Outlet />
       
    </MainContextProvider>
  );
}

export default MainLayout;
