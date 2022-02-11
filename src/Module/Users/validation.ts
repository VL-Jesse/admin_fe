import * as yup from "yup";
import { message } from "../../utils/message";

export const addUserSchema = yup.object().shape({
	firstName: yup.string().required(message.required),
	lastName: yup.string().required(message.required),
	email: yup.string().required(message.required).email(message.email),
});
