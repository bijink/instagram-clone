import Post from "./Post";

import type { PostPropsTypes } from "../types/components/Post.types";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";


// const posts: PostPropsTypes[] = [
//    {
//       id: '123',
//       username: 'Bijin',
//       userImg: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
//       img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
//       caption: "laa laa laa"
//    },
//    {
//       id: '134',
//       username: 'Babu',
//       userImg: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
//       img: 'https://www.imagesource.com/wp-content/uploads/2019/06/Rio.jpg',
//       caption: "blaa blaa blaa"
//    },
// ];

export interface t {
   // _document: {
   //    data: {
   //       id: string;
   //       value: {
   //          mapValue: {
   //             fields: {
   //                id: string;
   //                username: { stringValue: string; };
   //                image: { stringValue: string; };
   //                prfileImg: { stringValue: string; };
   //                caption: { stringValue: string; };
   //             };
   //          };
   //       };
   //    };
   // };

   posts: {
      data: {
         image: string;
      };
   };


}



const Posts = () => {
   // const [posts, setPosts] = useState([] as any[]);
   const [posts, setPosts] = useState([]);
   // const [posts, setPosts] = useState([] as t[]);

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
      onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
         setPosts(snapshot.docs);
      })
   ), [db]);


   // const ss: any = posts[0].data();

   // console.log(posts[0].data());
   // console.log(typeof (posts[0].data().image));


   return (
      <div>
         {posts.map(post => (
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
