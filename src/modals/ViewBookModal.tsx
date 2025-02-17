// src/components/BookModal.tsx
import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import { BookModalProps } from "../utils/types";

const BookModal: React.FC<BookModalProps> = ({ open, onClose, book }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 326,
          bgcolor: (theme) => theme.palette.background.default,
          borderRadius: 4,
          boxShadow: 24,
          p: 2,
        }}
        className="shadow-lg bg-white border border-gray-200"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <Typography variant="h5" className="font-bold  text-text">
            View Book
          </Typography>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            ✖
          </button>
        </div>

        {book && (
          <div className="space-y-3">
            <Typography variant="h6" className="text-[#133618] font-semibold">
              Name: <span className="font-medium text-text">{book.name}</span>
            </Typography>
            <Typography variant="h6" className="text-text ">
              Author: <span className="font-medium">{book.author}</span>
            </Typography>
            <Typography variant="h6" className="text-text">
              Price: <span className="font-medium">₹{book.price}</span>
            </Typography>
            <Typography variant="h6" className="text-text">
              Stock: <span className="font-medium">{book.stock}</span>
            </Typography>

            <div className="flex justify-center mt-2">
              <img
                src={book.image}
                alt={book.name}
                className="w-[180px] h-[240px] object-contain border rounded-lg shadow-md"
              />
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default BookModal;
