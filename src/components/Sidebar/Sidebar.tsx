import React, { FC } from "react";
import Menu from "./Menu";
import User from "./User";

const SideBar: FC = () => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <User />
      <Menu />
    </div>
  );
};

export default SideBar;
