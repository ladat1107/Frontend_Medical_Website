import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthenModal from "@/components/AuthComponent";
import MainContextProvider from "@/contexts/MainContext";
import { AuthenContextProvider } from "@/contexts/AuthenContext";
function MainLayout() {
  return (
    <AuthenContextProvider>
      <MainContextProvider>
        <Header />
        <AuthenModal />
        <Outlet />
        <Footer />
      </MainContextProvider>
    </AuthenContextProvider>
  );
}

export default MainLayout;
