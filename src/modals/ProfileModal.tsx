import React, { useState, useEffect } from "react";
import {
  Dialog,
  Avatar,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [profilePic, setProfilePic] = useState<string | null>(
    localStorage.getItem("profilePic") || ""
  );

  useEffect(() => {
    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  const handleProfilePicUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        localStorage.setItem("profilePic", result);
        setProfilePic(result);
        toast.success("Profile picture updated successfully!");
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleRemoveProfilePic = () => {
    localStorage.removeItem("profilePic");
    setProfilePic(null);
    toast.success("Profile picture removed successfully!");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: { width: "90%", maxWidth: "500px" },
      }}
    >
      <div className="flex justify-between items-center border-b pb-2 px-4 sm:px-6">
        <div className="text-lg sm:text-xl pt-3">Your Profile</div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 transition pt-3"
        >
          ✖
        </button>
      </div>
      <Card className="shadow-lg rounded-lg w-full">
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Avatar
                alt="Profile Picture"
                src={profilePic || "/default-avatar.png"}
                sx={{ width: 100, height: 100 }}
              />
              <div className="text-center sm:text-left">
                <Typography variant="h6" className="font-bold text-black">
                  {user.name}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {user.email}
                </Typography>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 ">
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "transparent",
                  color: (theme) => theme.palette.primary.main,
                }}
                className="border-2 border-primary text-primary py-2 px-4 rounded-lg transition hover:bg-primary hover:text-white"
              >
                {profilePic ? "Change Picture" : "Upload Picture"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleProfilePicUpload}
                />
              </Button>

              {profilePic && (
                <Button
                  variant="contained"
                  onClick={handleRemoveProfilePic}
                  sx={{ backgroundColor: "transparent", color: "black" }}
                  className="border-2 border-red-500 text-red-500 py-2 px-4 rounded-lg transition hover:bg-red-500 hover:text-white"
                >
                  Remove Picture
                </Button>
              )}
            </div>

            <Divider />
            {[
              { label: "Name", value: user.name },
              { label: "Email", value: user.email },
              { label: "Shop Name", value: user.shopName }, 
            ].map((field, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-2"
              >
                <Typography
                  variant="h6"
                  className="font-semibold w-full sm:w-1/3 text-black text-center sm:text-left"
                >
                  {field.label}:
                </Typography>
                <Typography
                  variant="h6"
                  className="w-full sm:w-2/3 text-black text-center sm:text-left"
                >
                  {field.value}
                </Typography>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </Dialog>
  );
};

export default ProfileModal;
