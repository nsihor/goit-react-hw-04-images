import PropTypes from 'prop-types'; 

export const ImageGalleryItem = ({images, handleChoseImg}) => 
images.map(img => 
    <li key={img.id} className="ImageGalleryItem">
        <img onClick={() => handleChoseImg(img.largeImageURL)} className="ImageGalleryItem-image" src={img.webformatURL} alt={img.tags} />
    </li>)

ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired
    })).isRequired,
    handleChoseImg: PropTypes.func.isRequired
}