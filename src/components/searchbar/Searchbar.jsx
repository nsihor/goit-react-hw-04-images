import { Formik, Form, Field } from "formik"
import PropTypes from 'prop-types'; 

export const Searchbar = ({handleSubmit}) => {

    return (
        <header className="Searchbar">
            <Formik onSubmit={(value, {resetForm}) => {handleSubmit(value.qwery); resetForm()}} initialValues={{ qwery: ''}}>
                <Form className="SearchForm" >
                    <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                    </button>
                    <Field
                    name="qwery"
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    />
                </Form>
            </Formik>
        </header>
    )
}

Searchbar.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}