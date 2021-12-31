import React, { useContext, useEffect } from 'react';

import authContext from '../../context/authContext/authContext';
import Navbar from './Navbar';

const Layout = ({ children }) => {
   const {statusLogin, userSession} = useContext(authContext);

   // set user data en userSession...
   useEffect(() => {
      statusLogin();
   }, [userSession])

   return (
      <>
         <Navbar />
         {children}
      </>
   )
}

export default Layout;