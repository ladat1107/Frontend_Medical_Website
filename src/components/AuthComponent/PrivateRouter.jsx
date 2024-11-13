
import { Outlet, Navigate } from "react-router-dom";
import { AuthenContext } from "@/contexts/AuthenContext";
import { PATHS } from "@/constant/path";
import { useContext } from "react";
const PrivateRouter = () => {
    const { user } = useContext(AuthenContext);
    console.log("user private", user);
    return user ? <Outlet /> : <Navigate to={PATHS.HOME.LOGIN} />;
}

export default PrivateRouter;