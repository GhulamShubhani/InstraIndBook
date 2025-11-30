import admin from "firebase-admin";
import logger from "./logger.utils";

const verifyFirebaseToken = async (idToken: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    logger.error("Unauthorized");
    throw new Error("Unauthorized");
  }
};
