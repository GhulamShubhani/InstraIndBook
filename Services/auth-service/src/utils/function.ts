import { GeneralObject } from "./types";



export const sanatizeData = async (_data: GeneralObject = {}) => {
    const data: GeneralObject = {};
    const keys = Object.keys(_data);
  
    while (keys.length) {
      const key = keys.pop() as string;
      if (_data[key] !== undefined && _data[key] !== "undefined") {
        data[key] = _data[key];
      }
    }
  
    return data;
  };