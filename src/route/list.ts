import UserProfile from "../components/UserProfile/UserProfile";
import Auth from "../pages/Auth/Auth";
import Friends from "../pages/Friends/Friends";
import Home from "../pages/Home/Home";
import Conversation from "../pages/Messages/Conversation";
import Messages from "../pages/Messages/Messages";
import People from "../pages/People/People";
import Profile from "../pages/Profile/Profile";

export const routes = [
  {
    path: "/",
    component: Home,
    auth: true,
  },
  {
    path: "/profile",
    component: Profile,
    auth: true,
  },
  {
    path: "/messages",
    component: Messages,
    auth: true,
  },
  {
    path: "/message/:id",
    component: Conversation,
    auth: true,
  },
  {
    path: "/friends",
    component: Friends,
    auth: true,
  },
  {
    path: "/people",
    component: People,
    auth: true,
  },
  {
    path: "/user/:id",
    component: UserProfile,
    auth: true,
  },
  {
    path: "/auth",
    component: Auth,
    auth: false,
  },
];