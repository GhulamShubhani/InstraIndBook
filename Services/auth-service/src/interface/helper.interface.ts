import { Request } from "express";

export interface TokenMeta {
  req?: Request;
  ip?: string | null;
  userAgent?: string | null;
}

export interface GeoLocation {
  latitude?: number;
  longitude?: number;
  country?: string;
  city?: string;
}
