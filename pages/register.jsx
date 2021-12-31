import React, { useContext, useState } from 'react';
import Link from 'next/link';

import authContext from "../context/authContext/authContext";
import useCheckUser from '../hooks/useCheckUser';
import { alertTimer } from '../helpers/sweetAlerts';
import Alerts from '../components/Alerts';
import styles from '../styles/modules/auth.module.css';

const register = () => {

   const { newUserFn } = useContext(authContext);

   // hook--- Check if there is any user
   useCheckUser();
   const { error, msg, type } = useCheckUser().alertFirebase;


   const handleRegister = async () => {
      const data = {
         email: 'correo@correo.com',
         password: 'thisismypassword',
         user: 'CorreoAnónimo'
      }
      await newUserFn(data);
   }




   return (
      <div className={styles.auth}>
         <button
            onClick={handleRegister}
         >test</button>
         <div className={styles.auth__container}>
               {
                  error && alertTimer('error', msg)
               }
            <div className={styles.auth__form}>
               <form className={styles.form}>
                  <p className={styles.form__title}> Registro</p>

                  <div className="field">
                     <label htmlFor="user" className='field__label'>Usuario:</label>
                     <input type="text" name="user" id="user" placeholder="Nombre de usuario" className='field__input' />
                  </div>

                  <div className="field">
                     <label htmlFor="email" className='field__label'>Correo Eléctronico:</label>
                     <input type="email" name="email" id="email" placeholder="Correo eléctronico" className='field__input' />
                  </div>

                  <div className="field">
                     <label htmlFor="password" className='field__label'>Contraseña:</label>
                     <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" className='field__input' />
                  </div>

                  <div className="fieldButtons">
                     <input type="submit" value="Registrarme" className='field__login-submit btn'
                        title="click para registrar"
                     />
                  </div>

                  <Link href="/login">
                     <a className={styles.form__register}
                        title="click para ir al login"
                     >Ya tengo una cuenta</a>
                  </Link>



               </form>
            </div>
         </div>
      </div>
   )
}

export default register
