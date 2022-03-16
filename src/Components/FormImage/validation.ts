import * as yup from "yup";
import { message } from "../../utils/message";

export const photoSchema = yup.object().shape({
    description: yup.string().required(message.required),
});
