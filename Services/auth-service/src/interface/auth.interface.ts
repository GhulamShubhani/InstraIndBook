import { Document } from "mongoose";

export type RegistrationMethod = "email" | "google";

export interface IAuth extends Document {
  authId: string;
  email: string;
  password: string;

  firebaseUID?: string;
  googleId?: string;
  registrationMethod: RegistrationMethod | null;

  phoneE164?: string | null; // "+919876543210"
  phoneCallingCode?: string | null; // "91" (no '+')

  isEmailVerified?: boolean;
  isMobileVerified?: boolean;

  isTwoFactorEnabled: boolean;
  refreshTokenHash?: string | null;

  failedLoginAttempts: number;
  accountLocked: boolean;
  lockExpiresAt?: Date | null;

  lastPasswordChange?: Date | null;

  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date;

  userType?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreatedPayload = {
  userId: string;           // stable id you generated in Auth (UUID/ULID)
  email: string;
  firstName: string;
  lastName: string;
  phoneE164?: string | null;
  phoneCallingCode?: string | null; // "91"
  countryIso2?: string | null;      // "IN"
};

