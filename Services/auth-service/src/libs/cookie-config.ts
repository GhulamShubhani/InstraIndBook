import { CookieOptions } from "express";

export const options: any = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.COOKIE_SECURE === "true",
  domain: process.env.COOKIE_DOMAIN,
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const oneDay = 1 * 24 * 60 * 60 * 1000; // 1 day in ms
const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export const accessCookie: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
  maxAge: oneDay,
};

export const refreshCookie: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
  maxAge: sevenDays,
};

export const clearAccessCookie: CookieOptions = {
  ...accessCookie,
  maxAge: 0,
};

export const clearRefreshCookie: CookieOptions = {
  ...refreshCookie,
  maxAge: 0,
};

// Local Development Cookies (HTTP, less strict)
export const localAccessCookie: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: oneDay,
};

export const localRefreshCookie: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: sevenDays,
};

export const clearLocalAccessCookie: CookieOptions = {
  ...localAccessCookie,
  maxAge: 0,
};

export const clearLocalRefreshCookie: CookieOptions = {
  ...localRefreshCookie,
  maxAge: 0,
};
