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
  const [canToLoadMore, setLoadMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFirstRequest, setIsFirstRequest] = useState(true);
  
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
                  }))])
                  responseImages.totalHits - images.length <= 12 ? setLoadMore(false) : setLoadMore(true);
        })
        .catch(error => console.log(error))
        .finally(setIsloading(false));
    }

    if (isFirstRequest) {
      setIsFirstRequest(false);
      return;
    } 

      getPhotosToImages();
  }, [query, page])

  // componentDidUpdate = async (_, prevState) => {
  //   const {query, page, images} = this.state;
  //   if (prevState.query === query && prevState.page === page) {
  //     return;
  //   }

  //   if (page === 1) {
  //     this.setState({ images: [] });
  //   }
    
  //   this.setState({isLoading: true, canToLoadMore: false})

  //   try {
  //   const data = await getPhotos(query, page);

  //   data.totalHits - images.length <= 12 ? this.setState({canToLoadMore: false}) : this.setState({canToLoadMore: true});

  //   page === 1 ? this.setState({
  //       images: data.hits.map(hit => ({
  //         id: hit.id,
  //         webformatURL: hit.webformatURL, 
  //         largeImageURL: hit.largeImageURL, 
  //         tags: hit.tags
  //       }))
  //     }) :
  //     this.setState({
  //       images: [...images, ...data.hits.map(hit => ({
  //         id: hit.id,
  //         webformatURL: hit.webformatURL, 
  //         largeImageURL: hit.largeImageURL, 
  //         tags: hit.tags
  //       }))]
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     this.setState({isLoading: false})
  //   }
  // }

  const handleFindImg = async (searchingQuery) => {  
    setQuery(searchingQuery);
    setPage(1);
  }

  // handleLoadMoreImg = async () => {   
  //   this.setState({page: this.state.page + 1})
  // }

  const handleChoseImg = (img) =>{
    setChosenImg(img);
    setModalIsOpen(true);
  }

  // handleCloseModal = () => {
  //   this.setState({modalIsOpen: false})
  // }
  
    return (
      <div className="App">
        <Searchbar handleSubmit={handleFindImg}/>
        <ImageGallery images={images} handleChoseImg={handleChoseImg}/>
        {canToLoadMore   && <Button handleClick={() => setPage(p => p + 1)} text='Load more'/>}
        {isLoading && <Loader />}
        {modalIsOpen && <Modal img={chosenImg} handleCloseModal={() => setModalIsOpen(false)} />}
      </div>
    );
};
