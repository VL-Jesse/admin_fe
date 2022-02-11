import { Notification } from "../Components/Notification";
import { NOTIFICATION_TYPE } from 'react-notifications-component';
// import { logout } from "../Reducer/authReducer";
import axios from "axios";
import { store } from "../app/store";

export const validateResponse = (error?: number, title?: string ,message?: string, type?: NOTIFICATION_TYPE ) => {
  switch (error) {
    case 409:
      return Notification({title: "Warning", message:"Duplicate data", type: "warning"})
    case 201: 
      return Notification({title: "Success", message:"Successfully added", type: "success"})
    case 201: 
      return Notification({title: "Warning", message:"Invalid values", type: "warning"})
    default:
      return Promise.reject(error);
  }
}