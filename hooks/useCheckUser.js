import { useContext, useEffect, useState } from 'react';
import Router from 'next/router';

import authContext from "../context/authContext/authContext";

const useCheckUser = () => {
   const { statusLogin, userSession, alert } = useContext(authContext);
   const [alertFirebase, setAlertFirebase] = useState({});

   const checkUser = async () => {
      try {
         await statusLogin();
         if (userSession.uid && userSession.emailVerified) {
            Router.push('/');
         }
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      checkUser();
      if(alert.msg !== ''){
         setAlertFirebase(alert);
      }
   }, [userSession, alert])
   
   return {
      alertFirebase
   }
}

export default useCheckUser
