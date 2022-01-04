import React from 'react';
import Image from 'next/image';

import styles from '../../../styles/modules/home.module.css';


const Cards = ({ cardsMyFeeling }) => {
   return (
      <>
         {
            cardsMyFeeling.map(data =>
               <article className={styles.options__card}  key={data.title}>
                  <header className={styles.options__card_header}>
                     <Image src={data.img} width='200' height='200' alt='imagen ilustrativa de la historia' />
                     <h4>{data.title}</h4>
                  </header>
                  <div className={styles.options__card_body}>
                     <p>{data.description}</p>
                  </div>
               </article>
            ) //map end
         }

      </>
   )
}

export default Cards;