import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [sharedImage, setSharedImage] = useState("");

  let navigate = useNavigate();

  const postsCollectionRef = collection(db, "posts");

  const handleImage = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image , this file is ${typeof image}`);
      return;
    }

    setSharedImage(image);
  };

  const createPost = async () => {
    let time = serverTimestamp();

    await addDoc(postsCollectionRef, {
      time,
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        {/* <div className="inputGp">
          <label htmlFor="file">image:</label>
          <input type="file" accept="image/jpeg" onChange={handleImage} />

          {sharedImage && <img src={URL.createObjectURL(sharedImage)} />}
        </div> */}
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
