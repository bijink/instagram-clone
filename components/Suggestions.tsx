import type { SuggestionDataTypes } from "../types/components/Suggestions.types";

import faker from "@faker-js/faker";
import { useEffect, useState } from "react";


const Suggestions = () => {
   // reactState
   const [suggestionData, setSuggestionData] = useState([] as SuggestionDataTypes[]);

   // reactEffect
   useEffect(() => {
      const suggestionData = [...Array(5)].map((_, i) => ({
         ...faker.helpers.contextualCard(),
         id: i,
      }));
      setSuggestionData(suggestionData);
   }, []);


   return (
      <div className="mt-4 ml-8" >
         <div className="flex justify-between text-xs mb-5" >
            <h3 className="text-sm font-bold text-gray-400" >Suggestion for you</h3>
            <button className="text-gray-600 font-semibold">See All</button>
         </div>
         {suggestionData.map(profile => (
            <div key={profile.id} className="flex items-center justify-between mt-3" >
               <img
                  src={profile.avatar}
                  alt="profile"
                  className="w-10 h-10 rounded-full border p-[2px]"
               />
               <div className="flex-1 ml-4">
                  <h2 className="font-semibold text-xs">{profile.username}</h2>
                  <h3 className="text-xs text-gray-400 truncate w-40">Works at {profile.company.name}...</h3>
               </div>
               <button className="text-blue-400 text-xs">Follow</button>
            </div>
         ))}
         <div className="pt-10 pl-2 text-xs text-gray-400">
            © 2022 INSTAGRAM-CLONE FROM BIJIN
         </div>
      </div>
   );
};

export default Suggestions;
