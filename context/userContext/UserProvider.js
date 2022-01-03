import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import { doc, updateDoc, increment, arrayUnion, getDoc, addDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { db, storage } from '../../firebase/firebaseConfig';

import userContext from './userContext'
import { alertTimer } from '../../helpers/sweetAlerts';

export const UserProvider = ({ children }) => {
   const [categories, setCategories] = useState([]);
   const [initialStoryBody, setInitialStoryBody] = useState({
      title: 'Aquí tu titulo',
      description: 'Una breve descripción',
      urlimage: null,
      writer: { id: null, name: '' },
      category: '',
      hasvoted: [],
      storybody: '',
      votes: 0,
      comments: [],
      createAt: ''
   });

   //get categories
   const getCategoriesFn = async () => {
      try {
         const categoriesRef = doc(db, "categories", "id_categories_document");
         const categories = await getDoc(categoriesRef);
         if (!categories.exists()) return alertTimer('warning', 'No hay categorías para asignar. Intentalo más tarde', 3000);
         return setCategories(categories.data().categories);
      } catch (error) {
         console.error(error);
         alertTimer('error', 'Ha ocurrido un error al consultar las categorías. Intentalo más tarde', 3000);
      }
   }

   // vote  
   const addVoteFn = async (idStory, idUserHasVoted) => {
      try {
         const storyRef = doc(db, "stories", idStory);
         //increment 1 votes field
         await updateDoc(storyRef, { votes: increment(1) });
         // add a new iduser to the "hasvoted" array field.
         await updateDoc(storyRef, { hasvoted: arrayUnion(idUserHasVoted) });
         alertTimer('success', 'Voto agregado. Gracias!');
         return true;
      } catch (error) {
         console.error(error);
         alertTimer('error', 'Se ha generado un error al insertar tu voto');
         return false;
      }
   }

   // add comment
   const addCommentFn = async (commentData, idStory,) => {
      try {
         const storyRef = doc(db, "stories", idStory);
         // Atomically add a new comment to the "comments" array field.
         await updateDoc(storyRef, { comments: arrayUnion(commentData) });
         alertTimer('success', 'Tu comentario se ha agregado satisfactoriamente, se mostrará al recargar al página');
         return true;
      } catch (error) {
         console.error(error);
         alertTimer('error', 'Se ha generado un error al insertar tu voto');
         return false;
      }
   }


   const addStoryFn = async (data, imgFile) => {
      const imageName = Date.now() + imgFile.name;
      const metaData = {
         contentType: imgFile.type
      }

      // FIRST ADD IMAGE
      const path = `images/${imageName}`;
      const storageRef = ref(storage, path); // REFERENCE

      const task = uploadBytesResumable(storageRef, imgFile, metaData);

      try {
         task.on('state_changed',
            (snapshot) => {
               // Observe state change events such as progress, pause, and resume
               // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
               var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               console.log('Upload is ' + progress + '% done');
               if (progress < 100) {
                  alertTimer('info', `cargando imagen... ${progress}`, 500);
               } else {
                  alertTimer('info', `Imagen cargada... ${progress}`, 1500);
               }
            },
            (error) => {
               // Handle unsuccessful uploads
               console.error(error);
               throw new Error('Ha ocurrido un error al cargar la imagen');
            },
            async () => {
               // Handle successful uploads on complete
               // For instance, get the download URL: https://firebasestorage.googleapis.com/
               try {
                  // SECOND GET URL IMAGE AND ADD TO data... NOW  SAVE STORY...
                  const url = await getDownloadURL(task.snapshot.ref);
                  data.urlimage = url;
                  data.refimage = path;
                  await addDoc(collection(db, "stories"), data);
                  await alertTimer('success', 'Tu historia ha sido publicada correctamente');
                  Router.push('/');
               } catch (error) {
                  console.error(error);
                  await deleteObject(storageRef);
                  alertTimer('error', 'Ha ocurrido un error al agregar la historia, la imagen agregada se ha borrado, Inténtelo más tarde', 4000);
               }
            }
         );
      } catch (error) {
         console.log(error);
         alertTimer('error', 'Ha ocurrido un error al guardar la imagen');
      }
   }


   const deleteStoryFn = async(refImage, refStory) => {
      const storageRef = ref(storage, refImage); // REFERENCE
      try {
         alertTimer('info', 'Eliminando historia...');
         await deleteObject(storageRef)
         await deleteDoc(doc(db, "stories", refStory));
         Router.reload();
      } catch (error) {
         console.error(error);
         alertTimer('info', 'Ha ocurrido un error al eliminar la historia, intenta más tarde', 2000);
      }
   }

   const getPublicationsFn = async (value, option) => {
      let storiesList = [];
      let q = null;
      const storiesRef = collection(db, 'stories');

      if(option === 'byid'){
         q = query(storiesRef, where('writer.id', '==', `${value}`));
      }else if(option === 'byname'){
         q = query(storiesRef, where('writer.name', '==', `${value}`));
      }
      try {
         const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
            storiesList = [...storiesList, { ...doc.data(), idstory: doc.id }];
         });
         return storiesList;
      } catch (error) {
         console.error(error);
         alertTimer('error', 'ha ocurrido un error al traer las publicaciones');
      }
   }

   const setStoryLocalStorageFn = (story) => {
      localStorage.setItem('story', JSON.stringify(story));
   }
   const getStoryLocalStorageFn = () => {
      const data = localStorage.getItem('story');
      if (!data) {
         setStoryLocalStorageFn(initialStoryBody);
      } else {
         setInitialStoryBody(data);
      }
   }

   useEffect(() => {
      getStoryLocalStorageFn();
   }, []);

   return (
      <userContext.Provider
         value={{
            categories,
            initialStoryBody,
            getCategoriesFn,
            addVoteFn,
            addCommentFn,
            addStoryFn,
            setStoryLocalStorageFn,
            getPublicationsFn,
            deleteStoryFn
         }}
      >
         {children}
      </userContext.Provider>
   )
}
export default UserProvider;

