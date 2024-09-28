import React, { createContext, useContext, useEffect, useState } from "react";
import { MODAL_TYPE } from "@/constant/general";
import { localToken } from "@/utils/token";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
import { message } from "antd";
const AuthenContext = createContext({});

export const AuthenContextProvider = ({ children }) => {
  const [showModal, setShowMadal] = useState("");

  const [profile, setProfile] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!!localToken.get()?.accessToken) {
      handleGetProfile?.();
    }
  }, []);

  const handleShowModal = (type_modal, path = null) => {
    setShowMadal(type_modal || "");
  };

  const handleModalClose = () => {
    setShowMadal("");
  };

  const handleLogin = async (loginData, callBack) => {
    // const payload = { ...loginData };

    // try {
    //   // call API
    //   // const res = await authenService.login(payload);
    //   const res = true;

    //   if (res?.data.data) {
    //     const { token: accessToken, refreshToken } = res?.data.data || {};
    //     // save token on client storage
    //     localToken.set({
    //       accessToken,
    //       refreshToken,
    //     });

    //     // get infor profile
    //     handleGetProfile?.();

    //     handleModalClose?.();
    //     message.success("Đăng nhập thành công");

    //     // redirect home page after login if user not access on private route (origin login)
    //     navigate(PATHS.HOME);

    //     // use toast
    //   } else {
    //     message.error("Login fail ! please try again");
    //   }
    // } catch (error) {
    //   console.log("error", error);
    //   message.error("Login fail ! please try again");
    //   //use toast
    // } finally {
    //   callBack?.();
    // }
  };

  const handleRegister = async (registerData, callBack) => {
    const payload = {
      firstName: registerData?.name,
      lastName: "",
      email: registerData?.email,
      password: registerData?.password,
    };

    try {
      // call API
      // const res = await authenService.register(payload);
      const res = true;
      if (res?.data?.data?.id) {
        // call handle login after finish register
        // call handleLogin here and push email & password for login after register
        //handleLogin({payload.email, payload.password})
        message.success("Register success");
        handleShowModal(MODAL_TYPE.login);
      } else {
        message.success("Register fail");
      }
    } catch (error) {
      console.log("error", error);
      message.success("Register fail");
    } finally {
      callBack?.();
    }
  };

  const handleLogout = () => {
    localToken.remove();
    navigate(PATHS.HOME);
    message.success("Đăng xuất thành công");
  };

  const handleGetProfile = async () => {
    try {
      // call API
      const res = true;
      // const res = await authenService.getProfile();
      if (res?.data?.data) {
        setProfile(res.data.data);
      }
    } catch (error) {
      message.error(error);
      // handleLogout();
    }
  };

  const handleDropdown = (id) => {
    const element = document.getElementById(id);
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden')
    } else {
      element.classList.add('hidden')
    }
  };
  return (
    <AuthenContext.Provider
      value={{
        handleShowModal,
        handleModalClose,
        handleLogin,
        handleRegister,
        handleLogout,
        handleDropdown,
        showModal,
        profile,

      }}
    >
      {children}
    </AuthenContext.Provider>
  );
};

export const useAuthenContext = () => useContext(AuthenContext);
