import Head from "next/head";
import AuthProvider from "../context/authContext/AuthProvider";
import UserProvider from "../context/userContext/UserProvider";

import '../styles/globals.css';
import '../styles/normalize.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MyFeeling</title>
      </Head>
      <AuthProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp
