import type { NextPage } from 'next';

import Head from 'next/head';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Modal from '../components/Modal';


const Home: NextPage = () => {
   return (
      <div className="bg-gray-50 h-screen overflow-y-scroll">
         <Head>
            <title>Instagram Clone</title>
            <link rel="icon" href="/insta-icon_page.webp" />
         </Head>
         <Header />
         <Feed />
         <Modal />
      </div>
   );
};

export default Home;
