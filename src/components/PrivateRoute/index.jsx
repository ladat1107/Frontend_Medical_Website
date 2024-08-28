import { Outlet } from "react-router-dom";
import { localToken } from "@/utils/token";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function PrivateRoute() {
 
  const location = useLocation();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!localToken.get()?.accessToken) {
     
    } else {
      setIsAuthChecked(true);
      
    }
  }, [location, handleShowModal]);

  return <Outlet />;
}

export default PrivateRoute;
