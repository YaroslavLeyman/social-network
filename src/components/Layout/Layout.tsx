import React, { FC, ReactNode } from "react";
import { Grid } from "@mui/material";
import Header from "../Header/Header";
import SideBar from "../Sidebar/Sidebar";
import { useAuth } from "../Providers/useAuth";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <Grid container spacing={2} paddingX={5} marginTop={2}>
        {user && (
          <Grid item md={3}>
            <SideBar />
          </Grid>
        )}

        <Grid item md={user ? 9 : 12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
