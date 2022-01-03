import React from 'react';


import styles from '../../../styles/modules/home.module.css';
import CategoriesList from './CategoriesList';

const Examples = ({ categories, errorCategories }) => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Categorías</h2>
      <div className={`container ${styles.categories__container}`}>
        {
          categories.length > 0 && <CategoriesList categories={categories}  />
        }
        {
          categories.length < 1 && !errorCategories &&
           <h3 className={styles.categories__info}>No se han encontrando categorías...</h3>
        }
        {
          errorCategories && <h3 className={styles.categories__info}>Ha ocurrido un error al consultar las categorias</h3>
        }
      </div>
    </section>
  )
}

export default Examples;