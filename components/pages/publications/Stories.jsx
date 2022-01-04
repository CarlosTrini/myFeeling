import React from 'react';

import StoryCard from './StoryCard';

import styles from '../../../styles/modules/pubs.module.css';

const Stories = ({storiesList, category}) => {
   return (
      <>
         <h3 className={`pages-title ${styles.stories__category}`}>selección  <span>{category}</span></h3>
         {
            storiesList.map(story => <StoryCard story={story} key={story.idstory} />)
         }      
      </>
   )
}

export default Stories;