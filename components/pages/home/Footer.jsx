import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import LinksFooter from './LinksFooter';
import { links } from '../../../helpers/constants';

import styles from '../../../styles/modules/footer.module.css';
import footerImg from '../../../public/img/footer-img.svg';

const Footer = () => {
   return (
      <footer className={styles.footer}>
         <div className={styles.footer__img}>
            <Image src={footerImg} alt='imagen ilustrativa del footer' />
         </div>
         <div className={styles.footer__links}>
            {
              Object.keys(links).length > 1 && <LinksFooter links={links} />
            }
         </div>
      </footer>
   )
}

export default Footer;