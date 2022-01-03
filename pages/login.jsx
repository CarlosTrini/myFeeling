import React, { useContext, useState } from 'react';
import Link from 'next/link';

import useCheckUser from '../hooks/useCheckUser';
import authContext from '../context/authContext/authContext';
import loginValidation from '../validationForms/loginValidation';
import { regexEmail } from '../helpers/constants';

import styles from '../styles/modules/auth.module.css';
import { alertTimer } from '../helpers/sweetAlerts';

const index = () => {
   
    
   // auth context
   const { loginFn, resetPasswordFn } = useContext(authContext);

   // hook -> check if there is any user
   useCheckUser();
   //states
   const [dataInputs, setDataInputs] = useState({
      email: '',
      password: ''
   });
   const { email, password } = dataInputs;


   const handleInputs = (e) => {
      setDataInputs({
         ...dataInputs,
         [e.target.name]: e.target.value
      });
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      loginValidation(dataInputs, loginFn);
   }

   const handleResetPassword = () => {
      if (!regexEmail.test(email) || email === '') return alertTimer('info', 'Para recuperar la contraseña llene el campo de \'correo eléctronico\'', 3000);
      
      resetPasswordFn(email);
   };

   return (
      <div className={styles.auth}>
         <div className={styles.auth__container}>
            <div className={styles.auth__form}>
               <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <p className={styles.form__title}> Login</p>

                  <div className="field">
                     <label htmlFor="email" className='field__label'>Correo Eléctronico:</label>
                     <input type="email" name="email" id="email" placeholder="Correo eléctronico" className='field__input'
                        onChange={handleInputs}
                        value={email}
                     />
                  </div>

                  <div className="field">
                     <label htmlFor="password" className='field__label'>Contraseña:</label>
                     <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" className='field__input'
                        onChange={handleInputs}
                        value={password}
                     />
                  </div>

                  <div className="fieldButtons">
                     <input type="submit" value="Ingresar" className='field__login-submit btn' />

                     <Link href="/">
                        <a className="field__login-cancel btn">Regresar</a>
                     </Link>
                  </div>

                  <div className={styles.form__extras_actions}>
                     <Link href="/register">
                        <a className={styles.form__register}>No tengo una cuenta</a>
                     </Link>
                     <button className={`btn ${styles.form__register}`}
                     type='button'
                      onClick={handleResetPassword}>
                        Olvidé mi contraseña
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}

export default index
