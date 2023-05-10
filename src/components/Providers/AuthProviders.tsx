import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged, getAuth, Auth } from "@firebase/auth";
import { getFirestore, Firestore } from "@firebase/firestore";
import { IUser, TypeSetState } from "../../types/types";

interface IContext {
  user: IUser | null;
  setUser: TypeSetState<IUser | null>;
  ga: Auth;
  db: Firestore;
}

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const ga = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unListen = onAuthStateChanged(ga, (authUser) => {
      if (authUser)
        setUser({
          _id: authUser.uid,
          avatar: authUser.photoURL || "",
          name: authUser.displayName || "",
        });
      else {
        setUser(null);
      }
    });
    return () => {
      unListen();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(
    () => ({
      user,
      setUser,
      ga,
      db
    }),
    [user, ga, db]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};