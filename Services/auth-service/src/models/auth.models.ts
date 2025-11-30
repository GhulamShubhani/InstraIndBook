import mongoose, { Schema } from "mongoose";
import { IAuth } from "../interface/auth.interface";
import ApiError from "../utils/ApiError";
import bcrypt from "bcrypt";
import { NextFunction } from "express";


const AuthSchema: Schema = new Schema<IAuth>(
  {
    authId: {
      type: String,
      required: [true, "Auth ID is required"],
      unique: true,
      trim: true,
      minlength: [5, "Auth ID must be at least 5 characters long"],
      maxlength: [50, "Auth ID cannot exceed 50 characters"],
      index: true,
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      // minlength: [5, "Email must be at least 5 characters long"],
      maxlength: [100, "Email cannot exceed 100 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [100, "Password cannot exceed 100 characters"],
      trim: true,
    },

    googleId: {
      type: String,
      trim: true,
      default: null,
    },
    firebaseUID: {
      type: String,
      trim: true,
      default: null,
    },
    registrationMethod: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },

    phoneE164: { type: String, default: null, trim: true },
    phoneCallingCode: { type: String, default: null, trim: true },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isMobileVerified: {
      type: Boolean,
      default: false,
    },

    isTwoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    refreshTokenHash: { type: String, default: null },

    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    accountLocked: {
      type: Boolean,
      default: false,
    },
    lockExpiresAt: {
      type: Date,
      default: null,
    },

    lastPasswordChange: { type: Date, default: null },

    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },

    userType: {
      type: String,
      enum: [
        "user",
        "superAdmin",
        "admin",
        "subAdmin",
        "localAdmin",
        "demo",
        "seller",
      ],
      default: "user",
    },

    
  },
  {
    timestamps: {
      currentTime: () => Date.now(),
    },
    versionKey: false,
  }
);

AuthSchema.path("createdAt").get((v: Date) => (v ? v.getTime() : v));
AuthSchema.path("updatedAt").get((v: Date) => (v ? v.getTime() : v));
AuthSchema.set("toJSON", { getters: true, virtuals: true });
AuthSchema.set("toObject", { getters: true, virtuals: true });

AuthSchema.index({ email: 1 }, { unique: true });
AuthSchema.index({ authId: 1 }, { unique: true });

AuthSchema.pre("save", async function (next:NextFunction) {
  if (!this.isModified("password")) return next();
  try {
    const password = String(this.password);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new ApiError(500, "Internal Server Error"));
    }
  }
});

AuthSchema.methods.isPasswordCorrect = async function (
  candidatePassword: string
) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new ApiError(500, "Internal Server Error");
    }
  }
};



export const AuthModel = mongoose.model<IAuth>("Auth", AuthSchema);
