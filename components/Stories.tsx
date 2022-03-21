import type { StoriesDataTypes } from '../types/components/Stories.types';

import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import Story from './Story';
import { useSession } from 'next-auth/react';


const Stories = () => {
   const { data: session } = useSession();

   const [storiesData, setStoriesData] = useState([] as StoriesDataTypes[]);


   useEffect(() => {
      const fakerData = [...Array(20)].map((_, i) => ({
         ...faker.helpers.contextualCard(),
         id: i
      }));
      // console.log(fakerData);
      setStoriesData(fakerData);
   }, []);

   // console.log(fakerData[0]);


   return (
      <div
         className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 
            border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black' >
         {session && (
            <Story img={session.user.image!}
               username={session.user.username}
            />
         )}
         {storiesData.map(profile => (
            <Story key={profile.id} img={profile.avatar} username={profile.username} />
         ))}
      </div>

   );
};

export default Stories;
