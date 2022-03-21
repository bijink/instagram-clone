import type { GetServerSideProps, NextPage } from "next";
import type { GoogleProviderTypes } from "../../types/pages/auth/signin.types";

import { getProviders, signIn as signInToProvider } from "next-auth/react";
import Header from "../../components/Header";


const SignIn: NextPage<GoogleProviderTypes> = ({ providers }) => {
   return (
      <div>
         <Header />
         <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-10 px-14 text-center">
            <img className="w-80" src="/instagram-logo.png" alt="" />
            <p className="font-xs italic">This is not real app</p>

            <div className="mt-40">
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
