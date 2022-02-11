import * as yup from "yup";
import { message } from "../../utils/message";

export const loginSchema = yup.object().shape({
	password: yup.string().required(message.required),
	email: yup.string().required(message.required).email(message.email)
});
