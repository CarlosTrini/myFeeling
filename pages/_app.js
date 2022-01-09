import App from "next/app";
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

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default MyApp
