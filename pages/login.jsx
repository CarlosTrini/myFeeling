import React, {useContext} from 'react';
import Link from 'next/link';

import useCheckUser from '../hooks/useCheckUser';
import authContext from '../context/authContext/authContext';
import {alertTimer} from '../helpers/sweetAlerts';
import Alerts from '../components/Alerts';

import styles from '../styles/modules/auth.module.css';


const index = () => {
   
   const {loginFn} = useContext(authContext);
   
   // hook -> check if there is any user
   useCheckUser();
   const {error, msg, type} = useCheckUser().alertFirebase;



   const handleSubmit  = (e) => {
      e.preventDefault();
      const data = {
         email: 'correo@correo.com',
         password: 'thisismypassword',
      }
      loginFn(data);
   }

   return (
      <div className={styles.auth}>
         <div className={styles.auth__container}>
            {
               error && alertTimer('error', msg)
            }
            <div className={styles.auth__form}>
               <form className={styles.form} onSubmit={handleSubmit}>
                  <p className={styles.form__title}> Login</p>

                  <div className="field">
                     <label htmlFor="email" className='field__label'>Correo Eléctronico:</label>
                     <input type="email" name="email" id="email" placeholder="Correo eléctronico" className='field__input' />
                  </div>

                  <div className="field">
                     <label htmlFor="password" className='field__label'>Contraseña:</label>
                     <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" className='field__input' />
                  </div>

                  <div className="fieldButtons">
                     <input type="submit" value="Ingresar" className='field__login-submit btn'/>

                     <Link href="/">
                        <a className="field__login-cancel btn">Regresar</a>
                     </Link>
                  </div>

                  <Link href="/register">
                     <a className={styles.form__register}>No tengo una cuenta</a>
                  </Link>



               </form>
            </div>
         </div>
      </div>
   )
}

export default index
