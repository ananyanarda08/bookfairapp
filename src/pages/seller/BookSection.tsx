import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Book as BookIcon,
  Visibility,
  Edit,
  Delete,
} from "@mui/icons-material";
import DeleteConfirmationModal from "../../modals/DeleteModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Book, BooksSectionProps } from "../../utils/types";

const BooksSection: React.FC<BooksSectionProps> = ({
  books,
  setBooks,
  handleViewOpen,
  handleEditOpen,
  handleDelete,
  isLoading,
  setOpen,
}) => {
  const [bookNameFilter, setBookNameFilter] = useState<string>("");

  const filteredBooks = books?.filter((book) => {
    const matchesName = book?.name?.toLowerCase().includes(bookNameFilter.toLowerCase());
    return matchesName;
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<{ id: number; name: string } | null>(null);

  const handleDeleteClick = (book: Book) => {
    setBookToDelete({ id: book.id, name: book.name });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!bookToDelete?.id) {
      alert("No book selected for deletion!");
      return;
    }

    setBooks((prevBooks) => prevBooks?.filter((book) => book.id !== bookToDelete.id));
    setIsDeleteModalOpen(false);
    toast.success("Book deleted successfully!", { autoClose: 1000 });
    setBookToDelete(null);

    try {
      await handleDelete(bookToDelete.id);
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete the book. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-background rounded-lg shadow-lg md:col-span-2 flex flex-col max-h-[750px] min-h-[750px] overflow-y-auto">
      <h3 className="text-4xl font-semibold mb-4 text-text">Book Management</h3>

      <div className="mb-4 flex flex-col sm:flex-row justify-between gap-10">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            "&:hover": {
              backgroundColor: "#6c2286",
            },
            display: "inline-block",
            width: { xs: "100%", sm: "200px" },
            padding: "12px 24px",
          }}
          size="medium"
        >
          Add New Book
        </Button>

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
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center" style={{ height: "100%", minHeight: "560px", width: "100%" }}>
          <CircularProgress color="primary" size={80} />
        </div>
      ) : filteredBooks?.length ? (
        <TableContainer component={Paper} className="mt-4">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 900, fontSize: 20 }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: 20 }}>Book Name</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: 20 }}>Author</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: 20 }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: 20 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: 20 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((book: Book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <img
                      src={book.image}
                      alt={book.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, fontSize: 17 }}>{book.name}</TableCell>
                  <TableCell sx={{ fontWeight: 800, fontSize: 17 }}>{book.author}</TableCell>
                  <TableCell sx={{ fontWeight: 800, fontSize: 17 }}>{book.stock}</TableCell>
                  <TableCell sx={{ fontWeight: 800, fontSize: 17 }}>₹{book.price}</TableCell>
                  <TableCell>
                    <div className="flex justify-between items-center">
                      <Tooltip title="View">
                        <Visibility
                          sx={{
                            fontSize: 24,
                            cursor: "pointer",
                            color: (theme) => theme.palette.primary.dark,
                          }}
                          onClick={() => handleViewOpen(book)}
                        />
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Edit
                          sx={{
                            fontSize: 24,
                            cursor: "pointer",
                            color: "blue",
                          }}
                          onClick={() => handleEditOpen(book)}
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Delete
                          sx={{
                            fontSize: 24,
                            cursor: "pointer",
                            color: "red",
                          }}
                          onClick={() => handleDeleteClick(book)}
                        />
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="flex items-center justify-center flex-col h-[560px] text-center ">
          <BookIcon style={{ fontSize: 200 }} color="disabled" />
          <Typography variant="h5" className="mt-2 text-gray-500">
            No books match your filters
          </Typography>
        </div>
      )}

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        bookName={bookToDelete?.name || "this book"}
      />

      <ToastContainer />
    </div>
  );
};

export default BooksSection;
