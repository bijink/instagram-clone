import type { NextPage } from 'next';

import Feed from '../components/Feed';
import Header from '../components/Header';
import Modal from '../components/Modal';


const Home: NextPage = () => {
   return (
      <div className="bg-gray-50 h-screen overflow-y-scroll">
         <Header fromHomePage />
         <Feed />
         <Modal />
      </div>
   );
};

export default Home;
