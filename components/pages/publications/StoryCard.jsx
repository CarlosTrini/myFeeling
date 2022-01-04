import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import formatDistanceToNow from 'date-fns/formatDistanceToNow/';
import esLocale from 'date-fns/locale/es';

import Story from './Story';

import styles from '../../../styles/modules/pubs.module.css';
import storieImg from '../../../public/img/img5.jpg';
import commentIcon from '../../../public/img/comment.svg';
import likeIcon from '../../../public/img/heart.svg';


const StoryCard = ({ story }) => {
   const { title, description, votes, comments, writer, createAt, urlimage } = story;

   const [modalToggle, setModalToggle] = useState(false);
   const [storyImage, setStoryImage] = useState(storieImg);
   const handleModal = () => setModalToggle(!modalToggle);

   useEffect(() => {
      if (modalToggle) {
         document.querySelector("body").classList.add("no-scroll");
      } else {
         document.querySelector("body").classList.remove("no-scroll");
      }
   }, [modalToggle]);


   useEffect(() => {
      if (urlimage) setStoryImage(urlimage);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         {
            modalToggle && <Story setModalToggle={setModalToggle} story={story} />
         }
         <article className={styles.card} title='click en el nombre para leer'>
            <div className={styles.card__img}>
               <Image src={storyImage} alt='imagen ilustrativa' width='450' height='300' />
            </div>
            <div className={styles.card__details}>
               <button
                  className={`btn pages-title`}
                  onClick={handleModal}
               >
                  <h4  className={styles.card__details_title}>{title}</h4>
               </button>
               <p className={styles.card__details_description}>{description}...</p>
               <div className={styles.card__details_info}>
                  <div>
                     <Link
                        href="/profile/user_publications/[name]"
                        as={`/profile/user_publications/${writer.name}`}
                     >
                        <a>
                           <p className={styles.card__details_info_author}>Autor: <span>{writer.name}</span></p>
                        </a>
                     </Link>
                     <p>Creado hace: <span>{formatDistanceToNow(createAt, { addSuffix: true, locale: esLocale })}</span></p>
                  </div>
                  <div className={styles.card__details_info_count}>
                     <p>
                        <Image src={commentIcon} alt='comment icon' />
                        {comments.length}
                     </p>
                     <p>
                        <Image src={likeIcon} alt='like icon' />
                        {votes}
                     </p>
                  </div>
               </div>
            </div>
         </article >
      </>
   )
}
export default StoryCard;