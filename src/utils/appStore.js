import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    // feed: feedReducer,
    // connections: connectionReducer,
    // requests: requestReducer,
  },
});
export default store;
