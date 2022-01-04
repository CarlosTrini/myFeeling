import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import LayoutProfile from '../../../components/pages/profile/LayoutProfile';
import userContext from '../../../context/userContext/userContext';
import authContext from '../../../context/authContext/authContext';

import styles from '../../../styles/modules/profile.module.css';
import UserPubs from '../../../components/pages/profile/UserPubs';

const UserPublications = () => {
   const { userSession } = useContext(authContext);
   const { getPublicationsFn } = useContext(userContext);

   const router = useRouter();
   const { name } = router.query;

   const [storiesUser, setStoriesUser] = useState([]);
   const [isOwner, setIsOwner] = useState(false);

   const getData = async () => {
      let data = [];

      if (![name, userSession.uid].includes(undefined)) {
         if (name === userSession.displayName) {
            //registered user visiting his own profile
            //owner
            setIsOwner(true);
            data = await getPublicationsFn(userSession.uid, 'byid');
         }
         else if(name !== userSession?.displayName) {
            // registered user visiting another profile/
            // no owner
            setIsOwner(false);
            data = await getPublicationsFn(name, 'byname');
         }
         setStoriesUser(data);
      }
      if (name && !userSession.uid) {
         //no user login
         setIsOwner(false);
         data = await getPublicationsFn(name, 'byname');
      }

      setStoriesUser(data);
   }

   useEffect(() => {
      getData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [name, userSession])

   return (
      <LayoutProfile>
         <section className={styles.profile__pubs}>
            <h3 className={styles.profile__title}>
               {isOwner ? 'Tus titulos' : `Visitando los titulos de ${name}`}
            </h3>
            <div className={styles.profile__pubs_titles}>
               <ul className={styles.profile__titles}>
                  {
                     storiesUser.length > 0
                        ? storiesUser.map(story => <UserPubs key={story.idstory} story={story} />)
                        : <p>No hay publicaciones de este usuario o el usuario no existe</p>
                  }

               </ul>

            </div>
         </section>
      </LayoutProfile>
   )
}

export default UserPublications;
