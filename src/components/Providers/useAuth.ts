import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProviders";

export const useAuth = (onUserUpdate?: () => void) => {
  const value = useContext(AuthContext);

  useEffect(() => {
    if (onUserUpdate && value.user) {
      onUserUpdate();
    }
  }, [value.user, onUserUpdate]);

  return value;
};