import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import styles from '../../../styles/modules/pubs.module.css';
import categoriesImg from '../../../public/img/chose.svg'

const Categories = ({ categoriesList }) => {

   const [toggle, setToggle] = useState(false)
   const handleToggle = () => setToggle(!toggle);

   return (
      <>
         <h3 className={styles.categories__title}>Categorías</h3>
         <button
            className={`btn ${styles.toggle}`}
            onClick={handleToggle}
         >Mostrar</button>
         <div
            className={`
            ${toggle && styles.category__show}
            ${styles.categories__list}
            `}
         >
            <ul>
               {
                  categoriesList.map(c =>
                     <li
                        key={c}
                        className={styles.categories__item}
                     >
                        <Link href='/publications/[category]' as={`/publications/${c}`}>
                           <a>{c}</a>
                        </Link>
                     </li>
                  )
               }
               <figure className={styles.categories__img}>
                  <Image
                     src={categoriesImg}
                     alt="categories image"
                  />
               </figure>
            </ul>
         </div>
      </>
   )
}
export default Categories;

