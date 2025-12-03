import { IAuth } from "../interface/auth.interface";
import { auth } from "../libs/firebase";
import { AuthModel } from "../models/auth.models";
import ApiError from "../utils/ApiError";
import { sanatizeData } from "../utils/function";


 const getUserByEmail = async (email: string) => {
  const user = await AuthModel.findOne({ email, isDeleted: false });
  return user;
};

 const createFirebaseUser = async (userData: IAuth) => {
  const { email, password, phoneE164 } = userData;
  try {
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    console.log("Creating Firebase user with email:", email);
    let user;
    user = await auth.getUserByEmail(email);
    if (user === undefined || user === null) {
      user = await auth.getUserByPhoneNumber(phoneE164);
    }
    console.log("User already exists:", user.uid);
    return user;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      console.log("User not found, creating new user");
      const user = await auth.createUser({
        email,
        phoneNumber: phoneE164 ? `+${phoneE164}` : undefined,
        password,
        emailVerified: true,
      });
      return user;
    } else {
      console.log("Error creating user:", error);
      throw error;
    }
  }
};

 const createUser = async (userData: IAuth) => {
  const {
    authId,
    email,
    password,

    firebaseUID,
    googleId,
    registrationMethod,

    phoneE164,
    phoneCallingCode,

    userType,
  } = userData;

  console.log("userData", userData);

  const __user = await getUserByEmail(email as string);

  if (__user) {
    throw new ApiError(400, "User already exists");
  }

  const payload = await sanatizeData({
    authId,
    email,
    password,

    firebaseUID,
    googleId,
    registrationMethod,

    phoneE164,
    phoneCallingCode,

    userType,
  });
  const user = new AuthModel(payload);

  const data = await user.save();

  if (!data) {
    throw new ApiError(400, "User not created");
  }
  return data;
};


export {createUser,createFirebaseUser,getUserByEmail}
