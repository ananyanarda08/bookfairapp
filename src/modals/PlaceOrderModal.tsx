import React from "react";
import { Modal, Box, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { PlaceOrderModalProps } from "../utils/types";
import { OrderValidationSchema } from "../utils/validations/PlaceOrderValidation";

const PlaceOrderModal: React.FC<PlaceOrderModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const initialValues = { name: "", address: "", phone: "" };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="font-bold text-text text-center">Place Order</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <Close />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={OrderValidationSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur, values, touched, errors }) => (
            <Form>
              <div>
                <label className="block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  className="w-full p-2 mt-2 border border-primary rounded"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Your Name"
                />
                {touched.name && errors.name && (
                  <div className="text-red-500 text-xs">{errors.name}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mt-2">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full p-2 mt-2 border border-primary rounded"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Your Address"
                />
                {touched.address && errors.address && (
                  <div className="text-red-500 text-xs">{errors.address}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mt-2">
                  Phone
                </label>
                <input
                  type="text"
                  className="w-full p-2 mt-2 border border-primary rounded"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Your Contact Number"
                />
                {touched.phone && errors.phone && (
                  <div className="text-red-500 text-xs">{errors.phone}</div>
                )}
              </div>
              <Button
                type="submit"
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "white",
                  width: "100%",
                  mt: 3,
                }}
              >
                Confirm Order
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default PlaceOrderModal;
