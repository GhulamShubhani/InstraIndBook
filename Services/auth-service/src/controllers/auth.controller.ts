import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  loginValidatorSchema,
  registerValidatorSchema,
} from "../validators/auth.validators";
import { validateRequest } from "../utils/validators";
import { AuthModel } from "../models/auth.models";
import { STATUS_CODES } from "../constant/message-status";
import logger from "../utils/logger.utils";
import { MESSAGES, USER_MESSAGES } from "../constant/messages";
import { IAuth } from "../interface/auth.interface";
import { createFirebaseUser, createUser } from "../service/auth.service";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { options } from "../libs/cookie-config";
import { issueAccessToken, issueRefreshToken } from "../utils/genrateToken";
import { removeTokenById, setNormalToken } from "../libs/redis";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const value = validateRequest(registerValidatorSchema, req.body);

    const {
      email,
      password,
      phoneE164,
      phoneCallingCode,
      userType = "user",
      registrationMethod,
    } = value;
    const existingUser = await AuthModel.findOne({
      $or: [{ email }, { phoneE164 }],
      isDeleted: false,
    });
    if (existingUser) {
      logger.warn("User already exists:", existingUser.email);
      return res.status(400).json({
        success: false,
        status: STATUS_CODES.BAD_REQUEST,
        message: USER_MESSAGES.USER_ALREADY_EXISTS,
      });
    }
    const firstLetter = email ? email : phoneE164.replace("+", "");
    const authId = `${firstLetter}-${Math.floor(
      Math.random() * 1000000
    )}-${Date.now()}`;
    console.log(authId);
    const firebaseDetails: any = await createFirebaseUser(req.body as IAuth);
    if (!firebaseDetails || !firebaseDetails.uid) {
      throw new ApiError(500, "Failed to create Firebase user");
    }
    const AuthUser = await createUser({
      authId,
      ...req.body,
      firebaseUID: firebaseDetails.uid,
      createdAt: Date.now(),
    } as IAuth);

    console.log("AuthUser created:", AuthUser);

    if (!AuthUser) {
      console.log("User creation failed:", req.body);
      logger.error("User creation failed");

      throw new ApiError(400, "User not created");
    }
    res.status(STATUS_CODES.SUCCESS).send({
      status: STATUS_CODES.SUCCESS,
      message: USER_MESSAGES.CREATED,
    });
  } catch (error: any) {
    logger.error("Error during user registration:", error);
    const code = error?.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
    const message = error?.message || MESSAGES.ERROR;
    res.status(code).json({ message });
  }
});

export const userlogin = asyncHandler(async (req: Request, res: Response) => {
  try {
    const value = validateRequest(loginValidatorSchema, req.body);
    const { email, phoneE164, password } = value;
    const isUserValid = await AuthModel.findOne({
      $or: [{ email }, { phoneE164 }],
      isDeleted: false,
      accountLocked: false,
    }).select("-password -refreshToken");
    if (!isUserValid) {
      logger.warn("Invalid user credentials:", email || phoneE164);
      // throw new ApiError(404, USER_MESSAGES.NOT_FOUND);
      return res.status(404).json({
        success: false,
        status: STATUS_CODES.NOT_FOUND,
        message: USER_MESSAGES.NOT_FOUND,
      });
    }
    const isMatch = await isUserValid.isPasswordCorrect(password as string);
    if (!isMatch) {
      logger.warn("Invalid password for user:", isUserValid.email);
      return res.status(400).json({
        success: false,
        status: STATUS_CODES.BAD_REQUEST,
        message: USER_MESSAGES.INVALID_PASSWORD,
      });
    }

    const accessToken = await issueAccessToken(isUserValid);

    const { refreshToken } = await issueRefreshToken(isUserValid);

    if (isUserValid?.isTwoFactorEnabled) {
      console.log("need to complete");
    } else {
      setNormalToken(
        "user",
        isUserValid?.authId,
        isUserValid?._id,
        accessToken,
        refreshToken
      );
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, "successFullyAuthenticated"));
  } catch (error) {}
});

export const userLogout = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await AuthModel.findByIdAndUpdate(
      req?.user!._id,
      {
        refreshToken: null,
      },
      { new: true }
    );
    if (!user) {
      throw new ApiError(404, USER_MESSAGES.NOT_FOUND);
    }
    if (user?.isTwoFactorEnabled) {
      console.log("need to complete");
    } else {
      removeTokenById("user", user?.authId, user?._id);
    }
    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options);
    res.status(STATUS_CODES.SUCCESS).send({
      status: STATUS_CODES.SUCCESS,
      message: MESSAGES.LOGOUT_SUCCESS,
    });
  } catch (error) {}
});
