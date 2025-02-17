import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { Book as BookIcon, Visibility } from "@mui/icons-material";
import {
  TextField,
  Slider,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import { axiosInstance } from "../../api/AxiosInstance";
import BookModal from "../../modals/ViewBookModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../../context/CartContext";
import { Book } from "../../utils/types";

const BuyerDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, removeFromCart, cart } = useCart();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [bookNameFilter, setBookNameFilter] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<Book[]>("/books");
        setBooks(response.data);
        console.log(response);
      } catch (err) {
        setError("Failed to load books. Please try again later.");
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter((book) => {
      const matchesPrice =
        book?.price >= priceRange[0] && book.price <= priceRange[1];
      const matchesName = book?.name
        ?.toLowerCase()
        .includes(bookNameFilter.toLowerCase());
      return matchesPrice && matchesName;
    });
    setFilteredBooks(filtered);
  }, [books, priceRange, bookNameFilter]);

  const handleViewOpen = (book: Book) => {
    setSelectedBook(book);
    setViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setViewModalOpen(false);
    setSelectedBook(null);
  };

  const handleToggleCart = (book: Book) => {
    const existingBook = cart.find((item) => item.id === book.id);

    if (existingBook) {
      removeFromCart(book.id);
    } else {
      const bookWithQuantity = { ...book, quantity: 1 };
      addToCart(bookWithQuantity);
    }
  };

  return (
    <Layout>
      <div className="bg-background min-h-screen">
        <div className="p-4 md:p-10 text-text">
          <h2 className="text-2xl md:text-5xl font-bold mt-20 mb-6 text-text">
            Available Books
          </h2>

          <div className="mb-4 flex flex-col sm:flex-row justify-between gap-10">
            <TextField
              label="Filter by Book Name"
              variant="outlined"
              value={bookNameFilter}
              onChange={(e) => setBookNameFilter(e.target.value)}
              sx={{
                width: { xs: "100%", sm: "23%" },
                marginTop: { xs: "10px", sm: "0" },
              }}
            />
            <div className="w-full flex flex-col">
              <Typography variant="body2" color="text.secondary">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </Typography>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={5000}
                sx={{
                  width: "40%",
                  height: 6,
                  "& .MuiSlider-thumb": {
                    width: 16,
                    height: 16,
                    backgroundColor: (theme) => theme.palette.text.primary,
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: (theme) => theme.palette.text.primary,
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: (theme) => theme.palette.text.primary,
                  },
                }}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center flex-col h-[560px] text-center">
              <CircularProgress color="primary" size={80} />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center mt-20 ">
              <BookIcon style={{ fontSize: 200 }} color="disabled" />
              <p className="text-gray-500 mt-4">No books available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8 ">
              {filteredBooks.map((book) => (
                <Card
                  key={book.id}
                  className="bg-secondary rounded-2xl border-2 border-primary shadow-lg transition-transform transform hover:scale-105 m-4 max-w-full sm:max-w-[420px] h-auto flex flex-col sm:flex-row"
                >
                  <div className="w-full sm:w-[150px] h-[190px] flex-shrink-0 flex items-center justify-center bg-white pt-2">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-full h-full object-contain p-2 rounded-t-lg sm:rounded-l-lg sm:rounded-t-none cursor-pointer"
                      onClick={() => handleViewOpen(book)}
                    />
                  </div>

                  <CardContent className="flex flex-col justify-between flex-grow p-4 mt-2 w-full">
                    <Tooltip title={book.name} arrow className="cursor-pointer">
                      <Typography
                        variant="h5"
                        className="text-primary font-semibold truncate max-w-full sm:max-w-[200px]"
                      >
                        {book.name}
                      </Typography>
                    </Tooltip>

                    <Typography
                      variant="body1"
                      className="text-text truncate max-w-full sm:max-w-[200px]"
                    >
                      By {book.author}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="text-text mt-1 font-bold"
                    >
                      ₹{book.price}
                    </Typography>

                    <Typography
                      variant="body1"
                      className="text-text flex items-center justify-between"
                    >
                      Stock: {book.stock}
                      <Visibility
                        className="cursor-pointer text-primary"
                        onClick={() => handleViewOpen(book)}
                      />
                    </Typography>

                    <button
                      onClick={() => handleToggleCart(book)}
                      disabled={book.stock === 0}
                      className={`mt-3 py-2 px-4 rounded-lg w-full transition duration-300
                   ${
                     book.stock === 0
                       ? "bg-gray-400 text-white cursor-not-allowed"
                       : "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white active:bg-primary"
                   }`}
                    >
                      {book.stock === 0
                        ? "Sold Out"
                        : cart.find((item) => item.id === book.id)
                        ? "Remove from Cart"
                        : "Add to Cart"}
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <BookModal
            open={viewModalOpen}
            onClose={handleCloseModal}
            book={selectedBook}
          />
          <ToastContainer />
        </div>
      </div>
    </Layout>
  );
};

export default BuyerDashboard;
