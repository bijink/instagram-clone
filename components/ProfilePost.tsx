import type { PropsTypes } from "../types/components/ProfileProps";

import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, DocumentData, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ChatIcon, HeartIcon } from "@heroicons/react/solid";
import { deleteObject, ref } from "firebase/storage";
import { useSession } from "next-auth/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import Modal from 'react-modal';


Modal.setAppElement('#__next');
const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      // right: 'auto',
      // bottom: 'auto',
      right: '40%',
      bottom: '25%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
   },
   overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   }
};


const ProfilePost = ({ id, img }: PropsTypes) => {
   const { data: session } = useSession();

   const [likes, setLikes] = useState<DocumentData>([]);
   const [comments, setComments] = useState<DocumentData>([]);
   const [profileModal, setProfileModal] = useState(false);


   useEffect(() => onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
      setLikes(snapshot.docs);
   }), [db, id]);
   useEffect(() => onSnapshot(collection(db, 'posts', id, 'comments'), (snapshot) => {
      setComments(snapshot.docs);
   }), [db, id]);


   const imageRef = ref(storage, `posts/${id}/image`);

   const deletePost = async () => {
      await deleteDoc(doc(db, 'posts', id));

      likes && await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid!));
      comments && await deleteDoc(doc(db, 'posts', id, 'comments', session?.user.uid!));

      // Delete the file
      deleteObject(imageRef).then(() => {
         // File deleted successfully
      }).catch((error) => {
         // Uh-oh, an error occurred!
         console.log(error.message);
      });
   };


   return (
      <div className='m-1 sm:m-2 profilePostSize profilePostParrent'  >
         <div className="sm:hidden profilePostSize absolute">
            <Image
               src={img}
               width='180' height='180'
               placeholder='blur' blurDataURL={img}
               className='w-96 h-96'
            />
         </div>
         <div className="hidden sm:block profilePostSize absolute">
            <Image
               src={img}
               width='280' height='280'
               placeholder='blur' blurDataURL={img}
            />
         </div>
         <div className="profilePostSize profilePostShade hidden bg-gray-900 bg-opacity-30  absolute text-white space-x-2 sm:space-x-7 font-semibold">
            <div className="flex space-x-1">
               <HeartIcon className="h-6" />
               <p>{likes.length}</p>
            </div>
            <div className="flex space-x-1">
               <ChatIcon className="h-6" />
               <p>{comments.length}</p>
            </div>
            <div>
               <DotsVerticalIcon onClick={() => setProfileModal(true)} className="h-5 cursor-pointer" />
            </div>

            <Modal
               isOpen={profileModal}
               onRequestClose={() => setProfileModal(false)}
               style={customStyles}
            >
               <div className="flex flex-col justify-center items-center space-y-5">
                  <p className="">Do you want to<span className="font-semibold"> delete </span>this Post ?</p>
                  <div className="flex justify-center items-center space-x-5">
                     <button onClick={() => setProfileModal(false)} className="bg-gray-400 rounded py-[.1rem] px-2 hover:bg-gray-500">Cancel</button>
                     <button onClick={deletePost} className="bg-gray-400 rounded py-[.1rem] px-2 hover:bg-red-700">Delete</button>
                  </div>
               </div>
            </Modal>
         </div>
      </div>
   );
};

export default ProfilePost;