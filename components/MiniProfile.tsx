import { signOut, useSession } from "next-auth/react";


const MiniProfile = () => {
   const { data: session } = useSession();


   return (
      <div className="flex items-center justify-between mt-14 ml-8" >
         <img
            src={session?.user.image!}
            alt=""
            className="w-16 h-16 rounded-full border p-[2px] "
         />
         <div className="flex-1 mx-4">
            <h2 className="font-bold text-sm" >{session?.user.username}</h2>
            <h3 className="text-xs text-gray-400" >Welcome to Instagram</h3>
         </div>
         <button
            onClick={() => signOut()}
            className="text-blue-400 text-xs font-semibold">Log Out</button>
      </div>
   );
};

export default MiniProfile;
