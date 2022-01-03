import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../../../styles/modules/home.module.css';
import introImage from '../../../public/img/img2.jpg'



const Introduction = () => {
  return (
      <section className={`container ${styles.intro}`}>
          <div className={styles.intro__img}>
            <Image src={introImage} alt='Imagen ilustrativa'   />
          </div>
          <div className={styles.intro__text}>
             <h2 className={styles.intro__title}>Comienza leyendo!</h2>
             <p className={styles.intro__paragraph}>
               Si aún no sabes lo que quieres escribir o  quieres aprender cómo redactan otros autores o simplemente deseas dedicar tiempo a lecturas rápidas puedes comenzar en nuestra sección de publicaciones leyendo escritos los cuales puedes visualizar en base a algunas categorías.
             </p>
             <Link 
             href='/publications/[category]'
             as='/publications/fantasia'
             >
               <a className={styles.intro__link}>Ver publicaciones</a>
             </Link>
          </div>
      </section>
  )
}

export default Introduction;