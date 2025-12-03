import axios from "axios";
import { GeoLocation } from "../interface/helper.interface";
import logger from "./logger.utils";



/**
 * Get geolocation information from IP address
 * Uses ip-api.com free API (no API key required, limit: 45 requests/minute)
 * @param ipAddress - The IP address to lookup
 * @returns GeoLocation object with latitude and longitude
 */
export async function getGeoLocationFromIP(
  ipAddress: string
): Promise<GeoLocation> {
  try {
    // Skip geolocation for localhost or private IPs
    if (
      !ipAddress ||
      ipAddress === "::1" ||
      ipAddress === "127.0.0.1" ||
      ipAddress.startsWith("192.168.") ||
      ipAddress.startsWith("10.") ||
      ipAddress.startsWith("172.")
    ) {
      return {};
    }

    // Use ip-api.com free service (no API key needed)
    const response = await axios.get(`http://ip-api.com/json/${ipAddress}`, {
      timeout: 3000, // 3 second timeout
    });

    if (response.data && response.data.status === "success") {
      return {
        latitude: response.data.lat,
        longitude: response.data.lon,
        country: response.data.country,
        city: response.data.city,
      };
    }

    return {};
  } catch (error: any) {
    // Log error but don't throw - geolocation is optional
    logger.warn(`Failed to get geolocation for IP ${ipAddress}: ${error.message}`);
    return {};
  }
}

/**
 * Extract real IP address from request headers
 * Handles proxies and load balancers
 * @param req - Express request object
 * @returns IP address string
 */
export function extractIPAddress(req: any): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwarded.split(",")[0].trim();
  }

  return (
    req.headers["x-real-ip"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip ||
    "unknown"
  );
}


