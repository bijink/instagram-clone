import type { PostsPost } from "../types/components/Posts.types";

import Post from "./Post";
import { useEffect, useState } from "react";
import { collection, DocumentData, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";


const Posts = () => {
   // reactState
   const [posts, setPosts] = useState<DocumentData>([]);

   // reactEffect
   useEffect(() => (
      onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
         setPosts(snapshot.docs);
      })
   ), [db]);


   return (
      <div>
         {posts.map((post: PostsPost) => (
            <Post
               key={post.id}
               id={post.id}
               username={post.data().username}
               userImg={post.data().profileImg}
               img={post.data().image || '/insta-logo.png'}
               caption={post.data().caption}
            />
         ))}
      </div>
   );
};

export default Posts;
