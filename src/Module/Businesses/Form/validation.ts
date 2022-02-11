import * as yup from "yup";
import { message } from "../../../utils/message";

const scheduleItemSchema = {
	openTime: yup
		.string()
		.test("allow-empty", message.timeRequire, function (value) {
			if (!this.parent.isOpen) return true;
			return !!value;
		})
		.test(
			"time-duration",
			message.timeDuration,
			function (value) {
				const { closeTime, isOpen } = this.parent;
				if (!isOpen) return true
				value= value ?? "00:00"
				return value < closeTime 
			},
		),
	closeTime: yup
	.string()
	.test("allow-empty", message.timeRequire, function (value) {
        if (!this.parent.isOpen) return true;
		return !!value;
    })
    .test(
        "time-duration",
        message.timeDuration,
        function (value) {
            const { openTime, isOpen } = this.parent;
            if (!isOpen) return true
			value= value ?? "00:00"
			return openTime < value 
        },
    ),
};

const dealSchema = {
	title: yup.string().required(message.required),
	maxMoneyAmount: yup.number().typeError(message.number).positive(message.positive).required(message.required),
	disclaimer: yup.string().required(message.required),
	shortDescription: yup.string().required(message.required),
};

const addressModelSchema = {
	addressLine: yup.string().required(message.required),
	state: yup.string().required(message.required),
	city: yup.string().required(message.required),
	zipCode: yup.string().required(message.required),
	workingHours: yup.array().of(yup.object().shape(scheduleItemSchema)),
};

export const addBusinessSchema = yup.object().shape({
	BusinessName: yup.string().required(message.required),
	AddressModels: yup.array().of(yup.object().shape(addressModelSchema)),
	Description: yup.string().required(message.required),
	WebsiteUrl: yup.string().url(message.url).required(message.required),
	ReservationUrl: yup.string().url(message.url).required(message.required),
	Category: yup.number().required(message.required),
    dealModels: yup.array().of(yup.object().shape(dealSchema)),
    ContactName: yup.string().required(message.required),
    ContactEmail: yup.string().required(message.required).email(message.email),
    ContactPhone: yup.string().required(message.required)
});