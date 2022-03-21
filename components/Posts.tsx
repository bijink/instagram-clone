import type { PostsPost } from "../types/components/Posts.types";

import Post from "./Post";
import { useEffect, useState } from "react";
import { collection, DocumentData, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";


const Posts = () => {
   const [posts, setPosts] = useState<DocumentData>([]);


   // useEffect(() => {
   //    // const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
   //    //    setPosts(snapshot.docs);
   //    // });
   //    // return unsubscribe;

   //    return onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
   //       setPosts(snapshot.docs);
   //    });
   // }, [db]);

   useEffect(() => (
      onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
         setPosts(snapshot.docs);
      })
   ), [db]);

   // console.log(posts);
   // console.log(posts[0].data());
   // console.log(typeof (posts[0].data()));
   // console.log(typeof (posts[0].data().image));


   return (
      <div>
         {posts.map((post: PostsPost) => (
            <Post
               key={post.id}
               id={post.id}
               username={post.data().username}
               userImg={post.data().profileImg}
               img={post.data().image}
               caption={post.data().caption}
            />
         ))}
      </div>
   );
};

export default Posts;
