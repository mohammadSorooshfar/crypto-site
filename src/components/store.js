import { configureStore } from "@reduxjs/toolkit";
import storedReducer from "./storedValues";

export default configureStore({
  reducer: {
    stored: storedReducer,
  },
});
