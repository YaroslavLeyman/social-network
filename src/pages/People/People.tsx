import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth } from "../../components/Providers/useAuth";
import { collection, getDocs } from "@firebase/firestore";
import { User } from "../../types/types";

const People: FC = () => {
  const { db } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        _id: doc.id,
      })) as User[];
      setUsers(usersList);
    };

    getUsers();
  }, [db]);

  const filteredUsers = users.filter(
    (user) =>
      user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <TextField
        label="Поиск людей"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Box
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        {filteredUsers.map((user) => (
          <Link
            to={`/user/${user._id}`}
            key={user._id}
            style={{ textDecoration: "none" }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#f3f3f3",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <Avatar src={user?.avatar} alt="аватар"></Avatar>
              <h2 style={{ margin: 0, color: "#1976D2" }}>{user.name || "Нет имени"}</h2>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default People;