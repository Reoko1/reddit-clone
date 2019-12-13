const validator = require("validator");

// Validate input on blur
export const validEmail = data => {
  const error = { email: "" };
  if (!validator.isEmail(data)) {
    error.email = "Invalid E-mail";
  }
  if (validator.isEmpty(data)) {
    error.email = "E-mail is required";
  }
  return {
    valid: Object.values(error)[0].length === 0,
    error
  };
};

export const validName = data => {
  const error = { name: "" };
  if (!validator.isLength(data, { min: 2, max: 20 })) {
    error.name = "Name must be between 2 and 20 characters";
  }
  if (validator.isEmpty(data)) {
    error.name = "Name is required";
  }
  return {
    valid: Object.values(error)[0].length === 0,
    error
  };
};

export const validPassword = data => {
  const error = { password: "" };
  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(data)) {
    error.password =
      "Password must contain atleast one lowercase character, one uppercase character, one digit and a symbol";
  }
  if (!validator.isLength(data, { min: 6, max: 32 })) {
    error.password = "Password must be between 6 and 32 characters";
  }
  if (validator.isEmpty(data)) {
    error.password = "Password is required";
  }
  return {
    valid: Object.values(error)[0].length === 0,
    error
  };
};

export const validConfirmPassword = (password, confirmPassword) => {
  const error = { confirmPassword: "" };
  if (!validator.equals(password, confirmPassword)) {
    error.confirmPassword = "Password and Confirm Password must match";
  }
  if (validator.isEmpty(confirmPassword)) {
    error.confirmPassword = "Confirm Password is required";
  }
  return {
    valid: Object.values(error)[0].length === 0,
    error
  };
};

// Validate form data on submit
export const validRegister = data => {
  const errors = {};

  if (!validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "Name must be between 2 and 20 characters";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid E-mail";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "E-mail is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 32 })) {
    errors.password = "Password must be between 6 and 32 characters";
  }
  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(data.password)) {
    errors.password =
      "Password must contain atleast one lowercase character, one uppercase character, one digit and a symbol";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Password and Confirm Password must match";
  }
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password is required";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

export const validLogin = data => {
  const errors = {};

  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};
