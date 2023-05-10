import { Avatar, ImageList, ImageListItem, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import {
  onSnapshot,
  collection,
  doc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../components/Providers/useAuth";
import { IPost } from "../../types/types";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

interface IPosts {
  posts?: IPost[];
}

const Posts: FC<IPosts> = () => {
  const { db } = useAuth();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(postsQuery, (doc) => {
      const newPosts = doc.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        likes: d.data().likes || 0,
      })) as IPost[];

      setPosts(newPosts);
    });

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likePost = async (postId: string, currentLikes: number) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: currentLikes + 1,
    });

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: currentLikes + 1 };
        }
        return post;
      })
    );
  };

  return (
    <>
      {posts.map((post, idx) => (
        <Box
          key={`Post-${idx}`}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "25px",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#111",
              marginBottom: "10px",
            }}
          >
            <Box
              sx={{
                position: "relative",
                marginRight: "10px",
                width: "50px",
                height: "50px",
              }}
            >
              <Avatar
                src={post.author.avatar}
                alt=""
                sx={{ width: "46px", height: "46px", borderRadius: "50%" }}
              />
            </Box>
            <div>
              <div>{post.author.name}</div>
              <div style={{ opacity: "0.6" }}>
                {post.createdAt ? post.createdAt.toDate().toLocaleString() : ""}
              </div>
            </div>
          </Box>

          <p>{post.content}</p>

          <IconButton
            onClick={() => likePost(post.id, post.likes)}
            sx={{ padding: 0 }}
          >
            {post.likes > 0 ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <span style={{ paddingLeft: "10px" }}>{post.likes}</span>

          {post?.images?.length && (
            <ImageList variant="masonry" cols={3} gap={8}>
              {post.images.map((image) => (
                <ImageListItem key={image}>
                  <img src={image} alt={""} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Box>
      ))}
    </>
  );
};

export default Posts;
