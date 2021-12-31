import { useState } from "react";
import Router from "next/router";

// import firebaseFunctions from "./firebaseConfig"; //firebase functions
import { auth } from "../../firebase/firebaseConfig";
import {
   createUserWithEmailAndPassword,
   updateProfile,
   signInWithEmailAndPassword,
   onAuthStateChanged,
   signOut
} from "firebase/auth";
import authContext from "./authContext"; 
import checkResponse from "./checkResponse";



// functional component
const AuthProvider = ({ children }) => {

   //usestate
   const [userSession, setUserSession] = useState({});
   const [alert, setAlert] = useState({msg:'', error:false, type:''});

   const newUserFn = async ({ email, password, user }) => {
      try {
         await createUserWithEmailAndPassword(auth, email, password);
         await updateProfile(auth.currentUser, {
            displayName: user
         });
         Router.push('/');
      } catch (error) {
         console.error(error.message);
         return setAlert( {
            msg:checkResponse(error.code),
            error:true,
            type: 'danger'
         });
      }
   }
   
   const loginFn = async ({email, password}) => {
      try {
         await signInWithEmailAndPassword(auth, email, password);
         Router.push('/');
      } catch (error) {
         console.error(error.code);
         return setAlert({
            msg: checkResponse(error.code),
            error:true,
            type: 'danger'
         });
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

   return (
      <authContext.Provider
         value={{
            userSession,
            alert,
            newUserFn,
            loginFn,
            closeSessionFn,
            statusLogin,
         }}
      >
         {children}
      </authContext.Provider>
   )
}

export default AuthProvider;