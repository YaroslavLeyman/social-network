import React, { FC, KeyboardEvent, useState } from "react";
import { Box } from "@mui/system";
import { Alert, TextField } from "@mui/material";
import { useAuth } from "../../components/Providers/useAuth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const AddPost: FC = () => {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState("");
  const { user, db } = useAuth();

  const addPostHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && user) {
      try {
        await addDoc(collection(db, "posts"), {
          author: user,
          content,
          createdAt: serverTimestamp(),
        });
      } catch (e: any) {
        setError(e);
      }

      setContent("");
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" style={{ marginBottom: "20px" }}>
          {error}
        </Alert>
      )}
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <TextField
          label="Напишите свой пост и нажмите 'Enter'"
          variant="outlined"
          InputProps={{
            sx: {
              borderRadius: "25px",
              border: "none",
              backgroundColor: "#F9F9F9",
            },
          }}
          sx={{ width: "100%" }}
          onKeyPress={addPostHandler}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </Box>
    </>
  );
};

export default AddPost;