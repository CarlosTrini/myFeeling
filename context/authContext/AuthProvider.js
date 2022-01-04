import { useState } from "react";
import Router from "next/router";

// import firebaseFunctions from "./firebaseConfig"; //firebase functions
import { auth } from "../../firebase/firebaseConfig";
import {
   createUserWithEmailAndPassword,
   updateProfile,
   signInWithEmailAndPassword,
   onAuthStateChanged,
   signOut,
   sendPasswordResetEmail,
   sendEmailVerification
} from "firebase/auth";
import authContext from "./authContext";
import checkResponse from "./checkResponse";
import { alertTimer } from "../../helpers/sweetAlerts";



// functional component
const AuthProvider = ({ children }) => {

   //usestate
   const [userSession, setUserSession] = useState({});
   const [alert, setAlert] = useState({ msg: '', error: false, type: '' });


   const checkEmailVerified = () => {
      console.log('verificando');
      alertTimer('info','Ve y verifica tu correo registrado para poder acceder', 3000);
      closeSessionFn();
      Router.push('/login');
   }


   const newUserFn = async ({ email, password, user }) => {
      alertTimer('info', 'Registrando...');
      try {
         await createUserWithEmailAndPassword(auth, email, password);
         await updateProfile(auth.currentUser, {
            displayName: user
         });
         await sendEmailVerification(auth.currentUser);
          if (!auth.currentUser.emailVerified) {
             return checkEmailVerified();
          }
          Router.push('/');
      } catch (error) {
         console.error(error.message);
         alertTimer('error', checkResponse(error.code));
      }
   }

   const loginFn = async ({ email, password }) => {
      alertTimer('info', 'Cargando...');
      try {
         const a = await signInWithEmailAndPassword(auth, email, password);
         //email not verified
         if (!a?.user?.emailVerified) {
            return checkEmailVerified();
         }
         console.log('lo saltó');
         Router.push('/');
      } catch (error) {
         console.error(error.code);
         alertTimer('error', checkResponse(error.code));
      }
   }

   const closeSessionFn = async () => {
      try {
         await signOut(auth);
         setUserSession({});
      } catch (error) {
         console.error(error);
      }
   }

   const statusLogin = async () => {
      try {
         await onAuthStateChanged(auth, (user) => {
            if (user) {
               setUserSession(user);
            } else {
               return false;
            }
         });
      } catch (error) {
         console.error(error.message);
      }
   }

   const resetPasswordFn = async (email) => {
      try {
         await sendPasswordResetEmail(auth, email);
         alertTimer('info', 'El mensaje fue enviado a tu correo', 3000);
      } catch (error) {
         console.log(error.code);
         alertTimer('error', checkResponse(error.code));
      }

   }

   return (
      <authContext.Provider
         value={{
            userSession,
            alert,
            newUserFn,
            loginFn,
            closeSessionFn,
            statusLogin,
            resetPasswordFn
         }}
      >
         {children}
      </authContext.Provider>
   )
}

export default AuthProvider;