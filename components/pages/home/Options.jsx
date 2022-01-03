import React from 'react';
import { cardsMyFeeling } from '../../../helpers/constants';

import styles from '../../../styles/modules/home.module.css';
import Cards from './Cards';

const Options = () => {
   return (
      <section className={styles.options}>
         <h2 className={styles.options__title}>En <span>MyFeeling</span> podrás</h2>
         <div className={`container ${styles.options__card_container}`}>
            {
               cardsMyFeeling.length > 0 &&  <Cards cardsMyFeeling={cardsMyFeeling}  /> 
            }
         </div>
      </section>
   )
}

export default Options;