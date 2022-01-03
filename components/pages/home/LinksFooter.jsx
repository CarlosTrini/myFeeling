import React from 'react';
import Link from 'next/link';

import styles from '../../../styles/modules/footer.module.css';

const LinksFooter = ({ links }) => {
   return (
      <div className={styles.footer__links}>
         <ul className={styles.footer__links_list}>
            {
               links.social.map(social =>
                  <li  key={social.red}>
                     <Link href={social.link}>
                        <a target='_blank'>{social.red}</a>
                     </Link>
                  </li>
               )
            }
         </ul>

         <ul className={styles.footer__links_list}>
            {
               links.community.map(comm =>
                  <li  key={comm.event}>
                     <Link href={comm.link}>
                        <a target='_blank'>{comm.event}</a>
                     </Link>
                  </li>
               )
            }
         </ul>

         <ul className={styles.footer__links_list}>
            {
               links.products.map(product =>
                  <li  key={product.product}>
                     <Link href={product.link}>
                        <a target='_blank'>{product.product}</a>
                     </Link>
                  </li>
               )
            }
         </ul>
      </div>
   )
}

export default LinksFooter;