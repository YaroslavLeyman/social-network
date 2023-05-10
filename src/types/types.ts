import { Dispatch, SetStateAction } from "react";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Timestamp } from "firebase/firestore";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface User {
  _id: string;
  name: string;
  avatar: string;
  age?: number;
  city?: string;
  university?: string;
}

export interface IUser {
  _id: string;
  avatar: string;
  name: string;
}

export interface IPost {
  id: string;
  author: IUser;
  createdAt: Timestamp;
  content: string;
  images?: string[];
  likes: number;
}

export interface IMenuItem {
  title: string;
  link: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
}

export interface IMessage {
  user: IUser;
  message: string;
}

export interface IProfileData {
  age: string;
  city: string;
  university: string;
}