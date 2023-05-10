// import React, { FC, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { doc, getDoc, setDoc, deleteDoc } from "@firebase/firestore";
// import { useAuth } from "../../components/Providers/useAuth";
// import { Avatar, Box, Button } from "@mui/material";
// import { User } from "../../types/types";

// const UserProfile: FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const auth = useAuth();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isFriend, setIsFriend] = useState(false);

//   useEffect(() => {
//     const getUser = async () => {
//       if (!auth.db || !id || !auth.user) return;
//       const userDoc = doc(auth.db, "users", id);
//       const userSnapshot = await getDoc(userDoc);
//       console.log("User snapshot:", userSnapshot);
//       if (userSnapshot.exists()) {
//         setUser({ ...userSnapshot.data(), _id: userSnapshot.id } as User);
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     };

//     const checkFriendshipStatus = async () => {
//       if (!auth.db || !id || !auth.user) return;
//       const friendDoc = doc(auth.db, "friends", auth.user._id, "userFriends", id);
//       const friendSnapshot = await getDoc(friendDoc);
//       setIsFriend(friendSnapshot.exists());
//     };

//     if (auth.db) {
//       getUser();
//       checkFriendshipStatus();
//     }
//   }, [auth, id]);

//   if (loading) {
//     return <p>Загрузка...</p>;
//   }

//   if (!user) {
//     return <p>Пользователь не найден</p>;
//   }

//   const addFriend = async () => {
//     if (!auth.db || !auth.user || !user) return;
//     const friendsRef = doc(auth.db, "friends", auth.user._id, "userFriends", user._id);
//     await setDoc(friendsRef, { friend: user });
//     setIsFriend(true);
//   };
  
//   const removeFriend = async () => {
//     if (!auth.db || !auth.user || !user) return;
//     const friendsRef = doc(auth.db, "friends", auth.user._id, "userFriends", user._id);
//     await deleteDoc(friendsRef);
//     setIsFriend(false);
//   };

//   return (
//     <Box
//       sx={{
//         border: "1px solid #ccc",
//         borderRadius: "10px",
//         padding: "20px",
//       }}
//     >
//       <Avatar src={user.avatar} alt="аватар"></Avatar>
//       <h2 style={{ marginBottom: "25px" }}>{user.name || "Нет имени"}</h2>
//       <p>Возраст: {user.age || "Не указан"}</p>
//       <p>Город: {user.city || "Не указан"}</p>
//       <p>ВУЗ: {user.university || "Не указан"}</p>

//       {isFriend ? (
//         <Button variant="outlined" color="error" onClick={removeFriend}>Удалить из друзей</Button>
//       ) : (
//         <Button variant="contained" onClick={addFriend}>Добавить в друзья</Button>
//       )}
//     </Box>
//   );
// };

// export default UserProfile;

import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, deleteDoc } from "@firebase/firestore";
import { useAuth } from "../../components/Providers/useAuth";
import { Avatar, Box, Button } from "@mui/material";
import { User } from "../../types/types";

const UserProfile: FC = () => {
  const { id } = useParams<{ id: string }>();
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (!auth.db || !id || !auth.user) return;
      const userDoc = doc(auth.db, "users", id);
      const userSnapshot = await getDoc(userDoc);
      console.log("User snapshot:", userSnapshot);
      if (userSnapshot.exists()) {
        setUser({ ...userSnapshot.data(), _id: userSnapshot.id } as User);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    const checkFriendshipStatus = async () => {
      if (!auth.db || !id || !auth.user) return;
      const friendDoc = doc(auth.db, "friends", auth.user._id, "userFriends", id);
      const friendSnapshot = await getDoc(friendDoc);
      setIsFriend(friendSnapshot.exists());
    };

    if (auth.db) {
      getUser();
      checkFriendshipStatus();
    }
  }, [auth, id]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (!user) {
    return <p>Пользователь не найден</p>;
  }

  const addFriend = async () => {
    if (!auth.db || !auth.user || !user) return;
    const friendsRef = doc(auth.db, "friends", auth.user._id, "userFriends", user._id);
    await setDoc(friendsRef, { friend: user });
    setIsFriend(true);
  };
  
  const removeFriend = async () => {
    if (!auth.db || !auth.user || !user) return;
    const friendsRef = doc(auth.db, "friends", auth.user._id, "userFriends", user._id);
    await deleteDoc(friendsRef);
    setIsFriend(false);
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <Avatar src={user.avatar} alt="аватар"></Avatar>
      <h2 style={{ marginBottom: "25px" }}>{user.name || "Нет имени"}</h2>
      <p>Возраст: {user.age || "Не указан"}</p>
      <p>Город: {user.city || "Не указан"}</p>
      <p>ВУЗ: {user.university || "Не указан"}</p>

      {isFriend ? (
        <Button variant="outlined" color="error" onClick={removeFriend}>Удалить из друзей</Button>
      ) : (
        <Button variant="contained" onClick={addFriend}>Добавить в друзья</Button>
      )}
    </Box>
  );
};

export default UserProfile;