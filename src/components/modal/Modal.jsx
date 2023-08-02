import { useEffect } from "react"
import PropTypes from 'prop-types'; 

export const Modal = ({img, handleCloseModal}) => {

    useEffect(() => {
        const handleKeyDown = e => e.code === 'Escape' && handleCloseModal();

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleCloseModal]);

    return (
        <div className="Overlay" onClick={(e) => e.target.className === 'Overlay' && handleCloseModal() }>
            <div className="Modal">
                <img width={'1000'} src={img} alt="fullImage" />
            </div>
        </div>)           
    };

Modal.propTypes = {
    img: PropTypes.string.isRequired,
    handleCloseModal: PropTypes.func.isRequired
}