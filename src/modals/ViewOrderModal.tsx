import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { OrderModalProps } from "../utils/types";

const OrderModal: React.FC<OrderModalProps> = ({ open, onClose, order }) => {
  const totalPrice = order?.items.reduce((acc, item) => {
    const itemPrice = typeof item.price === "number" ? item.price : 0;

    const itemQuantity = typeof item.quantity === "number" ? item.quantity : 0;

    return acc + itemPrice * itemQuantity;
  }, 0);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
        className="shadow-lg bg-white border border-gray-200 "
      >
        <div className="  max-h-[550px] overflow-y-auto p-2">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <Typography variant="h5" className="font-extrabold text-text">
              Order Details
            </Typography>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition"
            >
              ✖
            </button>
          </div>

          <div className="space-y-2">
            <Typography variant="h6" sx={{ color: "#1F2937", fontWeight: 900 }}>
              Name:{" "}
              <span className="font-semibold text-gray-800 ">
                {order?.name}
              </span>
            </Typography>
            <Typography className="text-gray-800 ">
              Address:{" "}
              <span className="font-medium truncate">{order?.address}</span>
            </Typography>
            <Typography className="text-gray-800 ">
              Phone: <span className="font-medium">{order?.phone}</span>
            </Typography>
            {order?.items.map((item, index) => (
              <div
                key={index}
                className="space-y-2 border border-gray-600 p-1 "
              >
                <Typography sx={{ color: "#1F2937", fontWeight: 900 }}>
                  Book Name:<span className="font-semibold">{item.name}</span>
                </Typography>
                <Typography sx={{ color: "#1F2937", fontWeight: 900 }}>
                 
                  <div className="flex justify-between">
                 <span className="font-semibold"> Quantity:{" "}{item.quantity}</span>
                  <span className="font-semibold">  ₹{item.price} per item</span>
                  </div>
                </Typography>
               
              </div>
            ))}
            {totalPrice !== undefined && (
              <div className="flex justify-between mt-4 font-semibold">
                <Typography sx={{ color: "#1F2937", fontWeight: 900 }}>
                  Total Price:
                </Typography>
                <Typography sx={{ color: "#1F2937", fontWeight: 900 }}>
                  ₹{totalPrice}
                </Typography>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                borderColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.main,
                "&:hover": {
                  borderColor: (theme) => theme.palette.primary.main,
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: "black",
                },
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default OrderModal;
