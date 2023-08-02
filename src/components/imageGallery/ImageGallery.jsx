import { ImageGalleryItem } from "components/imageGalleryItem/ImageGalleryItem"

export const ImageGallery = ({...arr}) => <ul className="ImageGallery">{<ImageGalleryItem images={arr.images} handleChoseImg={arr.handleChoseImg} />}</ul>