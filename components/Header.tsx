import Image from "next/image";
import { SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon } from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';


const Header = () => {
   return (
      <div className="shadow-sm border-b bg-white sticky top-0 z-50 ">
         <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto" >
            {/* Left */}
            <div className="relative hidden lg:inline-grid w-24 cursor-pointer" >
               <Image src={'/instagram-logo.png'} layout="fill" objectFit="contain" />
            </div>
            <div className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer " >
               <Image src={'/instagram-logo-sm.png'} layout="fill" objectFit="contain" />
            </div>

            {/* Middle */}
            <div className="max-w-xs">
               <div className="mt-1 relative p-3 rounded-md " >
                  <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none" >
                     <SearchIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                     className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md 
                  focus:ring-black focus:border-black"
                     type="text"
                     placeholder="Search"
                  />
               </div>
            </div>

            {/* Right */}
            <div className="flex items-center justify-end space-x-4">
               <MenuIcon className="h-10 md:hidden cursor-pointer " />

               <HomeIcon className="navBtn" />
               <div className="relative navBtn" >
                  <PaperAirplaneIcon className="navBtn rotate-45 " />
                  <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white" >5</div>
               </div>
               <PlusCircleIcon className="navBtn" />
               <UserGroupIcon className="navBtn" />
               <HeartIcon className="navBtn" />

               <img
                  className="h-10 rounded-full cursor-pointer bg-violet-500"
                  src="instagram-logo-sm.png" alt="profile-pic" />
            </div>
         </div>
      </div>
   );
};

export default Header;
