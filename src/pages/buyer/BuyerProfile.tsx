import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider, Grid, Button, Avatar } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { axiosInstance } from "../../api/AxiosInstance";
import Layout from "../../layout/Layout";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Order } from "../../utils/types";

const fetchOrderHistory = () => {
  return JSON.parse(localStorage.getItem("orders") || "[]");
};

const BuyerProfile: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [orders, setOrders] = useState<Order[]>([]);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User ID:", user.id);
    const orderHistory = fetchOrderHistory();
    console.log("Fetched Orders:", orderHistory);
    const userOrders = orderHistory.filter(
      (order: { userId: any }) => order.userId === user.id
    );
    setOrders(userOrders);
  }, [user.id]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const storedPic = localStorage.getItem("profilePic");
    if (storedPic) {
      setProfilePic(storedPic);
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders");
      setOrders(response.data);
    } catch (error) {
      toast.error("Failed to have orders.");
    }
  };

  const handleProfilePicUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        localStorage.setItem("profilePic", result);
        setProfilePic(result);
        toast.success("Profile picture updated successfully!", {
          autoClose: 2000,
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleRemoveProfilePic = () => {
    localStorage.removeItem("profilePic");
    setProfilePic(null);
    toast.success("Profile picture removed successfully!", {
      autoClose: 2000,
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-10 mt-28 top-100 bg-background rounded-2xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              className="shadow-lg rounded-lg "
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
              }}
            >
              <CardContent>
                <h2 className="text-3xl font-semibold mb-4 text-text">
                  Your Profile
                </h2>
                <div className="space-y-4 text-center">
                  <Avatar
                    sx={{ width: 100, height: 100, margin: "auto" }}
                    src={profilePic || ""}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicUpload}
                    style={{ display: "none" }}
                    id="profile-pic-upload"
                  />
                  <label htmlFor="profile-pic-upload">
                    <Button
                      variant="contained"
                      component="span"
                      sx={{
                        backgroundColor: "transparent",
                        color: (theme) => theme.palette.primary.main,
                        marginTop: 2,
                        marginRight: 2,
                      }}
                      className=" sm:w-auto bg-transparent border-2 border-primary text-primary py-2 px-4 rounded-lg w-full transition duration-300 hover:bg-primary hover:text-white active:bg-primary"
                    >
                      {profilePic ? "Change Picture" : "Upload Picture"}
                    </Button>
                  </label>

                  {profilePic && (
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        marginTop: 2,
                        backgroundColor: "transparent",
                        color: "black",
                      }}
                      className="w-full sm:w-auto bg-transparent border-2 border-[#316a2c] text-[#316a2c] py-2 px-4 rounded-lg transition duration-300 hover:bg-red-500 hover:text-white active:bg-[#255a20]"
                      onClick={handleRemoveProfilePic}
                    >
                      Remove Picture
                    </Button>
                  )}
                  <Divider />
                  <Typography variant="h6" className="font-bold text-black">
                    Name: {user.name}
                  </Typography>
                  <Divider />
                  <Typography variant="h6" className="font-semibold text-black">
                    Email: {user.email}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              className="shadow-lg rounded-lg"
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
              }}
            >
              <CardContent>
                <div className="space-y-4">
                  <Typography
                    variant="h3"
                    className=" text-text"
                    sx={{ fontWeight: 900 }}
                  >
                    Your Order History
                  </Typography>
                  <Divider />
                  <div className="max-h-[500px] overflow-y-auto space-y-4 p-2">
                    {orders.length === 0 ? (
                      <p>No orders yet!</p>
                    ) : (
                      orders.map((order) => (
                        <div
                          key={order.id}
                          className="order-item space-y-4"
                          style={{
                            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                            padding: "16px",
                            borderRadius: "8px",
                            backgroundColor: "white",
                            border: "1px solid #e0e0e0",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 900,
                              color: (theme) => theme.palette.text.primary,
                            }}
                          >
                            Order ID: {order.id}
                          </Typography>
                          <div className="grid grid-cols-2">
                            <Typography
                              variant="body1"
                              sx={{ marginBottom: 2 }}
                            >
                              <span className="font-bold">Name: </span>
                              {order.name}
                            </Typography>
                            <Typography variant="body1">
                              <span className="font-bold">Address: </span>{" "}
                              {order.address}
                            </Typography>
                            <Typography variant="body1">
                              <span className="font-bold">Phone: </span>{" "}
                              {order.phone}
                            </Typography>
                            <Typography variant="body1">
                              <span className="font-bold">Items: </span>
                              {order.items
                                .map((item: { name: any }) => item.name)
                                .join(", ")}
                            </Typography>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/buyer-dashboard")}
              variant="contained"
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: "white",
                marginTop: 3,
              }}
            >
              Back
            </Button>
          </Grid>
        </Grid>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default BuyerProfile;
