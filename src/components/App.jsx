import { useState, useEffect } from "react";

import { getPhotos } from "services/services";
import { Searchbar } from "./searchbar/Searchbar";
import { ImageGallery } from "./imageGallery/ImageGallery";
import { Button } from "./button/Button";
import { Loader } from "./loader/Loader";
import { Modal } from "./modal/Modal";

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [chosenImg, setChosenImg] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTotalHits, setCurrentTotalHits] = useState(null);
  
  useEffect( () => {
    const getPhotosToImages = () => {
        setIsloading(true);
        page === 1 && setImages([]);

        getPhotos(query, page).then(responseImages => {
                  setImages(prevImages => [...prevImages, ...responseImages.hits.map(hit => ({
                    id: hit.id,
                    webformatURL: hit.webformatURL, 
                    largeImageURL: hit.largeImageURL, 
                    tags: hit.tags
                  }))]);
                  setCurrentTotalHits(responseImages.totalHits);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsloading(false))
    }

    if(query !== '')getPhotosToImages();
  }, [query, page])

  const handleFindImg = async (searchingQuery) => {  
    setQuery(searchingQuery);
    setPage(1);
  }

  const handleChoseImg = (img) =>{
    setChosenImg(img);
    setModalIsOpen(true);
  }
  
    return (
      <div className="App">
        <Searchbar handleSubmit={handleFindImg}/>
        <ImageGallery images={images} handleChoseImg={handleChoseImg}/>
        {!isLoading && currentTotalHits - images.length > 0 && <Button handleClick={() => setPage(p => p + 1)} text='Load more'/>}
        {isLoading && <Loader />}
        {modalIsOpen && <Modal img={chosenImg} handleCloseModal={() => setModalIsOpen(false)} />}
      </div>
    );
};
