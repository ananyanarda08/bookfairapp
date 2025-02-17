import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Button, IconButton } from "@mui/material";
import {
  Delete,
  Remove,
  Add,
  ArrowBack,
  ShoppingCart,
} from "@mui/icons-material";
import Layout from "../../layout/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../../api/AxiosInstance";
import PlaceOrderModal from "../../modals/PlaceOrderModal";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [openOrderModal, setOpenOrderModal] = useState(false);

  const handleSubmitOrder = async (values: any) => {
    const orderData = {
      ...values,
      items: cart.map((book) => ({
        id: book.id,
        name: book.name,
        price: book.price,
        quantity: book.quantity,
      })),
      createdAt: new Date(),
    };

    toast.success("Order placed successfully!", {
      position: "bottom-right",
      autoClose: 500,
    });

    clearCart();
    setOpenOrderModal(false);

    try {
      const response = await axiosInstance.post("/orders", orderData);
      if (response.status !== 201) {
        throw new Error("Failed to place order");
      }

      for (let book of orderData.items) {
        const bookResponse = await axiosInstance.get(`/books/${book.id}`);
        const updatedBook = bookResponse.data;

        const newStock = updatedBook.stock - book.quantity;

        await axiosInstance.patch(`/books/${book.id}`, {
          sold: (updatedBook.sold || 0) + book.quantity,
          stock: newStock,
          status: newStock === 0 ? "Sold Out" : "Available",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order. Please try again.", {
        position: "bottom-right",
        autoClose: 1000,
      });
    }
  };

  const totalPrice = cart.reduce(
    (total, book) => total + book.price * book.quantity,
    0
  );

  return (
    <Layout>
      <div className="min-h-[816px] bg-[#f1f1ee] p-4 md:p-10 mt-20 max-w-full mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-text text-center md:text-left ml-4 md:ml-28">
            Your Cart
          </h1>
          <div className="flex justify-center md:justify-end w-full md:mr-32 px-4 md:px-0">
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/buyer-dashboard")}
              variant="contained"
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: "white",
                width: { xs: "100%", md: "auto" },
              }}
            >
              Back
            </Button>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center mt-4">
            <ShoppingCart
              sx={{
                fontSize: 100,
                color: (theme) => theme.palette.primary.main,
                marginTop: 28,
              }}
            />
            <p className="text-gray-500 mt-4 text-xl">Your cart is empty.</p>
          </div>
        ) : (
          <div className="bg-background p-4 rounded-lg shadow-lg ml-4 md:ml-28 max-h-[625px] max-w-full overflow-y-auto mr-4 md:mr-32">
            <div className="mt-4 flex justify-between items-center border-b border-[#3A7D44]">
              <h2 className="text-lg font-bold text-text">Total Price</h2>
              <p className="text-lg font-bold text-text">₹{totalPrice}</p>
            </div>
            {cart.map((book) => (
              <div
                key={book.id}
                className="flex flex-col md:flex-row justify-between items-center border-b border-[#3A7D44] py-3 last:border-none"
              >
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-20 h-28 object-cover rounded-md mb-3 md:mb-0"
                />
                <h1 className="text-lg md:text-2xl font-semibold text-text text-center flex-1">
                  {book.name}
                </h1>
                <h1 className="text-lg md:text-2xl font-semibold text-text text-center flex-1 pr-24">
                 By: {book.author}
                </h1>
                <p className="text-lg md:text-2xl font-bolder text-text pr-0 md:pr-24">
                  ₹{book.price * book.quantity}
                </p>
                <div className="flex items-center mb-3 md:mb-0">
                  <IconButton
                    onClick={() => updateQuantity(book.id, book.quantity - 1)}
                    disabled={book.quantity === 1}
                  >
                    <Remove />
                  </IconButton>
                  <span className="px-2 text-lg">{book.quantity}</span>
                  <IconButton
                    onClick={() => updateQuantity(book.id, book.quantity + 1)}
                    disabled={book.quantity >= book.stock}
                  >
                    <Add />
                  </IconButton>
                </div>
                <Button
                  startIcon={<Delete />}
                  onClick={() => removeFromCart(book.id)}
                  sx={{ color: "red", paddingLeft: 5 }}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}

        <ToastContainer />
        <div className="pt-4 flex justify-end mx-4 md:mx-32">
          {cart.length > 0 && (
            <Button
              onClick={() => setOpenOrderModal(true)}
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: "white",
                width: "30%",
              }}
            >
              Place Order
            </Button>
          )}
        </div>
        <PlaceOrderModal
          open={openOrderModal}
          onClose={() => setOpenOrderModal(false)}
          onSubmit={handleSubmitOrder}
        />
      </div>
    </Layout>
  );
};

export default CartPage;
