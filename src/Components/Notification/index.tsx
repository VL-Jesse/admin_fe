import { Store } from 'react-notifications-component';
import { INotification } from './type';


export const Notification = ({title, message, type = "info"}: INotification) =>{
    Store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });

}
