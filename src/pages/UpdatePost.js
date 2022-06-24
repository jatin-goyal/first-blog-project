import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  let navigate = useNavigate();

  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getUserInfo = async () => {
      const docRef = await doc(postsCollectionRef, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setTitle(docSnap.data().title);
        setPostText(docSnap.data().postText);
      } else {
        console.log("No such document!");
      }
    };

    getUserInfo();
  }, [id]);

  const updatePost = async () => {
    const docRef = await doc(postsCollectionRef, id);
    await updateDoc(docRef, {
      title: title,
      postText: postText,
    });

    navigate("/");
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Update the Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            value={title}
            placeholder="title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            value={postText}
            placeholder="post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>

        <button onClick={updatePost}>UpdatePost</button>
      </div>
    </div>
  );
}

export default UpdatePost;
