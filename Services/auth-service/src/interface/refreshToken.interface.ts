

export interface IRefreshToken extends Document{
    tokenId:string;
    authId:string;
    hashedToken:string;
    issuedAt:Date;
    expiresAt:Date;
    revoked:boolean;
    userAgent?: string | null;
    ip?:string| null;
    deviceInfo?:string|null;
    createdAt:Date;
    updatedAt?:Date;
}