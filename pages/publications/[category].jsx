import React from "react";

import { db } from '../../firebase/firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

import Layout from "../../components/pages/Layout";
import Categories from "../../components/pages/publications/Categories";
import Stories from "../../components/pages/publications/Stories";
import { alertTimer } from "../../helpers/sweetAlerts";

import styles from '../../styles/modules/pubs.module.css';

export default function Publications({ data }) {
   const { storiesList, categoriesList, category, error } = data;

   return (
      <Layout>
         <header className='top-margin' >
            <h2 className='pages-title'>Publicaciones</h2>
         </header>
         <main className={`container ${styles.pubs}`}>
            <aside className={styles.pubs__categories}>
               {
                  categoriesList.length > 0
                     ?
                     < Categories categoriesList={categoriesList} />
                     :
                     <h2 className={styles.pubs__alert}>No se han podido cargar las categorías</h2>
               }
            </aside>
            <section className={styles.pubs__stories}>
               {
                  storiesList.length < 1
                     ? <h2 className={styles.pubs__alert}>No se encontro algo de la categoría: {category}...</h2>
                     : <Stories storiesList={storiesList} category={category} />
               }
            </section>
            {
               error && alertTimer('danger', 'Ha ocurrido un error en esta sección')
            }
         </main>
      </Layout>
   )
}

export async function getServerSideProps(context) {
   const category = context.params.category;
   let data = { error: false, storiesList: [], category };

   try {
      // stories document
      const storiesFilter = query(collection(db, "stories"), where('category', '==', category));
      // categories document
      const categoriesRef = doc(db, "categories", "id_categories_document");

      const [categoriesList, storiesList] = await Promise.all([
         getDoc(categoriesRef), //categories document
         getDocs(storiesFilter) //stories document
      ]);

      storiesList.forEach((doc) => {
         data = {
            ...data,
            storiesList: [...data.storiesList, { ...doc.data(), idstory: doc.id }]
         }
      });
      if (categoriesList.exists()) data.categoriesList = categoriesList.data().categories;
   } catch (error) {
      console.error('SE GENERÓ ESTE ERROR ==> ', error);
      data = { ...data, error: true }
   }

   return {
      props: {
         data
      }
   }
}


