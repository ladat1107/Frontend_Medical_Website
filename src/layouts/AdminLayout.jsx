import { Outlet } from "react-router-dom";
import Header from "@/components/Admin/Header";
import Footer from "@/components/Footer";
import AuthenModal from "@/components/AuthComponent";
import MainContextProvider from "@/contexts/MainContext";
import { AuthenContextProvider } from "@/contexts/AuthenContext";
function AdminLayout() {
    return (
        <AuthenContextProvider>
            <MainContextProvider>
                <Header />

                <Outlet />
                <Footer />
            </MainContextProvider>
        </AuthenContextProvider>
    );
}

export default AdminLayout;
