import * as Yup from "yup";

export const AddModalValidationSchema = Yup.object({
  name: Yup.string()
    .required("Book name is required")
    .max(30, "Name should not be more than 30 characters"),
  author: Yup.string()
    .required("Author is required")
    .max(15, "Author should not be more than 15 characters"),
  price: Yup.number()
    .required("Price is required")
    .max(5000, "Price limit is 5000"),
  stock: Yup.number()
    .required("Stock is required")
    .integer("Must be an integer")
    .max(500, "Book limit is 500"),
  image: Yup.string().required("Image is required"),
});
