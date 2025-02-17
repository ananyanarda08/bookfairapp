// validationSchema.ts
import * as Yup from "yup";

export const strictEmailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .max(15, "Name cannot be more than 15 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(strictEmailRegex, "Invalid email format"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(10, "Password cannot be more than 10 characters")
    .required("Password is required"),
  type: Yup.string()
    .oneOf(["buyer", "seller"], "Please select one option")
    .required("Please select a role"),
  shopName: Yup.string().when("type", {
    is: "seller",
    then: (schema) => schema.required("Shop name is required for sellers"),
    otherwise: (schema) => schema.notRequired(),
  }),
  address: Yup.string().when("type", {
    is: "seller",
    then: (schema) => schema.required("Address is required for sellers"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
