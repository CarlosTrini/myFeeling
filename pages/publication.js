import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';

import Layout from '../components/pages/Layout';
import postValidation from '../validationForms/postValidation';

import styles from '../styles/modules/pubUser.module.css';
import stylesCard from '../styles/modules/pubs.module.css';
import storieImg from '../public/img/img3.jpg';
import commentIcon from '../public/img/comment.svg';
import likeIcon from '../public/img/heart.svg';
import authContext from '../context/authContext/authContext';
import userContext from '../context/userContext/userContext';

export default function Publication() {

  //auth context
  const { userSession } = useContext(authContext);
  const { addStoryFn, getCategoriesFn, categories, initialStoryBody, setStoryLocalStorageFn } = useContext(userContext);
  //state
  const [imageSelected, setImageSelected] = useState(storieImg);
  const [imageFile, setImageFile] = useState(null)
  const [categoriesList, setCategoriesList] = useState([]);
  const [limits, setLimits] = useState({ limitTitle: 30, limitDescription: 50, limitStory: 300 });
  const { limitTitle, limitDescription, limitStory } = limits;
  const [storyData, setStoryData] = useState({
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
  const { title, description, writer, storybody } = storyData;
  

  const handleData = (e) => {//take input data
    setStoryData({ ...storyData, [e.target.name]: e.target.value });
  }
  const handleImage = (e) => { // take image file
    const imgSelected = URL.createObjectURL(e.target.files[0]);
    setImageSelected(imgSelected);
    setImageFile(e.target.files[0]);
  }
  const handleSubmit = (e) => { //submit form
    e.preventDefault();
    postValidation(storyData, limits, imageFile, setStoryLocalStorageFn, addStoryFn);
  }

  useEffect(() => {
    if (userSession.displayName) {
      writer.name = userSession.displayName;
      writer.id = userSession.uid;
    }
    getCategoriesFn();
  }, [userSession]);

  useEffect(() => {
    setCategoriesList(categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories])

  return (
    <Layout>
      <main className='top-margin container'>
        <header>
          <h2 className='pages-title'>Comienza a publicar</h2>

        </header>
        <div className={styles.pubUser__container}>
          <form className={styles.pubUser__form} onSubmit={handleSubmit}>
            <div className='field'>
              <label htmlFor="title" className='field__label'>
                Nombre de la historia {`${storyData.title.length} / ${limitTitle}`}
              </label>
              <input
                name='title'
                id='title'
                type="text"
                placeholder='Ingresa'
                className='field__input'
                onChange={handleData}
                value={title}
              />
            </div>

            <div className='field'>
              <label htmlFor="description" className='field__label'>
                Breve Descripción: {`${description.length} / ${limitDescription}`}
              </label>
              <textarea
                name='description'
                id='description'
                type="text"
                placeholder='Descripción'
                className='field__input'
                onChange={handleData}
                value={description}
              ></textarea>
            </div>

            <div className='field'>
              <label htmlFor="storybody" className='field__label'>
                contenido de tu historia:  {`${storybody.length} / ${limitStory}`}
              </label>
              <textarea
                name='storybody'
                id='storybody'
                type="text"
                placeholder='contenido'
                className={`field__input ${styles.pubUser__story_body}`}
                onChange={handleData}
              ></textarea>
            </div>

            <div className='field'>
              <label htmlFor='frontpage' className='field__label_img'>Click para seleccionar una portada</label>
              <input
                name='frontpage'
                id='frontpage'
                type='file'
                accept='image/*'
                className='field__input_img'
                onChange={handleImage}
              />
            </div>

            <div className='field'>
              <label htmlFor="category" className='field__label'>Selecciona una categoría</label>
              <select name='category' id='category' onChange={handleData}>
                <option value="" disabled selected>Selecciona</option>
                {
                  categoriesList.length > 0
                    ? categoriesList.map(c => <option value={c} key={c}> {c}  </option>)
                    : <option value="">No se han podido cargar las categorias</option>
                }
              </select>
            </div>


            <input type="submit" value="Publicar" className='btn field__input_post' />
          </form>


          <div className={styles.pubUser__card}>
            <h3 className={styles.pubUser__card_prev}>Previsualización</h3>
            <article className={stylesCard.card} title='click en el nombre para leer'>
              <div className={stylesCard.card__img}>

                <Image src={imageSelected} width='300' height='200' alt={`imagen de la historia ${title}`} />

              </div>
              <div className={stylesCard.card__details}>
                <h4 className={`pages-title ${stylesCard.card__details_title}`}>{title}</h4>
                <p className={stylesCard.card__details_description}>
                  {description}
                </p>
                <div className={stylesCard.card__details_info}>
                  <div>
                    <p>Autor: <span>{writer.name}</span></p>
                    <p>Creado hace: <span>En este momento...</span></p>
                  </div>
                  <div className={stylesCard.card__details_info_count}>
                    <p>
                      <Image src={commentIcon} alt='comment icon' /> 0
                    </p>
                    <p>
                      <Image src={likeIcon} alt='like icon' /> 0
                    </p>
                  </div>
                </div>
              </div>
            </article >
          </div>
        </div>
      </main>
    </Layout>
  )
}
