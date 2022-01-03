import React, { useContext, useEffect } from 'react';

import authContext from '../../context/authContext/authContext';
import Footer from './home/Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
   const { statusLogin, userSession } = useContext(authContext);

   // set user data en userSession...
   useEffect(() => {
      statusLogin();
   }, [userSession])

   return (
      <>
         <Navbar />
         {children}
         <Footer />
      </>
   )
}

export default Layout;