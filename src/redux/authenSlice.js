import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    token: "",
    user: null,
};
export const authenSlice = createSlice({
    name: 'authen',
    initialState,
    reducers: {
        setToken: (state, action) => {
            console.log("action.payload", action.payload);
            state.token = action.payload;
        },
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = "";
            state.user = null;
        },
    },
});

// Export các action để sử dụng trong component
export const { login, logout, setToken } = authenSlice.actions;

// Export reducer để sử dụng trong store
export default authenSlice.reducer;
