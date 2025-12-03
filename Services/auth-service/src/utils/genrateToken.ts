import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { IRefreshToken } from "../interface/refreshToken.interface";
import { RefreshToken } from "../models/refreshToken.model";
import { IAuth } from "../interface/auth.interface";
import { TokenMeta } from "../interface/helper.interface";
import { addDays, getUserAgent } from "./helperFuntion";
import { extractIPAddress } from "./ip-geolocation";

/** Hash an opaque refresh token before saving/looking up */
export function hashRefreshToken(token: string) {
  const secret = process.env.REFRESH_TOKEN_SECRET!;
  return crypto.createHmac("sha256", secret).update(token).digest("hex");
}

// const isProd = process.env.NODE_ENV === "production";
// const SAME_SITE: "lax" | "strict" | "none" = isProd ? "none" : "lax";

export function issueAccessToken(user: IAuth) {
  const issuer = process.env.JWT_ISSUER || "auth-service";
  const audience = process.env.JWT_AUDIENCE || "user";
  const ttl: SignOptions["expiresIn"] = (process.env.ACCESS_TOKEN_TTL ||
    "15m") as SignOptions["expiresIn"];

  return jwt.sign(
    {
      sub: user.authId,
      email: user.email,
      role: user.userType,
      authId: user.authId,
    },
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: ttl, issuer, audience }
  );
}

/** Create & persist a new refresh token (opaque) */
export async function issueRefreshToken(
  user: any,
  meta?: TokenMeta
): Promise<{ refreshToken: string; doc: IRefreshToken }> {
  const raw = crypto.randomBytes(40).toString("hex");
  const hashed = hashRefreshToken(raw);
  const tokenId = uuidv4();

  const now = new Date();
  const ttlDays = Number(process.env.REFRESH_TOKEN_TTL_DAYS || 7);
  const expiresAt = await addDays(now, ttlDays);

  const ip = await extractIPAddress(meta?.req);
  const userAgent = await getUserAgent(meta);

  const doc = await RefreshToken.create({
    tokenId,
    authId: user.authId,
    hashedToken: hashed,
    issuedAt: now,
    expiresAt,
    revoked: false,
    userAgent,
    ip,
  });

  return { refreshToken: raw, doc };
}

/** Issue both tokens together */
export async function generateTokens(
  user: IAuth,
  meta?: TokenMeta
): Promise<{
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: string; // matches ACCESS_TOKEN_TTL
  refreshTokenId: string;
  refreshTokenExpiresAt: number;
}> {
  const accessToken = issueAccessToken(user);
  const { refreshToken, doc } = await issueRefreshToken(user, meta);

  return {
    accessToken,
    refreshToken,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_TTL || "15m",
    refreshTokenId: doc.tokenId,
    refreshTokenExpiresAt: doc.expiresAt.getTime(),
  };
}

/** Verify access token (throws if invalid/expired) */
export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
}

/** Rotate refresh token: returns new access/refresh; detects reuse */
// export async function rotateRefreshToken(
//   providedRefreshToken: string,
//   meta?: TokenMeta
// ): Promise<{
//   accessToken: string;
//   refreshToken: string;
//   refreshTokenId: string;
//   refreshTokenExpiresAt: number;
// }> {
//   const hashed = hashRefreshToken(providedRefreshToken);
//   const existing = await RefreshToken.findOne({ hashedToken: hashed }).exec();

//   if (!existing) {
//     // Reuse/unknown token — recommended: revoke all tokens for this user
//     throw new Error("Invalid refresh token");
//   }

//   if (existing.revoked) {
//     // Token reuse detected -> nuke the user's sessions
//     await revokeAllUserRefreshTokens(existing.authId);
//     throw new Error("Refresh token reused; all sessions revoked");
//   }

//   if (existing.expiresAt.getTime() <= Date.now()) {
//     throw new Error("Refresh token expired");
//   }

//   // Rotate: mark old as revoked, issue a new one
//   existing.revoked = true;
//   const { refreshToken: newRaw, doc: newDoc } = await issueRefreshToken(
//     { authId: existing.authId, email: "" }, // email not needed here for RT
//     meta
//   );
//   existing.replacedByTokenId = newDoc.tokenId;
//   await existing.save();

//   // New access token
//   // You likely want to read user email/role again from DB; if not available, keep payload minimal:
//     const ttl: SignOptions["expiresIn"] = (process.env.ACCESS_TOKEN_TTL || "15m") as SignOptions["expiresIn"];

//   const accessToken = jwt.sign(
//     { sub: existing.authId },
//     process.env.JWT_ACCESS_SECRET as string,
//     {
//       expiresIn: ttl,
//       issuer: process.env.JWT_ISSUER || "auth-service",
//       audience: process.env.JWT_AUDIENCE || "user",
//     }
//   );

//   return {
//     accessToken,
//     refreshToken: newRaw,
//     refreshTokenId: newDoc.tokenId,
//     refreshTokenExpiresAt: newDoc.expiresAt.getTime(),
//   };
// }

/** Revoke all tokens for a user (logout-all) */
export async function revokeAllUserRefreshTokens(authId: string) {
  await RefreshToken.updateMany(
    { authId, revoked: false },
    { $set: { revoked: true } }
  );
}

/** Revoke a single token by its id (logout single device) */
export async function revokeRefreshTokenById(tokenId: string) {
  await RefreshToken.updateOne({ tokenId }, { $set: { revoked: true } });
}

export async function revokeAllForUser(userId: string) {
  await RefreshToken.updateMany(
    { userId, revoked: false },
    { $set: { revoked: true } }
  );
}
