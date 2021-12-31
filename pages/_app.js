import AuthProvider from "../context/authContext/AuthProvider";
import UserProvider from "../context/userContext/UserProvider";

import '../styles/globals.css';
import '../styles/normalize.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  );
}

export default MyApp
