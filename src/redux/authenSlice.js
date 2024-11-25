import { PATHS } from '@/constant/path';
import { ROLE } from '@/constant/role';
import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

const initialState = {
    isLoggedIn: false,
    token: "",
    user: null,
};
export const authenSlice = createSlice({
    name: 'authen',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = "";
            state.user = null;
            message.success("Đăng xuất thành công");
        },
    },
});

// Export các action để sử dụng trong component
export const { login, logout } = authenSlice.actions;

// Export reducer để sử dụng trong store
export default authenSlice.reducer;
