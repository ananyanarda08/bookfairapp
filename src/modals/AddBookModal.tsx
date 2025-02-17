import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import CustomInputField from "../components/CustomInputField";
import { axiosInstance } from "../api/AxiosInstance";
import { BookFormProps } from "../utils/types";
import { AddModalValidationSchema } from "../utils/validations/AddModalValidation";
import { toast, ToastContainer } from "react-toastify";

const BookForm: React.FC<BookFormProps> = ({
  closeModal,
  refreshBooks,
  bookData,
}) => {
  const [image, setImage] = useState<string | null>(bookData?.image || null);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: bookData?.name || "",
    author: bookData?.author || "",
    price: bookData?.price || "",
    stock: bookData?.stock || "",
    image: bookData?.image || "",
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setIsLoading(true);

    const updatedBook = {
      ...values,
      image: image || "https://via.placeholder.com/150",
    };

    try {
      let response;
      if (bookData) {
        response = await axiosInstance.put(
          `/books/${bookData.id}`,
          updatedBook
        );
      } else {
        response = await axiosInstance.post("/books", updatedBook);
      }

      if (response.status === 200 || response.status === 201) {
        resetForm();
        setImage(null);
        refreshBooks();
        closeModal();
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Error saving book. Please try again.");
    }
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "450px",
          bgcolor: (theme) => theme.palette.background.default,
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          overflow: "auto",
        }}
        className="shadow-lg bg-white border border-gray-200"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            {bookData ? "Edit Book" : "Add Book"}
          </Typography>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-red-500 transition"
          >
            ✖
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={AddModalValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue, errors, touched }) => (
            <Form className="space-y-4">
              <CustomInputField
                label="Book Name"
                name="name"
                type="text"
                placeholder="Enter book name"
                className="border-primary"
                required
              />
              <CustomInputField
                label="Author"
                name="author"
                type="text"
                placeholder="Enter author name"
                className="border-primary"
                required
              />
              <CustomInputField
                label="Price"
                name="price"
                type="number"
                placeholder="Enter price"
                className="border-primary"
                required
              />
              <CustomInputField
                label="Stock"
                name="stock"
                type="number"
                placeholder="Enter stock count"
                className="border-primary"
                required
              />

              <div className="mt-3">
                <Typography className="font-semibold text-gray-700 mb-1">
                  Upload Image <span className="text-red-500">*</span>
                </Typography>

                <input
                  type="file"
                  id="fileInput"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target) {
                        setImage(event.target.result as string);
                        setFieldValue("image", event.target.result);
                      }
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />

                <label
                  htmlFor="fileInput"
                  className="cursor-pointer p-4 border-2 border-dashed rounded-lg flex justify-center items-center text-gray-700 hover:bg-gray-100"
                >
                  {image ? "Click to Update Image" : "Click to Upload Image"}
                </label>

                {touched.image && errors.image && (
                  <div className="text-red-500 text-sm">{errors.image}</div>
                )}

                {image && (
                  <div className="flex justify-center mt-3">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-[120px] h-[160px] object-contain border rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: (theme) => theme.palette.primary.main,
                    "&:hover": { bgcolor: "#6c2286" },
                    width: { xs: "100%", sm: "auto" },
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : bookData ? (
                    "Update Book"
                  ) : (
                    "Add Book"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </Box>
    </Modal>
  );
};

export default BookForm;
