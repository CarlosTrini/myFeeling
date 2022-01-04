import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from '../../../styles/modules/profile.module.css';
import authContext from '../../../context/authContext/authContext';

const NavbarProfile = () => {
   const router = useRouter();

   const { userSession } = useContext(authContext);
   const [userData, setUserData] = useState({ id: null, name: '' });
   const { id, name } = userData;

   useEffect(() => {
      if (userSession.uid) {
         setUserData({
            id: userSession.uid,
            name: userSession.displayName
         });
      }
   }, [userSession])

   return (
      <nav className={styles.profile_nav}>
         <ul>
            <li>
               <Link
                  href='/profile/user_data/[name]'
                  as={`/profile/user_data/${name}`}
               >
                  <a>Datos</a>
               </Link>
            </li>
            <li>
               <Link href="/profile/user_publications/[name]"
                  as={`/profile/user_publications/${name}`}
               >
                  <a>Mis Publicaciones</a>
               </Link>
            </li>
         </ul>
      </nav>
   )
}

export default NavbarProfile;