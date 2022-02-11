import * as yup from "yup";
import { message } from "../../utils/message";

export const dealSchema = yup.object().shape({
	businessName: yup.string().required(message.required),
	title: yup.string().required(message.required),
    description: yup.string().required(message.required),
    promoCode: yup.string().required(message.required),
	url: yup
		.string()
		.required(message.required)
		.url(message.url),
});
