import React, { FC } from "react";
import { Card, Button, Chip, Avatar } from "@mui/material";
import { useAuth } from "../Providers/useAuth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const User: FC = () => {
  const { user, ga } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(ga);
      navigate("/auth");
    } catch (error) {
      console.error("Ошибка выхода из аккаунта:", error);
    }
  };

  const handleMyProfile = () => {
    navigate("/profile");
  }

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        backgroundColor: "#F1F7FA",
        border: "none",
        borderRadius: 3,
        marginBottom: 3,
      }}
    >
      <Chip
        avatar={<Avatar src={user?.avatar} alt="аватар" />}
        label={user?.name || "Нет имени"}
        variant="outlined"
        onClick={handleMyProfile}
        sx={{ display: "flex", marginBottom: "15px", padding: "20px 0", fontSize: "15px" }}
      />
      <Button variant="outlined" onClick={handleSignOut}>
        Выйти
      </Button>
    </Card>
  );
};

export default User;
