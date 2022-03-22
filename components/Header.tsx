import Image from "next/image";
import { SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon } from '@heroicons/react/outline';
import { PlusCircleIcon as PlusCircleIconFilled } from '@heroicons/react/solid';
import { HomeIcon } from '@heroicons/react/solid';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from '../atoms/modalAtom';
import InstaLogo from '../public/insta-logo.png';
import InstaIcon from '../public/insta-icon.png';
import { useState } from "react";


const Header = () => {
   const router = useRouter();

   const { data: session } = useSession();

   const [open, setOpen] = useRecoilState(modalState);

   const [menuBtnTrigger, setMenuBtnTrigger] = useState(false);
   const [inputFocus, setInputFocus] = useState(false);


   return (
      <div className="shadow-sm border-b bg-white sticky top-0 z-50 lg:px-8 ">
         {/* <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto" > */}
         <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto" >
            {/* Left */}
            <div onClick={() => router.push('/')} className="relative hidden lg:inline-grid w-24 cursor-pointer" >
               <Image src={InstaLogo} layout="fill" objectFit="contain" />
            </div>
            <div onClick={() => router.push('/')} className="relative lg:hidden w-8 flex-shrink-0 cursor-pointer " >
               <Image src={InstaIcon} layout="fill" objectFit="contain" />
            </div>

            {/* Middle */}
            <div className={`${inputFocus && "flex-1 mx-5"} transition-all duration-700 ease-out`}>
               <div className="mt-1 relative p-3 rounded-md" >
                  <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none" >
                     <SearchIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                     className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md 
                     focus:ring-black focus:border-black"
                     type="text"
                     placeholder="Search"
                     onFocus={() => setInputFocus(true)}
                     onBlur={() => setInputFocus(false)}
                  />
               </div>
            </div>

            {/* Right */}
            <div className="flex items-center justify-end space-x-4">
               <HomeIcon onClick={() => router.push('/')} className="h-6 cursor-pointer hover:scale-125 transition-all duration-150 ease-out" />

               {session ? (
                  <>
                     <div className="relative navBtn" >
                        <PaperAirplaneIcon className="navBtn rotate-45 " />
                        <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white" >5</div>
                     </div>
                     {!open ?
                        <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
                        :
                        <PlusCircleIconFilled className="navBtn" />
                     }
                     <UserGroupIcon className="navBtn" />
                     <HeartIcon className="navBtn" />

                     <div className="relative md:hidden inline-block text-left">
                        <MenuIcon onClick={() => setMenuBtnTrigger(prev => !prev)} className="h-6 cursor-pointer hover:scale-125 transition-all duration-150 ease-out" />
                        {menuBtnTrigger && (
                           <div className="origin-top-right absolute right-0 mt-2 w-56 
                              rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                              role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}
                           >
                              <div className="py-5 px-5 space-y-4" role="none">

                                 <div className="flex space-x-2 cursor-pointer">
                                    <UserGroupIcon className="h-6 " />
                                    <p className="text-gray-700">Friends</p>
                                 </div>
                                 <div onClick={() => { setOpen(true); setMenuBtnTrigger(false); }} className="flex space-x-2 cursor-pointer">
                                    <PlusCircleIcon className="h-6 " />
                                    <p className="text-gray-700">Add Post</p>
                                 </div>
                                 <div className="flex space-x-2 cursor-pointer">
                                    <div className="relative" >
                                       <PaperAirplaneIcon className="h-6 rotate-45 " />
                                       <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white" >5</div>
                                    </div>
                                    <p className="text-gray-700">Messages</p>
                                 </div>
                                 <div className="flex space-x-2 cursor-pointer">
                                    <HeartIcon className="h-6 " />
                                    <p className="text-gray-700">Likes</p>
                                 </div>

                              </div>
                           </div>
                        )}
                     </div>

                     <div className="h-10 w-10">
                        <Image
                           className="rounded-full cursor-pointer"
                           src={session.user.image!}
                           // width={'100%'} height={'100%'}
                           width={100} height={100}
                           layout="responsive"
                           alt="user-profile"
                           onClick={() => signOut()}
                        />
                     </div>
                  </>
               ) : (
                  <button className="" onClick={() => signIn()} >SignIn</button>
               )}
            </div>
         </div>
      </div>
   );
};

export default Header;
