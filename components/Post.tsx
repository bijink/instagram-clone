import type { CommentsComment, PropsTypes } from "../types/components/Post.types";

import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { useSession } from "next-auth/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, DocumentData, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import Moment from 'react-moment';
import Image from "next/image";


const Post = ({ id, username, userImg, img, caption }: PropsTypes) => {
   const { data: session } = useSession();

   const [comment, setComment] = useState('');
   const [comments, setComments] = useState<DocumentData>([]);
   const [likes, setLikes] = useState<DocumentData>([]);
   const [hasLiked, setHasLiked] = useState(false);


   useEffect(() => onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), (snapshot) => {
      setComments(snapshot.docs);
   }), [db, id]);

   useEffect(() => onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
      setLikes(snapshot.docs);
   }), [db, id]);

   useEffect(() => setHasLiked(likes.findIndex((like: any) => like.id === session?.user.uid) !== -1), [likes]);


   const likePost = async () => {
      if (hasLiked) {
         await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid!));
      } else {
         await setDoc(doc(db, "posts", id, "likes", session?.user.uid!), {
            username: session?.user.username,
         });
      }
   };

   const sendComment = async (e: SyntheticEvent) => {
      e.preventDefault();

      const commentToSend = comment;
      setComment('');

      await addDoc(collection(db, 'posts', id, 'comments'), {
         comment: commentToSend,
         username: session?.user.username,
         userImage: session?.user.image,
         timestamp: serverTimestamp(),
      });
   };


   return (
      <div className="bg-white my-7 border rounded-sm" >
         {/* postHeader */}
         <div className="flex items-center p-5" >
            <img
               src={userImg}
               alt=""
               className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
            />
            <p className="flex-1 font-bold " >{username}</p>
            <DotsHorizontalIcon className="h-5" />
         </div>

         {/* img */}
         <Image
            // className="object-cover w-full "
            src={img}
            width={400} height={250}
            layout='responsive'
            placeholder='blur' blurDataURL={img}
            alt="post"
         />

         {/* buttons */}
         {session && (
            <div className="flex justify-between px-4 pt-4">
               <div className="flex space-x-4 " >
                  {hasLiked ?
                     <HeartIconFilled onClick={likePost} className="btn text-red-500" />
                     :
                     <HeartIcon onClick={likePost} className="btn" />}
                  <ChatIcon className="btn" />
                  <PaperAirplaneIcon className="btn" />
               </div>
               <BookmarkIcon className="btn" />
            </div>
         )}

         {/* caption */}
         <div className="p-5 truncate">
            {likes.length > 0 && (
               <p className="font-bold mb-1 text-sm" >{likes.length} likes</p>
            )}
            <span className="font-bold mr-1" >{username}</span>
            {caption}
         </div>

         {/* comments */}
         {(comments.length > 0) && (
            <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-gray-300 scrollbar-thin">
               {comments.map((comment: CommentsComment) => (
                  <div className="flex items-center space-x-2 mb-3"
                     key={comment.id}>
                     <img src={comment.data().userImage} alt=""
                        className="h-7 rounded-full "
                     />
                     <p className="text-sm flex-1">
                        <span className="font-bold">{comment.data().username}</span>{" "}
                        {comment.data().comment}
                     </p>
                     <Moment fromNow className="pr-5 text-xs">
                        {comment.data().timestamp?.toDate()}
                     </Moment>
                  </div>
               ))}
            </div>
         )}

         {/* input box */}
         {session && (
            <form action="" className="flex items-center p-4">
               <EmojiHappyIcon className="h-7" />
               <input
                  type="text"
                  placeholder="Add a comment..."
                  className="border-none flex-1 focus:ring-0 outline-none"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
               />
               <button
                  type="submit"
                  disabled={!comment.trim()}
                  className="font-semibold text-blue-400"
                  onClick={sendComment}
               >Post</button>
            </form>
         )}
      </div>
   );
};

export default Post;
