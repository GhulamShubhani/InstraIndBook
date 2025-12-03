import Joi from "joi";

const registerValidatorSchema = Joi.object({
  email: Joi.string().optional().messages({
    "string.base": "email must be a string",
    "any.optional": "email is optional",
  }),
  password: Joi.string().required().messages({
    "string.base": "email must be a string",
    "any.reuired": "email is required",
  }),
  phoneCallingCode: Joi.number().optional().messages({
    "number.base": "phoneCallingCode must be a number like 91",
    "any.optional": "phoneCallingCode is optional",
  }),
  phoneE164: Joi.string().optional().messages({
    "string.base": "phone number must be a string like +919900000000",
    "any.optional": "phone number is optional",
  }),
  registrationMethod: Joi.string().optional().messages({
    "string.base": "registrationMethod must be a string",
    "any.optional": "registrationMethod is optional",
  }),
});
const loginValidatorSchema = Joi.object({
  email: Joi.string().optional().messages({
    "string.base": "email must be a string",
    "any.optional": "email is optional",
  }),
  password: Joi.string().required().messages({
    "string.base": "email must be a string",
    "any.reuired": "email is required",
  }),
});


export {registerValidatorSchema,loginValidatorSchema}
