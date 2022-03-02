import * as yup from "yup";
import { IDealYup } from "../../../interface/userTypes";
import { message } from "../../../utils/message";

const checkDeals = (parent: IDealYup, value: string | number | undefined) => {
  if (parent.orderIndex === 0 && !value) return false;
  return true;
};

const checkDealsPrice = (
  parent: IDealYup,
  value: string | number | undefined | null
) => {
  if (parent.orderIndex === 0 && !value) return false;
  if (
    (parent.title || parent.disclaimer || parent.shortDescription) &&
    !value
  ) {
    return false;
  }
  return true;
};

const scheduleItemSchema = {
  openTime: yup
    .string()
    .test("allow-empty", message.timeRequire, function (value) {
      if (!this.parent.isOpen) return true;
      return !!value;
    })
    .test("time-duration", message.timeDuration, function (value) {
      const { closeTime, isOpen } = this.parent;
      if (!isOpen) return true;
      value = value ?? "00:00";
      return value < closeTime;
    }),
  closeTime: yup
    .string()
    .test("allow-empty", message.timeRequire, function (value) {
      if (!this.parent.isOpen) return true;
      return !!value;
    })
    .test("time-duration", message.timeDuration, function (value) {
      const { openTime, isOpen } = this.parent;
      if (!isOpen) return true;
      value = value ?? "00:00";
      return openTime < value;
    }),
};

const dealSchema = {
  title: yup.string().test("required", message.required, function (value) {
    return checkDeals(this.parent, value);
  }),
  maxMoneyAmount: yup
    .mixed()
    .test("required", message.required, function (value) {
      return checkDealsPrice(this.parent, value);
    }),
  disclaimer: yup.string().test("required", message.required, function (value) {
    return checkDeals(this.parent, value);
  }),
  shortDescription: yup
    .string()
    .test("required", message.required, function (value) {
      return checkDeals(this.parent, value);
    }),
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
  ReservationUrl: yup.string().url(message.url),
  Category: yup.number().required(message.required),
  dealModels: yup.array().of(yup.object().shape(dealSchema)),
  ContactName: yup.string().required(message.required),
  ContactEmail: yup.string().required(message.required).email(message.email),
  ContactPhone: yup.string().required(message.required),
});
