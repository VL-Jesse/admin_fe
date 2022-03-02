import { IFormPut } from "../interface/businessTypes";

export const exitsModel = (data: IFormPut) => {
  const newData: IFormPut = JSON.parse(JSON.stringify(data));
  const deal1 = newData.dealModels[0]
  const deal2 = newData.dealModels[1]
  if(!deal2.disclaimer && !deal2.maxMoneyAmount && !deal2.shortDescription && !deal2.title ){
     newData.dealModels = [deal1]
  }
  return newData
};
