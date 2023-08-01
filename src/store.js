import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './components/usersSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});