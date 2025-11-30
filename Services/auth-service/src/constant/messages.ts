const MESSAGES = Object.freeze({
    // Success messages
    SUCCESS: "Request completed successfully",
    LOGIN_SUCCESS: "Login successful",
    VERIFIED: "Verification successful",
    PASSWORD_RESET_SUCCESS: "Password updated successfully",
    UPDATE_SUCCESS: "Record updated successfully",
    DELETE_SUCCESS: "Record deleted successfully",
    CREATE_SUCCESS: "Record created successfully",
    LOGOUT_SUCCESS: "Logged out successfully",
    FORBIDDEN: "Role is not allowed",
  
    // Invalid messages
    PHONE_AND_CODE_REQUIRED: "Phone number and country code are required",
    INVALID_USER: "Not a valid user",
    INVALID_EMAIL: "Email not found",
    INVALID_OPERATION: "Invalid operation",
    INVALID_CREDENTIALS: "Invalid credentials",
    INVALID_ID: "Please provide valid record ID(s)",
    INVALID_CONTACT: "Invalid number, please check your phone number",
    INVALID_OTP: "Invalid verification code, please check the code and try again",
    VALIDATE_FILE: "Please upload a valid CSV/Excel file",
    REQUIRED_FIELDS: "Please add all the required fields",
    PROVIDE_FILE: "Please provide file(s)",
  
    // Error messages
    TRY_AGAIN: "Something went wrong, try again",
    ERROR: "Something went wrong",
    VALIDATION_ERROR: "Validation error",
    INTERNAL_SERVER_ERROR: "Internal server error",
    INVALID_TOKEN: "Token expired or invalid",
    EXPIRE_URL: "URL has expired",
    TOKEN_EXPIRED: "Token expired",

    // Not messages
    NOT_FOUND: "Data not found",
    NO_RECORDS: "No data found",
    USER_NOT_FOUND: "User not found",
    RECORD_NOT_CREATED: "Record not created",
    VERIFICATION_CODE_ERROR: "Verification code error",
    ALREADY_CALLED: "Already called",
    PHONE_COUNT_INCREMENTED: "Phone count incremented",
    JOBS_NOT_AVAILABLE: "No free jobs are available",
    BUSINESSADS_NOT_AVAILABLE: "No free business ads are available",
    SUBSCRIPTION_NOT_FOUND: "Subscription not found",
    SUBSCRIPTION_ALREADY_EXISTS: "Subscription already exists",
    SAME_DATE_RECORD: "Record for the same date exists",
    NO_PHONE_CALL_AVAILABLE: "No phone call available",
  
    // Failure messages
    BAD_REQUEST: "Bad request",
    RECORD_CONFLICT: "Record already exists",
    ALREADY_VERIFIED: "Verification already completed",
    VERIFICATION_CODE_EXPIRED: "Verification code expired",
    SAME_PASSWORD_ERROR:
      "New password must be different from the existing password",
    WRONG_PASSWORD:
      "Your current password is wrong, please enter the correct password",
  
    // Unauthorized
    UNAUTHORISED: "Requested resource is unauthorized",
    VERIFICATION_MAIL_SENT:
      "A verification email has been sent to your registered email address, please check your inbox",
    USER_ID_CONFLICT: "User ID already exists",
  
    // verification
    EMAIL_SENT: "Email Sent",
    EMAIL_VERIFIED: "Email verified",
    EMAIL_NOT_VERIFIED: "Email not verified",
    PHONE_NOT_VERIFIED: "Phone not verified",
    EMAIL_OR_PHONE_NOT_VERIFIED: "Email or Phone not verified",
    EMAIL_OR_PHONE_REQUIRED: "Email or Phone Required",
    INVALID_GOOGLE_TOKEN: "Invalid Google token",
    GOOGLE_USER_FETCH_FAILUR: "Unable to extract user from Google token",
    EMAIL_REQUIRED: "Email Required",
    PHONE_REQUIRED: "Phone Required",
    ID_REQUIRED: "Id Required",
    WALLET_ID_REQUIRED: "Wallet Id Required",
    PASS_VERIFICATION_FAILED:
      "Password Must contain atleast One capital letter and one Special character",
  });
  
  const DB_MESSAGES = Object.freeze({
    URL_NOT_FOUND: "Database Connection URL not found",
    CONNECTION_FAILED: "Database not connected please check again.....",
    CONNECTION_SUCCESS: "Database connected.",
  });
  
  const MODULE_MESSAGES = Object.freeze({
    UNIQUE_ERROR: "Module already exists",
    CREATE_SUCCESS: "Module created successfully",
    CREATE_ERROR: "An error occurred while creating the module",
    UPDATE_ERROR: "Cannot update module",
    UPDATE_SUCCESS: "Module updated successfully",
    NOT_FOUND: "Module not found",
    QUERY_PROCESS_ERROR: "Cannot update module",
    DELETE_SUCCESS: "Module has been deleted successfully",
    DELETE_ERROR: "An error occurred while deleting the module",
  });
  
  const ADMIN_USER_MESSAGES = Object.freeze({
    CREATED: "Admin created successfully",
    NOT_FOUND: "Admin not found",
    FETCHING_ERROR: "An error occurred while fetching the admin",
    FETCHING: "Admin found successfully",
    CREATE_ERROR: "An error occurred while creating the admin",
    DELETE_SUCCESS: "Admin has been deleted successfully",
    DELETE_ERROR: "An error occurred while deleting the admin",
    UPDATE_SUCCESS: "Admin updated successfully",
    UPDATE_ERROR: "An error occurred while updating the admin",
    QUERY_PROCESS_ERROR: "Cannot update admin",
    UNIQUE_DATA_ERROR: "Email or phone already registered",
    NO_RECORDS: "Data not found",
    ON_CHAIN_ID_UPDATE_SUCCESS: "Chain ID created successfully",
    ON_CHAIN_ID_UPDATE_ERROR: "An error occurred while update chain ID",
    WHITELISTED_UPDATE_SUCCESS: "Whitelisted update successfully",
    WHITELISTED_UPDATE_ERROR: "An error occurred while update Whitelisted",
    LOGIN_ACTIVITY_FOUND: "Login activity successfully recorded.",
  });
  
  const USER_MESSAGES = Object.freeze({
    MISSING_EMAIL:"Missing required 'Email'",
    MISSING_PASSWORD:"Missing required 'Password'",
    MISSING_MOBILE_NUMBER:"Missing required 'Mobile Number'",
    MISSING_ACCEPT_TERMS:"Missing required 'Accepted Terms'",
    MISSING_REQUIRED_DATA:
      "Missing required key(s) 'email', 'password', 'mobileNumber', 'acceptedTerms'",
    WALLET_ID_NOT_LINKED: "Wallet id is not linked.",
    ONCHAIN_ID_REQUIRED: "OnChain Id is Required",
    CREATED: "User created successfully",
    NOT_FOUND: "User not found",
    FIREBASE_ID_NOT_FOUND: "Firebase id not found",
    FETCHING_ERROR: "An error occurred while fetching the user",
    FETCHING: "User found successfully",
    CREATE_ERROR: "An error occurred while creating the user",
    DELETE_SUCCESS: "User has been deleted successfully",
    DELETE_ERROR: "An error occurred while deleting the user",
    UPDATE_SUCCESS: "User updated successfully",
    UPDATE_ERROR: "An error occurred while updating the user",
    QUERY_PROCESS_ERROR: "Cannot update user",
    UNIQUE_DATA_ERROR: "Email or phone already registered",
    NO_RECORDS: "Data not found",
    INVALID_TOKEN: "Invalid Token",
    METAMASK_ALREADY_MAPPED: "This Metamask is already mapped",
    CHANGE_PASSWORD_SUCCESS: "Password is Changed",
    CHANGE_PASSWORD_ERROR: "An error occurred while change Password of the user",
    SAME_PASSWORD:"You are passing same Password",
    BAD_PASSWORD:"You are passing worng Password",
    FETCH_WALLET:"Successfully fetch wallet data",
    NO_WALLET_FOUND:"No wallet Found",
    WALLET_FOUND:"Wallet Already Taken",
    WALLET_NOT_FETCH:"Fail to fetch wallet data",
    GOOGLE_USER_CANNOT_RESET_PASSWORD:"Reset your password grom google",
    TOKEN_EXPIRED:"Your token is expired",
    UNIQUE_PHONE_ERROR:"Provided Mobile Number is Already Registered!",
    USER_ALREADY_EXISTS: "User already exists",
    INVALID_PASSWORD: "Invalid password",
  });
  
  const PROPERTY_MESSAGES = Object.freeze({
    CREATED: "Property created successfully",
    NOT_FOUND: "Property not found",
    FETCHING_ERROR: "An error occurred while fetching the user",
    FETCHING: "Property found successfully",
    CREATE_ERROR: "An error occurred while creating the user",
    DELETE_SUCCESS: "Property has been deleted successfully",
    DELETE_ERROR: "An error occurred while deleting the user",
    UPDATE_SUCCESS: "Property updated successfully",
    UPDATE_ERROR: "An error occurred while updating the user",
    QUERY_PROCESS_ERROR: "Cannot update user",
    NO_RECORDS: "Data not found",
    REQUIRED_FILES: "File(s) are required",
    UPLOAD_SUCCESS: "All files are uploaded",
    UPLOAD_ERROR: "Error uploading try again",
    INVALID_METADATA: "Invalid metadata Object"
  });
  
  const TRANSACTION_MESSAGES = Object.freeze({
    CREATED: "Transaction created successfully",
    NOT_FOUND: "Transaction not found",
    FETCHING_ERROR: "An error occurred while fetching the Transaction",
    FETCHING: "Transaction found successfully",
    CREATE_ERROR: "An error occurred while creating the Transaction",
    DELETE_SUCCESS: "Transaction has been deleted successfully",
    DELETE_ERROR: "An error occurred while deleting the Transaction",
    UPDATE_SUCCESS: "Transaction updated successfully",
    UPDATE_ERROR: "An error occurred while updating the Transaction",
    QUERY_PROCESS_ERROR: "Cannot update Transaction",
    NO_RECORDS: "Data not found",
    REQUIRED_FILES: "File(s) are required",
    UPLOAD_SUCCESS: "All files are uploaded",
    UPLOAD_ERROR: "Error uploading try again",
    INVALID_METADATA: "Invalid metadata Object"
  });
  
  export {
    MESSAGES,
    ADMIN_USER_MESSAGES,
    USER_MESSAGES,
    MODULE_MESSAGES,
    DB_MESSAGES,
    PROPERTY_MESSAGES,
    TRANSACTION_MESSAGES,
  };
  