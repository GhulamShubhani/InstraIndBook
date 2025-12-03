import { Schema,model } from "mongoose";
import { IRefreshToken } from "../interface/refreshToken.interface";

const RefreshTokenSchema = new Schema<IRefreshToken>({
  tokenId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },
  authId: { type: String, required: true, index: true },
  hashedToken: { type: String, required: true },
  issuedAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true, index: true },
  revoked: { type: Boolean, default: false },
  userAgent: { type: String, default: null },
  ip: { type: String, default: null },
  deviceInfo: { type: String },
}, {
  timestamps: { currentTime: () => Date.now() },
  versionKey: false
});

RefreshTokenSchema.path("createdAt").get((v: Date) => (v ? v.getTime() : v));
RefreshTokenSchema.path("updatedAt").get((v: Date) => (v ? v.getTime() : v));
RefreshTokenSchema.set("toJSON", { getters: true, virtuals: true });

export const RefreshToken = model<IRefreshToken>("RefreshToken", RefreshTokenSchema);
