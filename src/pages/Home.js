import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postsList, setPostsList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPostsList = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPostsList();
  });

  const deletePost = async (id) => {
    const userPost = doc(db, "posts", id);
    await deleteDoc(userPost);
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
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button onClick={() => deletePost(post.id)}>&#128465;</button>
                )}
              </div>
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
