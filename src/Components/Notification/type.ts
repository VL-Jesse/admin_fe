import { NOTIFICATION_TYPE } from 'react-notifications-component';

export interface INotification {
    type: NOTIFICATION_TYPE;
    message: string;
    title: string;
}