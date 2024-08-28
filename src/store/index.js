import { ENV } from "@/constant/environment";
import { configureStore } from "@reduxjs/toolkit";
//import authReducer from "./Reducer/authReducer";
//import cartReducer from "./Reducer/cartReducer";


const store = configureStore({
  reducer: {
    // auth: authReducer,
    // cart: cartReducer
  },
  // preloadedState,
  devTools: ENV === 'development',
});


export default store;
