import * as Icons from "@mui/icons-material";
import { IMenuItem } from "../../types/types";

export const menu: IMenuItem[] = [
  {
    title: "Моя страница",
    link: "/profile",
    icon: Icons.Home
  },
  {
    title: "Друзья",
    link: "/friends",
    icon: Icons.People
  },
  {
    title: "Сообщения",
    link: "/messages",
    icon: Icons.QuestionAnswer
  },
  {
    title: "Новости",
    link: "/",
    icon: Icons.Article
  },
  {
    title: "Люди",
    link: "/people",
    icon: Icons.Search
  },
];
