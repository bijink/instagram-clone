import type { GetServerSideProps, NextPage } from "next";
import type { GoogleProviderTypes } from "../../types/pages/auth/signin.types";

import { getProviders, signIn as signInToProvider } from "next-auth/react";
import Header from "../../components/Header";
import Image from "next/image";
import InstaLogo from "../../public/insta-logo.png";


const SignIn: NextPage<GoogleProviderTypes> = ({ providers }) => {
   return (
      <div>
         <Header />
         {/* <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-10 px-14 text-center"> */}
         <div className="flex flex-col items-center justify-center text-center py-16">
            <Image src={InstaLogo} width={250} height={150} alt="instagram" />
            <p className="font-xs italic">This is not a <b>real</b> app</p>
            <div className="mt-20">
               {Object.values(providers).map((provider) => (
                  <div key={provider.name}>
                     <button
                        className="p-3 bg-blue-500 rounded-lg text-white"
                        onClick={() => signInToProvider(provider.id, { callbackUrl: '/ ' })}
                     >
                        Sign in with {provider.name}
                     </button>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};


export const getServerSideProps: GetServerSideProps = async () => {
   const providers = await getProviders();

   return { props: { providers } };
};

export default SignIn;
