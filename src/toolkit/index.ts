import {
  combineReducers
} from '@reduxjs/toolkit';

// Front
import ThemeReducer from "./themeLayouts/reducer";

// calender
import calenderReducer from "./Calendar/reducer";

// ecom
import EcomReducer from "./E-commerce/reducer";

//chat
import ChatReducer from "./Chat/reducer";

// email
import EmailReducer from "./Email/reducer";

//login
import authReducer from './authSlice';

// Combine your reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  Calender: calenderReducer,
  Ecom: EcomReducer,
  chat: ChatReducer,
  Email: EmailReducer,
  Theme: ThemeReducer
});

export {
  rootReducer
}