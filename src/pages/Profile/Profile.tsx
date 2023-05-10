import React, { FC, useState, useEffect } from "react";
import { Avatar, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth } from "../../components/Providers/useAuth";
import {
  doc,
  setDoc,
  getDoc
} from "@firebase/firestore";
import { IProfileData } from "../../types/types";

const Profile: FC = () => {
  const { user, db } = useAuth();

  const [profileData, setProfileData] = useState<IProfileData>({
    age: "",
    city: "",
    university: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof IProfileData
  ) => {
    setProfileData({ ...profileData, [field]: event.target.value });
  };

  const saveData = async () => {
    if (!user) return;

    const userProfileDoc = doc(db, "users", user._id);

    await setDoc(userProfileDoc, profileData);
  };

  const loadData = async () => {
    if (!user) return;

    const userProfileDoc = doc(db, "users", user._id);

    const docSnap = await getDoc(userProfileDoc);

    if (docSnap.exists()) {
      setProfileData(docSnap.data() as IProfileData);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <Avatar src={user?.avatar} alt="аватар"></Avatar>
      <h2 style={{ marginBottom: "25px" }}>{user?.name || "Нет имени"}</h2>
      <TextField
        label="Возраст"
        value={profileData.age}
        onChange={(e) => handleChange(e, "age")}
        sx={{ display: "block", marginBottom: "20px" }}
      />
      <TextField
        label="Город"
        value={profileData.city}
        onChange={(e) => handleChange(e, "city")}
        sx={{ display: "block", marginBottom: "20px" }}
      />
      <TextField
        label="ВУЗ"
        value={profileData.university}
        onChange={(e) => handleChange(e, "university")}
        sx={{ display: "block", marginBottom: "20px" }}
      />

      <Button
        variant="contained"
        onClick={saveData}
        sx={{ display: "block", marginTop: "20px" }}
      >
        Сохранить
      </Button>
    </Box>
  );
};

export default Profile;