import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    // .min(8, "Password should be of minimum 8 characters length")
    // .matches(/[0-9]/g, "Password must contain a number.")
    // .matches(/[A-Z]/g, "Password must contain a capital letter.")
    // .matches(/[#?!@$%^&*-]/g, "Password must contain a special character.")
    .required("Password is required"),
});

export const registrationValidationSchema = yup.object({
  registrationEmail: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  registrationPassword: yup
    .string("Enter your password")
    .matches(/^\S*$/g, "Password should be without white space.")
    .min(8, "Password should be of minimum 8 characters length.")
    .matches(/[0-9]/g, "Password must contain a number.")
    .matches(/[A-Z]/g, "Password must contain a capital letter.")
    .matches(/[#?!@$%^&*-]/g, "Password must contain a special character.")
    .required("Password is required")
  ,
  registrationName: yup
    .string("Enter your name")
    .required("Name is required")
  ,
  // registrationSecQue: yup
  //   .string("Enter your security question answer")
  //   .nullable()
  //   .max(128, "Maximum length allowed is 128 characters"),
  // .required("Answer to this question is required"),
  registrationAge: yup
    .string()
    .matches(/^[0-9]+$/, "Age must be only digits")
    .min(1, "Enter a valid age"),
  privacy: yup.boolean().oneOf([true, "true"], 'Please agree to register'),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

export const resetPasswordSchema = yup.object({
  newPassword: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(/[0-9]/g, "Password must contain a number.")
    .matches(/[A-Z]/g, "Password must contain a capital letter.")
    .matches(/[#?!@$%^&*-]/g, "Password must contain a special character.")
    .required("Password is required"),
  reEnterPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords don't match")
    .required("Confirm password is required"),
  // registrationSecQue: yup
  //   .string("Enter your security question answer")
  //   .max(128, "Maximum length allowed is 128 characters")
  //   .required("Answer to this question is required"),
});

export const OTPSchema = yup.object({
  otp: yup
    .string()
    .required("Verification code is a required field")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6"),
});
