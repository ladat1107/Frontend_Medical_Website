import React, { createContext, useEffect, useState } from "react";
import { localToken, localUser } from "@/utils/token";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
import { message } from "antd";
import { ROLE } from "@/constant/role";
export const AuthenContext = createContext({});

export const AuthenProvider = ({ children }) => {

  const [user, setUser] = useState(localUser.get());
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      // navigate(PATHS.HOME.LOGIN);
    }
  }, [user, navigate]);
  const login = async (loginData) => {
    const payload = { ...loginData };
    if (payload?.user && payload?.accessToken) {
      setUser((prev) => {
        localToken.set(payload.accessToken);
        localUser.set(payload.user);
        return payload.user;
      });
      message.success("Đăng nhập thành công");
      if (payload?.user?.role === ROLE.ADMIN) {
        navigate(PATHS.ADMIN.DASHBOARD);
      } else if (payload?.user?.role === ROLE.PATIENT) {
        // navigate(PATHS.HOME.HOMEPAGE);
      } else {
        navigate(PATHS.STAFF.DASHBOARD);
      }
    };
  };
  const logout = () => {
    localToken.remove();
    localUser.remove();
    setUser(null);
    // navigate(PATHS.HOME.LOGIN);
    message.success("Đăng xuất thành công");
  };
  return (
    <AuthenContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthenContext.Provider>
  );
};

