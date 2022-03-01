import {
  IAddressModelsJson,
  IFormPut,
  IWorkingHours,
} from "../interface/businessTypes";

export const dateFormat = (data: IFormPut) => {
  const newData = JSON.parse(JSON.stringify(data))
  const result = newData.AddressModels.map((address: IAddressModelsJson) => {
    const result: IWorkingHours[] = address.workingHours.filter(
      (hour: IWorkingHours) => {
        if(!hour.isOpen) return 
        hour.closeTime = `2022-02-02T${hour.closeTime}:00.354Z`;
        hour.openTime = `2022-02-02T${hour.openTime}:00.354Z`;
        return hour;
      }
    );
    address.workingHours = result;
    return address;
  });
  newData.AddressModels = result;
  return newData;
};

export const stringFormat = (workingHours: IWorkingHours[]) => {
  return workingHours.map((hour: IWorkingHours) => {
    const close = new Date(hour.closeTime);
    const open = new Date(hour.openTime);
    hour.closeTime = `${twoDigits(close.getUTCHours())}:${twoDigits(close.getUTCMinutes())}`;
    hour.openTime = `${twoDigits(open.getUTCHours())}:${twoDigits(open.getUTCMinutes())}`;
    return hour;
  });
};

const twoDigits= (time: number) => ("0" + time).slice(-2)