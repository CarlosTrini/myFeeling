import React, { useState } from 'react';
import Image from 'next/image';

import Story from '../publications/Story';

import styles from '../../../styles/modules/profile.module.css';

const UserPubs = ({story}) => {
   const [modalToggle, setModalToggle] = useState(false);

   const handleModal = () => {
      setModalToggle(true);
   }
   return (
      <>
         {
            modalToggle && <Story setModalToggle={setModalToggle} story={story} />
         }

         <li>
            <Image src={story.urlimage} alt='imagen ilustrativa' width='100' height='100' />
            <button
               className={`btn ${styles.profile__title_btn}`}
               onClick={handleModal}
            >
               {story.title}
            </button>
         </li>
      </>
   )
}

export default UserPubs
