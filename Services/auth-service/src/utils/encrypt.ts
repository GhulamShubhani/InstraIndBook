import CryptoJS from "crypto-js";



export function encryptData(data: object): string {
    const SECRET_KEY = process.env.SECRET_KEY as string;

    if (!SECRET_KEY) {
      console.error("SECRET_KEY is missing in backend!");
      throw new Error("Encryption key is not set");
    }
  
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
  }