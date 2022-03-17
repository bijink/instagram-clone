import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import Story from './Story';

import type { SuggestionsTypes } from '../types/components/Stories.types';


const Stories = () => {
   const [suggestions, setSuggestions] = useState([] as SuggestionsTypes[]);

   useEffect(() => {
      const suggestion: SuggestionsTypes[] = [...Array(20)].map((_, i) => ({
         ...faker.helpers.contextualCard(),
         id: i
      }));
      // console.log(suggestion);
      setSuggestions(suggestion);
   }, []);

   // console.log(suggestions[0]);

   return (
      <div
         className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 
            border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black' >
         {suggestions.map(profile => (
            <Story key={profile.id} img={profile.avatar} username={profile.username} />
         ))}
      </div>

   );
};

export default Stories;
