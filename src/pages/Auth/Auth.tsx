import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { Alert, Button, ButtonGroup, Grid, TextField } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "@firebase/auth";
import { useAuth } from "../../components/Providers/useAuth";
import { useNavigate } from "react-router-dom";

interface IUserData {
  email: string;
  password: string;
  name: string;
}

const Auth: FC = () => {
  const { db } = useAuth();
  const [isRegForm, setIsRegForm] = useState(false);
  const [userData, setUserData] = useState<IUserData>({
    email: "",
    password: "",
    name: "",
  } as IUserData);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onUserUpdate = () => {
    navigate("/");
  };

  const { ga, user, setUser } = useAuth(onUserUpdate);

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (isRegForm) {
      try {
        const res = await createUserWithEmailAndPassword(
          ga,
          userData.email,
          userData.password
        );
  
        await updateProfile(res.user, {
          displayName: userData.name,
        });
  
        // Добавление пользователя в Firestore
        await addDoc(collection(db, "users"), {
          _id: res.user.uid,
          name: userData.name,
        });
  
        setUser({
          _id: res.user.uid,
          avatar: res.user.photoURL || "",
          name: res.user.displayName || "",
        });
  
        onUserUpdate();
      } catch (error: any) {
        error.message && setError(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(ga, userData.email, userData.password);
      } catch (error: any) {
        error.message && setError(error.message);
      }
    }
  
    console.log(userData.email, userData.password);
  
    setUserData({
      email: "",
      password: "",
      name: "",
    });
  };

  useEffect(() => {
    if (user) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {error && (
        <Alert severity="error" style={{ marginBottom: "20px" }}>
          {error}
        </Alert>
      )}
      <Grid display="flex" justifyContent="center" alignItems="center">
        <form onSubmit={handleLogin}>
          <TextField
            label="Имя"
            variant="outlined"
            value={userData.name}
            onChange={(e) =>
              setUserData({ ...userData, name: e.target.value })
            }
            sx={{ display: "block", marginBottom: "20px" }}
          />

          <TextField
            type="email"
            label="Email"
            variant="outlined"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            sx={{ display: "block", marginBottom: "20px" }}
            required
          />

          <TextField
            type="password"
            label="Пароль"
            variant="outlined"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            sx={{ display: "block", marginBottom: "20px" }}
            required
          />

          <ButtonGroup variant="outlined">
            <Button type="submit" onClick={() => setIsRegForm(false)}>
              Войти
            </Button>
            <Button type="submit" onClick={() => setIsRegForm(true)}>
              Регистрация
            </Button>
          </ButtonGroup>
        </form>
      </Grid>
    </>
  );
};

export default Auth;