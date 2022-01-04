import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';

import authContext from '../../../context/authContext/authContext';
import userContext from '../../../context/userContext/userContext';
import Modal from '../../Modal';
import { alertOptions, alertTimer } from '../../../helpers/sweetAlerts';
import commentValidationFn from '../../../validationForms/commentValidation';


import styles from '../../../styles/modules/pubs.module.css'; // CONTENT STYLES MODAL
import voteIcon from '../../../public/img/heart.svg';
import voteEmptyIcon from '../../../public/img/heart-empty.svg';
const voteIcons = {
   'empty': voteEmptyIcon,
   'fill': voteIcon
}
const Story = ({ setModalToggle, story }) => {
   //prop
   const { title, storybody, comments, idstory, hasvoted, writer } = story;
   //context auth
   const { userSession } = useContext(authContext);
   const { addVoteFn, addCommentFn, deleteStoryFn } = useContext(userContext);

   //states
   const [commentQty, setCommentQty] = useState(comments.length);
   const [vote, setVote] = useState(false);
   const [isOwner, setIsOwner] = useState(false);
   const [newComment, setNewComment] = useState({ comment: '', limitComment: 100 });
   const { comment, limitComment } = newComment;

   //functions

   const handleComment = (e) => {
      setNewComment({
         ...newComment,
         comment: e.target.value,
      })
   };

   const handleVote = async () => {
      if (!userSession.uid) return alertTimer('info', 'Necesitas iniciar para poder votar');
      if (hasvoted.includes(userSession.uid) || vote) return alertTimer('info', 'Ya has votado');
      setVote(!vote); // first replace voteEmptyIcon and put voteIcon
      const voteStatus = await addVoteFn(idstory, userSession.uid); //second try to save the vote
      setVote(voteStatus); //third if voteFn fail, replace again voteIcon and put voteEmptyIcon
   };

   const handleDelete = async() => {
      const response = await alertOptions();
      return response && deleteStoryFn(story.refimage, story.idstory);
   }


   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!userSession.uid) return alertTimer('info', 'Necesitas iniciar para poder hacer un comentario');

      const dataComment = {
         ...newComment,
         username: userSession.displayName,
         id: Date.now(),
         idstory
      }

      const commentStatus = await commentValidationFn(dataComment, addCommentFn);
      commentStatus && setNewComment({ ...newComment, comment: '' });
   }

   useEffect(() => {
      hasvoted.includes(userSession.uid) && setVote(true); //change iconVote empty or fill
      if (userSession.uid === writer.id) {
         setIsOwner(true);
      }
   }, [vote, userSession])

   return (
      <Modal setModalToggle={setModalToggle} >
         <article className={styles.modal}>
            <header className={styles.modal__header}>
               <h2 className={`pages-title ${styles.modal__header_title}`}>{title}</h2>
               {
                  isOwner && <button className='btn danger' onClick={handleDelete} >Eliminar esta publicación</button>
               }
            </header>
            <main className={styles.modal__body}>
               {storybody}
            </main>
            <footer className={styles.modal__footer} onSubmit={handleSubmit}>
               <form className={styles.modal__form}>
                  <div className={styles.modal__form_field}>
                     <label
                        htmlFor="comment"
                        className={`${comment.length > limitComment && 'danger'}`}
                     >
                        Comentar
                        <span>
                           {` ${comment.length}/${limitComment}`}
                        </span>
                     </label>
                     <textarea
                        name="comment"
                        id="comment"
                        value={newComment.comment}
                        onChange={handleComment}
                     ></textarea>
                  </div>
                  <div className={styles.modal__form_actions}>
                     <input className={styles.modal__form_submit} type="submit" value="Enviar" title='presiona para enviar tu comentario' />
                     <button type='button' title='presiona para dejar tu voto' onClick={handleVote}>
                        <Image
                           className={`${vote ? styles.voted : ''}`}
                           src={vote ? voteIcon : voteEmptyIcon}
                           alt='icono del botón para votar'
                        />
                        Votar!
                     </button>
                  </div>
               </form>
               <div className={styles.modal__comments}>
                  <p className={styles.modal__comments_title}>Comentarios {commentQty} </p>
                  <div>
                     {
                        comments.length < 1
                           ?
                           <p className={styles.modal__comments_title}>Aún no hay comentarios</p>
                           :
                           <div className={styles.modal__comments_container}>
                              {
                                 comments.map(comment => (
                                    <div key={comment.id} className={styles.comment__body}>
                                       <p>{comment.comment}</p>
                                       <p>
                                          Escrito por: {''}
                                          <span>
                                             {comment.username}
                                          </span>
                                       </p>
                                    </div>
                                 ))
                              }
                           </div>
                     }
                  </div>
               </div>
            </footer>
         </article>
      </Modal>
   )
}

export default Story
