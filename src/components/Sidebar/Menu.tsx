import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { menu } from "./dataMenu";

const Menu: FC = () => {

    const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        padding: "10px",
        backgroundColor: "#F1F7FA",
        borderRadius: "10px",
        border: "none",
        marginTop: "20px"
      }}
    >
      <List>
        {menu.map((item) => (
          <ListItem disablePadding key={item.link}>
            <ListItemButton onClick={() => navigate(item.link)}>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default Menu;
