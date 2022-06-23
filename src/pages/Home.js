import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

function Home({ isAuth }) {
  const [postsList, setPostsList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const q = query(postsCollectionRef, orderBy("time", "desc"));

  const getPostsList = async () => {
    const data = await getDocs(q);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPostsList();
  }, []);

  const deletePost = async (id) => {
    const userPost = doc(db, "posts", id);
    await deleteDoc(userPost);

    getPostsList();
    // window.location.reload(false);
  };
  return (
    <div className="homePage">
      {postsList.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h2>{post.title}</h2>
              </div>
              {isAuth && post.author.id === auth.currentUser?.uid && (
                <div className="postOptions">
                  <IconButton>
                    <button onClick={() => deletePost(post.id)}>
                      &#128465;
                    </button>
                  </IconButton>
                  <IconButton>
                    <Delete onClick={() => deletePost(post.id)}></Delete>
                  </IconButton>
                </div>
              )}

              {/* <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser?.uid && (
                  <button onClick={() => deletePost(post.id)}>&#128465;</button>
                )}
              </div> */}
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h4>@{post.author.name}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
