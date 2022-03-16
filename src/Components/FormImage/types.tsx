export interface IFormImage {
  open: boolean;
  setOpen: Function;
  service: "online-deals" | "businesses";
  setUrl: Function
}

export interface IFormImageData {
  file: File;
  extension: string;
  service: "online-deals" | "businesses";
  description: string;
}
