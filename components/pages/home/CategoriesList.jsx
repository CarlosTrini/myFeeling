import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../../../styles/modules/home.module.css';
import categoryIcon from '../../../public/img/category-icon.svg'


const CategoriesList = ({ categories }) => {
   return (
      <>
         <p className={styles.categories__info}>Algunas de nuestras categorías</p>
         <ul className={styles.categories__list}>
            {
               categories.map(category =>
                  <li key={category}>
                     <Image src={categoryIcon} alt='Imagen ilustrativa' />
                     <Link
                        href='/publications/[category]'
                        as={`/publications/${category}`}
                     >
                        <a>{category}</a>
                     </Link>
                  </li>
               )
            }
         </ul>
      </>
   )
}

export default CategoriesList
