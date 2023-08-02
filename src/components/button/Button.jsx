import PropTypes from 'prop-types'; 

export const Button = ({handleClick, text}) => <button className="Button" onClick={handleClick}>{text}</button>

Button.propTypes = {
    handleClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}