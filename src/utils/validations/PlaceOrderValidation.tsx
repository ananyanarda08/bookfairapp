import * as Yup from "yup";

export const OrderValidationSchema = Yup.object({
  name: Yup.string()
    .max(15, "Name cannot exceed 15 characters")
    .required("Name is required"),
  address: Yup.string()
    .max(30, "Address cannot exceed 30 characters")
    .required("Address is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});
