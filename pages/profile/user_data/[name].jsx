import React, { useContext } from 'react'

import LayoutProfile from '../../../components/pages/LayoutProfile'
import authContext from '../../../context/authContext/authContext';

import styles from '../../../styles/modules/profile.module.css';

const userdata = () => {

   const {userSession} = useContext(authContext);
   const {displayName, email} = userSession;

   return (
      <LayoutProfile>
         <section className={styles.profile__mydata}>
            <div className={styles.profile__mydata_details}>
            <h3 className={styles.profile__title}>Datos del perfil</h3>
               <p>Nombre: <span>{displayName}</span> </p>
               <p>correo: <span>{email}</span> </p>
            </div>
      </section>
      </LayoutProfile >
   )
}

export default userdata;