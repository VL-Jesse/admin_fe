import { IImage, IOnlineDealEdit } from "../interface/onlineDealsTypes";

export const onlineDealsFormat = (data: IOnlineDealEdit): IOnlineDealEdit => {
  let imgDelete: number[] | null = null 
	if(data.image){
		const image: IImage[] = Array.isArray(data.image) ? data.image : [data.image];
		imgDelete = image.map((img: IImage) => img.id); 
	}
  return {
    ...data,
    ImageIdsToDelete: imgDelete
  };
};
