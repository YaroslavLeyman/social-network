// import React, { FC, useEffect, useState } from "react";
// import { Avatar } from "@mui/material";
// import { Box } from "@mui/system";
// import { useAuth } from "../../components/Providers/useAuth";
// import { collection, onSnapshot, query, where } from "@firebase/firestore";
// import { Link } from "react-router-dom";
// import { User } from "../../types/types";

// const Friends: FC = () => {
//   const { db, user } = useAuth();
//   const [friends, setFriends] = useState<User[]>([]);

//   useEffect(() => {
//     const getFriends = () => {
//       if (!db || !user) return;

//       const userFriendsRef = collection(db, "friends", user._id, "userFriends");
//       const q = query(userFriendsRef, where("friend", "!=", null));

//       const unsubscribe = onSnapshot(q, (friendsSnapshot) => {
//         const friendsList = friendsSnapshot.docs.map((doc) => {
//           const data = doc.data();
//           return data.friend;
//         }) as User[];

//         setFriends(friendsList);
//       });

//       return unsubscribe;
//     };

//     const unsubscribe = getFriends();
//     return () => {
//       if (unsubscribe) {
//         unsubscribe();
//       }
//     };
//   }, [db, user]);

//   return (
//     <Box
//       sx={{
//         border: "1px solid #ccc",
//         borderRadius: "10px",
//         padding: "20px",
//       }}
//     >
//       {friends.length === 0 ? (
//         <p style={{ margin: "0", fontSize: "20px" }}>У вас еще нет добавленных друзей</p>
//       ) : (
//         <Box
//           style={{
//             display: "flex",
//             gap: "20px",
//             flexDirection: "column",
//           }}
//         >
//           <p style={{ margin: "0", fontSize: "20px" }}>Ваши друзья</p>
//           {friends.map((friend) => (
//             <Link
//               to={`/user/${friend._id}`}
//               key={friend._id}
//               style={{ textDecoration: "none" }}
//             >
//               <Box
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                   backgroundColor: "#f3f3f3",
//                   padding: "10px",
//                   borderRadius: "5px",
//                 }}
//               >
//                 <Avatar src={friend.avatar} alt="аватар"></Avatar>
//                 <h2 style={{ margin: 0, color: "#1976D2" }}>{friend.name || "Нет имени"}</h2>
//               </Box>
//             </Link>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Friends;

import React, { FC, useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth } from "../../components/Providers/useAuth";
import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import { Link } from "react-router-dom";
import { User } from "../../types/types";

const Friends: FC = () => {
  const { db, user } = useAuth();
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    const getFriends = () => {
      if (!db || !user) return;

      const userFriendsRef = collection(db, "friends", user._id, "userFriends");
      const q = query(userFriendsRef, where("friend", "!=", null));

      const unsubscribe = onSnapshot(q, (friendsSnapshot) => {
        const friendsList = friendsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return data.friend;
        }) as User[];

        setFriends(friendsList);
      });

      return unsubscribe;
    };

    const unsubscribe = getFriends();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [db, user]);

  const removeFriend = async (friendToRemove: User) => {
    if (!db || !user) return;
    const friendsRef = doc(
      db,
      "friends",
      user._id,
      "userFriends",
      friendToRemove._id
    );
    await deleteDoc(friendsRef);

    setFriends(friends.filter((friend) => friend._id !== friendToRemove._id));
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      {friends.length === 0 ? (
        <p style={{ margin: "0", fontSize: "20px" }}>
          У вас нет добавленных друзей
        </p>
      ) : (
        <Box
          style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          <p style={{ margin: "0", fontSize: "20px" }}>Ваши друзья</p>
          {friends.map((friend) => (
            <Link
              to={`/user/${friend._id}`}
              key={friend._id}
              style={{ textDecoration: "none" }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "#f3f3f3",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <Avatar src={friend.avatar} alt="аватар"></Avatar>
                <h2 style={{ margin: 0, color: "#1976D2" }}>
                  {friend.name || "Нет имени"}
                </h2>
                <Button
                  style={{ marginLeft: "auto" }}
                  variant="outlined"
                  color="error"
                  onClick={() => removeFriend(friend)}
                >
                  Удалить из друзей
                </Button>
              </Box>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Friends;
