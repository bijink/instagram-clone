import type { ProfilePostTypes } from '../types/pages/Profile.types';

import { CogIcon } from '@heroicons/react/outline';
import { ViewGridIcon } from '@heroicons/react/solid';
import { collection, DocumentData, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProfilePost from '../components/ProfilePost';
import { db } from '../firebase';
import Modal from '../components/Modal';


const profile = () => {
   const { data: session } = useSession();

   const [posts, setPosts] = useState<DocumentData>([]);


   useEffect(() => {
      onSnapshot(query(collection(db, 'posts'), where("username", "==", `${session?.user.username}`), orderBy('timestamp', 'desc')), (snapshot) => {
         setPosts(snapshot.docs);
      });
   }, [session, db]);


   return (
      <div>
         <Head>
            <title>{session && (`${session.user.name} (@${session.user.username}) • `)}Instagram Clone</title>
            <link rel="icon" href="/insta-icon_page.webp" />
         </Head>

         <Header />

         {/* Profile details */}
         <main className="max-w-4xl mx-auto">
            <div className='flex justify-start py-8'>
               <div className="ml-[4.5rem] mr-[6rem]">
                  {session && <Image className='rounded-full' src={session.user.image!} width='150' height='150' />}
               </div>
               <div className="space-y-5">
                  <div className="flex items-center space-x-5">
                     <h4 className='text-3xl font-light'>{session?.user.username}</h4>
                     <button className="border rounded-md px-[.6rem] text-sm font-semibold h-7">Edit Profile</button>
                     <CogIcon className='h-6 cursor-pointer' />
                  </div>
                  <div className="">
                     <h4 className='text-lg '>{session?.user.name}</h4>
                  </div>
               </div>
            </div>

            {/* Profile Posts */}
            <div className=''>
               <hr />
               <div className="flex justify-center items-center space-x-1 py-3">
                  <ViewGridIcon className='h-4' />
                  <p className="">POSTS</p>
               </div>
               <div className="flex flex-wrap justify-around pb-10">
                  {posts.map((post: ProfilePostTypes) => (
                     <ProfilePost
                        key={post.id}
                        id={post.id}
                        username={post.data().username}
                        userImg={post.data().profileImg}
                        img={post.data().image || '/insta-logo.png'}
                        caption={post.data().caption}
                     />
                  ))}
               </div>
               <hr />
            </div>
         </main>

         <Modal />

         <footer className='text-center p-12 text-gray-400'>
            © 2022 Instagram-Clone from Bijin
         </footer>
      </div>
   );
};

export default profile;
