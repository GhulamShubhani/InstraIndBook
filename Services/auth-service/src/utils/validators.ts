

const validateRequest = (schema:any, data:any) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    throw new Error(error.details.map((e:any) => e.message).join(", "));
  }
  return value;
};

export {validateRequest}