import React, { useContext, useState } from 'react';
import Link from 'next/link';

import authContext from "../context/authContext/authContext";
import useCheckUser from '../hooks/useCheckUser';
import styles from '../styles/modules/auth.module.css';
import registerValidation from '../validationForms/registerValidation';

const Register = () => {
   // auth context
   const { newUserFn } = useContext(authContext);

   // hook--- Check if there is any user
   useCheckUser();
   //state
   const [dataInputs, setDataInputs] = useState({
      email: '',
      password: '',
      user: '',
   });
   const { email, password, user } = dataInputs;


   const handleInputs = (e) => {
      setDataInputs({
         ...dataInputs,
         [e.target.name]: e.target.value
      });
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      registerValidation(dataInputs, newUserFn);
   }

   return (
      <div className={styles.auth}>
         <div className={styles.auth__container}>
            <div className={styles.auth__form}>
               <form className={styles.form} onSubmit={handleSubmit} noValidate >
                  <p className={styles.form__title}> Registro</p>

                  <div className="field">
                     <label htmlFor="user" className='field__label'>Usuario:</label>
                     <input type="text" name="user" id="user" placeholder="Nombre de usuario" className='field__input'
                        onChange={handleInputs}
                        value={user}
                     />
                  </div>

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

export default Register
