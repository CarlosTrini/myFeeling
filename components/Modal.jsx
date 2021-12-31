import React from 'react';
import Image from 'next/image';

import styles from '../styles/modules/modal.module.css'; //BASIC MODAL STYLES
import closeIcon from '../public/img/close-modal.svg'

const Modal = ({ children, setModalToggle }) => {
   // the component where this modal is called, it has to have a state like this:
   // const [modalToggle, setModalToggle] = useState (false);
   //  the parent of the component must have a function that changes setModalToggle (true) to open the modal
   // this modal has two props {children setModalToggle} -> setModalToggle can be close to the modal, because here is a function that changes setModalToggle to false and closes the modal

   const handleModal = () => setModalToggle(false);

   return (
      <div className={styles.modal}>
         <div className={styles.modal__content}>
            <button
               onClick={handleModal}
               className={`btn ${styles.modal__close}`}
               alt='click para cerrar el modal'
            >
               <Image
                  src={closeIcon}
               />
            </button>


            {children}


         </div>
      </div>
   )
}

export default Modal;