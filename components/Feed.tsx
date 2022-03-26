import { useSession } from "next-auth/react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";


const Feed = () => {
   // nextAuth
   const { data: session } = useSession();


   return (
      <main className={`grid grid-cols-2 lg:grid-cols-3 sm:max-w-xl lg:max-w-4xl mx-auto ${!session && 'lg:grid-cols-2 lg:max-w-2xl'}`} >
         <section className={`col-span-2`}>
            <Stories />
            <Posts />
         </section>
         {session && (
            <section className="hidden lg:inline-grid lg:col-span-1">
               <div className="fixed top-20">
                  <MiniProfile />
                  <Suggestions />
               </div>
            </section>
         )}
      </main>
   );
};

export default Feed;
