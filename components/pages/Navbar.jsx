import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';

import authContext from '../../context/authContext/authContext';
import { alertTimer } from '../../helpers/sweetAlerts';

import styles from '../../styles/modules/navbar.module.css';
import iconNav from '../../public/img/icon-nav-gold.svg';
import iconHamburguer from '../../public/img/menu-hamburguer.svg';
import exitIcon from '../../public/img/exit.svg';
import profileIcon from '../../public/img/user.svg';
import homeIcon from '../../public/img/home.svg';
import publicationIcon from '../../public/img/publication.svg';
import publicationsIcon from '../../public/img/publications.svg';
import keyIcon from '../../public/img/key.svg';



const Navbar = () => {

   const { userSession, closeSessionFn } = useContext(authContext);
   const [showMenu, setShowMenu] = useState(false);
   const [isLogin, setIsLogin] = useState(false);

   const handleResponsiveMenu = () => setShowMenu(!showMenu)
   const handleClose = () => closeSessionFn();
   const handlePublication = () => {
      handleResponsiveMenu();
      if (!isLogin) return alertTimer('info', 'Necesitas iniciar sesión para poder publicar');
      Router.push('/publication');
   }

   useEffect(() => {
      setIsLogin(userSession.uid ? true : false);
   }, [userSession])

   return (
      <nav className={styles.nav} >
         <div className={`container ${styles.nav__container}`}>
            <div className={styles.nav__it}>
               <figure>
                  <Image src={iconNav} alt='Icon nav' />
               </figure>
               <Link href='/'>
                  <a className={styles.nav__it_title} >
                     <h1>My<span>Feeling</span>  </h1>
                  </a>
               </Link>

            </div>{/* nav__it */}

            <figure className={styles.nav__hamburguer}>
               <Image
                  src={iconHamburguer} alt='icon show menu'
                  onClick={handleResponsiveMenu}
               />
            </figure>{/* nav__hamburguer */}

            <div
               className={` 
               ${styles.nav__links}
               ${showMenu ? 'show' : 'hide'}
               `}
            >
               <ul className={styles.nav__links_container}>
                  <li>
                     <Link href='/'>
                        <a onClick={handleResponsiveMenu}>
                           <Image src={homeIcon} alt="profile link icon " />
                           <small>home</small>
                        </a>
                     </Link>
                  </li>
                  <li>
                     <Link href='/publications/[category]' as={`/publications/${'terror'}`} >
                        <a onClick={handleResponsiveMenu}>
                           <Image src={publicationsIcon} alt="profile link icon " />
                           <small>publicaciones</small>
                        </a>
                     </Link>
                  </li>
                  <li>
                     <button
                        className='btn'
                        onClick={handlePublication}
                     >
                        <Image src={publicationIcon} alt="profile button icon " />
                        <small>publicar</small>
                     </button>
                  </li>

                  {
                     isLogin
                        ?
                        (
                           <>
                              <li>
                                 <Link
                                    href='/profile/user_data/[name]'
                                    as={`/profile/user_data/${userSession.displayName}`}
                                 >
                                    <a onClick={handleResponsiveMenu}>
                                       <Image src={profileIcon} alt="profile link icon " />
                                       <small>perfil {userSession.displayName}</small>
                                    </a>
                                 </Link>
                              </li>

                              <li>
                                 <button
                                    className='btn'
                                    onClick={handleClose}
                                 >
                                    <Image src={exitIcon} alt="close session icon button" />
                                    <small>Salir</small>
                                 </button>
                              </li>
                           </>
                        )
                        :
                        (
                           <li>
                              <Link href='/login'>
                                 <a onClick={handleResponsiveMenu}>
                                    <Image src={keyIcon} alt="profile link icon " />
                                    <small>login / Registro</small>
                                 </a>
                              </Link>
                           </li>
                        )
                  }
               </ul>
            </div>{/* nav__links */}


         </div>{/* container */}
      </nav >
   )
}

export default Navbar;
{/*  */ }