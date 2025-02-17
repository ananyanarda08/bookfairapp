export interface Book {
  createdAt: number;
  sellerId?: string;
  author?: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  image?: string;
}

export interface CartItem extends Book {
  quantity: number;
}
export interface Order {
  date: string | number | Date;
  quantity: React.ReactNode;
  bookName: React.ReactNode;
  id: string;
  name: string;
  address: string;
  phone: string;
  items: Book[];
}
export interface OrderData {
  name: string;
  address: string;
  phone: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  createdAt: Date;
}
export interface OrderSectionProps {
  orders: Order[];
  isLoading: boolean;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}
export type LayoutProps = {
  children: React.ReactNode;
};
export interface ProtectedRouteProps {
  element: JSX.Element;
  requiredRole: "buyer" | "seller";
}
export interface CustomInputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
}

export interface BooksSectionProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  fetchBooks: () => void;
  handleViewOpen: (book: Book) => void;
  handleEditOpen: (book: Book) => void;
  handleDelete: (id: number) => Promise<void>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export interface BookModalProps {
  open: boolean;
  onClose: () => void;
  book: Book | null;
}
export interface PlaceOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}
export interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}
export interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookName: string;
}
export interface BookFormProps {
  closeModal: () => void;
  refreshBooks: () => void;
  bookData?: {
    id: number;
    name: string;
    author: string;
    price: string;
    stock: string;
    image?: string;
  };
}
