import React, { FC, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../components/Providers/useAuth";
import { IMessage } from "../../types/types";
import {
  Alert,
  Avatar,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";

const Messages: FC = () => {
  const { user, db } = useAuth();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "messages"), (doc) => {
      const array: IMessage[] = []
      doc.forEach((d: any) => {
        array.push(d.data())
      });
      setMessages(array)
    });

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMessageHandler = async (e?: MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }

    try {
      await addDoc(collection(db, "messages"), {
        user,
        message,
      });
    } catch (e: any) {
      setError(e);
    }

    setMessage("");
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addMessageHandler();
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
        <List style={{ height: "65vh", overflowY: "auto" }}>
          {messages && messages.map((msg, idx) => (
            <ListItem key={idx}>
              <Grid container style={msg.user._id === user?._id ? { textAlign: "right" } : {}}>
                <Grid display="flex" justifyContent={msg.user._id === user?._id ? 'flex-end' : 'flex-start'} item xs={12}>
                  <Avatar src={msg.user.avatar} alt="avatar" />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    style={msg.user._id === user?._id ? { color: "#1976D2" } : {}}
                    primary={msg.message} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText secondary={msg.user.name} />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Grid container style={{ paddingTop: "20px", display: "flex", justifyContent: "space-between" }}>
          <Grid item xs={11}>
            <TextField
              id="outlined-basic-email"
              label="Напишите что-нибудь"
              fullWidth
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              value={message}
            />
          </Grid>
          <Grid item xs={1} style={{ display: 'contents' }}>
            <Fab color="primary" onClick={addMessageHandler}>
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Messages;