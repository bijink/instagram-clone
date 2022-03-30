import type { AppProps } from 'next/app';

import '../styles/globals.css';
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from 'recoil';
import Head from 'next/head';


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
   return (
      <>
         <Head>
            <title>Instagram Clone</title>
            <link rel="icon" href="/insta-icon_page.webp" />
            <meta name="google-site-verification" content="2lso2g2eZVCDhFOc_a48HlnXxYoYjdqiHR2U04x5izM" />
         </Head>
         <SessionProvider session={session}>
            <RecoilRoot>
               <Component {...pageProps} />
            </RecoilRoot>
         </SessionProvider>
      </>
   );
}

export default MyApp;
