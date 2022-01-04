import { useContext, useEffect, useState } from "react";

import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "@firebase/firestore";
import authContext from "../context/authContext/authContext";
import Layout from "../components/pages/Layout";

import Hero from "../components/pages/home/Hero";
import Introduction from "../components/pages/home/Introduction";
import Examples from "../components/pages/home/Examples";
import Options from "../components/pages/home/Options";

export default function Home({ dataCategories }) {
  const { statusLogin, userSession } = useContext(authContext);
  
  const [categories, setCategories] = useState([]);
  const [errorCategories, setErrorCategories] = useState(false);

  useEffect(() => {
    statusLogin();
    if (dataCategories.categoriesList.length > 0) {
      setCategories(dataCategories.categoriesList);
    }
    if (dataCategories.error) {
      setErrorCategories(true);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession, dataCategories]);

  return (
    <Layout>
      <Hero />
      <Introduction />
      <main>
        <Examples categories={categories} errorCategories={errorCategories} />
        <Options />
      </main>
    </Layout>
  )
}


export const getStaticProps = async () => {
  let dataCategories = { error: false, categoriesList: [] };

  //get categories
  try {
    const categoriesRef = doc(db, "categories", "id_categories_document");
    const categories = await getDoc(categoriesRef);
    if (categories.exists()) {
      dataCategories = {
        ...dataCategories,
        categoriesList: categories.data().categories
      }

    }
  } catch (error) {
    console.error('ERROR ==> ', error);
    dataCategories = {
      ...dataCategories,
      error: true
    }
  }

  return {
    props: {
      dataCategories
    }
  }
}